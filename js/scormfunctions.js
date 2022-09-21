// Globals + CONSTANTS
var MAX_TRIES = 500;
var SCORM_TRUE = "true";
var SCORM_FALSE = "false";
var SCORM_NO_ERROR = "0";

var API;
if (typeof parent.getAPIObj === "function") {
	API = parent.getAPIObj();
}
if(API) {
var initialized = parent.getInitialized();
var terminated = parent.getTerminated();
var alreadyInit = parent.getAlreadyInit();
} else {
var API = null;
var initialized = false;
var terminated = false;
var alreadyInit = false;
$(window).unload(function(e) {
	termSCORM();
});
}

function getAPIObj() {
	return API;
}

function getInitialized() {
	return initialized;
}

function getTerminated() {
	return terminated;
}

function getAlreadyInit() {
	return alreadyInit;
}

function scanForAPI(win)
{
	 var numTries  = 0;
   while ((win.API_1484_11 == null) && (win.parent != null)
           && (win.parent != win))
   {
      numTries++;
      if (numTries > MAX_TRIES)
      {
         return null;
      }
      win = win.parent;
   }
   return win.API_1484_11;
}

function getAPI(win)
{
   if ((win.parent != null) && (win.parent != win))
   {
      API = scanForAPI(win.parent);
   }
   if ((API == null) && (win.opener != null))
   {
      API = scanForAPI(win.opener);
   }
}

function initSCORM(){
    var result;

    getAPI(window);

    if (API == null){
				// Either we aren't in a SCORM setting, or the LMS is messed. Either way, we just return naturally.
        return;
    }

    result = API.Initialize("");
    if (result == SCORM_FALSE){
        var errorNumber = API.GetLastError();
        var errorString = API.GetErrorString(errorNumber);
        var diagnostic = API.GetDiagnostic(errorNumber);

        var errorDescription = "Number: " + errorNumber + "\nDescription: " + errorString + "\nDiagnostic: " + diagnostic;

        if(errorNumber != 103) {
	        alert("Error with initializing SCORM communication.\n\n" + errorDescription);
				}
				else
				{
					initialized = true;
					alreadyInit = true;
				}
        return;
    }
		initialized = true;
}

function takeOverLinks() {
  if (initialized == false || terminated == true){
		// No SCORM, no problems.
		return;
	}

 $(window).load( function(f) {
	$('a.scorm').click( function(e) {
		if($(this).hasClass('chosen')) { return true; }
		if($(this).attr('href') == '#') { return true; }
    var contentTitle = /(.*).html(#.*)?$/.exec($(this).attr('href'))[1];
		savePageLoc(contentTitle);
  });
	$('a.scormFinish').click( function(e) { parent.termSCORM(); parent.window.close(); } );
  });
}

function termSCORM(){
    var result;

    if (initialized == false || terminated == true){
			// No SCORM, no problems.
			return;
		}
		setSCORMVal('cmi.exit', 'suspend');

		$(window).unbind('unload');
    result = API.Terminate("");

    terminated = true;

    if (result == SCORM_FALSE){
        var errorNumber = API.GetLastError();
        var errorString = API.GetErrorString(errorNumber);
        var diagnostic = API.GetDiagnostic(errorNumber);

        var errorDescription = "Number: " + errorNumber + "\nDescription: " + errorString + "\nDiagnostic: " + diagnostic;

        alert("Error with terminating SCORM communication.\n\n" + errorDescription);
        return;
    }
}

function getSCORMVal(element, checkError){
    var result;

    if (initialized == false || terminated == true){
			// No SCORM, no problems.
			return;
		}

		result = API.GetValue(element);

		if (checkError == true && result == ""){
        var errorNumber = API.GetLastError();

        if (errorNumber != SCORM_NO_ERROR){
            var errorString = API.GetErrorString(errorNumber);
            var diagnostic = API.GetDiagnostic(errorNumber);

            var errorDescription = "Number: " + errorNumber + "\nDescription: " + errorString + "\nDiagnostic: " + diagnostic;

            alert("Error retrieving SCORM value.\n\n" + errorDescription);
            return "";
        }
    }

    return result;
}

function setSCORMVal(element, value){
    var result;

    if (initialized == false || terminated == true){
			// No SCORM, no problems.
			return;
		}

    result = API.SetValue(element, value);

		if (result == SCORM_FALSE){
        var errorNumber = API.GetLastError();
        var errorString = API.GetErrorString(errorNumber);
        var diagnostic = API.GetDiagnostic(errorNumber);

        var errorDescription = "Number: " + errorNumber + "\nDescription: " + errorString + "\nDiagnostic: " + diagnostic;

        alert("Error storing SCORM value.\n\nYour results may not be recorded.\n\n" + errorDescription);
        return;
    }
}

function commitSCORM(){

    var result;

    result = API.Commit("");

    if (result == SCORM_FALSE){
        var errorNumber = API.GetLastError();
        var errorString = API.GetErrorString(errorNumber);
        var diagnostic = API.GetDiagnostic(errorNumber);

        var errorDescription = "Number: " + errorNumber + "\nDescription: " + errorString + "\nDiagnostic: " + diagnostic;

        alert("Error - Could not invoke Commit.\n\nYour results may not be recorded.\n\n" + errorDescription);
        return;
    }
}

function completedSCOPage() {
	setSCORMVal('cmi.score.scaled', 1);
	setSCORMVal('cmi.score.min', 0);
	setSCORMVal('cmi.score.max', 1);
	setSCORMVal('cmi.score.raw', 1);
	setSCORMVal('cmi.completion_status', 'completed');
	setSCORMVal('cmi.success_status', 'passed');
	commitSCORM();
}
function jumpToSCO(pageName) {
	setSCORMVal('adl.nav.request', '{target=' + pageName + '}choice');
	termSCORM();
}

function init() {
	if(initialized == false)
		initSCORM();
	if(alreadyInit == false) {
		setSCORMVal( "cmi.exit","suspend" );
		commitSCORM();
		var entryMode = getSCORMVal( "cmi.entry" );
		if (entryMode == "resume") {
			var loc = getSCORMVal( "cmi.location" );
      var errorNumber = API.GetLastError();
			if (errorNumber == "403" || loc == "") {
				loc = 'index';
			}
			jumpToPage( loc );
		}
	}
}

function jumpToPage(loc) {
	pageURL = loc + ".html";
	if(/.html.html$/.test(pageURL)) {
		pageURL = loc;
	}
	if(window.location.href.indexOf(pageURL) == -1) {
                $('#mainFrame').attr('src', pageURL);
	}
}
function savePageLoc(loc) {
	setSCORMVal( "cmi.location" , loc);
	commitSCORM();
}
