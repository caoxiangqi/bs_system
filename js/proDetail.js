$(function () {
    var tab=$(".tab");
    $(window).scroll(function () {
        $(window).scrollTop() > 800 ? tab.addClass("tabFixed") : tab.removeClass("tabFixed");
    });

    $(".js_a a").click(function () {
        var _this = $(this);
        var oJsa = _this.parents(".js_a").siblings();
        oJsa.find("a").each(function () {
            var _t = $(this), thisId = (_t.parents(".js_a").attr("id") +"#@#"+ _t.text()).replace(/[\r\n]/g, "").replace(/\ +/g, "");            
            //_t.hasClass("a_checkBox_curr") ? alert( thisId) : "";
        });
    });

    
});