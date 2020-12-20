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

