$(document).ready(function () {
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



});
