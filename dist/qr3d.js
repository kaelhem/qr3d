function t(){return(t=Object.assign||function(t){for(var r=1;r<arguments.length;r++){var e=arguments[r];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])}return t}).apply(this,arguments)}var r=function(){return"function"==typeof Promise&&Promise.prototype&&Promise.prototype.then},e={}.toString,n=Array.isArray||function(t){return"[object Array]"==e.call(t)},o=(i.TYPED_ARRAY_SUPPORT=function(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()}catch(t){return!1}}())?2147483647:1073741823;function i(t,r,e){return i.TYPED_ARRAY_SUPPORT||this instanceof i?"number"==typeof t?s(this,t):function(t,r,e,n){if("number"==typeof r)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&r instanceof ArrayBuffer?function(t,r,e,n){if(e<0||r.byteLength<e)throw new RangeError("'offset' is out of bounds");if(r.byteLength<e+(n||0))throw new RangeError("'length' is out of bounds");var o;return o=void 0===e&&void 0===n?new Uint8Array(r):void 0===n?new Uint8Array(r,e):new Uint8Array(r,e,n),i.TYPED_ARRAY_SUPPORT?o.__proto__=i.prototype:o=f(t,o),o}(t,r,e,n):"string"==typeof r?function(t,r){var e=0|l(r),n=u(t,e),o=n.write(r);return o!==e&&(n=n.slice(0,o)),n}(t,r):function(t,r){if(i.isBuffer(r)){var e=0|a(r.length),n=u(t,e);return 0===n.length?n:(r.copy(n,0,0,e),n)}if(r){if("undefined"!=typeof ArrayBuffer&&r.buffer instanceof ArrayBuffer||"length"in r)return"number"!=typeof r.length||(o=r.length)!=o?u(t,0):f(t,r);if("Buffer"===r.type&&Array.isArray(r.data))return f(t,r.data)}var o;throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(t,r)}(this,t,r,e):new i(t,r,e)}function a(t){if(t>=o)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+o.toString(16)+" bytes");return 0|t}function u(t,r){var e;return i.TYPED_ARRAY_SUPPORT?(e=new Uint8Array(r)).__proto__=i.prototype:(null===(e=t)&&(e=new i(r)),e.length=r),e}function s(t,r){var e=u(t,r<0?0:0|a(r));if(!i.TYPED_ARRAY_SUPPORT)for(var n=0;n<r;++n)e[n]=0;return e}function f(t,r){for(var e=r.length<0?0:0|a(r.length),n=u(t,e),o=0;o<e;o+=1)n[o]=255&r[o];return n}function h(t,r){var e;r=r||Infinity;for(var n=t.length,o=null,i=[],a=0;a<n;++a){if((e=t.charCodeAt(a))>55295&&e<57344){if(!o){if(e>56319){(r-=3)>-1&&i.push(239,191,189);continue}if(a+1===n){(r-=3)>-1&&i.push(239,191,189);continue}o=e;continue}if(e<56320){(r-=3)>-1&&i.push(239,191,189),o=e;continue}e=65536+(o-55296<<10|e-56320)}else o&&(r-=3)>-1&&i.push(239,191,189);if(o=null,e<128){if((r-=1)<0)break;i.push(e)}else if(e<2048){if((r-=2)<0)break;i.push(e>>6|192,63&e|128)}else if(e<65536){if((r-=3)<0)break;i.push(e>>12|224,e>>6&63|128,63&e|128)}else{if(!(e<1114112))throw new Error("Invalid code point");if((r-=4)<0)break;i.push(e>>18|240,e>>12&63|128,e>>6&63|128,63&e|128)}}return i}function l(t){return i.isBuffer(t)?t.length:"undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer)?t.byteLength:("string"!=typeof t&&(t=""+t),0===t.length?0:h(t).length)}i.TYPED_ARRAY_SUPPORT&&(i.prototype.__proto__=Uint8Array.prototype,i.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&i[Symbol.species]===i&&Object.defineProperty(i,Symbol.species,{value:null,configurable:!0,enumerable:!1,writable:!1})),i.prototype.write=function(t,r,e){void 0===r?(e=this.length,r=0):void 0===e&&"string"==typeof r?(e=this.length,r=0):isFinite(r)&&(r|=0,isFinite(e)?e|=0:e=void 0);var n=this.length-r;if((void 0===e||e>n)&&(e=n),t.length>0&&(e<0||r<0)||r>this.length)throw new RangeError("Attempt to write outside buffer bounds");return function(t,r,e,n){return function(t,r,e,n){for(var o=0;o<n&&!(o+e>=r.length||o>=t.length);++o)r[o+e]=t[o];return o}(h(r,t.length-e),t,e,n)}(this,t,r,e)},i.prototype.slice=function(t,r){var e,n=this.length;if((t=~~t)<0?(t+=n)<0&&(t=0):t>n&&(t=n),(r=void 0===r?n:~~r)<0?(r+=n)<0&&(r=0):r>n&&(r=n),r<t&&(r=t),i.TYPED_ARRAY_SUPPORT)(e=this.subarray(t,r)).__proto__=i.prototype;else{var o=r-t;e=new i(o,void 0);for(var a=0;a<o;++a)e[a]=this[a+t]}return e},i.prototype.copy=function(t,r,e,n){if(e||(e=0),n||0===n||(n=this.length),r>=t.length&&(r=t.length),r||(r=0),n>0&&n<e&&(n=e),n===e)return 0;if(0===t.length||0===this.length)return 0;if(r<0)throw new RangeError("targetStart out of bounds");if(e<0||e>=this.length)throw new RangeError("sourceStart out of bounds");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-r<n-e&&(n=t.length-r+e);var o,a=n-e;if(this===t&&e<r&&r<n)for(o=a-1;o>=0;--o)t[o+r]=this[o+e];else if(a<1e3||!i.TYPED_ARRAY_SUPPORT)for(o=0;o<a;++o)t[o+r]=this[o+e];else Uint8Array.prototype.set.call(t,this.subarray(e,e+a),r);return a},i.prototype.fill=function(t,r,e){if("string"==typeof t){if("string"==typeof r?(r=0,e=this.length):"string"==typeof e&&(e=this.length),1===t.length){var n=t.charCodeAt(0);n<256&&(t=n)}}else"number"==typeof t&&(t&=255);if(r<0||this.length<r||this.length<e)throw new RangeError("Out of range index");if(e<=r)return this;var o;if(r>>>=0,e=void 0===e?this.length:e>>>0,t||(t=0),"number"==typeof t)for(o=r;o<e;++o)this[o]=t;else{var a=i.isBuffer(t)?t:new i(t),u=a.length;for(o=0;o<e-r;++o)this[o+r]=a[o%u]}return this},i.concat=function(t,r){if(!n(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return u(null,0);var e;if(void 0===r)for(r=0,e=0;e<t.length;++e)r+=t[e].length;var o=s(null,r),a=0;for(e=0;e<t.length;++e){var f=t[e];if(!i.isBuffer(f))throw new TypeError('"list" argument must be an Array of Buffers');f.copy(o,a),a+=f.length}return o},i.byteLength=l,i.prototype._isBuffer=!0,i.isBuffer=function(t){return!(null==t||!t._isBuffer)};var c,g=i,d=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706],p={getSymbolSize:function(t){if(!t)throw new Error('"version" cannot be null or undefined');if(t<1||t>40)throw new Error('"version" should be in range from 1 to 40');return 4*t+17},getSymbolTotalCodewords:function(t){return d[t]},getBCHDigit:function(t){for(var r=0;0!==t;)r++,t>>>=1;return r},setToSJISFunction:function(t){if("function"!=typeof t)throw new Error('"toSJISFunc" is not a valid function.');c=t},isKanjiModeEnabled:function(){return void 0!==c},toSJIS:function(t){return c(t)}};function v(t,r){return t(r={exports:{}},r.exports),r.exports}var y=v(function(t,r){r.L={bit:1},r.M={bit:0},r.Q={bit:3},r.H={bit:2},r.isValid=function(t){return t&&void 0!==t.bit&&t.bit>=0&&t.bit<4},r.from=function(t,e){if(r.isValid(t))return t;try{return function(t){if("string"!=typeof t)throw new Error("Param is not a string");switch(t.toLowerCase()){case"l":case"low":return r.L;case"m":case"medium":return r.M;case"q":case"quartile":return r.Q;case"h":case"high":return r.H;default:throw new Error("Unknown EC Level: "+t)}}(t)}catch(t){return e}}});function w(){this.buffer=[],this.length=0}w.prototype={get:function(t){var r=Math.floor(t/8);return 1==(this.buffer[r]>>>7-t%8&1)},put:function(t,r){for(var e=0;e<r;e++)this.putBit(1==(t>>>r-e-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var r=Math.floor(this.length/8);this.buffer.length<=r&&this.buffer.push(0),t&&(this.buffer[r]|=128>>>this.length%8),this.length++}};var m=w;function E(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new g(t*t),this.data.fill(0),this.reservedBit=new g(t*t),this.reservedBit.fill(0)}E.prototype.set=function(t,r,e,n){var o=t*this.size+r;this.data[o]=e,n&&(this.reservedBit[o]=!0)},E.prototype.get=function(t,r){return this.data[t*this.size+r]},E.prototype.xor=function(t,r,e){this.data[t*this.size+r]^=e},E.prototype.isReserved=function(t,r){return this.reservedBit[t*this.size+r]};var b,B,A=E,R=v(function(t,r){var e=p.getSymbolSize;r.getRowColCoords=function(t){if(1===t)return[];for(var r=Math.floor(t/7)+2,n=e(t),o=145===n?26:2*Math.ceil((n-13)/(2*r-2)),i=[n-7],a=1;a<r-1;a++)i[a]=i[a-1]-o;return i.push(6),i.reverse()},r.getPositions=function(t){for(var e=[],n=r.getRowColCoords(t),o=n.length,i=0;i<o;i++)for(var a=0;a<o;a++)0===i&&0===a||0===i&&a===o-1||i===o-1&&0===a||e.push([n[i],n[a]]);return e}}),P=p.getSymbolSize,C=v(function(t,r){function e(t,e,n){switch(t){case r.Patterns.PATTERN000:return(e+n)%2==0;case r.Patterns.PATTERN001:return e%2==0;case r.Patterns.PATTERN010:return n%3==0;case r.Patterns.PATTERN011:return(e+n)%3==0;case r.Patterns.PATTERN100:return(Math.floor(e/2)+Math.floor(n/3))%2==0;case r.Patterns.PATTERN101:return e*n%2+e*n%3==0;case r.Patterns.PATTERN110:return(e*n%2+e*n%3)%2==0;case r.Patterns.PATTERN111:return(e*n%3+(e+n)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}}r.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},r.isValid=function(t){return null!=t&&""!==t&&!isNaN(t)&&t>=0&&t<=7},r.from=function(t){return r.isValid(t)?parseInt(t,10):void 0},r.getPenaltyN1=function(t){for(var r=t.size,e=0,n=0,o=0,i=null,a=null,u=0;u<r;u++){n=o=0,i=a=null;for(var s=0;s<r;s++){var f=t.get(u,s);f===i?n++:(n>=5&&(e+=n-5+3),i=f,n=1),(f=t.get(s,u))===a?o++:(o>=5&&(e+=o-5+3),a=f,o=1)}n>=5&&(e+=n-5+3),o>=5&&(e+=o-5+3)}return e},r.getPenaltyN2=function(t){for(var r=t.size,e=0,n=0;n<r-1;n++)for(var o=0;o<r-1;o++){var i=t.get(n,o)+t.get(n,o+1)+t.get(n+1,o)+t.get(n+1,o+1);4!==i&&0!==i||e++}return 3*e},r.getPenaltyN3=function(t){for(var r=t.size,e=0,n=0,o=0,i=0;i<r;i++){n=o=0;for(var a=0;a<r;a++)n=n<<1&2047|t.get(i,a),a>=10&&(1488===n||93===n)&&e++,o=o<<1&2047|t.get(a,i),a>=10&&(1488===o||93===o)&&e++}return 40*e},r.getPenaltyN4=function(t){for(var r=0,e=t.data.length,n=0;n<e;n++)r+=t.data[n];return 10*Math.abs(Math.ceil(100*r/e/5)-10)},r.applyMask=function(t,r){for(var n=r.size,o=0;o<n;o++)for(var i=0;i<n;i++)r.isReserved(i,o)||r.xor(i,o,e(t,i,o))},r.getBestMask=function(t,e){for(var n=Object.keys(r.Patterns).length,o=0,i=Infinity,a=0;a<n;a++){e(a),r.applyMask(a,t);var u=r.getPenaltyN1(t)+r.getPenaltyN2(t)+r.getPenaltyN3(t)+r.getPenaltyN4(t);r.applyMask(a,t),u<i&&(i=u,o=a)}return o}}),T=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],I=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430],M=function(t,r){switch(r){case y.L:return T[4*(t-1)+0];case y.M:return T[4*(t-1)+1];case y.Q:return T[4*(t-1)+2];case y.H:return T[4*(t-1)+3];default:return}},N=function(t,r){switch(r){case y.L:return I[4*(t-1)+0];case y.M:return I[4*(t-1)+1];case y.Q:return I[4*(t-1)+2];case y.H:return I[4*(t-1)+3];default:return}};g.alloc?(b=g.alloc(512),B=g.alloc(256)):(b=new g(512),B=new g(256)),function(){for(var t=1,r=0;r<255;r++)b[r]=t,B[t]=r,256&(t<<=1)&&(t^=285);for(r=255;r<512;r++)b[r]=b[r-255]}();var _=function(t,r){return 0===t||0===r?0:b[B[t]+B[r]]},S=v(function(t,r){r.mul=function(t,r){var e=new g(t.length+r.length-1);e.fill(0);for(var n=0;n<t.length;n++)for(var o=0;o<r.length;o++)e[n+o]^=_(t[n],r[o]);return e},r.mod=function(t,r){for(var e=new g(t);e.length-r.length>=0;){for(var n=e[0],o=0;o<r.length;o++)e[o]^=_(r[o],n);for(var i=0;i<e.length&&0===e[i];)i++;e=e.slice(i)}return e},r.generateECPolynomial=function(t){for(var e=new g([1]),n=0;n<t;n++)e=r.mul(e,[1,(o=n,b[o])]);var o;return e}});function L(t){this.genPoly=void 0,this.degree=t,this.degree&&this.initialize(this.degree)}L.prototype.initialize=function(t){this.degree=t,this.genPoly=S.generateECPolynomial(this.degree)},L.prototype.encode=function(t){if(!this.genPoly)throw new Error("Encoder not initialized");var r=new g(this.degree);r.fill(0);var e=g.concat([t,r],t.length+this.degree),n=S.mod(e,this.genPoly),o=this.degree-n.length;if(o>0){var i=new g(this.degree);return i.fill(0),n.copy(i,o),i}return n};var U=L,x=function(t){return!isNaN(t)&&t>=1&&t<=40},Y="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+",D="(?:(?![A-Z0-9 $%*+\\-./:]|"+(Y=Y.replace(/u/g,"\\u"))+")(?:.|[\r\n]))+",z=new RegExp(Y,"g"),F=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),k=new RegExp(D,"g"),O=new RegExp("[0-9]+","g"),H=new RegExp("[A-Z $%*+\\-./:]+","g"),J=new RegExp("^"+Y+"$"),j=new RegExp("^[0-9]+$"),K=new RegExp("^[A-Z0-9 $%*+\\-./:]+$"),q={KANJI:z,BYTE_KANJI:F,BYTE:k,NUMERIC:O,ALPHANUMERIC:H,testKanji:function(t){return J.test(t)},testNumeric:function(t){return j.test(t)},testAlphanumeric:function(t){return K.test(t)}},Q=v(function(t,r){r.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},r.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},r.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},r.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},r.MIXED={bit:-1},r.getCharCountIndicator=function(t,r){if(!t.ccBits)throw new Error("Invalid mode: "+t);if(!x(r))throw new Error("Invalid version: "+r);return r>=1&&r<10?t.ccBits[0]:r<27?t.ccBits[1]:t.ccBits[2]},r.getBestModeForData=function(t){return q.testNumeric(t)?r.NUMERIC:q.testAlphanumeric(t)?r.ALPHANUMERIC:q.testKanji(t)?r.KANJI:r.BYTE},r.toString=function(t){if(t&&t.id)return t.id;throw new Error("Invalid mode")},r.isValid=function(t){return t&&t.bit&&t.ccBits},r.from=function(t,e){if(r.isValid(t))return t;try{return function(t){if("string"!=typeof t)throw new Error("Param is not a string");switch(t.toLowerCase()){case"numeric":return r.NUMERIC;case"alphanumeric":return r.ALPHANUMERIC;case"kanji":return r.KANJI;case"byte":return r.BYTE;default:throw new Error("Unknown mode: "+t)}}(t)}catch(t){return e}}}),V=v(function(t,r){var e=p.getBCHDigit(7973);function o(t,r){return Q.getCharCountIndicator(t,r)+4}function i(t,r){var e=0;return t.forEach(function(t){var n=o(t.mode,r);e+=n+t.getBitsLength()}),e}r.from=function(t,r){return x(t)?parseInt(t,10):r},r.getCapacity=function(t,r,e){if(!x(t))throw new Error("Invalid QR Code version");void 0===e&&(e=Q.BYTE);var n=8*(p.getSymbolTotalCodewords(t)-N(t,r));if(e===Q.MIXED)return n;var i=n-o(e,t);switch(e){case Q.NUMERIC:return Math.floor(i/10*3);case Q.ALPHANUMERIC:return Math.floor(i/11*2);case Q.KANJI:return Math.floor(i/13);case Q.BYTE:default:return Math.floor(i/8)}},r.getBestVersionForData=function(t,e){var o,a=y.from(e,y.M);if(n(t)){if(t.length>1)return function(t,e){for(var n=1;n<=40;n++)if(i(t,n)<=r.getCapacity(n,e,Q.MIXED))return n}(t,a);if(0===t.length)return 1;o=t[0]}else o=t;return function(t,e,n){for(var o=1;o<=40;o++)if(e<=r.getCapacity(o,n,t))return o}(o.mode,o.getLength(),a)},r.getEncodedBits=function(t){if(!x(t)||t<7)throw new Error("Invalid QR Code version");for(var r=t<<12;p.getBCHDigit(r)-e>=0;)r^=7973<<p.getBCHDigit(r)-e;return t<<12|r}}),$=p.getBCHDigit(1335),Z={getEncodedBits:function(t,r){for(var e=t.bit<<3|r,n=e<<10;p.getBCHDigit(n)-$>=0;)n^=1335<<p.getBCHDigit(n)-$;return 21522^(e<<10|n)}};function X(t){this.mode=Q.NUMERIC,this.data=t.toString()}X.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)},X.prototype.getLength=function(){return this.data.length},X.prototype.getBitsLength=function(){return X.getBitsLength(this.data.length)},X.prototype.write=function(t){var r,e,n;for(r=0;r+3<=this.data.length;r+=3)e=this.data.substr(r,3),n=parseInt(e,10),t.put(n,10);var o=this.data.length-r;o>0&&(e=this.data.substr(r),n=parseInt(e,10),t.put(n,3*o+1))};var W=X,G=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function tt(t){this.mode=Q.ALPHANUMERIC,this.data=t}tt.getBitsLength=function(t){return 11*Math.floor(t/2)+t%2*6},tt.prototype.getLength=function(){return this.data.length},tt.prototype.getBitsLength=function(){return tt.getBitsLength(this.data.length)},tt.prototype.write=function(t){var r;for(r=0;r+2<=this.data.length;r+=2){var e=45*G.indexOf(this.data[r]);e+=G.indexOf(this.data[r+1]),t.put(e,11)}this.data.length%2&&t.put(G.indexOf(this.data[r]),6)};var rt=tt;function et(t){this.mode=Q.BYTE,this.data=new g(t)}et.getBitsLength=function(t){return 8*t},et.prototype.getLength=function(){return this.data.length},et.prototype.getBitsLength=function(){return et.getBitsLength(this.data.length)},et.prototype.write=function(t){for(var r=0,e=this.data.length;r<e;r++)t.put(this.data[r],8)};var nt=et;function ot(t){this.mode=Q.KANJI,this.data=t}ot.getBitsLength=function(t){return 13*t},ot.prototype.getLength=function(){return this.data.length},ot.prototype.getBitsLength=function(){return ot.getBitsLength(this.data.length)},ot.prototype.write=function(t){var r;for(r=0;r<this.data.length;r++){var e=p.toSJIS(this.data[r]);if(e>=33088&&e<=40956)e-=33088;else{if(!(e>=57408&&e<=60351))throw new Error("Invalid SJIS character: "+this.data[r]+"\nMake sure your charset is UTF-8");e-=49472}t.put(e=192*(e>>>8&255)+(255&e),13)}};var it=ot,at=v(function(t){var r={single_source_shortest_paths:function(t,e,n){var o={},i={};i[e]=0;var a,u,s,f,h,l,c=r.PriorityQueue.make();for(c.push(e,0);!c.empty();)for(s in f=(a=c.pop()).cost,h=t[u=a.value]||{})h.hasOwnProperty(s)&&(l=f+h[s],(void 0===i[s]||i[s]>l)&&(i[s]=l,c.push(s,l),o[s]=u));if(void 0!==n&&void 0===i[n]){var g=["Could not find a path from ",e," to ",n,"."].join("");throw new Error(g)}return o},extract_shortest_path_from_predecessor_list:function(t,r){for(var e=[],n=r;n;)e.push(n),n=t[n];return e.reverse(),e},find_path:function(t,e,n){var o=r.single_source_shortest_paths(t,e,n);return r.extract_shortest_path_from_predecessor_list(o,n)},PriorityQueue:{make:function(t){var e,n=r.PriorityQueue,o={};for(e in t=t||{},n)n.hasOwnProperty(e)&&(o[e]=n[e]);return o.queue=[],o.sorter=t.sorter||n.default_sorter,o},default_sorter:function(t,r){return t.cost-r.cost},push:function(t,r){this.queue.push({value:t,cost:r}),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return 0===this.queue.length}}};t.exports=r}),ut=v(function(t,r){function e(t){return unescape(encodeURIComponent(t)).length}function n(t,r,e){for(var n,o=[];null!==(n=t.exec(e));)o.push({data:n[0],index:n.index,mode:r,length:n[0].length});return o}function o(t){var r,e,o=n(q.NUMERIC,Q.NUMERIC,t),i=n(q.ALPHANUMERIC,Q.ALPHANUMERIC,t);return p.isKanjiModeEnabled()?(r=n(q.BYTE,Q.BYTE,t),e=n(q.KANJI,Q.KANJI,t)):(r=n(q.BYTE_KANJI,Q.BYTE,t),e=[]),o.concat(i,r,e).sort(function(t,r){return t.index-r.index}).map(function(t){return{data:t.data,mode:t.mode,length:t.length}})}function i(t,r){switch(r){case Q.NUMERIC:return W.getBitsLength(t);case Q.ALPHANUMERIC:return rt.getBitsLength(t);case Q.KANJI:return it.getBitsLength(t);case Q.BYTE:return nt.getBitsLength(t)}}function a(t,r){var e,n=Q.getBestModeForData(t);if((e=Q.from(r,n))!==Q.BYTE&&e.bit<n.bit)throw new Error('"'+t+'" cannot be encoded with mode '+Q.toString(e)+".\n Suggested mode is: "+Q.toString(n));switch(e!==Q.KANJI||p.isKanjiModeEnabled()||(e=Q.BYTE),e){case Q.NUMERIC:return new W(t);case Q.ALPHANUMERIC:return new rt(t);case Q.KANJI:return new it(t);case Q.BYTE:return new nt(t)}}r.fromArray=function(t){return t.reduce(function(t,r){return"string"==typeof r?t.push(a(r,null)):r.data&&t.push(a(r.data,r.mode)),t},[])},r.fromString=function(t,n){for(var a=function(t,r){for(var e={},n={start:{}},o=["start"],a=0;a<t.length;a++){for(var u=t[a],s=[],f=0;f<u.length;f++){var h=u[f],l=""+a+f;s.push(l),e[l]={node:h,lastCount:0},n[l]={};for(var c=0;c<o.length;c++){var g=o[c];e[g]&&e[g].node.mode===h.mode?(n[g][l]=i(e[g].lastCount+h.length,h.mode)-i(e[g].lastCount,h.mode),e[g].lastCount+=h.length):(e[g]&&(e[g].lastCount=h.length),n[g][l]=i(h.length,h.mode)+4+Q.getCharCountIndicator(h.mode,r))}}o=s}for(c=0;c<o.length;c++)n[o[c]].end=0;return{map:n,table:e}}(function(t){for(var r=[],n=0;n<t.length;n++){var o=t[n];switch(o.mode){case Q.NUMERIC:r.push([o,{data:o.data,mode:Q.ALPHANUMERIC,length:o.length},{data:o.data,mode:Q.BYTE,length:o.length}]);break;case Q.ALPHANUMERIC:r.push([o,{data:o.data,mode:Q.BYTE,length:o.length}]);break;case Q.KANJI:r.push([o,{data:o.data,mode:Q.BYTE,length:e(o.data)}]);break;case Q.BYTE:r.push([{data:o.data,mode:Q.BYTE,length:e(o.data)}])}}return r}(o(t)),n),u=at.find_path(a.map,"start","end"),s=[],f=1;f<u.length-1;f++)s.push(a.table[u[f]].node);return r.fromArray(s.reduce(function(t,r){var e=t.length-1>=0?t[t.length-1]:null;return e&&e.mode===r.mode?(t[t.length-1].data+=r.data,t):(t.push(r),t)},[]))},r.rawSplit=function(t){return r.fromArray(o(t))}});function st(t,r,e){var n,o,i=t.size,a=Z.getEncodedBits(r,e);for(n=0;n<15;n++)t.set(n<6?n:n<8?n+1:i-15+n,8,o=1==(a>>n&1),!0),t.set(8,n<8?i-n-1:n<9?15-n-1+1:15-n-1,o,!0);t.set(i-8,8,1,!0)}var ft={create:function(t,r){if(void 0===t||""===t)throw new Error("No input text");var e,o,i=y.M;return void 0!==r&&(i=y.from(r.errorCorrectionLevel,y.M),e=V.from(r.version),o=C.from(r.maskPattern),r.toSJISFunc&&p.setToSJISFunction(r.toSJISFunc)),function(t,r,e,o){var i;if(n(t))i=ut.fromArray(t);else{if("string"!=typeof t)throw new Error("Invalid data");var a=r;if(!a){var u=ut.rawSplit(t);a=V.getBestVersionForData(u,e)}i=ut.fromString(t,a||40)}var s=V.getBestVersionForData(i,e);if(!s)throw new Error("The amount of data is too big to be stored in a QR Code");if(r){if(r<s)throw new Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: "+s+".\n")}else r=s;var f=function(t,r,e){var n=new m;e.forEach(function(r){n.put(r.mode.bit,4),n.put(r.getLength(),Q.getCharCountIndicator(r.mode,t)),r.write(n)});var o=8*(p.getSymbolTotalCodewords(t)-N(t,r));for(n.getLengthInBits()+4<=o&&n.put(0,4);n.getLengthInBits()%8!=0;)n.putBit(0);for(var i=(o-n.getLengthInBits())/8,a=0;a<i;a++)n.put(a%2?17:236,8);return function(t,r,e){for(var n=p.getSymbolTotalCodewords(r),o=n-N(r,e),i=M(r,e),a=i-n%i,u=Math.floor(n/i),s=Math.floor(o/i),f=s+1,h=u-s,l=new U(h),c=0,d=new Array(i),v=new Array(i),y=0,w=new g(t.buffer),m=0;m<i;m++){var E=m<a?s:f;d[m]=w.slice(c,c+E),v[m]=l.encode(d[m]),c+=E,y=Math.max(y,E)}var b,B,A=new g(n),R=0;for(b=0;b<y;b++)for(B=0;B<i;B++)b<d[B].length&&(A[R++]=d[B][b]);for(b=0;b<h;b++)for(B=0;B<i;B++)A[R++]=v[B][b];return A}(n,t,r)}(r,e,i),h=p.getSymbolSize(r),l=new A(h);return function(t,e){for(var n=t.size,o=function(t){var e=P(r);return[[0,0],[e-7,0],[0,e-7]]}(),i=0;i<o.length;i++)for(var a=o[i][0],u=o[i][1],s=-1;s<=7;s++)if(!(a+s<=-1||n<=a+s))for(var f=-1;f<=7;f++)u+f<=-1||n<=u+f||t.set(a+s,u+f,s>=0&&s<=6&&(0===f||6===f)||f>=0&&f<=6&&(0===s||6===s)||s>=2&&s<=4&&f>=2&&f<=4,!0)}(l),function(t){for(var r=t.size,e=8;e<r-8;e++){var n=e%2==0;t.set(e,6,n,!0),t.set(6,e,n,!0)}}(l),function(t,e){for(var n=R.getPositions(r),o=0;o<n.length;o++)for(var i=n[o][0],a=n[o][1],u=-2;u<=2;u++)for(var s=-2;s<=2;s++)t.set(i+u,a+s,-2===u||2===u||-2===s||2===s||0===u&&0===s,!0)}(l),st(l,e,0),r>=7&&function(t,r){for(var e,n,o,i=t.size,a=V.getEncodedBits(r),u=0;u<18;u++)e=Math.floor(u/3),t.set(e,n=u%3+i-8-3,o=1==(a>>u&1),!0),t.set(n,e,o,!0)}(l,r),function(t,r){for(var e=t.size,n=-1,o=e-1,i=7,a=0,u=e-1;u>0;u-=2)for(6===u&&u--;;){for(var s=0;s<2;s++)if(!t.isReserved(o,u-s)){var f=!1;a<r.length&&(f=1==(r[a]>>>i&1)),t.set(o,u-s,f),-1==--i&&(a++,i=7)}if((o+=n)<0||e<=o){o-=n,n=-n;break}}}(l,f),isNaN(o)&&(o=C.getBestMask(l,st.bind(null,l,e))),C.applyMask(o,l),st(l,e,o),{modules:l,version:r,errorCorrectionLevel:e,maskPattern:o,segments:i}}(t,e,i,o)}},ht=v(function(t,r){function e(t){if("number"==typeof t&&(t=t.toString()),"string"!=typeof t)throw new Error("Color should be defined as hex string");var r=t.slice().replace("#","").split("");if(r.length<3||5===r.length||r.length>8)throw new Error("Invalid hex color: "+t);3!==r.length&&4!==r.length||(r=Array.prototype.concat.apply([],r.map(function(t){return[t,t]}))),6===r.length&&r.push("F","F");var e=parseInt(r.join(""),16);return{r:e>>24&255,g:e>>16&255,b:e>>8&255,a:255&e,hex:"#"+r.slice(0,6).join("")}}r.getOptions=function(t){t||(t={}),t.color||(t.color={});var r=t.width&&t.width>=21?t.width:void 0;return{width:r,scale:r?4:t.scale||4,margin:null==t.margin||t.margin<0?4:t.margin,color:{dark:e(t.color.dark||"#000000ff"),light:e(t.color.light||"#ffffffff")},type:t.type,rendererOpts:t.rendererOpts||{}}},r.getScale=function(t,r){return r.width&&r.width>=t+2*r.margin?r.width/(t+2*r.margin):r.scale},r.getImageWidth=function(t,e){var n=r.getScale(t,e);return Math.floor((t+2*e.margin)*n)},r.qrToImageData=function(t,e,n){for(var o=e.modules.size,i=e.modules.data,a=r.getScale(o,n),u=Math.floor((o+2*n.margin)*a),s=n.margin*a,f=[n.color.light,n.color.dark],h=0;h<u;h++)for(var l=0;l<u;l++){var c=4*(h*u+l),g=n.color.light;h>=s&&l>=s&&h<u-s&&l<u-s&&(g=f[i[Math.floor((h-s)/a)*o+Math.floor((l-s)/a)]?1:0]),t[c++]=g.r,t[c++]=g.g,t[c++]=g.b,t[c]=g.a}}}),lt=v(function(t,r){r.render=function(t,r,e){var n=e,o=r;void 0!==n||r&&r.getContext||(n=r,r=void 0),r||(o=function(){try{return document.createElement("canvas")}catch(t){throw new Error("You need to specify a canvas element")}}()),n=ht.getOptions(n);var i=ht.getImageWidth(t.modules.size,n),a=o.getContext("2d"),u=a.createImageData(i,i);return ht.qrToImageData(u.data,t,n),function(t,r,e){t.clearRect(0,0,r.width,r.height),r.style||(r.style={}),r.height=e,r.width=e,r.style.height=e+"px",r.style.width=e+"px"}(a,o,i),a.putImageData(u,0,0),o},r.renderToDataURL=function(t,e,n){var o=n;return void 0!==o||e&&e.getContext||(o=e,e=void 0),o||(o={}),r.render(t,e,o).toDataURL(o.type||"image/png",(o.rendererOpts||{}).quality)}});function ct(t,r){var e=t.a/255,n=r+'="'+t.hex+'"';return e<1?n+" "+r+'-opacity="'+e.toFixed(2).slice(1)+'"':n}function gt(t,r,e){var n=t+r;return void 0!==e&&(n+=" "+e),n}function dt(t,e,n,o,i){var a=[].slice.call(arguments,1),u=a.length,s="function"==typeof a[u-1];if(!s&&!r())throw new Error("Callback required as last argument");if(!s){if(u<1)throw new Error("Too few arguments provided");return 1===u?(n=e,e=o=void 0):2!==u||e.getContext||(o=n,n=e,e=void 0),new Promise(function(r,i){try{var a=ft.create(n,o);r(t(a,e,o))}catch(t){i(t)}})}if(u<2)throw new Error("Too few arguments provided");2===u?(i=n,n=e,e=o=void 0):3===u&&(e.getContext&&void 0===i?(i=o,o=void 0):(i=o,o=n,n=e,e=void 0));try{var f=ft.create(n,o);i(null,t(f,e,o))}catch(t){i(t)}}var pt={create:ft.create,toCanvas:dt.bind(null,lt.render),toDataURL:dt.bind(null,lt.renderToDataURL),toString:dt.bind(null,function(t,r,e){return function(t,r,e){var n=ht.getOptions(r),o=t.modules.size,i=t.modules.data,a=o+2*n.margin,u=n.color.light.a?"<path "+ct(n.color.light,"fill")+' d="M0 0h'+a+"v"+a+'H0z"/>':"",s="<path "+ct(n.color.dark,"stroke")+' d="'+function(t,r,e){for(var n="",o=0,i=!1,a=0,u=0;u<t.length;u++){var s=Math.floor(u%r),f=Math.floor(u/r);s||i||(i=!0),t[u]?(a++,u>0&&s>0&&t[u-1]||(n+=i?gt("M",s+e,.5+f+e):gt("m",o,0),o=0,i=!1),s+1<r&&t[u+1]||(n+=gt("h",a),a=0)):o++}return n}(i,o,n.margin)+'"/>';return'<svg xmlns="http://www.w3.org/2000/svg" '+(n.width?'width="'+n.width+'" height="'+n.width+'" ':"")+'viewBox="0 0 '+a+" "+a+'" shape-rendering="crispEdges">'+u+s+"</svg>\n"}(t,e)})},vt=function(t){var r,e,n,o,i,a,u,s,f,h,l,c,g,d=t.verts;return h=(i=d[1][1]-(e=d[0][1]))*(f=d[2][2]-(n=d[0][2]))-(a=d[1][2]-n)*(s=d[2][1]-e),l=a*(u=d[2][0]-(r=d[0][0]))-(o=d[1][0]-r)*f,c=o*s-i*u,0===(g=Math.sqrt(h*h+l*l+c*c))?[0,0,0]:[h,l,c].map(function(t){return t/g})},yt=function(t,r,e){return[t,r,e].map(function(t){return t.toExponential()})},wt=function(t,r){void 0===r&&(r={});var e=r.description,n=void 0===e?"":e,o=r.binary;return void 0!==o&&o?function(t,r){void 0===r&&(r="");var e=t.length,n=!0;try{n=Boolean(Buffer)}catch(t){n=!1}var o=function(t,r){var e=t?Buffer.alloc(r):new DataView(new ArrayBuffer(r));return t&&e.fill(0,0,80),{writeBuffer:function(r,n,o){switch(void 0===o&&(o=0),r){case"uint16":return t?e.writeUInt16LE(n,o):e.setUint16(o,n,!0);case"uint32":return t?e.writeUInt32LE(n,o):e.setUint32(o,n,!0);case"float":return t?e.writeFloatLE(n,o):e.setFloat32(o,n,!0);case"string":return t?e.write(n,o):null;default:throw new Error("No type specified")}},getBuffer:function(){return t?e:e.buffer}}}(n,84+12*e*4+2*e),i=o.writeBuffer,a=o.getBuffer;i("string",r),i("uint32",e,80);for(var u=84,s=function(t,r){void 0===r&&(r="float"),i(r,t,u),u+=4},f=0;f<t.length;f++){var h=t[f],l=h.normal||vt(h);s(l[0]),s(l[1]),s(l[2]);for(var c=0;c<h.verts.length;c++){var g=h.verts[c];s(g[0]),s(g[1]),s(g[2])}i("uint16",33825,u),u+=2}return a()}(t,n):function(t,r){void 0===r&&(r="");for(var e=["solid "+r.trim()],n="      vertex ",o=0;o<t.length;o++){var i=t[o],a=i.normal||vt(i);e.push("  facet normal "+yt(a[0],a[1],a[2]).join(" ")),e.push("    outer loop");var u=i.verts;e.push(n+yt(u[0][0],u[0][1],u[0][2]).join(" ")),e.push(n+yt(u[1][0],u[1][1],u[1][2]).join(" ")),e.push(n+yt(u[2][0],u[2][1],u[2][2]).join(" ")),e.push("    endloop"),e.push("  endfacet")}return e.push("endsolid"),e.join("\n")}(t,n)},mt={top:!0,bottom:!0,left:!0,right:!0},Et=function(r){var e=r.origins,n=r.size,o=r.height,i=r.walls,a=e[0],u=e[1],s=e[2],f=t({},mt,{},void 0===i?mt:i),h=[{normal:[0,0,-1],verts:[[a,u,s],[a,u+n,s],[a+n,u+n,s]],attributeByteCount:0},{normal:[0,0,-1],verts:[[a,u,s],[a+n,u+n,s],[a+n,u,s]],attributeByteCount:0},{normal:[0,0,1],verts:[[a,u+n,s+o],[a,u,s+o],[a+n,u+n,s+o]],attributeByteCount:0},{normal:[0,0,1],verts:[[a+n,u+n,s+o],[a,u,s+o],[a+n,u,s+o]],attributeByteCount:0}];return f.top&&h.push({normal:[0,-1,0],verts:[[a,u,s],[a+n,u,s],[a+n,u,s+o]],attributeByteCount:0},{normal:[0,-1,0],verts:[[a,u,s],[a+n,u,s+o],[a,u,s+o]],attributeByteCount:0}),f.bottom&&h.push({normal:[0,1,0],verts:[[a+n,u+n,s],[a,u+n,s],[a+n,u+n,s+o]],attributeByteCount:0},{normal:[0,1,0],verts:[[a+n,u+n,s+o],[a,u+n,s],[a,u+n,s+o]],attributeByteCount:0}),f.left&&h.push({normal:[-1,0,0],verts:[[a,u+n,s+o],[a,u,s],[a,u,s+o]],attributeByteCount:0},{normal:[-1,0,0],verts:[[a,u+n,s],[a,u,s],[a,u+n,s+o]],attributeByteCount:0}),f.right&&h.push({normal:[1,0,0],verts:[[a+n,u,s],[a+n,u+n,s+o],[a+n,u,s+o]],attributeByteCount:0},{normal:[1,0,0],verts:[[a+n,u,s],[a+n,u+n,s],[a+n,u+n,s+o]],attributeByteCount:0}),h};module.exports=function(){for(var r=arguments.length,e=new Array(r),n=0;n<r;n++)e[n]=arguments[n];var o=e[0];if("string"==typeof e[0]){var i=e.length>1?e[1]:{};o=t({},i,{text:e[0]})}for(var a=o,u=a.text,s=a.bitSize,f=void 0===s?4:s,h=a.height,l=void 0===h?2:h,c=a.base,g=void 0===c?2:c,d=a.binary,p=void 0!==d&&d,v=JSON.parse(JSON.stringify(pt.create(u))),y=v.modules.size,w=v.modules.data,m=w.data?w.data.join(""):Object.values(w).join(""),E=[],b=0;b<y;++b){var B=b*y,A=m.slice(B,B+y);E.push(A.split("").map(function(t){return parseInt(t,10)}))}for(var R=g>0?[].concat(Et({origins:[0,0,0],size:f*y,height:g})):[],P=0;P<y;++P)for(var C=0;C<y;++C)1===E[P][C]&&R.push.apply(R,Et({origins:[P*f,C*f,g],size:f,height:l,normalRatio:.5,walls:{top:0===C||0===E[P][C-1],bottom:C===y-1||0===E[P][C+1],left:0===P||0===E[P-1][C],right:P===y-1||0===E[P+1][C]}}));return wt(R,{description:"QRCode generated with qr3D - "+u,binary:p})};
//# sourceMappingURL=qr3d.js.map
