
/*
 * 门面模式
 *
 * DOMWrapper DOM包装器
 * 
 * 完善DOM的方法
 *
 */
(function () {

    "use strict";

    var DOMWrapper = function (element) {

        // this.element为原生DOM元素
        this.element = element;
    };

    DOMWrapper.prototype.hasClass = function (classname) {

        return this.element.className.match(new RegExp("(\\s|^)" + classname + "(\\s|$)"));
    };

    DOMWrapper.prototype.addClass = function (classname) {

        if (!this.hasClass(classname)) {
            this.element.className += " " + classname;
        }
    };

    DOMWrapper.prototype.removeClass = function (classname) {

        if (this.hasClass(classname)) {
            var c = new RegExp("(\\s|^)" + classname + "(\\s|$)");
            this.element.className = this.element.className.replace(c, "");
        }
    };

    DOMWrapper.prototype.toggleClass = function (classname) {

        if (this.hasClass(classname)) {
            this.removeClass(classname);
        } else {
            this.addClass(classname);
        }
    };

    DOMWrapper.prototype.nextSibling = function () {

        if (this.element.nextSibling.nodeType === 1) {

            // for ie
            return this.element.nextSibling;
        } else {

            // for firefox && chrome ect
            return this.element.nextElementSibling;
        }
    };

    DOMWrapper.prototype.previousSibling = function () {

        if (this.element.previousSibling.nodeType === 1) {
            return this.element.previousSibling;
        } else {
            return this.element.previousElementSibling;
        }
    };

    DOMWrapper.prototype.siblings = function () {

        var arr = [],
		    p = null,
		    n = null;

        // 向前递归查找
        p = this.element.previousSibling;

        while (p) {

            if (p.nodeType === 1) {
                arr.unshift(p);
            }

            p = p.previousSibling;
        }

        // 向后递归查找
        n = this.element.nextSibling;

        while (n) {

            if (n.nodeType === 1) {
                arr.push(n);
            }

            n = n.nextSibling;
        }

        return arr;
    };

    DOMWrapper.prototype.remove = function () {
        this.element.parentNode.removeChild(this.element);
    };

    DOMWrapper.prototype.setOpacity = function (opacity) {
        
        if (this.element.filters) {
            this.element.style.filter = 'alpha(opacity=' + opacity + ')';
        } else {
            this.element.style.opacity = opacity / 100;
        }
    };

    DOMWrapper.prototype.fadeIn = function (opacity, speed) {

        var that = this;

        opacity = opacity || 100;
        speed = speed || 20;
        that.element.style.display = 'block';
        that.setOpacity(0);

        var val = 0;
        (function fade() {
            
            if (val <= opacity) {
                that.setOpacity(val);
                val += 10;
                setTimeout(fade, speed);	
            }
        })();
    };

    DOMWrapper.prototype.fadeOut = function (opacity, speed) {

        var that = this;

        opacity = opacity || 0;
        speed = speed || 20;

        var val = 100;
        (function fade() {
            that.setOpacity(val);
            val -= 10;
            if (val >= opacity) {
                setTimeout(fade, speed);
            } else if (val <= 0) {
                that.element.style.display = 'none';
                that.setOpacity(0);
            }
        })();
    };

    DOMWrapper.prototype.addEvent = function (evType, fn, useCapture) {

        useCapture = useCapture || false;

        if (this.element.addEventListener) {
            this.element.addEventListener(evType, fn, useCapture);
        } else if (this.element.attachEvent) {
            this.element.attachEvent('on' + evType, function () {
                fn.call(this.element);		//为了传回正确的this指向
            });
        } else {
            this.element['on' + evType] = fn;
        }
    };

    DOMWrapper.prototype.removeEvent = function (evType, fn, useCapture) {

        useCapture = useCapture || false;

        if (this.element.removeEventListener) {
            this.element.removeEventListener(evType, fn, useCapture);
        } else if (this.element.detachEvent) {
            this.element.detachEvent('on' + evType, fn);
        } else {
            this.element['on' + evType] = null;
        }
    };


    window.DOMWrapper = DOMWrapper, DOMWrapper = null;
})();