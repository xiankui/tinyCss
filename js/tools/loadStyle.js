//动态添加样式
var loadStyle = function (css) {
    var style = document.createElement("style");
    style.type = "text/css";
    style.rel = "styleSheet";

    try {
        style.appendChild(document.createTextNode(css));
    } catch (ex) {
        style.styleSheet.cssText = css;
    };

    document.getElementsByTagName("head")[0].appendChild(style);
};
loadStyle("body{background-color:#eee}");


//动态添加脚本	
var loadScriptText = function(code){
	var script = document.createElement("script");
	script.type = "text/javascript";
	try {
		script.appendChild(document.createTextNode(code));
	} catch (ex) {
		script.text = code;
	};

	document.body.appendChild(script);
};

loadScriptText("alert('hello world')");