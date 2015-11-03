/************************************面向对象编程之ECMAScript实现*********************************/

//-------------------5种原始值类型
var a = undefined;
var b = null;
var c = true;
var d = 'test';
var e = 10;

console.log(typeof a);		//undefined
console.log(typeof b);		//object
console.log(typeof c);		//boolean
console.log(typeof d);		//string
console.log(typeof e);		//number

//这些值是在底层上直接实现的，他们不是object，所以没有原型，没有构造函数。

//------------------Object类型
var o = {
	a : 10,
	b : {z : 100},
	c : function(){
		console.log('method o.c');
	}
};

console.log('----------------' + typeof o);			//object
console.log('----------------' + typeof o.a);		//number
console.log('----------------' + typeof o.c);		//function

//Object 冻结
Object.freeze(o);						//冻结的对象不能修改、扩展或删除
o.e = 'i am frozen';
delete o.a;
console.log(o.e);						//undefined
console.log(o.a);						//10
console.log(Object.isFrozen(o));		//true

//---------------类型之间的转换
var f = new String('1000');
console.log('-------------' + typeof f);		//object

var f = f.valueOf();
console.log('-------------' + typeof f);		//string

f = String(f);
console.log('-------------' + typeof f);		//string

f = Number(f);
console.log('-------------' + typeof f);		//number

f = Boolean(f);
console.log('-------------' + typeof f);		//boolean true

//-------------------Literal 字面量
var array = [1, 2, 3];
var object = {a:1, b:2, c:3};
var re = /^\d+$/g;

console.log(typeof array);			//object    数组是对象
console.log(typeof object);			//object
console.log(typeof re);				//object    正则也是对象

Object.prototype.toString.call(array) === '[object Array]';
Object.prototype.toString.call(object) === '[object Object]';