	/**
		<p latte-css="height:{{h}}px;width:{{w}}px"></p>
		
		单项绑定
		data -> view

	*/
	/**
		css 单项绑定
	*/
	var latte_lib = require("latte_lib");
	var Css = function(dom) {
		this.binds = {};
		this.dom = dom;
	};
	(function() {
		this.bind = function(value, key, o) {
			this.binds[value] = this.binds[value] || {};
			this.binds[value][key] = o;
		}
		this.set = function(key, value) {
			//this.dom.style[key] = value;
			this.dom.style(key, value);
		}
		this.change = function(k, v) {
			if(this.binds[k]) {
				var self = this;
				var change = {};
				change[k] = v;
				for(var i in this.binds[k]) {
					self.set(i, latte_lib.format.templateStringFormat(this.binds[k][i], change));
				}
			}
		}
	}).call(Css.prototype);
	(function() {
		this.create = function(cssString, dom) {
			var css = new Css(dom);
			if(latte_lib.isString(cssString)) {
				var cssPrototypes = cssString.split(";");
				cssPrototypes.forEach(function(cssPrototype) {
					var kv = cssPrototype.split(":");
					if(kv.length ==  2) {
						var key = kv[0];
						var value = kv[1];
						var openTag = value.indexOf("{{") ;
						if(openTag != -1) {
							var closeTag = value.indexOf("}}");

							var o = value.substring(openTag+2, closeTag);
						
							css.bind(o, key, value);
						}
					}
					
					
				});
			}
			return css;
		}
	}).call(Css);

		var LatteObject = require("../../m/data");
	var Command = {};
	(function() {
		this.after = function(data, dom, controller) {
			var css = dom.attr("latte-css");
			var latteObject = LatteObject.create(data);
			if(css) {
				var css = Css.create(css, dom);
				for(var i in css.binds) {
					css.change(i, data.get(i));
					(function(i){
						
						var cssDataChange = function(value) {
							if(controller.closed) {
								return controller.unbind("data", i, cssDataChange)
							}
							//css.change(i, data[i]);
							css.change(i, data.get(i));
						}
						controller.bind("data", i, cssDataChange);
					})(i);
	 				
				}
				
			}
		};
	}).call(Command);
	
	module.exports = Command;