$(function(){
    var swiper = new Swiper('.swiper-container', {
        mode:'horizontal',
        loop: true,
        autoplay:5000,
        pagination: '.swiper-pagination',
        autoplayDisableOnInteraction:true
    });

    $(window).resize(function(){
        ckSize()
    });
    function ckSize(){
        $(".banner-iphone,.swiper-wrapper,.swiper-slide").height($(window).width()*(0.54));

    };
    ckSize()


})