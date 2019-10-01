import ColorUtils from './color-utils'

/**
 * Heavily inspired by https://github.com/tmpvar/stl
 * Allow to create .stl content as ASCII or binary in NodeJS and browser.
 */
const computeNormal = ([a, b, c]) => {
  const [x0, y0, z0] = a
  const [x1, y1, z1] = b
  const [x2, y2, z2] = c
  const [p1x, p1y, p1z] = [x1 - x0, y1 - y0, z1 - z0]
  const [p2x, p2y, p2z] = [x2 - x0, y2 - y0, z2 - z0]
  const [p3x, p3y, p3z] = [
    p1y * p2z - p1z * p2y,
    p1z * p2x - p1x * p2z,
    p1x * p2y - p1y * p2x
  ]
  const mag = Math.sqrt(p3x * p3x + p3y * p3y + p3z * p3z)
  if (mag === 0) {
    return [0, 0, 0]
  }
  return [p3x, p3y, p3z].map(p => p / mag)
}

const trim = (a) => {
  let nullTerm = a.indexOf('\u0000')
  if (nullTerm > -1) {
    a = a.substr(0, nullTerm)
  }
  return a.trim()
}

const exp = (x, y, z) => ([x, y, z].map(x => x.toExponential()))

const toASCII = (facets, description = '') => {
  const str = 'solid ' + description.trim() + '\n'
  for (let j = 0; j < facets.length; j++) {
    const facet = facets[j]
    const v = facet.verts
    const n = facet.normal || computeNormal(v)
    str +=
    `facet normal ${exp(...n).join(' ')}
      outer loop
        vertex ${exp(...v[0]).join(' ')}
        vertex ${exp(...v[1]).join(' ')}
        vertex ${exp(...v[2]).join(' ')}
      endloop
    endfacet`
  }
  str += '\nendsolid'
  return str
}

const writeBufferString = (buffer, value = '', offset = 0) => {
  let step = 0
  value.split('').forEach(char => {
    buffer.setUint8(offset + step, char.charCodeAt(0))
    ++step
  })
}

const createBuffer = (isNode, size) => {
  const buffer = isNode ? Buffer.alloc(size) : new DataView(new ArrayBuffer(size))
  if (isNode) {
    buffer.fill(0, 0, 80)
  }
  return {
    writeBuffer: (type, value, offset = 0) => {
      switch (type) {
        case 'uint8': return isNode ? buffer.writeUInt8(value, offset) : buffer.setUint8(offset, value)
        case 'uint16': return isNode ? buffer.writeUInt16LE(value, offset) : buffer.setUint16(offset, value, true)
        case 'uint32': return isNode ? buffer.writeUInt32LE(value, offset) : buffer.setUint32(offset, value, true)
        case 'float': return isNode ? buffer.writeFloatLE(value, offset) : buffer.setFloat32(offset, value, true)
        case 'string': return isNode ? buffer.write(value, offset) : writeBufferString(buffer, value, offset)
        default: {
          throw new Error('No type specified')
        }
      }
    },
    getBuffer: () => isNode ? buffer : buffer.buffer
  }
}

const toBinary = (facets, description, color, material) => {
  const count = facets.length
  let isNode = true
  try {
    isNode = Boolean(Buffer)
  } catch (e) {
    isNode = false
  }
  const size = 84 + count * 12 * 4 + count * 2
  const { writeBuffer, getBuffer } = createBuffer(isNode, size)
  writeBuffer('string', description)
  if (color) {
    writeBuffer('string', ' COLOR=', 47)
    writeBuffer('uint32', ColorUtils.getStlColor(color), 54)
    if (material) {
      writeBuffer('string', ',MATERIAL=', 58)
      const [ diffuse, specular, ambient ] = material
      writeBuffer('uint32', ColorUtils.getStlColor(diffuse), 68)
      writeBuffer('uint32', ColorUtils.getStlColor(specular), 72)
      writeBuffer('uint32', ColorUtils.getStlColor(ambient), 76)
    }
  }
  writeBuffer('uint32', count, 80)

  let offset = 84
  const write = (value) => {
    writeBuffer('float', value, offset)
    offset += 4
  }
  for (let j = 0; j<facets.length; j++) {
    const facet = facets[j]
    const n = facet.normal || computeNormal(facet.verts)
    write(n[0])
    write(n[1])
    write(n[2])
    for (var i = 0; i<facet.verts.length; i++) {
      const vert = facet.verts[i]
      write(vert[0])
      write(vert[1])
      write(vert[2])
    }

    const facetColor = facet.color ? ColorUtils.getFacetColor(facet.color) : 0
    writeBuffer('uint16', facetColor, offset)
    offset += 2
  }
  return getBuffer()
}

export default (facets, options = {}) => {
  const {
    description = '',
    binary = true,
    color = [0,0,255,255],
    material = null
  } = options
  if (binary) {
    // colors exists only in unofficials specs and are exclusive to binary file format
    // more details: https://en.wikipedia.org/wiki/STL_(file_format)#Color_in_binary_STL
    const stlColor = Array.isArray(color) && color.length === 4 ? color : null
    let stlMaterial = stlColor && Array.isArray(material) && material.length === 3 ? material : null
    if (stlMaterial) {
      const [a,b,c] = material
      stlMaterial = stlMaterial && Array.isArray(a) && a.length === 3 ? material : null
      stlMaterial = stlMaterial && Array.isArray(b) && b.length === 3 ? material : null
      stlMaterial = stlMaterial && Array.isArray(c) && c.length === 3 ? material : null
    }
    return toBinary(facets, description, stlColor, stlMaterial)
  } else {
    return toASCII(facets, description)
  }
}
