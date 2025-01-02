/*-----------------------------------------------------------------

Template Name: Orizan business Html Template 
Author:  Gramentheme
Author URI: https://themeforest.net/user/gramentheme/portfolio
Version: 1.0.0
Description: Orizan business Html Template <

-------------------------------------------------------------------
CSS TABLE OF CONTENTS
-------------------------------------------------------------------

01. header
02. animated text with swiper slider
03. magnificPopup
04. counter up
05. wow animation
06. nice select
07. swiper slider
08. search popup
09. mousecursor 
09. preloader 


------------------------------------------------------------------*/

(function($) {
    "use strict";

    $(document).ready( function() {

        //>> Mobile Menu Js Start <<//
        $('#mobile-menu').meanmenu({
            meanMenuContainer: '.mobile-menu',
            meanScreenWidth: "1199",
            meanExpand: ['<i class="far fa-plus"></i>'],
        });

        //>> Sidebar Toggle Js Start <<//
        $(".offcanvas__close,.offcanvas__overlay").on("click", function() {
            $(".offcanvas__info").removeClass("info-open");
            $(".offcanvas__overlay").removeClass("overlay-open");
        });
        $(".sidebar__toggle").on("click", function() {
            $(".offcanvas__info").addClass("info-open");
            $(".offcanvas__overlay").addClass("overlay-open");
        });

        //>> Body Overlay Js Start <<//
        $(".body-overlay").on("click", function() {
            $(".offcanvas__area").removeClass("offcanvas-opened");
            $(".df-search-area").removeClass("opened");;
            $(".body-overlay").removeClass("opened");
        });

        //>> Sticky Header Js Start <<//

        $(window).scroll(function() {
            if ($(this).scrollTop() > 250) {
                $("#header-sticky").addClass("sticky");
            } else {
                $("#header-sticky").removeClass("sticky");
            }
        });

        //>> Video Popup Start <<//
        $(".img-popup").magnificPopup({
            type: "image",
            gallery: {
                enabled: true,
            },
        });

        $('.video-popup').magnificPopup({
            type: 'iframe',
            callbacks: {
            }
        });
        
        //>> Counterup Start <<//
        $(".count").counterUp({
            delay: 15,
            time: 4000,
        });

        //>> Wow Animation Start <<//
        new WOW().init();

        //>> Hero-1 Slider Start <<//
       const sliderActive2 = ".hero-slider";
       const sliderInit2 = new Swiper(sliderActive2, {
           loop: true,
           slidesPerView: 1,
           effect: "fade",
           speed: 3000,
           autoplay: {
               delay: 5000,
               disableOnInteraction: false,
           },
           navigation: {
            nextEl: ".array-prev",
            prevEl: ".array-next",
          },
       });
       function animated_swiper(selector, init) {
           const animated = function animated() {
               $(selector + " [data-animation]").each(function () {
                   let anim = $(this).data("animation");
                   let delay = $(this).data("delay");
                   let duration = $(this).data("duration");
                   $(this)
                       .removeClass("anim" + anim)
                       .addClass(anim + " animated")
                       .css({
                           webkitAnimationDelay: delay,
                           animationDelay: delay,
                           webkitAnimationDuration: duration,
                           animationDuration: duration,
                       })
                       .one("animationend", function () {
                           $(this).removeClass(anim + " animated");
                       });
               });
           };
           animated();
           init.on("slideChange", function () {
               $(sliderActive2 + " [data-animation]").removeClass("animated");
           });
           init.on("slideChange", animated);
       }
       animated_swiper(sliderActive2, sliderInit2);
       //>> Banner Animation <<//

        //>> Nice Select Start <<//
        $('select').niceSelect();

       //>> Brand Slider Start <<//
       if($('.project-slider').length > 0) {
        const projectSlider = new Swiper(".project-slider", {
            spaceBetween: 30,
            speed: 2000,
            loop: true,
            autoplay: {
                delay: 1000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".dot",
                clickable: true,
            },
            navigation: {
              nextEl: ".array-prev",
              prevEl: ".array-next",
          },
            breakpoints: {
                1399: {
                    slidesPerView: 4,
                },
                1199: {
                    slidesPerView: 3,
                },
                991: {
                    slidesPerView: 2,
                },
                767: {
                    slidesPerView: 1,
                },
                575: {
                    slidesPerView: 1,
                },
                0: {
                    slidesPerView: 1,
                },
            },
        });
    }

     //>>Testimonial Slider Start <<//
    if($('.testimonial-active').length > 0) {
        const testimonialActive = new Swiper(".testimonial-active", {
            spaceBetween: 30,
            speed: 2000,
            loop: true,
            autoplay: {
                delay: 1000,
                disableOnInteraction: false,
            },
            breakpoints: {
                1199: {
                    slidesPerView: 3,
                },
                991: {
                    slidesPerView: 3,
                },
                767: {
                    slidesPerView: 2,
                },
                575: {
                    slidesPerView: 2,
                },
                0: {
                    slidesPerView: 1,
                },
            },
        });
    }

    // 13.Back to top btn    
    $(window).scroll(function () {
        if ($(this).scrollTop() > 20) {
            $("#back-top").addClass("show");
        } else {
            $("#back-top").removeClass("show");
        }
    });
    $("#back-top").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 800);
        return false;
    });

    }); // End Document Ready Function



    // function loader() {
    //     $(window).on('load', function() {
    //         // Animate loader off screen
    //         $(".preloader").addClass('loaded');                    
    //         $(".preloader").delay(600).fadeOut();                       
    //     });
    // }

    // loader();
   

})(jQuery); // End jQuery

