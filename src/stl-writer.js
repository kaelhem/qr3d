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

export default (description, facets) => {
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