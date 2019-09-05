import React, { useState, Fragment } from 'react'
import qr3D from 'qr3d'
import { saveAs } from 'file-saver'

export default () => {
  const [content, setContent] = useState('')
  
  const createAscii = () => {
    const qr3dAscii = qr3D(content, { binary: false }).data
    const blob = new Blob([qr3dAscii], {type: 'text/plain;charset=utf-8'})
    saveAs(blob, 'sample-ascii.stl')
  }

  const createBinary = () => {
    const qr3dBin = qr3D(content).data
    const blob = new Blob([qr3dBin], {type: 'text/plain;charset=utf-8'})
    saveAs(blob, 'sample-binary.stl')
  }
  return (
    <Fragment>
      <span>String to encode in QRCode:</span>
      <input value={content} onChange={ (e) => setContent(e.target.value) } />
      <button disabled={content === ''} onClick={ createAscii }>create ascii .stl</button>
      <button disabled={content === ''} onClick={ createAscii }>create binary .stl</button>
    </Fragment>
  )
}