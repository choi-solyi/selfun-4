$(document).ready(function(){
    $('.sbodyH').click(function(){
        let $this=$(this);
        $this.next('.sbodyD').slideToggle().children('p').css('background-color','#EAEAEA');
    });
});
