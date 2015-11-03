
/*************************强大的原型和原型链******************************/
//--------------常用模式
(function(){
	var tax = 10;
	//属性
	var Calculator = function(tax){
		this.tax = tax;
	};
	//原型方法
	Calculator.prototype = {
		constructor: Calculator,
		add:function(a,b){
			return a + b;
		},
		subtract:function(a,b){
			return a - b;
		}
	};

	var calculator = new Calculator();
	console.log(calculator.add(3,5));		//8

	//改进原型方法
	Calculator.prototype.add = function(a,b){
		return a + b + this.tax;
	};
	var calculator2 = new Calculator(tax);
	console.log(calculator2.add(3,5));		//18
}());

//----------------分步声明方式
(function(){
	//定义基础计算器
	var BaseCalculator = function(){
		this.decimalDigits = 2;
	};
	BaseCalculator.prototype = {
		add:function(a,b){
			return a + b;
		},
		subtract:function(a,b){
			return a - b;
		}
	};

	//建立在基础计算器上的高级计算器
	var Calculator = function(){
		this.tax = 10;		//要收税的
	};
	Calculator.prototype = new BaseCalculator();		//把基础功能都作为原型
	Calculator.prototype.add = function(a,b){
		return a + b + this.tax;
	};

	//使用
	var base_calc = new BaseCalculator();
	var calc = new Calculator();
	console.log(base_calc.add(10,10));		//20
	console.log(calc.add(10,10));			//30
})();

//---------------------hasOwnProperty
(function(){
	Object.prototype.bar = 1;
	var foo = {
		goo : 2
	};

	for(var i in foo){
		console.log(foo[i],i);  //2 1
	};

	for(var i in foo){
		if(foo.hasOwnProperty(i)){		//推荐使用hasOwnProperty，以减少不必要的麻烦和资源浪费
			console.log(foo[i],i);		//2
		};
	};
}());