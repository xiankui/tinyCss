/*******************************S.O.L.I.D五大原则之单一职责SRP******************************/
/*-------------------五大原则
	1.The Single Responsibility Principle(单一职责)
	2.The Open/Closed Principle(开闭原则)
	3.The Liskov Substitution Principle(里氏替换原则)
	4.The Interface Segregation Principle(接口分离原则)
	5.The Dependency Inversion Principle(依赖反转原则)
*/

//--------------A class should have only one reason to change
function Product(id,description){
	this.getId = function(){	//设置属性只读
		return id;
	};
	this.getDescription = function(){
		return description;
	};
};

//--------------------array.forEach

//数组遍历
if(!Array.prototype.forEach){		//for ie
	Array.prototype.forEach = function(fn){
		if(typeof fn !== 'function'){
			throw new TypeError();
		};
		var i = 0, len = this.length;
		for(; i < len; i+=1){
			if(i in this){
				fn.call(this, this[i], i)
			};
		};
	};
};

var arr = [12,5,8,34];
arr.forEach(function(element,index){
	console.log('[' + index + '] is ' + element);
});

//------------------fn.bind
if(typeof Function.prototype.bind !== 'function'){		
	Function.prototype.bind = function(context){
		if (typeof this !== "function") {
			throw new TypeError("Function.prototype.bind should be a function that being binded");
		}
		var that = this;

		return function () {
			that.call(context)
		};
	};
};

function Product(name,price){
	this.name = name;
	this.price = price;

	if(price < 0){
		throw RangeError('Cannot create product "' + name + '" with a negative price.');
	};

	return this;
};

function Phone(name,price){
	Product.call(this,name,price); // 属性的继承
	this.category = 'phone';
}

var iphone = new Phone('Iphone',999);
console.log(iphone);