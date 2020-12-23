const {Router} = require('express')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')

const router = Router()

router.post('/generate', (req, res) => {
  try{
    
  }
  catch(e){
    res.status(500).json({message: 'Something gone wrong, try again...'})
  }
})

router.get('/', auth, async (req, res)=> {
  try{
    Link.findOne({ owner: null}, (err, data) => {
      if(data) {

      } else {

      }
    }) // ???
  }
  catch(e){
    res.status(500).json({message: 'Something gone wrong, try again...'})
  }
})

router.get('/:id', async (req, res)=> {
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
