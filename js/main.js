$(document).ready(function(){
    $('.m1:nth-child(1)>h3>a')
        .css({
            'border-top':'2px solid #7b94ff',
            'border-bottom':'2px solid #7b94ff',
        }).parent().next().show();

    $('li.m1>h3>a').on('click focus',function(){
        $('li.m1>h3>a')
            .css({
                'border-top':'1px solid silver',
                'border-bottom':'1px solid silver'
            }).parent().next('div').hide();

        $(this).css({
            'border-top':'2px solid #7b94ff',
            'border-bottom':'2px solid #7b94ff'
        }).parent().next().show();
    });

    /*$('div.mainFir').mouseenter(function(){
        $(this).fadeOut(1000)


    });*/
});
