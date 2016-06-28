(function() {
	var Dom = require("./v/dom")
		, Data = require("./m/data")
		, Controller = require("./c/controller")
		, latte_lib = require("latte_lib");
		var find = function(id) {
			return document.querySelectorAll("*[latte-controller='"+id+"']");
		}
	this.define = function(id, data) {
		var doms = find(id);
		var controllers = [];
		if(doms) {
			for(var i = 0, len = doms.length ; i < len; i++) {
				var dom = doms[i];
				var controller = Controller.create(dom, data);
				controllers.push(controller);
			}
		}
		return controllers;
	}
	
}).call(module.exports);