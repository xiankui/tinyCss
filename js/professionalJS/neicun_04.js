/****************************变量、作用域和内存问题*************************/


//函数的参数可以认为是局部变量；
console.log('---------------基本类型按值传递；-------------------')
var a = 10;
var addTen = function(num){
	return num += 10;
};

var a_add = addTen(a);

console.log(a);				//10
console.log(a_add);			//20

console.log('-----------------数组、对象按引用传递的；但函数作用域的规则高于按引用传递---------------------');

var person = {
	name : 'Lily'
};

var addMess = function(obj){

	//函数的参数就相当于内部变量的声明；下面的声明是默认的；不写也是这个效果；
	var obj = obj;
	console.log(obj);
	
	//对象的引用传递
	var new_obj = obj;

	//两个变量指向同一个对象；两者是相等的。
	new_obj.name = "not Lily any more";
	new_obj.sex = "girl";
	
	return new_obj;
};

var anthoer_person = addMess(person);

console.log(person);				//not Lily any more

console.log(person === anthoer_person);	//true

//-----------函数的参数
console.log('-----------------函数的参数--------------------------');

var fn_args = function(a, b, callback){

	//函数参数会自动解析成函数内的变量声明;如果有对应的实参传入则发生赋值操作！！！
	// var a, b, callback, arguments=[];

	console.log(a);						//100
	console.log(b);						//an empty string
	console.log(callback);				//function()
	console.log(arguments[0]);			//100
};
fn_args(100, "--", addTen);

console.log(fn_args.prototype);			//Object{} 

//每个作用域（即函数）都有自己的执行环境；每个执行环境都有一个与之相关联的变量对象；它们在语言解析的时候供后台使用；
//作用域就是按照这个环境圈由内向外依次搜寻，找到即止；
//我们能访问到的唯一执行环境就是最顶层的那个：Window
//所以一个空函数都有至少四个赠送的东西：环境变量对象、arguments数组、形式参数变成内部的变量声明以及不确定的this
