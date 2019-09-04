const qr3D = require('../../dist/qr3d')
const fs = require('fs')

const qr3dAscii = qr3D('https://www.npmjs.com/package/qr3d', { base: 2, height: 2, bitSize: 4, binary: true })

fs.writeFileSync('sample.stl', qr3dAscii)