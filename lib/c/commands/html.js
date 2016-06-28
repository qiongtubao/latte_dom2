	var  latte_lib = require("latte_lib")
		, LatteObject = require("../../m/data.js") ;
	/**
		<p>{{name}}</p>
		<p latte-value="{{name}}"></p>
		单项绑定
		data -> view
		缺点是使用insertHTML 修改的话不会改变
	*/
	var Command = {};
	(function() {
				var forEachJSON = function(data, key, result) {
					for(var i in data) {
						
						if(latte_lib.isObject(data[i])) {
							var ckey = latte_lib.clone(key);
							ckey.push(i);
							forEachJSON(data[i], ckey, result);
						}else if(latte_lib.isArray(data[i])){
							var ckey = latte_lib.clone(key);
							ckey.push(i);
							forEachJSON(data[i], ckey, result);
						}else{
							var ckey = latte_lib.clone(key);
							ckey.push(i);
							result[ckey.join(".")] = data[i].toString();
						}
					}
				}
			var toJSON = function(data) {
				var result = {};
				var json = data.toJSON();
				forEachJSON(json,  [], result);	
				
				return result;
			}
		this.after = function(data, view, controller) {
			var latteValue = view.attr("latte-html");
			var func = function(stringContent) {
				var keys = LatteObject.stringRegExp(stringContent);
				view.text(latte_lib.format.templateStringFormat(stringContent, toJSON(data)));
				keys.forEach(function(key) {
					controller.bind("data", key, function(value, oldValue) {
						view.text(latte_lib.format.templateStringFormat(stringContent, toJSON(data)));
					});
				});
			}
			
			if(latteValue) {
				func(latteValue);
			}else if(view.childNodes.length == 1 && view.childNodes[0].nodeType == 3) {
				//text 转换成 latte-value
				view.attr("latte-html", view.node().value);
				func(view.text());
			}

		}
	}).call(Command);
	
	module.exports = Command;