/******************************设计模式之单例模式***************************/
//单例就是保证一个类只有一个实例，实现的方法一般是先判断实例存在与否，如果存在直接返回，如果不存在就创建了再返回，这就确保了一个类只有一个实例对象。
//最佳实践
var SingletonTester = (function(){

	//单例模型
	function Singleton(args){

		args = args || {};

		this.name = 'SingletonTester';

		this.pointX = args.pointX || 6;

		this.pointY = args.pointY || 10;
	};

	//实例容器
	var instance;

	//外部接口
	var exports = {
		getInstance : function(args){
			if(instance === undefined){
				instance = new Singleton(args);
			};
			return instance;				//模型只能实例化一次
		}
	};

	//返回外部访问接口
	return exports;
})();

var singleTest = SingletonTester.getInstance({pointX : 5});
console.log(singleTest.name);
console.log(singleTest.pointX);										//5

var singleTest2 = SingletonTester.getInstance({pointX : 50});			
console.log(singleTest2.name);
console.log(singleTest2.pointX);									//5  只能有一个实例 