/**************************JSON字符串和对象字面量**********************/
//-------------对象字面量
var obj = {
	prop:"val"
};

//-------------JSON字符串，所有属性名称和它的值都必须用双引号引住，不能使用单引号。
var json_string = '{"prop":"val"}';

//----------------JSON字符串和对象字面量的相互转换
//json string
var my_json_string = '{"prop":"val","value":5}';
//console.log(typeof my_json_string);		//string 



//---------------但是JSON.parse  JSON.stringify都是新标准，老的浏览器(IE6 && IE7)不认识。替代方案
if(typeof JSON !== 'object'){
	var my_obj = eval('(' + my_json_string + ')');
	alert(my_obj.value);					//5

	//将对象序列化的方法
	var ie_JSONstringify = function (obj) { 
        var t = typeof (obj);
        if (t != "object" || obj === null) {
            // simple data type
            if (t == "string") obj = '"' + obj + '"';
            return String(obj);
        } else {
            // recurse array or object
            var n, v, json = [], arr = (obj && obj.constructor == Array);

            // fix.
            var self = arguments.callee;

            for (n in obj) {
                v = obj[n];
                t = typeof(v);
                if (obj.hasOwnProperty(n)) {
                    if (t == "string") v = '"' + v + '"'; else if (t == "object" && v !== null)
                        // v = jQuery.stringify(v);
                        v = self(v);
                    json.push((arr ? "" : '"' + n + '":') + String(v));
                }
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    };
    
    var my_other_json_string = ie_JSONstringify(obj);
    alert(my_other_json_string);
}else{
	//将字符串反序列化成对象
	var my_obj = JSON.parse(my_json_string);
	console.log(typeof my_obj);				//object
	console.log(typeof my_obj.value);		//number

	//将对象序列化成JSON字符串
	var my_other_json_string = JSON.stringify(my_obj);
	console.log(my_other_json_string);		//{"prop":"val","value":5}
};

