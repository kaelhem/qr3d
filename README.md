![logo](https://raw.githubusercontent.com/kaelhem/qr3d/master/resources/qr3d-logo-256.png)


A simple library to generate 3D printable QR codes on both NodeJS and browser web apps!

[![sample](https://raw.githubusercontent.com/kaelhem/qr3d/master/resources/sample.png)](https://github.com/kaelhem/qr3d/blob/master/resources/sample.stl)

## Install

```bash
# with npm
npm i qr3d --save

# or with yarn:
yarn add qr3d
```

## Use

### NodeJs

```js
const qr3D = require('qr3d')
const fs = require('fs')

fs.writeFileSync('sample.stl', qr3D('https://www.npmjs.com/package/qr3d'))
```

### Modern web

```js
import qr3D from 'qr3d'
import { saveAs } from 'file-saver'

const qr3dAscii = qr3D(content)
const blob = new Blob([qr3dAscii], {type: 'text/plain;charset=utf-8'})
saveAs(blob, 'sample.stl')
```

### Good old web

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/qr3d@1.0.0/dist/qr3d.umd.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/file-saver@2.0.2/dist/FileSaver.min.js"></script>
<script type="text/javascript">
  var exportStl = function(content, options) {
    var qr3dAscii = qr3D(content, options);
    var blob = new Blob([qr3dAscii], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "sample.stl");
  }
</script>
```
--

You can also have a look at the _samples_ folder for a [react sample](https://github.com/kaelhem/qr3d/blob/master/samples/web/sample-react.js).

### API

**qr3D** expose only one function (with the same name) which has 2 signatures:

* qr3D(_stringToEncode_, _options_)
* qr3D(_options_)

_stringToEncode_ should be a string. It's the string to encode into QRCode.
_options_ will copy this string into his "text" property.
In this scenario, a given "text" in the _options_ object will be replaced by the _stringToEncode_ value.

The _options_ parameters are :

|Name|Type|Default value|Description
|---|---|---|---
|**text**|`String`|   |the text to QR-encode
|**bitSize**|`Number`|4|Width/Depth (mm) of the cells composing the QRcode grid
|**height**|`Number`|2|Height (mm) of the qrcode part
|**base**|`Number`|2|Height (mm) of the solid base part
|**binary**|`Boolean`|false|Output .stl content as Buffer/ArrayBuffer (depending on platform)


## Contributing

Contributions in any form are welcome! If you find a bug, please [file an issue.](https://github.com/kaelhem/qr3d/issues)

## License

This project is licensed under the MIT license. See the [LICENSE file](./LICENSE.md) for more details.
