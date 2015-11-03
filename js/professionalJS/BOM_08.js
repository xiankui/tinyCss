 /****
	BOM(Browser Object Model)

		BOM的核心对象是window；它既代表浏览器，又代表ECMAScript中的Global对象。
**/

//window this self是同一个东西的三种写法，就是BOM的核心对象。

var global;

window === this ? global = window : global = 'global';

this === self ? global = self : global = 'global';

console.log(global);		//window

var $ = function(id){
	return document.getElementById(id);
};

//（浏览器）窗口相对于屏幕左边和上边的位置：screenLeft(screenX -- firefox)	screenTop(screenY -- firefox)
var winLeftPos = (typeof window.screenLeft === 'number') ? window.screenLeft : window.screenX;
var winTopPos = (typeof window.screenTop === 'number') ? window.screenTop : window.screenY;

//浏览器可见窗口大小
var winWidth = window.innerWidth,
	winHeight = window.innerHeight;

if (typeof winWidth !== 'number'){
	//标准模式
	if (document.compatMode == 'CSS1Compat'){
		//document.documentElement表示html元素
		winWidth = document.documentElement.clientWidth;
		winHeight = document.documentElement.clientHeight;
	} else {
	//怪异模式
		//document.body表示body元素
		winWidth = document.body.clientWidth;
		winHeight = document.body.clientHeight;
	};
};

console.log(winWidth + '-------------' + winHeight);

//导航和打开窗口


//检测弹出窗口是否被屏蔽
(function(){
	var blocked = false;

	try {
		var newWin = window.open('http://www.google.com.hk/', '_blank', 
					'width=400, height= 400, resizable=yes');
		newWin.moveTo(300, 300);  // top:100, left:100,  moveTo兼容较好

		setTimeout(function(){
			newWin.close();
		}, 1000);

		if (newWin == null){
			blocked = true;
		};
	} catch (ex){
		blocked = true;
	};

	if (blocked){
		alert('the popup was blocked!');
	};
})();

//JavaScript是单线程语言；就好比一个人去完成一项任务，按照任务队列的顺序执行；事件的触发仅表示排队
(function(){

	//使用类似递归的超时调用好过间歇调用
	var num = 0, max = 5;

	var incrementNunber = function() {
		num += 1;

		if (num < max) {
			console.log(num + '--------------setTimeout');
			setTimeout(incrementNunber, 500);
		} else {
			alert('Done');
		};
	};

	//500毫秒后将incrementNunber加入到任务队列中排队执行。
	setTimeout(incrementNunber, 500);
	
})();
/*******
	//模仿setInterval()
	setTimeout(function interval(){
		// some long block of code...		==> 代码执行完后才会尝试排队；setInterval总是在固定的间隔尝试排队
		setTimeout(interval, 1000);		
	}, 1000);
**/


//window.location和document.location引用的是同一个对象

console.log('--------------the query string arguments object----------------');
//获取查询字符串参数对象
var getQueryStringArgs = function(){

	//声明所需变量
	var qs = (location.search.length > 0 ? location.search.slice(1) : ""),

		args = {},

		items = (qs.length > 0 ? qs.split("&") : []),

		item, name, value,

		i, len = items.length;

	//逐个将每一项添加到args对象中(如果items为空循环将不执行)
	for(i=0; i<len; i+=1){

		item = items[i].split("=");

		name = decodeURIComponent(item[0]);			//有可能是编码过的哦

		value = decodeURIComponent(item[1]);

		if(name.length){
			args[name] = value;
		};
	};

	return args;
};

var theQueryStringArgs = getQueryStringArgs();
console.log(theQueryStringArgs);


//location.href  window.location  location.assign("")  三者的效果完全一样。

//每次修改location的属性（hash除外），页面都会以新URL重新加载。
//每次重新加载页面的时候，js会重新解析，任务队列会重新排队。

if(location.search.length === 0){
	//location.search = '?q=javascript&id=5';    
}

//reaload()
if(false){

	//页面会以最有效的方式加载，有可能从缓存中加载
	location.reload();

	//从服务器重新加载
	location.reload(true);		
};

//history对象保存着用户上网的历史记录，从窗口被打开的那一刻算起。

//history.go(-1);		//后退一页

if (history.length === 0){

	//这里应该是用户打开窗口后的第一个页面，即浏览器的起始页（主页）
	console.log('this is the first page that i open the web browser!')
}


