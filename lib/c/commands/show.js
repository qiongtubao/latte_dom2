(function() {
	this.afterLevel = 9999;
		var changeMS = function(time) {
			
			if(time.indexOf("ms") != -1) {
				return time.replace("ms", "") - 0;
			}
			if(time.indexOf("s") != -1) {
				return time.replace("s", "") * 1000;
			}
		}
	var getTime = function(view) {
		var duration = changeMS(view.style("animation-duration"));
		var delay = changeMS(view.style("animation-delay"));
		var count = view.style("animation-iteration-count");
		
		return delay + duration * count;
	}
	this.after = function(data, view, controller) {
		var showName = view.attr("latte-show");
		var showClass = view.attr("latte-showClass");
		var hideClass = view.attr("latte-hideClass");
		var showFunc = view.attr("latte-showFunc");
		var hideFunc = view.attr("latte-hideFunc");
		var onlyClass = view.attr("latte-onlyClass");

		var doTime = (view.attr("latte-showTimeout") - 0) || 10000;
		if(showName) {
			var old =  "";
			view._offsetHeight = view.node().offsetHeight;
			view._offsetWidth = view.node().offsetWidth;
			if( showFunc ) {
				view.attr("latte-transitionEndEvent", (view.attr("latte-transitionEndEvent") || "")+ " " + showFunc+"$callback") ;
				view.attr("latte-animationEndEvent", (view.attr("latte-animationEndEvent") || "")+ " " + showFunc+"$callback");
			}
			
			hideFunc && view.attr("latte-transitionEndEvent", (view.attr("latte-transitionEndEvent") || "")+ " " + hideFunc + "$callback") && view.attr("latte-animationEndEvent", (view.attr("latte-animationEndEvent") || "")+ " " + hideFunc + "$callback");
			showClass && view.attr("latte-transitionEndEvent", (view.attr("latte-transitionEndEvent") || "")+ " "+ showClass + "$cssCallback") && view.attr("latte-animationEndEvent", (view.attr("latte-animationEndEvent") || "")+ " "+ showClass + "$cssCallback");
			hideClass && view.attr("latte-transitionEndEvent", (view.attr("latte-transitionEndEvent") || "")+ " "+ hideClass + "$cssCallback") && view.attr("latte-animationEndEvent", (view.attr("latte-animationEndEvent") || "")+ " "+ hideClass + "$cssCallback");
			var change = function(value, oldValue) {
				if(value == oldValue && oldValue != null) {
					return;
				}
				if(!value) {
					if((!hideClass && !hideFunc && !onlyClass) || oldValue == undefined) {
						showClass &&  view.classed(showClass, 0);
						view.style("display", "none");
					}else if(hideFunc) {					
						

						var hf = data.get(hideFunc) ;
						if(hf) {
							var timeout;
							var time = getTime(view) || doTime;
							var name = hideFunc+"$callback";
							var callbackFunc;
							data.set(name, function() {
								callbackFunc && callbackFunc.call(view);
								view.style("display", "none");
								data.set(name , null);
								clearTimeout(timeout);
							});
							
							hf.call(view, function(callback) {
								callbackFunc = callback;
							});
							timeout = setTimeout(function() {
								callbackFunc && callbackFunc.call(view);
								view.style("display", "none");
								data.set(name , null);
								timeout = null;
								console.log("hide Error");
							}, time);
							
						} else{
							view.style("display", "none");
						}
							
						
					}else if(onlyClass) {
						//var timeout;
						//var name = onlyClass + "$hideCssCallback";
						//setTimeout(function() {
						var timeout;
						var time = getTime(view) || doTime;
						var name = hideClass + "$onlyCssCallback";
						data.set(name, function() {
							view.style("display", "none");
							clearTimeout(timeout);
						});
						view.classed(onlyClass, 0);	
						timeout = setTimeout(function() {
							view.style("display", "none");
							timeout = null;
							console.log("hide onlyClass Error");
						}, time);
						//}, 1);
					}else if(hideClass) {
						var timeout;
						var time = getTime(view) || doTime;
						var name = hideClass + "$cssCallback";
						data.set(name, function() {
							view.classed(hideClass, 0);
							data.set(name, null);
							view.style("display", "none");
							timeout && clearTimeout(timeout);
						});
						timeout = setTimeout(function() {
							view.classed(hideClass, 0);
							data.set(name, null);
							view.style("display", "none");
							timeout = null;
							console.log("hideClass  Error");
						}, time);
						
						view.classed(hideClass, 1);
					}
				}else{
					if((!showClass && !showFunc && !onlyClass) || oldValue == undefined ) {
						view.classed(hideClass, 0);
						view.style("display", "");
					}else if(showFunc){
						var sf = data.get(showFunc);
						view.style("display", "");
						if(sf) {
							var timeout;
							var time = getTime(view) || doTime;
							var name = showFunc + "$callback";
							var callbackFunc;
							data.set(name, function() {

								callbackFunc && callbackFunc.call(view);			
								data.set(name, null);
								timeout && clearTimeout(timeout);
							});
							setTimeout(function() {
								sf.call(view, function(callback) {
									callbackFunc = callback;
								});
								timeout = setTimeout(function() {
									callbackFunc && callbackFunc.call(view);			
									data.set(name, null);
									timeout = null;
									console.log("showFunc Error");
								}, time);
							}, 1);
							
						}
						
					}else if(onlyClass) {
						
						view.style("display", "");
						setTimeout(function() {
							view.classed(onlyClass, 1);	
						},1);
						
					}else if(showClass) {
						var timeout;
						var time = getTime(view) || doTime;
						view.style("display", "");
						var name = showClass + "$cssCallback";
						data.set(name, function() {

							view.classed(showClass, 0);
							data.set(name, null);
							timeout && clearTimeout(timeout);
						});
						setTimeout(function() {							
							view.classed(showClass, 1);
							timeout = setTimeout(function() {
								view.classed(hideClass, 0);
								data.set(name, null);
								view.style("display", "none");
								timeout = null;
								console.log("show Error");
							}, time);
						}, 1);
						
						


						
					}
				}

			}
			change((data.get(showName) || false) );
			controller.bind("data", showName, change);

		}
	}
	/**
	this.afterLevel = 9999;
	this.after = function(data, view, controller) {
		var showName = view.attr("latte-show");
		var showClass = view.attr("latte-showClass");
		var hideClass = view.attr("latte-hideClass");
		var showFunc = view.attr("latte-showFunc");
		var hideFunc = view.attr("latte-hideFunc");

		if(showName) {
			console.log(showName);
			var old =  "";
			view._offsetHeight = view.node().offsetHeight;
			view._offsetWidth = view.node().offsetWidth;
			var change = function(value, oldValue) {
				
				if(value == oldValue  && oldValue != null) {
					return;
				}
				//console.log("????", value, oldValue);
				if(!value) {
					if((!hideClass && !hideFunc) || oldValue == undefined) {
						
						showClass &&  view.classed(showClass, 0);
						view.style("display", "none");
						//hideClass && view.classed(hideClass, 1);
						//hideFunc && data.get(hideFunc) && data.get(hideFunc).call(view);
						
					}else if(hideFunc){
						
						
						var onceFunc = function() {
							removeEvent(view, "AnimationEnd", onceFunc, false);
							removeEvent(view, "TransitionEnd", onceFunc, false);
							view.style("display", "none");
						};
						addEvent(view, "AnimationEnd", onceFunc, false);
						addEvent(view, "TransitionEnd", onceFunc, false);
						setTimeout(function() {
							data.get(hideFunc) && data.get(hideFunc).call(view, function(time, callback) {
								time && setTimeout(onceFunc, time);
								onceFunc.callback = callback;
							});
						}, 2);
						

					}else if(hideClass) {
						
						var onceFunc = function() {
							view.classed(hideClass, 0);
							onceFunc.callback && onceFunc.callback.call(view);
							removeEvent(view, "AnimationEnd", onceFunc, false);
							removeEvent(view, "TransitionEnd", onceFunc, false);
							view.style("display", "none");
						};
						addEvent(view, "AnimationEnd", onceFunc, false);
						addEvent(view, "TransitionEnd", onceFunc, false);
						view.classed(hideClass, 1);

					}
					
				}else {
					
					if((!showClass && !showFunc) || oldValue == undefined ) {
						hideClass &&  view.classed(hideClass, 0);
						//showClass && view.classed(showClass, 1);
						//data.get(showFunc) && data.get(showFunc).call(view);
						view.style("display", "");
					}else if(showFunc){
						
						view.style("display", "");
					
						var onceFunc = function() {					
							removeEvent(view, "AnimationEnd", onceFunc, false);
							removeEvent(view, "TransitionEnd", onceFunc, false);
							onceFunc.callback && onceFunc.callback.call(view);
						}
						addEvent(view, "AnimationEnd", onceFunc, false);
						addEvent(view, "TransitionEnd", onceFunc, false);
						setTimeout(function() {

							data.get(showFunc) && data.get(showFunc).call(view ,function(time, callback) {
								time && setTimeout(onceFunc, time);
								onceFunc.callback = callback;
							});
							
						}, 2);
						
						
					}else if(showClass){
						var classs = showClass.split(" ");
						view.style("display", "");
						var onceFunc = function() {
							
							classs.forEach(function(o) {
								view.classed(o, 0);
							});
							removeEvent(view, "AnimationEnd", onceFunc, false);
							removeEvent(view, "TransitionEnd", onceFunc, false);
							//view.style("display", old);
						};
						addEvent(view, "AnimationEnd", onceFunc, false);
						addEvent(view, "TransitionEnd", onceFunc, false);
						setTimeout(function() {
							classs.forEach(function(o) {
								view.classed(o, 1);
							});
							
						}, 2);
						
					}
				}
				
			};
			//data.set(showName, data.set(showName) || false);
			change((data.get(showName) || false) );
			controller.bind("data", showName, change);
		}
	}
	*/
}).call(module.exports);