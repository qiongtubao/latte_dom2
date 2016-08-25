	/**
		设计上一个view ->controller
	*/
	var latte_lib = require("latte_lib")
		, LatteObject = require("../m/data.js")
		, View = require("../v/index.js");
		var Controller = function(view, data) {
			view.latteController = this;
			this.dom = view;
			view = this.view = View.create(view);
			if(view.attr("latte-data")) {
				this.data = data.get(view.attr("latte-data"));
			}else{
				this.data = data;
			}
			if(!this.data) {
				throw new Error("data "+view.attr("latte-data")+" Error");
			}
			this.dataEvents = {};
			this.viewEvents = {};
			var self = this;
		

			Controller.befores.forEach(function(command){
				command(self.data, view, self);
			});
			Controller.middle(self.data, view, self);
			Controller.afters.forEach(function(command) {
				command(self.data, view, self);
			});
			this.emit("finish");
			
			
		};
		latte_lib.debug.error = function(e) {
			console.error(e);
		};
		latte_lib.inherits(Controller, latte_lib.events);
 		(function() {
			
			/**	
				存在问题 就是dom 并不是root
			*/
			this.bind = function(type, eventType, funcs) {
				if(!latte_lib.isArray(funcs)) {
					funcs = [funcs];
				}
				var f, events = this[type+"Events"];
				switch(type) {
					case "data":
						var o = this.data;
						f = o.on.bind(o);

					break;
					case "view":
						//f = this.view.addEventListener.bind(this.view);
						f = this.view.on.bind(this.view);
					break;
					default:
						latte_lib.debug.error("no the type");
						return;
					break;
				}
				
				for(var i = 0, len = funcs.length; i < len ; i++ ) {
					var func = funcs[i];
					if(!latte_lib.isFunction(func)) {
						latte_lib.debug.error("add function");
						return;
					}
					f(eventType, func);
				}
				events[eventType] = funcs.concat(events[eventType]);
			}
			this.unbind = function(type, eventType,funcs) {
				var f , events = this[type+"Events"];
				if(!latte_lib.isArray(funcs)) {
					funcs = [funcs];
				}
				switch(type) {
					case "data":
						f = this.data.off.bind(this.data);
					break;
					case "view":
						f = this.view.off.bind(this.view);
					break;
				}
				for(var i = 0, len = funcs.length; i < len; i++) {
					var func = funcs[i]
						, fIndex = events[eventType].indexOf(func);
					if(fIndex == -1) {
						latte_lib.debug.error("not find the func");
					}
					f(eventType, func);
					events[eventType].splice(fIndex, 1); 
				}

			}
			
			this.close = function() {
				this.closed = 1;
				var o = LatteObject.create(this.data);
				var latteOff = o.off.bind(o);
				for(var i in this.dataEvents) {
					this.dataEvents[i].forEach(function(func) {
						latteOff(i, func);
					});
					delete this.dataEvents[i];
				}
				var viewOff = this.view.off.bind(this.view);
				for(var i in this.viewEvents) {
					this.viewEvents[i].forEach(function(func) {
						viewOff(i, func);
					});
					delete this.viewEvents[i];
				}

				for(var i = 0, len = this.view.children.length; i < len; i++) {
					Controller.remove(this.view.children[i]);
				}
				
				delete this.dom.latteController;
				this.emit("close");
			}
		}).call(Controller.prototype);
		(function() {
			this.befores = [];
			this.afters = [];
			this.middle = function(data, view, controller) {
				if(view.attr("latte-stop")) {
					return;
				}
			
				for(var i = 0, l = view.children.length; i < l ; i++) {
					(function(i, view) {
						var child = view.children[i];				
						Controller.create(child, data);
					})(i, view);
										
				}
			};
			
			this.addBefore = function(func) {
				if(latte_lib.isFunction(func)) {
					this.befores.push(func);
				}	
			}
			this.addAfter = function(func) {
				if(latte_lib.isFunction(func)) {
					this.afters.push(func);
				}
			}
			this.create = function(dom, data) {
				if(dom.latteController) {
					return dom.latteController;
				}
				data = LatteObject.create(data);
				//view = View.create(dom);
				return new Controller(dom, data);
			}
			this.remove = function(dom, data, controller) {
				if(!dom) {
					return;
				}
				//console.log(dom.latteController.view , dom, dom.latteController.view == dom);
				controller = controller || dom.latteController;
				controller && controller.close();
			}
			this.removeChild = function(dom) {
				for(var i = 0, len = dom.children.length; i < len; i++) {
					Controller.remove(dom.children[i]);
					dom.removeChild(dom.children[i]);
				}
			}
			this.createChild = function(dom, data) {
				for(var i = 0, len = dom.children.length; i < len; i++) {
					Controller.create(dom.children[i], data);
				}
			}
			this.addCommand = function(func) {
				Controller.addBefore(func.before);
				Controller.addAfter(func.after || func);
			}
		}).call(Controller);
		var funcs = latte.require.find("latte_dom/c/commands/").map(function(o){
			//var r = require("./commands/"+o);
			//Controller.addCommand(r );
			var r = require("./commands/"+o);
			return r;
		});

		var befores = funcs.sort(function(a, b ) {
			
			return  (b.beforeLevel || b.level || 0) - (a.beforeLevel || a.level || 0)  ;
				
		});

		befores.forEach(function(b) {
			if(b.before) {
				Controller.addBefore(b.before);
			}	
		});
		var afters = funcs.sort(function(a, b) {
			return  (b.afterLevel || b.level || 0) - (a.afterLevel || a.level || 0)   ;
				
		});
		
		afters.forEach(function(a) {
			if(a.after) {
				Controller.addAfter(a.after);
			}
		});
		module.exports = Controller;