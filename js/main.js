$(document).ready(function () {

  (function ($) {
    "use strict"; 
    
    $("#main").on('click', 'a.js-scroll-trigger[href*="#"]:not([href="#"])', function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top)
          }, 1000, "easeInOutExpo");
          return false;
        }
      }
    });

    $("#main").on('click', '.js-scroll-trigger', function () {
      $('.navbar-collapse').collapse('hide');
    });

    $('body').scrollspy({
      target: '#sideNav'
    });

    $("#main").on('click', '#cancel-logout', function () {
      $('html, body').animate({
        scrollTop: $("#about").offset().top
      }, 1000, "easeInOutExpo");
    });

  })(jQuery);

});