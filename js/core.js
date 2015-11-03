//core.js

var Common = {
	each:function(elem,fn){
		for(var i=0;i<elem.length;i++){
			fn.call(elem[i],i,elem[i]);
		};
	},
	allIndexOf:function(Str,str){
		var arr = [];
		var pos = Str.indexOf(str);
		while(pos > -1){
			arr.push(pos);
			pos = Str.indexOf(str,pos + 1);
		}
		return arr;
	},
	random:function(start,end){
		var total = end - start + 1;
		return Math.floor(Math.random()*total + start);
	}
};

//NodeList返回的是原生节点
var $ = function(selector,context){
	context = context || document;
	//
	if(typeof selector === 'string'){
		//id
		if(selector.indexOf('#') > -1){
			selector = selector.replace('#','');
			return context.getElementById(selector);
		}else if(selector.indexOf('.') > -1){
			//class
			selector = selector.replace('.','');
			if(document.getElementsByClassName){
				return context.getElementsByClassName(selector);
			}else{
				var i = context.all.length;
				var nodelist = [];
				selector = selector.replace(/\-/g, "\\-");
				var pattern = new RegExp("(^|\\s)"+selector+"(\\s|$)");
				while(--i >= 0){
					if (pattern.test(context.all[i].className) ) {
						nodelist.unshift(context.all[i]);
					};
				};
				return nodelist;
			};
		}else{
			//tag
			return context.getElementsByTagName(selector);
		}
	}else{
		//不做任何处理
		return selector;
	};
};
var DOM = {
	next:function(node){
		if(node.nextSibling.nodeType == 1){
			return node.nextSibling;  //for ie
		}else{
			return node.nextElementSibling;  //for firefox & chrome
		};
	},
	prev:function(node){
		if(node.previousSibling.nodeType == 1){
			return node.previousSibling;
		}else{
			return node.previousElementSibling;
		};
	},
	siblings:function(node){
		var arr = [], p = null, n = null;
		p = node.previousSibling;
		while(p){
			if(p.nodeType === 1){
				arr.unshift(p);
			};
			p = p.previousSibling;
		};
		var n = node.nextSibling;
		while(n){
			if(n.nodeType === 1){
				arr.push(n);
			};
			n = n.nextSibling;
		};
		return arr;
	},
	hasClass:function(node,classname){
		return node.className.match(RegExp("(\\s|^)"  + classname + "(\\s|$)"));
	},
	addClass:function(node,classname){
		DOM.hasClass(node,classname) || (node.className += ' ' + classname);
	},
	removeClass:function(node,classname){
		 if (DOM.hasClass(node,classname)) {
			var c = RegExp("(\\s|^)" + classname + "(\\s|$)");
			node.className = node.className.replace(c, "")
		}
	},
	toggleClass:function(node,classname){
		if(DOM.hasClass(node,classname)){
			DOM.removeClass(node,classname);
		}else{
			DOM.addClass(node,classname);
		};
	}
};
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
var Browser = {
    ie: /msie/.test(window.navigator.userAgent.toLowerCase()),
    moz: /gecko/.test(window.navigator.userAgent.toLowerCase()),
    opera: /opera/.test(window.navigator.userAgent.toLowerCase()),
    safari: /safari/.test(window.navigator.userAgent.toLowerCase()),
	ie6:!-[1,]&&!window.XMLHttpRequest
};
var Effect = {
	hide:function(elem){
		if(elem.length > 1){
			Common.each(elem,function(){
				this.style.display = 'none';
			});
		}else{
			elem.style.display = 'none';
		};
	},
	show:function(elem){
		if(elem.length > 1){
			Common.each(elem,function(){
				this.style.display = 'block';
			});
		}else{
			elem.style.display = 'block';
		};
	},
	setOpacity:function(elem,opacity){
		if(elem.filters){
			elem.style.filter = 'alpha(opacity='+ opacity +')';
		}else{
			elem.style.opacity = opacity/100;
		};
	},
	fadeIn:function(elem,opacity,speed){
		opacity = opacity || 100;
		speed = speed || 20;
		elem.style.display = 'block';
		Effect.setOpacity(elem,0);
		var val = 0;
		(function(){
			if(val <= opacity){
				Effect.setOpacity(elem,val);
				val += 5;
				setTimeout(arguments.callee,speed);	//arguments.callee匿名函数的自身调用
			};
		})();
	},
	fadeOut:function(elem,opacity,speed){
		opacity = opacity || 0;
		speed = speed || 20;
		var val = 100;
		(function(){
			Effect.setOpacity(elem,val);
			val -= 5;
			if(val >= opacity){
				setTimeout(arguments.callee,speed);
			}else if(val <= 0){
				elem.style.display = 'none';
			};
		})();
	},
	slideUp:function(elem,height,speed,step){
		speed = speed || 5;
		step = step || 5;
		height = height || elem.offsetHeight;
		var go = function(){
			height -= (step += 2);	//卷动速度越来越快
			if(height > 0){
				elem.style.height = height + 'px';
				setTimeout(go,speed);
			}else{
				elem.style.height = 0;
				elem.style.display = 'none';
			};
		};
		go();
	},
	slideDown:function(elem,height,speed,step){
		speed = speed || 5;
		step = step || 5;
		var minH = 0;
		elem.style.height = minH;
		elem.style.display = 'block';
		var go = function(){
			minH += (step += 2);	//卷动速度越来越快
			if(minH < height){
				setTimeout(go,speed);
			}else{
				minH = height;
			};
			elem.style.height = minH + 'px';
		};
		go();
	}
};

/*-----------slide 演示
-------------<button id="button">slide</button>
-------------<div id="slide" class="slide" style="height:700px;background-color:#0aa"></div>

$("#button").onclick = function(){
	if($('#slide').offsetHeight == 0){
		Effect.slideDown($("#slide"),700);
	}else{
		Effect.slideUp($("#slide"));
	};
};
*/


var Utils = {};

Utils.Tabs = function(id,tag,classname,evType){
	evType = evType || 'mouseover';  //360不认识mouseenter
	//prepare nodes for trigger and content
	var trigger = $(tag,$(id + '-0'));
	var tabCont = [];
	for(var i=1;i<=trigger.length;i++){
		tabCont.push($(id + '-' + i));
	};
	//默认第一个tab显示
	DOM.addClass(trigger[0],classname);
	for(var i=1;i<tabCont.length;i++){
		DOM.addClass(tabCont[i],'hide');
	};
	//the event
	var tab = function(){
		//this  ==> 当前元素节点
		var index = this.index;
		for(var i=0;i<trigger.length;i++){	//对所有节点做一次遍历
			if(i === index){	//当前元素显示
				DOM.addClass(this,classname);
				DOM.removeClass(tabCont[index],'hide');
			}else{	//其余元素隐藏
				DOM.removeClass(trigger[i],classname);
				DOM.addClass(tabCont[i],'hide');
			};
		};
	};

	//给每个触点绑定事件
	for(var i=0;i<trigger.length;i++){
		trigger[i].index = i;  //为节点添加index属性，标记索引
		Event.addEvent(trigger[i],evType,tab);
	};
};

/*--------------------tabs演示
//html
<div class="tabs">
	<ul id="tabs-0">
		<li>tab1</li>
		<li>tab2</li>
		<li>tab3</li>
	</ul>
	<div id="tabs-1">content1</div>
	<div id="tabs-2">content2</div>
	<div id="tabs-3">content3</div>
</div>
//js
var tabs_1 = new Utils.Tabs("#tabs",'li','at');
*/



Utils.Fade = function(id,tag,classname,evType,isautoplay){
	evType = evType || 'mouseover';
	//prepare for nodes
	var trigger = $(tag,$(id + '-0'));
	var content = [];
	for(var i=1;i<=trigger.length;i++){
		content.push($(id + '-' + i));
	};
	//default 
	DOM.addClass(trigger[0],classname);
	for(var i=1;i<content.length;i++){
		content[i].style.display = 'none';
	};

	var fade = function(){
		var index = this.index;
		for(var i=0;i<trigger.length;i++){
			if(i === index){
				if(content[i].style.display === 'block'){
					return;		//如果选中元素已是显示状态，那什么都不做
				};
				DOM.addClass(trigger[i],classname);
				Effect.fadeIn(content[i]);		//选中元素淡入
			}else{
				DOM.removeClass(trigger[i],classname);
				if(content[i].style.display === 'block'){
					Effect.fadeOut(content[i]);		//前一个显示元素淡出
				};
			};
		};
	};
	
	//事件绑定
	for(var i=0;i<trigger.length;i++){
		trigger[i].index = i;
		Event.addEvent(trigger[i],evType,fade);
	};
	//自动播放
	var timer = null;
	var autoIndex = 0;
	var autoplay = function(){
		fade.call(trigger[autoIndex]);
		autoIndex++;
		if(autoIndex == trigger.length){
			autoIndex = 0;
		};
		timer = setTimeout(autoplay,2000);	
	};
	
	Event.addEvent(content[0].parentNode,'mouseover',function(){
		clearTimeout(timer);
	});
	Event.addEvent(content[0].parentNode,'mouseout',function(){
		timer = setTimeout(autoplay,2000);
	});
	if(isautoplay){
		autoplay();
	};
};

/*-----------------fade demo
//html
<ul id="tabs-0">
	<li>fade1</li>
	<li>fade2</li>
	<li>fade3</li>
</ul>
<div class="content">
	<div id="tabs-1">content1</div>
	<div id="tabs-2">content2</div>
	<div id="tabs-3">content3</div>
</div>
//js
var fade_1 = new Utils.Fade('#tabs','li','at','mouseover',true);
*/

Utils.Accordion = function(id,handleClass,evType,istrue){
	evType = evType || 'click';
	var handle = $('.'+handleClass,$(id));
	var content = [];
	var height = [];
	for(var i=0;i<handle.length;i++){
		content.push($(id + '-' + i));
		if(i === 0){
			DOM.addClass(handle[0],handleClass + '-cur');	//打开状态class加   '-cur'
		};
	};
	for(var i=0;i<content.length;i++){
		height.push(content[i].offsetHeight);
		if(i > 0){
			content[i].style.display = 'none';
		};
	};
	var acc = function(){
		var i = this.index;
		if(DOM.hasClass(this,handleClass + '-cur')){
			DOM.removeClass(this,handleClass + '-cur');
			Effect.slideUp(content[i]);
		}else{
			DOM.addClass(this,handleClass + '-cur');
			for(var j=0;j<content.length;j++){
				if(i === j){
					Effect.slideDown(content[i],height[i]);
				}else if(istrue){		//一个打开则其余的都关闭
					content[j].style.display = 'none';
					DOM.removeClass(handle[j],handleClass + '-cur');
				};
			};
		};
	};
	for(var i=0;i<handle.length;i++){
		handle[i].index = i;
		Event.addEvent(handle[i],evType,acc);
	};
};

/*----------------accordion demo
//html
<div id="accordion">
	<h2 class="acc">acc1</h2>
	<div id="accordion-0" style="height:200px;border:2px solid #a0a">accordion-0</div>
	<h2 class="acc">acc2</h2>
	<div id="accordion-1"style="height:200px;border:2px solid #a0a">accordion-1</div>
	<h2 class="acc">acc3</h2>
	<div id="accordion-2"style="height:200px;border:2px solid #a0a">accordion-2</div>
</div>
//js
var accordion_1 = new Utils.Accordion('#accordion','acc','click',true);
*/

Utils.Slide = function(){

};