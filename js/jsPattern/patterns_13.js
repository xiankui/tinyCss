/*************************** this *****************************/

//---------------全局代码中的this，就是全局对象本身，同时也是全局上下文中的变量对象VO(globalContext)


function foo(){
	console.log(this);			//Window
};

var bar = function bar(){};

console.log(this.foo);
console.log(this.bar);
foo();



//---------------函数代码中的this,其值在进入上下文时确定;若确定不了默认为Window
//				this是个对象，与当前执行代码最相关的对象。
(function(){
	var foo = {
		x : 10
	};

	var bar = {
		x : 20,
		test : function(){
			console.log(this === bar);		
			console.log(this.x);			

			//this = foo;					//错误，任何时候不能改变this的值
		}
	};

	bar.test();								//true 20

	foo.test = bar.test;

	console.log('-------------what is this ?-----------------');

	foo.test();								//false 10

}());

console.log('-----------  另一个经典例子  -----------');
(function(){
	function foo(){
		console.log(this.bar);
	};

	var x = {bar : 100};
	var y = {bar : 200};

	x.test = foo;
	y.test = foo;

	x.test();
	y.test();
})();

//构造器中的this
(function(){
	function A(){
		console.log(this);			//A{}
		this.x = 1000;
	};

	var a = new A();
	console.log(a.x);				//1000
})();

//call调用中的this
(function(){
	var b = 10000;

	function a(){
		console.log(this);
	};

	a();								//Window
	a.call({b : 2000});					//object {b:2000}

	var obj = {b : 3000};
	a.call(obj);

	console.log(obj.a);					//undefined
})();