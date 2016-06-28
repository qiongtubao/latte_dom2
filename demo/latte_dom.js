!function(){function t(t){var e=function(t,e){return r("",t,e)},o=n;t&&(n[t]||(n[t]={}),o=n[t]),o.define&&o.define.packaged||(i.original=o.define,o.define=i,o.define.packaged=!0),o.require&&o.require.packaged||(r.original=o.require,o.require=e,o.require.packaged=!0,o.require.find=function(t,e){var n=t.length,r=[];return Object.keys(i.modules).forEach(function(i){if(0==i.indexOf(t)){var o=i.substring(n);e?r.push(o):-1==o.indexOf("/")&&r.push(o)}}),r})}var e="latte",n=function(){return this}();if(e||"undefined"==typeof requirejs){var i=function(t,e,n){return"string"!=typeof t?void(i.original?i.original.apply(window,arguments):(console.error("dropping module because define wasn't a string."),console.trace())):(2==arguments.length&&(n=e),i.modules||(i.modules={},i.payloads={}),i.payloads[t]=n,void(i.modules[t]=null))},r=function(t,e,n){if("[object Array]"===Object.prototype.toString.call(e)){for(var i=[],o=0,a=e.length;a>o;++o){var c=s(t,e[o]);if(!c&&r.original)return r.original.apply(window,arguments);i.push(c)}n&&n.apply(null,i)}else{if("string"==typeof e){var u=s(t,e);return!u&&r.original?r.original.apply(window,arguments):(n&&n(),u)}if(r.original)return r.original.apply(window,arguments)}},o=function(t,e){if("."==e.charAt(0)){for(var n,i=t.split("/"),r=(i.pop(),e.split("/"));n=r.shift();)".."==n?i.pop():"."!=n&&i.push(n);return i.join("/")}return e},a=function(t,e){if(-1!==e.indexOf("!")){var n=e.split("!");return a(t,n[0])+"!"+a(t,n[1])}return name=o(t,e),name},s=function(t,e){e=a(t,e);var o=i.modules[e];if(!o){if(o=i.payloads[e],"function"==typeof o){var c={},u={id:e,uri:"",exports:c,packaged:!0},f=function(t,n){return r(e,t,n)},l=o(f,c,u,n);c=l||u.exports,i.modules[e]=c,delete i.payloads[e]}o=c||o,o||-1!=e.indexOf(".js")||(o=i.modules[e]=s(t,e+".js")),o||-1!=e.indexOf("/index")||(o=i.modules[e]=s(t,e+"/index")),o||-1!=e.indexOf("/index.js")||(o=i.modules[e]=s(t,e+"/index.js"))}return o||console.log("unload error",t,e),i.modules[e]=o,o};t(e)}}(),latte.global=this,this.define=latte.define,latte.config={},function(){this.config={}}.call(latte),function(t){"use strict";t("latte_lib/array.js",["require","exports","module","window"],function(t,e,n,i){var r=t("./lib.js"),o=t("./events.js"),a=t("./object"),s=function(t){var e=this;this.data=[];var n=function(n,i,r){var a=e.data.indexOf(this);-1!=a?(e.emit(a+"."+n,i,r,t),e.emit("change",a+"."+n,i,r,t)):o(this)},i=function(t){t.on("change",n)},o=function(t){a.isLatteObject(t)&&t.off("change",n)};!function(){t.forEach(function(t,n){var r=a.create(t);r?(i(r),e.data[n]=r):e.data[n]=t})}();var s=function(n,s,c){if(r.isArray(n)||(n=n.toString().split(".")),1!=n.length){var u=n.shift();return e.get(u).set(n,s,c)}var f,u=n[0],l=e.data[u];t[u];switch(c){case 1:break;default:o(l);var f=a.create(s);return f?i(f):f=s,e.data[u]=f,t[u]=s,{ov:l,nv:f}}};this._set=s,this.set=function(t,n,i){var r=s(t,n,i);return e.emit("set",t,r.nv,r.ov),e.emit("change",t,r.nv,r.ov),r},this.get=function(t){if("this"==t&&!e.data[t])return e;r.isArray(t)||(t=t.toString().split("."));if(1==t.length)return e.data[t[0]];var n=t.shift();return e.data[n].get(t)},this.push=function(t){var n=e.data.length;s(n,t);e.emit("splice",n,[],[t]),e.emit("change",n,t)},this.pop=function(){var t=s(e.length-1,null);e.data.pop(),e.emit("splice",e.length,[t.ov],[])},this.shift=function(){var t=e.data.shift();o(t),e.emit("splice",0,[t],[]);for(var n=0,i=e.data.length;i>n;n++)e.emit("change",n,e.data[n]);e.emit("change",e.data.length,null)},this.unshift=function(){var t=Array.prototype.map.call(arguments,function(t){var e=a.create(t);return e&&e.on("change",n),e||t});e.data.unshift.apply(e.data,t),e.emit("splice",0,[],t);for(var i=0,r=e.data.length;r>i;i++)e.emit("change",i,e.data[i])},this.splice=function(t,i){for(var r=e.data.length,s=Array.prototype.splice.call(arguments,2).map(function(t){var e=a.create(t);return e&&e.on("change",n),e||t}),c=[],u=0;i>u;u++){var f=e.get(t+u);f&&(o(f),c.push(f))}e.data.splice.apply(e.data,[t,i].concat(s)),e.emit("splice",t,c,s);for(var u=0,l=Math.max(r,e.data.length);l>u;u++)e.emit("change",u,e.data[u])},this.toJSON=function(){return t},this.indexOf=function(t){return e.data.indexOf(t)},this.forEach=function(t){e.data.forEach(t)},this.map=function(t){return e.data.map(t)},Object.defineProperty(e,"length",{get:function(){return e.data.length},set:function(t){throw new Error("暂时没处理")}}),this.getKeys=function(){return Object.keys(e.data)}};r.inherits(s,o),function(){}.call(s),n.exports=s})}("function"==typeof define?define:function(t,e,n){n(require,exports,module)}),function(t){"use strict";t("latte_lib/async.js",["require","exports","module","window"],function(t,e,n,i){var r=t("./lib.js");r||console.log("no load lib"),function(){var t=this;this.setImmediate=r.setImmediate;var e=this.only_once=function(e){var n=!1;return function(){if(n)throw new Error("Callback was already called.");n=!0,e.apply(t,arguments)}};this.forEach=this.each=function(t,n,i){function o(e){e?(i(e),i=function(){}):(a+=1,a>=t.length&&i())}if(i=i||function(){},!t.length)return i();var a=0;r.forEach(t,function(t){n(t,e(o))})},this.forEachSeries=this.eachSeries=function(t,e,n){if(n=n||function(){},!t.length)return n();var i=0;!function r(){e(t[i],function(e){e?(n(e),n=function(){}):(i+=1,i>=t.length?n():r())})}()},this.forEachLimit=this.eachLimit=function(t,e,i,r){var o=n(e);o.apply(null,[t,i,r])};var n=function(t){return function(e,n,i){if(i=i||function(){},!e.length||0>=t)return i();var r=0,o=0,a=0;!function s(){if(r>=e.length)return i();for(;t>a&&o<e.length;)o+=1,a+=1,n(e[o-1],function(t){t?(i(t),i=function(){}):(r+=1,a-=1,r>=e.length?i():s())})}()}},i=function(e){return function(){var n=Array.prototype.slice.call(arguments);return e.apply(null,[t.each].concat(n))}},o=function(t,e){return function(){var i=Array.prototype.slice.call(arguments);return e.apply(null,[n(t)].concat(i))}},a=function(e){return function(){var n=Array.prototype.slice.call(arguments);return e.apply(null,[t.eachSeries].concat(n))}},s=function(t,e,n,i){if(e=r.map(e,function(t,e){return{index:e,value:t}}),i){var o=[];t(e,function(t,e){n(t.value,function(n,i){o[t.index]=i,e(n)})},function(t){i(t,o)})}else t(e,function(t,e){n(t.value,function(t){e(t)})})};this.map=i(s),this.mapSeries=a(s);var c=function(t){return o(t,s)};this.mapLimit=function(t,e,n,i){return c(e)(t,n,i)},this.inject=this.foldl=this.reduce=function(e,n,i,r){t.eachSeries(e,function(t,e){i(n,t,function(t,i){n=i,e(t)})},function(t){r(t,n)})},this.foldr=this.reduceRight=function(e,n,i,o){var a=r.map(e,function(t){return t}).reverse();t.reduce(a,n,i,o)};var u=function(t,e,n,i){var o=[];e=r.map(e,function(t,e){return{index:e,value:t}}),t(e,function(t,e){n(t.value,function(n){n&&o.push(t),e()})},function(t){i(r.map(o.sort(function(t,e){return t.index-e.index}),function(t){return t.value}))})};this.select=this.filter=i(u),this.selectSeries=this.filterSeries=a(u);var f=function(t,e,n,i){var o=[];e=r.map(e,function(t,e){return{index:e,value:t}}),t(e,function(t,e){n(t.value,function(n){n||o.push(t),e()})},function(t){i(r.map(o.sort(function(t,e){return t.index-e.index}),function(t){return t.value}))})};this.reject=i(f),this.rejectSeries=a(f);var l=function(t,e,n,i){t(e,function(t,e){n(t,function(n){n?(i(t),i=function(){}):e()})},function(t){i()})};this.detect=i(l),this.detectSeries=a(l),this.any=this.some=function(e,n,i){t.each(e,function(t,e){n(t,function(t){t&&(i(!0),i=function(){}),e()})},function(t){i(!1)})},this.all=this.every=function(e,n,i){t.each(e,function(t,e){n(t,function(t){t||(i(!1),i=function(){}),e()})},function(t){i(!0)})},this.sortBy=function(e,n,i){t.map(e,function(t,e){n(t,function(n,i){n?e(n):e(null,{value:t,criteria:i})})},function(t,e){if(t)return i(t);var n=function(t,e){var n=t.criteria,i=e.criteria;return i>n?-1:n>i?1:0};i(null,r.map(e.sort(n),function(t){return t.value}))})},this.auto=function(t,e){e=e||function(){};var n=r.keys(t),i=n.length;if(!i)return e();var o={},a=[],s=function(t){a.unshift(t)},c=function(t){for(var e=0;e<a.length;e+=1)if(a[e]===t)return void a.splice(e,1)},u=function(){i--,r.forEach(a.slice(0),function(t){t()})};s(function(){if(!i){var t=e;e=function(){},t(null,o)}}),r.forEach(n,function(n){var i=r.isArray(t[n])?t[n]:[t[n]],a=function(t){var i=Array.prototype.slice.call(arguments,1);if(i.length<=1&&(i=i[0]),t){var a={};r.forEach(r.keys(o),function(t){a[t]=o[t]}),a[n]=i,e(t,a),e=function(){}}else o[n]=i,r.setImmediate(u)},f=i.slice(0,Math.abs(i.length-1))||[],l=function(){return r.reduce(f,function(t,e){return t&&o.hasOwnProperty(e)},!0)&&!o.hasOwnProperty(n)};if(l())i[i.length-1](a,o);else{var h=function(){l()&&(c(h),i[i.length-1](a,o))};s(h)}})},this.retry=function(e,n,i){var r=5,o=[];"function"==typeof e&&(i=n,n=e,e=r),e=parseInt(e,10)||r;var a=function(r,a){for(var s=function(t,e){return function(n){t(function(t,i){n(!t||e,{err:t,result:i})},a)}};e;)o.push(s(n,!(e-=1)));t.series(o,function(t,e){e=e[e.length-1],(r||i)(e.err,e.result)})};return i?a():a},this.waterfall=function(e,n){if(n=n||function(){},!r.isArray(e)){var i=new Error("First argument to waterfall must be an array of functions");return n(i)}if(!e.length)return n();var o=function(t){return function(e){if(e)n.apply(null,arguments),n=function(){};else{var i=Array.prototype.slice.call(arguments,1),a=t.next();a?i.push(o(a)):i.push(n),r.setImmediate(function(){t.apply(null,i)})}}};o(t.iterator(e))()};var h=function(t,e,n){if(n=n||function(){},r.isArray(e))t.map(e,function(t,e){t&&t(function(t){var n=Array.prototype.slice.call(arguments,1);n.length<=1&&(n=n[0]),e.call(null,t,n)})},n);else{var i={};t.each(r.keys(e),function(t,n){e[t](function(e){var r=Array.prototype.slice.call(arguments,1);r.length<=1&&(r=r[0]),i[t]=r,n(e)})},function(t){n(t,i)})}};this.parallel=function(e,n){h({map:t.map,each:t.each},e,n)},this.parallelLimit=function(t,e,i){h({map:c(e),each:n(e)},t,i)},this.series=function(e,n){if(n=n||function(){},r.isArray(e))t.mapSeries(e,function(t,e){t&&t(function(t){var n=Array.prototype.slice.call(arguments,1);n.length<=1&&(n=n[0]),e.call(null,t,n)})},n);else{var i={};t.eachSeries(_keys(e),function(t,n){e[t](function(e){var r=Array.prototype.slice.call(arguments,1);r.length<=1&&(r=r[0]),i[t]=r,n(e)})},function(t){n(t,i)})}},this.iterator=function(t){var e=function(n){var i=function(){return t.length&&t[n].apply(null,arguments),i.next()};return i.next=function(){return n<t.length-1?e(n+1):null},i};return e(0)},this.apply=function(t){var e=Array.prototype.slice.call(arguments,1);return function(){return t.apply(null,e.concat(Array.prototype.slice.call(arguments)))}};var d=function(t,e,n,i){var r=[];t(e,function(t,e){n(t,function(t,n){r=r.concat(n||[]),e(t)})},function(t){i(t,r)})};this.concat=i(d),this.concatSeries=a(d),this.whilst=function(e,n,i){e()?n(function(r){return r?i(r):void t.whilst(e,n,i)}):i()},this.doWhilst=function(e,n,i){e(function(r){if(r)return i(r);var o=Array.prototype.slice.call(arguments,1);n.apply(null,o)?t.doWhilst(e,n,i):i()})},this.until=function(e,n,i){e()?i():n(function(r){return r?i(r):void t.until(e,n,i)})},this.doUntil=function(e,n,i){e(function(r){if(r)return i(r);var o=Array.prototype.slice.call(arguments,1);n.apply(null,o)?i():t.doUntil(e,n,i)})},this.queue=function(t,n){function i(t,e,n,i){return t.started||(t.started=!0),_isArray(e)||(e=[e]),0==e.length?r.setImmediate(function(){t.drain&&t.drain()}):void r.forEach(e,function(e){var o={data:e,callback:"function"==typeof i?i:null};n?t.tasks.unshift(o):t.tasks.push(o),t.saturated&&t.tasks.length===t.concurrency&&t.saturated(),r.setImmediate(t.process)})}void 0===n&&(n=1);var o=0,a={tasks:[],concurrency:n,saturated:null,empty:null,drain:null,started:!1,paused:!1,push:function(t,e){i(a,t,!1,e)},kill:function(){a.drain=null,a.tasks=[]},unshift:function(t,e){i(a,t,!0,e)},process:function(){if(!a.paused&&o<a.concurrency&&a.tasks.length){var n=a.tasks.shift();a.empty&&0===a.tasks.length&&a.empty(),o+=1;var i=function(){o-=1,n.callback&&n.callback.apply(n,arguments),a.drain&&a.tasks.length+o===0&&a.drain(),a.process()},r=e(i);t(n.data,r)}},length:function(){return a.tasks.length},running:function(){return o},idle:function(){return a.tasks.length+o===0},pause:function(){a.paused!==!0&&(a.paused=!0,a.process())},resume:function(){a.paused!==!1&&(a.paused=!1,a.process())}};return a},this.priorityQueue=function(e,n){function i(t,e){return t.priority-e.priority}function o(t,e,n){for(var i=-1,r=t.length-1;r>i;){var o=i+(r-i+1>>>1);n(e,t[o])>=0?i=o:r=o-1}return i}function a(t,e,n,a){return t.started||(t.started=!0),_isArray(e)||(e=[e]),0==e.length?r.setImmediate(function(){t.drain&&t.drain()}):void r.forEach(e,function(e){var s={data:e,priority:n,callback:"function"==typeof a?a:null};t.tasks.splice(o(t.tasks,s,i)+1,0,s),t.saturated&&t.tasks.length===t.concurrency&&t.saturated(),r.setImmediate(t.process)})}var s=t.queue(e,n);return s.push=function(t,e,n){a(s,t,e,n)},delete s.unshift,s},this.cargo=function(t,e){var n=!1,i=[],o={tasks:i,payload:e,saturated:null,empty:null,drain:null,drained:!0,push:function(t,n){r.isArray(t)||(t=[t]),r.forEach(t,function(t){i.push({data:t,callback:"function"==typeof n?n:null}),o.drained=!1,o.saturated&&i.length===e&&o.saturated()}),r.setImmediate(o.process)},process:function a(){if(!n){if(0===i.length)return o.drain&&!o.drained&&o.drain(),void(o.drained=!0);var s="number"==typeof e?i.splice(0,e):i.splice(0,i.length),c=r.map(s,function(t){return t.data});o.empty&&o.empty(),n=!0,t(c,function(){n=!1;var t=arguments;r.forEach(s,function(e){e.callback&&e.callback.apply(null,t)}),a()})}},length:function(){return i.length},running:function(){return n}};return o};var p=function(t){return function(e){var n=Array.prototype.slice.call(arguments,1);e.apply(null,n.concat([function(e){var n=Array.prototype.slice.call(arguments,1);"undefined"!=typeof console&&(e?console.error&&console.error(e):console[t]&&r.forEach(n,function(e){console[t](e)}))}]))}};this.log=p("log"),this.dir=p("dir"),this.memoize=function(t,e){var n={},i={};e=e||function(t){return t};var o=function(){var o=Array.prototype.slice.call(arguments),a=o.pop(),s=e.apply(null,o);s in n?r.nextTick(function(){a.apply(null,n[s])}):s in i?i[s].push(a):(i[s]=[a],t.apply(null,o.concat([function(){n[s]=arguments;var t=i[s];delete i[s];for(var e=0,r=t.length;r>e;e++)t[e].apply(null,arguments)}])))};return o.memo=n,o.unmemoized=t,o},this.unmemoize=function(t){return function(){return(t.unmemoized||t).apply(null,arguments)}},this.times=function(e,n,i){for(var r=[],o=0;e>o;o++)r.push(o);return t.map(r,n,i)},this.timesSeries=function(e,n,i){for(var r=[],o=0;e>o;o++)r.push(o);return t.mapSeries(r,n,i)},this.seq=function(){var e=arguments;return function(){var n=this,i=Array.prototype.slice.call(arguments),r=i.pop();t.reduce(e,i,function(t,e,i){e.apply(n,t.concat([function(){var t=arguments[0],e=Array.prototype.slice.call(arguments,1);i(t,e)}]))},function(t,e){r.apply(n,[t].concat(e))})}},this.compose=function(){return t.seq.apply(null,Array.prototype.reverse.call(arguments))};var v=function(t,e){var n=function(){var n=this,i=Array.prototype.slice.call(arguments),r=i.pop();return t(e,function(t,e){t.apply(n,i.concat([e]))},r)};if(arguments.length>2){var i=Array.prototype.slice.call(arguments,2);return n.apply(this,i)}return n};this.applyEach=i(v),this.applyEachSeries=a(v),this.forever=function(t,e){function n(i){if(i){if(e)return e(i);throw i}t(n)}n()}}.call(n.exports)})}("function"==typeof define?define:function(t,e,n){n(require,exports,module)}),function(t){"use strict";t("latte_lib/coding/base64.js",["require","exports","module","window"],function(t,e,n,i){(function(){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";this.encode=function(n){var i,r,o,a,s,c,u,f="",l=0;for(n=t("./utf8").encode(n);l<n.length;)i=n.charCodeAt(l++),r=n.charCodeAt(l++),o=n.charCodeAt(l++),a=i>>2,s=(3&i)<<4|r>>4,c=(15&r)<<2|o>>6,u=63&o,isNaN(r)?c=u=64:isNaN(o)&&(u=64),f=f+e.charAt(a)+e.charAt(s)+e.charAt(c)+e.charAt(u);return f},this.decode=function(n){var i,r,o,a,s,c,u,f="",l=0;for(n=n.replace(/[^A-Za-z0-9\+\/\=]/g,"");l<n.length;)a=e.indexOf(n.charAt(l++)),s=e.indexOf(n.charAt(l++)),c=e.indexOf(n.charAt(l++)),u=e.indexOf(n.charAt(l++)),i=a<<2|s>>4,r=(15&s)<<4|c>>2,o=(3&c)<<6|u,f+=String.fromCharCode(i),64!=c&&(f+=String.fromCharCode(r)),64!=u&&(f+=String.fromCharCode(o));return f=t("./utf8").decode(f)}}).call(n.exports)})}("function"==typeof define?define:function(t,e,n){n(require,exports,module)}),function(t){"use strict";t("latte_lib/coding/hex.js",["require","exports","module","window"],function(t,e,n,i){(function(){this.encode=function(t){for(var e="0123456789ABCDEF",n=16,i=t.length,r="",o=0;i>o;o++){var a=parseInt(t.charCodeAt(o),10);r+="%"+Math.floor(a/n)+e.charAt(a%n)}return r},this.decode=function(t){for(var e=t.split("%"),n="",i=1;e[i];i++)n+=String.fromCharCode(parseInt(e[i],16));return n}}).call(n.exports)})}("function"==typeof define?define:function(t,e,n){n(require,exports,module)}),function(t){"use strict";t("latte_lib/coding/utf8.js",["require","exports","module","window"],function(t,e,n,i){(function(){function t(t,e){return s(t>>e&63|128)}function e(e){if(0==(4294967168&e))return s(e);var n="";return 0==(4294965248&e)?n=s(e>>6&31|192):0==(4294901760&e)?(n=s(e>>12&15|224),n+=t(e,6)):0==(4292870144&e)&&(n=s(e>>18&7|240),n+=t(e,12),n+=t(e,6)),n+=s(63&e|128)}function n(){if(a>=o)throw Error("Invalid byte index");var t=255&r[a];if(a++,128==(192&t))return 63&t;throw Error("Invalid continuation byte")}function i(){var t,e,i,s,c;if(a>o)throw Error("Invalid byte index");if(a==o)return!1;if(t=255&r[a],a++,0==(128&t))return t;if(192==(224&t)){var e=n();if(c=(31&t)<<6|e,c>=128)return c;throw Error("Invalid continuation byte")}if(224==(240&t)){if(e=n(),i=n(),c=(15&t)<<12|e<<6|i,c>=2048)return c;throw Error("Invalid continuation byte")}if(240==(248&t)&&(e=n(),i=n(),s=n(),c=(15&t)<<18|e<<12|i<<6|s,c>=65536&&1114111>=c))return c;throw Error("Invalid UTF-8 detected")}this.version="0.0.1";var r,o,a,s=String.fromCharCode,c=this.ucs2encode=function(t){for(var e,n=t.length,i=-1,r="";++i<n;)e=t[i],e>65535&&(e-=65536,r+=s(e>>>10&1023|55296),e=56320|1023&e),r+=s(e);return r},u=this.ucs2decode=function(t){for(var e,n,i=[],r=0,o=t.length;o>r;)e=t.charCodeAt(r++),e>=55296&&56319>=e&&o>r?(n=t.charCodeAt(r++),56320==(64512&n)?i.push(((1023&e)<<10)+(1023&n)+65536):(i.push(e),r--)):i.push(e);return i};this.encode=function(t){for(var n,i=u(t),r=i.length,o=-1,a="";++o<r;)n=i[o],a+=e(n);return a},this.decode=function(t){r=u(t),o=r.length,a=0;for(var e,n=[];(e=i())!==!1;)n.push(e);return c(n)}}).call(n.exports)})}("function"==typeof define?define:function(t,e,n){n(require,exports,module)}),function(t){"use strict";t("latte_lib/debug.js",["require","exports","module","window"],function(t,e,n,i){var r=function(t){var e=t.toString().split("\n")[2],n=e.substring(e.indexOf("(")+1,e.indexOf(")"));return n},o=t("./lib.js"),a=o.isWindow?!i.debug:-1==process.argv.indexOf("-debug"),s={};["log","info","error","warn"].forEach(function(t){s[t]=function(){if(!a){var e=new Error("debug");console[t].apply(console[t],[r(e.stack)].concat(Array.prototype.slice.call(arguments)))}}}),n.exports=s})}("function"==typeof define?define:function(t,e,n){n(require,exports,module)}),function(t){"use strict";t("latte_lib/events.js",["require","exports","module","window"],function(t,e,n,i){var r,o=t("./lib.js");if(o.isWindow){var r=function(){this._events=this._events||{}};(r["interface"]=function(){this.on=this.addEventListener=function(t,e){return this._events=this._events||{},(this._events[t]=this._events[t]||[]).push(e),this},this.once=function(t,e){function n(){i.off(t,n),e.apply(this,arguments)}var i=this;return this._events=this._events||{},n.fn=e,this.on(t,n),this},this.off=this.removeListener=this.removeAllListeners=this.removeEventListener=function(t,e){if(this._events=this._events||{},0==arguments.length)return this._events={},this;var n=this._events[t];if(!n)return this;if(1==arguments.length)return delete this._events[t],this;for(var i,r=0;r<n.length;r++)if(i=n[r],i===e||i.fn===e){n.splice(r,1);break}return this},this.emit=function(t){this._events=this._events||{};var e=[].slice.call(arguments,1),n=this._events[t];if(n){n=n.slice(0);for(var i=0,r=n.length;r>i;++i)n[i].apply(this,e)}return this},this.listeners=function(t){return this._events=this._events||{},this._events[t]||[]},this.hasListeners=function(t){return!!this.listeners(t).length},this.hasEvent=function(t,e){return-1!=this.listeners(t).indexOf(e)}}).call(r.prototype)}else r=t("events").EventEmitter;n.exports=r})}("function"==typeof define?define:function(t,e,n){n(require,exports,module)}),function(t){"use strict";t("latte_lib/format.js",["require","exports","module","window"],function(t,e,n,i){var r=t("./lib.js");(function(){function t(t,e){for(var n=t+"";n.length<e;)n="0"+n;return n}function n(e){return t(e,2)}function i(t){var e=Math.abs(t.getTimezoneOffset()),n=String(Math.floor(e/60)),i=String(e%60);return 1==n.length&&(n="0"+n),1==i.length&&(i="0"+i),t.getTimezoneOffset()<0?"+"+n+i:"-"+n+i}var o=this;this.ISO8601_FORMAT="yyyy-MM-dd hh:mm:ss.SSS",this.ISO8601_WITH_TZ_OFFSET_FORMAT="yyyy-MM-ddThh:mm:ssO",this.DATETIME_FORMAT="hh:mm:ss.SSS",this.getDateReplace=function(e,r,o){r=r||"",o=o||"";var a=n(e.getDate()),s=n(e.getMonth()+1),c=n(e.getFullYear()),u=n(e.getFullYear().toString().substring(2,4)),f=n(e.getHours()),l=n(e.getMinutes()),h=n(e.getSeconds()),d=t(e.getMilliseconds(),3),p=i(e),v={};return v[r+"dd"+o]=a,v[r+"MM"+o]=s,v[r+"yyyy"+o]=c,v[r+"y{1,4}"+o]=u,v[r+"hh"+o]=f,v[r+"mm"+o]=l,v[r+"ss"+o]=h,v[r+"SSS"+o]=d,v[r+"O"+o]=p,v},this.dateFormat=function(t,n){n||(n=t||new Date,t=e.ISO8601_FORMAT);var i=t,a=o.getDateReplace(n);return r.jsonForEach(a,function(t,e){i=i.replace(new RegExp(t,"g"),e)}),i};var a=function(t,e){var n=[];if(e>0)for(var i=0;e>i;i++)n.push(t);return n.join("")},s=function(t,e,n,i){var o=i?a(n.t,e-1):"";if(null===t||void 0===t)return o+"null";switch(r.getClassName(t)){case"array":for(var c=a(n.t,e-1),u=[n.n+c+"["+n.n],f=[],l=0,h=t.length;h>l;l++)f.push(s(t[l],e+1,n,!0));return u.push(f.join(","+n.n)),u.push(n.n+c+"] "),u.join("");case"object":var d=[];for(var p in t)if(void 0!=t[p]){var u=[],c=a(n.t,e);u.push(c),u.push('"'+p+'" : ');var v=t[p];u.push(s(v,e+1,n)),d.push(u.join(""))}return(e>1&&!i?n.n:"")+a(n.t,e-1)+"{"+n.n+d.join(","+n.n)+n.n+a(n.t,e-1)+"}";case"number":return o+t.toString();case"boolean":return o+t.toString().toLowerCase();case"function":return"[Function]";default:return o+('"'+t.toString()+'"')}},c={n:"\n",t:"	"};this.jsonFormat=function(t,e){e=r.merger(c,e);try{return s(t,1,e)}catch(n){throw t}},this.templateStringFormat=function(t,e){var n=t;for(var i in e)n=n.replace(new RegExp("{{"+i+"}}","igm"),e[i]);return n},this.templateJsonFormat=function(t,e){var t=JSON.stringify(t),n=o.templateStringFormat(t,e);return JSON.parse(n)}}).call(n.exports)})}("function"==typeof define?define:function(t,e,n){n(require,exports,module)}),function(t){"use strict";t("latte_lib/index.js",["require","exports","module","window"],function(t,e,n,i){n.exports=t("./lib.js"),function(){this.isWindow||(this.fs=t("./old/fs")),this.utf8=t("./coding/utf8"),this.async=t("./async"),this.events=t("./events"),this.format=t("./format"),this.removeIdle=t("./old/removeIdle"),this.queue=t("./old/queue"),this.base64=t("./coding/base64"),this.debug=t("./debug"),this.xhr=t("./old/xhr"),this.object=t("./object")}.call(n.exports)})}("function"==typeof define?define:function(t,e,n){n(require,exports,module)}),function(t){"use strict";t("latte_lib/lib.js",["require","exports","module","window"],function(t,e,n,i){(function(){this.isWindow=function(){try{if(i)return!0}catch(t){return!1}try{if(process)return!1}catch(t){return!0}return!1}();var e=this;e.trace=console.trace||function(t){var e=arguments.callee.caller,n=0;for(t=t||10,console.log("***----------------------------------------  ** "+(n+1));e&&t>n;)console.log(e.toString()),e=e.caller,n++,console.log("***----------------------------------------  ** "+(n+1))},this.setImmediate=this.nextTick=function(){return"undefined"!=typeof process&&process.nextTick?process.nextTick:i&&"function"==typeof i.setImmediate?i.setImmediate:function(t){setTimeout(t,0)}}(),this.inherits=function(t,e){if("function"==typeof Object.create)t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}});else{t.super_=e;var n=function(){};n.prototype=e.prototype,t.prototype=new n,t.prototype.constructor=t}},this.forEach=function(t,e){if(t.forEach)return t.forEach(e);for(var n=0,i=t.length;i>n;n++)e(t[n],n,t)},this.keys=function(t){if(Object.keys)return Object.keys(t);var e=[];for(var n in t)t.hasOwnProperty(n)&&e.push(n);return e},this.copyArray=function(t){return t.concat([])},this.indexOf=function(t,e){if(t.indexOf)return t.indexOf(e);for(var n=0,i=t.length;i>n;n++)if(t[n]===e)return n;return-1},this.removeArray=function(t,n,i){var r=e.copyArray(t);return e.removeLocalArray(r,n,i),r},this.removeLocalArray=function(t,e,n){return n=n||e,t.splice(e,n-e+1),t},this.inserLocalArray=function(t,e,n){return t.splice(e,0,n),t},this.copy=function(t){return JSON.parse(JSON.stringify(t))},this.clone=function(t){var n;n=e.isArray(t)?[]:{};for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);return n},this.reduce=function(t,n,i){return t.reduce?t.reduce(n,i):(e.forEach(t,function(t,e,r){i=n(i,t,e,r)}),i)},this.map=function(t,n){if(t.map)return t.map(n);var i=[];return e.forEach(t,function(t,e,r){i.push(n(t,e,r))}),i},this.jsonForEach=function(t,e){this.keys(t).forEach(function(n){e(n,t[n])})},this.getChar=function(t,e){var n=t.split("");return n[e]},Function.prototype.bind||(Function.prototype.bind=function(t){var e=Array.prototype.slice.call(arguments,1),n=this;return function(){n.apply(t,e.concat(Array.prototype.slice.call(arguments)))}}),this.isObject=function(t){return t?t.constructor==Object:!1},this.isArray=function(t){if(Array.isArray)return Array.isArray(t);throw"no handle isArray"},this.isDate=function(t){return t.constructor==Date},["String","Function","Boolean","Number"].forEach(function(t){e["is"+t]=function(e){return typeof e==t.toLowerCase()}}),this.getClassName=function(t){if(t){for(var n=["Array","String","Number","Date","Boolean","Function"],i=0,r=n.length;r>i;i++)if(e["is"+n[i]](t))return n[i].toLowerCase();return"object"}},this.merger=function(t){var t=e.clone(t);return Array.prototype.slice.call(arguments,1).forEach(function(e){e&&Object.keys(e).forEach(function(n){t[n]=e[n]})}),t},this.getErrorString=function(e){if(e.stack)return e.stack.toString();if(latte_lib.isString(e))return e.toString();var n;try{n=JSON.stringify(e)}catch(i){var r=t("util");n=r.inspect(e)}return n},this.defineProperties=Object.defineProperties||function(t,e){function n(e){function n(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function i(t){return"function"==typeof t}if("object"!=typeof e||null===e)throw new TypeError("不是正规的对象");var r={};if(n(e,"enumerable")&&(r.enumerable=!!t.enumerable),n(e,"configurable")&&(r.configurable=!!t.configurable),n(e,"value")&&(r.value=t.value),n(e,"writable")&&(r.writable=!!e.writable),n(e,"get")){var o=e.get;if(!i(o)&&"undefined"!==o)throw new TypeError("bad get");r.get=o}if(n(e,"set")){var a=e.set;if(!i(a)&&"undefined"!==a)throw new TypeError("bad set");r.set=a}if(("get"in r||"set"in r)&&("value"in r||"writable"in r))throw new TypeError("identity-confused descriptor");return r}if("object"!=typeof t||null===t)throw new TypeError("不是正规的对象");e=Object(e);for(var i=Object.keys(e),r=[],o=0;o<i.length;o++)r.push([i[o],n(e[i[o]])]);for(var o=0;o<r.length;o++)Object.defineProperty(t,r[o][0],r[o][1]);return t}}).call(n.exports)})}("function"==typeof define?define:function(t,e,n){n(require,exports,module)}),function(t){"use strict";t("latte_lib/object.js",["require","exports","module","window"],function(t,e,n,i){var r=t("./lib.js"),o=t("./events.js"),a=function(t){var e=this;this.childEvents={},e.data={};var n=function(n,i){e.childEvents[n]=function(i,r,o){e.emit(n+"."+i,r,o,t),e.emit("change",n+"."+i,r,o,t)},i.on("change",e.childEvents[n])},i=function(t,n){a.isLatteObject(n)&&(n.off("change",e.childEvents[t]),delete e.childEvents[t])};!function(){for(var i in t){var r=a.create(t[i]);r?(n(i,r),e.data[i]=r):e.data[i]=t[i]}}();var o=function(o,s,c){if(r.isArray(o)||(o=o.toString().split(".")),1!=o.length){var u=o.shift();return e.get(u).set(o,s,c)}var f,u=o[0],l=e.data[u];t[u];switch(c){case 1:break;default:i(u,l);var f=a.create(s);return f?n(u,f):f=s,e.data[u]=f,t[u]=s,{ov:l,nv:f}}};this._set=o,this.set=function(t,n,i){var r=o(t,n);return e.emit(t,r.nv,r.ov),e.emit("change",t,r.nv,r.ov),r},this.get=function(t){if("this"==t&&!e.data[t])return e;r.isArray(t)||(t=t.toString().split("."));if(1==t.length)return e.data[t[0]];var n=t.shift();return e.data[n].get(t)},this.toJSON=function(){return t},this.getKeys=function(){return Object.keys(e.data)}};(function(){this.isLatteArray=function(e){var n=t("./array");return e.constructor==n},this.isLatteObject=function(e){t("./array");return e&&(e.constructor==a||e.constructor==t("./array"))},this.getType=function(t){return a.isLatteObject(t)?"LatteObject":Array.isArray(t)?"Array":t&&t.constructor==Object?"Object":void 0},this.create=function(e){var n=t("./array");switch(a.getType(e)){case"LatteObject":return e;case"Array":return new n(e);case"Object":return new a(e);default:return null}}}).call(a),r.inherits(a,o),n.exports=a})}("function"==typeof define?define:function(t,e,n){n(require,exports,module)}),function(t){"use strict";t("latte_lib/object_.js",["require","exports","module","window"],function(t,e,n,i){var r=t("./lib.js"),o=t("./events.js"),a=function(t){var e=this;this.data=[];var n=function(n,i,r){var o=e.data.indexOf(this);e.emit(o+"."+n,i,r,t),e.emit("change",o+"."+n,i,r,t)};t.forEach(function(t,i){var r=c.create(t);r?(r.on("change",n),e.data[i]=r):e.data[i]=t});var i=function(i,o){if(r.isArray(i)||(i=i.toString().split(".")),1==i.length){var a,u=i[0],f=e.data[u];if(c.isLatteArray(o))if(c.isLatteObject(f))if(c.isLatteArray(f)){var l=f.getKeys(),h=o.getKeys(),d=s(l,h);d.oa.forEach(function(t){e.data[u].set(t,null)}),h.forEach(function(t){e.data[u].set(t,o.get(t))})}else e.data[u]=o,t[u]=o.toJSON();else f.off("change",n),e.data[u]=o,t[u]=o.toJSON();else if(c.isLatteObject(o))if(c.isLatteObject(f))if(c.isLatteArray(f))f.off("change",n),e.data[u]=o,t[u]=o.toJSON();else{var d=(f.getKeys(),o.getKeys(),s(l,h));d.oa.forEach(function(t){e.data[u].set(t,null)}),h.forEach(function(t){e.data[u].set(t,o.get(t))})}else e.data[u]=o,t[u]=o.toJSON();else if(r.isObject(o)){var p=function(){var i=c.create(o);e.data[u]=i,t[u]=o,i.on("change",n)};if(c.isLatteObject(f))if(c.isLatteArray(f))f.off("change",n),p();else{var h=Object.keys(o),l=Object.keys(t[u]),d=s(l,h);d.oa.forEach(function(t){e.data[u].set(t,null)}),h.forEach(function(t){e.data[u].set(t,o[t])})}else p()}else if(r.isArray(o)){var p=function(){var i=c.create(o);i.on("change",n),e.data[u]=i,t[u]=o};if(c.isLatteObject(f))if(c.isLatteArray(f)){var h=Object.keys(o),l=Object.keys(t[u]),d=s(l,h);d.oa.forEach(function(t){e.data[u].set(t,null)}),h.forEach(function(t){e.data[u].set(t,o[t])})}else f.off("change",n),p();else p()}else c.isLatteObject(f)&&f.off("change",n),a=o,e.data[u]=o,t[u]=o;return{ov:f,nv:a}}var u=i.shift();return e.get(u).set(i,o)};this.get=function(t){if("this"==t&&!e.data[t])return e.data;r.isArray(t)||(t=t.toString().split("."));if(1==t.length)return e.data[t[0]];var n=t.shift();return e.data[n].get(t)},this._set=i,this.set=function(t,n){var r=i(t,n);return e.emit("set",t,r.nv,r.ov),e.emit("change",t,r.nv,r.ov),r},this.push=function(t){var n=e.data.length,r=i(n,t);e.emit("push",n,r.nv),e.emit("change",n,r.nv)},this.pop=function(){var t=i(e.length-1,null);e.data.pop(),e.emit("pop",t.ov),e.emit("change",e.length,null,t.ov)},this.shift=function(){var t=e.data.shift();t.off("change",n),e.emit("shift",t);for(var i=0,r=e.data.length;r>i;i++)e.emit("change",i,e.data[i]);
e.emit("change",e.data.length,null)},this.unshift=function(){var t=Array.prototype.map.call(arguments,function(t){var e=c.create(t);return e&&e.on("change",n),e||t});e.data.unshift.apply(e.data,t),e.emit.apply(e,["unshift"].concat(t));for(var i=0,r=e.data.length;r>i;i++)e.emit("change",i,e.data[i])},this.splice=function(t,i){var r=e.data.length,o=Array.prototype.splice.call(arguments,2),a=o.map(function(t){var e=c.create(t);return e&&e.on("change",n),e||t});e.data.splice.apply(e.data,[t,i].concat(a)),console.log(["splice",t,i].concat(a)),e.emit.apply(e,["splice",t,i].concat(a));for(var s=0,u=Math.max(r,e.data.length);u>s;s++)e.emit("change",s,e.data[s])},this.toJSON=function(){return t},this.indexOf=function(t){return e.data.indexOf(t)},this.forEach=function(t){e.data.forEach(t)},this.map=function(t){return e.data.map(t)},Object.defineProperty(e,"length",{get:function(){return e.data.length},set:function(t){throw new Error("暂时没处理")}}),this.getKeys=function(){return Object.keys(e.data)}};r.inherits(a,o),function(){}.call(a.prototype);var s=function(t,e){var n=[],i=r.copy(e),o=[];return t.forEach(function(t,e){var r=i.indexOf(t);-1!=r?(i.splice(r,1),o.push(t)):n.push(t)}),{oa:n,na:i,sa:o}},c=function(t){var e=this;this.childEvents={},e.data={};for(var n in t){var i=c.create(t[n]);i?(e.childEvents[n]=function(i,r,o){e.emit(n+"."+i,r,o,t),e.emit("change",n+"."+i,r,o,t)},i.on("change",e.childEvents[n]),e.data[n]=i):e.data[n]=t[n]}var o=function(n,i){r.isArray(n)||(n=n.toString().split("."));var o=n[0];if(1==n.length){var a,u=e.data[o];t[o];if(c.isLatteArray(i))if(c.isLatteObject(u))if(c.isLatteArray(u)){var f=u.getKeys(),l=i.getKeys(),h=s(f,l);h.oa.forEach(function(t){e.data[o].set(t,null)}),l.forEach(function(t){e.data[o].set(t,i.get(t))})}else e.data[o]=i,t[o]=i.toJSON();else u.off("change",e.childEvents[n]),e.data[o]=i,t[o]=i.toJSON();else if(c.isLatteObject(i))if(c.isLatteObject(u))if(c.isLatteArray(u))u.off("change",e.childEvents[n]),e.data[o]=i,t[o]=i.toJSON();else{var h=(u.getKeys(),i.getKeys(),s(f,l));h.oa.forEach(function(t){e.data[o].set(t,null)}),l.forEach(function(t){e.data[o].set(t,i.get(t))})}else e.data[o]=i,t[o]=i.toJSON();else if(r.isObject(i)){var d=function(){var n=c.create(i);e.childEvents[o]=function(n,i,r){e.emit(o+"."+n,i,r,t),e.emit("change",o+"."+n,i,r,t)},n.on("change",e.childEvents[o]),e.data[o]=n,t[o]=i};if(c.isLatteObject(u))if(c.isLatteArray(u))u.off("change",e.childEvents[n]),d();else{var l=Object.keys(i),f=Object.keys(t[o]),h=s(f,l);h.oa.forEach(function(t){e.data[o].set(t,null)}),l.forEach(function(t){e.data[o].set(t,i[t])})}else d()}else if(r.isArray(i)){var d=function(){var n=c.create(i);e.childEvents[o]=function(n,i,r){e.emit(o+"."+n,i,r,t),e.emit("change",o+"."+n,i,r,t)},n.on("change",e.childEvents[o]),e.data[o]=n,t[o]=i};if(c.isLatteObject(u))if(c.isLatteArray(u)){var l=Object.keys(i),f=Object.keys(t[o]),h=s(f,l);h.oa.forEach(function(t){e.data[o].set(t,null)}),l.forEach(function(t){e.data[o].set(t,i[t])})}else u.off("change",e.childEvents[n]),d();else d()}else c.isLatteObject(u)&&u.off("change",e.childEvents[n]),a=i,null==i?(delete e.data[n[0]],delete t[n[0]]):(e.data[n[0]]=i,t[n[0]]=i);return{ov:u,nv:a}}var o=n.shift();return e.get(o).set(n,i)};this._set=o,this.set=function(t,n){var i=o(t,n);return e.emit(t,i.nv,i.ov),e.emit("change",t,i.nv,i.ov),i},this._set_=function(i,r){t[i]=r;var o=e.data[i];c.isLatteObject(o)&&e.data[i].off("change",e.childEvents[i]);var a=c.create(r);return a?(e.childEvents[i]=function(t,r,o){e.emit(n+"."+t,r,o,e.data[i]),e.emit("change",n+"."+t,r,o,e.data[i])},a.on("change",e.childEvents[i]),e.data[i]=a):(a=r,e.data[i]=r),{ov:o,nv:a}},this.get=function(t){if("this"==t&&!e.data[t])return e.data;r.isArray(t)||(t=t.toString().split("."));if(1==t.length)return e.data[t[0]];var n=t.shift();return e.data[n].get(t)},this.toJSON=function(){return t},this.getKeys=function(){return Object.keys(e.data)}};r.inherits(c,o),function(){}.call(c.prototype),function(){this.isLatteArray=function(t){return t.constructor==a},this.isLatteObject=function(t){return t&&(t.constructor==c||t.constructor==a)},this.getType=function(t){return c.isLatteObject(t)?"LatteObject":Array.isArray(t)?"Array":t&&t.constructor==Object?"Object":void 0},this.create=function(t){switch(c.getType(t)){case"LatteObject":return t;case"Array":return new a(t);case"Object":return new c(t);default:return null}}}.call(c),n.exports=c})}("function"==typeof define?define:function(t,e,n){n(require,exports,module)}),function(t){"use strict";t("latte_lib/old/blobBuilder.js",["require","exports","module","window"],function(t,e,n,i){var r=i;r.URL=r.URL||r.webkitURL;var o=r.BlobBuilder||r.WebKitBlobBuilder||r.MozBlobBuilder||function(t){var e=function(t){return Object.prototype.toString.call(t).match(/^\[object\s(.*)\]$/)[1]},n=function(){this.data=[]},i=function(t,e,n){this.data=t,this.size=t.length,this.type=e,this.encoding=n},r=n.prototype,o=i.prototype,a=t.FileReaderSync,s=function(t){this.code=this[this.name=t]},c="NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR".split(" "),u=c.length,f=t.URL||t.webkitURL||t,l=f.createObjectURL,h=f.revokeObjectURL,d=f,p=t.btoa,v=t.atob,y=t.ArrayBuffer,g=t.Uint8Array,m=/^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/;for(i.fake=o.fake=!0;u--;)s.prototype[c[u]]=u+1;return f.createObjectURL||(d=t.URL=function(t){var e,n=document.createElementNS("http://www.w3.org/1999/xhtml","a");return n.href=t,"origin"in n||("data:"===n.protocol.toLowerCase()?n.origin=null:(e=t.match(m),n.origin=e&&e[1])),n}),d.createObjectURL=function(t){var e,n=t.type;return null===n&&(n="application/octet-stream"),t instanceof i?(e="data:"+n,"base64"===t.encoding?e+";base64,"+t.data:"URI"===t.encoding?e+","+decodeURIComponent(t.data):p?e+";base64,"+p(t.data):e+","+encodeURIComponent(t.data)):l?l.call(f,t):void 0},d.revokeObjectURL=function(t){"data:"!==t.substring(0,5)&&h&&h.call(f,t)},r.append=function(t){var n=this.data;if(g&&(t instanceof y||t instanceof g)){for(var r="",o=new g(t),c=0,u=o.length;u>c;c++)r+=String.fromCharCode(o[c]);n.push(r)}else if("Blob"===e(t)||"File"===e(t)){if(!a)throw new s("NOT_READABLE_ERR");var f=new a;n.push(f.readAsBinaryString(t))}else t instanceof i?"base64"===t.encoding&&v?n.push(v(t.data)):"URI"===t.encoding?n.push(decodeURIComponent(t.data)):"raw"===t.encoding&&n.push(t.data):("string"!=typeof t&&(t+=""),n.push(unescape(encodeURIComponent(t))))},r.getBlob=function(t){return arguments.length||(t=null),new i(this.data.join(""),t,"raw")},r.toString=function(){return"[object BlobBuilder]"},o.slice=function(t,e,n){var r=arguments.length;return 3>r&&(n=null),new i(this.data.slice(t,r>1?e:this.data.length),n,this.encoding)},o.toString=function(){return"[object Blob]"},o.close=function(){this.size=0,delete this.data},n}(r);r.Blob=function(t,e){var n=e?e.type||"":"",i=new o;if(t)for(var r=0,a=t.length;a>r;r++)i.append(t[r]);return i.getBlob(n)},n.exports=o})}("function"==typeof define?define:function(t,e,n){n(require,exports,module)}),function(t){"use strict";t("latte_lib/old/buffer.js",["require","exports","module","window"],function(t,e,n,i){if(i){var r=t("../coding/utf8"),o=function(){function t(t,e,n){if(t%1!==0||0>t)throw new RangeError("offset is not uint");if(t+e>n)throw new RangeError("Trying to access beyond buffer length")}function e(t,e,n,i,r,o){if(e%1!==0||e>r||o>e)throw TypeError("value is out of bounds");if(n%1!==0||0>n)throw TypeError("offset is not uint");if(n+i>t.length||t.length+n<0)throw RangeError("Trying to write outside buffer length")}this.slice=function(t,e){var n=Array.prototype.slice.call(this,t,e);return new a(n)},this.readInt32LE=function(e,n){return n||t(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},this.readInt16LE=function(e,n){n||t(e,2,this.length);var i=this[e]|this[e+1]<<8;return 32768&i?4294901760|i:i},this.writeInt32LE=function(t,n,i){i||e(this,t,n,4,2147483647,-2147483648),this[n]=t,this[n+1]=t>>>8,this[n+2]=t>>>16,this[n+3]=t>>>24},this.writeInt16LE=function(t,n,i){i||e(this,t,n,2,32767,-32768),this[n]=t,this[n+1]=t>>>8},this.copy=function(t,e,n,i){for(var n=n||0,i=i||this.length,r=0,o=i-n;o>=r;r++)t[e+r]=this[n+r]},this.toString=function(t,e,n){switch(t){default:var i=r.ucs2encode(this);return i}}},a=function(t){var t=new Uint8Array(t);return o.call(t),t};(function(){this.create=function(t){if("string"==typeof t){var t=r.ucs2decode(t),e=new a(t.length);return t.forEach(function(t,n){e[n]=t}),e}}}).call(a),n.exports=a}else n.exports=a})}("function"==typeof define?define:function(t,e,n){n(require,exports,module)}),function(t){"use strict";t("latte_lib/old/fs.js",["require","exports","module","window"],function(t,e,n,i){var r=t("fs"),o=t("path");(function(){var t=this;for(var e in r)t[e]=r[e];this.exists=function(t,e){return r.exists(t,e)},this.existsSync=function(t){return r.existsSync(t)},this.mkdirSync=function(e,n){if(t.existsSync(e))return null;if(!t.existsSync(o.dirname(e))){var i=t.mkdirSync(o.dirname(e),n);if(i)return i}return r.mkdirSync(e,n)},this.writeFileSync=function(e,n){var i=t.mkdirSync(o.dirname(e));return i?i:r.writeFileSync(e,n,{encoding:"utf8"})},this.writeFile=function(e,n,i){t.mkdir(o.dirname(e),null,function(){r.writeFile(e,n,{encoding:"utf8"},i)})},this.readFile=function(t,e){return r.readFile(t,function(t,n){e(t,n?n.toString():null)})},this.readFileSync=function(t){return r.readFileSync(t).toString()},this.mkdir=function(e,n,i){t.exists(e,function(a){a?i(null,e):t.mkdir(o.dirname(e),n,function(t){return t?i(t):void r.mkdir(e,n,i)})})},this.copyFile=function(e,n,i){try{var a=r.createReadStream(e);t.mkdir(o.dirname(n),null,function(t){var e=r.createWriteStream(n);a.pipe(e),i(null)})}catch(s){i(s)}},this.copyDir=function(t,e,n){},this.fileType=function(t){return o.extname(t).substring(1)},this.lstatSync=function(t){return r.lstatSync(t)},this.readdirSync=function(t){return r.readdirSync(t)},this.realpathSync=function(t,e){return r.realpathSync(t,e)},this.appendFile=function(t,e,n,i){return r.appendFile(t,e,n,i)},this.appendFileSync=function(t,e,n){return r.appendFile(t,e,n)},this.deleteFile=function(t,e){r.unlink(t,e)},this.deleteFileSync=function(t){return r.unlinkSync(t)},this.stat=function(t,e){return r.stat(t,e)},this.createReadStream=function(t,e){return r.createReadStream(t,e)},this.createWriteStream=function(e,n){t.mkdirSync(o.dirname(e));return r.createWriteStream(e,n)},this.rename=function(t,e,n){return r.rename(t,e,n)},this.watch=function(t,e,n){return r.watch(t,e,n)},this.statSync=function(t){return r.statSync(t)},this.WriteStream=r.WriteStream}).call(n.exports)})}("function"==typeof define?define:function(t,e,n){n(require,exports,module)}),function(t){"use strict";t("latte_lib/old/promise.js",["require","exports","module","window"],function(t,e,n,i){(function(){this.defer=function(){var t,e=[];return{resolve:function(n){if(e){t=ref(n);for(var i=0,r=e.length;r>i;i++)enqueue(function(){t.then.apply(t,e[i])});e=void 0}},promise:{then:function(n,i){var r=defer();n=n||function(t){return t},i=i||function(t){return reject(t)};var o=function(t){r.resolve(n(t))},a=function(t){r.resolve(i(t))};return e?e.push([o,a]):enqueue(function(){t.then(o,a)}),r.promise}}}},this.ref=function(t){return t&&t.then?t:{then:function(e){var n=defer();return enqueue(function(){n.resolve(e(t))}),n.promise}}},this.reject=function(t){return{then:function(e,n){var i=defer();return enqueue(function(){i.resolve(n(t))}),i.promise}}},this.when=function(t,e,n){var i,r=defer();e=e||function(t){return t},n=n||function(t){return reject(t)};var o=function(t){try{return e(t)}catch(n){return reject(n)}},a=function(t){try{return n(t)}catch(t){return reject(t)}};return enqueue(function(){ref(t).then(function(t){i||(i=!0,r.resolve(ref(t).then(o,a)))},function(t){i||(i=!0,r.resolve(a(t)))})}),r.promise}}).call(n.exports)})}("function"==typeof define?define:function(t,e,n){n(require,exports,module)}),function(t){"use strict";t("latte_lib/old/queue.js",["require","exports","module","window"],function(t,e,n,i){function r(t){this._size=Math.max(0|+t,1),this.slots=[];for(var e=0;e<this._size;e++)this.slots.push([])}(function(){this.size=function(){if(null==this.total){this.total=0;for(var t=0;t<this._size;t++)this.total+=this.slots[t].length}return this.total},this.enqueue=function(t,e){var n;e=e&&0|+e||0,this.total=null,e&&(n=e,(0>e||e>=this._size)&&(e=this._size-1)),this.slots[e].push(t)},this.dequeue=function(){var t=null,e=this.slots.length;this.total=null;for(var n=0;e>n;n++)if(this.slots[n].length>0){t=this.slots[n].shift();break}return t}}).call(r.prototype),n.exports=r})}("function"==typeof define?define:function(t,e,n){n(require,exports,module)}),function(t){"use strict";t("latte_lib/old/reconnection.js",["require","exports","module","window"],function(t,e,n,i){function r(t){this.attempts=0,this.reconnecting=t.reconnecting||!1,this.openReconnect=!0,this.readyState="close",this.reconnectionDelay=t.reconnectionDelay||2e3,this.reconnectionDelayMax=t.reconnectionDelayMax||6e4}t("../lib.js");(function(){this.maybeReconnectOnOpen=function(){!this.reconnecting&&-1!=this.readyState.indexOf("close")&&this.openReconnect&&this.reconnect()},this.cleanup=function(){},this.onReconnect=function(){this.attempts;this.attempts=0,this.reconnecting=!1},this.reconnect=function(){if(this.reconnecting)return this;if(!this.openReconnect)return this;var t=this;if(this.attemptsMax&&++this.attempts>this.attemptsMax)this.reconnecting=!1,console.log("reconnecting_fail full");else{var e=this.attempts*this.reconnectionDelay;e=Math.min(e,this.reconnectionDelayMax),this.reconnecting=!0;setTimeout(function(){t.open(function(e){e?(t.reconnecting=!1,t.reconnect()):t.onReconnect()})},e)}},this.onClose=function(t){this.cleanup(),this.readyState="closed",this.openReconnect&&this.reconnect()}}).call(r.prototype),n.exports=r})}("function"==typeof define?define:function(t,e,n){n(require,exports,module)}),function(t){"use strict";t("latte_lib/old/removeIdle.js",["require","exports","module","window"],function(t,e,n,i){function r(t){this.reapIntervalMillis=t.reapIntervalMillis||1e3,this.idleTimeoutMillis=t.idleTimeoutMillis||1e4,this.refreshIdle=t.refreshIdle||!0,this.returnToHead=t.returnToHead||!1,this.scheduleRemoveIdle(),this.min=t.min||0,this.max=t.max||1e3,this.availableObjects=[],this._destroy=t.destroy||function(){},this._create=t.create,this.log=t.log||null}(function(){this.removeConditions=function(){return!0},this.ensureMinimum=function(){},this.dispense=function(){},this.getIdle=function(t){this.availableObjects=this.availableObjects.filter(function(e){return e.obj!==t})},this.size=function(){return this.availableObjects.length},this.update=function(t){for(var e=0,n=this.availableObjects.length;n>e&&this.removeConditions();e++)t==this.availableObjects[e].obj&&(this.availableObjects[e].timeout=(new Date).getTime()+this.idleTimeoutMillis)},this.release=function(t){if(this.availableObjects.some(function(e){return e.obj===t?(e.timeout=(new Date).getTime()+this.idleTimeoutMillis,!0):void 0}))return void(this.log&&this.log.error("called twice for the same resource"));var e={obj:t,timeout:(new Date).getTime()+this.idleTimeoutMillis};this.returnToHead?this.availableObjects.splice(0,0,e):this.availableObjects.push(e),this.dispense(),this.scheduleRemoveIdle()},this.removeIdle=function(){var t=[],e=(new Date).getTime(),n=this;this.removeIdleScheduled=!1;for(var i=0,r=this.availableObjects.length;r>i&&this.removeConditions();i++){var o=this.availableObjects[i].timeout;e>o&&t.push(this.availableObjects[i].obj)}for(var i=0,r=t.length;r>i;i++)n.destroy(t[i]);this.availableObjects.length>0&&this.scheduleRemoveIdle()},this.scheduleRemoveIdle=function(){this.removeIdleScheduled||(this.removeIdleScheduled=!0,this.removeIdleTimer=setTimeout(this.removeIdle.bind(this),this.reapIntervalMillis))},this.destroy=function(t){this.getIdle(t),this._destroy(t),this.ensureMinimum()},this.destroyAllNow=function(t){var e=this.availableObjects;this.availableObjects=[];for(var n=e.shift(),i=this;null!==n&&void 0!==n;)i.destroy(n.obj),n=e.shift();this.removeIdleScheduled=!1,clearTimeout(this.removeIdleTimer),t&&t()}}).call(r.prototype),n.exports=r})}("function"==typeof define?define:function(t,e,n){n(require,exports,module)}),function(t){"use strict";t("latte_lib/old/xhr.js",["require","exports","module","window"],function(t,e,n,i){var r,o,a=t("../lib"),s=t("../events"),c=function(){},u={};if(a.isWindow)o=i.XMLHttpRequest,r=function(t){this.method=t.method||"GET",this.uri=t.uri,this.data=t.data,this.async=0!=t.async,this.xd=!!t.xd,this.xs=!!t.xs,this.agent=t.agent,this.enablesXDR=t.enablesXDR,this.pfx=t.pfx,this.key=t.key,this.passphrase=t.passphrase,this.cert=t.cert,this.ca=t.ca,this.ciphers=t.ciphers,this.rejectUnauthorized=t.rejectUnauthorized,this.headers=a.merger(u,t.headers),this.create()},a.inherits(r,s),function(){this.create=function(){var t=this.xhr=new o({agent:this.agent,xdomain:this.xd,xscheme:this.xs,enablesXDR:this.enablesXDR,pfx:this.pfx,key:this.key,passphrase:this.passphrase,cert:this.cert,ca:this.ca,ciphers:this.ciphers,rejectUnauthorized:this.rejectUnauthorized}),e=this;try{t.open(this.method,this.uri,this.async),"withCredentials"in t&&(t.withCredentials=!0);try{if(this.headers)for(var n in this.headers)this.headers.hasOwnProperty(n)&&t.setRequestHeader(n,this.headers[n])}catch(i){console.log("setHeader error",i)}this.hasXDR()?(t.onload=function(){e.onLoad()},t.onerror=function(){e.onError(t.responseText)}):t.onreadystatechange=function(){4==t.readyState&&(200==t.status||1223==t.status?e.onLoad():a.nextTick(function(){e.onError(t.status)}))},t.send(this.data)}catch(i){return a.nextTick(function(){e.onError(i)})}r.requests&&(this.index=r.requests.requestsCount++,r.requests[this.index]=this)},this.onSuccess=function(){this.emit("success"),this.cleanup()},this.onData=function(t){this.emit("data",t),this.onSuccess()},this.onError=function(t){this.emit("error",t),this.cleanup(!0)},this.cleanup=function(t){if("undefined"!=typeof this.xhr&&null!=this.xhr){if(this.hasXDR()?this.xhr.onload=this.xhr.onerror=c:this.xhr.onreadystatechange=c,t)try{this.xhr.abort()}catch(e){}r.requests&&delete r.requests[this.index],this.xhr=null}},this.onLoad=function(){var e;try{var n;try{n=this.xhr.getResponseHeader("Content-Type")}catch(i){}if("application/octet-stream"==n)e=this.xhr.response;else if(this.supportsBinary){var r=t("./buffer");e=String.fromCharCode.apply(null,new r(this.xhr.response))}else e=this.xhr.responseText}catch(i){this.onError(i)}null!=e&&this.onData(e)},this.hasXDR=function(){return(!i||"undefined"!=typeof i.XDomainRequest)&&!this.xs&&this.enablesXDR},this.abort=function(){this.cleanup()},i.attachEvent?i.attachEvent("onunload",r.unloadHandler):i.addEventListener("beforeunload",r.unloadHandler,!1)}.call(r.prototype);else{var f=t("url"),r=function(t){this.uri=t.uri,this.method=t.method||"GET",this.data=t.data,this.encoding=t.encoding,this.headers=a.merger(u,t.headers),this.create()};a.inherits(r,s),function(){this.create=function(){var e=this,n=f.parse(this.uri);n.method=this.method;var i=n.protocol.substring(0,n.protocol.length-1),o=t(i),a=t("domain"),s=a.create();s.on("error",function(t){e.onError(t)}),s.run(function(){var t=this.req=o.request(n,function(t){if(200!=t.statusCode)return e.onError(t.statusCode);e.emit("headers",t.headers),e.encoding&&t.setEncoding(e.encoding);var n="";t.on("data",function(t){e.emit("chunk",t),n+=t.toString()}),t.on("end",function(){e.onData(n,t.headers)})});t.on("error",function(t){e.onError(t)}),t.end(e.data),r.requests&&(e.index=r.requests.requestsCount++,r.requests[e.index]=e)})},this.onError=function(t){this.emit("error",t),this.cleanup(!0)},this.onData=function(t,e){this.emit("data",t,e),this.cleanup(!1)},this.cleanup=function(t){if("undefined"!=typeof this.req&&null!=this.req){if(this.onData=this.onError=c,t)try{this.req.abort()}catch(e){}r.requests&&delete r.requests[this.index],this.req=null}}}.call(r.prototype)}(function(){this.requests={},this.requestsCount=0;var t=this;this.unloadHandler=function(){for(var e in t.requests)t.requests.hasOwnProperty(e)&&t.requests[e].abort()};var e=function(t){return encodeURIComponent(t)},n=function(t){switch(typeof t){case"string":return t;case"boolean":return t?"true":"false";case"number":return isFinite(t)?t:"";case"object":return JSON.stringify(t);default:return""}},i=this.urlencode=function(t,i,r){return i=i||"&",r=r||"=",null===t&&(t=void 0),"object"==typeof t?Object.keys(t).map(function(i){var o=e(n(i))+r;return Array.isArray(t[i])?o+e(JSON.stringify(t[i])):o+e(n(t[i]))}).join(i):void 0};this.urldecode=function(t){for(var e={},n=t.split("&"),i=0,r=n.length;r>i;i++){var o=n[i].split("=");e[decodeURIComponent(o[0])]=decodeURIComponent(o[1])}return e};this.get=function(t,e,n,o,s){a.isFunction(n)&&(s=o,o=n,n={}),n.method="GET",n.uri=t+"?"+i(e);var c=new r(n);return o&&c.on("data",o),s&&c.on("error",s),c};var o=function(t){return t["Content-type"]?t["Content-type"].match(/octet-stream/i)?"octet-stream":t["Content-type"].match(/urlencoded/i)?"urlencoded":t["Content-type"].match(/json/i)?"json":t["Content-type"].match(/text/i)?"text":void 0:"text"},s=function(t,e){switch(o(e)){case"urlencoded":return i(t);case"json":return JSON.stringify(t);case"octet-stream":if(a.isString(t))return t;var n=Object.keys(t);return e["x-file-name"]=n[0],t[n[0]];default:return t.toString()}};this.post=function(t,e,n,i,o){a.isFunction(n)&&(o=i,i=n,n={}),n.method="POST",n.headers=n.headers||{},n.uri=t,n.data=s(e,n.headers),n.headers["Content-length"]=n.data.length;var c=new r(n);return i&&c.on("data",i),o&&c.on("error",o),c},this.XMLHttpRequest=!0}).call(r),n.exports=r})}("function"==typeof define?define:function(t,e,n){n(require,exports,module)});
(function(define) {'use strict'
define("latte_dom/c/commands/click.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
	/**
		<button latte-click="click"></button>
		data : {
			click: function(e) {
				console.log(this, e);   //data, e
			}
		}
	*/
	var Command = {};
	(function() {
		this.after = function(data, dom, controller) {
			var clickAttribute = dom.attr("latte-click");
			if(clickAttribute) {
				var clickEvent = function(e) {
					if(controller.closed) {
						return controller.unbind("view", "click", clickEvent);
					}
					var click = data.get(clickAttribute);
					click && click.call(data, e);
				}
				controller.bind("view", "click", clickEvent);
			}
		};
	}).call(Command);
	
	module.exports = Command;
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/css.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
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
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/duplex.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
	var LatteObject = require("../../m/data");
	var Command = {};
	(function() {
		this.after = function(data, dom, controller) {
			var duplex = dom.attr("latte-duplex");
			if(duplex) {
				var latteObject = LatteObject.create(data);
				var domChange = function(value) {
					if(controller.closed) {
						return controller.unbind("view", "change", domChange);
					}
					data.set(duplex,  dom.value);
				}
				controller.bind("view","change", domChange);
				var duplexChange = function(value) {
					if(self.closed) {
						return controller.unbind("data",duplex, duplexChange);
					}
					if( value == undefined ) {
						dom.value = "";
					} else{
						dom.value =  value;
					}
				}
				controller.bind("data", duplex, duplexChange);
				if( data.get(duplex) == undefined ) {
					dom.value = "";
				} else{
					dom.value =  data.get(duplex);
				}
				
			}
			
		};
	}).call(Command);
	
	module.exports = Command;
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/html.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
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
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/controller.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
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
						f = this.view.removeEventListener.bind(this.view);
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
				var viewOff = this.view.removeEventListener.bind(this.view);
				for(var i in this.viewEvents) {
					this.viewEvents[i].forEach(function(func) {
						viewOff(i, func);
					});
					delete this.viewEvents[i];
				}

				for(var i = 0, len = this.view.children.length; i < len; i++) {
					Controller.remove(this.view.children[i]);
				}
				delete this.view.latteController ;
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
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/index.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
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
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/m/data.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
	
	(function() {
		this.stringRegExp = function(str, prefix , suffix) {
			prefix = prefix || "{{";
			suffix =  suffix || "}}";
			var vernier = 0;
			var next = 1;
			var keys = [];
			while(next) {
				var startIndex = str.indexOf(prefix, vernier);
				if(startIndex == -1) {
					next = 0;
					return keys;
				}
				var endIndex = str.indexOf(suffix, startIndex);
				if(endIndex == -1) {
					next = 0;
					return keys;
				}
				keys.push(str.substring(startIndex+prefix.length, endIndex));
				vernier = endIndex;
			}
			
		}
		this.create = require("latte_lib").object.create;
		/**
		if(Object.observe) {
			this.create = require("./observe.js").create;
		}else if(Object.defineProperty) {
			
		}else{
			throw  new Error("This version does not support your browser ");
		}
		**/
	}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/v/ease.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	var self = this;
	this.latte_ease_cubicInOut = function(t) {
		if(t <= 0) return 0;
		if(t >= 1) return 1;
		var t2 = t * t, t3 = t2 * t;
		return 4 * (t < .5 ? t3: 3* (t - t2) + t3 - .75);
	}
	this.get = function() {
		return self.latte_ease_cubicInOut;
	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/v/index.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function(){
	var View = require("./view.js");
	this.create = function(dom) {
		return View.create(dom);
	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/v/transition.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
var latte_transitionPrototype = []
	, View = require("./view.js")
	, latte_lib = require("latte_lib")
	, Ease = require("./ease.js");
var Utils = require("./viewUtils.js");
var Transition = function(dom) {
	this.dom = dom;
};
(function() {
	this.node = function() {
		return this.dom;
	}
	this.getData = function() {
		return Utils.getData(this.node());
	}

		var latte_interpolateTransform = function(a, b) {
			var s = [], q = [];
			a = latte.transform(a), b = latte.transform(b);
			latte_interpolateTranslate(a.translate, b.translate, s, q);
			latte_interpolateRotate(a.rotate, b.rotate, s, q);
			latte_interpolateSkew(a.skew, b.skew, s, q);
			latte_interpolateScale(a.scale, b.scale, s, q);
			a = b = null;
			return function(t) {
				var i = -1, n = q.length, o;
				while(++i < n) {
					s[(o=q[i]).i] = o.x(t);
				}
				return s.join("");
			};
		}
		var latte_interpolate = Utils.interpolate;
			var latte_transition_tween = function(groups, name, value, tween) {
				var id = groups.id, ns = groups.namespace;
				var doFunc ;
				if(latte_lib.isFunction(value)) {
					doFunc = function(node, i, j) {
				      	//node[ns][id].tween.set(name, tween(value.call(node, node.__data__, i, j)));
				      	node[ns][id].tween.set(name, tween(value.call(node, Utils.getData(node), i, j)));
				    };
				}else{
					var value = tween(value);
					doFunc = function(node) {
				      	//node[ns][id].tween.set(name, value);
				      	node[ns][id].tween.set(name, value);
				    };
				}
			    return doFunc.call(groups.node(), groups.node(), groups.getData());
			}
			var latte_interpolate = Utils.latte_interpolate;
	this.attr = function(nameNs, value) {
		if(arguments.length < 2) {
			for(value in nameNs) {
				this.attr(value, nameNs[value]);
			}
			return this;
		}
		var interpolate = nameNs == "transform" ? 
			latte_interpolateTransform: latte_interpolate
			, name = Utils.ns.qualify(nameNs);	
		function attrNull() {
			this.removeAttribute(name);
		}
		function attrNullNS() {
			this.removeAttributeNS(name.space, name.local);
		}
		function attrTween(b) {
			return b == null ? attrNull: (b += "", function() {
				var a = this.getAttribute(name), i;
				return a !== b && (i = interpolate(a, b), function(t) {
					//console.log(i, t, i(t));
					this.setAttribute(name, i(t));
				});
			});
		}
		function attrTweenNS(b) {
			return b == null? attrNullNS: (b += "", function() {
				var a = this.getAttributeNS(name.space, name.local), i;
				return a !== b && (i = interpolate(a, b), function(t) {
					this.setAttributeNS(name.space, name.local, i(t));
				});
			})
		}
		latte_transition_tween(this, "attr." + nameNs, value, name.local? attrTweenNS: attrTween);
		return this;
	}
	this.style = function(name, value, priority) {
		var n = arguments.length;
	    if (n < 3) {
	      if (typeof name !== "string") {
	        if (n < 2) value = "";
	        for (priority in name) this.style(priority, name[priority], value);
	        return this;
	      }
	      priority = "";
	    }
	    function styleNull() {
	      this.style.removeProperty(name);
	    }
	    function styleString(b) {
	      return b == null ? styleNull : (b += "", function() {
	        var a = Utils.window(this).getComputedStyle(this, null).getPropertyValue(name), i;
	        return a !== b && (i = latte_interpolate(a, b), function(t) {
	          this.style.setProperty(name, i(t), priority);
	        });
	      });
	    }
	    return latte_transition_tween(this, "style." + name, value, styleString);
	}

	/**
		设置执行时间
	*/
	this.duration = function(value) {
		var id = this.id
			, ns = this.namespace;
		if(arguments.length < 1) return this.node()[ns][id].duration;
		var doFunc;
		if(latte_lib.isFunction(value)) {
			doFunc = function(node, i, j) {
				 node[ns][id].duration = Math.max(1, value.call(node, Utils.getData(node), i, j));
			}
		}else{
			value = Math.max(1, value);
			doFunc =  function(node) {
				node[ns][id].duration = value;
			}
		}
		doFunc.call(this, this.node(), 0, 0);
		return this; 
	}
	/**
		动画缓动

	*/
	this.ease = function(value) {
		var id = this.id, ns = this.namespace;
		if(arguments.length < 1) {
			return this.node()[ns][id].ease;
		}
		if(typeof value !== "function") {
			value = Ease.get(Ease, arguments);	
		}
		(function(node) {
			node[ns][id].ease = value;
		}).call(this, this.node());
		 return this;
	}
	/**
		延迟时间
	*/
	this.delay = function(value) {
		var id = this.id , ns = this.namespace;
		if(arguments.length < 1) return this.node()[ns][id].delay;
		var doFunc;
		if(latte_lib.isFunction(value)) {
			doFunc = function(node, i, j) {
				node[ns][id].delay = Math.max(1, value.call(node, Utils.getData(node), i, j));
			}
		}else{
			value = +value;
			doFunc = function(node) {
				node[ns][id].delay = value;
			}
		}
		doFunc.call(this, this.node(), 0, 0);
		return this;
	}
	
	/**
		@method
		设置时间
		type
	*/
	this.on = function(type, listener) {
		var id = this.id, ns = this.namespace;
		if(arguments.length < 2) {
			var inherit = Transition.latte_transitionInherit
				, inheritId = Transition.latte_transitionInheritId;
		}else{
			(function(node) {
				var Events = latte_lib.events;
	        	var transition = node[ns][id];
	        	(transition.event || (transition.event = new Events())).on(type, listener);
	      	}).call(this, this.node(), 0,0);
		}
		return this;
	}

	this.call = function(callback) {
		var args = Utils.array(arguments);
		callback.apply(args[0] = this, args);
		return this;
	}
}).call(Transition.prototype);
(function() {
	var self = this;
	this.latte_transitionId = 0;
	this.latte_transitionInheritId = null;
	this.latte_transitionNamespace = function(name) {
		return name == null ? "__transition__" : "__transition_" + name + "__";
	}
	var latte_timer = require("./utils/timer.js").timer;
	var Map = require("./utils/map.js");
	this.latte_transitionNode = function(node, i, ns, id, inherit) {
		var lock = node[ns] || (node[ns] = {
	      	active: 0,
	      	count: 0
	    }), transition = lock[id], time, timer, duration, ease, tweens;
	    function schedule(elapsed) {
		      var delay = transition.delay;
		      timer.t = delay + time;
		      if (delay <= elapsed) return start(elapsed - delay);
		      timer.c = start;
		    }
		    function start(elapsed) {
		      var activeId = lock.active, active = lock[activeId];
		      	if (active) {
			        active.timer.c = null;
			        active.timer.t = NaN;
			        --lock.count;
			        delete lock[activeId];
			        //active.event && active.event.interrupt.call(node, Utils.getData(node), active.index);
			      	active.event && active.event.emit("interrupt", Utils.getData(node), active.index);
		      	}
		      for (var cancelId in lock) {
		        if (+cancelId < id) {
		          var cancel = lock[cancelId];
		          cancel.timer.c = null;
		          cancel.timer.t = NaN;
		          --lock.count;
		          delete lock[cancelId];
		        }
		      }
		      timer.c = tick;
		      latte_timer(function() {
		        if (timer.c && tick(elapsed || 1)) {
		          timer.c = null;
		          timer.t = NaN;
		        }
		        return 1;
		      }, 0, time);
		      lock.active = id;
		      //transition.event && transition.event.start.call(node,  Utils.getData(node), i);
		      transition.event && transition.event.emit( "start", Utils.getData(node), i);
		      tweens = [];
		      transition.tween.forEach(function(key, value) {
		        if (value = value.call(node,  Utils.getData(node), i)) {
		          tweens.push(value);
		        }
		      });
		      ease = transition.ease;
		      duration = transition.duration;
		    }
		    function tick(elapsed) {
		      var t = elapsed / duration, e = ease(t), n = tweens.length;
		      while (n > 0) {
		        tweens[--n].call(node, e);
		      }
		      if (t >= 1) {
		        //transition.event && transition.event.end.call(node, Utils.getData(node), i);
		        transition.event && transition.event.emit("end", Utils.getData(node),i);
		        if (--lock.count) delete lock[id]; else delete node[ns];
		        return 1;
		      }
		    }
		    if (!transition) {
		      time = inherit.time;
		      timer = latte_timer(schedule, 0, time);
		      transition = lock[id] = {
		        tween: Map.create(),
		        time: time,
		        timer: timer,
		        delay: inherit.delay,
		        duration: inherit.duration,
		        ease: inherit.ease,
		        index: i
		      };
		      inherit = null;
		      ++lock.count;
		    }
	}
	

	this.create = function(dom, name) {
		var id = self.latte_transitionInheritId || ++self.latte_transitionId,
		ns = self.latte_transitionNamespace(name), 
		subgroups = [], subgroup, node, 
		transition = latte.latte_transitionInherit || {
				time: Date.now(),
		      	ease: Ease.latte_ease_cubicInOut,
		      	delay: 0,
		      	duration: 250
    	};
    	self.latte_transitionNode(dom, 0, ns, id, transition);
		var transition = new Transition(dom);
		transition.id = id;
		transition.namespace = ns;
		return transition;
	}
}).call(Transition);
module.exports = Transition;


});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/v/utils/collection.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
var Collection = function() {
	this._ = Object.create(null);
};
var proto = "__proto__", zero = "\x00";
(function() {
	this.escape = function(key) {
		return (key += "") === proto || key[0] === zero ? zero + key : key;
	}
	this.unescape = function(key) {
		return (key += "")[0] === zero ? key.slice(1) : key;
	}
	var self = this;
	this.keys = function() {
		var keys = [];
	    for (var key in this._) keys.push(self.unescape(key));
	    return keys;
	}
}).call(Collection);
(function() {
	
	this.escape = Collection.escape;
	this.unescape = Collection.unescape;
	this.has = function(key) {
		return this.escape(key) in this._;
	}
	this.remove = function(key) {
		return (key = this.escape(key)) in this._ && delete this._[key];
	}

	this.size = function() {
		var size = 0;
		for(var key in this._) {
			++size;
		}
		return size;
	}
	this.empty = function() {
		for(var key in this._) {
			return false;
		}
		return true;
	}
}).call(Collection.prototype);

module.exports = Collection;
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/v/utils/color.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
var Color = function() {

};
(function() {
	this.toString = function() {
		return this.rgb() + "";
	}
}).call(Color.prototype);
module.exports = {
	color: Color
};
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/v/utils/index.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	var latte_vendorPrefixes = [ "webkit", "ms", "moz", "Moz", "o", "O" ];
	this.latte_vendorSymbol = function(object, name) {
	    if (name in object) return name;
	    name = name.charAt(0).toUpperCase() + name.slice(1);
	    for (var i = 0, n = latte_vendorPrefixes.length; i < n; ++i) {
	      var prefixName = latte_vendorPrefixes[i] + name;
	      if (prefixName in object) return prefixName;
	    }
  	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/v/utils/map.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	var latte_lib = require("latte_lib");
	var Map  =  (function() {
		var Collection = require("./collection.js");
		var Map = function() {
			this._ = Object.create(null);
		};
		var latte_map_proto = "__proto__"
			, latte_map_zero = "\x00";
		latte_lib.inherits(Map, Collection);
		(function() {
			this.get = function(key) {
				return this._[this.escape(key)];
			}
			this.set = function(key, value) {
				return this._[this.escape(key)] = value;
			}
			this.remove = function(key) {
				return (key = this.escape(key)) in this._ && delete this._[key];
			}
			this.keys = Collection.keys;
			this.values = function() {
				var values = [];
				for(var key in this._) values.push(this._[key]);
					return values;
			}
			this.entries = function() {
				var entries = [];
				for(var key in this._) entries.push({
					key: this.unescape(key),
					value: this._[key]
				});
				return entries;
			}
			this.forEach = function(f) {
				var self = this;
				for (var key in this._) {
					f.call(this, this.unescape(key), this._[key]);
				}				
			}
		}).call(Map.prototype);
		return Map;
	})();
	this.create = function(object, f) {
		var map = new Map();
			if(object instanceof Map) {
				object.forEach(function(key, value) {
					map.set(key, value);
				});
			}else if(Array.isArray(object)) {
				var i = -1, n = object.length, o;
	      		if (arguments.length === 1) while (++i < n) map.set(i, object[i]); else while (++i < n) map.set(f.call(object, o = object[i], i), o); 
			}else{
				for(var key in object) map.set(key, object[key]);
			}
			return map;
	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/v/utils/rgb.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
var Map = require("./map.js");
var rgbNames = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  };
  var rgbs =  Map.create();

        function latte_rgb(r, g, b) {
            return this instanceof latte_rgb ? void (this.r = ~~r, this.g = ~~g, this.b = ~~b) : 
            arguments.length < 2 ?
             r instanceof latte_rgb ? new latte_rgb(r.r, r.g, r.b) : 
             latte_rgb_parse("" + r, latte_rgb, latte_hsl_rgb) : new latte_rgb(r, g, b);
        }
    function latte_hsl_rgb(h, s, l) {
        var m1, m2;
        h = isNaN(h) ? 0 : (h %= 360) < 0 ? h + 360 : h;
        s = isNaN(s) ? 0 : s < 0 ? 0 : s > 1 ? 1 : s;
        l = l < 0 ? 0 : l > 1 ? 1 : l;
        m2 = l <= .5 ? l * (1 + s) : l + s - l * s;
        m1 = 2 * l - m2;
        function v(h) {
          if (h > 360) h -= 360; else if (h < 0) h += 360;
          if (h < 60) return m1 + (m2 - m1) * h / 60;
          if (h < 180) return m2;
          if (h < 240) return m1 + (m2 - m1) * (240 - h) / 60;
          return m1;
        }
        function vv(h) {
          return Math.round(v(h) * 255);
        }
        return new d3_rgb(vv(h + 120), vv(h), vv(h - 120));
    }
        function latte_rgb_parseNumber(c) {
            var f = parseFloat(c);
            return c.charAt(c.length - 1) === "%" ? Math.round(f * 2.55) : f;
        }
    function latte_rgb_parse(format, rgb, hsl) {
        var r = 0, g = 0, b = 0, m1, m2, color;
        m1 = /([a-z]+)\((.*)\)/.exec(format = format.toLowerCase());
        if (m1) {
          m2 = m1[2].split(",");
          switch (m1[1]) {
           case "hsl":
            {
              return hsl(parseFloat(m2[0]), parseFloat(m2[1]) / 100, parseFloat(m2[2]) / 100);
            }

           case "rgb":
            {
                return rgb(latte_rgb_parseNumber(m2[0]), latte_rgb_parseNumber(m2[1]), latte_rgb_parseNumber(m2[2]));
            }
          }
        }
        if (color = rgbs.get(format)) {
            return rgb(color.r, color.g, color.b);
        }
        if (format != null && format.charAt(0) === "#" && !isNaN(color = parseInt(format.slice(1), 16))) {
          if (format.length === 4) {
            r = (color & 3840) >> 4;
            r = r >> 4 | r;
            g = color & 240;
            g = g >> 4 | g;
            b = color & 15;
            b = b << 4 | b;
          } else if (format.length === 7) {
            r = (color & 16711680) >> 16;
            g = (color & 65280) >> 8;
            b = color & 255;
          }
        }
        return rgb(r, g, b);
    }
    function latte_rgbString(value) {
        return latte_rgbNumber(value) + "";
    }
    function latte_rgbNumber(value) {
        return new latte_rgb(value >> 16, value >> 8 & 255, value & 255);
    }
for(var key in rgbNames) {
	var value = rgbNames[key];
	rgbs.set(key, latte_rgbNumber(value));
}

function latte_rgb_hex(v) {
    return v < 16 ? "0" + Math.max(0, v).toString(16) : Math.min(255, v).toString(16);
}
module.exports = {
	rgbs : rgbs,
	rgb : latte_rgb,
    rgb_hex: latte_rgb_hex
};
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/v/utils/timer.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
		var latte_timer_queueHead
		, latte_timer_queueTail
		, latte_timer_interval
		, latte_timer_timeout
		, latte_vendorSymbol = require("./index.js").latte_vendorSymbol
		, latte_timer_frame = window[latte_vendorSymbol(window, "requestAnimationFrame")] || function(callback) {
			setTimeout(callback, 1000/60 );
		};
		function latte_timer_mark() {
			var now = Date.now() , timer = latte_timer_queueHead;
			while(timer) {
				if(now >= timer.t && timer.c(now - timer.t)) {
					timer.c = null;
				}
				timer = timer.n;
			}
			return now;
		};
	 	function latte_timer_sweep() {
			var t0, t1 = latte_timer_queueHead, time = Infinity;
			while(t1) {
				if(t1.c) {
					if(t1.t < time) time = t1.t;
					t1 = (t0 = t1).n;
				}else{
					t1 = t0? t0.n = t1.n: latte_timer_queueHead = t1.n;
				}
			}
			latte_timer_queueTail = t0;
			return time;
		};
		function latte_timer_step () {
			var now = latte_timer_mark(), delay = latte_timer_sweep() - now;
			if(delay > 24) {
				if(isFinite(delay)) {
					clearTimeout(latte_timer_timeout);
					latte_timer_timeout = setTimeout(latte_timer_step, delay);
				}
				latte_timer_interval = 0;
			}else{
				latte_timer_interval = 1;
				latte_timer_frame(latte_timer_step);
			}
		};
	var Timer = function(callback, delay, then) {
		var n = arguments.length;	
		if(n < 2) delay = 0;
		if(n < 3) then = Date.now();
		var time = then + delay, timer = {
			c: callback,
			t: time,
			n: null
		};
		if(latte_timer_queueTail) {
			latte_timer_queueTail.n = timer;
		}else{
			latte_timer_queueHead = timer;
		}
		latte_timer_queueTail = timer;
		if(!latte_timer_interval) {
			latte_timer_timeout = clearTimeout(latte_timer_timeout);
			latte_timer_interval = 1;
			latte_timer_frame(latte_timer_step);
		}
		return timer;
	};
	this.timer = function() {
		return Timer.apply(this, arguments);
	}
	this.timer.flush = function() {
		latte_timer_mark();
		latte_timer_sweep();
	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/v/view.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	var Utils = require("./viewUtils.js")
		, latte_lib = require("latte_lib");
	var View = function(dom) {
		this.dom = dom;
	};
	(function() {
		/**
			@attr 
			@param name String or Object
			@param value String 
			@return   String or View
			@example
				var View = require("latte_dom").create;
				var view = View("css select");
				view.attr("width", 100);

		*/
		this.attr = function(name, value) {
			if(arguments.length < 2) {
				if(latte_lib.isString(name)) {
					return Utils.getAttr.call(this.node(), name);
				}
				for(value in name) {
					Utils.attr(value, name[value]).call(this.node(), this.getData());
				}
				return this;
			}
			Utils.attr(name, value).call(this.node(), this.getData());
			return this;
		}
		
		/**
			@attr 
			@param name String or Object
			@param value String 
			@return   Boolean or View
			@example
				var View = require("latte_dom").create;
				var view = View("css select");
				view.classed("latte_input", true);
		*/
		this.classed = function(name, value) {
			if(arguments.length < 2) {
				if(latte_lib.isString(name)) {
					var node = this.node(),
						n = (name = Utils.split_classes(name)).length, 
						i = -1;
					if(value = node.classList) {
						while(++i < n) {
							if(!value.contains(name[i])) {
								return false;
							}
						} 	
					}else{
						value = Utils.getAttr("class").call(node, this.getData());
						while(++i < n) {
							if(!Utils.classedRe(name[i]).test(value)) {
								return false;
							}
						}
					}
					return true;
				}
				for(value in name) {
					Utils.classed(value, name[value]).call(this.node(), this.getData());
				}
				return this;
			}
			Utils.classed(name, value).call(this.node());
			return this;
		}
		/**
			@method style 
			@param name String or Object
			@param value String 
			@param priority
			@return   Boolean or View
			@example
				var View = require("latte_dom").create;
				var view = View("css select");
				view.classed("latte_input", true);
		*/
		this.style = function(name, value, priority) {
			var n = arguments.length;
			if(n < 3) {
				if(!latte_lib.isString(name)) {
					if( n < 2) value = "";
					for(priority in name) {
						Utils.style(priority, name[priority], value).call(this.node(), this.getData());
						
					}
					return this;
				}
				if(n < 2) {
					var node = this.node();
					return Utils.window(node).getComputedStyle(node, null).getPropertyValue(name);
				}
				priority = "";
				
			}
			Utils.style(name, value, priority).call(this.node(), this.getData());
			return this;
		}
		/**
			@method text
			@param value
			@return String or Views
		*/
		this.text = function(value) {
			if(arguments.length) {
				var func ;
				if(latte_lib.isFunction(value)) {
					func = function() {
						var v = value.apply(this, arguments);
						this.textContent = v = null ? "" : v;
					}
				}else if(value == null) {
					func = function() {
						this.textContent = "";
					}
				}else{
					func = function() {
						this.textContent = value;
					}
				}
				func.call(this.node(), this.getData());
				return this;
			}else{
				return this.node().textContent;
			}
		}
		/**
			@method html
			@param value
			@return String or Views
		*/
		this.html = function(value) {
			if(arguments.length) {
				var func ;
				if(latte_lib.isFunction(value)) {
					func = function() {
						var v = value.apply(this, arguments);
						this.innerHTML = v = null ? "" : v;
					}
				}else if(value == null) {
					func = function() {
						this.innerHTML = "";
					}
				}else{
					func = function() {
						this.innerHTML = value;
					}
				}
				func.call(this.node(), this.getData());
				return this;
			}else{
				return this.node().innerHTML;
			}
		}
		/**
			@method on
			@param type  String
			@param listener  Function
			@param capture  Boolean
			@return View or Function
		*/
		this.on = function(type, listener, capture) {
			var n = arguments.length;
			if(n < 3) {
				if(!latte_lib.isString(type)) {
					if(n < 2) listener = false;
					for(capture in type) {
						Utils.on(capture, type[capture], listener);
					}
					return this;
				}
				if(n < 2) {
					return (n = this.node()["__on" + type]) && n.map(function(o) {
						return o._;
					});
				}
				capture = false;
			}
		 	Utils.on( type, listener, capture).call(this.node(), this.getData());
			return this;
		}
			var onceFunc = function(type, listener,capture, self) {
				var once = function() {
					var args = Utils.array(arguments);
					listener.call(this, args);
					self.off(type, once, capture);
				};
				return once;
			}
		/**
			@method off
			@param type  String
			@param listener  Function
			@param capture  Boolean
			@return View or Function
		*/
		this.off = function(type, listener, capture) {
			var n = arguments.length;
			if(n < 3) {
				if(!latte_lib.isString(type)) {
					if(n < 2 ) listener = false;
					var self = this;
					for(var capture in type) {
						Utils.off(capture, type[capture], listener).call(this.node(), this.getData());
					}
					return this;
				}
				if(n < 2) {
					return false;
				}
				capture = false;
			}
			Utils.off(type, listener, capture).call(this.node(), this.getData());
			return this;
		}
		/**
			@method once
			@param type  String
			@param listener  Function
			@param capture  Boolean
			@return View or Function
		*/
		this.once = function(type, listener, capture) {
			var n = arguments.length;
			if(n < 3) {
				if(!latte_lib.isString(type)) {
					if(n < 2) listener = false;
					var self = this;
					for(var capture in type) {
						Utils.on(capture, onceFunc(capture, type[capture], listener, self), listener);
					}
					return this;
				}
				if(n < 2) {
					return false;
				}
				capture = false;
			}
			Utils.on(type, onceFunc(type, listener ,capture, this), capture).call(this.node(), this.getData());
			return this;
		}

		this.transition = function(name) {
			var Transition = require("./transition.js");
			/**
			var id = Transition.latte_transitionInheritId || ++Transition.latte_transitionId,
			ns = Transition.latte_transitionNamespace(name), 
			subgroups = [], subgroup, node, 
			transition = Transition.latte_transitionInherit || {
					time: Date.now(),
			      	ease: latte_ease_cubicInOut,
			      	delay: 0,
			      	duration: 250
	    	};
	    	var dom = this.node();
	    	Transition.latte_transitionNode(dom, 0, ns, id, transition);
	    	*/
	    	return Transition.create(this.node(), name);
		}
		this.getData = function() {
			return Utils.getData(this.node());
		}

		this.node = function() {
			return this.dom;
		}
		Object.defineProperty(this, "children" , {
			get: function() {
				return this.dom.children;
			}
		});
		Object.defineProperty(this, "childNodes", {
			get: function() {
				return this.dom.childNodes;
			}
		});
		Object.defineProperty(this, "value", {
			get: function() {
				return this.dom.value;
			},
			set : function(value) {
				this.dom.value = value;
			}
		})
		
	}).call(View.prototype);
	this.create = function(dom) {
		if(latte_lib.isString(dom)) {
			dom = Utils.select(dom, document);
		}
		return new View(dom);
	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/v/viewUtils.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	var self = this;
		var latte_arraySlice = [].slice;
		this.arraySlice = latte_arraySlice;
		this.array = function(list) {
			return latte_arraySlice.call(list);
		}
		var latte_nsPrefix = {
		    svg: "http://www.w3.org/2000/svg",
		    xhtml: "http://www.w3.org/1999/xhtml",
		    xlink: "http://www.w3.org/1999/xlink",
		    xml: "http://www.w3.org/XML/1998/namespace",
		    xmlns: "http://www.w3.org/2000/xmlns/"
	  	};
	  	this.ns = {
		    prefix: latte_nsPrefix,
		    qualify: function(name) {
		      var i = name.indexOf(":"), prefix = name;
		      if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
		      return latte_nsPrefix.hasOwnProperty(prefix) ? {
		        space: latte_nsPrefix[prefix],
		        local: name
		      } : name;
		    }
	  	};
	this.window = function(node) {
    	return node && (node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView);
  	}
		var collapse = this.collapse =function(s) {
	    	return s.trim().replace(/\s+/g, " ");
	  	}
		var classedName = this.classedName = function (name) {
		    var re = self.classedRe(name);
		    return function(node, value) {
		      if (c = node.classList) return value ? c.add(name) : c.remove(name);
		      var c = node.getAttribute("class") || "";
		      if (value) {
		        re.lastIndex = 0;
		        if (!re.test(c)) node.setAttribute("class", self.collapse(c + " " + name));
		      } else {
		        node.setAttribute("class", self.collapse(c.replace(re, " ")));
		      }
		    };
		}
		var requote_re = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
		this.requote = function(s) {
	    	return s.replace(requote_re, "\\$&");
	  	};
		this.classedRe = function(name) {
	   		return new RegExp("(?:^|\\s+)" + self.requote(name) + "(?:\\s+|$)", "g");
	  	}
		this.split_classes = function(name) {
			return (name + "").trim().split(/^|\s+/);
		}
	this.classed = function(name, value) {
		name = self.split_classes(name).map(self.classedName);
		var n = name.length;
		function classedConstant() {
	      var i = -1;
	      while (++i < n) name[i](this, value);
	    }
	    function classedFunction() {
	      var i = -1, x = value.apply(this, arguments);
	      while (++i < n) name[i](this, x);
	    }
	    return typeof value === "function" ? classedFunction : classedConstant;
	} 
	

	this.style = function(name, value, priority) {
		function styleNull() {
	      	this.style.removeProperty(name);
	    }
	    function styleConstant() {
	      this.style.setProperty(name, value, priority);
	    }
	    function styleFunction() {
	      	var x = value.apply(this, arguments);
	      	if (x == null) this.style.removeProperty(name); else this.style.setProperty(name, x, priority);
	    }
	    return value == null ? styleNull : typeof value === "function" ? styleFunction : styleConstant;
	}
	this.getAttr = function(name) {
		name = self.ns.qualify(name);
		return name.local? this.getAttributeNS(name.space, name.local) : this.getAttribute(name);
	}
	this.attr = function(name, value) {
		name = self.ns.qualify(name);
		function attrNull() {
	      this.removeAttribute(name);
	    }
	    function attrNullNS() {
	      this.removeAttributeNS(name.space, name.local);
	    }
	    function attrConstant() {
	      this.setAttribute(name, value);
	    }
	    function attrConstantNS() {
	      this.setAttributeNS(name.space, name.local, value);
	    }
	    function attrFunction() {
	      var x = value.apply(this, arguments);
	      if (x == null) this.removeAttribute(name); else this.setAttribute(name, x);
	    }
	    function attrFunctionNS() {
	      var x = value.apply(this, arguments);
	      if (x == null) this.removeAttributeNS(name.space, name.local); else this.setAttributeNS(name.space, name.local, x);
	    }
		return  value == null ? 
			name.local ? attrNullNS : attrNull 
			: 
			typeof value === "function" ?  
					name.local ? attrFunctionNS : attrFunction 
			: name.local ? attrConstantNS : attrConstant;
	}
		this.event = null;
		var onListener = function(listener, argumentz) {
			return function(e) {
				var o = self.event;
				self.event = e;
				argumentz[0] = self.getData(this);
				try {
					listener.apply(this, argumentz);
				}catch(e) {
					//console.log(e);
					throw e;
				}finally {
					self.event = o;
				}
			}
		}
		var Map = require("./utils/map.js");
		var onFilters = Map.create({
			mouseenter: "mouseover",
		    mouseleave: "mouseout"
		});

		this.getData = function(dom) {
			return dom.controller && dom.controller.data || dom.__data__;
		}
		var onFilter = function(listener, argumentz) {
			var l = onListener(listener, argumentz);
			return function(e) {
				var target = this, related = e.relatedTarget;
				if (!related || related !== target && !(related.compareDocumentPosition(target) & 8)) {
		        	l.call(target, e);
		      	}
			}
		}
	
	this.off = function(type, listener, capture) {
		var name = "__on" + type, i = type.indexOf(".");
		if(i > 0) {
			type = type.slice(0, i);
		}
		function onRemove() {
			var l = this[name];
			if(l) {
				var _self = this;
				l.forEach(function(o) {

					if(o._ == listener && o.$ == capture) {
						var index = l.indexOf(o);
						l.splice(index, 1);
						_self.removeEventListener(type, o, capture);
					}
				});

			}
		}
		return onRemove;
	}

	this.on = function(type, listener, capture) {
		var name = "__on" + type, i = type.indexOf("."),
			wrap = onListener;
		if(i > 0) {
			type = type.slice(0, i);
		}
		var filter = onFilters.get(type);
		if(filter) {
			type = filter;
			wrap = onFilter;
		}
		function onRemove() {
			var l = this[name];
			if(l) {
				var _self = this;
				l.forEach(function(o) {
					_self.removeEventListener(type, o, o.$);
				});
				delete this[name];
			}
		}
		function onAdd() {
			var l = wrap(listener, self.array(arguments));
			//onRemove.call(this);
			this.addEventListener(type,  l, l.$ = capture);
			this[name] = this[name] || [];
			l._ = listener;
			this[name].push(l);
		}
		function removeAll() {
			var re = new RegExp("^__on[^.]+)" + self.requote(type) + "$"), match;
			for(var name in this) {
				if(match = name.match(re)) {
					var l = this[name];
					var self = this;
					l.forEach(function(o) {
						self.removeEventListener(match[1], o, o.$);
					});
					delete this[name];
				}
			}
		}
		return i ? listener ? onAdd: onRemove : listener? latte_noop: removeAll;
	}
			
			function latte_interpolateArray(a, b) {
			    var x = [], c = [], na = a.length, nb = b.length, n0 = Math.min(a.length, b.length), i;
			    for (i = 0; i < n0; ++i) x.push(latte_interpolate(a[i], b[i]));
			    for (;i < na; ++i) c[i] = a[i];
			    for (;i < nb; ++i) c[i] = b[i];
			    return function(t) {
			      for (i = 0; i < n0; ++i) c[i] = x[i](t);
			      return c;
			    };
		  	}
	  		var latte_interpolateObject = function(a, b) {
			    var i = {}, c = {}, k;
			    for (k in a) {
			      if (k in b) {
			        i[k] = latte_interpolate(a[k], b[k]);
			      } else {
			        c[k] = a[k];
			      }
			    }
			    for (k in b) {
			      if (!(k in a)) {
			        c[k] = b[k];
			      }
			    }
			    return function(t) {
			      for (k in i) c[k] = i[k](t);
			      return c;
			    };
		  	}
		  	var latte_interpolateNumber = function(a, b) {
				a = +a, b = +b;

				return function(t) {
					return a * (1 - t) + b * t;
				};
			}
			var latte_interpolate_numberA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, 
		  			latte_interpolate_numberB = new RegExp(latte_interpolate_numberA.source, "g");
			var latte_interpolateString = function(a,b) {
				var bi = latte_interpolate_numberA.lastIndex = latte_interpolate_numberB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
				    a = a + "", b = b + "";
				    while ((am = latte_interpolate_numberA.exec(a)) && (bm = latte_interpolate_numberB.exec(b))) {
						if ((bs = bm.index) > bi) {
							bs = b.slice(bi, bs);
							if (s[i]) s[i] += bs; else s[++i] = bs;
						}
				      	if ((am = am[0]) === (bm = bm[0])) {
				        	if (s[i]) s[i] += bm; else s[++i] = bm;
				      	} else {
				        	s[++i] = null;
				        	q.push({
				          		i: i,
				          		x: latte_interpolateNumber(am, bm)
			        		});
				      	}
				      	bi = latte_interpolate_numberB.lastIndex;
				    }
				    if (bi < b.length) {
				      	bs = b.slice(bi);
				      	if (s[i]) s[i] += bs; else s[++i] = bs;
				    }
				    return s.length < 2 ? q[0] ? (b = q[0].x, function(t) {
				      	return b(t) + "";
				    }) : function() {
				      	return b;
				    } : (b = q.length, function(t) {
				      	for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
				      		return s.join("");
				    });
			}
			var Rgb = require("./utils/rgb.js");
			var latte_rgb_hex= Rgb.rgb_hex;
			var latte_interpolateRgb = function(a, b) {
	  			a = Rgb.rgb(a);
			    b = Rgb.rgb(b);
			    var ar = a.r, ag = a.g, ab = a.b, br = b.r - ar, bg = b.g - ag, bb = b.b - ab;
			    return function(t) {
			      	return "#" + latte_rgb_hex(Math.round(ar + br * t)) + latte_rgb_hex(Math.round(ag + bg * t)) + latte_rgb_hex(Math.round(ab + bb * t));
			    };
	  		}
	  		var Color = require("./utils/color.js").color;
	  		var RgbNames = Rgb.rgbs;
		var interpolators = [ function(a, b) {
		    var t = typeof b;
		    return (t === "string" ? 
		    	RgbNames.has(b.toLowerCase()) || 
		    	/^(#|rgb\(|hsl\()/i.test(b) ? 
		    		latte_interpolateRgb : latte_interpolateString 
		    		: b instanceof Color ? 
		    		latte_interpolateRgb : Array.isArray(b) ? 
		    		latte_interpolateArray : t === "object" 
		    		&& isNaN(b) ? latte_interpolateObject : 
		    		latte_interpolateNumber)(a, b);
	  	} ];
	/**
		transition
	*/
  	var latte_interpolate = this.latte_interpolate = function(a, b) {
  		var i = interpolators.length, f;
			while (--i >= 0 && !(f = interpolators[i](a, b))) ;
		return f;
  	}
	this.select = function(name, node) {
		return node.querySelector(name);
	}
	this.selectAll = function(name, node) {
		return node.querySelectorAll(name);
	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });