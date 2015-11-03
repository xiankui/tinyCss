/************************* Variable Object 变量对象 **********************/
/*--------------
	变量对象（缩写为VO）是一个与执行上下文相关的特殊对象，它存储这上下文中声明的一下内容：
		变量(var)
		函数声明(FunctionDeclaration)
		函数的形参(function arguments)

	注：不用var声明的，不是变量，是Window对象的一个属性。可以用delete销毁。
*/

//-------------我们可以用一个普通的ECMAScript对象来表示一个变量对象：
VO = {};		//VO就是执行上下文的属性。

var a = 10;

function test(x){
	var b = 20;
};

test(30);

//----------那么。。。
//全局上下文的变量对象
VO(globalContext) = {
	a : 10,
	test : <reference to function>
};

//test函数上下文的变量对象
VO(test functionContext) = {
	x : 30,
	b : 20
};

//----------------全局上下文中的变量对象
/*---------
	全局对象(Global object)是在进入任何执行上下文之前就已经创建了的对象；
	这个对象只存在一份，它的属性在程序中任何地方都可以访问，全局对象的生命周期终止于程序退出那一刻。

	在DOM中，全局对象的window属性引用了全局对象自身。
	形式表达如下：
*/
global = {
	Math : <...>,
	String : <...>,
	...
	...
	window : global  //引用自身
};

VO(globalContext) === global 		//全局上下文中的变量对象，就是全局对象自己。

VO(functionContext) === AO			//函数上下文中的变量对象，就是活动对象。

/*--------------------------
	处理上下文代码的2个阶段：

		1.	进入执行上下文

			函数的形参

			函数声明

			变量声明

		2.	执行代码
*/


//-------------任何时候，变量只能通过使用var关键字才能声明。
