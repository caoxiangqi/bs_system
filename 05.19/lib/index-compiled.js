"use strict";

var tool = {
    load_img: function load_img(ary) {
        var _this = this;
        for (var i = 0; i < ary.length; i++) {
            var oImg = new Image();
            oImg.src = "img/" + ary[i];
            oImg.onload = function () {
                n++;
                if (n == ary.length) {
                    loading.style.opacity = "0";
                    _this.scan();
                    window.timer = setTimeout(function () {
                        main.removeChild(loading);
                    }, 2000);
                }
            };
        }
    },
    scan: function (_scan) {
        function scan() {
            return _scan.apply(this, arguments);
        }

        scan.toString = function () {
            return _scan.toString();
        };

        return scan;
    }(function () {
        var _this = this;
        scanning.onclick = function (e) {
            if (e.target.tagName == "IMG") {
                scan.style.opacity = "1";
                scan.style.transform = "translate(0,0)";
                var text = this.getElementsByClassName("text")[0];
                text.innerHTML = "扫描中...";
                window.timer = setTimeout(function () {
                    text.innerHTML = "扫描完成";
                }, 1000);
                window.timer = setTimeout(function () {
                    main.removeChild(scanning);
                    _this.touch_animate();
                }, 1500);
            }
        };
    }),
    touch_animate: function touch_animate() {
        me_info.className = "animate_" + me_info.id;
    }
};

var n = 0;
var ary = ["finger_line.png", "first_bg.jpg", "finger_print.png"];
tool.load_img(ary);

//# sourceMappingURL=index-compiled.js.map