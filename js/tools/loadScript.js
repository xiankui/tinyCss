/*
 * 异步、跨域、JSONP
 * 
 * var url = 'http://fundex.eastmoney.com/FundWebServices/FundAd.aspx?t=5&h=luckyData&rnd=' + Math.random();
 *
 * loadScript("url", function () { alert(luckyData["666"]); // handle the response data });
 *
 */
var loadScript = function(url, callback){

	"use strict";

	var _script = document.createElement('script');

	_script.src = url;

	document.getElementsByTagName('head')[0].appendChild(_script);
	
	//当脚本加载完成后(脚本已读入内存)移除文件并执行回调函数
	if (_script.readyState) {

		// the ie style
		_script.onreadystatechange = function(){
			if(this.readyState === 'loaded' || this.readyState === 'complete'){
				//移除加载过后的引用及事件绑定
				_script.onreadystatechange = null, _script.parentNode.removeChild(_script);
				callback && callback();
			}
		};
	} else {

		// the firefox ect style
		_script.onload = function(){
			_script.onload = null, _script.parentNode.removeChild(_script);
			callback && callback();
		};
	}
};



