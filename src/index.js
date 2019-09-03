import QRCode from 'qrcode'
import stlWriter from './stl-writer'

const defaultWalls = {
  top: true,
  bottom: true,
  left: true,
  right: true
}

const createCube = ({origins, size, height, walls = defaultWalls}) => {
  const [ posx, posy, posz ] = origins
  const shouldDraw = {...defaultWalls, ...walls}

  // drawFloor
  const facets = [{
    normal: [0, 0, -1],
    verts: [
      [posx, posy, posz],
      [posx, posy + size, posz],
      [posx + size, posy + size, posz],
    ],
    attributeByteCount: 0
  }, {
    normal: [0, 0, -1],
    verts: [
      [posx, posy, posz],
      [posx + size, posy + size, posz],
      [posx + size, posy, posz],
    ],
    attributeByteCount: 0
  }, {
    normal: [0, 0, 1],
    verts: [
      [posx, posy + size, posz + height],
      [posx, posy, posz + height],
      [posx + size, posy + size, posz + height],
    ],
    attributeByteCount: 0
  }, {
    normal: [0, 0, 1],
    verts: [
      [posx + size, posy + size, posz + height],
      [posx, posy, posz + height],
      [posx + size, posy, posz + height],
    ],
    attributeByteCount: 0
  }]
  
  if (shouldDraw.top) {
    facets.push({
      normal: [0, -1, 0],
      verts: [
        [posx, posy, posz],
        [posx + size, posy, posz],
        [posx + size, posy, posz + height],
      ],
      attributeByteCount: 0
    }, {
      normal: [0, -1, 0],
      verts: [
        [posx, posy, posz],
        [posx + size, posy, posz + height],
        [posx, posy, posz + height],
      ],
      attributeByteCount: 0
    })
  }
  
  if (shouldDraw.bottom) {
    facets.push({
      normal: [0, 1, 0],
      verts: [
        [posx + size, posy + size, posz],
        [posx, posy + size, posz],
        [posx + size, posy + size, posz + height],
      ],
      attributeByteCount: 0
    }, {
      normal: [0, 1, 0],
      verts: [
        [posx + size, posy + size, posz + height],
        [posx, posy + size, posz],
        [posx, posy + size, posz + height],
      ],
      attributeByteCount: 0
    })
  }
  
  if (shouldDraw.left) {
    facets.push({
      normal: [-1, 0, 0],
      verts: [
        [posx, posy + size, posz + height],
        [posx, posy, posz],
        [posx, posy, posz + height],
      ],
      attributeByteCount: 0
    }, {
      normal: [-1, 0, 0],
      verts: [
        [posx, posy + size, posz],
        [posx, posy, posz],
        [posx, posy + size, posz + height],
      ],
      attributeByteCount: 0
    })
  }
  
  if (shouldDraw.right) {
    facets.push({
      normal: [1, 0, 0],
      verts: [
        [posx + size, posy, posz],
        [posx + size, posy + size, posz + height],
        [posx + size, posy, posz + height],
      ],
      attributeByteCount: 0
    }, {
      normal: [1, 0, 0],
      verts: [
        [posx + size, posy, posz],
        [posx + size, posy + size, posz],
        [posx + size, posy + size, posz + height],
      ],
      attributeByteCount: 0
    })
  }

  return facets
}

/**
 * Creates a 3D printable QRCode as .stl file content
 * @param {Object} opts - Options object
 * @param {String} opts.text - The string to encode into QRCode
 * @param {Number} [opts.bitSize=4] - Width/Depth (mm) of the cells composing the QRcode grid
 * @param {Number} [opts.height=2] - Height (mm) of the qrcode part
 * @param {Number} [opts.base=2] - Height (mm) of the solid base part
 * @returns {String|Object} The .stl file content as a String if binary option is false or as Buffer/ArraBuffer (depending on platform) if true
 */
const qr3D = (...params) => {
  let [options] = params
  if (typeof params[0] === 'string') {
    const opts = params.length > 1 ? params[1] : {}
    options = {...opts, text: params[0]}
  }
  const {text, bitSize = 4, height = 2, base = 2 } = options
  const code = JSON.parse(JSON.stringify(QRCode.create(text)))
  const codeSize = code.modules.size
  const contentData = code.modules.data
  const codeContent = contentData.data ? contentData.data.join('') : Object.values(contentData).join('')

  const matrix = []
  for (let i = 0; i < codeSize; ++i) {
    let idx = i * codeSize
    let line = codeContent.slice(idx, idx + codeSize)
    matrix.push(line.split('').map(l => parseInt(l, 10)))
  }

  // create base
  const facets = base > 0 ? [...createCube({
    origins: [0, 0, 0],
    size: bitSize * codeSize,
    height: base
  })] : []

  // create 3d qrcode
  for (let i = 0; i < codeSize; ++i) {
    for (let j = 0; j < codeSize; ++j) {
      if (matrix[i][j] === 1) {
        facets.push(...createCube({
          origins: [i * bitSize, j * bitSize, base],
          size: bitSize,
          height: height,
          normalRatio: .5,
          walls: {
            top: j === 0 || matrix[i][j-1] === 0,
            bottom: j === codeSize - 1 || matrix[i][j+1] === 0,
            left: i === 0 || matrix[i-1][j] === 0,
            right: i === codeSize - 1 || matrix[i+1][j] === 0
          }
        }))
      }
    }
  }
  return stlWriter('QRCode generated with qr3D - ' + text, facets)
}

export default qr3D