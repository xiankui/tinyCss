/*********************************Function************************/
/*------------
	函数类型：

		函数声明

		函数表达式

		函数构造器创建的函数
*/

/*------------------
	函数声明(FD)是这样一种函数：

		1.	有一个特定的名称
		2.	在源码中的位置：要么处于程序级(Program level)，要么处于其他函数的主体(FunctionBody)中
		3.	在进入上下文阶段创建
		4.	影响变量对象VO			
		5.	以下面方式声明

			function exampleFunc(){
				...
			}
*/

//函数在其声明之前被调用，是可以的
foo();					// foo

function foo(){
	console.log('foo');
};

/*---------------------
	函数表达式(缩写为FE)是这样一种函数：

		1.	在源码中须出现在表达式的位置
		2.	有可选的名称
		3.	不会影响变量对象
		4.	在代码执行阶段创建
		5.	其形式如下：
			
			赋值表达式
			var foo = function(){
				...
			};

			或者

			var foo2 = function _foo2(){
				...
				_foo2  //可用于内部递归调用等。
			};

			圆括号(分组操作符)内只能是表达式

			(function foo(){});

			数组初始化器内只能是表达式

			[function bar(){}]

			逗号也只能操作表达式

			1,function baz(){};

*/

var foo2 = function _foo2(){
	console.log('foo2');
};

//console.log(_foo2);   //_foo2 is not defined

var foo3 = (6 % 3 === 0 ? function(){ return 6; } : function(){ return 3; });

console.log(foo3());		//6

/*-----------------------
	关于立即执行的函数

		当函数不在表达式的位置的时候，分组操作符圆括号是必须的——也就是手工将函数转化成FE。
		如果解析器知道它处理的是FE，就没必要用圆括号。
*/
// function(){}();   //语法错误
(function foo4(){
	console.log('with a wrapper () function definition being transfered to function expression');
})();

var foo5 = function(){
	console.log('only function expression can do just now ! with a () behind it');
}();


if (true) {
 
  function foo6() {
    console.log(0);
  }
 
} else {
 
  function foo6() {
    console.log(1);
  }
 
}
 
foo6(); // 1 or 0 ?实际在上不同环境下测试得出个结果不一样;事实上，函数声明是不能出现在代码块中的


/*-------------------
	用函数构造器创建的函数

		它的作用域链仅包含全局对象。(好像不怎么用)
*/

var x = 200;
var y = 300;

function foo7(){

	var x = 20;
	var y = 30;

	var bar = new Function('console.log(x); console.log(y);');
	return bar;
};

foo7()();			//200  300
console.log(typeof foo7());		//function

function AA(){};
var aa = new AA();
console.log(typeof aa);			//object