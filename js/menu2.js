$('li').on('click', function () {
    $('li').children().children().filter('img').css('border', '0px solid #7b94ff');
    $('li').children().children().filter('p').css('color', 'black');
    $(this).children().children().filter('img').css('border', '2px solid #7b94ff');
    $(this).children().children().filter('p').css('color', '#7b94ff');
});
/*$('#chevronleft').on('click', function () {

    var $width = $('#category>li').outerWidth(true);

    //$("li:last").insertBefore("li:first");
    $("#category").css({
        left: $width * -1 + "px"
    });

});



$('#chevronright').on('click', function () {
    var $width = $('#category>li').outerWidth(true);
    $('#category').animate({
        left: ($width * -1) + "px"
    }, 300, 'swing', function () {
        $("#category").children('li:first')
            .insertAfter($("#category").children('li:last'));

    });

});*/
