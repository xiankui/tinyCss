/************************ DOM & JavaScript *************************/

/*******************
 * 
 * Chrome中，DOM的渲染引擎是WebCore, javascript的渲染引擎是V8
 *
 * FireFox中，DOM的渲染引擎是Gecko， javascript的渲染引擎是Spider-Monkey
 *
 * 形象的说，DOM 和 javascript是两座独立的岛屿，两者之间以一座收费桥连接
 *
 * 所以对DOM的操作是很耗费性能的；访问一个DOM元素的代价就是交一次过桥费；修改元素的费用更贵，因为浏览器要从新计算页面的几何变化。
 *
*/


/********************
 * 
 * HTMLCollection 昂贵的集合
 *
 * getElementById, getElementsByTagName将返回这样的集合
 *
 * 它是个类数组，具有length属性；但是，它是活的数组，每次出现length属性的时候都会去DOM重新查询一次
 *
 * 所以，用普通数组代替它
 *
 * 但是，新的API--querySlectorAll()--返回的是类数组对象NodeList；但不是HTML集合
 *
 *  querySelector()返回一的节点
 *
*/

var loopHTMLCollection = function () {

	var coll = document.getElementsByTagName("div"),

	    len = coll.length,  // 太有必要了！！！！

	    i;

	for (i=0; i<len; i+=1) {

		// 如果 i < coll.length，那将会重复len次查询DOM
	}

};


/************
 * 
 * 当浏览器下载完所有页面HTML标记，javascript, css, 图片之后，它解析文件并创建两个内部数据结构：
 *
 * 1、一颗DOM树，表示页面结构
 * 2、一颗渲染树，表示节点如何显示
 *
*/

/**************************
 * 
 * 1、最小化DOM访问，在javascript端做尽可能多的事情。
 * 2、反复访问的地方使用局部变量存放DOM引用。
 * 3、小心的处理HTMLCollection,因为他们表现出存在性，总是对底层文档重新查询。
 *	  将集合的length属性缓存到一个变量中；如果经常操作这个集合，将集合拷贝到数组中。
 * 4、动画中使用确对定位
 * 5、使用事件委托
 *
*/