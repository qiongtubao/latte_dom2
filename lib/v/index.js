(function(){
	var View = require("./view.js");
	var ViewUtils = require("./viewUtils.js");
	Object.defineProperty(this, "event", {
		get: function() {
			return ViewUtils.event
		}
	});
	this.create = function(dom) {
		return View.create(dom);
	}
}).call(module.exports);