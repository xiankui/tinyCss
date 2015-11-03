/*************************************设计模式之外观模式******************************/
/*--------------------------
	外观模式为子系统提供一致的界面
	常用于JS类库的的封装以兼容浏览器
*/

//一段简单的示例代码
var addEvent = function(el, ev, fn){

	if(el.addEventListener){

		el.addEventListener(ev, fn, false);
	}else if(el.attachEvent){

		el.attachEvent('on' + ev, function(){

			fn.call(el);		//为了正确绑定this对象
		});
	}else{

		el['on' + ev] = fn;
	};
};


var stopDefault = function( e ) {
	if ( e && e.preventDefault )
		e.preventDefault();
	else
		window.event.returnValue = false;
	return false;
}
//测试一下
var node = document.createElement('a'); 
node.appendChild(document.createTextNode('www.google.com.hk'));
node.href = 'http://www.google.com.hk/';
document.body.appendChild(node);

addEvent(node, 'click', function(e){

	alert(this.innerHTML);

	alert(e);

	stopDefault(e);
});