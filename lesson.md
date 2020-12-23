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
    if(candidate) {
      return res.status(400).json({message: 'That email already registered.'})
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({email, password: hashedPassword})

    await user.save()

    res.status(201).json({message: 'User is created.'})
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
import React from 'react'

export const AuthPage = () => {
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