(function(define) {'use strict'
	define("latte_dom/c/commands/leftEvent.js", ["require", "exports", "module", "window"],
		function(require, exports, module, window) {
			/**
				<button latte-class="{{glass}}"></button>
				data : {
					glass: ""
				}
			*/
				var LatteObject = require("../../m/data")
					, latte_lib = require("latte_lib")
					, V = require("../../v/index.js");
				var Command = {};
				(function() {
					this.after = function(data, dom, controller) {
						var name = dom.attr("latte-leftEvent");
						if(name) {
							/**
							var change = function(value, oldValue) {
								if(oldValue == value) {
									return;
								}

								if(controller.closed) {
									return controller.unbind("data", name, change);
								}
								dom.innerHTML = "";
								var imageKeys = LatteObject.stringRegExp(value, "<<", ">>");
								//console.log("...................", keys);
								imageKeys.forEach(function(k) {
									value = value.replace("<<" + k + ">>", "<br><img src='"+k+"'></img><br>");
								});
								var spanKeys = LatteObject.stringRegExp(value, "[[", "]]");
								spanKeys.forEach(function(k) {
									value = value.replace("[[" + k + "]]", "<strong>"+k+"</strong>");
								});
								//var vs = value.split("\n");
								//console.log(vs.length);
								//value = vs.join("\n<p></p>");
								value = value.replace(/\n/g, "\n<p></p>");
								dom.innerHTML = value;
							}
							controller.bind("data", name, change);
							change(data.get(name));
							*/
							var isDown =false;
							var move = {};
							dom.on("mousedown", function() {
								isDown = true;
								var e = V.event();
								move = {
									x: e.pageX，
									y: e.pageY
								};
							});
							dom.on("mousemove", function(e) {
								if(isDown) {

								}
							});
							dom.on("mouseup", function(e) {
								if(isDown) {
									isDown = false;
									if(e.pageX - move.x > 0) {
										data.get(name).call(controller);
									}

								}
							});
						}

						
					};
					
				}).call(Command);
				
				module.exports = Command;
	});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });