/**
 * Heavily inspired by https://github.com/tmpvar/stl
 * Allow to create .stl content as ASCII or binary in NodeJS and browser.
 */
const normalize = (x0, y0, z0, x1, y1, z1, x2, y2, z2) => {
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

const computeNormal = ({ verts: v }) => normalize(
  v[0][0], v[0][1], v[0][2],
  v[1][0], v[1][1], v[1][2],
  v[2][0], v[2][1], v[2][2]
)

const exp = (x, y, z) => ([x, y, z].map(x => x.toExponential()))

const toASCII = (facets, description = '') => {
  const str = ['solid ' + description.trim()]
  const p = '      vertex '
  for (let j = 0; j < facets.length; j++) {
    const facet = facets[j]
    const n = facet.normal || computeNormal(facet);
    str.push('  facet normal ' + exp(n[0], n[1], n[2]).join(' '))
    str.push('    outer loop')
    const v = facet.verts
    str.push(p + exp(v[0][0], v[0][1], v[0][2]).join(' '))
    str.push(p + exp(v[1][0], v[1][1], v[1][2]).join(' '))
    str.push(p + exp(v[2][0], v[2][1], v[2][2]).join(' '))
    str.push('    endloop')
    str.push('  endfacet')
  }
  str.push('endsolid')
  return str.join('\n')
}

const writeBufferString = (buffer, value = '', offset = 0) => {
  let step = 0
  value.split('').forEach(char => {
    buffer.setUint8(offset + step, char.charCodeAt(0), true)
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
        case 'uint8': return isNode ? buffer.writeUInt8(value, offset) : buffer.setUint8(offset, value, true)
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

const toBinary = (facets, description = '') => {
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
  // color head info
  writeBuffer('string', 'COLOR=', 57)
  writeBuffer('uint8', 0, 63) // R
  writeBuffer('uint8', 0, 64) // G
  writeBuffer('uint8', 255, 65) // B
  writeBuffer('uint8', 255, 66) // A
  writeBuffer('string', ',MATERIAL=', 67)
  writeBuffer('uint8', 0, 77) // R
  writeBuffer('uint8', 0, 78) // G
  writeBuffer('uint8', 255, 79) // B

  writeBuffer('uint32', count, 80)

  let offset = 84
  const write = (value) => {
    writeBuffer('float', value, offset)
    offset += 4
  }
  for (let j = 0; j<facets.length; j++) {
    const facet = facets[j]
    const n = facet.normal || computeNormal(facet)
    write(n[0])
    write(n[1])
    write(n[2])
    for (var i = 0; i<facet.verts.length; i++) {
      const vert = facet.verts[i]
      write(vert[0])
      write(vert[1])
      write(vert[2])
    }    
    writeBuffer('uint16', facet.attributeByteCount || 0, offset)
    offset += 2
  }
  return getBuffer()
}

export default (facets, options = {}) => {
  const { description = '', binary = false} = options
  return binary ? toBinary(facets, description) : toASCII(facets, description)
}
