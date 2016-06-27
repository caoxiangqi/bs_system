var tool = {
    load_img: function (ary) {
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
            }
        }
    },
    scan: function () {
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
        }
    },
    touch_animate: function () {
        var audio = document.querySelector("#audio");
        var music = document.querySelector("#music");
        audio.play();
        music.style.display = "block";
        music.className = "musicMove";
        music.addEventListener("touchend", function () {
            if (audio.paused) {
                audio.play();
                music.className = "musicMove";
                return;
            }
            audio.pause();
            music.className = "";
        }, false);

        var section = document.querySelectorAll("#me_info section");
        section[0].id = "animate_0";
        [].forEach.call(section, function (item, index, list) {
            item.index = index;
            //item.id = "animate_" + item.index;
            item.addEventListener("touchstart", start, false);
            item.addEventListener("touchmove", move, false);
            item.addEventListener("touchend", end, false);
        });

        function start(e) {
            this.startY = e.changedTouches[0].pageY;
            this.startX = e.changedTouches[0].pageX;
        }

        function move(e) {
            this.flag = true;
            e.preventDefault();
            this.moveY = e.changedTouches[0].pageY;
            this.moveX = e.changedTouches[0].pageX;
            var movePos = this.moveY - this.startY;

            if (Math.abs(movePos) < Math.abs(this.moveX - this.startX)) {
                this.flag = false;
                return;
            }

            var index = this.index;
            var lastIndex = section.length - 1;

            [].forEach.call(section, function (item, ind, list) {
                if (index != ind) {
                    item.style.display = "none";
                    item.id = "";
                    item.style.webkitTransform = "scale(0,0)";

                }
                item.className = "";
            });

            var duration = null;
            if (movePos > 0) { //展示 上一张
                this.prevIndex = (index == 0) ? lastIndex : index - 1;
                duration = -this.offsetHeight / 2 + movePos + "px";
            }
            else {
                this.prevIndex = (index == lastIndex) ? 0 : index + 1;
                duration = this.offsetHeight / 2 + movePos + "px";
            }

            // console.log(duration);
            section[this.prevIndex].style.webkitTransform = "translate(0," + duration + ")";
            section[this.prevIndex].className = "zIndex";
            section[this.prevIndex].style.display = "block";
            this.style.webkitTransform = "scale(" + (1 - Math.abs(movePos / this.offsetHeight) / 2) + ") translate(0," + movePos + "px)";
        }

        function end(e) {
            if (this.flag) {
                section[this.prevIndex].style.webkitTransform = "translate(0, 0)";
                section[this.prevIndex].style.webkitTransition = ".5s";
                section[this.prevIndex].id = "animate_" + this.prevIndex;
            }
            this.flag = false;
        }
    }
};

var n = 0;
var ary = ["circle.png", "experience.png", "finger_line.png", "finger_print.png", "first_bg.jpg", "head_bg.jpg", "me.png", "music.svg", "next.png", "second_bg.png", "third_bg.jpg"];
tool.load_img(ary);