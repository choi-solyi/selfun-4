$(document).ready(function(){
    $('.m1:nth-child(1)>h3>a')
        .css({
            'border-top':'2px solid darkblue',
            'border-bottom':'2px solid darkblue',
        }).parent().next().show();

    $('li.m1>h3>a').on('click focus',function(){
        $('li.m1>h3>a')
            .css({
                'border-top':'1px solid silver',
                'border-bottom':'1px solid silver'
            }).parent().next('div').hide();

        $(this).css({
            'border-top':'2px solid darkblue',
            'border-bottom':'2px solid darkblue'
        }).parent().next().show();
    });
});
