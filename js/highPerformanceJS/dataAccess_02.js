/************************  第二章  数据访问  **********************/

/***********
 * 
 * javascript的数据存放位置大致就这四种：
 *
 * 1、字面量
 * 2、变量
 * 3、数组
 * 4、对象
 *
 * 其中字面量和变量的访问速度较快
 *
*/


/************
 * 
 * 作用域
 *
 * 1、函数才具有作用域的功能
 * 2、函数内部隐藏着一个属性：作用域链[Scope]
 * 3、函数运行时产生一个执行时上下文和一个活动对象
 * 4、函数运行时的变量按照作用域链向外层层查找，直到window或找到为止
 * 5、尽量避免这种变量的深度查找，在函数内部一次查找后赋值给一个新的变量，如果这个变量会被用到两次或以上
 *
*/

// 经常使用的对象成员、数组项和域外变量存入局部变量中；访问局部变量的速度会快于那些原始变量。

var scope = function () {

	var doc = document,		// document是全局对象，必须遍历整个作用域链才能找到它

		btn = doc.getElementById("my-btn"),

		context = doc.getElementById("context"),

		btnStyle = btn.style,

		btnStyle.color = "#f00",

		btnStyle.border = "1px solid #00f";

};



