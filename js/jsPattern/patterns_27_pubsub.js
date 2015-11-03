/**
 * 事件本质是和DOM无关的，因此你可以很容易地开发出一个事件驱动的库。这种模式成为发布／订阅模式
 */

/**
 * 发布/订阅系统
 */
var publisher = {
	// 订阅类型
	subscribers: {
		any: []
	},
	// 注册事件到订阅类型
	on: function (type, fn, context) {
		type = type || 'any',
		context = context || this,
		fn = typeof fn === 'function' ? fn : context[fn];

		if (typeof this.subscribers[type] === 'undefined') {
			this.subscribers[type] = [];
		}

		this.subscribers[type].push({fn: fn, context: context});
	},
	// 从订阅类型中移除一个事件（{fn: fn, context: this}）
	remove: function (type, fn, context) {
		this.visitSubscribers('unsubscribe', type, fn, context);
	},
	// 触发（发布）某一类型的事件
	fire: function (type, publication) {
		this.visitSubscribers('publish', type, publication);  // @params publication
	},
	visitSubscribers: function (action, type, arg, context) {
		var pubtype = type || 'any',
			subscribers = this.subscribers[pubtype],
			context = context || this,
			max = subscribers ? subscribers.length : 0,
			i;

		for (i=0; i<max; i+=1) {
			if (action === 'publish') {
				subscribers[i].fn.call(subscribers[i].context, arg);
			} else {
				// 如果没有指明要解除的类型中的哪个事件，则解除整个类型的订阅
				if (typeof arg === 'undefined') {
					subscribers.splice(0);
					return;
				} else if (subscribers[i].fn === arg && subscribers[i].context === context) {
					subscribers.splice(i, 1);
				}
			}
		}
	},
	// 装饰一个对象，使其具有发布订阅功能
	decorate: function (obj) {
		obj.subscribers = {any: []};
		obj.on = this.on;
		obj.remove = this.remove;
		obj.fire = this.fire;
		obj.visitSubscribers = this.visitSubscribers;
		return obj;
	}
};

publisher.on('say', function () {
	console.log('publisher listen say')
});
publisher.on('say', function () {
	console.log('publisher listen say again');
});

publisher.fire('say');
console.log(publisher.subscribers)

publisher.remove('say');
publisher.fire('say');
console.log(publisher.subscribers)

console.log('**********************************');
var me = publisher.decorate({});

me.on('say', function () {
	console.log('me say')
})
me.fire('say');




