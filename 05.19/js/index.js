//����ƶ��˵���ӳ�300ms���⣻
window.onload = function(){
    setTimeout(function(){
        document.getElementById("mu0").remove();
        var p1 = document.getElementsByClassName("page1")[0];
        p1.id="page1";
    },1500);
};



FastClick.attach(document.body);

// ����HTML font-size
(function () {
    var winW = document.documentElement.clientWidth || document.body.clientWidth,
        desW = 750;
    document.documentElement.style.fontSize = winW / desW * 100 + "px";
})();


//������Swiper
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
//    musicAudio.play();//->����Ƶ����:�������ʼ������Դ�ļ�,Ҳ�����������ŵ�����������Ҫһ��ʱ��,ֻ�з������������ǲŻ���ʾ���ֵ�ͼ��
//    musicAudio.addEventListener("canplay", function () {
//        //->canplay:��Ƶ�ļ��Ѿ����Բ�����,���ǲ�һ����������Դ�����������,�󲿷��Ǳ߲��ű߽�
//        music.style.display = "block";
//        music.className = "music move";
//    }, false);
//}, 1000);
//music.addEventListener("click", function () {
//    //->��ǰ����ͣ״̬�����䲥��
//    if (musicAudio.paused) {
//        musicAudio.play();
//        music.className = "music move";
//        return;
//    }
//    //->��ǰ�ǲ���״̬��������ͣ
//    musicAudio.pause();
//    music.className = "music";
//}, false);