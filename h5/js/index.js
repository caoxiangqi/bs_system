var main = document.getElementById("main");
var oLis = document.querySelectorAll("#main>ul>li");
var desW = 640;
var desH = 960;
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
if (winW / winH < desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}

[].forEach.call(oLis, function () {
    var oLi = arguments[0];
    oLi.index = arguments[1];
    oLi.addEventListener("touchstart", start, false);
    oLi.addEventListener("touchmove", move, false);
    oLi.addEventListener("touchend", end, false);
})

window.setTimeout(function(){
    oLis[0].firstElementChild.id="a0";
},1000);
function start(e) {
    this.startY = e.touches[0].pageY;
    this.startX = e.touches[0].pageX;
}
function move(e) {
    e.preventDefault();
    this.flag = true;
    var moveY = e.touches[0].pageY;
    var moveX = e.touches[0].pageX;
    var movePos = moveY - this.startY;
    if(Math.abs(moveX-this.startX)>Math.abs(movePos)){
        this.flag = false;
        return;

    }

    var index = this.index;
    var lastItem = oLis.length - 1;
    [].forEach.call(oLis,function(){
        if(index != arguments[1]){
            arguments[0].style.display = "none";
        }
        arguments[0].className = "";
        arguments[0].firstElementChild.id = "";
    })
    if (movePos > 0) {
        this.prevsIndex = index == 0 ? lastItem : index - 1;

        var duration = -480+movePos;
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,"+duration+"px)";


    } else if (movePos < 0) {
        this.prevsIndex = index == lastItem?0:index+1;
        var duration = 480+movePos;
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,"+duration+"px)";
    }

    oLis[this.prevsIndex].className ="zIndex";
    oLis[this.prevsIndex].style.display = "block";
    this.style.webkitTransform = "scale("+(1-Math.abs(movePos/winH)*1/2)+") translate(0,"+movePos+"px)";

}
function end(e) {
    if(this.flag){
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevsIndex].style.webkitTransition = "0.5s";
        oLis[this.prevsIndex].addEventListener("webkitTransitionEnd",function(){
            this.style.webkitTransition = "";
            this.firstElementChild.id = "a"+this.index

        },false)
        this.flag = false;
    }
}
document.addEventListener("touchmove",function(e){

})