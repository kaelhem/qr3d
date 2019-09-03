import React, { useState, Fragment } from 'react'
import qr3D from 'qr3d'
import { saveAs } from 'file-saver'

export default () => {
  const [content, setContent] = useState('')
  
  const createStl = () => {
  const qr3dAscii = qr3D(content)
  const blob = new Blob([qr3dAscii], {type: 'text/plain;charset=utf-8'})
    saveAs(blob, 'sample.stl')
  }
  return (
    <Fragment>
      <span>String to encode in QRCode:</span>
      <input value={content} onChange={ (e) => setContent(e.target.value) } />
      <button disabled={content === ''} onClick={ createStl }>create .stl</button>
    </Fragment>
  )
}