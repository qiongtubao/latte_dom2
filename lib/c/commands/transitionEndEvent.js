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
		var transitionEndEvent = dom.attr("latte-transitionEndEvent");
		if(transitionEndEvent) {
			var Event = function(e) {
				if(controller.closed) {
					return controller.unbind("view", "transitionend", Event, false);
				}
				var events = transitionEndEvent.split(" ");
				events.forEach(function(eventName) {
					var click = data.get(eventName);
					click && click.call(data, e);
				});
				
			}
			controller.bind("view", "transitionend", Event, false);
		}
	}
}).call(module.exports);