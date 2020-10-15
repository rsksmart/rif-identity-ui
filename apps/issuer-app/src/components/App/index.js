import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import './index.css'
import Login from '../Login'
import Requests from '../Requests'
import { backOfficeUrl } from '../../adapters'
import { transformDID } from '../../transformers'

function App() {
  const [{ isLoggedIn, auth }, setUser] = useState({ isLoggedIn: false, auth: { username: '', password: '' } })
  const [identity, setIdentity] = useState('')

  const getIdentity = useCallback(
    () => axios.get(backOfficeUrl() + '/identity', { auth }).then(res => res.data).then(setIdentity),
    [auth]
  )

  useEffect(() => {
    if (isLoggedIn) getIdentity()
  }, [isLoggedIn, getIdentity])

  const login = (auth) => {
    setUser({ isLoggedIn: true, auth })
  }

  if (!isLoggedIn) {
    return <Login login={login} />
  }

  return (
    <>
      <nav className="navbar navbar-light navbar app-navbar">
        <span className="navbar-brand">
          RIF Identity
        </span>
        <span className="navbar-brand">
          <div className="did-container">
            {transformDID(identity)}
          </div>
        </span>
      </nav>
      <div className="container">
        <div className="row menu">
          <div className="col"><label className="menu-item menu-item-disabled">Home</label></div>
          <div className="col"><label className="menu-item menu-item-disabled">Issue credentials</label></div>
          <div className="col"><label className="menu-item menu-item-selected">Grant credentials</label></div>
          <div className="col"><label className="menu-item menu-item-disabled">History</label></div>
          <div className="col"><label className="menu-item menu-item-disabled">Settings</label></div>
        </div>
        <div className="row">
          <div className="col">
            <Requests auth={auth} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
