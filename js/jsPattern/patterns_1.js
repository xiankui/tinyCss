//http://www.cnblogs.com/TomXu/archive/2011/12/15/2288411.html
/*-----------
	汤姆大叔的博客之<<JavaScript Patterns>>理解
*/

//*******************Part One:编写高质量javascript代码的基本要点***********************
//---------------First:书写可维护的代码(Writing Maintainable Code)  ---- 可读、一致、可预测、备注。。。
//---------------Second:最小全局变量(Minimizing Globals)
//全局对象window的替代方式
var global = (function(that){
	'use strict';
	return that;
})(this);



(function func(){
	//var 变量应在函数顶部统一声明，因为它在函数的任意地方声明都好像是在顶部声明一样。
	//因为代码执行分两个阶段：1、变量 函数声明；2、代码执行。
	var a=1,
		b=2,
		sum = a + b,
		i,
		j;
	console.log(sum);  //3
})();

//----------------for loops
(function(){
	var i,max,myarray = [1,2,3];
	//次佳的循环
	for(i=0;i<myarray.length;i++){
		//myarray[i]...做点什么
		//循环会每次检索myarray的长度
	};
	console.log(i);	//3    
	//较好的方式
	for(i=0,max=myarray.length;i<max;i+=1){
		//myarray[i]...做点什么
		//只会对myarray的长度做一次检索
		//JSLint 对i+=1更友好些
		console.log(i);	//0,1,2
	};
	console.log(i);  //3
	//一种变型
	for(i = myarray.length;i-=1;){
		console.log(i);	//3,2,1
	};
})();

//------------------switch pattern
(function(){
	var inspect_me = 0,
		result = '';
	switch (inspect_me) {
		case 0:
			result = 'zero';
			break;
		case 1:
			result = 'one';
			break;
		case 2:
			result = 'two';
			break;
		default:
			result = 'unkown';
	};
	console.log(result);	//zero
})();

//--------------------== or ===??
(function(){
	var zero = 0,result;
	if(zero == false){		// ==是故意的还是一个疏漏？
		result = 'true';
	}else{
		result = 'false';
	};
	console.log(result);	//true
})();

//------------------avoiding eval()
(function(){
	var myfun = function(){
		var i,max,sum = 0;
		for(i=0,max=arguments.length;i<max;i+=1){
			sum += arguments[i];
		};
		console.log(sum);
	};
	//反面示例  仿佛eval()
	//setTimeout("myfun()",1000);
	//setTimeout("myfun(1,2,3)",1000);

	//更好的
	setTimeout(myfun,1000);		//console.log  0
	setTimeout(function(){
		myfun(1,2,3);	//console.log   6
	},1000);
})();

//--------------------Indentation（缩进）
(function(){
	var outer = function(a,b){
		var c = 1,
			d = 2,
			inner;
		if(a > b){
			inner = function(){
				return {		//返回一个匿名对象
					r:c-d
				};
			};
		}else{
			inner = function(){
				return {
					r:c+d
				};
			};
		};
		return inner;
	};
	console.log(outer(6,5)());		//Object{r:-1}
	console.log(outer(6,5)().r);	//-1
})();

//-----------------------curly braces(花括号)
(function(){
	var myfun = function(){
		return		//javascript会自动在每行结尾加分号，如果没有的话；等效于 return undefined;
		//下面代码不执行
		{
			name:"Batman"
		};
	};
	console.log(myfun()); //undefined
	myfun = function(){
		return {		//左花括号与语句放在同一行是个好习惯；每行结尾加分号是个好习惯。
			name:"Batman"
		};
	};
	console.log(myfun());	//Object{name:"Batman"}
})();

//--------------------------white space(宽松一致的间距使得代码更加透气)

//--------------------------separating words(分隔_单词，camelCase and _private 比较常见)；遵循规范比规范本身更重要

//--------------------------注释