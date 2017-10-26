$(document).ready(function(){


$('.navicon').click(function(){

    $('.sidebar-section').addClass('left-side');
});

$('.close-side').click(function(){

$('.sidebar-section').removeClass('left-side');
});


$('.carousel').carousel({
    interval: 1000000
}); 


 $(window).scroll(function(){
    if($(this).scrollTop() > 80){
        console.log('runnind');
        $('header').addClass('cssanimateHeader');
        $('.nav-header').addClass('back-color');
    }
    else{
        $('header').removeClass('cssanimateHeader');
        $('.nav-header').removeClass('back-color');
 }

});

$('.panel-title li').click(function(){
$(this).find(".fa-chevron-down").toggleClass('rotaterev');
$(this).find(".fa-chevron-right").toggleClass('rotate');
});








});




