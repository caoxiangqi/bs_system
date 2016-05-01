/**
 * Created by Administrator on 2016/4/27.
 */
var main=document.querySelector("#main");
var desW=750;
var desH=1334;
var winW=document.documentElement.clientWidth;
var winH=document.documentElement.clientHeight;
var oLis=document.querySelectorAll(".oIndex>li");
if(winW/winH<desW/desH){
    main.style.webkitTransform="scale("+winH/desH+")";
}else{
    main.style.webkitTransform="scale("+winW/desW+")";
}

function fnLoad(){
    var arr=["back.jpg","messageHead1.png","messageHead2.png","messageArrow1.png","messageArrow2.png","bool.png","end.png","group.png","inpu.png",
        "li.jpg","logo.png","peopel1.png","peopel2.png","arr.png","music_off.png","music_on.png","peopel3.png","show.jpg","show2.png"];
    var loading=document.querySelector("#loading");
    var process=document.querySelector(".process");
    var n=0;
    arr.forEach(function(){
        var oImg=new Image;
        oImg.src="img/"+arguments[0];
        oImg.onload=function(){
            n++;
            process.style.width=n/arr.length*100+"%";
            process.addEventListener("webkitTransitionEnd",function(){
                this.style.webkitTransition="";
            },false);

            if(n==arr.length&&loading){
                window.setTimeout(function(){
                    main.removeChild(loading);
                    firstPage();
                },1000);
            }
        }
    });
}

fnLoad();
var interviewBox=document.querySelector(".interviewBox");
var interview=document.querySelector("#interview");
function firstPage(){
    window.setTimeout(function(){
        interviewBox.style.webkitTransform="rotateY(720deg)";
        interviewBox.style.webkitTransition = "1s";
        interviewBox.addEventListener("webkitTransitionEnd",function() {
            this.style.webkitTransition = "";
            delayD(interview,fnDetail);
        },false);
    },2000);
}

var des=document.querySelector(".detail");
var oList=document.querySelectorAll(".detail>ul>li");
var oUl=document.querySelector(".detail>ul");

function fnDetail(){
    var n=0;//li的索引
    var h=null;//保存已经出现的li的高度之和
    var timer=window.setInterval(function(){
        oList[n].style.opacity="1";
        oList[n].style.webkitTransform="translate(0,0)";
        oList[n].addEventListener("webkitTransitionEnd",function(){
            this.style.webkitTransition = "";
        },false);
        h+=oList[n].offsetHeight-30;
        n++;
        if(n>=9&&!oUl.flag){
                //这里加个定时器是为了停顿下
                window.setTimeout(function () {
                    oUl.style.webkitTransform = "translate(0," + (-h) + "px)";
                    oUl.style.webkitTransition = "1s";
                    oUl.addEventListener("webkitTransitionEnd",function(){
                        this.style.webkitTransition ="";
                        oUl.flag=true;
                    },false);
                }, 80);
        }
        if(n==oList.length){
            window.clearInterval(timer);
                var timerEnd=window.setTimeout(function(){
                    if(!this.lick){
                        var arr=document.createElement("div");
                        arr.className="arr";
                        des.appendChild(arr);
                        delayD(des,fnTarget);
                        this.lick=true;
                    }
                },1000);
        }

    },1000)

}

var target=document.querySelector(".target");
var lightLeft=document.querySelector(".lightLeft");
var lightRight=document.querySelector(".lightRight");
var group=document.querySelector(".group");
function fnTarget(){
    lightLeft.style.webkitAnimationPlayState="running";
    lightRight.style.webkitAnimationPlayState="running";
    lightLeft.style.webkitAnimationFillMode="forwards";
    lightRight.style.webkitAnimationFillMode="forwards";

    group.style.webkitTransform="rotateY(360deg)";
    group.style.webkitTransition = "1s";
    group.addEventListener("webkitTransitionEnd",function(){
        this.style.webkitTransition ="";
        delayD(target,fnUnique);
    },false);

}
var unique=document.querySelector(".unique");
var oLi=document.querySelector(".list");
function fnUnique(){
    oLi.id="a0";
    delayD(unique);
}


function delayD(box,fn){
    clearInterval(winTimer);
    var winTimer=window.setTimeout(function(){
        main.removeChild(box);
         return typeof fn==="function"? fn():null;
    },5000);
}

