latte_dom2
===========

#Tag

##文本显示绑定  latte-html 命令

html:
```html
	<div latte-controller="html">
        <div latte-html="{{a}} {{b}}"></div>
    </div>
```
js:
```js
	var latte_dom = latte.require("latte_dom");
	var data = {
		a: "A",
		b: "B"
	};
	var box = latte_dom.define("html", data);
```

##Click事件绑定 latte-click命令

html:
```html
	<div latte-controller="click">
        <button latte-click="click">click</button>
        <p latte-html="{{w}}"></p>
        <p latte-html="{{h}}"></p>
    </div>
```
js:
```js
	var latte_dom = latte.require("latte_dom");
	var data = {
		w: 100,
		h: 100,
		click: function() {
		  this.set("w",parseFloat(this.get("w")) + 10);
		  this.set("h",parseFloat(this.get("h")) + 10);
		}
	};
	var click = latte_dom.define("click", data);
```

##双向绑定  latte-duplex命令

html:
```html
	<div latte-controller="duplex">
        <input latte-duplex="w"></input>
    	<button latte-click="click">click</button>
    </div>
```
js:
```js
	var latte_dom = latte.require("latte_dom");
	var data = {
		w: 1,
		click: function() {
			console.log(this.get("w"));
		}
	};
	var duplex = latte_dom.define("duplex", data);
```

##class绑定   latte-class命令

html:
```html
	<div latte-controller="glass">
        <div latte-class="{{w}} yellow"></div>
        <button latte-click="click">click</button>
    </div>
```
css:
```css
	.yellow {
		background-color: yellow; 
	}
	.small {
		width: 100px;
		height: 100px;
	}
	.big {
		width: 200px;
		height: 200px;
	}
```
js:
```js
	var latte_dom = latte.require("latte_dom");
	var data = {
		w: "big",
		click: function() {
			if(this.get("w") == "big") {
				this.set("w", "small") 
			}else{
				this.set("w", "big");
			}
		}
	};
	var duplex = latte_dom.define("glass", data);
```





