//仿jQuery的$对象，所有方法只能应用与$对象上。
var $ = function(selector,context){
	return new $.fn.init(selector,context);
};

$.fn = $.prototype;

$.fn.init = function(selector,context){
	var nodelist = [];
	context = context || document;

	if(typeof selector == 'string'){
		if(selector.indexOf('#') > -1){
			//按id取
			selector = selector.replace('#','');
			if(context.getElementById(selector)){
				nodelist[0] = context.getElementById(selector) ;
			};
		}else if(selector.indexOf('.') > -1){
			//按class取
			selector = selector.replace('.',''); 
			if(document.getElementsByClassName){
				nodelist = context.getElementsByClassName(selector);
			}else{
				var i = context.all.length;
				selector = selector.replace(/\-/g, "\\-");
				var pattern = new RegExp("(^|\\s)"+selector+"(\\s|$)");
				while(--i >= 0){
					if (pattern.test(node.all[i].className) ) {
						nodelist.unshift(node.all[i]);
					};
				};
			};
		}else{
			//按tag取
			nodelist = context.getElementsByTagName(selector);
		}
	}else{
		//传入节点
		nodelist[0] = selector;
	};
	//把nodelist封装成$对象的属性
	this.length = nodelist.length;
	for(var i=0;i<nodelist.length;i++){
		this[i] = nodelist[i];
	};
	return this;
};

$.extend =  function(obj,origin){
	origin = origin || this;
	for(var property in obj){
		origin.prototype[property] = obj[property];
	};
	return origin;
};

$.extend({
	each:function(fn){
		for(var i=0;i<this.length;i++){
			fn.call(this[i],i,this[i]);
		};
		return this;
	},
	hide:function(){
		this.each(function(){
			this.style.display = 'none';
		});
	},
	show:function(){
		this.each(function(){
			this.style.display = 'block';
		});
	},
	prev:function(){
		var node = this[0];
		for(var i=0;i<this.length;i++){
			delete this[i];
		};
		if(node.previousSibling.nodeType == 1){
			this[0] = node.previousSibling;
		}else{
			this[0] = node.previousElementSibling;
		};
		if(this[0]){
			this.length = 1;
		}else{
			this.length = 0;	
		};
		return this;
	},
	next:function(){
		var node = this[0];
		for(var i=0;i<this.length;i++){
			delete this[i];
		};
		if(node.nextSibling.nodeType == 1){
			this[0] = node.nextSibling;  //for ie
		}else{
			this[0] = node.nextElementSibling;  //for firefox & chrome
		};
		if(this[0]){
			this.length = 1;
		}else{
			this.length = 0;	
		};
		return this;
	},
	sibling:function(){
		var node = this[0];
		for(var i=0;i<this.length;i++){
			delete this[i];
		};
		var arr = [];
		p = node.previousSibling;
		while(p){
			if(p.nodeType === 1){
				arr.unshift(p);
			};
			p = p.previousSibling;
		};
		var n = node.nextSibling;
		while(n){
			if(n.nodeType === 1){
				arr.push(n);
			};
			n = n.nextSibling;
		};
		var length = this.length = arr.length;
		for(var i=0;i<length;i++){
			this[i] = arr[i];
		};
		return this;
	},
	setOpacity:function(val){
		if(this.length == 0){return this};
		this.each(function(){
			this.filters ? this.style.filter='alpha(opacity=' + val + ')' : this.style.opacity = val/100;
		});
	},
	fadeIn:function(speed,opacity){
		if(this.length == 0){return this};
		speed = speed || 20;
		opacity = opacity || 100;
		this.each(function(){
			var that = this;
			//显示元素，并将元素透明度设为0
			this.style.display = 'block';
			$(this).setOpacity(0);
			var val = 0;
			(function(){
				$(that).setOpacity(val);
				val += 5;
				if(val <= opacity){
					setTimeout(arguments.callee,speed);
				};	
			})();
			
		});
	},
	fadeOut:function(speed,opacity){
		if(this.length == 0){return this};
		speed = speed || 20;
		opacity = opacity ||  0;
		this.each(function(){
			var that = this;
			var val = 100;
			(function(){
				$(that).setOpacity(val);
				val -= 5;
				if(val >= opacity){
					//arguments.callee  递归调用子执行函数
					setTimeout(arguments.callee,speed);
				}else if(val < 0){
					that.style.display = 'none';
				};
			})();
		});
	}
});

//把$.fn.init对象变成同时也是$对象；为了完美。$.fn.init.prototype = $.prototye
$.fn.init.prototype = $.fn;

//$("#id")是$对象；$("#id")[0]是HTMLElement元素，即DOM节点
//$("#id")[0].onclick = function(){
//	$("div").hide();
//}; 

$("#id")[0].onclick = function(){
	$("#main").fadeOut();
};
