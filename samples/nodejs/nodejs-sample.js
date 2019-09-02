const qr3D = require('../../dist/qr3d')
const fs = require('fs')

const qr3dAscii = qr3D('https://exemple.com', { base: 2, height: 2, bitSize: 4 })

fs.writeFileSync('sample.stl', qr3dAscii)