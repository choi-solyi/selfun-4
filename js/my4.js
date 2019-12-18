$('i').on('click',function(){
    $(this).parent().css('display','none');
    i--;
   /*$(this).next().children().css('display','none');
   $(this).next().next().css('display','none'); */
});
$('#likeorder').on('click',function(){
   $(this).children().children().css('color'.'red')
});
