/*******************************设计模式之工厂模式***********************/
/*------------------------
	工厂模式的使用场景：

		1.对象的构建十分复杂

		2. 需要依赖具体环境创建不同实例

		3.处理大量具有相同属性的小对象

		4.不要滥用而带来麻烦
*/

//处理不同的DOM可以应用工厂模式

var page = page || {};

page.dom = page.dom || {};

//子函数1：处理文本
page.dom.Text = function(){
	this.txt;

	this.insert = function(where){

		var txt = document.createTextNode(this.txt);

		where.appendChild(txt);
	};
};

//子函数2：处理链接
page.dom.Link = function(){

	this.url;

	this.insert = function(where){

		var link = document.createElement('a');

		link.href = this.url;

		link.appendChild(document.createTextNode(this.url));

		where.appendChild(link);
	};
};

//子函数3：处理图片
page.dom.Image = function(){

	this.url;

	this.insert = function(where){

		var img = document.createElement('img');

		img.src = this.url;

		where.appendChild(img);
	};
};

//加工工厂
page.dom.factory = function(type){

	return new page.dom[type];
};


//使用如下：
var txt = page.dom.factory('Text');
txt.txt = '我是通过DOM工厂生产出来的。';
txt.insert(document.body);

var link = page.dom.factory('Link');
link.url = 'www.google.com.hk';
link.insert(document.body);

var img = page.dom.factory('Image');
img.url = 'http://fundact.eastmoney.com/ttfundactive/stmgtp/images/horse2.jpg';
img.insert(document.body);



// factory pattern form javascript patterns 
function CarMaker() {};
CarMaker.prototype.drive = function () {
	return 'Vroom, I have ' + this.doors + ' doors';
};

CarMaker.factory = function (type) {
	var constr = type,
		newCar;

	if (typeof CarMaker[constr] !== 'function') {
		throw {
			name: 'Error',
			message: constr + ' doesn\'t exist';
		};
	}

	if (typeof CarMaker[constr].drive !== 'function') {
		CarMaker.prototype = new CarMaker();
	}

	newCar = new CarMaker[constr]();

	return newCar;
};

CarMaker.Compact = function () {
	this.doors = 4;
};

CarMaker.SUV = function () {
	this.doors = 8;
};




