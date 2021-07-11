const router = require('express').Router();
const User = require('../models/user.model')
require('../db/connect');
const bcrypt = require('bcrypt');

router.route('/')
  .post(async(req,res) => {
    const {name,password} = req.body;
    const user = await User.findOne({name});
  try {
    if(user) {
      const isTruePassword = await bcrypt.compare(password, user.password);
      if(user.name === name.toLowerCase().trim() && isTruePassword){
        res.status(200).json({
          status: 1,
          error: 0,
          error_description: null,
          access_token: user.access_token
        })
      }else{
        throw new Error('password or name are not correct')
      }
    }else {
      throw new Error('user not found')
    }
  }catch(err) {
    res.status(404).json({
      status: 0,
      error: 1,
      error_description: err.message
    })
  }
  })
 

module.exports = router;
