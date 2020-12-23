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
