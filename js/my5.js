//
//jQuery(document).ready(function ($) {
//
//    $(document).load('ajax/footer.html', function(){
//
//    $('.footerlist').append(
//        "<li><a href='http://cloud0477.dothome.co.kr/'><img src='https://res.cloudinary.com/dgggcrkxq/image/upload/v1573198836/noticon/uydcemefupin4kvi5pii.gif'> 개발자 사이트</a></li>");
//
//    $('.footerlist').children(':last').css({
//        'margin':'5px'
//    });
//
//    $('.footerlist').children(':last').children('a').children('img').css({
//        'width':'15px'
//    });
//});
//
//
//});

jQuery(document).ready(function ($) {
      $(document).load('ajax/footer.html', function(){

        $('.footerlist').append(
            "<li><a href='http://cloud0477.dothome.co.kr/'>개발자 사이트</a></li>");

        $('.footerlist').children(':last').css({
            'margin':'5px'
        });

        $('.footerlist').children(':last').children('a').children('img').css({
            'width':'15px',
            'display' :'inline'
        });
    });
});
