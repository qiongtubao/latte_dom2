(function(){
	var View = require("./view.js");
	this.create = function(dom) {
		return View.create(dom);
	}
}).call(module.exports);