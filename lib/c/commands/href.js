	/**
		<img latte-src="i"></img>
		一般绑定的是src
		单项

		音频有问题
	*/
	var LatteObject = require("../../m/data.js")
		, latte_lib = require("latte_lib");
	var Command = {};
	(function() {
		this.after = function(data, view, controller) {
			var stringContent = view.attr("latte-href");
			var latteObject = LatteObject.create(data);
			if(stringContent) {
				var keys = LatteObject.stringRegExp(stringContent);
				view.attr("href",  latte_lib.format.templateStringFormat(stringContent, data.toJSON()) );
				keys.forEach(function(key) {
					controller.bind("data", key, function() {
						view.attr("href",  latte_lib.format.templateStringFormat(stringContent, data.toJSON()) );
					});
				});
			}

		};
	}).call(Command);
	
	module.exports = Command;