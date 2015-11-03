/********************************************设计模式之代理模式****************************/
/*----------------
	示例解释：
		假如dudu要送酸奶小妹玫瑰花，却不知道她的联系方式或者不好意思
		想委托大叔去送这些玫瑰，那大叔就是个代理
*/

//先声明美女对象
var Girl = function(name){
	this.name = name;
};

//这是dudu
var Dudu = function(girl){

	this.girl = girl;

	this.sendGift = function(gift){
		console.log("Hi " + girl.name + ",dudu送你一个礼物：" + gift);
	};
};

//大叔是代理
var Proxy = function(girl){

	this.girl = girl;

	this.sendGift = function(gift){
		(new Dudu(girl)).sendGift(gift); //提dudu送花咯
	};
};

//调用
var proxyTom = new Proxy(new Girl('酸奶小妹'));
proxyTom.sendGift('999朵玫瑰');

