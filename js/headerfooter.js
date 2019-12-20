$(document).ready(function () {
    $.ajax({
        url: 'header.html',

        success: function (data) {
            $('#header').html(data);
            console.log(data);
        }
    });
    $.ajax({
        url: 'nav.html',

        success: function (data) {
            $('#nav').html(data);
        }
    });
    $.ajax({
        url: 'footer.html',

        success: function (data) {
            $('#footer').html(data);
        }
    });
});
