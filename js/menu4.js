$(document).ready(function(){

    $('.jumoon').click(function(){
//        $('.popupfull').css('display','block');
        $('.popupfull').css('display','block');
    });

    $('.rejumoon').click(function(){
        $('.popupfull').css('display','block');
    });

    $('.popupset').siblings().click(function(){

        $('.popupfull').css('display','none');
    });
});
//visibility('visible')
