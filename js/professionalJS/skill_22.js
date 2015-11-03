/*****************************
	高级技巧：技巧为效率和简洁而生
	
	JavaScript的单线程和DOM操作的复杂性使得必须考虑js的效率问题  
 *******************************/
var arr = [];

//console.log(Object.prototype.toString.call(arr));		//[object Array]

var reg = /\s+/gi;

//console.log(Object.prototype.toString.call(reg));		//[object RegExp]

//console.log(Object.prototype.toString.call(JSON));		//[object JSON]

 var func = function(){};


 /**********
	Object.prototype.toString.call(value)  

	在任何值上调用上述方法都会返回一个[object NativeConstructorName]格式的字符串

	自定义的构造函数返回[object Object]

	下面是检测一些原生类型的方法：
 */

 var isArray = function(value){
 	return Object.prototype.toString.call(value) === '[object Array]';
 };

 var isFunction = function(value){
 	return Object.prototype.toString.call(value) === '[object Function]';
 };

 var isRegExp = function(value){
 	return Object.prototype.toString.call(value) === '[object RegExp]';
 };

 var isNativeJSON = window.JSON && Object.prototype.toString.call(JSON) === '[object JSON]';

 //console.log(isArray(arr));

 //console.log(isFunction(func));

 //console.log(isNativeJSON);

/*****
	惰性载入函数：

		每一次的if语句会造成不必要的浪费，那么。。。
*/


/***每次都要做一次else判断
var createXmlhttp = function(){

	var xmlhttp;

	if(window.XMLHttpRequest){
		//for ie7+
		xmlhttp = new XMLHttpRequest();
	}else{
		//for ie6
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	};

	return xmlhttp;
};
*/

var createXHR = (function(){

	if (window.XMLHttpRequest){

		return function(){
			return new XMLHttpRequest();
		};

	} else {

		return function(){
			return new ActiveXObject("Microsoft.XMLHTTP");
		};

	};

})();


/************
	函数绑定Function.prototype.bind：解决this的指向
*/

var handler = {
	message : 'event handled',

	handleClick : function(){
		alert(this.message);
	}
};

//document.getElementById('drawing').onclick = handler.handleClick;		//this指向了window对象

if (!Function.prototype.bind){
	Function.prototype.bind = function(context){
		var that = this;

		return function(){
			return that.apply(context, arguments);
		};
	};
};

document.getElementById('btn').onclick = handler.handleClick.bind(handler);



/**********
	任何时候用setTimeout代替setInterval是正确的选择
*/

setTimeout(function(){

	//some really code goes here...
	//alert('aaa');
	setTimeout(arguments.callee, 1000)
}, 1000);


/***********
	当循环会占用大量时间时，可采用数组分块模式
*/

var chunk = function(arr, process, context){
	setTimeout(function(){

		var item = arr.shift();
		process.call(context, item);

		if (arr.length > 0){
			setTimeout(arguments.callee, 100);
		};
	}, 100);
};

var data = [12, 123, 415, 569, 999, 888];

//data.concat()是data的副本，这样原数组保持不变
chunk(data.concat(), function(item){
	console.log(item);
});

setTimeout(function(){console.log(data)}, 1000);


/**********
	函数节流：某些代码不可以没有间断的连续重复执行，如winddow.onresize = function(){ throttle(fn); }
*/

var throttle = function(method, context){
	clearTimeout(method.tId);

	method.tId = setTimeout(function(){
		method.call(context);
	}, 100);
}