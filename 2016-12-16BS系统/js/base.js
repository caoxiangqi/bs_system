$(function () {
    // 左侧导航
    $(".main_l_nav ul li a").click(function () {
        if ($(this).next().length >= 1) {
            $(this).children("span").addClass("on");
            $(this).next().show();
            $(this).parent().siblings().find("ul").hide();
            $(this).parent().siblings().find("span").removeClass("on");
            $(this).next().find("a").first().addClass("on").parent().siblings().children("a").removeClass("on");
        }
    });
    $(".main_l_nav ul li ul li a").click(function () {
        if ($(this).next().length >= 1) {
            $(this).next().find("a").first().removeClass("on");
        }
        $(this).addClass("on").parent().siblings().children("a").removeClass("on");
        $(this).parent().siblings().find("ul").hide()
    });
    $(".main_l_nav ul li ul li ul li a").click(function () {
        $(this).parent().parent().prev().removeClass("on");
    });
    // 顶部input点击 背景加深
    $(".main_c_t_r .text").focus(function () {
        $(".main_c_t_r .text").addClass("on")
    });
    $(".main_c_t_r .text").blur(function () {
        $(".main_c_t_r .text").removeClass("on")
    });
    // 右侧在线状态
    $(".icon_1").click(function (e) {
        if ($(this).find(".icon_b_o").css("display") == "none") {
            $(this).find(".icon_b_o").slideDown();
        } else {
            $(this).find(".icon_b_o").slideUp();
        }
        e.stopPropagation();
    });
    $("body").click(function (e) {
        if ($(".icon_b_o").css("display") == "block") {
            $(".icon_b_o").slideUp();
        }
        e.stopPropagation();
    });
    $(".icon_b_o ul li").click(function () {
        var state = $(this).html();
        $(".icon_1").find(".val").html(state);
    });
    //  main table 隔行变色
    //$(".ld_center table tbody tr:odd").addClass("w");
    //$(".ld_center table tbody tr:even").addClass("q");
    //$(".ld_center table tbody .q td:first").css("borderLeft","0");
    //$(".ld_center table tbody .q td:last").css("borderRight","0");
    $(".ld_center table tbody td").click(function () {
        if ($(this).find(".tb_tx_q").length > 0) {
            $(this).find(".tb_tx_q").focus();
        }else if($(this).find(".texts_q").length > 0){
            $(this).find(".texts_q").focus();
        }
        //
    });


    //  设定iframe高度
    ifRameHeight();
});


//  窗口改变时重新定义iframe高度
function ifRameHeight() {
    var winHeight = $(window).height();
    $("#mainer_box").height(winHeight - 119);
}
$(window).resize(function () {
    ifRameHeight();
});
