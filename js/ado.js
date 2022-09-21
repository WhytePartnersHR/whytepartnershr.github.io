var matched, browser;

jQuery.uaMatch = function( ua ) {
    ua = ua.toLowerCase();

    var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
        /(msie) ([\w.]+)/.exec( ua ) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
        [];

    return {
        browser: match[ 1 ] || "",
        version: match[ 2 ] || "0"
    };
};

matched = jQuery.uaMatch( navigator.userAgent );
browser = {};

if ( matched.browser ) {
    browser[ matched.browser ] = true;
    browser.version = matched.version;
}

// Chrome is Webkit, but Webkit is also Safari.
if ( browser.chrome ) {
    browser.webkit = true;
} else if ( browser.webkit ) {
    browser.safari = true;
}

jQuery.browser = browser;
function resizeFont(type) {
		if(type == "largeFont") {
			$('body').css('font-size','20px');
		} else if(type == "medFont") {
			$('body').css('font-size','16px');
		} else if(type == "smallFont") {
			$('body').css('font-size','12px');
		}
		cookies.set('fontSize', type);
}
$(document).ready(function() {
	if(cookies.get('fontSize')) {
		resizeFont(cookies.get('fontSize'));
	}
	$('.font-resize a').click(function(e) {
		e.preventDefault();
		var type = $(this).attr('class');
		resizeFont(type);
	});
});
