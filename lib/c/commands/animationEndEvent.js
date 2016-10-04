(function() {
	var pfx = ["webkit", "moz", "MS", "o", ""];
	var addEvent = function(element, type, callback, opts) {
	    for (var p = 0; p < pfx.length; p++) {
	        if (!pfx[p]) type = type.toLowerCase();
	        element.on(pfx[p]+type, callback, opts);
	    }
	}
	var removeEvent = function(element, type, callback, opts) {
		for (var p = 0; p < pfx.length; p++) {
	        if (!pfx[p]) type = type.toLowerCase();
	        element.off(pfx[p]+type, callback, opts);
	    }
	}
	this.afterLevel = 9998;
	this.after = function(data, dom, controller) {

		var transitionEndEvent = dom.attr("latte-animationEndEvent");
		if(transitionEndEvent) {
			var Event = function(e) {
				
				if(controller.closed) {
					//controller.unbind("view", "webkitAnimationEnd", Event, false);
					return controller.unbind("view", "animationend", Event, false);
				}
				var events = transitionEndEvent.split(" ");
				events.forEach(function(eventName) {
					var click = data.get(eventName);
					click && click.call(data, e);
				});
				
			}
			controller.bind("view", "animationend", Event, false);

		}
	}
}).call(module.exports);