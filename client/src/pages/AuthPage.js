import React, { useState } from 'react'

export const AuthPage = () => {
  const [form, setForm] = useState({
    email: '', password: ''
  })

  const changeHandler = event => {
    setForm({ ...form, [event.targret.name]: event.target.value})
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Shorten link</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="email"
                  id="email"
                  type="text"
                  className="yellow-input"
                  name="email"
                  onChange="changeHandler"
                  autoFocus
                />
                <label htmlFor="email">email</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="password"
                  id="password"
                  type="password"
                  className="yellow-input"
                  name="password"  
                  onChange="changeHandler"
                />
                <label htmlFor="password">pasword</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button className="btn yellow darken-4" style={{marginRight: 10}}>Login</button>
            <button className="btn grey lighten-1 black-text">Register</button>
          </div>
        </div>
      </div>
    </div>
  )
}