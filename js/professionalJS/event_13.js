/*****************
	DOM & Event
****/

//动态添加脚本	
var loadScript = function(code){
	var script = document.createElement("script");
	script.type = "text/javascript";
	try {
		script.appendChild(document.createTextNode(code));
	} catch (ex) {
		script.text = code;
	};

	document.body.appendChild(script);
};

loadScript("alert('hello world')");

//动态添加样式
var loadStyle = function(css){
	var style = document.createElement("style");
	style.type = "text/css";
	
	try {
		style.appendChild(document.createTextNode(css));
	} catch (ex) {
		style.styleSheet.cssText = css;
	};

	document.getElementsByTagName("head")[0].appendChild(style);
};

loadStyle("body{background-color:#eee}");


//获取元素在整个文档中的偏移量 offset dimension
var getOffSetDimension = function(element){

	var _left, _top, parentEle;

	// 相对于父元素的偏移量
	_left = element.offsetLeft;
	_top = element.offsetTop;
	parentEle = element.offsetParent;

	while (parentEle !== null) {
		_left += parentEle.offsetLeft;
		_top += parentEle.offsetTop;
		parentEle = parentEle.offsetParent;
	};

	return {
		left : _left,
		top : _top
	};
};

//获取元素尺寸 client dimension
var getClientDimension = function(element){
	if (document.compatMode == "BackCompat"){
		//兼容怪异模式
		return {
			width : document.body.clientWidth,
			height : document.body.clientHeight
 		};
	} else {
		//标准模式
		return {
			width : document.documentElement.clientWidth,
			height : document.documentElement.clientHeight
		};
	};
};

//滚动大小(可直接使用)	scroll dimension
var getScrollDimension = function(element){
	//元素的左侧和上部的不可见部分
	return {
		left : element.scrollLeft,
		top : element.scrollTop
	};
};


/***********

	onload		==>		完全加载（所有图像、JavaScript文件、CSS文件等外部资源都具有onload事件）

	img			==>		图像设置了src属性后就开始加载，不必等到节点插入后

	script  	==>		脚本节点添加到页面DOM后才会开始加载   

*****/

/* html5事件：主流都还不支持
document.onDOMContentLoaded = function(){
	alert('dom loaded');
}

document.onbeforeunload = function(){
	alert('are you sure to leave this page ?');
};
*/

window.onload = function(){

	//表示所有文件、图片都加载完成
}

//jQuery.readry(function(){});实现方式；DOM结构加载完成
document.onreadystatechange = function(){
	if(document.readyState === 'interactive' || document.readyState === 'complete'){
		document.onreadystatechange = null;

		//you js code goes here...
		alert('dom is loaded now');
	};
}; 

/*********
	出于对内存和性能的考虑：

		使用事件委托:click mousedown  mouseup  keydown  keyup  keypress

		移除空事件处理程序：某个节点被移除了，但它之前注册的事件还留在内存中呢；或者某个事件应用过了

		在unonload事件中移除所有注册过的事件	
******/
