/*
 *
 * $  query elements
 *
 * if nessary, use Sizzle.js instead
 *
 */
var $ = function (selector, context) {

	"use strict";

	context = context || document;

	if (typeof selector === "string") {

		if (selector.indexOf("#") > -1) {

			// 传入的是id
			selector = selector.replace("#", "");

			return context.getElementById(selector);
		} else if (selector.indexOf(".") > -1) {

			// 传入的是className
			selector = selector.replace(".", "");

			if (!document.getElementsByClassName) {
				
				// for ie lt 9 hack
				var i = context.all.length,
					nodelist = [],
					pattern = new RegExp("(^|\\s)" + selector + "(\\s|$)");

				selector = selector.replace(/\-/g, "\\-");
		
				while (--i >= 0) {

					if (pattern.test(context.all[i].className) ) {
						nodelist.unshift(context.all[i]);
					}
				}

				return nodelist;
			} 

			return context.getElementsByClassName(selector);

		} else {

			// tag
			return context.getElementsByTagName(selector);
		}
	} else {

		// 否则，认为是节点原样返回
		return selector;
	}
};
