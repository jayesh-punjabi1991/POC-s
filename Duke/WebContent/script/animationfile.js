/* script for animation */

(function($) {
  $.fn.myanimate = function(new_options) {

    var options = {
      animate: 'anim',
      mydelay: 'delay',
      screenWidth_small: '1400',
    };
   
    if(new_options) {
      $.extend(options, new_options);
    }
    animate();
    // initialize the tabs
    function animate() {
     $(window).scroll(function() {
   var scrollY = $(window).scrollTop();
  $(".myanim").each(function(){debugger
  var y = $(this).offset().top;
  var myBtnType = $(this).data(options.animate);
  var myDelay = $(this).data(options.mydelay);
  var diff = scrollY - y;
  var domPos = -750;
  var winHeight = $(window).height();
  var winWidth = $(window).width();
  if (winWidth > 1800 && winHeight > 900){
    domPos = -1050;
  }
 else if (winHeight > 850){
  domPos = -750;
  } 
  console.log(domPos);
  if (diff > domPos) {
  if($(this).attr('data-delay')){
  $(this).delay(myDelay).queue(function(next){  
  $(this).addClass(myBtnType);
  next();
});
    }else{$(this).addClass(myBtnType);}
    }
});
}); 
 screenwidth_detect();   
 screen_refresh(); 
}

function screenwidth_detect(){
      var screenWidth = $(window).width();
      $(".myanim").each(function(){
        if(screenWidth > options.screenWidth_small){
          $(this).css('opacity','1');
        }
      });
    }

function screen_refresh(){
  $(window).on('beforeunload',function() {
    $(this).scrollTop(0);
  });
}

    return this;
  }
})(jQuery);


$(document).ready(function(){
  $('.myanim').myanimate();
})
