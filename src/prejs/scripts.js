$(function(){
  
  let links = $('.menu-items a');
  let menu_height = parseInt($('.menu-items').height());
  let scrollTimer;
  let btn_up = $('.btn-up');
  let btn_hide = true;

  links.on('click', function(e){

    e.preventDefault();

    links.removeClass('active-item');
    let active_item = $(this).addClass('active-item');
    let selector = active_item.attr('href');
    let target = $(selector);

    if(target.length > 0) {
      $('html, body').animate({
        scrollTop: target.offset().top - menu_height
      }, 500);
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
    }, 500);

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

});