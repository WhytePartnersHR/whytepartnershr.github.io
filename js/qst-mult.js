function qstLoad() {
	$('.jsShow').show();
	$('.jsHide').hide();
	$('.qst-multSel input').click( function(e) {
		label = $('label[for="'+$(this).attr('id')+'"]');
		if(label.hasClass('selected')) {
			label.removeClass('selected');
			$(this).removeClass('selected');
		} else {
			label.addClass('selected');
			$(this).addClass('selected');
		}
	});
	$('.qst-multSel input').each( function(e) {
		$(this).removeAttr('disabled');
		$(this).css('position','absolute');
		$(this).css('left','-50000px');
		label = $('label[for="'+$(this).attr('id')+'"]');
		label.addClass('wJS');
		if($(this).hasClass('correct')) label.addClass('correct');
	});
	$('.qst-mult input').each( function(e) {
		$(this).removeAttr('disabled');
		$(this).css('position','absolute');
		$(this).css('left','-50000px');
		label = $('label[for="'+$(this).attr('id')+'"]');
		label.addClass('wJS');	
	});
	$('.qst-mult input').click( function(e) {
		$(this).parent().children('label').removeClass('selected');
		$(this).parent().parent().children('li').each(function(e) {
			$(this).children('a').each(function(f) {
				$(this).children("span.hidden").remove();
			});
		});
		label = $('label[for="'+$(this).attr('id')+'"]');
		label.addClass('selected');
	});
	$('.qst-mult input').focus(function(e) {
		label = $('label[for="'+$(this).attr('id')+'"]');
		label.addClass('hasFocus');	
	});
	$('.qst-mult input').blur(function(e) {
		label = $('label[for="'+$(this).attr('id')+'"]');
		label.removeClass('hasFocus');	
	});
	$('.qst-multSel input').focus(function(e) {
		label = $('label[for="'+$(this).attr('id')+'"]');
		label.addClass('hasFocus');	
	});
	$('.qst-multSel input').blur(function(e) {
		label = $('label[for="'+$(this).attr('id')+'"]');
		label.removeClass('hasFocus');	
	});
	$('.qst-multSubmit').click( function(f) {
		f.preventDefault();
		var qstID = /qst-submit-([0-9a-zA-Z\-_+]*)/.exec($(this).attr('class'))[1];
		var answerBox = $('.answerBox-' + qstID);
		var ans = $('.qst-' + qstID + ":checked");
		if(ans.length == 0) {
			alert("Please select at least one option.");
			return;
		}
		answerBox.fadeOut(200, function() {
			$('.qst-' +qstID+ ' label').addClass('finished');
			var missed = $('.qst-' + qstID).find('.correct').not('.selected');
			var wrong = $('.qst-' + qstID).find('.selected').not('.correct');
			$('#all').show();
			$('label.selected').each( function(e) { if($(this).hasClass('correct')) { $(this).addClass('right'); $(this).append('<span class="ablty">(Correct)</span>'); } } );
			wrong.each( function(e) { $(this).addClass('wrong');$(this).append('<span class="ablty">(Incorrect)</span>'); } );
			if(missed.length == 0 && wrong.length == 0) {
				$('#correct').show();
				$('#correct').focus();
				$('#inc-all').hide();
				$('#incorrect').hide();
			} else {
				$('#incorrect').show();
				$('#incorrect').focus();
				$('#inc-all').show();
				$('#correct').hide();
			}
			$('.qst-' + qstID + ' label').unbind();
			$('.qst-' + qstID + ' label').click( function(e) { e.preventDefault() } );
			$('.qst-' + qstID + ' input').attr('disabled','disabled');
			answerBox.fadeIn(200);
		});
		$(this).hide();
		$(this).unbind();
	});
	$('.qst-submit').click( function(f) {
		if($(this).hasClass('qst-multSubmit')) return;
		f.preventDefault();
		var qstID = /qst-submit-([0-9a-zA-Z\-_+]*)/.exec($(this).attr('class'))[1];
		var answerBox = $('#answers');
		answerBox.hide();
		answerBox.children().hide();
		var ans = $('.qst-' + qstID + ":checked");
		if(ans.length != 0) {
			$('#'+ans.attr('id')+'text').show();
			$('#'+ans.attr('id')+'text').focus();
			$('.qst-' +qstID+ ' label').addClass('finished');
			label = $('label[for="'+ans.attr('id')+'"]');
			if(ans.hasClass('correct')) { label.addClass('right');$(this).append('<span class="ablty">(Correct)</span>'); }  else { label.addClass('wrong');$(this).append('<span class="ablty">(Incorrect)</span>'); }
			label.removeClass('finished');
			label.removeClass('selected');
			$(this).hide();
			$(this).unbind();
			answerBox.fadeIn(200);
			$('.qst-' + qstID + ' label').unbind();
			$('.qst-' + qstID + ' label').click( function(e) { e.preventDefault() } );
			$('.qst-' + qstID + ' input').attr('disabled','disabled');
		}
	});
}
$(window).load(qstLoad);
