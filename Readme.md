latte_dom2
===========

#Tag

##数据绑定  latte-data指令
html:
```html
	<div latte-controller="dataDemo">
        <div latte-data="data" id="data">
        	<p latte-html="{{name}}"></p>
        </div>
    </div>
```
```js
	var latte_dom = latte.require("latte_dom");
	var data = {
		data: {
			name:"abc"
		}
	};
	var box = latte_dom.define("dataDemo", data);
```

##文本显示绑定  latte-html 指令 

html:
```html
	<div latte-controller="htmlDemo">
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
	var box = latte_dom.define("htmlDemo", data);
```

##Click事件绑定 latte-click指令 

html:
```html
	<div latte-controller="clickDemo">
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
	var click = latte_dom.define("clickDemo", data);
```

##双向绑定  latte-duplex指令 

html:
```html
	<div latte-controller="duplexDemo">
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
	var duplex = latte_dom.define("duplexDemo", data);
```

##class绑定   latte-class指令 

html:
```html
	<div latte-controller="classDemo">
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
	var duplex = latte_dom.define("classDemo", data);
```

##src文档URL绑定   latte-src指令  
html:
```html
	<div latte-controller="srcDemo">
        <iframe latte-src="{{url}}"></iframe>
        <button latte-click="click">click</button>
    </div>
```
js:
```js
	var latte_dom = latte.require("latte_dom");
	var data = {
		url: "http://www.baidu.com",
		click: function() {

		}
	};
	var duplex = latte_dom.define("srcDemo", data);
```

##列表绑定 latte-list指令 

html:
```html
	<div latte-controller="listDemo">
        <div latte-list="list">
        	<div >
                  <label latte-html="{{name}}"></label>
                  <label latte-html="{{age}} {{sex}}"></label>
              <div>
        </div>
    </div>
```

js:
```js
	var latte_dom = latte.require("latte_dom");
  	var data = {
        
        list:[
          {name:"a", age:1, sex:"男"},
          {name:"b", age:2, sex: "女"},
          {name:"c", age:3, sex: "男"}
        ]
       
  	};
  	var box = latte_dom.define("listDemo", data);
```

##显示状态绑定

html:
```html
	<div latte-controller="showDemo">
        <div latte-show="h">
        	<p>A</p>
        </div>
        <button latte-click="click">click</button>
    </div>
```

js:
```js
	var latte_dom = latte.require("latte_dom");
  	var data = {
        h: true,
        click: function() {
        	this.set("h", !this.get("h"));
    	}
  	};
  	var box = latte_dom.define("showDemo", data);
		
```






