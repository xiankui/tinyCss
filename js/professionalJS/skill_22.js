/*****************************
	�߼����ɣ�����ΪЧ�ʺͼ�����
	
	JavaScript�ĵ��̺߳�DOM�����ĸ�����ʹ�ñ��뿼��js��Ч������  
 *******************************/
var arr = [];

//console.log(Object.prototype.toString.call(arr));		//[object Array]

var reg = /\s+/gi;

//console.log(Object.prototype.toString.call(reg));		//[object RegExp]

//console.log(Object.prototype.toString.call(JSON));		//[object JSON]

 var func = function(){};


 /**********
	Object.prototype.toString.call(value)  

	���κ�ֵ�ϵ��������������᷵��һ��[object NativeConstructorName]��ʽ���ַ���

	�Զ���Ĺ��캯������[object Object]

	�����Ǽ��һЩԭ�����͵ķ�����
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
	�������뺯����

		ÿһ�ε�if������ɲ���Ҫ���˷ѣ���ô������
*/


/***ÿ�ζ�Ҫ��һ��else�ж�
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
	������Function.prototype.bind�����this��ָ��
*/

var handler = {
	message : 'event handled',

	handleClick : function(){
		alert(this.message);
	}
};

//document.getElementById('drawing').onclick = handler.handleClick;		//thisָ����window����

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
	�κ�ʱ����setTimeout����setInterval����ȷ��ѡ��
*/

setTimeout(function(){

	//some really code goes here...
	//alert('aaa');
	setTimeout(arguments.callee, 1000)
}, 1000);


/***********
	��ѭ����ռ�ô���ʱ��ʱ���ɲ�������ֿ�ģʽ
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

//data.concat()��data�ĸ���������ԭ���鱣�ֲ���
chunk(data.concat(), function(item){
	console.log(item);
});

setTimeout(function(){console.log(data)}, 1000);


/**********
	����������ĳЩ���벻����û�м�ϵ������ظ�ִ�У���winddow.onresize = function(){ throttle(fn); }
*/

var throttle = function(method, context){
	clearTimeout(method.tId);

	method.tId = setTimeout(function(){
		method.call(context);
	}, 100);
}