/***********
 *
 *  zakas -- javascript 高级程序设计（第三版） Page207
 *
*/

var getQueryStringArgs = function () {
	
	"use strict";

	var qs = location.search.length > 0 ? location.search.slice(1) : "",
		  args = {},    // 保存数据的对象
	      items = qs.length ? qs.split("&") : [],    // 数据项name=value
		  item, name, value,
		  i, 
		  len = items.length;

	// 逐个将每一项添加到args对象中
	for (i=0; i<len; i++) {
		
		item = items[i].split("=");
		name = decodeURIComponent(item[0]);
		value = decodeURIComponent(item[1]);

		if (name.length) {
			args[name] = value;
		}
	}

	return args;

};