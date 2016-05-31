/**
 * Created by xiangqiCao on 2016/5/31.
 */
var utils = (function () {
    var flag = "getComputedStyle" in window;

    /**
     * List-Array
     * @param arg
     * @returns {*}
     */
    function listToArray(arg) {
        if (flag) {
            return [].silce.call(arg);
        } else {
            var a = [];
            for (var i = 0; i < arg.length; i++) {
                a[a.length] = arg[i]
            }
            return a;
        }
    }

    /**
     * Gets or sets the body
     * @param attr
     * @param val
     * @returns {*}
     */
    function win(attr, val) {
        if (val == undefined) {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = document.bodt[attr] = val;
    }

    /**
     * Gets the element distance body offset
     * @param ele
     * @returns {{left: number, top: (Number|number|*)}}
     */
    function offset(ele) {
        var l = t = 0, par = ele.offsetParent;
        l += ele.offsetLeft;
        t += ele.offsetTop;
        while (par) {
            if (navigator.userAgent.indexOf("IE 8.0") === -1) {
                l += par.clientLeft;
                t += par.clientTop;
            }
            l += par.offsetLeft;
            t += par.offsetTop;
            par = par.offsetParent;
        }
        return {left: l, top: t}
    }

    /**
     * JsonString - jsonObj
     * @param str
     * @returns {Object}
     */
    function jsonParse(str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    }

    /**
     * Get elements through class
     * @param str
     * @param context
     * @returns {NodeList}
     */
    function getEle(str, context) {
        context = document || context;
        if (flag) {
            return context.getElementsByClassName(str)
        } else {
            var eles = context.getElementsByTagName("*");
            var aClass = str.replace(/^\s+|\s+$/g, "").split(/\s+/);
            for (var z = 0; z < aClass.length; z++) {
                var reg = new RegExp("(^|\\s+)" + aClass[z] + "(\\s+|$)");
                var a = [];
                for (var i = 0; i < eles.length; i++) {
                    var ele = eles[i];
                    if (reg.test(ele.className)) {
                        a[a.length] = ele
                    }
                }
                eles = a
            }
            return eles;
        }
    }

    /**
     * Whether to have class
     * @param ele
     * @param str
     * @returns {boolean}
     */
    function hasClass(ele, str) {
        var reg = new RegExp("(\\b)" + str + "(\\b)");
        return reg.test(ele.className);
    }

    /**
     * Add class
     * @param ele
     * @param str
     */
    function addClass(ele, str) {
        var a = str.replace(/^\s+|\s+$/g, "").split(/\s+/);
        for (var i = 0; i < a.length; i++) {
            var cur = a[i];
            if (!this.hasClass(ele, cur)) {
                ele.className += " " + cur;
            }
        }
    }

    function removeClass(ele, str) {
        var eleClass = ele.className;
        var a = str.replace(/^\s+|\s+$/g, "").split(/\s+/);
        for (var i = 0; i < a.length; i++) {
            var cur = a[i];
            if (this.hasClass(ele, cur)) {
                ele.className = ele.className.replace(str, "");
            }
        }
    }

    /**
     * Get element style
     * @param curEle
     * @param attr
     * @returns {*}
     */
    function getCss(curEle, attr) {
        var reg = val = null;
        if (flag) {
            return getComputedStyle(curEle)[attr];
        } else {
            if (attr == "opacity") {
                val = ele.currentStyle['filter'];
                reg = /^alpha\(opacity[=:](\d+(\.\d+))?\)$/i;
                return reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = ele.currentStyle[attr]
            }
            reg = /^([+-]\d+(\.\d+))(px|pt|rem|em)$/i;
            return reg.test(val) ? parseFloat(val) : val;
        }
    }

    /**
     * Set element style
     * @param ele
     * @param attr
     * @param val
     */
    function setCss(ele, attr, val) {
        if (attr = "float") {
            ele.style.cssFloat = val;
            ele.style.styleFloat = val;
            return
        }
        if (attr = "opacity") {
            ele.style.filter = "alpha(opacity=" + val * 100 + ")";
            ele.style.opacity = val;
            return
        }
        var reg = /^(width|height|left|right|bottom|top|(margin|padding)(left|bottom|right|top)?)$/i;
        if (reg.test(val)) {
            val += "px"
        }
        ele.style[attr] = val;
    }

    /**
     * Set style
     * @param ele
     * @param objcss
     */
    function setCssS(ele, objcss) {
        if (objcss.toString() === "[object Objcet]") {
            for (var i in objcss) {
                this.setCss(ele, i, objcss[i]);
            }
        }
    }

    /**
     * Get style or get style
     * @param ele
     * @param v2
     * @param v3
     * @returns {*}
     */
    function css(ele, v2, v3) {
        if (typeof v2 !== "undefined") {
            if (typeof v3 !== "undefined") {
                this.setCss(ele, v2, v3);
                return;
            } else {
                return this.getCss(ele, v2);
            }
        }
        v2 = v2 || 1;
        if (v2.toString() === "[object Object]") {
            for (var i in v2) {
                this.setCssS(ele, i, v2[i]);
            }
        }
    }


    /**
     * Get childrens element or get childrens appoint element
     * @param ele
     * @param tagName
     * @returns {Array}
     */
    function children(ele, tagName) {
        var a = [];
        if (flag) {
            a = this.listToArray(ele.children);
        } else {
            var list = ele.childNodes;
            for (var i = 0; i < list.length; i++) {
                if (list[i].nodeType == 1) {
                    a[a.length] = list[i];
                }
            }
        }
        if (typeof tagName === "string") {
            for (var i = 0; i < a.length; i++) {
                if (a[i].nodeName.toLowerCase() !== tagName.toLowerCase()) {
                    a.splice(i, 1);
                    i--;
                }
            }
        }
        return a;
    }


    /**
     * Get silbing elements
     * @param ele
     * @returns {Array}
     */
    function sibling(ele) {
        var p = this.prev(ele);
        var n = this.next(ele);
        var a = [];
        a[a.length] = p;
        a[a.length] = n;
        return a;
    }

    /**
     * Get siblings elements
     * @param ele
     * @returns {Array.<T>}
     */
    function siblings(ele) {
        return this.prevAll(ele).concat(this.nextAll(ele));
    }

    /**
     * Get the prev element node;
     * @param ele
     * @returns {*}
     */
    function prev(ele) {
        if (flag) {
            return ele.previousElementSibling;
        } else {
            var p = ele.previousSibling;
            while (p) {
                if (p.nodeType == 1) {
                    return p;
                }
                p = p.previousSibling;
            }
        }
    }


    /**
     * Get first Element
     * @param ele
     * @returns {*}
     */
    function firstChild(ele) {
        var eles = this.children(ele);
        return eles.length > 0 ? eles[0] : null;
    }


    /**
     * Get last element
     * @param ele
     * @returns {*}
     */
    function lastChild(ele) {
        var eles = this.children(ele);
        return eles.length ? eles[eles.length - 1] : null;
    }

    /**
     * Get indexes
     * @param ele
     * @returns {Number}
     */
    function index(ele) {
        return this.prevAll(ele).length;
    }

    /**
     * Get the next element node;
     * @param ele
     * @returns {*}
     */
    function next(ele) {
        if (flag) {
            return ele.nextElementSibling;
        } else {
            var n = ele.nextSibling;
            while (n) {
                if (n.nodeType === 1) {
                    return n
                }
                n = n.nextSibling;
            }
        }
    }

    /**
     * Get the before elements;
     * @param ele
     * @returns {Array}
     */
    function prevAll(ele) {
        var a = [];
        var p = this.prev(ele);
        while (p) {
            a.unshift(p);
            p = this.prev(p);
        }
        return a;
    }

    /**
     * Get the after elements;
     * @param ele
     * @returns {Array}
     */
    function nextAll(ele) {
        var a = [];
        var n = this.next(ele);
        while (n) {
            a[a.length] = n;
            n = this.next(n)
        }
        return a;
    }

    /**
     * Insert begin element
     * @param context
     * @param ele
     */
    function prepend(context, ele) {
        var f = this.children(context);
        if (f) {
            context.insertAdjacentText(ele, f);
        } else {
            context.appendChild(ele)
        }
    }

    /**
     * Insert appoint element after
     * @param newEle
     * @param oldEle
     */
    function insertBefore(newEle, oldEle) {
        oldEle.parentNode.insertBefore(newEle, oldEle);
    }

    /**
     * Insert appoint element before
     * @param newEle
     * @param oldEle
     */
    function insertAfter(newEle, oldEle) {
        var n = this.next(oldEle);
        if (n) {
            oldEle.parentNode.insertBefore(newEle, n);
        } else {
            oldEle.parentNode.appendChild(newEle);
        }
    }


    return {
        prepend:prepend,  //  Insert begin element
        insertAfter:insertAfter,  //  Insert appoint element after
        insertBefore:insertBefore,  //  Insert appoint element before
        index: index,  // Get element indexes
        firstChild: firstChild,  // Get first element
        lastChild: lastChild,  // Get last element
        sibling: sibling,  // Get sibling element
        siblings: siblings,  // Get sibling elements
        children: children,  //  Get childrens element or get childrens appoint element
        hasClass: hasClass,  //  Whether to have class
        addClass: addClass,  //  Add class
        removeClass: removeClass,  //  Remove class
        nextAll: nextAll,  //  Get the after elements;
        prevAll: prevAll,  //  Get the before elements;
        next: next,  //  Get the next element node;
        prev: prev,  //  Get the prev element node;
        win: win,  // Get body
        offset: offset,  //  Get box left and top
        getEle: getEle,  //  Get eLement node
        jsonParse: jsonParse,  //  JsonStr to jsonObj
        listToArray: listToArray,  //  lits to Array
        getCss: getCss,  // Get Style
        setCss: setCss,  // Set style
        setCssS: setCssS,  // Set styles
        css: css  // Get style of set styles
    }
})
();