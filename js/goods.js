;
(function($) {
	$.fn.tab = function(options) {
		var opts = $.extend({}, $.fn.tab.defaults, options);
		return this.each(function() {
			var obj = $(this);

			$(obj).find('.tabHeader li').on(opts.trigger_event_type, function() {
				$(obj).find('.tabHeader li').removeClass('active');
				$(this).addClass('active');

				$(obj).find('.tabContent section').hide();
				$(obj).find('.tabContent section').eq($(this).index()).show();
			})
		});
	}
	$.fn.tab.defaults = {
		trigger_event_type: 'click', //mouseover | click 默认是click
	};

})(jQuery);
