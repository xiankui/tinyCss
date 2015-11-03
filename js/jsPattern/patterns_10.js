/*******************************JavaScript核心****************************/
//--------------------------Object
/*---------
	An object is a collection of properties and has a single prototype object.
	The prototype may be either an object or the null value.
*/
var foo;
console.log(foo);						//undefined

//对象的原型	obj._proto_
foo = {
	x:10,
	y:20
};
console.log(foo);						//Object {x=10, y=20}
console.log(foo.__proto__);				//Object {}		天然带有此属性指向原型
console.log(foo.__proto__.__proto__);	//null			原型链的终点
console.log(foo.prototype + '-----------------');				//undefined

//函数的原型	fn.prototype
foo = function(){
	return true;
};
console.log(foo);												//function()
console.log(foo.__proto__);										//function()
console.log(foo.__proto__.__proto__);							//object
console.log(foo.__proto__.__proto__.__proto__);					//null
console.log(foo.prototype)										//object
console.log(foo.prototype.prototype + '-----------------');		//undefined

//---------------------------Prototype chain
/*-------------
	A prototype chain is a finite chain of objects which is used to implemented 
	inheritance and shared properties.
	原型链是对象组成的有限链条，用以实现继承和共享属性。
*/
var a = {
	x: 10,
	calculate: function(z){
		return this.x + this.y + z;
	}
};

var b = {
	//x : 30,						//80
	y: 20,
	__proto__: a
};

console.log(b.calculate(30));		//60

//-----------------------Constructor构造函数  Function.prototype更类似于Object.__proto__
(function(){
	function Foo(y){
		this.y = y;
	};

	Foo.prototype.x = 10;

	Foo.prototype.calculate = function(z){
		return this.x + this.y + z;
	};

	var a = new Foo(10);

	console.log(
		'-----',
		Foo.__proto__,		//function
		'-----',
		Foo.prototype,		//Foo{x = 10, calculate=function(){}}
		'-----',
		Foo.constructor, 	//Function
		'-----',
		a.calculate(10),		//30
		'------',
		a.__proto__ === Foo.prototype 		//true  !!!!!!!!!!!!!!!!!!!!!!
	)
}());

//----------------------Execution Context Stack (执行上下文栈)

//----------------------Variable Object (变量对象)
/*---------
	A variable object is a scope of data related with the execution context.
	It is a special object associated with the context and which stores variables and
	function declarations are being defined within the context.

	在执行上下文中首先入栈（解析）的变量或函数声明。
*/
var foo = 10;
var bar = function(){};
function bar2(){};
(function bar3(){});

console.log(foo);			//10
console.log(bar);			//bar
console.log(bar2);			//bar2
//console.log(bar3);		//not defined

//-------------------------Activation Object 活动对象(被激活的对象)
function foo2(x,y){
	var z = 30;
	function bar4(){};
	(function bar5(){});
	console.log(bar4 + '--------激活------');

};

console.log('-----------activation object-------');
console.log(foo2);
//console.log(bar4)		//not defined

foo2(2,5);				//bar4  当运行foo2的时候，bar4被激活

//--------------------------Scope Chains (作用域链)
/*-------------
	A scope chain is a list of objects that are searched for identifiers appear in the code of the context.
	作用域链是一个对象列表，用以检索上下文代码中出现的标识符。
	检索顺序：自身 ----> 原型 ----> 父作用域
	标识符[identifiers]可以理解为变量名称、函数声明和普通参数。
*/
(function(){
	var x = 10;
	(function foo(){
		var y = 20;
		(function bar(){
			var z = 30;
			console.log('----scope chain ' + (x + y + z) + ' ----------');		//60
		}());
	}());
}());

/*--------------------------Closures(闭包)-------------------------*/
/*---------------
	A closure is a combination of a code block (in ECMAScript this is a function) and
	statically / lexically saved all parent scopes.
	Thus, via these saved scopes a function may easily refer free variables.

	闭包就是一系列代码块(在ECMASript中就是函数)，并且静态保存所有父级作用域。
	通过这些保存的作用域，函数能够轻易的搜寻自由变量。

	所谓静态(词法)作用域，就是函数在创建而非执行时保存的作用域。
*/

console.log('------------闭包---------');
//函数可以作为返回值
console.log('函数作为返回值');
(function(){
	function foo(){
		var x = 10;
		return function bar(){
			console.log(x);
		};
	};

	var returnedFunction = foo();

	var x = 20;

	console.log(returnedFunction);		//bar()
	returnedFunction();					//10
}());

//函数可以作为参数传递
console.log('函数作为参数');
(function(){
	//全局变量
	var x = 100;

	//全局函数
	function foo(){
		console.log(x);
	};

	(function(funArg){
		//局部变量
		var x = 200;

		funArg();		//100
	})(foo);			//将foo作为"funarg"参数传递
}());


//变量的共享
console.log("变量的共享");
(function(){
	function baz(){
		var x = 1;
		return{
			foo:function foo(){ return ++x; },
			bar:function bar(){ return --x; },
			orgin:function (){ return x; }
		};
	};

	var closures = baz();
	console.log(closures.foo());			//2
	console.log(closures.foo());			//3
	console.log(closures.orgin());			//3
	console.log(closures.bar());			//2
}());

console.log('变量共享的迷惑');
//变量共享的迷惑
(function(){
	var data = [];

	for(var k=0; k<3; k++){
		data[k] = function(){
			console.log(k);
		};
	};

	data[0]();		//3
	data[1]();		//3
	data[2]();		//3
}());

console.log('变量共享的正解');
(function(){
	var data = [];

	for(var k=0; k<3; k++){
		data[k] = (function(x){
			return function(){
				console.log(x);
			};
		})(k);					//将k当作参数传递
	};

	data[0]();
	data[1]();
	data[2]();
}());

//-------------------This指针-------------------
console.log('--------------this--------------');

//this表示caller（调用者）对象，会根据执行上下文的改变而改变；这点不像闭包的静态作用域那样
(function(){
	console.log(this);		//Window

	function foo(){
		console.log(this);
	};

	foo();					//Window

	var bar = {
		baz:foo
	};

	bar.baz();				//bar

	var otherFoo = bar.baz;
	otherFoo();				//Window
}());



console.log(fun_xx);		//fun_xx
console.log(xx);			//undefined

var xx = 'ss';
function fun_xx(){};