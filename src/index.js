import QRCode from 'qrcode'
import stereol from 'stereol'

const defaultWalls = {
  bottom: true,
  top: true,
  back: true,
  front: true,
  left: true,
  right: true
}

const createCube = ({origins, size, height, walls = defaultWalls, color = 0}) => {
  const [ posx, posy, posz ] = origins
  const shouldDraw = {...defaultWalls, ...walls}
  const facets = []

  if (shouldDraw.bottom) {
    facets.push({
      verts: [
        [posx, posy, posz],
        [posx, posy + size, posz],
        [posx + size, posy + size, posz],
      ]
    }, {
      verts: [
        [posx, posy, posz],
        [posx + size, posy + size, posz],
        [posx + size, posy, posz],
      ]
    })
  }

  if (shouldDraw.top) {
    facets.push({
      verts: [
        [posx, posy + size, posz + height],
        [posx, posy, posz + height],
        [posx + size, posy + size, posz + height],
      ]
    }, {
      verts: [
        [posx + size, posy + size, posz + height],
        [posx, posy, posz + height],
        [posx + size, posy, posz + height],
      ]
    })
  }
  
  if (shouldDraw.back) {
    facets.push({
      verts: [
        [posx, posy, posz],
        [posx + size, posy, posz],
        [posx + size, posy, posz + height],
      ]
    }, {
      verts: [
        [posx, posy, posz],
        [posx + size, posy, posz + height],
        [posx, posy, posz + height],
      ]
    })
  }
  
  if (shouldDraw.front) {
    facets.push({
      verts: [
        [posx + size, posy + size, posz],
        [posx, posy + size, posz],
        [posx + size, posy + size, posz + height],
      ]
    }, {
      verts: [
        [posx + size, posy + size, posz + height],
        [posx, posy + size, posz],
        [posx, posy + size, posz + height],
      ]
    })
  }
  
  if (shouldDraw.left) {
    facets.push({
      verts: [
        [posx, posy + size, posz + height],
        [posx, posy, posz],
        [posx, posy, posz + height],
      ]
    }, {
      verts: [
        [posx, posy + size, posz],
        [posx, posy, posz],
        [posx, posy + size, posz + height],
      ]
    })
  }
  
  if (shouldDraw.right) {
    facets.push({
      verts: [
        [posx + size, posy, posz],
        [posx + size, posy + size, posz + height],
        [posx + size, posy, posz + height],
      ]
    }, {
      verts: [
        [posx + size, posy, posz],
        [posx + size, posy + size, posz],
        [posx + size, posy + size, posz + height],
      ]
    })
  }

  return facets.map(f => ({...f, color}))
}

/**
 * Creates a 3D printable QRCode as .stl file content
 * @param {Object} opts - Options object
 * @param {String} opts.text - The string to encode into QRCode
 * @param {Number} [opts.bitSize=4] - Width/Depth (mm) of the cells composing the QRcode grid
 * @param {Number} [opts.height=2] - Height (mm) of the qrcode part
 * @param {Number} [opts.base=2] - Height (mm) of the solid base part
 * @param {Boolean} [opts.binary=false] - Sould output the .stl content as ASCII (default) or binary
 * @param {Array} [opts.baseColor=[0,0,0]] - Only if binary is true. RGB Array where R, G, and B are all 5 bits integers (between 0 and 31)
 * @param {Array} [opts.qrColor=[31,0,0]] - Only if binary is true. RGB Array where R, G, and B are all 5 bits integers (between 0 and 31) 
 * @returns {Object} The .stl file content as a String if binary option is false or as Buffer/ArraBuffer (depending on platform) if true
 */
const qr3D = (...params) => {
  let [options] = params
  if (typeof params[0] === 'string') {
    const opts = params.length > 1 ? params[1] : {}
    options = {...opts, text: params[0]}
  }
  const defaultQrColor = [0, 0, 31]
  const defaultBaseColor = [0, 0, 0]
  const {
    text,
    bitSize = 4,
    height = 2,
    base = 2,
    binary = true,
    baseColor = 0,
    margin = 2,
    qrColor = defaultQrColor,
    handle
  } = options
  const colors = {
    qr: Array.isArray(qrColor) && qrColor.length === 3 ? qrColor : defaultQrColor,
    base: Array.isArray(baseColor) && baseColor.length === 3 ? baseColor : defaultBaseColor
  }
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
    size: bitSize * codeSize + margin * 2,
    height: base,
    color: colors.base,
  })] : []

  if (handle && handle.facets && Array.isArray(handle.facets)) {
    facets.push(...handle.facets.map(f => ({...f, color: colors.base})))
  }

  // create 3d qrcode
  for (let i = 0; i < codeSize; ++i) {
    for (let j = 0; j < codeSize; ++j) {
      let cubeOptions = {
        origins: [margin + i * bitSize, margin + j * bitSize, base],
        size: bitSize,
        height: height
      }
      if (matrix[i][j] === 1) {
        cubeOptions.color = colors.qr
        cubeOptions.walls = {
          bottom: false,
          back: j === 0 || matrix[i][j-1] === 0,
          front: j === codeSize - 1 || matrix[i][j+1] === 0,
          left: i === 0 || matrix[i-1][j] === 0,
          right: i === codeSize - 1 || matrix[i+1][j] === 0
        }
        facets.push(...createCube(cubeOptions))
      }
    }
  }
  return {
    data: stereol.exportStl(facets, {
      description: 'QRCode generated with qr3D - ' + text,
      binary
    }),
    qrcode: code
  }
}

export default qr3D