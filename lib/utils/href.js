(function() {
	var self= this;
	this.setHash = function(hash) {
		var url = self.parse(window.location.href);
		url.hash = hash;
		window.location.href = url.format();
	}
	
	this.getHash = function(url) {
		var url = self.parse(window.location.href);
		return url.hash;
	}

	this.getQuery = function() {
		var url = self.parse(window.location.href);
		return QueryString.parse(url.query);
	}
	this.setQuery = function(key, value) {
		var url = self.parse(window.location.href);
		var queryObject = QueryString.parse(url.query);
		queryObject[key] = value;
		url.query = QueryString.stringify(queryObject);
		window.location.href = url.format();
	}

	var regexNonASCII = /[^\x20-\x7E]/
		, regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
			function map(array, fn) {
				var length = array.length;
				var result = [];
				while (length--) {
					result[length] = fn(array[length]);
				}
				return result;
			}
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}
	var punycode = {
		toASCII : function(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}
	}

	var Url = function() {
		this.protocol = null;
		this.slashes = null;
		this.auth = null;
		this.host = null;
		this.port = null;
		this.hostname = null;
		this.hash = null;
		this.search = null;
		this.query = null;
		this.pathname = null;
		this.path = null;
		this.href = null;
	};
	var  protocolPattern = /^([a-z0-9.+-]+:)/i;
	var portPattern = /:[0-9]*$/;
	var hostlessProtocol = {
	  'javascript': true,
	  'javascript:': true
	};
	var hostEndingChars = ['/', '?', '#'];
	var nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape);
	var autoEscape = ['\''].concat(unwise);
	var unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims);
	var delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'];
	var hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/;
	var simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/;
	var hostnameMaxLen = 255;
	var unsafeProtocol = {
	  'javascript': true,
	  'javascript:': true
	};
	var  slashedProtocol = {
	  'http': true,
	  'https': true,
	  'ftp': true,
	  'gopher': true,
	  'file': true,
	  'http:': true,
	  'https:': true,
	  'ftp:': true,
	  'gopher:': true,
	  'file:': true
	};
	(function() {
		this.parse = function(url, parseQueryString, slashesDenoteHost) {
			if (typeof url !== 'string') {
    			throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  			}
  			var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
		      uSplit = url.split(splitter),
		      slashRegex = /\\/g;
		  uSplit[0] = uSplit[0].replace(slashRegex, '/');
		  url = uSplit.join(splitter);

		  var rest = url;

		  // trim before proceeding.
		  // This is to support parse stuff like "  http://foo.com  \n"
		  rest = rest.trim();

		  if (!slashesDenoteHost && url.split('#').length === 1) {
		    // Try fast path regexp
		    var simplePath = simplePathPattern.exec(rest);
		    if (simplePath) {
		      this.path = rest;
		      this.href = rest;
		      this.pathname = simplePath[1];
		      if (simplePath[2]) {
		        this.search = simplePath[2];
		        if (parseQueryString) {
		          this.query = querystring.parse(this.search.substr(1));
		        } else {
		          this.query = this.search.substr(1);
		        }
		      } else if (parseQueryString) {
		        this.search = '';
		        this.query = {};
		      }
		      return this;
		    }
		  }

		  var proto = protocolPattern.exec(rest);
		  if (proto) {
		    proto = proto[0];
		    var lowerProto = proto.toLowerCase();
		    this.protocol = lowerProto;
		    rest = rest.substr(proto.length);
		  }

		  // figure out if it's got a host
		  // user@server is *always* interpreted as a hostname, and url
		  // resolution will treat //foo/bar as host=foo,path=bar because that's
		  // how the browser resolves relative URLs.
		  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
		    var slashes = rest.substr(0, 2) === '//';
		    if (slashes && !(proto && hostlessProtocol[proto])) {
		      rest = rest.substr(2);
		      this.slashes = true;
		    }
		  }

		  if (!hostlessProtocol[proto] &&
		      (slashes || (proto && !slashedProtocol[proto]))) {

		    // there's a hostname.
		    // the first instance of /, ?, ;, or # ends the host.
		    //
		    // If there is an @ in the hostname, then non-host chars *are* allowed
		    // to the left of the last @ sign, unless some host-ending character
		    // comes *before* the @-sign.
		    // URLs are obnoxious.
		    //
		    // ex:
		    // http://a@b@c/ => user:a@b host:c
		    // http://a@b?@c => user:a host:b path:/?@c

		    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
		    // Review our test case against browsers more comprehensively.

		    // find the first instance of any hostEndingChars
		    var hostEnd = -1;
		    for (var i = 0; i < hostEndingChars.length; i++) {
		      var hec = rest.indexOf(hostEndingChars[i]);
		      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
		        hostEnd = hec;
		    }

		    // at this point, either we have an explicit point where the
		    // auth portion cannot go past, or the last @ char is the decider.
		    var auth, atSign;
		    if (hostEnd === -1) {
		      // atSign can be anywhere.
		      atSign = rest.lastIndexOf('@');
		    } else {
		      // atSign must be in auth portion.
		      // http://a@b/c@d => host:b auth:a path:/c@d
		      atSign = rest.lastIndexOf('@', hostEnd);
		    }

		    // Now we have a portion which is definitely the auth.
		    // Pull that off.
		    if (atSign !== -1) {
		      auth = rest.slice(0, atSign);
		      rest = rest.slice(atSign + 1);
		      this.auth = decodeURIComponent(auth);
		    }

		    // the host is the remaining to the left of the first non-host char
		    hostEnd = -1;
		    for (var i = 0; i < nonHostChars.length; i++) {
		      var hec = rest.indexOf(nonHostChars[i]);
		      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
		        hostEnd = hec;
		    }
		    // if we still have not hit it, then the entire thing is a host.
		    if (hostEnd === -1)
		      hostEnd = rest.length;

		    this.host = rest.slice(0, hostEnd);
		    rest = rest.slice(hostEnd);

		    // pull out port.
		    this.parseHost();

		    // we've indicated that there is a hostname,
		    // so even if it's empty, it has to be present.
		    this.hostname = this.hostname || '';

		    // if hostname begins with [ and ends with ]
		    // assume that it's an IPv6 address.
		    var ipv6Hostname = this.hostname[0] === '[' &&
		        this.hostname[this.hostname.length - 1] === ']';

		    // validate a little.
		    if (!ipv6Hostname) {
		      var hostparts = this.hostname.split(/\./);
		      for (var i = 0, l = hostparts.length; i < l; i++) {
		        var part = hostparts[i];
		        if (!part) continue;
		        if (!part.match(hostnamePartPattern)) {
		          var newpart = '';
		          for (var j = 0, k = part.length; j < k; j++) {
		            if (part.charCodeAt(j) > 127) {
		              // we replace non-ASCII char with a temporary placeholder
		              // we need this to make sure size of hostname is not
		              // broken by replacing non-ASCII by nothing
		              newpart += 'x';
		            } else {
		              newpart += part[j];
		            }
		          }
		          // we test again with ASCII char only
		          if (!newpart.match(hostnamePartPattern)) {
		            var validParts = hostparts.slice(0, i);
		            var notHost = hostparts.slice(i + 1);
		            var bit = part.match(hostnamePartStart);
		            if (bit) {
		              validParts.push(bit[1]);
		              notHost.unshift(bit[2]);
		            }
		            if (notHost.length) {
		              rest = '/' + notHost.join('.') + rest;
		            }
		            this.hostname = validParts.join('.');
		            break;
		          }
		        }
		      }
		    }

		    if (this.hostname.length > hostnameMaxLen) {
		      this.hostname = '';
		    } else {
		      // hostnames are always lower case.
		      this.hostname = this.hostname.toLowerCase();
		    }

		    if (!ipv6Hostname) {
		      // IDNA Support: Returns a punycoded representation of "domain".
		      // It only converts parts of the domain name that
		      // have non-ASCII characters, i.e. it doesn't matter if
		      // you call it with a domain that already is ASCII-only.
		      this.hostname = punycode.toASCII(this.hostname);
		    }

		    var p = this.port ? ':' + this.port : '';
		    var h = this.hostname || '';
		    this.host = h + p;

		    // strip [ and ] from the hostname
		    // the host field still retains them, though
		    if (ipv6Hostname) {
		      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
		      if (rest[0] !== '/') {
		        rest = '/' + rest;
		      }
		    }
		  }

		  // now rest is set to the post-host stuff.
		  // chop off any delim chars.
		  if (!unsafeProtocol[lowerProto]) {

		    // First, make 100% sure that any "autoEscape" chars get
		    // escaped, even if encodeURIComponent doesn't think they
		    // need to be.
		    for (var i = 0, l = autoEscape.length; i < l; i++) {
		      var ae = autoEscape[i];
		      if (rest.indexOf(ae) === -1)
		        continue;
		      var esc = encodeURIComponent(ae);
		      if (esc === ae) {
		        esc = escape(ae);
		      }
		      rest = rest.split(ae).join(esc);
		    }
		  }


		  // chop off from the tail first.
		  var hash = rest.indexOf('#');
		  if (hash !== -1) {
		    // got a fragment string.
		    this.hash = rest.substr(hash);
		    rest = rest.slice(0, hash);
		  }
		  var qm = rest.indexOf('?');
		  if (qm !== -1) {
		    this.search = rest.substr(qm);
		    this.query = rest.substr(qm + 1);
		    if (parseQueryString) {
		      this.query = querystring.parse(this.query);
		    }
		    rest = rest.slice(0, qm);
		  } else if (parseQueryString) {
		    // no query string, but parseQueryString still requested
		    this.search = '';
		    this.query = {};
		  }
		  if (rest) this.pathname = rest;
		  if (slashedProtocol[lowerProto] &&
		      this.hostname && !this.pathname) {
		    this.pathname = '/';
		  }

		  //to support http.request
		  if (this.pathname || this.search) {
		    var p = this.pathname || '';
		    var s = this.search || '';
		    this.path = p + s;
		  }

		  // finally, reconstruct the href based on what has been validated.
		  this.href = this.format();
		  return this;
		}
		this.parseHost = function() {
		  var host = this.host;
		  var port = portPattern.exec(host);
		  if (port) {
		    port = port[0];
		    if (port !== ':') {
		      this.port = port.substr(1);
		    }
		    host = host.substr(0, host.length - port.length);
		  }
		  if (host) this.hostname = host;
		};
		this.format = function() {
		  var auth = this.auth || '';
		  if (auth) {
		    auth = encodeURIComponent(auth);
		    auth = auth.replace(/%3A/i, ':');
		    auth += '@';
		  }

		  var protocol = this.protocol || '',
		      pathname = this.pathname || '',
		      hash = this.hash || '',
		      host = false,
		      query = '';

		  if (this.host) {
		    host = auth + this.host;
		  } else if (this.hostname) {
		    host = auth + (this.hostname.indexOf(':') === -1 ?
		        this.hostname :
		        '[' + this.hostname + ']');
		    if (this.port) {
		      host += ':' + this.port;
		    }
		  }

		  if (this.query !== null &&
		      typeof this.query === 'object' &&
		      Object.keys(this.query).length) {
		    query = querystring.stringify(this.query);
		  }

		  var search = this.search || (query && ('?' + query)) || '';

		  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

		  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
		  // unless they had them to begin with.
		  if (this.slashes ||
		      (!protocol || slashedProtocol[protocol]) && host !== false) {
		    host = '//' + (host || '');
		    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
		  } else if (!host) {
		    host = '';
		  }

		  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
		  if (search && search.charAt(0) !== '?') search = '?' + search;

		  pathname = pathname.replace(/[?#]/g, function(match) {
		    return encodeURIComponent(match);
		  });
		  search = search.replace('#', '%23');

		  return protocol + host + pathname + search + hash;
		};
	}).call(Url.prototype);
	this.parse = function(url, parseQueryString, slashesDenoteHost){
		
		if(url instanceof Url) return url;
		var u = new Url();
		u.parse(url,parseQueryString, slashesDenoteHost);
		return u;
	};
	//nodejs  url.js and querystring.js
	var QueryString =  {};
	var querystring = QueryString;
	function ParsedQueryString() {}
	
	(function() {
		function qsUnescape(s, decodeSpaces) {
		  try {
		    return decodeURIComponent(s);
		  } catch (e) {
		    return QueryString.unescapeBuffer(s, decodeSpaces).toString();
		  }
		}
		this.unescape = qsUnescape;
		this.parse = function(qs, sep, eq, options) {
		  sep = sep || '&';
		  eq = eq || '=';

		  var obj = new ParsedQueryString();

		  if (typeof qs !== 'string' || qs.length === 0) {
		    return obj;
		  }

		  if (typeof sep !== 'string')
		    sep += '';

		  var eqLen = eq.length;
		  var sepLen = sep.length;

		  var maxKeys = 1000;
		  if (options && typeof options.maxKeys === 'number') {
		    maxKeys = options.maxKeys;
		  }

		  var pairs = Infinity;
		  if (maxKeys > 0)
		    pairs = maxKeys;

		  var decode = QueryString.unescape;
		  if (options && typeof options.decodeURIComponent === 'function') {
		    decode = options.decodeURIComponent;
		  }
		  var customDecode = (decode !== qsUnescape);

		  var keys = [];
		  var lastPos = 0;
		  var sepIdx = 0;
		  var eqIdx = 0;
		  var key = '';
		  var value = '';
		  var keyEncoded = customDecode;
		  var valEncoded = customDecode;
		  var encodeCheck = 0;
		  for (var i = 0; i < qs.length; ++i) {
		    var code = qs.charCodeAt(i);

		    // Try matching key/value pair separator (e.g. '&')
		    if (code === sep.charCodeAt(sepIdx)) {
		      if (++sepIdx === sepLen) {
		        // Key/value pair separator match!
		        var end = i - sepIdx + 1;
		        if (eqIdx < eqLen) {
		          // If we didn't find the key/value separator, treat the substring as
		          // part of the key instead of the value
		          if (lastPos < end)
		            key += qs.slice(lastPos, end);
		        } else if (lastPos < end)
		          value += qs.slice(lastPos, end);
		        if (keyEncoded)
		          key = decodeStr(key, decode);
		        if (valEncoded)
		          value = decodeStr(value, decode);
		        // Use a key array lookup instead of using hasOwnProperty(), which is
		        // slower
		        if (keys.indexOf(key) === -1) {
		          obj[key] = value;
		          keys[keys.length] = key;
		        } else {
		          var curValue = obj[key];
		          // `instanceof Array` is used instead of Array.isArray() because it
		          // is ~15-20% faster with v8 4.7 and is safe to use because we are
		          // using it with values being created within this function
		          if (curValue instanceof Array)
		            curValue[curValue.length] = value;
		          else
		            obj[key] = [curValue, value];
		        }
		        if (--pairs === 0)
		          break;
		        keyEncoded = valEncoded = customDecode;
		        encodeCheck = 0;
		        key = value = '';
		        lastPos = i + 1;
		        sepIdx = eqIdx = 0;
		      }
		      continue;
		    } else {
		      sepIdx = 0;
		      if (!valEncoded) {
		        // Try to match an (valid) encoded byte (once) to minimize unnecessary
		        // calls to string decoding functions
		        if (code === 37/*%*/) {
		          encodeCheck = 1;
		        } else if (encodeCheck > 0 &&
		                   ((code >= 48/*0*/ && code <= 57/*9*/) ||
		                    (code >= 65/*A*/ && code <= 70/*F*/) ||
		                    (code >= 97/*a*/ && code <= 102/*f*/))) {
		          if (++encodeCheck === 3)
		            valEncoded = true;
		        } else {
		          encodeCheck = 0;
		        }
		      }
		    }

		    // Try matching key/value separator (e.g. '=') if we haven't already
		    if (eqIdx < eqLen) {
		      if (code === eq.charCodeAt(eqIdx)) {
		        if (++eqIdx === eqLen) {
		          // Key/value separator match!
		          var end = i - eqIdx + 1;
		          if (lastPos < end)
		            key += qs.slice(lastPos, end);
		          encodeCheck = 0;
		          lastPos = i + 1;
		        }
		        continue;
		      } else {
		        eqIdx = 0;
		        if (!keyEncoded) {
		          // Try to match an (valid) encoded byte once to minimize unnecessary
		          // calls to string decoding functions
		          if (code === 37/*%*/) {
		            encodeCheck = 1;
		          } else if (encodeCheck > 0 &&
		                     ((code >= 48/*0*/ && code <= 57/*9*/) ||
		                      (code >= 65/*A*/ && code <= 70/*F*/) ||
		                      (code >= 97/*a*/ && code <= 102/*f*/))) {
		            if (++encodeCheck === 3)
		              keyEncoded = true;
		          } else {
		            encodeCheck = 0;
		          }
		        }
		      }
		    }

		    if (code === 43/*+*/) {
		      if (eqIdx < eqLen) {
		        if (i - lastPos > 0)
		          key += qs.slice(lastPos, i);
		        key += '%20';
		        keyEncoded = true;
		      } else {
		        if (i - lastPos > 0)
		          value += qs.slice(lastPos, i);
		        value += '%20';
		        valEncoded = true;
		      }
		      lastPos = i + 1;
		    }
		  }

		  // Check if we have leftover key or value data
		  if (pairs > 0 && (lastPos < qs.length || eqIdx > 0)) {
		    if (lastPos < qs.length) {
		      if (eqIdx < eqLen)
		        key += qs.slice(lastPos);
		      else if (sepIdx < sepLen)
		        value += qs.slice(lastPos);
		    }
		    if (keyEncoded)
		      key = decodeStr(key, decode);
		    if (valEncoded)
		      value = decodeStr(value, decode);
		    // Use a key array lookup instead of using hasOwnProperty(), which is
		    // slower
		    if (keys.indexOf(key) === -1) {
		      obj[key] = value;
		      keys[keys.length] = key;
		    } else {
		      var curValue = obj[key];
		      // `instanceof Array` is used instead of Array.isArray() because it
		      // is ~15-20% faster with v8 4.7 and is safe to use because we are
		      // using it with values being created within this function
		      if (curValue instanceof Array)
		        curValue[curValue.length] = value;
		      else
		        obj[key] = [curValue, value];
		    }
		  }

		  return obj;
		};


		this.escape = function(str) {
		  // replaces encodeURIComponent
		  // http://www.ecma-international.org/ecma-262/5.1/#sec-15.1.3.4
		  if (typeof str !== 'string') {
		    if (typeof str === 'object')
		      str = String(str);
		    else
		      str += '';
		  }
		  var out = '';
		  var lastPos = 0;

		  for (var i = 0; i < str.length; ++i) {
		    var c = str.charCodeAt(i);

		    // These characters do not need escaping (in order):
		    // ! - . _ ~
		    // ' ( ) *
		    // digits
		    // alpha (uppercase)
		    // alpha (lowercase)
		    if (c === 0x21 || c === 0x2D || c === 0x2E || c === 0x5F || c === 0x7E ||
		        (c >= 0x27 && c <= 0x2A) ||
		        (c >= 0x30 && c <= 0x39) ||
		        (c >= 0x41 && c <= 0x5A) ||
		        (c >= 0x61 && c <= 0x7A)) {
		      continue;
		    }

		    if (i - lastPos > 0)
		      out += str.slice(lastPos, i);

		    // Other ASCII characters
		    if (c < 0x80) {
		      lastPos = i + 1;
		      out += hexTable[c];
		      continue;
		    }

		    // Multi-byte characters ...
		    if (c < 0x800) {
		      lastPos = i + 1;
		      out += hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)];
		      continue;
		    }
		    if (c < 0xD800 || c >= 0xE000) {
		      lastPos = i + 1;
		      out += hexTable[0xE0 | (c >> 12)] +
		             hexTable[0x80 | ((c >> 6) & 0x3F)] +
		             hexTable[0x80 | (c & 0x3F)];
		      continue;
		    }
		    // Surrogate pair
		    ++i;
		    var c2;
		    if (i < str.length)
		      c2 = str.charCodeAt(i) & 0x3FF;
		    else
		      throw new URIError('URI malformed');
		    lastPos = i + 1;
		    c = 0x10000 + (((c & 0x3FF) << 10) | c2);
		    out += hexTable[0xF0 | (c >> 18)] +
		           hexTable[0x80 | ((c >> 12) & 0x3F)] +
		           hexTable[0x80 | ((c >> 6) & 0x3F)] +
		           hexTable[0x80 | (c & 0x3F)];
		  }
		  if (lastPos === 0)
		    return str;
		  if (lastPos < str.length)
		    return out + str.slice(lastPos);
		  return out;
		};
		var stringifyPrimitive = function(v) {
		  if (typeof v === 'string')
		    return v;
		  if (typeof v === 'number' && isFinite(v))
		    return '' + v;
		  if (typeof v === 'boolean')
		    return v ? 'true' : 'false';
		  return '';
		};

		this.stringify = function(obj, sep, eq, options) {
		  sep = sep || '&';
		  eq = eq || '=';

		  var encode = QueryString.escape;
		  if (options && typeof options.encodeURIComponent === 'function') {
		    encode = options.encodeURIComponent;
		  }

		  if (obj !== null && typeof obj === 'object') {
		    var keys = Object.keys(obj);
		    var len = keys.length;
		    var flast = len - 1;
		    var fields = '';
		    for (var i = 0; i < len; ++i) {
		      var k = keys[i];
		      var v = obj[k];
		      var ks = encode(stringifyPrimitive(k)) + eq;

		      if (Array.isArray(v)) {
		        var vlen = v.length;
		        var vlast = vlen - 1;
		        for (var j = 0; j < vlen; ++j) {
		          fields += ks + encode(stringifyPrimitive(v[j]));
		          if (j < vlast)
		            fields += sep;
		        }
		        if (vlen && i < flast)
		          fields += sep;
		      } else {
		        fields += ks + encode(stringifyPrimitive(v));
		        if (i < flast)
		          fields += sep;
		      }
		    }
		    return fields;
		  }
		  return '';
		};
	}).call(QueryString);
}).call(module.exports);