const qr3D = require('../../dist/qr3d')
const fs = require('fs')

const qr3dAscii = qr3D('https://www.npmjs.com/package/qr3d', { binary: false })
fs.writeFileSync('sample-ascii.stl', qr3dAscii.data)

const qr3dBinary = qr3D('https://www.npmjs.com/package/qr3d')
fs.writeFileSync('sample-binary.stl', qr3dBinary.data)