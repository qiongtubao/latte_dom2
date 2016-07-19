var LatteObject = require("../../m/data")
		, latte_lib = require("latte_lib");
	var Command = {};
	(function() {
		this.after = function(data, view, controller) {
			var classStr = view.attr("latte-class");
			if(classStr) {
				var keys = LatteObject.stringRegExp(classStr);
				var json = {};

				keys.forEach(function(key) {
					json[key] = data.get(key) || "";
					var change = function(value, oldValue) {
						if(controller.closed) {
							controller.unbind("data", key, change);
						}

						view.classed(oldValue, 0);
						view.classed(value, 1);
						
					}
					controller.bind("data", key, change);
					
				});
		
				view.node().className = view.node().className + " " +latte_lib.format.templateStringFormat(classStr, json);
				
				
			}
		};
	}).call(Command);
	
	module.exports = Command;