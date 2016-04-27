$(function () {
    //全局hover
    $(".kw").hover(function () {
        $(this).toggleClass("hover");
    });

    //全局currr
    $(".tab2 li").click(function () {
        $(this).siblings().removeClass("curr");
        $(this).addClass("curr");
    });

    //复选框
    $(".checkbox").parent().click(function () {
        $(this).find(".checkbox").toggleClass("checkbox_checked");
    });

    //打开弹框
    $(".dialogOpen").click(function () {
        $(".dialogBox").fadeIn(300);
    });

    //关闭弹框
    $(".dialogClose").click(function () {
        $(this).parents(".dialogBox").fadeOut(400);
    });
    $(document).click(function (e) {
        $(".tipBox_sub").hide();
    });

    //首页导航  
    var nav_level2 = $(".nav_level2"),
          isIndex = $(".indexCurr").length ? true : false,
          nav_li = $(".nav_li"),
          nav_level2 = $(".nav_level2");
    //判断是否首页
    if (isIndex) {
        nav_li.addClass("hover");
        nav_level2.addClass("show");
    }
    $(".nav_li").hover(function () {
        $(this).addClass("hover").find(".nav_level2").addClass("show");
    }, function () {
        if (!isIndex) {
            $(this).removeClass("hover");
            nav_level2.removeClass("show");
        }
    });
    var timerNav1 = null,
          timerNav2 = null;
    $(".nav_level2_li").hover(function () {
        clearTimeout(timerNav1);
        clearTimeout(timerNav2);
        var _this = $(this);
        timerNav1 = setTimeout(function () {
            _this.siblings().removeClass("hover"); _this.addClass("hover");
            $(".level2Box").css("border-color", "#C8C8C8");
            _this.prev().find(".level2Box").css("border-color", "#EEE");
            _this.find(".level2Box").css("border-color", "#FFF");
        }, 300);
    }, function () {
        clearTimeout(timerNav2);
        var _this = $(this);
        timerNav2 = setTimeout(function () {
            _this.removeClass("hover");
            $(".level2Box").css("border-color", "#C8C8C8");
        }, 300);
    });
    $(".tipBox_parent").click(function () {
        $(".tipBox_sub").show();
    });
    $(".icon_close").click(function (e) {
        $(".tipBox_sub").hide();
        e.stopPropagation();
    });
    //网站品牌下 A添加Clas
    $(".wz_pp_box_b_tit a").click(function(){
        $(this).addClass("wz_on").siblings().removeClass("wz_on");
    });
    //修改弹窗日期定位错误
    $(" .chooseDateBox input").click(function () {
        var _this = $(this),
    	nowObj = $("div[lang='zh-cn']");
        _this.parents(".dialogBox").length ? nowObj.css({ "position": "fixed", "top": "50%", "margin-top": "-20px" }) : nowObj.css({ "position": "absolute", "margin-top": "0" });
    });

    //详情页选择颜色
    $(".a_checkBox").click(function () {
        $(this).addClass("a_checkBox_curr").siblings().removeClass("a_checkBox_curr");
    });

    //全局tab
    $(".tab li").click(function () {
        var _this = $(this),
        index = _this.index(),
        objs = _this.parent().siblings();
        _this.siblings().find("a").removeClass("curr");
        _this.find("a").addClass("curr");
        objs.removeClass("show");
        objs.eq(index).addClass("show");

		if(index == 3){
            loadComment();
        }
    });
});
function addFavoriteOk(obj) {
    //$(this).children().animate({ "top": "-200px", "opacity": "0" }, function () {
    //    $(this).css({ "background-position": "-15px -58px", "opacity": "1", "top": "0" });
    //});
    var html = "<span style='position:absolute;left:30px;color:#FF0000;'>+1</span>", _this = $(obj);
    _this.append(html);
    var temTip = _this.children("span");
    temTip.animate({ "bottom": "50px", "opacity": "0" }, 700, function () {
        temTip.css({ "opacity": "1", "top": "0" }).remove();
    });
}
//全局提示tip，目前只支持成功和失败两种状态
function yfTip(tipType, tipTxt) {
    var tipHtml;
    tipType ? tipHtml = "<div class='dialogCon yfTip'>" + tipTxt + "</div>" : tipHtml = "<div class='dialogCon yfTip yfTip0'>" + tipTxt + "</div>";
    var div = document.createElement("div");
    div.className = 'dialogBox ';
    div.innerHTML = tipHtml;
    document.body.appendChild(div);
    $(div).fadeIn(200);
    setTimeout(function myfunction() {
        var _div = $(div);
        _div.fadeOut(1000, function () {
            _div.remove();
        });
    }, 1300);
}


//评价
function rate(obj, oEvent) {
    var imgSrc = '/res/md/css/images/icon_star_1.gif';
    var imgSrc_2 = '/res/md/css/images/icon_star_2.gif';
    if (obj.rateFlag) return;
    var e = oEvent || window.event;
    var target = e.target || e.srcElement;
    var imgArray = obj.getElementsByTagName("img");
    //var tishi = obj.parentNode.getElementsByTagName("span");
    for (var i = 0; i < imgArray.length; i++) {
        imgArray[i]._num = i;
        imgArray[i].onclick = function () {
            if (obj.rateFlag) return;
            var inputid = this.parentNode.previousSibling || 0;
            inputid.value = this._num + 1;
            //对当前隐藏域赋值
            var starVal = this.parentElement.children[0];
            starVal.value = this._num + 1;
            //tishi[0].innerHTML = $(this).attr("title");
        }
        //imgArray[i].onmouseover = function () {
        //    tishi[0].innerHTML = $(this).attr("title");
        //}
    }
    if (target.tagName == "IMG") {
        for (var j = 0; j < imgArray.length; j++) {
            if (j <= target._num) {
                imgArray[j].src = imgSrc_2;
            } else {
                imgArray[j].src = imgSrc;
            }
            target.parentNode.onmouseout = function () {
                //var tem = target.parentNode.previousSibling.value;
                var tem = $("#starVal").val();
                var imgnum = parseInt(tem);
                //alert(imgnum);
                for (n = 0; n < imgArray.length; n++) {
                    imgArray[n].src = imgSrc;
                }
                for (n = 0; n < imgnum; n++) {
                    imgArray[n].src = imgSrc_2;
                }
            }
        }
    } else {
        return false;
    }
}
// 当滚动到最底部以上800像素时，定位导航
$(window).scroll(function() {
    if ($(this).scrollTop() >= 804) {
        $(".wz_pp_box_b_tit").addClass("wz_pf");
    }else {
        $(".wz_pp_box_b_tit").removeClass("wz_pf");
   }
});