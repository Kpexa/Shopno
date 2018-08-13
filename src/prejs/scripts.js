$(function(){
  
  let links = $('.menu-items a');
  let menu_height = parseInt($('.menu-items').height());
  let scrollTimer;
  let btn_up = $('.btn-up');
  let btn_hide = true;
  let menu_btn = $('.nav-tittle');  
  let menu_items = $('.menu-items li');
  let btn_contact_us = $('.contact-us');

  links.on('click', function(e){

    e.preventDefault();

    links.removeClass('active-item');
    let active_item = $(this).addClass('active-item');
    let selector = active_item.attr('href');
    let target = $(selector);

    if(target.length > 0) {
      $('html, body').animate({
        scrollTop: target.offset().top - menu_height
      }, 700);
    }

  });
  
  $(document).on('scroll', function(){

    let current_scroll = $(this).scrollTop();

    if(btn_hide && current_scroll >= 400) {
      btn_up.stop(true).fadeIn(500);
      btn_hide = false;
    } else if(!btn_hide && current_scroll < 400) {
      btn_up.stop(true).fadeOut(500);
      btn_hide = true;
    } 

  });

  btn_up.on('click', function(){

    $('html, body').animate({
      scrollTop: 0
    }, 700);

  });

  $(document).on('scroll', function(){

    clearInterval(scrollTimer);

    scrollTimer = setTimeout(() => {
      selectActiveMenuItem.call(this);
    }, 100);

  });

  function selectActiveMenuItem() {

    let current_scroll = $(this).scrollTop();

    links.each(function(){
      let a = $(this);
      let selector = a.attr('href');
      let target = $(selector);

      if((target.offset().top < current_scroll + 300)) {
        links.removeClass('active-item');
        $(this).addClass('active-item');
      }

    });

  }

  menu_btn.on('click', function(){

    $(this).toggleClass('active-nav-tittle');

    menu_items.slideToggle(300, function(){

      if($(this).css('display') === 'none') {
        $(this).removeAttr('style');
      }

    });

  });

  btn_contact_us.on('click', function(){    

    $('html, body').animate({
      scrollTop: $('#contacts').offset().top + 550
    }, 700);

  });  

});