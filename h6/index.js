var main = document.getElementById("main");
var oLis = document.querySelectorAll("#main>ul>li");
var desW = 640;
var desH = 960;
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
if (winW / winH < desW / desH) {//按比例大的缩放，这样缩放后只会多出一点，然后让图片居中；设备宽高比例<设计宽高比例 按高缩放 ；  设备宽高比例>设计宽高比例 按宽缩放
    main.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}

//给每个li绑定触摸事件touchstart,touchmove,touchend
[].forEach.call(oLis, function () {
    var oLi = arguments[0];
    oLi.index=arguments[1];
    oLi.addEventListener("touchstart", start, false);
    oLi.addEventListener("touchmove", move, false);
    oLi.addEventListener("touchend", end, false);
});
window.setTimeout(function () {
    oLis[0].firstElementChild.id = "a0";
}, 1000);
function start(e) {
    console.log("start");
    this.startY = e.touches[0].pageY;//获得初始触摸坐标
    this.startX = e.touches[0].pageX;
}

function move(e) {
    console.log("move");
    e.preventDefault();//阻止默认滚动行为
    this.flag = true;
    var moveY = e.touches[0].pageY;//获得移动时触摸点坐标
    var moveX = e.touches[0].pageX;
    var movePos = moveY - this.startY;
    if (Math.abs(moveX - this.startX) > Math.abs(movePos)) {
        this.flag = false;
        return;
    }
    var index = this.index;//当前图片索引
    var lastItem = oLis.length - 1;//最后一张索引
    [].forEach.call(oLis, function () {
        if (index !== arguments[1]) {
            arguments[0].style.display = "none";
        }
        arguments[0].className = "";
        arguments[0].firstElementChild.id = "";
    });

    if (movePos > 0) {//往下滑
        this.prevsIndex = index == 0 ? lastItem : index - 1;
        var duration = -480+movePos;
        oLis[this.prevsIndex].style.webkitTransform = " translate(0," + duration + "px)";
    } else if (movePos < 0) {//往上滑
        this.prevsIndex = index == lastItem ? 0 : index + 1;
        var duration = 480 + movePos;
        oLis[this.prevsIndex].style.webkitTransform = " translate(0," + duration + "px)";
    }
    oLis[this.prevsIndex].className ="zIndex";
    oLis[this.prevsIndex].style.display = "block";
    //处理当前这张的效果  缩放值=移动距离/设备高度  移动距离=滑动距离
    this.style.webkitTransform = "scale(" + (1 - Math.abs(movePos / winH) *(1 / 2) ) + ") translate(0," + movePos + ")";
}
function end(e) {
    console.log("end");
    if (this.flag) {
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevsIndex].style.webkitTransition = "1s";
        oLis[this.prevsIndex].addEventListener("webkitTransitionEnd", function () {
            //this.style.webkitTransform = "";
            //增加动画效果
            this.firstElementChild.id = "a" + this.index;
        }, false);
        this.flag = false;
    }
}
