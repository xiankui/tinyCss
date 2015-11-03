/********************		form		******************/



//表单的验证：只有在包含提交按钮的情况下，才有可能触发表单的submit事件
/*
document.getElementById('form').onsubmit = function(e){
	e = e ? e : window.event;
	var target = e.target || e.srcElement;

	//your some regular code goes here
	alert(this.elements['name'].value); 
	alert(e);
	alert(target.innerHTML);


	//网络慢时，避免重复提交，导致多次结算或死机
	this.elements['submit'].disabled = true;
	//清理内存
	this.onsubmit = null;
};
*/

document.getElementById('form').elements['name'].onfocus = function(e){
	//聚焦时文本全选
	this.select();

	//这样的话，onfocus事件就一次有效
	this.onfocus = null;
};

document.getElementById('form').elements['textbox'].onfocus = function(e){
	//聚焦时文本全选
	this.select();
};


//默认聚焦
if(document.getElementById('form').elements['name'].autofocus !== true){
	document.getElementById('form').elements['name'].focus();
};

//焦点的自动切换（适用于input  type=text而且要注意是否有隐藏字段）
var tabForward = function(e){
	e = e ? e : window.event;
	var target = e.target || e.srcElement;

	if (target.value.length == target.maxLength){
		var form = target.form;

		for (var i=0,len=form.elements.length; i<len; i+=1){
			if (form.elements[i] == target){
				if (form.elements[i + 1]){
					form.elements[i + 1].focus();
				};
				return;
			};
		};
	};
};

document.getElementById('form').elements['phone'][0].onkeyup = function(e){
	tabForward(e);
};
document.getElementById('form').elements['phone'][1].onkeyup = function(e){
	tabForward(e);
};
document.getElementById('form').elements['phone'][2].onkeyup = function(e){
	tabForward(e);
};

//富文本编辑
window.onload = function(){
	frames['richedit'].document.designMode = 'on';
};


document.getElementById('form').onsubmit = function(e){
	e = e ? e : window.event;
	var target = e.target || e.srcElement;

	//your some regular code goes here
	//alert(this.elements['name'].value); 
	//alert(e);
	//alert(target.innerHTML);

	//通过隐藏域手动提交
	target.elements['richeditContent'].value = frames['richedit'].document.body.innerHTML;

	//网络慢时，避免重复提交，导致多次结算或死机
	//this.elements['submit'].disabled = true;
	//清理内存
	this.onsubmit = null;
};