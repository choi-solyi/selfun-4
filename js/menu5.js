jQuery(document).ready(function ($) {

	tabSelector = $('.tabs-menu div');
	tab = $('.tab');

	tabSelector.bind('click', function() {
		tabSelector.removeClass('active');
		$(this).addClass('active');
		tabId = $(this).attr('id');
		tab.removeClass('current');
		tab = $('.' + tabId).addClass('current');
		tab.addClass('current');
	});

});
