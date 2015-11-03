/*****************************  你真懂JavaScript吗？ **************************/
//-------------------question1
if(!("a" in window)){
	var a = 1;			//处在全局作用域的变量声明被提到了顶部；但赋值操作并未执行。
};
console.log(a);			//undefined		变量声明了但为赋值！
/*-------------
	首先，所有的全局变量都是window的属性，语句 var a = 1;等价于window.a = 1; 你可以用如下方式来检测全局变量是否声明
			"变量名称" in window

	第二，所有的变量声明都在范围作用域的顶部。JavaScript引擎首先会扫描所有的变量声明，然后将这些变量声明移动到顶部。

	第三，你需要理解该题目的意思是，变量声明被提前了，但变量赋值没有；
			var a = 1;
			等价于
			var a;		//变量声明被提到作用域的顶部

			a = 1;
*/

//-----------------------------question2
var a = 1,
	b = function a(x){
		x && a(--x);
	};
console.log(a);				//1

//----------------------------question3

(function(){
	function a(x){
		return x * 2;
	};
	var a;
	console.log(a);				//a(x)		函数声明会覆盖变量声明

	a = 10;
	console.log(a);				//10		但如果该变量赋值了，变量声明则会覆盖函数声明

})();

//----------------------------question4
(function(){
	function b(x, y, a){
		arguments[2] = 100;
		console.log(a);
	};
	b(1,2,3);				//100
})();

//--------------------------------question5
(function(){
	function a(){
		console.log(this);
	};
	a.call(null);			//window  等价于a.call(window);

	var o = {};
	a.call(o);				//Object{}
})();