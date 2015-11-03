/**********************************JavaScript:the Good Parts*******************************/
//---------------------------------对象	Object

//Object本身就是一个构造函数；对象有一个原型函数；所有的对象都继承自它；

console.log("Object:  " + Object);  //  构造函数
console.log("prototype:  " + Object.prototype);  //  原型对象
console.log("constructor:  " + Object.prototype.constructor);  //  又指向了Object自身


console.log("Object & Function: " + Object.prototype === {}.__proto__);  // true

//-------任何对象都有这个方法：函数，对象，字符串。。。就像Object.prototype.toString = function(){};
Object.prototype.test = 'test Object.prototype';

//对象可以用字面量来表示；对象是属性的容器；对象可以继承另一对象的属性；对象通过引用来传递，它们永远不会被拷贝；

var myObj = {
	airline : "Oceanic",
	number : 815,
	arrival : {
		IATA : "LAX",
		time : "2014-01-29",
		city : "Los Angeles"
	},
	fn : function(orgin){
		return 'from' + orgin;
	}
};

console.log("__proto__:  " + myObj.__proto__);   //  === Object.prototype

console.log(myObj.__proto__ === Object.prototype);  //  true

console.log('----------对象的原型	函数可以有方法，好似对象一般！！！-----------');

//给对象原型扩展方法；对象的继承 
if(typeof Object.beget !== 'function'){
	Object.beget = function(o){
		var F = function(){};
		F.prototype = o;
		return new F();
	};
};

console.log('----------------使用原型的新对象-----------------');
var another_myObj = Object.beget(myObj);

another_myObj.airline = "ShangHai";

console.log('**************使用原型的新对象的另一种写法****************');
(function () {
	var o = {
		name: 'orgin'
	};
	var oo = {};
	oo.__proto__ = o;

	o.sex = 'mail';
	console.log(oo.__proto__);
	console.log(oo.name + '-----' + oo.sex)
})();

console.log('------------------without hasOwnProperty------------------');
for(var prop in another_myObj){
	console.log(another_myObj[prop]);
};

console.log('---------------hasOwnProperty---------------');
for(var prop in another_myObj){
	if(another_myObj.hasOwnProperty(prop) && typeof another_myObj[prop] !== 'function'){
		console.log(another_myObj[prop]);
	};
};


console.log('----------------函数其实也是对象--------------------');

//给原型函数增加方法
Function.prototype.method = function(name, func){
	if(!this.prototype[name]){
		this.prototype[name] = func;
	};
};

//应用示例
String.method('trim',function(){
	return this.replace(/^\s+|\s+$/g, '');
});

console.log('	please trim my space!  '.trim())
console.log('   please trim my space!  '.test);


console.log('-----------------异常------------------------');
var add = function(a, b){
	if(typeof a !== 'number' || typeof b !== 'number'){
		throw{
			name : 'TypeError',
			message : 'add needs numbers'
		};
	};
	return a + b;
};


try{
	add('seven');
}catch(e){
	console.log(e.name + ':' + e.message)
};

try{
	console.log(add(3, 6));
}catch(e){
	console.log(e.name + ':' + e.message)
};

console.log('----------------------递归---------------------');
var factorial = function fac(i){
	if(i <= 1){
		return 1;
	};
	return i * fac(i-1);
};

console.log(factorial(5)); //5*4*3*2*1

console.log('---------------------模块-----------------------');

String.method('deentityify', function(){

	var entity = {
			quote : '"',
			lt : '<',
			gt : '>'
		};

	//这里是实际返回的deentityify方法；返回替换过后的字符串
	return function(){
		/*   
		 * @para a ==>  &gt;  正则匹配的字符串
		 * @para b ==>  gt	  匹配的第一个捕获性分组
		 * @this   ==>  指向String的实例
		 *
		*/
		return this.replace(/&([^&;]+);/g, function(a, b){
			var r = entity[b];
			return typeof r === 'string' ? r : a;
		});
	};
}());

console.log('&lt;&quote;&gt;'.deentityify());  //<">


console.log('----------------词法作用域: 静态作用域，作用域在语法分析的时候确定; 而this的调用可以认为是动态作用域---------------------');
// http://segmentfault.com/a/1190000002532217

//-----------------数组
console.log('----------------------数组：JavaScript数组其实就是用数字作为属性的对象-----------------------');
//数组是一段线性分配的内存，它通过整数去计算偏移并访问其中的元素。数组可以是很快的数据结构。
//不幸的是，JavaScript没有像这种数组一样的数据结构。
//JavaScript提供了一种拥有类数组特性的对象。它把数组的下标转变成字符串，用其作为属性。
//它有一个诡异的length属性，其实是最大的属性值加1；所以数组写法要严格

var arr = ['zero', 'one', 'two', 'there'];

delete arr[1];   //变成undefined占位
console.log(arr);

//数组的元素删除
arr.splice(1,1);
console.log(arr);

arr.push('four');

arr[10] = 1000;	

//  数组的下标只能是数字，否则就变成了标准对象
arr.add = function(){};	
console.log(arr);
console.log(arr.length);

//检测数组
var is_array = function(value){
	return value && 
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			typeof value.splice === 'function' && 
			!(value.propertyIsEnumerable('length'));
};
//简化版
is_array = function(value){
	return value &&
			typeof value === 'object' &&
			value.constructor === Array;
};

console.log(is_array(arr));
console.log(is_array(Object));

// 更流行的方式
Object.prototype.toString.call([]) === '[object Array]';
Object.prototype.toString.call({}) === '[object Object]';


/*********************************正则********************************/
console.log('-----------------------正则---------------------------');

//捕获性分组	------	()

//非捕获性分组	------	(?:)

//两者的区别在于影响reg.exec(string)的执行结果

//以正则为主语的表达：reg.test(string) 返回true或false；  reg.exec(string) 返回数组，包含第一个匹配因子及所有捕获性分组因子;

//以字符串为主语的表达： string.match(reg) 返回所有匹配结果形成数组;  string.replace(reg, my_str)  正则替换
