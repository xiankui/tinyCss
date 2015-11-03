/*************************命名函数表达式****************************/
/*--------
	函数声明：
	fundtion 函数名称 (参数：可选){函数体};
	不论放在什么位置，在作用域内最先解析。

	函数表达式：
	function 函数名称 (可选) (参数：可选){函数体};

*/
(function(){
	function foo(){
		console.log('函数声明');	//正常的函数声明
		//foo();					//函数声明可递归调用
	};	

	var bar = function foo(){
		console.log('函数表达式');	//因为是表达式的一部分
		//foo();					//命名的函数表达式可递归调用。
		console.log(foo);
		console.log(bar);			//undefined
	}();

	(function foo(){
		console.log('函数表达式');	//因为包含在()分组操作符内
	});

	(function(){
		function foo(){
			console.log('函数声明');	//因为是函数体的一部分
		};
	})();
})();


//----------------那么函数声明和函数表达式的区别又在哪里呢
(function(){
	console.log(foo());		//hello world;函数声明在任何表达式之前先被解析和求值！
	function foo(){
		return 'hello world'; 
	};
})();

(function(){
	console.log(foo);		//Uncaught TypeError: undefined is not a function 
	var foo = function(){
		return 'hello world';
	};
})();

(function(){
	console.log(foo);		//function foo(){return 'function is first'};
	//然后变量声明提升，再然后解析变量及表达式
	var foo;
	foo = 'var is first';
	foo = function(){
		return 'function expression is first'
	};
	//首先解析函数声明
	function foo(){
		return 'function is first';
	};
	console.log(foo);		//function foo(){return 'function expression is first'};
})();
/*----------------
	总结：在一个作用域内，先解析所有函数声明；再盘点所需变量，但不执行；最后顺序解析表达式及语句。
	但也不是一定的，不同浏览器内核的解析模式会有所不同。只是基本如此。
*/

//-----------------arguments.callee的替代方案
var callee = (function(x){
	if(x <= 1){
		return 1;
	};
	return x * arguments.callee(x - 1);
})(4);						//传参
console.log(callee);	//number 24  ==> 4 * 3 * 2 * 1

var replace_callee = (function facorial(x){
	if(x <= 1){
		return 1;
	};
	return x * facorial(x - 1);
})(function(){
	return 4;
}());								//传参并自执行
console.log(replace_callee);		//24

var fn_exp = function facorial(x){
	if(x <= 1){
		return 1;
	};
	return x * facorial(x -1);
};
console.log(fn_exp(4));  	//24 ==> 4 * 3 * 2 * 1