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
	this.afterLevel = 9999;
	this.after = function(data, view, controller) {
		var showName = view.attr("latte-show");
		var showClass = view.attr("latte-showClass");
		var hideClass = view.attr("latte-hideClass");
		var showFunc = view.attr("latte-showFunc");
		var hideFunc = view.attr("latte-hideFunc");

		if(showName) {
			var old =  "";
			view._offsetHeight = view.node().offsetHeight;
			view._offsetWidth = view.node().offsetWidth;
			var change = function(value, oldValue) {
				if(value == oldValue  && oldValue != null) {
					return;
				}
				if(!value) {
					if((!hideClass && !hideFunc) || oldValue == undefined) {
						view.style("display", "none");
						showClass &&  view.classed(showClass, 0);
						//hideFunc && data.get(hideFunc) && data.get(hideFunc).call(view);
						
					}else if(hideFunc){
						data.get(hideFunc) && data.get(hideFunc).call(view);
						var onceFunc = function() {
							view.style("display", "none");
							removeEvent(view, "AnimationEnd", onceFunc, false);
							removeEvent(view, "TransitionEnd", onceFunc, false);
							console.log(view);
						};
						addEvent(view, "AnimationEnd", onceFunc, false);
						addEvent(view, "TransitionEnd", onceFunc, false);

					}else if(showClass) {
						var onceFunc = function() {
							view.classed(hideClass, 0);
							view.style("display", "none");
							removeEvent(view, "AnimationEnd", onceFunc, false);
							removeEvent(view, "TransitionEnd", onceFunc, false);
						};
						addEvent(view, "AnimationEnd", onceFunc, false);
						addEvent(view, "TransitionEnd", onceFunc, false);
						view.classed(hideClass, 1);
					}
				}else {
					if((!showClass && !showFunc) || oldValue == undefined ) {
						hideClass &&  view.classed(hideClass, 0);
						//data.get(showFunc) && data.get(showFunc).call(view);
						view.style("display", "");
					}else if(showFunc){
						view.style("display", "");
						var onceFunc = function() {
							removeEvent(view, "AnimationEnd", onceFunc, false);
							removeEvent(view, "TransitionEnd", onceFunc, false);

						}
						addEvent(view, "AnimationEnd", onceFunc, false);
						addEvent(view, "TransitionEnd", onceFunc, false);
						setTimeout(function() {
							data.get(showFunc) && data.get(showFunc).call(view);
						}, 2);
						
						
					}else{
						view.style("display", "");
						var onceFunc = function() {
							console.log("end show");
							view.classed(showClass, 0);
							removeEvent(view, "AnimationEnd", onceFunc, false);
							removeEvent(view, "TransitionEnd", onceFunc, false);
							//view.style("display", old);
						};
						addEvent(view, "AnimationEnd", onceFunc, false);
						addEvent(view, "TransitionEnd", onceFunc, false);
						view.classed(showClass, 1);
					}
				}
				/**
				if(!value) {
					showClass &&  view.classed(showClass, 0);
					//hide
					if(!hideClass || oldValue == undefined) {
						
						view.style("display", "none");
					}else{
						
						var hideEnd = function() {
							console.log("end hide");
							view.classed(hideClass, 0);
							view.style("display", "none");
						};
						PrefixedEvent(view, "AnimationEnd", hideEnd, false);
						view.classed(hideClass, 1);
					}
					
				}else{
					hideClass &&  view.classed(hideClass, 0);
					view.style("display",  old);
					setTimeout(function() {
						
					},1);
					//show
					
					
				}
				*/
			};
			
			change(data.get(showName));
			controller.bind("data", showName, change);
		}
	}
}).call(module.exports);