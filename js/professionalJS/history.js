/*
	Professional JavaScript for Web Developers 3rd Edition

	JavaScript高级程序设计

	Author:Nicholas C.Zakas

	Begining:2014-01-15

	Student:vica
*/

/**********************************简介*************************/
/*
	完整的JavaScript由三部分组成：

		核心：ECMAScript

			语法、类型、语句、关键字、保留字、操作符、对象  ==》只关注语言本身，不关注用在哪里。

		文档对象模型：DOM(Document Object Model)

			是用于HTML的应用程序编程接口(API, Application Programing Interface)

		浏览器对象模型：BOM
*/

var loadScript = function(url, callback) {
    var _script = document.createElement('script');

    _script.setAttribute('src', url);
    
    document.getElementsByTagName('head')[0].appendChild(_script);

    if (_script.addEventListener) {
        _script.onload = function() {
			_script.onload = null;
            _script.parentNode.removeChild(_script);
            callback && callback();
        }
    } else if (_script.readyState) {
      _script.onreadystatechange = function() {
            if (_script.readyState == 'loaded' || _script.readyState == 'complete') {
                _script.onreadystatechange = null;
                _script.parentNode.removeChild(_script);
                callback && callback();
            }
        }
    } else {
        _script.parentNode.removeChild(_script);
        callback && callback();
    }
};


var url = 'http://fundex.eastmoney.com/FundWebServices/FundAdtest.aspx?t=3&v=3&os=ios&h=share';


var url = 'http://fundex.eastmoney.com/FundWebServices/FundAdtest.aspx?t=3&v=3&os=ios&h=share&id=';
(function fac(i){
	loadScript(url + i, function(){
		console.log(i + '-------------' + share.information);
		i++;

		//递归5次
		if(i<5){
			fac(i);
		};
	});
})(0);
