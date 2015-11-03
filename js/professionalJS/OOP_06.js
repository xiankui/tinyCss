/*
	原型链的继承方式：

		继承：一个函数的原型指向令一个函数的实例。

		所有函数的默认原型都是Object的实例。
*/

//	SuperType.prototype = new Object();  

var SuperType = function(){
	this.super_property = 'super value';
	this.colors = ['red', 'bule', 'green'];
};

SuperType.prototype.getSuperValue = function(){
	return this.super_property;
}

var SubType = function(){
	this.sub_property = 'sub value';
};

//原型继承
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function(){
	return this.sub_property;
};

//sub实例同时具有两个构造函数的属性和方法
var sub = new SubType();


console.log(sub.getSubValue());				//sub value
console.log(sub.getSuperValue());			//super value


sub.colors.push('purple')
console.log(sub.colors);

var sub2 = new SubType();
console.log(sub2.colors);

console.log(sub instanceof SubType);		//true
console.log(sub instanceof SuperType);		//true
console.log(sub instanceof Object);			//true