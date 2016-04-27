$(function () {
    var add_normal = $(".add_normal"), add_new = $(".add_new");
    $(".js_addNew").click(function () {
        add_normal.hide(); add_new.show();
    });
    $(".add_new a").click(function () {
        add_normal.show();
        add_new.hide();
    });
    $(".js_bntMoreAdd").click(function () {
        var oParent = $(this).parent();
        oParent.addClass("chooseAdd_curr").prev().find(".a_checkBox").removeClass("a_checkBox_curr");
        oParent.find(".btnOk").click(function () {
            oParent.addClass("order_chooseAdd").removeClass("chooseAdd_curr");
        });
    });
    $(".add_btn_more_hide a").click(function () {
        var _this = $(this),
            hideBox = _this.parent().parent().prev();

        _this.attr("title") == "展开" ? (function () {
            _this.attr("title", "收起");
            _this.parent().addClass("cur");
            hideBox.removeClass("hide");
        })() : (function () {
            _this.attr("title", "展开")
            _this.parent().removeClass("cur");
            hideBox.addClass("hide");
        })();
    });
    $("#newAddr").click(function () {
        $(".consignee-form").toggle();
    });

    $(".selectBox").hover(function () {
        var select = $(this).children("div:first"), ul = $(this).children("ul");
        select.addClass("curr");
        ul.show();

        ul.children("li").click(function () {
            var nowLiTxt = $(this).children("a").text();
            select.children("h3").text(nowLiTxt);
            ul.hide();
            var textarea = select.parents(".dialogContentBox ").children("textarea");
            nowLiTxt == "其他原因" ? textarea.css("visibility", "visible") : textarea.css("visibility", "hidden");
        });
    }, function () {
        var select = $(this).children("div:first"), ul = $(this).children("ul");
        select.removeClass("curr");
        ul.hide();
    });

})