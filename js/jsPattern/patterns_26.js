/********************************设计模式之构造函数模式********************************/
//较好的实例


//约定构造函数的第一个字母大写
function Car(model, year, miles){

	//this 指向实例化的对象；每个对象的属性应该分配不同的内存

	//但当Car不用new实例化的时候，this会指向window对象，这样会带来一些混乱；所以强制用new实例化
	if(!(this instanceof Car)){
		return new Car(model, year, miles);
	};

	this.model = model;
	this.year = year;
	this.miles = miles;
};

//用原型公用方法可节约内存
Car.prototype.output = function(){
	return this.model + '走了' + this.miles + '公里';
};

var tom = new Car('大叔', 2009, 20000);
console.log(tom.output());

var dudu = Car('dudu', 2010, 5000);
console.log(dudu.output());



