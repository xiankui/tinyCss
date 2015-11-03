/********************************引用类型***************************/

//对象类型
var myObj = {};

//数组类型：其数据结构也是对象类型；数组的下标转化成属性标示符；没有关联数组的概念；有一些类数组的方法
var myArr = [];
myArr[0] = 'first';
myArr.push('second');

var anotherArr = ['third', 4, 5, function(){}, {obj:"an object"}, ['arr in arr']];

console.log(myArr);
console.log(anotherArr);

var concatedArr = myArr.concat(anotherArr);
console.log(myArr);
console.log(concatedArr);

var joinedArrToStr = concatedArr.join('-');
console.log(joinedArrToStr);

concatedArr.splice(5,2);
console.log(concatedArr);

concatedArr = concatedArr.slice(0,3);
console.log(concatedArr);

concatedArr.forEach(function(item, index, array){
	console.log(item + " : " + index);
});

//Date

console.log('-----------------本地化的时间-------------');
var today = new Date();

console.log(today);
console.log(today.getTime());				//毫秒数
console.log(today.toLocaleString());
console.log(today.getFullYear());
console.log(today.getMonth());				//月份计数从0开始

console.log('--------------------国际化标准时间---------------');
var gmt_date = Date.UTC(2014, 0, 17, 4);		//伦敦时间：2014-1-17 4:00:00  ==  北京时间：2014-1-17 12:00:00
var theDay = new Date(gmt_date);

console.log(gmt_date);
console.log(theDay.getTime());
console.log(theDay.toLocaleString());

//RegExp

console.log('---------------------RegExp-----------------------');
var pattern = /([cb])at/ig;			//()是捕获性分组符；对exec有用

console.log(pattern.global);
console.log(pattern.ignoreCase);
console.log(pattern.lastIndex);

var aPatternStr = 'a cat is not a bat but ccat ';
var p_result;

console.log('--------------------test---------------------');
console.log(pattern.test(aPatternStr));
console.log(pattern.lastIndex);


console.log('-----------------exec---------------------');
 pattern.lastIndex = 0;			//test()方法影响了lastIndex
while(((p_result = pattern.exec(aPatternStr)) !== null)){
	console.log(p_result);
	console.log(pattern.lastIndex);
};

console.log('---------------match--------------------');
console.log(aPatternStr.match(pattern));


//函数：函数是对象，可以有属性和方法，保存在堆中；函数名是指针，保存在栈中
console.log('-----------------Function类：函数名是指针--------------------');

//推荐的函数表达式；sum就是指向函数的指针
var sum = function(a, b){
	return a + b;
};

var anotherSum = sum;		//指针的复制

console.log(anotherSum(3, 5));
console.log(sum.length);			//2  居然是参数个数


//三种基本包装类型：Boolean	 Number	String
console.log('------------三种基本包装类型：Boolean	Number	String------------');

var myStr = 'this is a string';		//确定的说，这是值类型，保存在栈中。

var myStr2 = myStr.slice(5, 7);		//is  道格拉斯推荐的万能方法
console.log(myStr2);		//既然是值类型哪里来的方法呢？？

//你可以想象程序执行了这些代码

/*
//代码执行的瞬间
var myStr2 = myStr.slice(5);

//相当于程序执行了这些代码并立即销毁
var myStr = new String('this is a string');
var myStr2 = myStr.slice(5);
myStr = null;
*/



var aNum = 10.047;

//特别好用的toFixed
console.log(aNum.toFixed(2));
console.log(typeof aNum.toFixed(2));

/*
	看不见的Global对象：ECMAScript语言的终极兜底对象

		所有在全局作用域中定义的变量和函数，都是Global对象的属性；

		但它是不可访问的；只在底层解析时用到。

	看的见的Window对象：

		Web浏览器的终极对象，它容纳了ECMAScript语言的Global对象。 
*/