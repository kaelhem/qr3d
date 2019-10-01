const qr3D = require('../../dist/qr3d')
const fs = require('fs')

const options = {
  base: 2,
  height: 1,
  bitSize: 2
}

const qr3dAscii = qr3D('https://www.npmjs.com/package/qr3d', { binary: false, ...options })
fs.writeFileSync('sample-ascii.stl', qr3dAscii.data)

const qr3dBinary = qr3D('https://www.npmjs.com/package/qr3d', options)
fs.writeFileSync('sample-binary.stl', qr3dBinary.data)