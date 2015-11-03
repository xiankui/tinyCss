/****************************JavaScript与DOM*********************************/
//DOM(Document Object Model 文档对象模型)是一个通过和Javascript进行内容交互的API.
/*********************************
	所有全局对象都会成为window对象的属性。
	但是，用关键字var声明的变量不能被删除。
	而对象的属性是可以被删除的。
*/
var a = 5;
window.aa = 10;
console.log(window.a);			//5
console.log(aa);
delete a;
delete aa;
if(a){
	console.log('全局变量是不能被delete掉的。');
}else{
	console.log('全局变量是被delete掉。');
};

if(aa){				//aa is not defined
	console.log('aa 作为 window对象的属性没有被删除。');
}else{
	console.log('aa 作为 window对象的属性被删除了。');
};

//DOM和JavaScript语言是两个单独的东西。Node(节点)和Event(事件)是DOM API的两大部分。这两大部分基本都存在兼容问题。
/*************************
	事件可分为四大类：
		鼠标事件：click, dblclick, mouseover, mouseout
		键盘事件：keypress, keydown, keyup
		表单事件：select, change, submit, reset, focus, blur
		其他事件：load, resize, scroll, unload

	事件处理的方式又可分为两种：
		基本事件注册：
			myElement.onclick = buttonClick;			//myElement是元素节点，buttonClick是个函数。
		高级事件注册：									//改模式允许一个事件绑定多个函数，并且可以解除对某个函数的绑定。
			addEvent(myIntro, 'click', function oneClickOnly(){
				alert('you can click me only!');
				removeEvent(myIntro, 'click', oneClickOnly);
			});

	Event 对象：当事件注册后，改Event对象将自动在函数内可用。
		阻止默认行为：
			e.preventDefautl();
		阻止冒泡行为：
			e.stopPropagation();
		事件委托：					//比如，一个大表格，在每个<tr>上绑定点击事件不好，性能是个大问题。流行的做法是用事件委托。
			myTable.onclick = function(){

				e = e || window.event;

				var targetNode = e.target || e.srcElement;

				if(targetNode.nodeName.toLowerCase === 'tr'){
					console.log('you clicked a table row!');
				}
			}
*/