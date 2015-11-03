/*
 * try to compact html5 and ECMAScript5 for future
 * try to collect my own javascript code
 * try to understand javascript
 * ...
 * started at 2014-02-18
 * student : ying
 *
 */


var global = (function (that) {
	return that;
}(this));


// ECMAScript5引入了严格模式，因此可以用严格模式判断浏览器是否支持ECMAScript5
var isCompatECMA5 = (function () {

	// 启用严格模式解析此函数
	"use strict";

	// 函数中的this在严格模式下返回undefined，ECMA-262不解析"use strict"，返回window对象
	return !this;
}());


 /*
  * object and function prototype extend come from Crockford
  *
  */

// 对象的原型继承 ---- ECMAScript5已实现
if (typeof Object.prototype.create !== "function") {
 	Object.prototype.create = function (obj) {
	 	var F = function () {};
	 	F.prototype = obj;
	 	return new F();
	}; 
}

// 方法的原型扩充：在内置对象上扩展方法(Array, String, Date等内置对象的原型都是Function)
/**
if (typeof Function.prototype.method !== "function") {
	Function.prototype.method = function (name, fn) {
		if (!this.prototype[name]) {
			this.prototype[name] = fn;
		}
	};
}
**/

// Function.prototype.bind()  ----  ECMA5已实现(绑定正确的对象指针,返回值是一个函数)
if (typeof Function.prototype.bind !== "function") {
	Function.prototype.bind = function (context) {

		if (typeof this !== "function") {
			throw new TypeError("Function.prototype.bind should be a function that being binded");
		}

		// that is mean fn()
		var that = this;

		return function () {
			return that.apply(context);
		}
	}
}

// String.prototype.trim()  ----  ECMA5已实现
if (typeof String.prototype.trim !== "function") {
	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g, "");
	}
}

// Date.now()  ----  ECMA5已实现
if (typeof Date.now !== "function") {
	Date.now = function () {
		return new Date().valueOf();
	};
}

// Array.isArray  ----  ECMA5已实现
if (typeof Array.isArray !== "function") {
	Array.isArray = function (value) {
		return Object.prototype.toString.call(value) === "[object Array]";
	}
}

// Array.prototype.forEach ---- ECMA5已实现(摘录自prolly)
if (typeof Array.prototype.forEach !== "function") {
	Array.prototype.forEach = function (fn) {

		var arrObj = Object(this),
		    len = arrObj.length >>> 0,
		    thisArg = arguments.length >= 2 ? arguments[1] : 0,
		    i;

		for (i = 0; i < len; i++) {

			if (i in arrObj) {
				fn.call(thisArg, arrObj[i], i, arrObj);
			}
		}
	};
}

// Array.prototype.map  ---- ECMA5已实现(摘录自prolly)
if (typeof Array.prototype.map !== "function") {
	Array.prototype.map = function (fn) {

		var newArr = [],
			arrObj = Object(this),
		    len = arrObj.length >>> 0,
		    thisArg = arguments.length >= 2 ? arguments[1] : 0,
		    i;

		for (i = 0; i < len; i++) {

			if (i in arrObj) {
				newArr[i] = fn.call(thisArg, arrObj[i], i, arrObj);
			}
		}

		return newArr;
	};
}

/*
 * JSON
 *
 * the hack just for ie6 && ie7
 *
 */
if (typeof JSON !== "object") {
	
	var JSON = {};

	JSON.parse = function (sJSON) {
		return eval("(" + sJSON + ")");
	};

	JSON.stringify = function (obj) { 
        var t = typeof (obj);
        if (t != "object" || obj === null) {
            // simple data type
            if (t == "string") obj = '"' + obj + '"';
            return String(obj);
        } else {
            // recurse array or object
            var n, v, json = [], arr = (obj && obj.constructor == Array);

            // fix.
            var self = arguments.callee;

            for (n in obj) {
                v = obj[n];
                t = typeof(v);
                if (obj.hasOwnProperty(n)) {
                    if (t == "string") v = '"' + v + '"'; else if (t == "object" && v !== null)
                        // v = jQuery.stringify(v);
                        v = self(v);
                    json.push((arr ? "" : '"' + n + '":') + String(v));
                }
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    };
}


/*
 * Ajax ajax should be a native object
 * 
 * Ajax.get("url?p=value", function (data) { // handle data }, false);
 *
 * Ajax.post("url",{
 * 	data : "p=value&id=001",
 *	callback : function (data) { // handle data },
 *	async : false
 * });
 *
 */

var Ajax = (function () {

	"use strict";

	var ajax = {

		// 惰性载入函数
		createXHR : (function () {

			if (window.XMLHttpRequest) {
				
				// 不论new多少XHR，if只需判断一次
				return function () {
					return new XMLHttpRequest();
				}
			} else {

				// only for ie6 hack
				return function () {
					return new ActiveXObject("Microsoft.XMLHTTP");
				}
			}
		}()),

		get : function(url, callback, async){

			var XHR = this.createXHR();

			//默认异步请求
			if (async !== false) {
				async = true;
			}

			//async = async || true;		此代码有问题  async总是true

			if(async){

				// 异步请求
				XHR.onreadystatechange = function() {

					if(XHR.readyState == 4 && XHR.status == 200){
						callback(XHR.responseText);

						// 销毁不用的对象；因为每次ajax请求都会创建一个新的XHR
						XHR  = null;
					}
				};

				XHR.open('GET', url, true);
				XHR.send();
			}else{

				// 同步请求，返回结果前停止解析下文
				XHR.open('GET', url, false);
				XHR.send();
				callback(XHR.responseText);
				XHR = null;
			}
		},

		post : function(url, option){

			var XHR = this.createXHR(),
				data = option.data,
				callback = option.callback,
				async = option.async;

				// 默认异步请求
				if (async !== false) {
					async = true;
				}
			

			if(async){

				XHR.onreadystatechange = function(){

					if(XHR.readyState == 4 && XHR.status == 200){
						callback(XHR.responseText);
						XHR = null;
					}
				};

				XHR.open("POST", url, true);
				XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				XHR.send(data);
			}else{

				XHR.open("POST", url, false);
				XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				XHR.send(data)
				callback(XHR.responseText);
				XHR = null;
			}
		}
	};

	return ajax;
})(); 





/*
 * 异步、跨域、JSONP
 * 
 * var url = 'http://fundex.eastmoney.com/FundWebServices/FundAd.aspx?t=5&h=luckyData&rnd=' + Math.random();
 *
 * jsLoader("url", function () { alert(luckyData["666"]); // handle the response data });
 *
 */
var loadScript = function(url, callback) {
    var _script = document.createElement('script');

    _script.setAttribute('src', url);
    
    document.getElementsByTagName('head')[0].appendChild(_script);

    if (_script.addEventListener) {
        _script.onload = function() {
			_script.onload = null;
            _script.parentNode.removeChild(_script);
            callback && callback();
        }
    } else if (_script.readyState) {
      _script.onreadystatechange = function() {
            if (_script.readyState == 'loaded' || _script.readyState == 'complete') {
                _script.onreadystatechange = null;
                _script.parentNode.removeChild(_script);
                callback && callback();
            }
        }
    } else {
        _script.parentNode.removeChild(_script);
        callback && callback();
    }
};




//动态添加样式
var loadStyle = function (css) {
    var style = document.createElement("style");
    style.type = "text/css";
    style.rel = "styleSheet";

    try {
        style.appendChild(document.createTextNode(css));
    } catch (ex) {
        style.styleSheet.cssText = css;
    };

    document.getElementsByTagName("head")[0].appendChild(style);
};

//  get query string
var getQueryStringArgs = function () {
	var qs = (location.search.length > 0 ? location.search.slice(1) : ""),
		  args = {},
		  items = (qs.length > 0 ? qs.split("&") : []),
		  len = items.length,
		  item, name, value, i;

	for (i=0; i<len; i++ ) {
		item = items[i].split("=");
		name = decodeURIComponent(item[0]);
		value = decodeURIComponent(item[1]);

		if (name.length > 0)	{
			args[name] = value;
		}
	}

	return args;
};

/*
 *
 * $  query elements
 *
 * if nessary, use Sizzle.js instead
 *
 */
var $ = function (selector, context) {

	"use strict";

	context = context || document;

	if (typeof selector === "string") {

		if (selector.indexOf("#") > -1) {

			// 传入的是id
			selector = selector.replace("#", "");

			return context.getElementById(selector);
		} else if (selector.indexOf(".") > -1) {

			// 传入的是className
			selector = selector.replace(".", "");

			if (!document.getElementsByClassName) {
				
				// for ie lt 9 hack
				var i = context.all.length,
					nodelist = [],
					pattern = new RegExp("(^|\\s)" + selector + "(\\s|$)");

				selector = selector.replace(/\-/g, "\\-");
		
				while (--i >= 0) {

					if (pattern.test(context.all[i].className) ) {
						nodelist.unshift(context.all[i]);
					}
				}

				return nodelist;
			} 

			return context.getElementsByClassName(selector);

		} else {

			// tag
			return context.getElementsByTagName(selector);
		}
	} else {

		// 否则，认为是节点原样返回
		return selector;
	}
};


/*
 * event 事件对象：包含了大量与事件有关的信息，包括宿主、鼠标、键盘、触屏等等
 *
 */

var Event = {
		getEvent:function(e){
			return e ? e : window.event;
		},
		getTarget:function(e){
			return e.target || e.srcElement;
		},
		stopPropagation:function(e) {
			if (e && e.stopPropagation)
				e.stopPropagation();
			else
				window.event.cancelBubble = true;
		},
		preventDefault:function( e ) {
			if (e && e.preventDefault)
				e.preventDefault();
			else
				window.event.returnValue = false;
			return false;
		},
		addEvent:function (elm, evType, fn, useCapture) {
			useCapture = useCapture || false;
			if (elm.addEventListener) {
				elm.addEventListener(evType, fn, useCapture);
			} else if (elm.attachEvent) {
				elm.attachEvent('on' + evType, function(){
					fn.call(elm);		//为了传回正确的this指向
				});
			} else {
				elm['on' + evType] = fn;
			};
		},
		removeEvent:function (elm, evType, fn, useCapture) {
			useCapture = useCapture || false;
			if (elm.removeEventListener) {
				elm.removeEventListener(evType, fn, useCapture);
			} else if (elm.detachEvent) {
				elm.detachEvent('on' + evType, fn);
			} else {
				elm['on' + evType] = null;
			};
		}
	};



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




/*
 * MYAPP
 * 
 */
(function () {

	"use strict";

	var MYAPP = {

		/*
		 * 因为javascript的单线程，所有任务都排在一个队列；效率是必须考虑的问题
		 *
		 * 当数组循环会占用大量时间时，可考虑分块模式
		 *
		 */
		chunk : function (arr, process, context) {

			setTimeout(function recursion() {

				var item = arr.shift();
				process.call(context, item);

				// arr在不断变化，当数组完成遍历的时候arr已经为空了！
				if (arr.length > 0) {
					setTimeout(recursion, 100);
				}
			}, 100);
		},

		throttle : function (method, context) {

			// 函数节流：某些代码没必要没有间断的连续重复执行，如winddow.onresize = function(){ throttle(fn); }
			clearTimeout(method.tId);

			method.tId = setTimeout(function () {
				method.call(context);
			}, 100);
		},

		getDocScrollTop : function () {
			return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		}
	};

	window.MYAPP = MYAPP, MYAPP = null;
})();


// DOM结构加载完成；jQuery方式：$.ready(function () { /* code goes here... */ }); 兼容IE
document.onreadystatechange = function(){
	if(document.readyState === 'interactive' || document.readyState === 'complete'){
		document.onreadystatechange = null;

		//you js code goes here...
		//alert('dom is loaded now');
	};
}; 



/*
 * 图片切换
 * 参数：容器节点，图片地址数组
 * 所需全局变量：$(节点选取器)  DOMWrapper(DOM包装器)
 *
 * 示例：new FadeImg($("#wrap"), ["../images/img1.png", "../images/img2.png"]);
 */ 
var FadeImg = function (slideWrap, arrImgSrc, autoPlay) {

    "use strict";

    var slideStr = "",
        triggerStr = "",
        cssStr = "",
        myDom = null,
        tempDom = null,
        eleTrigger = null,
        eleSlide = null,
        listr, imgNum, i, eleIndex;

    //动态添加样式
    var loadStyle = function (css) {
        var style = document.createElement("style");
        style.type = "text/css";
        style.rel = "styleSheet";

        try {
            style.appendChild(document.createTextNode(css));
        } catch (ex) {
            style.styleSheet.cssText = css;
        };

        document.getElementsByTagName("head")[0].appendChild(style);
    };



    cssStr += '.slideWrap{height:330px;position:relative}' +
            '.slideWrap ul.slide li{position:absolute;width:100%;height:330px;left:0;top:0;' +
                    'background-repeat:no-repeat;background-position:center 0;z-index:0;opacity:0;*filter(alpha:0);display:none;}' +
            '.slideWrap ul.slide li.current{z-index:1;display:block;opacity:1;*filter(alpha:100);}' +
            '.slideWrap ul.trigger{position:absolute;left:50%;margin-left:-500px;top:300px;z-index:99;height:20px;overflow:hidden}' +
            '.slideWrap ul.trigger li{float:left;width:20px;height:20px;background:#000;' +
                    'text-align:center;line-height:20px;color:#fff;margin:0 5px;cursor:pointer;font-weight:bold}' +
            '.slideWrap ul.trigger li.current{background:#f00}';


    loadStyle(cssStr);

    slideStr += '<ul class="slide">';
    triggerStr += '<ul class="trigger">';

    for (i = 0, imgNum = arrImgSrc.length; i < imgNum; i += 1) {
        listr = '<li class="index' + i + '" style="background-image:url(' + arrImgSrc[i] + ')"></li>';
        if (i === 0) {
            listr = '<li class="index' + i + ' current" style="background-image:url(' + arrImgSrc[i] + ')"></li>';
        }
        slideStr += listr;

        listr = '<li class="index' + i + '" index="' + i + '">' + (i + 1) + '</li>';
        if (i === 0) {
            listr = '<li class="index' + i + ' current" index="' + i + '">' + (i + 1) + '</li>';
        }
        triggerStr += listr;
    }

    slideStr += '</ul>';
    triggerStr += '</ul>';

    // html加载完成
    slideWrap.innerHTML = slideStr + triggerStr;


    
    eleSlide = $("ul", slideWrap)[0];
    eleTrigger = $("ul", slideWrap)[1];

    // 触点样式
    var fadeStep1 = function (domwrapper) {

        domwrapper.addClass("current");
        ;
        domwrapper.siblings().forEach(function (item) {

            if (item.className.indexOf("current") !== -1) {

                item.className = item.className.replace("current", "");
            }
        });
    };

    // 图片样式
    var fadeStep2 = function (domwrapper) {

        domwrapper.fadeIn();

        domwrapper.addClass("current");

        domwrapper.siblings().forEach(function (item) {

            if (item.className.indexOf("current") !== -1) {

                item.className = item.className.replace("current", "");
                tempDom = new DOMWrapper(item);
                tempDom.fadeOut(), tempDom = null;
            }
        });
    };

    // 点击切换效果
    eleTrigger.onclick = function (e) {
        var e = e || window.event,
            target = e.target || e.srcElement;

        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            window.event.cancelBubble = true;
        }


        ////////////////////DOMWrapper 包装器

        myDom = new DOMWrapper(target);

        eleIndex = myDom.element.getAttribute("index");

        // 首先改变触点样式
        fadeStep1(myDom);

        // 同步改变背景图片
        myDom = new DOMWrapper($("li", eleSlide)[eleIndex]);
        fadeStep2(myDom);

        // 最后回收此对象
        myDom = null;

    };



    // 自动播放效果
    var fadeAutoPlay = function () {

        var index = 0,
            timer = null;

        
        setTimeout(function play() {

            index += 1;

            if (index === imgNum) {
                index = 0;
            }


            myDom = new DOMWrapper($("li", eleTrigger)[index]);
            fadeStep1(myDom);


            myDom = new DOMWrapper($("li", eleSlide)[index]);
            fadeStep2(myDom);

            

            timer = setTimeout(play, 5000);

            slideWrap.onmouseover = function () {
                
                clearTimeout(timer);
            };

            slideWrap.onmouseout = function () {

                timer = setTimeout(play, 5000);
            };

        }, 5000);
        
    };

    // 默认自动播放
    if (imgNum > 1 && autoPlay !== false) {
        fadeAutoPlay();
    }
};


(function () {

	var arrImgSrc = ["img/banner1.jpg", "img/banner2.jpg"];

	new FadeImg($("#banner"), arrImgSrc);
})();



//  html5shiv  原理
(function (doc) {
	var e = ("article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section").split(","),
		len = e.length,
		i;
	for (i=0; i<len; i++) {
		doc.createElement(e[i]);
	}
})(document);

// 兼容的scrollTop
var docScrollTop = function () {
	return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
};

