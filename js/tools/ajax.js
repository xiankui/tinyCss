/*
 * Ajax ajax should be a native object
 * 
 * Ajax.get("url?p=value", function (data) { handle(data) }, true);
 *
 * Ajax.post("url",{
 * 	data : "p=value&id=001",
 *	callback : function (data) { handle(data) },
 *	async : true
 * });
 *
 */
//define(function (require, exports, module) {
	var Ajax = (function () {

		"use strict";

		var ajax = {

			// 惰性载入函数
			createXHR : (function () {
				// 特性检测
				if (window.XMLHttpRequest) {
					
					// 不论new多少XHR，if只需判断一次
					return function () {
						return new XMLHttpRequest();
					}
				} else {

					// only for ie6 hack
					return function () {
						return new ActiveXObject("Microsoft.XMLHTTP");
					}
				}
			}()),

			get : function(url, callback, async){

				var XHR = this.createXHR();

				//默认异步请求
				if (async !== false) {
					async = true;
				}

				//async = async || true;		此代码有问题  async总是true

				if(async){

					// 异步请求
					XHR.onreadystatechange = function() {

						if(XHR.readyState == 4 && XHR.status == 200){
							callback(XHR.responseText);

							// 销毁不用的对象；因为每次ajax请求都会创建一个新的XHR
							XHR  = null;
						}
					};

					XHR.open('GET', url, true);
					XHR.send();
				}else{

					// 同步请求，返回结果前停止解析下文
					XHR.open('GET', url, false);
					XHR.send();
					callback(XHR.responseText);
					XHR = null;
				}
			},

			post : function(url, option){

				var XHR = this.createXHR(),
					data = option.data,
					callback = option.callback,
					async = option.async;

					// 默认异步请求
					if (async !== false) {
						async = true;
					}
				

				if(async){

					XHR.onreadystatechange = function(){

						if(XHR.readyState == 4 && XHR.status == 200){
							callback(XHR.responseText);
							XHR = null;
						}
					};

					XHR.open("POST", url, true);
					XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					XHR.send(data);
				}else{

					XHR.open("POST", url, false);
					XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					XHR.send(data)
					callback(XHR.responseText);
					XHR = null;
				}
			}
		};

		return ajax;
	})(); 

	//module.exports = Ajax;
//});

