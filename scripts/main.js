(function($) {

  var $window = $(window);
  var $document = $(document);

  $window.scroll(function(){
    headerGrid();

    var $this = $(this);
    var headerHeight = $('.header-wrapper').innerHeight();

    if ($('body.home').length && $('.home_slider').length) {
      if($this.scrollTop() > headerHeight) {
        $('.header').addClass('scrolled');
      } else {
        $('.header').removeClass('scrolled');
      }

    }

    if($('.menu-all-pages-container').hasClass('menu-opened') && winW < 1025) {
      $('.js-toggle-menu').trigger('click');
    }

  });

  //accordion
  $document.on('click', '.accordion_head', function (e){
    e.preventDefault();
    $(this).toggleClass('active');
    $(this).parent().find('.accordion_content').toggleClass('active').fadeToggle();
  });

  //Custom select
  $document.on('change', '.select-custom select, .select-custom-2 select', function(){
    var text = $(this).find('option:selected').text();
    $(this).parent().find('span').text(text);
  });

  $document.on('click', '.btn-minus', function(){
    var value = $(this).closest('.quantity').find('.qty').val();
    if (value >= 2 ) {
      value--;
      $(this).closest('.quantity').find('.qty').val(value);
    }
  });


  $document.on('click', '.btn-plus', function(){
    var value = $(this).closest('.quantity').find('.qty').val();
    value++;
    $(this).closest('.quantity').find('.qty').val(value);
  });

  $document.on('click', '#menu-shortcodes-menu a', function(e){
    e.preventDefault();
    var flag = true;
    var block = $(this).attr('href');
    if($(block).length) {
      var offset = $($(this).attr('href')).offset().top;

      if(flag) {
        flag = false;
        $('body,html').animate({scrollTop: offset - 148}, 500 , function(){
          flag = true;
        });
      }
    }
  });

  var winW = $window.width();

  $window.resize(function(){
    winW = $window.width();

    if(winW > 968) {
      $('.nav .menu-item-has-children').removeClass('active').find('ul').attr('style', '');
    }
  });

  $window.load(function(){
    "use strict";
    $("#status").fadeOut(350); // will first fade out the loading animation
    $("#preloader").delay(350).fadeOut(200); // will fade out the white DIV that covers the website.
    $('.home_slider').removeClass('load-hidden');
  });

  $document.ready(function() {

    if($('.fancybox').length) {
      $('.fancybox').fancybox();
    }

    headerGrid();

    var $sidebar_sel = $('.widget').find('select');
    if($sidebar_sel.length) {
      $sidebar_sel.each(function(){
        $(this).wrap('<div class="select-custom-2" />');
        var option = $(this).find('option:selected').text();
        $(this).parent().prepend('<span>'+option+'</span>');
      });
    }

    var $homeSlider = $('.home_slider');
    if($homeSlider.length) {
      $homeSlider.find('li img').each(function(){

        $(this).parent().css({
          backgroundImage: "url("+$(this).attr('src')+")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        });
        $(this).remove();
      });
    }
  });

  (function () {
    var $container = $('.js-numbers');

    if (!$container.length) {
      return;
    }

    var $numbers = $container
      .find('.count-block b')
      .each(function () {
        $.data(this, 'endValue', this.textContent);
        this.textContent = 0;
      });

    var height = $container.height();
    var offset = $container.offset();

    var checkpointA = offset.top - ($window.height() - height) / 2;
    var checkpointB = checkpointA + $window.height();

    $window.on('scroll.numbers', function () {
      var scrollTop = $(this).scrollTop();

      if ($.inviewport($container, {threshold : 0})) {
        $numbers.each(function () {
          var $el = $(this);

          $el.prop('Counter', 0).animate({
            Counter: $.data(this, 'endValue'),
          }, {
            duration: 2000,
            easing: 'swing',
            step: function (now) {
              $el.text(Math.ceil(now));
            }
          });
        });

        $window.off('scroll.numbers');
      }
    }).trigger('scroll.numbers');
  })();

  $document.on('click', '.js-toggle-menu', function(){
    $('.menu-all-pages-container').toggleClass('menu-opened');
    $(this).toggleClass('active');
    if($(this).hasClass('active')) {
      $(this).removeClass('fa-bars').addClass('li-times');
    } else {
      $(this).removeClass('li-times').addClass('fa-bars');
      $('.nav .menu-item-has-children').removeClass('active').find('ul').attr('style', '');
    }
  });

  $document.on('click', '.nav .menu-item-has-children', function(e){
    if(winW < 968) {

      e.stopPropagation();

      $(this).find('ul').first().slideToggle();
      if($(this).hasClass('active')) {
        $(this).removeClass('active');
      } else {
        $(this).addClass('active');
      }
    }
  });

  $document.on('click', '.close_modal', function(e){
    e.preventDefault();
    if($('.li_modal').length && $('.li_modal').is(':visible')) {
      $('.li_modal').fadeOut(350);
    }
  });


  $document.on('click', '.header_trigger_search .fa-search', function(e){
    e.preventDefault();
    var modal = $(this).data('modal');
    $('.'+modal).fadeIn(350);
  });

  if($('#myElement').length) {
    //Post swiper

    var $news_content = $('.news_content_item');
    var $news_images = $('.news_wrap_image');

    $(document).on('click', '.news_pagination li', function(){
      $('.news_pagination li').removeClass('active');
      $(this).addClass('active');
      var $index = $(this).index();
      $news_content.siblings('.active_item').removeClass('active_item');
      $news_content.eq($index).addClass('active_item');
      $news_images.siblings('.active_item').removeClass('active_item');
      $news_images.eq($index).addClass('active_item');
    });


    var myElement = document.getElementById('myElement');

    $news_images.each(function() {
      var href = $(this).data('href');
      var swiper = new Hammer(this);

      swiper.on('tap', function() {
        window.location.href = href;
      });
    });


    // create a simple instance
    // by default, it only adds horizontal recognizers
    var libertySwiper = new Hammer(myElement, {
      domEvents: false
    });

    libertySwiper.on("swiperight", function(ev) {
      ev.srcEvent.stopPropagation();
      ev.srcEvent.preventDefault();
      if(!$('.news_pagination li:first').hasClass('active')) {
        $('.news_pagination .active').prev().trigger('click');
      } else {
        $('.news_pagination li:last').trigger('click');
      }

    });

    libertySwiper.on("swipeleft", function(ev) {
      ev.srcEvent.stopPropagation();
      ev.srcEvent.preventDefault();
      if(!$('.news_pagination li:last').hasClass('active')) {
        $('.news_pagination .active').next().trigger('click');
      } else {
        $('.news_pagination li:first').trigger('click');
      }
    });

  }

  function headerGrid() {
    if($('body').data('grid')) {
      if($(window).scrollTop() > 0) {
        $('body').attr('data-grid', false);
      } else {
        $('body').attr('data-grid', true);
      }
    }
  }

  $(document).on('click', '.icon-burger-trigger', function(){
    $('body').attr('data-grid', false);
  });

  // Filter Ajax Load More
  var alm_is_animating = false;
  $('#alm-filter-nav li').eq(1).addClass('active'); // Set the initial button active state

  // Nav btn click event
  $('#alm-filter-nav li a').on('click', function(e){
     e.preventDefault();
     var el = $(this); // Our selected element

     if(!el.hasClass('active') && !alm_is_animating){ // Check for active and !alm_is_animating
        alm_is_animating = true;
        el.parent().addClass('active').siblings('li').removeClass('active'); // Add active state

        var data = el.data(), // Get data values from selected menu item
            transition = 'fade', // 'slide' | 'fade' | null
            speed = '300'; //in milliseconds

        $.fn.almFilter(transition, speed, data); // reset Ajax Load More (transition, speed, data)
     }
  });

  $.fn.almFilterComplete = function(){
     alm_is_animating = false; // clear alm_isanimating flag
  };

})(jQuery); // Fully reference jQuery after this point.
