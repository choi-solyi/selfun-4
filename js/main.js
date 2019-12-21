$(document).ready(function () {
    /*    $('.m1:nth-child(1)>h3>a')
            .css({
                'border-top': '2px solid #7b94ff',
                'border-bottom': '2px solid #7b94ff',
            }).parent().next().show();

            $('li.m1>h3>a').on('click focus', function () {
                        $('li.m1>h3>a')
                            .css({
                                'border-top': '1px solid silver',
                                'border-bottom': '1px solid silver'
                            }).parent().next('div').hide();
            $(this).css({
                'border-top':'2px solid #7b94ff',
                'border-bottom':'2px solid #7b94ff'
            }).parent().next().show();
        });*/

    $.ajax({
        url: 'ranking.html',

        success: function (data) {
            $('.ranking').html(data);
            console.log(data);
        }
    });
    $('#toza').css({'font-weight':'900','color':'#7b94ff'});
    $('#toza').on('click', function () {
        $.ajax({
            url: 'ranking.html',

            success: function (data) {
                $('.ranking').html(data);
                console.log(data);
            }
        });
        $(this).css({'font-weight':'900','color':'#7b94ff'});
        $('#reward').css({'font-weight':'none','color':'#181818'});
    });

    $('#reward').on('click', function () {
        $.ajax({
            url: 'ranking2.html',

            success: function (data) {
                $('.ranking').html(data);
                console.log(data);
            }
        });

        $(this).css({'font-weight':'900','color':'#7b94ff'});
        $('#toza').css({'font-weight':'none','color':'#181818'});
    });


    /*$('div.mainFir').mouseenter(function(){
        $(this).fadeOut(1000)


    });*/
});
