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

    $('#contract').click(function(){
        let $this=$(this);
        $this.next('#CT_content').slideToggle();
    });

    $(document).load('ajax/footer.html', function(){
        $('.footerlist').append(
            "<li><a href='http://cloud0477.dothome.co.kr/'><img src='https://res.cloudinary.com/dgggcrkxq/image/upload/v1573198836/noticon/uydcemefupin4kvi5pii.gif'> 개발자 사이트</a></li>");

        $('.footerlist').children(':last').css({
            'margin':'5px'
        });
        $('.footerlist').children(':last').children('a').children('img').css({
            'width':'15px'
        });
    });

});




