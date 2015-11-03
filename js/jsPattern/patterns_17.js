/********************************面向对象编程概论****************************/
function A(){

	var _a;		//private a

	this.getA = function _getA(){
		return _a;
	};

	this.setA = function _setA(a){
		_a = a;
	};
};

var a = new A();


a.setA(10);

console.log(a._a);					//undefined
console.log(a.getA());				//10

//------------------Mixins extend
Object.extend = function(destination,source){
	for(property in source){

		if(source.hasOwnProperty(property)){
			destination[property] = source[property];
		};
	};

	return destination;
};

var X = {a:10, b:20};
var Y = {c:30, d:40};

Object.extend(X,Y);
console.log(X);			//{a:10, b:20, c:30, d:40}



//-------------------delegate
var _delegate = {
	foo:function(){
		console.log('_delegate.foo');
	}
};

var agregate = {
	delegate : _delegate,
	foo : function(){
		return this.delegate.foo.call(this);
	}
};

agregate.foo();			//_delegate.foo

agregate.delegate = {
	foo : function(){
		console.log('foo from new delegate');
	}
};

agregate.foo();			//foo from new delegate
