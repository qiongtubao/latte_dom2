	var LatteObject = require("../../m/data");
	var Command = {};
	(function() {
		var changeTags = ["input", "select", "textarea"];
		this.after = function(data, dom, controller) {
			var duplex = dom.attr("latte-duplex");
			if(duplex) {
				var latteObject = LatteObject.create(data);
				
				if(changeTags.indexOf(dom.node().tagName.toLowerCase()) != -1) {
					var domChange = function(value) {
						if(controller.closed) {
							return controller.unbind("view", "change", domChange);
						}
						data.set(duplex,  dom.text());
					}
					controller.bind("view", "change", domChange)
				}else{
					dom.attr("contenteditable", "true");
					controller.bind("view", "keyup", function(event) {
						//console.log(dom.text(), data.get(duplex), duplex);
						if(dom.text() != data.get(duplex)) {
							data.set(duplex, dom.text());
						}
					});
				}
				//console.log(dom.node().tagName);
				//controller.bind("view","change", domChange);
				
				var duplexChange = function(value) {
					if(self.closed) {
						return controller.unbind("data",duplex, duplexChange);
					}
					if( value == undefined ) {
						dom.text("") ;
					} else{
						dom.text(value);
					}
				}
				controller.bind("data", duplex, duplexChange);
				if( data.get(duplex) == undefined ) {
					dom.text("") ;
				} else{
					dom.text(data.get(duplex))  ;
				}
				
			}
			
		};
	}).call(Command);
	
	module.exports = Command;