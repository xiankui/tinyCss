/*********************全面解析Module模式***********************/
/*-------
	1、模块化，可重用。
	2、封装了变量和function
	3、只暴露可用public方法，其他私有方法隐藏
*/
//--------------------匿名闭包
var global = 'i am global!';
//可用方式
(function(){
	var fn = function(a,b){
		return a*b;
	};
	console.log(fn(2,3));
})();

//推荐的方式
(function(){
	//...所有的变量和function都在这里声明，并且作用域也只在这个匿名闭包里
	//...这里的代码依然可以访问外部全局对象
	var fn = function(a,b){
		return a + b;
	};
	console.log(fn(2,3));
	console.log(global);
}());

//---------------------引入全局变量
var jQuery = function(id){
	return document.getElementById(id);
};
(function($){
	console.log($('accordion'));		//accordion节点
	//这里就可以使用全局的jQuery对象了,$就代表jQuery对象
}(jQuery));

var caculate = function(a,b){
	return a + b;
};
(function(add){
	console.log(add(3,7));		//10
}(caculate));

//----------------------生成全局变量
var blogModule = (function(){
	var my = {},
		privateName = '博客园';
	var privateAddTopic = function(data){
		//这里是内部代码
	};

	my.Name = privateName;
	my.AddTopic = function(data){
		privateAddTopic(data);
	};

	return my;		//返回外部接口，赋予全局变量blogModule
}());
console.log(blogModule.Name);	//博客园

//----------进一步扩充方法
var blogModule = (function(my){
	console.log(my);			//Object { Name="博客园", AddTopic=function()}
	var str = 'this is my photo';
	my.AddPhoto = function(){
		return str;
	};

	return my;
}(blogModule || {}));
console.log(blogModule);		//Object { Name="博客园", AddTopic=function(), AddPhoto=function()}
