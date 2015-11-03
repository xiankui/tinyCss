/**********************立即调用的函数表达式(自执行)**************************/
//---------------我们可以把递归叫做自执行
function foo(x){
	if(x <= 1){
		return 1;
	};
	return x + foo(x -1);
};
console.log(foo(5));	//15		5 + 4 + 3 + 2 + 1

//----------------立即调用的函数表达式
(function(x){
	console.log(x);
}(5));

(function(x){
	console.log(x);
})(9);

var cacu = (function foo(x){
	if(x <= 1){
		return 1;
	};
	return x * foo(x -1);
}(5));
console.log(cacu);		//120		5 * 4 * 3 *2 *1

(function(){
	function foo(x){
		if(x <= 1){
			return 1;
		};
		return x * foo(x -1);		//自执行函数
	};
	console.log(foo(3));		//6		3 * 2 * 1
}());		//立即调用的函数表达式

//------------------------立即调用的函数表达式进阶之Module模式
var counter = (function(){
	var i = 0;
	return{
		get:function(){
			return i;
		},
		set:function(val){
			i = val;
		},
		increment:function(){
			return ++i;
		}
	};
}());
console.log(counter.get());
counter.set(10);
console.log(counter.increment());
console.log(i);			//i is not defined