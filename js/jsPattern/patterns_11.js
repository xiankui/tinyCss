/******************** 执行上下文 Execution Contexts **************************/
//可以理解为代码的执行顺序，用栈来表示。。。

var ECStack = [];

//-------------程序启动阶段，ECStack是这样的
ECStack = [
	globlalContext		//首先入栈的是全局对象；
						//例如加载外部的js文件或者本地<script></script>标签内的代码。
						//全局代码不包括任何function体内的代码。
];

//函数代码
(function foo(bar){
	if(bar){
		return;
	};
	foo(true);
})();

//-------------ECStack以如下方式被改变

//第一次foo的激活调用
ECStack = [
	<foo> functionContext
	globlalContext
];

//foo的递归激活调用
ECStack = [
	<foo> functionContext -- recursively
	<foo> functionContext
	globlalContext
];