# MERN

by Minin

[Video](https://www.youtube.com/watch?v=ivDjWYcKDZI)

## How fullstack apps are developed

1. Create initial backend, make endpoints on nodejs
2. Connect it to frontend
3. Make all the rest, including frontend and rest backend

## Start project

### Init

```sh
npm init
```

index file: app.js

```sh
touch app.js
```

### Base dependencies

```
npm i express mongoose
npm i -D nodemon concurrently
```

### Change scripts

```json
"start": "node app.js",
"server": "nodemon app.js"
```

### Start coding, express

```js
const express = require('express')

const app = express()

app.listen(5000, () => console.log('App is started'))
```

## Npm config

[Configure your Node.js Applications](https://www.npmjs.com/package/config)

```sh
npm install config
mkdir config
vim config/default.json
```

in `app.js`

```js
const express = require('express')
const config = require('config')

const app = express()

const PORT = config.get('port') || 5000

app.listen(PORT, () => console.log(`App is started on port ${PORT}`))
```

feel the difference...

## Add mongo

```js
const mongoose = require('mongoose')

async function start() {
  try{
    await mongoose.connect(config.get('mongoUri'), {
      
    })
  }
  catch(e){
    console.log('Server error: ', e.message)
    process.exit(1)
  }
}

start()
```



[time 15:00](https://www.youtube.com/watch?v=ivDjWYcKDZI&t=900s)

in mongodb.com create new project and build new cluster. Insert link into config.

## Registering routes



### API routes

```sh
mkdir routes
touch routes/auth.routes.js
```

```js
const { Router } = require('express')
const router = Router()

// /api/auth/register
router.post('/register', async (req, res) => {
  try{
    const { email, password } = req.body
  }
  catch(e){
    res.status(500).json({message: 'Something gone wrong, try again...'})
  }
})

// /api/auth/login
router.post('/login', async (req, res) => {
  
})


module.exports = router

```

At this point we don't have any customers model, we need to create it

### Create model

```sh
mkdir models
touch models/User.js
```

```js
const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  links: [{type: Types.ObjectId, ref: 'Link'}]
})

module.exports = model('User', schema)
```

in `routes/auth.routes.js`

```js
const User = require('../models/User')
```

### Check for email

`routes/auth.routes.js`

```
const candidate = User.findOne({email})
if(candidate) {
  return res.status(400).json({message: 'That email already registered.'})
}
```

### Crypt passwords

[bcrypt.js](https://www.npmjs.com/package/bcryptjs)

```sh
npm install bcryptjs
```

`routes/auth.routes.js`

```js
// /api/auth/register
router.post('/register', async (req, res) => {
  try{
    const { email, password } = req.body
    const candidate = User.findOne({email})
    console.log(candidate)
    if(candidate) {
      return res.status(400).json({message: 'That email already registered.'})
    }
    else {
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({email, password: hashedPassword})
  
      await user.save()
  
      res.status(201).json({message: 'User is created.'})

    }

  }
  catch(e){
    res.status(500).json({message: 'Something gone wrong, try again...'})
  }
})
```

[time 34:00](https://www.youtube.com/watch?v=ivDjWYcKDZI&t=2040s)

## Validation fields
```sh
npm i express-validator
```
in `routes/auth.routes.js`
```
const { check, validationResult } = require('express-validator')
```

[time 41:00](https://www.youtube.com/watch?v=ivDjWYcKDZI&t=2460s)

...

## Auth

GWT tokens...

[npm jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

```sh
npm install jsonwebtoken
```

include jwt in routes

in config create secret key:

```

```

...

So, backend is ok currently. Let's create client side...

# Client

```sh
npx create-react-app client
```

[time 48:00](https://www.youtube.com/watch?v=ivDjWYcKDZI&t=2880s)

Watch out for yarn, if needed, remove `client/node_modules folder`, `client/yarn.lock`

## Remove initial git from client
```sh
rm -rf client/.git
```

## Remove unused files and clean some another
```sh
rm client/src/App.css client/src/App.test.js client/src/logo.svg
```

Clean `client/src/App.js`
```
function App() {
  return (
    <div>
      <h1>Hello client</h1>
    </div>
  )
}
export default App;
```

time 50:00

[time 50:00](https://www.youtube.com/watch?v=ivDjWYcKDZI&t=3000s)

```sh
npm i
```

## Tune Front and Backend launch

add to `package.json`:

```json
"client": "npm run start --prefix client",
"dev": "concurrently \"npm run server\" \"npm run client\""
```

 "dev" script allows to run two scripts simultaneously.

## Including Materialize

### Getting started

in `client` folder run:

```sh
npm install materialize-css@next
```

in `client/src/index.css`

```css
@import '~materialize-css/dist/css/materialize.min.css';
```

in `client/src/App.js` import materialize:

```js
import React from 'react'
import 'materialize-css'

function App() {
  return (
    <div className="container">
      <h1>Hello client!!!</h1>
    </div>
  )
}
export default App;

```

## Routes: react-router-dom

in `client`

```sh
npm i react-router-dom
```

```sh
mkdir client/src/pages
touch client/src/pages/AuthPage.js
touch client/src/pages/LinksPage.js
touch client/src/pages/CreatePage.js
touch client/src/pages/DetailPage.js
```

in each file initial code...

```jsx
import React from 'react'

export const LinksPage = () => {
  return (
    <div>
      <h1>Links page</h1>
    </div>
  )
}
```

### Creating routes

```
touch client/src/routes.js
```

```jsx
import React from 'react'
import { Switch, Route, Redirect, Router } from 'react-router-dom'
import { LinksPage } from './pages/LinksPage'
import { CreatePage } from './pages/CreatePage'
import { DetailPage } from './pages/DetailPage'
import { AuthPage } from './pages/AuthPage'

export const useRoutes = isAuthenticated => {
  if(isAuthenticated) {
    return (
      <Switch>
      <Route path="/links" exact>
        <LinksPage />
      </Route>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>
        <Redirect to="/create" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route to="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
```



in `client/src/App.js`

[1:03:48](https://www.youtube.com/watch?v=ivDjWYcKDZI&t=3828s)

```jsx
import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import 'materialize-css'
import { useRoutes } from './routes';

function App() {
  const routes = useRoutes(false)
  return (
    <div className="container">
      <Router>
        {routes}
      </Router>
    </div>
  )
}
export default App;

```

## Create Auth form

`client/src/pages/AuthPage.js`

```jsx
import React, { useState } from 'react'
import { useHttp } from '../hooks/http.hook'

export const AuthPage = () => {
  const { loading, request } = useHttp()

  const [form, setForm] = useState({
    email: '', password: ''
  })

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value})
  }

  const registerHandler = async () => {
    try {
      // changeHandler()
      const data = await request('/api/auth/register', 'POST', {...form})
      console.log('data:', data);
    }
    catch(e) {}
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
                  onChange={changeHandler}
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
                  onChange={changeHandler}
                />
                <label htmlFor="password">pasword</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{marginRight: 10}}
              disabled={loading}
            >
              Login
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
```

`client/src/index.css`

```css
@import '~materialize-css/dist/css/materialize.min.css';

input.yellow-input{
  border-bottom: 1px solid #fff!important;
  box-shadow: 0 1px 0 0 #fff!important;
}

input.yellow-input + label{
  color: #fff!important;
}
input.yellow-input:focus + label{
  color: #ffeb3b!important;
}

input.yellow-input:focus{
  border-bottom: 1px solid #ffeb3b!important;
  box-shadow: 0 1px 0 0 #ffeb3b!important;
}
```

## Processing form

add to `client/src/pages/AuthPage.js`

```jsx
const [form, setForm] = useState({
  email: '', password: ''
})

const changeHandler = event => {
  setForm({ ...form, [event.targret.name]: event.target.value})
}
// ...
<input
  placeholder="email"
  id="email"
  type="text"
  className="yellow-input"
  name="email"
  onChange="changeHandler"
  autoFocus
/>
```

[time 1:18:15](https://www.youtube.com/watch?v=ivDjWYcKDZI&t=4695s) 

## Make requests to server

We will use our hooks... instead of axios and etc...

### Creating custom hooks

#### Http hook

```sh
mkdir client/src/hooks
touch client/src/hooks/http.hook.js
```

```js
import { useState, useCallback } from 'react'

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async (url, method='GET', body=null, headers={}) => {
    setLoading(true)
    try{
      const response = await fetch(url, { method, body, headers })
      const data = await response.json()

      if(!response.ok){
        throw new Error(data.message || 'Something went wrong.')
      }

      setLoading(false)

      return data
    }
    catch(e){
      setLoading(false)
      setError(e.message)
      throw e
    }
  }, [])

  const clearError = () => setError(null)

  return { loading, request, error, clearError}
}
```

this hook will help us to interact with server. 

At this moment we will get an error 404, because we trying to post on port 3000 instead of 5000...

[time 1:30:40](https://www.youtube.com/watch?v=ivDjWYcKDZI&t=5440s) 

## Use proxy

we will proxy requests from client to server. In `client/package.json` add:

```json
"proxy": "http://localhost:5000",
```

 this if for development only, later this will be changed...

Now we will get response 400. In response body we see that both validators are triggered, meanwhile, password should be validated. 

This is because server does not receive body... 

## Include midleware

in `app.js`

```js
app.use(express.json({ extended: true }))
```

get empty object in `routes/auth.routes.js`. That's because we sent text/plain and request payload is [object object], but should be email and password. To solve this, update hook useHttp in `client/src/hooks/http.hook.js`

```js
if(body){
  body = JSON.stringify(body)
}
```

time 1:36:14

## Work on data on frontend

in `client/src/pages/AuthPage.js`:

```js
//
```

### Use M.toast

Create new hook:

```sh
touch client/src/hooks/message.hook.js
```

```js
import { text } from 'express'
import { useCallback } from 'react'

export const useMessage = () => {
  return useCallback(text => {
    if (window.M && text){
      window.M.toast({ html: text})
    }
  }, [])
}
```

import it in `client/src/pages/AuthPage.js`

```js
import { useMessage } from '../hooks/message.hook'
// ...
useEffect(() => {
  console.warn('Error', error)
  message(error)
  clearError()
}, [error, message, clearError])
```

### Debug

look at error value, we get **null**, so, go to `client/src/hooks/http.hook.js`. 

```js
catch(e){
      console.warn('Catch:', e.message)
      setLoading(false)
      setError(e.message)
      throw e
    }
```

here we see message.

but in  `client/src/pages/AuthPage.js` *clearError* method clears error

```js
// const clearError = () => setError(null)
const clearError = useCallback(() => {setError(null)}, [])
```

here Vladilen also returns setError(null), but in my case this generates error.

#### Checking users

`routes/auth.routes.js`

```js
User.findOne({email},async (err, docs) => {
  if (docs) {
    console.log('docs',docs)
    return res.status(400).json({message: 'That email already registered.'})
  }
  else {
    console.log('Err',err)
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({email, password: hashedPassword})
    await user.save()
    res.status(201).json({message: 'User is created.'})
  }
})
```

have to change, because **User.findOne({email})** returns object in any case and candidate check was not valid and returned "Already exists" even if no that user found.

## Make login logics.

Login is similar to register.

### Debug

in `routes/auth.routes.js`

```js
User.findOne({email}, async (err, data) => {
  if(data){
    const isMatch = await bcrypt.compare(password, data.password)
    if(!isMatch) {
      return res.status(400).json({message: 'Invalid password.'})
    }
    const token = jwt.sign(
      {userId: data.id},
      config.get('jwtSecret'),
      { expiresIn: '1h'}
    )
    
    res.json({token, userId: data.id})
  }
  else {
    return res.status(400).json({message: 'This email is not found.'})
  }
})

// const user = User.findOne({email})
// if (!user) {
//   return res.status(400).json({message: 'This email is not found.'})
// }

// const isMatch = bcrypt.compare(password, user.password)

// if(!isMatch) {
//   return res.status(400).json({message: 'Invalid password.'})
// }

// const token = jwt.sign(
//   {userId: user.id},
//   config.get('jwtSecret'),
//   { expiresIn: '1h'}
// )

// res.json({to
```

### Create new hook

```sh
touch client/src/hooks/auth.hook.js
```

```js
import { useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken)
    setUserId(id)

    localStorage.setItem(storageName, JSON.stringify{
      userId, token
    })
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if(data && data.token) {
      login(data.token, data.userId)
    }

  }, [login])

  return { login, logout, token, userId }
}
```

in `client/src/App.js` add:

```js
const { token, login, logout, userId } = useAuth()
```

so, these variables we need to give to all app via context. 

## Create context for entire application

```sh
mkdir client/src/context
touch client/src/context/AuthContext.js
```

1:54:35

```js
import {createContext} from 'react'

function noop() {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false
})
```

in `client/src/App.js` wrap all app in this context...

```js
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext'
import 'materialize-css'

function App() {
  const { token, login, logout, userId } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <div className="container">
        <Router>
          {routes}
        </Router>
      </div>
    </AuthContext.Provider>
  )
}
export default App;

```

so, here we get some warns...

### Debug

```sh
src/hooks/auth.hook.js
[1]   Line 16:6:  React Hook useCallback has missing dependencies: 'token' and 'userId'. Either include them or remove the dependency array  react-hooks/exhaustive-deps
```

`client/src/hooks/auth.hook.js`

```js
const login = useCallback((jwtToken, id) => {
  setToken(jwtToken)
  setUserId(id)

  localStorage.setItem(storageName, JSON.stringify({
    userId: id, token: jwtToken
  }))
}, [])
```

resolves it.

## Set context to Auth page

in `client/src/pages/AuthPage.js` add

```js
const auth = useContext(AuthContext)
```

in *loginHandler* method add:

```js
auth.login(data.token, data.userId)
```

So, here we go, auth is completed...

## Just little update layout

### Create Navbar component

```sh
mkdir client/src/components
touch client/src/components/Navbar.js
```

```jsx
import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'

export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  return (
    <nav>
      <div class="nav-wrapper">
        <a href="/" class="brand-logo">Link reduce</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><NavLink to="/create">Create</NavLink></li>
          <li><NavLink to="/Links">Links</NavLink></li>
          <li><a href="/create" onClick={looutHandler}>Logout</a></li>
        </ul>
      </div>
    </nav>
  )
}
```

[time 2:04:00](https://www.youtube.com/watch?v=ivDjWYcKDZI&t=7440s)

## Some fixes on Auth page

`client/src/pages/AuthPage.js`

```js
useEffect(() => {
  window.M.updateTextFields()
})
```

# Continue improve backend

[time 2:06:30](https://www.youtube.com/watch?v=ivDjWYcKDZI&t=7590s)

## Create link model

```sh
touch routes/link.routes.js
```

this file will generate links, but it needs to have model...

```sh
touch models/Link.js
# or
cp  models/User.js models/Link.js
```

`models/Link.js`

```js
const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  from: {type: String, required: true},
  to: {type: String, required: true, unique: true},
  code: {type: String, required: true, unique: true},
  date: {type: Date, default: Date.now},
  clicks: {type: Number, default: 0},
  owner: [{type: Types.ObjectId, ref: 'User'}]
})

module.exports = model('Link', schema)
```



So, model is ready, create this `routes/link.routes.js`

```js
const {Router} = require('express')
const Link = require('../models/Link')
const router = Router()

router.post('/generate', async (req, res) => {
  try{
    
  }
  catch(e){
    res.status(500).json({message: 'Something gone wrong, try again...'})
  }
})

router.get('/', async (req, res)=> {
  try{
    
  }
  catch(e){
    res.status(500).json({message: 'Something gone wrong, try again...'})
  }
})

router.get('/:id', async (req, res)=> {
  try{
    
  }
  catch(e){
    res.status(500).json({message: 'Something gone wrong, try again...'})
  }
})

module.exports = router 
```

in `app.js` add this: 

```js
app.use('/api/link', require('./routes/lnk.routes'))
```

in `routes/link.routes.js`

```js
router.get('/', async (req, res)=> {
  try{
    await Link.findOne({ owner: null}) // ???
  }
  catch(e){
    res.status(500).json({message: 'Something gone wrong, try again...'})
  }
})
```

we cannot get links owner at this time. We can solve it by using **jwt**

```sh
mkdir middleware && touch middleware/auth.middleware.js
```

```js
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  if( req.method === 'OPTIONS') {
    return next
  }

  try{
    const token = req.headers.authorization.split(' ')[1]

    if(!token){
      return res.status(401).json({ message: 'Not authorized'})
    }

    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded
    next()
  }
  catch(e){
    res.status(401).json({ message: 'Not authorized'})
  }
}
```

then in `routes/link.routes.js`

```js
const auth = require('../middleware/auth.middleware')
// 
router.get('/', auth, async (req, res)=> {
// ...
```

## Add baseUrl to config

`config/default.json`

```json
"baseUrl": "http://localhost:5000"
```

include config in `routes/link.routes.js`

```js
const config = require('config')
// ...
const baseUrl = config.get('baseUrl')
const { from } = req.body
```

## [npm shortid](https://www.npmjs.com/package/shortid/v/2.2.15)

```
npm i shortid@2.2.15
```

in `routes/link.routes.js`

```js
const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')

const router = Router()

router.post('/generate', auth, async (req, res) => {
  try{
    const baseUrl = config.get('baseUrl')
    const { from } = req.body
    const code = shortid.generate()

    Link.findOne({from}, (err, data) => {
      if (data) {
        return res.json({ link: data})
      }
    })

    const to = baseUrl + '/t/' + code
    const link = new Link({code, to, from, owner: req.user.userId})
    await link.save()
    res.status(201).json({link})
  }
  catch(e){
    res.status(500).json({message: 'Something gone wrong, try again...'})
  }
})

router.get('/', auth, async (req, res)=> {
  try{
    Link.findOne({ owner: req.user.userId}, (err, data) => {
      if(data) {
        res.json(data)
      } else {

      }
    })
  }
  catch(e){
    res.status(500).json({message: 'Something gone wrong, try again...'})
  }
})

router.get('/:id', auth, async (req, res)=> {
  try{
    Link.findById(req.params.id, async (err, data) => {
      if(data) {

      } else {
        
      }
    }) // ???
  }
  catch(e){
    res.status(500).json({message: 'Something gone wrong, try again...'})
  }
})

module.exports = router 

```

# Frontend. Again

[time 2:25:10](https://www.youtube.com/watch?v=ivDjWYcKDZI&t=8710s)

change `client/src/pages/CreatePage.js`

```jsx
import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'

export const CreatePage = () => {
  const {request} = useHttp()
  const [link, setLink] = useState('')
  const pressHandler = async event => {
    if(event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', {from: link})
        console.log('Link data:', data)
      }
      catch(e){}
    }
  }

  useEffect(() => {
    window.M.updateTextFields()
  })

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
        <input
          placeholder="Insert link"
          id="link"
          type="text"
          value={link}
          onChange={e => setLink(e.target.value)}
          onKeyPress={pressHandler}
        />
        <label htmlFor="link">Insert link</label>
      </div>
    </div>
  )
}
```

now we get 401, because we didn't send auth...

```jsx
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const CreatePage = () => {
  const auth = useContext(AuthContext)
  const {request} = useHttp()
  const [link, setLink] = useState('')
  const pressHandler = async event => {
    if(event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', {from: link}, {
          Authorization: `Bearer ${auth.token}`
        })
// ...
```

## Redirect...

``

```jsx
import { useHistory } from 'react-router-dom'
const history = useHistory()
// ...
history.push(`/detail/${data.link._id}`)
```

Now, we go to Detail page with link generated by backend.

## Detail page

[time 2:33:10](https://www.youtube.com/watch?v=ivDjWYcKDZI&t=9210s)

here when we reload page, we are redirected to create page. this is a problem... in `client/src/App.js` we can see that we used *useAuth* hook and load route based on token. But token is depend on useEffect, which is async and cannot appear immediatelly. To solve this, in `client/src/hooks/auth.hook.js`

```js
const [ready, setReaady] = useState(false)
//
etReaady(true)
return { login, logout, token, userId, ready }
```

 in `client/src/App.js`

```jsx
function App() {
  const { token, login, logout, userId, ready } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if(!ready){
    return <Loader />
  }
// ...
```

Soo, we see new component...

## Create Loader

```sh
touch client/src/components/Loader.js
```

