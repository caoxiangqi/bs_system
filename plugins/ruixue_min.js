﻿function init() { Global.namespace("Dom"), Global.namespace("ruixue") } var Global = {}; Global.namespace = function (a) { var b = a.split("."), c = Global; for (i = "GLOBAL" == b[0] ? 1 : 0; i < b.length; i++) c[b[i]] = c[b[i]] || {}, c = c[b[i]] }, init && init(), Global.ruixue.tip = function (a) { var c, d, b = { inputs: $("input"), fade: !0, speed: 1500, tipTxt: "输入内容错误！", textAlign: "left", callBack: function () { } }; a = $.extend(b, a), c = $(a.inputs), arrTipTxt = a.tipTxt.split(","), d = 0, c.each(function () { var f, b = $(this), e = b.outerHeight() + "px"; a.tipTxt = c.length == arrTipTxt.length ? arrTipTxt[d] : a.tipTxt, d++, b.wrap("<span style='position:relative; display:inline-block;'></span>"), b.parent().append("<span class='xrxTip' style='color:#FF0000;font-size:10px;position:absolute;" + a.textAlign + ":0;top:" + e + ";'>" + a.tipTxt + "</span>"), f = $(".xrxTip"), a.fade ? setTimeout(function () { f.fadeOut(700, function () { f.remove(), b.unwrap() }) }, a.speed) : null, a.callBack && a.callBack() }) }, Global.ruixue.dialog = function (a, b) { var c, d; c = a ? "<div class='dialogCon yfTip'>" + b + "</div>" : "<div class='dialogCon yfTip yfTip0'>" + b + "</div>", d = document.createElement("div"), d.className = "dialogBox ", d.innerHTML = c, document.body.appendChild(d), $(d).fadeIn(200), setTimeout(function () { var a = $(d); a.fadeOut(1e3, function () { a.remove() }) }, 1300) };