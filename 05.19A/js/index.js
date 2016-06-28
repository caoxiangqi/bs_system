//解决移动端点击延迟300ms问题；
window.onload = function(){
    var p1 = document.getElementsByClassName("page1")[0];
    p1.id="page1";
    console.log("t")
};



FastClick.attach(document.body);

// 适配HTML font-size
(function () {
    var winW = document.documentElement.clientWidth || document.body.clientWidth,
        desW = 750;
    document.documentElement.style.fontSize = winW / desW * 100 + "px";
})();


//创建个Swiper
new Swiper(".swiper-container", {
    loop: false,
    direction: "vertical",
    effect: "coverflow",
    onSlidePrevEnd: changeEnd,
    onSlideNextEnd: changeEnd
});

function changeEnd(swiper) {
    var n = swiper.activeIndex,
        slideAry = swiper.slides;
    [].forEach.call(slideAry, function (slide, index) {
        if (n === index) {
            //slide.id = (n == 0) ? "page1" : "page2";
            if (n == 0) {
                slide.id = "page1"
            } else if (n == 1) {
                slide.id = "page2"
            } else if (n == 2) {
                slide.id = "page3"
            } else if (n == 3) {
                slide.id = "page4"
            } else if (n == 4) {
                slide.id = "page5"
            }
            return;
        }
        slide.id = "n" + index;
    });
}