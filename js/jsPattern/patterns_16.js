/*************************************Closures*****************************/
//--------------函数式参数
function exampleFunc(funArg){
	funArg();
};

exampleFunc(function(){
	console.log('funArg');			//funArg
});

//--------------函数式返回
(function(){
	return function(){
		console.log('returned function is called');			//returned function is called
	};
})()();

//--------------自应用函数
(function selfApplicative(funArg){
	if(funArg && funArg === selfApplicative){
		console.log('self-applicative');
		return;
	};

	selfApplicative(selfApplicative);		//self-applicative
})();


//-----------------词法（静态）作用域
/*-----------
	在ECMAScript只使用静态作用域
	所有的函数都是闭包：闭包是代码块和创建该代码块的上下文中数据的结合。
	所有的函数在创建的时候就保存了上下文的作用域链，[Scope]在函数创建的时候就有了。
*/
var z = 10;

function foo(){
	console.log(z);			// foo函数中保存了z的值  10
};

foo();

(function(){
	var z = 20;
	foo();					//10
})();

(function (funArg){
	var z = 30;
	funArg();				//10
})(foo);