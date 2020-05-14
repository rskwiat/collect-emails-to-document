const express = require('express');
const router = express.Router();
const fs = require('fs');
const validation = require('../utils/validation');

router.post('/email', (req, res) => {
  const { email } = req.body;
  const valid = validation(email);

  if (!valid) {
    return res.status(422).send({ error: 'You must provide a valid email address' });
  }

  try {
    fs.writeFileSync('data/emails.txt', email + '\r\n', { flag: 'a+' });
    return res.status(200).end({ success: 'Email was saved' });
  } catch (err) {
    res.status(422).send({ error: err });
  }
});

module.exports = router;
