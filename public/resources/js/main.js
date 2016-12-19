$(document).ready(function() {
	var navItems   = $('#navbar li'),
	    logoLink   = $('.navbar-logo'),
	    body       = $('body');
	    
	body.on('click', navbarClose);

	function navbarClose() {
		$('#navbar').attr('aria-expanded','false');
		$('#navbar').removeClass('in');
	}
});