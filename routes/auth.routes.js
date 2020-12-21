const { Router } = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Min. 6 symbols').isLength({ min: 6 })
  ],
  async (req, res) => {
    try{
      const errors = validationResult(req)
      if(!errors.isEmpty()){
        res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect registration data.'
        })
      }
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

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Enter valid email.').normalizeEmail().isEmail(),
    check('password', 'Enter password.').exists()
  ],
  async (req, res) => {
    try{
      const errors = validationResult(req)
      if(!errors.isEmpty()){
        res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect login data.'
        })
      }
      const { email, password } = req.body

      const user = User.findOne({email})

      if (!user) {
        return res.status(400).json({message: 'This email is not found.'})
      }

      const isMatch = bcrypt.compare(password, user.password)

      is(!isMatch) {
        return res.status(400).json({message: 'Invalid password.'})
      }

      const token = jwt.sign(
        {userId: user.id},
        config.get('jwtSecret'),
        { expiresIn: '1h'}
      )

      res.json({token, userId: user.id})

    }
    catch(e){
      res.status(500).json({message: 'Something gone wrong, try again...'})
    }
  }
)


module.exports = router
