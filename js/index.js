//设置主页导航默认样式
$(".nav").hasClass("indexCurr") ? "" : $(".nav").addClass("indexCurr");
$(function () {
    //banner
    $('.flexslider').flexslider({
        directionNav: true,
        pauseOnAction: false,
        pauseOnHover: true
    });
    $(".flex-control-nav").width($(".flex-control-nav li").length * 19);
    $(".flex-control-nav").css("margin-left", (Math.floor($(".flex-control-nav").width() / 2)) + "px");
    $(".imgBox_a").mouseover(function () {
        var _this = $(this);
        _this.animate({ opacity: ".7" }, 300, function () {
            _this.animate({ opacity: "1" }, 300);
        })
    })
})

