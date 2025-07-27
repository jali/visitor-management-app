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
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ info: 'bad credentials, please try again' });
    }
    const isMatch = await new Promise((resolve, reject) => {
      user.comparePassword(password, (err, isMatch) => {
        if (err) reject(err);
        resolve(isMatch);
      });
    });
    if (!isMatch) {
      return res.status(401).send({ info: 'bad credentials, please try again' });
    }
    const data = { _id: user.id, name: user.name, role: user.role };
    console.log('data:=======> ', data)
    const token = auth.generateToken(data);

    res.header('x-auth-token', token).send({ 'token': token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ info: 'something went wrong' });
  }
});

module.exports = router;
