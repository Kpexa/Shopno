$(function(){

  let links = $('.menu-items a');
  let menu_height = parseInt($('.menu-items').height());

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

  let scrollTimer;

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

      if((target.offset().top < current_scroll + 400)) {
        links.removeClass('active-item');
        $(this).addClass('active-item');
      }

    });

  }

});