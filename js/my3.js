$(document).ready(function(){
    $('.sbodyH').click(function(){
        let $this=$(this);
        $this.next('.sbodyD').slideToggle().children().css('background-color','#EAEAEA');
    });
});
