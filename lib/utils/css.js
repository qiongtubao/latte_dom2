(function(){
	var self = this;
	this.hasCssString = function(id, doc) {
		var index = 0, sheets;
		doc = doc || document;
		if(doc.createStyleSheet && (sheets = doc.styleSheets)) {
			while(index < sheets.length) {
				if(sheets[index++].owningElement.id==id) {
					return true;
				}
			}
		}else if((sheets = doc.getElementsByTagName("style"))) {
			while(index < sheets.length) {
				if(sheets[index++].id === id) {
					return true;
				}
			}
		}
		return false;
	}
	var Dom = {
		createElement: function(tag, ns) {
			var XHTML_NS = "http://www.w3.org/1999/xhtml";
			return document.createElementNS?
			document.createElementNS(ns || XHTML_NS, tag)
			: document.createElement(tag);
		},
		getDocumentHead : function(doc) {
			if(!doc) {
				doc = document;
			}
			return doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;
		}
	}
	this.importCssString = function(cssText, id, doc) {
		doc = doc || document;
		if(id && self.hasCssString(id, doc))
			return null;
		var style;
		if(doc.createStyleSheet) {
			style = doc.createStyleSheet();
			style.cssText = cssText;
			if(id) {
				style.owningElement.id = id;
			}
		} else {
			style = Dom.createElement("style");
			style.appendChild(doc.createTextNode(cssText));
			//style.innerHTML = cssText;
			if(id) {
				style.id = id;
			}
			Dom.getDocumentHead(doc).appendChild(style);
		}
	}
}).call(module.exports);