$(document).ready(function() {
	var $navItems   = $('#navbar li'),
	    $logoLink   = $('.navbar-logo'),
	    $body       = $('body');
	    
	$navItems.on('click', function(){
		if (!$(this).hasClass('dropdown')) {
			navbarClose();
		}
	});

	function navbarClose() {
		$('#navbar').attr('aria-expanded','false');
		$('#navbar').removeClass('in');
	}
});