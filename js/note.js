/************************
	JavaScript与DOM是两个独立的东西。
	
	JavaScript是一种解释性的弱类型语言。

	DOM是指文档对象模型。它有两个重要API：Node、Event

	在Web上，两者通过API表现出了神奇的交互体验。
*/

//------------------JavaScript的五大基本类型(它们在底层直接实现，没有原型，没有构造函数，不是对象。)

console.log('---------------------五大原始类型---------------------');

var simpleType;

simpleType = undefined;				//声明而未赋值的变量
console.log(typeof simpleType);

simpleType = null;					//空对象，对象的销毁状态
console.log(typeof simpleType);

simpleType = 'string';
console.log(typeof simpleType);

simpleType = 10;
console.log(typeof simpleType);		//数字在内存中只有一种状态：64位浮点数

simpleType = true;
console.log(typeof simpleType);

console.log('---------------------类型之间的强制性转换-----------------------');

console.log(Number(simpleType));

console.log(String(simpleType));

console.log(Boolean(simpleType));


//--------------------------两大重要对象object & function（除了五大原始类型外，其余全都是对象！！！）
console.log('-----------------object & function-------------------');

function fn(){};
console.log(typeof fn);

var fn_ex = new fn();
console.log(typeof fn_ex);

console.log(fn.prototype === fn_ex.__proto__);		//true		函数和对象就有如此微妙的关系！！！！

var obj = {};
console.log(typeof obj);

var arr = [];
console.log(typeof arr);

var reg = /\d+/gi;
console.log(typeof reg);


//---------------------------函数的两种类型：函数声明和函数表达式(参数在函数体内相当于变量的声明)

console.log('-------------------function----------------------');

//函数声明

function fnDeclare(){

	console.log(arguments);		//函数自带的参数数组
	console.log(fnDeclare);		//函数声明可递归调用
};

fnDeclare();

//函数表达式(如：赋值表达式)
var fnExpression = function(num){

	if(num <= 1){
		return 1;
	};

	return num + fnExpression(--num);				//函数表达式也可递归调用

	//return num + arguments.callee(--num);			//arguments.callee   递归的替代方案
};

console.log(fnExpression(5));		//15

console.log('----------------立即执行的函数表达式------------------');


//立即执行的函数表达式(一般用来限定作用域范围，模仿私有变量；有效避免了全局变量的污染)
(function(){
	
	var obj = {
		simpleType : 'simpleType',
		fn : 'function'
	};

	console.log(obj);

})();

//传参的立即执行的函数表达式
var jQuery = jQuery || function(id){return document.getElementById(id);};

(function($){
	
	var node = $('accordion');

	console.log(node);

})(jQuery);

//作为返回值的函数
(function(){

	var obj = {

		simpleType : 'returned simpleType',

		fn : function(){
			return 'returned fn';
		}
	};

	var exports = {};

	exports.init = function(){
		return obj.fn;
	};

	var fnBack = exports.init();			//返回了一个函数

	console.log(fnBack());
})();


//函数作用域、静态作用域及闭包；变量的查找像冒泡式查找：自身、原型、父作用域。。。

console.log('-----------------函数作用域、词法(静态)作用域及闭包-----------------');
// http://segmentfault.com/a/1190000002532217

(function(){

	var a = 100, b = 200;


	var foo = function(){
		return a + '-----' + b;
	};

	(function(){

		var a = 10;				//a 静态作用域起了作用  为100；a声明了两次，占两个内存位置，取静态作用域那次

		b = 2000;				//b 变量的赋值起了作用 为2000；b只声明了一次，只占一个内存位置

		console.log(foo());

	})();

})();


//-----------变量与属性：变量必须用var关键字声明；所有的全局变量都是window的属性；属性可删除，变量不可删除

console.log('-------------变量与属性-------------');

var  xx = 10;

window.yy = 100;

delete xx;

delete window.yy;

console.log(window.xx);		//10

console.log(window.yy);		//undefined


//-------执行上下文（作用域内代码解析的顺序）：作用域、变量的声明、函数的声明、变量的赋值及逻辑代码的执行。
console.log('----------------执行上下文---------------');

console.log(context);			//undefined

console.log(fn_context);		//fn_context()

//console.log(context_inner);		//not defined 报错

var context = '执行上下文变量';

function fn_context(){

	return '执行上下文中的函数';

};

(function(){

	var context_inner = '函数作用域内的变量';

})();

/******************
	上段代码的实际解析流程是这样的：

		var context;

		function fn_context(){
			return '执行上下文中的函数';
		};

		context = '执行上下文变量';

		变量context_inner的作用域在闭包内；全局上下文中找不到它。

*/

//------------------this：与当前执行代码最相关的对象；默认为window
//------------------call：功能（函数）的借用；不会增加对象的内存
console.log('-------------------this & call------------------');

(function(){

	var that = function(){

		console.log(this);

		if(arguments.lenth !== 0){
			console.log(arguments[0]);
		}; 
	};

	var obj = {x : 10};

	var obj2 = {y : 20};

	that();						//window

	that.call(obj);				//obj    好像是这样 		obj.that();

	that.call(obj2,'arg1');		//obj2 	arg1				obj2.that('arg1');

})();

//------------------------------JSON：现代浏览器中已是内置的对象；有JSON.parse & JSON.stringify两个方法。
console.log('---------------------json-----------------------');

//对象字面量
var obj_literal = { prop : "val", num : 10 };

//json字符串
var json_string = '{"prop":"val","num":10}';

//JSON就是能够使对象和字符串相互转换的方法(解决ie兼容)
if(typeof JSON === 'object'){

	//----------现代浏览器

	//序列化
	JSON.stringify(obj_literal) === json_string ? console.log('JSON.stingify') : console.log('o,something wrong.');

	//反序列化
	JSON.parse(json_string).prop === obj_literal.prop ? console.log('JSON.parse') : console.log('o,wrong!');

}else{

	//ie6 && ie7
	eval('(' + json_string + ')').num === obj_literal.num ? alert('eval == JSON.parse') : alert('eval is wrong.');

	//将对象序列化的方法
	var ie_JSONstringify = function (obj) { 
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

    ie_JSONstringify(obj_literal) === json_string ? alert('ie_JSONstringify == JSON.stringify') : alert('wrong');
};



//----------------------------AJAX
console.log('-------------------------AJAX(同域请求)-----------------------------------');
/****

	AJAX is about updating parts of a web page,without reloading the whole page.

	the keystone of AJAX is the XMLHttpRequest object.

	the XMLHttpRequest object is used to exchange data with a server.

	XMLHttpRequest 和 Date 相似，是JavaScript的原生构造函数。

*/
console.log(typeof XMLHttpRequest + '------------------	XMLHttpRequest');		//原生构造函数
console.log(typeof Date + '----------------------------	Date');				//原生构造函数
console.log(typeof Math + '----------------------------	Math');				//原生对象
console.log(typeof Array + '---------------------------	Array');
console.log(typeof Function + '------------------------	Function');
console.log(typeof Object + '--------------------------	Object');			//原生构造函数
console.log(typeof RegExp + '--------------------------	RegExp');
console.log(typeof JSON + '---------------JSON    上面这些都是原生的构造函数或对象');

var Ajax = {

	createXmlhttp : function(){

		var xmlhttp;

		if(window.XMLHttpRequest){
			//for ie7+
			xmlhttp = new XMLHttpRequest();
		}else{
			//for ie6
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		};

		return xmlhttp;
	},

	get : function(url, callback, async){

		var xmlhttp = this.createXmlhttp();

		//默认异步请求
		async === false ? '' : async = true;

		//async = async || true;		此代码有问题  async总是true

		if(async){

			xmlhttp.onreadystatechange = function(){
				if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
					callback(xmlhttp.responseText);
				};
			};

			xmlhttp.open('GET', url, true);
			xmlhttp.send();

		}else{

			xmlhttp.open('GET', url, false);
			xmlhttp.send();
			callback(xmlhttp.responseText);
		};
	},

	post : function(url, option){

		var xmlhttp = this.createXmlhttp();

		var data = option.data;

		var callback = option.callback;

		var async = option.async === false ? false : true;
		

		if(async){

			xmlhttp.onreadystatechange = function(){
				if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
					callback(xmlhttp.responseText);
				};
			};

			xmlhttp.open("POST", url, true);
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.send(data);
		}else{

			xmlhttp.open("POST", url, false);
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.send(data)
			callback(xmlhttp.responseText);
		};
	}
};

Ajax.get('t.txt',function(data){
	console.log(data);
},false);



Ajax.post('xjbdata.aspx',{
	callback : function(data){
		console.log(data);
	},
	async : false
});

//------------------------跨域请求
console.log('----------------------跨域请求之 JSONP & jsLoad-----------------------');

// 完全的异步加载方式
var jsLoader = function(url, charset, callback){

	var _script = document.createElement('script');
	_script.setAttribute('charset', charset);
	_script.setAttribute('src', url);
	document.getElementsByTagName('head')[0].appendChild(_script);
	
	//当脚本加载完成后(脚本已读入内存)移除文件并执行回调函数
	
	if(/msie/.test(window.navigator.userAgent.toLowerCase())){
		_script.onreadystatechange = function(){
			if(this.readyState == 'loaded' || this.readyState == 'complete'){
				//移除加载过后的引用
				_script.parentNode.removeChild(_script);
				callback();
			};
		};
	}else{
		_script.onload = function(){
			_script.parentNode.removeChild(_script);
			callback();
		};
	};
};

var url = 'http://fundex.eastmoney.com/FundWebServices/FundAd.aspx?t=5&h=luckyData';
jsLoader(url, 'utf-8', function(){
	//luckyData就是一种jsonp协议；它由后端人员提供；一举解决了跨域请求和jsonp协议
	console.log(luckyData);
});


//------------------------正则
console.log('----------------------RegExp, is short for regular expression, that describes a pattern of characters.------------------------------');
var regStr = 'hello,this is a RegExp test string,try your skill about regexp with it.'
var regPattern = /reG/gi;

var regStr2 = 'pattern han zi 正则匹配汉字！';
var regPattern2 = /[\u4e00-\u9fa5]/g;

var regStr3 = '18321807816';
var regPattern3 = /[0-9]{12}/;

//test()	字符串中是否包含这样规则的字符；返回true或者false
console.log(regPattern.test(regStr)); // true
console.log(regPattern2.test(regStr2));	//true
console.log(regPattern3.test(regStr3)); //false

//match()	返回正则匹配结果的对象；空则返回null
console.log(regStr.match(regPattern));
console.log(regStr2.match(regPattern2));
console.log(regStr3.match(/\d{11}/));

//exec()；是正则中最强大和耗资源的一种方式；它会捕获第一个匹配因子并附加捕获性分组然后把指针指向下一个字符；准备再次执行	
console.log(regPattern.exec(regStr));

//replace()
console.log(regStr2.replace(regPattern2, '')); //pattern han zi !




//-----------------------DOM:Node & Event
console.log('-----------------------DOM(document object model):Node & Event---------------------------------');

/*************************
	事件可分为四大类：
		鼠标事件：click, dblclick, mouseover, mouseout
		键盘事件：keypress, keydown, keyup
		表单事件：select, change, submit, reset, focus, blur
		其他事件：load, resize, scroll, unload

	事件处理的方式又可分为两种：
		基本事件注册：
			myElement.onclick = buttonClick;			//myElement是元素节点，buttonClick是个函数。
		高级事件注册：									//该模式允许一个事件绑定多个函数，并且可以解除对某个函数的绑定。
			addEvent(myIntro, 'click', function oneClickOnly(){
				alert('you can click me only!');
				removeEvent(myIntro, 'click', oneClickOnly);
			});

	Event 对象：当事件注册后，改Event对象将自动在函数内可用。
		阻止默认行为：
			e.preventDefautl();
		阻止冒泡行为：
			e.stopPropagation();
		事件委托：					//比如，一个大表格，在每个<tr>上绑定点击事件不好，性能是个大问题。流行的做法是用事件委托。
			myTable.onclick = function(e){

				e = e || window.event;

				var targetNode = e.target || e.srcElement;

				if(targetNode.nodeName.toLowerCase === 'tr'){
					console.log('you clicked a table row!');
				}
			}
*/

