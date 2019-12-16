//메뉴 클릭시 굵은글씨 + 폰트컬러변경
$(document).ready(function(){
    $('ul.mainnav li').on('click',function(){
        let $this=$(this);
        $this.addClass('menuclick');
        $this.siblings().removeClass();
    });
    ///
    $('ul.mainnav li').on('click', function(){
        $('#ar1').load('menu1.html');
    });

});
