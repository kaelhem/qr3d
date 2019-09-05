import React from 'react'
import { BrowserRouter, Route, Switch, Redirect, /* NavLink */ } from 'react-router-dom'
import FlexView from 'react-flexview'
import ForkMeOnGithub from 'fork-me-on-github'
import {
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core'

// pages
import Home from 'pages/home'
import Make from 'pages/make'
import Faq from 'pages/faq'
import Contact from 'pages/contact'

import Logo from 'assets/logo.svg'

const App = () => (
  <BrowserRouter>
    <FlexView column>
      <AppBar style={{ background: '#fff' }}>
        <Toolbar>
        {/*<Toolbar>
          <NavLink to='/'>home</NavLink> |
          <NavLink to='/make'>make</NavLink> |
          <NavLink to='/faq'>faq</NavLink> |
          <NavLink to='/contact'>contact</NavLink>
        */}
          <img alt='Logo' src={ Logo } width={ 80 } height={ 80 } />
          <Typography
            variant='h6'
            align='center'
            color='textPrimary'
            style={{ width: '100%', paddingRight: 80, fontStyle: 'italic', color: '#888', fontWeight: 'normal', fontSize: '1em' }}
          >
            A tool to bring QR codes to 3D printing world
          </Typography>
          <ForkMeOnGithub
            repo="https://github.com/kaelhem/qr3d"
            colorBackground="black"
            colorOctocat="white"
          />
        </Toolbar>
      </AppBar>
      <div style={{ paddingTop: 80 }}>
        <Switch>
          <Route exact path="/" component={ Make } />
          {/*}
          <Route path="/make" component={ Make } />
          <Route path="/faq" component={ Faq } />
          <Route path="/contact" component={ Contact } />
        */}
          <Redirect to="/" />
        </Switch>
      </div>
      <Typography
        variant='caption'
        style={{ 
          position: 'absolute',
          bottom: 5,
          width: '100vw',
          textAlign: 'center',
          color: '#666'
        }}
      >
        kaelhem ©2019
      </Typography>
    </FlexView>
  </BrowserRouter>
)

export default App