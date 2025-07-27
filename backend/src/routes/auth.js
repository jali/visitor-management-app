const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/user');
const { loginValidation } = require('../validation');

const router = express.Router();

router.post('/login', async (req, res) => {
  // validate login data
  const { error } = loginValidation(req.body)
  if (error) {
      return res.status(400).send({info: error['details'][0]['message']})
  }
  const email = req.body.email
  const password = req.body.password
  User.findOne({email}, function (err, user){
      if (err || !user) {
          res.status(401).send({info: 'bad credentials, please try again'})
      } 
      if (user) {
          user.comparePassword(password, function(err, isMatch) {
              if (err) throw err;
              if (isMatch){
                  try {
                      const data =  {_id: user.id, username: user.username, role:user.role}
                      const token = auth.generateToken(data)
                      res.header('x-auth-token',token).send({'security_token':token})
                  } catch (error) {
                      res.status(500).send({info: 'something went wrong'})
                  }
              } else {
                  res.status(401).send({info: 'bad credentials, please try again'})
              }
          });
      }
  });
});

module.exports = router;
