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



jQuery(document).ready(function ($) {
      $(document).load('ajax/footer.html', function(){

        $('.footerlist').append(
            "<li><a href='http://cloud0477.dothome.co.kr/'><img src='https://res.cloudinary.com/dgggcrkxq/image/upload/v1573198836/noticon/uydcemefupin4kvi5pii.gif'> 개발자 사이트</a></li>");

        $('.footerlist').children(':last').css({
            'margin':'10px'
        });

        $('.footerlist').children(':last').children('a').children('img').css({
            'width':'10px'
        });
    });
});
