function dfnLoad(e) {
var dfnDisplay = function(f) {
		$('dfn').css('font-weight','400');
		var word = $(this).html().toLowerCase().replace(/[ ()\.']/g,"-");
		var wordBox = $(this).html().toLowerCase().replace(/^\w/, function($0) { return $0.toUpperCase(); });
		if($(this).attr('rel') != undefined && $(this).attr('rel') != "") wordBox = $(this).attr('rel');
		else if($(this).attr('title') != undefined && $(this).attr('title') != "") wordBox = $(this).attr('title');
		newWord = wordBox.toLowerCase().replace(/[ ()\.']/g,"-");
		$(this).css('font-weight','600');
		if($(this).hasClass('live')) {
			var curWord = $(this);
			$(this).removeClass('live');
			$(this).css('font-weight','400');
			$('#glossaryDetail').fadeOut();
			$(this).focus();
		} else {
			$('dfn.live').removeClass('live');
			$(this).addClass('live');
			$('#glossaryTerm').html(wordBox);
			$('#definition').html($('.dfn-' + word).html());
			var left = $(this).position().left;
			var farRight = $('.modPage').offset().left + $('.modPage').width();
			$('#glossaryDetail .arrow').css('left','2em');
			console.log(farRight);
			console.log($(this).offset().left + $('#glossaryDetail').width());
			if($(this).offset().left + $('#glossaryDetail').width() > farRight) {
				left = farRight-$(this).offsetParent().position().left-$('#glossaryDetail').width();
				var diff = $(this).position().left - left;
				$('#glossaryDetail .arrow').css('left',$('#glossaryDetail .arrow').position().left+diff+20);
			}
			$('#glossaryDetail').animate({
				top: $(this).position().top + $(this).height(),
				left: left
			}, 100);
			$('#glossaryDetail').fadeIn();
			$('#glossaryTerm').focus();
			$('#glossaryExit').hide().show();
		}
	}
	$('dfn').click(dfnDisplay);
	$('dfn').keypress( function(e) { 
		 if(e.keyCode == 13) { 
			dfnDisplay.bind(this)(e); 
		} 
	});
	$('#glossaryExit').click( function(f) {
		$('dfn').css('font-weight','400');
			$('#glossaryDetail').fadeOut();
		f.preventDefault();
	});
};
$(window).load(dfnLoad);
