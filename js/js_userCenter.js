$(".changePTab li").click(function () {
    $(this).addClass("cur").siblings().removeClass("cur");
    var index = $(this).index();
    $(".changeP_table").hide().eq(index).css("display", "table");
});

$(".helpCenter .userCenterNav dt").click(function () {
    $(this).parent().siblings().removeClass("curr");
    $(this).parent().toggleClass("curr");
});

$(".helpCenter .userCenterNav a").click(function () {
    $(".helpCenter .userCenterNav a").removeClass("textColorRed");
    $(this).addClass("textColorRed");
});