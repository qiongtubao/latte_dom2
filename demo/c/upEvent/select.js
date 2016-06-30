(function(define) {'use strict'
	define("latte_dom/c/commands/select.js", ["require", "exports", "module", "window"],
		function(require, exports, module, window) {
			var Command = {};
			(function() {
				this.beforeLevel = 1;
				this.before = function(data, view, controller) {
					var selectDataName = view.attr("latte-select");
					if(selectDataName) {

						if(!view.attr("latte-duplex")) {
							view.attr("latte-duplex", "value");
						}
						if(!view.attr("latte-list")) {
							view.attr("latte-list", "data");
						}
						if(view.html().indexOf("<") == -1) {
							view.html('<option latte-value="value">{{key}}</option>');
						}
						var find = function(index, p) {
							console.log(index);
							var t = view.children[index].offsetTop;
							var h = view.children[index].offsetHeight;
							console.log(t, h, p);
							if( p <= t) {
								return -1;
							}else if( p > (t + h)) {
								return 1;
							}else{
								return 0;
							}
						}
						var select = function() {
							var len = data.get("data").length;
							var h = data.get("h");
							var h2 = data.get("h2");
							var y = data.get("y");
							var oldselect , maybeIndex, r;
							maybeIndex = oldselect = data.get("select");
							if(maybeIndex == null) {
								maybeIndex = parseInt((h  - y - h2 )/h * len) ;
							}
							
							//console.log(maybeIndex);
							//console.log(view.children[maybeIndex].offsetTop, h/2);
							while( maybeIndex >= 0 && maybeIndex <= len-1 && (r=find(maybeIndex,h  - y - h2)) != 0 ) {
								
								maybeIndex += r;
								
							}
							maybeIndex = Math.max( 0 , Math.min(len-1 , maybeIndex));
							
							if(oldselect != maybeIndex) {
								if(oldselect != null) {
									//data.get(selectDataName+".data").get(oldselect).set("select") = "";
									data.get("data").get(oldselect ).set("select", "");
								}
								//console.log(data.get("data").get(maybeIndex));
								data.get("data").get(maybeIndex ).set("select", "picker-selected");
								data._set("select", maybeIndex);
							}
						}
						controller.bind("data", "select", function(value, oldvalue) {
							var d = data.get('data');
							d.get(oldvalue).set("select", "");
							d.get(value).set("select", "picker-selected");
							var h = data.get("h");
							var h3 = data.get("h3");
							var h2 = data.get("h2");
							
							data.set("y", h - h2 - h3  - value * h3 );

						});
						controller.on("finish", function() {
							var h = view.node().offsetHeight;
							//var highlight = View.create(".picker-center-highlight");
         				 	//middle = highlight.node().offsetTop + highlight.node().offsetHeight / 2;
							var h2 = data.get("h2");
							var h3 = data.get("h3");
							data.set("h", h);
							select();
							var min = -h2;
							var max = h + min - h3;
							data.set("move", function(e, now) {
								var y = Math.max( min, Math.min(max, parseFloat(this.get("y"))+ now.pageY - e.now.pageY ));
								if(this.get("y") != y) {
									this.set("y", y);
	                				select();
								}
			                	
							});
							controller.bind("view","mouseup", function(e) {
								//调整对齐
								data.set("select", data.get("select"));
							});
						});
					}

				}
			}).call(Command); 
			module.exports = Command;


	});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });