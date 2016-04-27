$(function () {
    $(".topic .imgScroll").hover(function () {
        var _this = $(this), imgScroll_ul = _this.parent().find(".imgScroll_ul");
        _this.toggleClass("hover");
        
    });
    $(".imgScroll_prev").click(function () {
        var _this = $(this), imgScroll_ul = _this.parent().find(".imgScroll_ul")
        if (!imgScroll_ul.is(":animated")) {
            if (parseInt(imgScroll_ul.css("left")) < 0) {
                imgScroll_ul.stop().animate({ "left": "+=1110px" }, 700);
            }
        }
    });
    $(".imgScroll_next").click(function () {
        var _this = $(this), imgScroll_ul = _this.parent().find(".imgScroll_ul");
        if (!imgScroll_ul.is(":animated")) {
            imgScroll_ul.css("width", imgScroll_ul.children().length * 185 + "px");
            var nextLeft = Math.abs(parseInt(imgScroll_ul.css("left")) - 1110);
            if (nextLeft - parseInt(imgScroll_ul.css("width")) < 0) {
                imgScroll_ul.stop().animate({ "left": "-=1110px" }, 700);
            }
        }
    });

});