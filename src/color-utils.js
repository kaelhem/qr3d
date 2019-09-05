const limited = (value, max = 0xFF) => Math.max(0, Math.min(max, parseInt(value, 10)))
const facetColorPart = (part) => limited(part, 31).toString(2).padStart(5, '0')
const stlColorPart = (part) => limited(part).toString(2).padStart(8, '0')

export default {
  /*
  Computes a 16 bits BGR color with this format: 
  bits 0 to 4 are the intensity level for blue (0 to 31),
  bits 5 to 9 are the intensity level for green (0 to 31),
  bits 10 to 14 are the intensity level for red (0 to 31),
  bit 15 is 1 if the color is valid, or 0 if the color is not valid (as with normal STL files).
  */
  getFacetColor: ([r, g, b]) => Number(`0b${ facetColorPart(b) }${ facetColorPart(g) }${ facetColorPart(r) }1`),

  /* Computes a 32 bits RGBA color */
  getStlColor: ([r, g, b, a]) => Number(`0b${ stlColorPart(r) }${ stlColorPart(g) }${ stlColorPart(b) }${ stlColorPart(a) }`),
}