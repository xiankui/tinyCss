/************************************设计模式之装饰者模式********************************/
/*-------------------------
	装饰者模式是为已有功能动态地添加更多功能的一种方式，
	把每个要装饰的功能放在单独的函数里，然后用该函数包装所要装饰的已有函数对象，
	因此，当需要执行特殊行为的时候，调用代码就可以根据需要有选择地、按顺序地使用装饰功能来包装对象。
	优点是把类（函数）的核心职责和装饰功能区分开了。
*/

//---------简单示例
//需要装饰的类（函数）
function Macbook(){

	this.cost = function(){
		return 1000;
	};
};

//装饰者
function MemoryMac(macbook){

	this.cost = function(){
		return macbook.cost() + 100;
	};
};

function InsuranceMac(macbook){

	this.cost = function(){
		return macbook.cost() + 300;
	};
};

var myMac = new InsuranceMac(new MemoryMac(new Macbook()));
console.log(myMac.cost());				//1000 + 100 + 300  =  1400



/**************************************************/
function Macbook(price) {
	this.price = price || 1000;
}
Macbook.prototype.getPrice = function () {
	return this.price;
};
Macbook.prototype.decorate = function (decorator) {
	if (typeof Macbook.decorators[decorator] !== 'function') {
		throw 'no such decorator';
	}
	Macbook.decorators[decorator].call(this);
	return this;
}

Macbook.decorators = {
	memory: function () {
		return this.price += 100;
	},
	insurance: function () {
		return this.price += 100;
	}
};

var myMac = new Macbook();
myMac.decorate('memory').decorate('insurance');
console.log(myMac.getPrice());


//一个更彻底的例子------------装饰圣诞树

var tree = {};

tree.decorate = function(){
	return 'Make sure the tree won\'t fall';
};

//返回装饰过后的圣诞树
tree.getDecorator = function(deco){

	//每一个装饰特性都具有元对象的全部特性
	tree[deco].prototype = this; 

	//返回装饰后的对象；那么装饰的效果是累加的。
	return new tree[deco];
};

//装饰红球
tree.RedBalls = function(){

	//新的装饰
	this.decorate = function(){

		//之前的装饰效果
		var newdeco = this.RedBalls.prototype.decorate();

		//新的装饰
		newdeco += '\n put on some red balls!';

		return newdeco;

	};
};

//装饰蓝秋
tree.BlueBalls = function(){

	

	this.decorate = function(){

		var newdeco = this.BlueBalls.prototype.decorate();

		newdeco += '\n put on some blue balls!';

		return newdeco;
	};
};

//装饰天使
tree.Angel = function(){

	

	this.decorate = function(){

		var newdeco = this.Angel.prototype.decorate();

		newdeco += '\n An angel on the top!';

		return newdeco;
	};
};


//每一次返回的都是装饰过后的新圣诞树

tree = tree.getDecorator('RedBalls');				//Make sure the tree won't fall

tree = tree.getDecorator('BlueBalls');				//put on some red balls!
	
tree = tree.getDecorator('Angel');					//put on some blue balls!

var deco = tree.decorate();							//An angel on the top!

console.log(deco);





