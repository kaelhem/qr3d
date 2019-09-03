# qr3D

A simple library to generate 3D printable QR codes !

[![sample](https://raw.githubusercontent.com/kaelhem/qr3d/master/sample.png)](https://github.com/kaelhem/qr3d/blob/master/sample.stl)

It works on NodeJS and web-browser based apps.

## How it works?

### NodeJs

```js
const qr3D = require('qr3d')
const fs = require('fs')

fs.writeFileSync('sample.stl', qr3D('https://www.npmjs.com/package/qr3d'))
```

### Web

```js
import qr3D from 'qr3d'
import { saveAs } from 'file-saver'

const qr3dAscii = qr3D(content)
const blob = new Blob([qr3dAscii], {type: 'text/plain;charset=utf-8'})
saveAs(blob, 'sample.stl')
```

See more samples in _samples_ folder.

## Options

**qr3D** accepts 2 signatures:

* qr3D(_stringToEncode_, _options_)
* qr3D(_options_)

_stringToEncode_ should be a string. It's the string to encode into QRCode.
_options_ will copy this string into his "text" property.

_options_ parameters are :

|name|type|default value|description|
|---|---|---|---|
|text|String|   |the text to QR-encode|
|bitSize|Number|4|Width/Depth (mm) of the cells composing the QRcode grid|
|height|Number|2|Height (mm) of the qrcode part|
|base|Number|2|Height (mm) of the solid base part|


## Contributing

Contributions in any form are welcome! If you find a bug, please [file an issue.](https://github.com/kaelhem/katpat/issues)

## License

This project is licensed under the MIT license. See the [LICENSE file](./LICENSE.md) for more details.
