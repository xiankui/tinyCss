/*******************************第七章	函数表达式**************************/

//函数表达式 	函数fun的作用域比它的表达式引用factorial低一个级别！！
var factorial = function fun(num){
	if(num <= 1){
		return 1;
	};
	return num * fun(num - 1);
};
var result0 = factorial(4);

console.log(result0);
//console.log(fun);  // f is not defined

//函数表达式2
var factorial2 = (function f(num){
	if(num <= 1){
		return 1;
	};
	return num *f(num-1);
});
var result = factorial2(4);

console.log(result);

//立即执行的函数表达式
var result2 = (function fac(num){	//num是形式参数
	if(num <= 1){
		return 1;
	};
	return num * fac(num - 1);
})(4);								//(4)是实际参数

console.log(result2);

//立即执行的函数表达式第二种写法  ------------  推荐的写法
var result3 = (function myfac(num){
	if(num <= 1){
		return 1;
	};
	return num * myfac(num - 1);
}(4));

console.log(result3);

/****
	闭包：闭包是指有权访问另一个函数作用域中的变量的函数；常见方式就是在一个函数内部创建另一个函数。

		当某个函数第一次被调用时，会创建一个执行环境及相应的作用域链，并把作用域链赋值给一个特殊的内部属性即[[Scope]];

		这个过程在后台被当做一个变量对象。

		即变量对象可以理解为包含this, arguments, 参数、内部变量还有一个向上的作用域链（简单的说是活动对象和作用域链）。

		作用域链本质上是一个指向变量对象的指针列表。它只引用但不实际包含变量对象。

		变量对象只在函数执行的过程中存在。唯有全局环境的变量对象始终存在。

		无论什么时候在函数中访问一个变量时，就会从作用域链中搜索具有相应名字的变量。

		一般来讲，当函数执行完毕后，这个变量对象就会被销毁（包括活动对象和作用域链）。

		但闭包的情况又有所不同！！

		闭包会保存父级作用域的活动对象，直到闭包销毁，父级（或以上）活动对象才被销毁。

		闭包会比其他函数占用更多的内存，不要过度使用。
***/

console.log('---------------------闭包---------------------');
//闭包应用
var createComparisonFunction = function(propertyName){

	//返回一个匿名闭包
	return function(object1, object2){
		var value1 = object1[propertyName];
		var value2 = object2[propertyName];

		if (value1 < value2){
			return -1;
		} else if (value1 > value2){
			return 1;
		} else {
			return 0;
		};
	};
};

//创建函数  它包含了createComparisonFunction的活动对象和全局变量对象
var compareName = createComparisonFunction('name');

//调用函数
var compare_result = compareName({'name' : 'Nicholas'}, {'name' : 'Greg'});
console.log(compare_result);

//解除对匿名函数的引用，释放内存（此时createComparisonFunction的活动对象才被销毁）。
compareName = null;


//解除闭包带来的变量访问问题
var createFunctions = function(num){
	var i, result = [];

	for(i=0; i<num; i++){
		result[i] = function(num){
			return function(){
				return num;
			};
		}(i);
	};

	return result;
};

var funcs = createFunctions(10);
for(var i=0; i<10; i++){
	console.log(funcs[i]());
};


//销毁闭包中HTML元素（手动销毁闭包中不必要的活动对象）
var assignHandler = function(){

	var element = document.getElementById('someElement');

	//事件注册在一个闭包函数上；element将不会被内存回收
	element.onclick = function(){
		alert(element.id);
	};
};

//手动销毁
var assignHandler = function(){
	var element = document.getElementById('someElement');
	var id = element.id;

	element.onclick = function(){
		alert(id);
	};

	//确保DOM对象的回收
	element = null;
};

//模仿块级作用域		==> 因为没有指向匿名函数的引用，函数执行完毕即立即销毁；是减少闭包的好方法。 
(function(){

	//这里是块级作用域
	var result;

})();

console.log('----------------词法作用域: 静态作用域，作用域在语法分析的时候确定; 而this的调用可以认为是动态作用域---------------------');
// http://segmentfault.com/a/1190000002532217