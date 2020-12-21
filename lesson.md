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
