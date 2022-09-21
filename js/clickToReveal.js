$(window).load( function() {
$('.clickToReveal').click(function(e) {
	e.preventDefault();
	var ctrId = /ctr-([0-9a-zA-Z_\-+]*)/.exec($(this).attr('class'))[1];
	$('.ctr-'+ctrId).removeClass('selected');
	$(this).addClass('selected');
	if(/ctrOuterShell-/.test($(this).attr('class'))) {
		var outerShellId = /ctrOuterShell-([0-9a-zA-Z_\-+]*)/.exec($(this).attr('class'))[1];
		$('.ctr-'+ctrId).parent().removeClass('selected');
		var fadeInId = $(this).attr('href');
		if($($(this).attr('href')).is(":visible")) {
			$(this).removeClass('selected');
			$('.ctrObj-'+ctrId).fadeOut(200);
			$('#' + outerShellId).fadeOut(200);
		} else {
			$('.ctrObj-'+ctrId).fadeOut(200);
			$(this).parent().addClass('selected');
			$('#'+outerShellId).children('.innerShell').fadeOut(200, function() {
				$(fadeInId).fadeIn(100);
				$(this).fadeIn(200);
				if(!$('#'+outerShellId).is(":visible")) {
					$('#' + outerShellId).fadeIn(200); 
				}
			});
		}
	} else {
		if($($(this).attr('href')).is(":visible")) {
			$(this).removeClass('selected');
			$($(this).attr('href')).fadeOut(200);
		} else {
			$('.ctrObj-' + ctrId).fadeOut(200);
			$($(this).attr('href')).fadeIn(200);
		}
	}
});
});
