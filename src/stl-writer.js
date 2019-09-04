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

const str2ab = (str) => {
  const array = new Uint8Array(str.length)
  for(let i = 0; i < str.length; i++) {
    array[i] = str.charCodeAt(i)
  }
  return array.buffer
}

const dataViewSetString = (dv, str) => {
  const uint8Array = str2ab(str)
  for (let i = 0; i < uint8Array.length; ++i) {
    console.log(uint8Array[i])
    dv.setUint8(i, uint8Array[i], true)
  }
}

const createBuffer = (isNode, size) => {
  const buffer = isNode ? Buffer.alloc(size) : new DataView(new ArrayBuffer(size))
  if (isNode) {
    buffer.fill(0, 0, 80)
  }
  return {
    writeBuffer: (type, value, offset = 0) => {
      switch (type) {
        case 'uint16': return isNode ? buffer.writeUInt16LE(value, offset) : buffer.setUint16(offset, value, true)
        case 'uint32': return isNode ? buffer.writeUInt32LE(value, offset) : buffer.setUint32(offset, value, true)
        case 'float': return isNode ? buffer.writeFloatLE(value, offset) : buffer.setFloat32(offset, value, true)
        case 'string': return isNode ? buffer.write(value, offset) : null // FIXME: should add description correctly with ArrayBuffer. dataViewSetString(offset, value)
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
  writeBuffer('uint32', count, 80)

  let offset = 84
  const write = (value, type = 'float') => {
    writeBuffer(type, value, offset)
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
    /*
    bits 0 to 4 are the intensity level for blue (0 to 31),
    bits 5 to 9 are the intensity level for green (0 to 31),
    bits 10 to 14 are the intensity level for red (0 to 31),
    bit 15 is 1 if the color is valid, or 0 if the color is not valid (as with normal STL files).
    */
    const color = 0b1000010000100001 || facet.attributeByteCount || 0
    writeBuffer('uint16', color, offset)
    offset += 2
  }
  return getBuffer()
}

export default (facets, options = {}) => {
  const { description = '', binary = false} = options
  return binary ? toBinary(facets, description) : toASCII(facets, description)
}
