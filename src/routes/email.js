const express = require('express');
const router = express.Router();
const fs = require('fs')

router.post('/email', (req, res) => {
  const { email } = req.body;

  //@todo - move to seperate function
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const test = re.test(String(email).toLowerCase());

  if (!test) {
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
