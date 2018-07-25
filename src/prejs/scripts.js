$(function(){

  $('.burger').on('click', function(){
    $(this).fadeOut(500);
    $('.close').fadeIn(500);    
  });

  $('.close').on('click', function(){
    $(this).fadeOut(500); 
    $('.burger').fadeIn(500);               
  });

})