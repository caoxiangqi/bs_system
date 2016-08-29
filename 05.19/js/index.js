//解决移动端点击延迟300ms问题；
window.onload = function(){
    setTimeout(function(){
        document.getElementById("mu0").remove();
        var p1 = document.getElementsByClassName("page1")[0];
        p1.id="page1";
    },1500);
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



//var music = document.getElementById("music"),
//    musicAudio = document.getElementById("musicAudio");
//window.setTimeout(function () {
//    musicAudio.play();//->让音频播放:浏览器开始下载资源文件,也就是让它播放到出声音还需要一段时间,只有发出声音后我们才会显示音乐的图标
//    musicAudio.addEventListener("canplay", function () {
//        //->canplay:音频文件已经可以播放了,但是不一定是所有资源都加载完成了,大部分是边播放边界
//        music.style.display = "block";
//        music.className = "music move";
//    }, false);
//}, 1000);
//music.addEventListener("click", function () {
//    //->当前是暂停状态我让其播放
//    if (musicAudio.paused) {
//        musicAudio.play();
//        music.className = "music move";
//        return;
//    }
//    //->当前是播放状态我让其暂停
//    musicAudio.pause();
//    music.className = "music";
//}, false);