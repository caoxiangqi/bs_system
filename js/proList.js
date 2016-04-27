$(function () {
    $(".btn_more").click(function () {
        var _this = $(this);
        _this.toggleClass("btn_more_up");
        _this.parents(".searchAreaItem").toggleClass("showMore");
        if (_this.text() == "更多" || _this.text() == "更多选项") {
            _this.html("收起<i class='icon'></i>");
        } else if (_this.parents(".searchAreaBoxMore").length) {
            _this.html("更多选项<i class='icon'></i>");
        } else {
            _this.html("更多<i class='icon'></i>");
        }
    }
    );

    //多选 
    $(".btn_chooseMore").click(function () {
        var btns = $(this).parent();
        var valCheckBox = btns.next();
        if (valCheckBox) {
            valCheckBox.addClass("valCheckBox");
            btns.hide();
        }
    });
    $(".valCheckBox_btnBar a").click(function () {
        $(this).parents(".valCheckBox").removeClass("valCheckBox").prev().show();
    });

    $(".searchAreaBoxMore .btn_more").click(function () {
        $(this).text() == "收起" ? $(this).parent().prev().children(".jsHide").removeClass("hide").addClass("show") : $(this).parent().prev().children(".jsHide").removeClass("show").addClass("hide");
    });

    $(".orderBox_btn").click(function () {
        var _this = $(this), thisIcon = _this.children(".icon2"), currClass = "orderBox_btn_curr", iconClass = "icon_orderBox_btn2";
        _this.addClass(currClass).siblings().removeClass(currClass);
        thisIcon.hasClass(iconClass) ? thisIcon.removeClass(iconClass) : thisIcon.addClass(iconClass);
    });

    $(".searchAreaItem .val").each(function () {
        $(this).children(0).height() > 20 && $(this).children(0).parent().prev().show();
    });
});