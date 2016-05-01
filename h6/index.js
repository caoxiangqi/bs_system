var main = document.getElementById("main");
var oLis = document.querySelectorAll("#main>ul>li");
var desW = 640;
var desH = 960;
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
if (winW / winH < desW / desH) {//������������ţ��������ź�ֻ����һ�㣬Ȼ����ͼƬ���У��豸��߱���<��ƿ�߱��� �������� ��  �豸��߱���>��ƿ�߱��� ��������
    main.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}

//��ÿ��li�󶨴����¼�touchstart,touchmove,touchend
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
    this.startY = e.touches[0].pageY;//��ó�ʼ��������
    this.startX = e.touches[0].pageX;
}

function move(e) {
    console.log("move");
    e.preventDefault();//��ֹĬ�Ϲ�����Ϊ
    this.flag = true;
    var moveY = e.touches[0].pageY;//����ƶ�ʱ����������
    var moveX = e.touches[0].pageX;
    var movePos = moveY - this.startY;
    if (Math.abs(moveX - this.startX) > Math.abs(movePos)) {
        this.flag = false;
        return;
    }
    var index = this.index;//��ǰͼƬ����
    var lastItem = oLis.length - 1;//���һ������
    [].forEach.call(oLis, function () {
        if (index !== arguments[1]) {
            arguments[0].style.display = "none";
        }
        arguments[0].className = "";
        arguments[0].firstElementChild.id = "";
    });

    if (movePos > 0) {//���»�
        this.prevsIndex = index == 0 ? lastItem : index - 1;
        var duration = -480+movePos;
        oLis[this.prevsIndex].style.webkitTransform = " translate(0," + duration + "px)";
    } else if (movePos < 0) {//���ϻ�
        this.prevsIndex = index == lastItem ? 0 : index + 1;
        var duration = 480 + movePos;
        oLis[this.prevsIndex].style.webkitTransform = " translate(0," + duration + "px)";
    }
    oLis[this.prevsIndex].className ="zIndex";
    oLis[this.prevsIndex].style.display = "block";
    //����ǰ���ŵ�Ч��  ����ֵ=�ƶ�����/�豸�߶�  �ƶ�����=��������
    this.style.webkitTransform = "scale(" + (1 - Math.abs(movePos / winH) *(1 / 2) ) + ") translate(0," + movePos + ")";
}
function end(e) {
    console.log("end");
    if (this.flag) {
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevsIndex].style.webkitTransition = "1s";
        oLis[this.prevsIndex].addEventListener("webkitTransitionEnd", function () {
            //this.style.webkitTransform = "";
            //���Ӷ���Ч��
            this.firstElementChild.id = "a" + this.index;
        }, false);
        this.flag = false;
    }
}
