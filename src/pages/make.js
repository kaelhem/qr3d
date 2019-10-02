import React, { useState, Fragment } from 'react'
import qr3D from 'qr3d'
import STLViewer from 'stl-viewer'
import { saveAs } from 'file-saver'
import FlexView from 'react-flexview'
import equal from 'fast-deep-equal'
import withSizes from 'react-sizes'
import ReactHoverObserver from 'react-hover-observer'
import {
  Container,
  TextField,
  Typography,
  Slider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Fab,
  Switch,
  FormControlLabel
} from '@material-ui/core'
import {
  ExpandMore as ExpandMoreIcon,
  GetApp as GetAppIcon
} from '@material-ui/icons'
import handleData from '../assets/handle.json'

const MakeView = ({ width, height }) => {
  const [isOptionHover, setOptionHover] = useState(false)
  const [isPanelOpen, setPanelOpen] = useState(false)
  const [options, setOptions] = useState({
    text: 'https://github.com/kaelhem/qr3d',
    bitSize: 4,
    margin: 2,
    height: 2,
    base: 2,
    baseColor: [0, 22, 11],
    qrColor: [31, 3, 3],
    handle: handleData,
    stlOptions: {
      color: [0, 0, 255, 255]
    }
  })
  const [qrData, setQrData] = useState(qr3D({binary: true, ...options}))

  const handleChange = (name, value) => {
    const newOptions = { ...options, [name]: value }
    if (!newOptions.text) {
      newOptions.text = '.'
    }
    if (!equal(options, newOptions)) {
      setOptions(newOptions)
      setTimeout(() => {
        setQrData(null)
        setQrData(qr3D({binary: true, ...newOptions}))
      }, 0)
    }
  }

  const addHandleChange = (value) => {
    handleChange('handle', value ? handleData : null)
  }

  const exportStl = () => {
    const blob = new Blob([qrData.data], {type: 'text/plain;charset=utf-8'})
    saveAs(blob, 'sample.stl')
  }

  const panelStyles = {
    boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
    width: width / 2,
    minWidth: 350,
    background: 'rgba(255,255,255,.9)',
    borderRadius: '0 0 20px 20px'
  }

  const handleViewClick = (e) => {
    if (isPanelOpen && !isOptionHover) {
      setPanelOpen(false)
    }
  }

  return (
    <FlexView wrap onClick={ handleViewClick }>
      <Container style={ panelStyles }>
        <ReactHoverObserver onHoverChanged={ ({isHovering}) => setOptionHover(isHovering) }>
          <ExpansionPanel
            expanded={ isPanelOpen }
            onChange={ () => setPanelOpen(!isPanelOpen) }
            style={{ background: 'transparent', boxShadow: 'none' }}
          >
            <ExpansionPanelSummary expandIcon={ <ExpandMoreIcon /> }>
              <Typography style={{ marginTop: 5 }}>OPTIONS</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <FlexView column style={{ width: '100%' }}>
                <Typography gutterBottom>
                  Content
                </Typography>
                <TextField
                  value={ options.text !== '.' ? options.text : '' }
                  onChange={ ({target}) => handleChange('text', target.value) }
                  margin="normal"
                  fullWidth
                  style={{ marginTop: 0, marginBottom: 20 }}
                />
                <Typography gutterBottom>
                  Base height ({ options.base }mm)
                </Typography>
                <Slider
                  value={ options.base }
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={30}
                  onChange={ (_, value) => handleChange('base', value) }
                />
                <Typography gutterBottom>
                  QR height ({ options.height }mm)
                </Typography>
                <Slider
                  value={ options.height }
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  min={1}
                  max={10}
                  onChange={ (_, value) => handleChange('height', value) }
                />
                <Typography gutterBottom>
                  QR bit size  ({ options.bitSize }mm)
                </Typography>
                <Slider
                  value={ options.bitSize }
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  min={1}
                  max={20}
                  onChange={ (_, value) => handleChange('bitSize', value) }
                />
                <Typography gutterBottom>
                  QR margin  ({ options.margin }mm)
                </Typography>
                <Slider
                  value={ options.margin }
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                  onChange={ (_, value) => handleChange('margin', value) }
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={ options.handle !== null }
                      onChange={ (_, value) => addHandleChange(value) }
                      value="useHandle"
                      color="primary"
                    />
                  }
                  label="Use handle"
                />
              </FlexView>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </ReactHoverObserver>            
      </Container>
      <div style={{ position: 'absolute', zIndex: -1, top: 0 }}>
        <Fragment>
        { navigator.userAgent !== 'ReactSnap' && qrData &&  (
          <STLViewer
            model={ qrData.data.buffer }
            width={ width }
            height={ height }
            backgroundColor='#e2e2e2'
            rotate={false}
            orbitControls={true}
            cameraX={50}
            cameraY={-200}
            cameraZ={170}
          />
        )}
        </Fragment>
      </div>
      { qrData && options.text !== '.' && (
        <Fab
          variant="extended"
          color={'primary'}
          aria-label='export'
          style={{ position: 'absolute', bottom: 25, right: 25 }}
          onClick={ exportStl }
        >
          Export
          <GetAppIcon />
        </Fab>
      )}
    </FlexView>
  )
}

export default withSizes(sizes => sizes)(MakeView)