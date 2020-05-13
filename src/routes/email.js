const express = require('express');
const router = express.Router();
const fs = require('fs')

router.post('/email', (req, res) => {
  const { email } = req.body;
  try {
    fs.writeFileSync('data/emails.txt', email + '\r\n', { flag: 'a+' });
    res.end();
  } catch (err) {
    console.error(err)
  }
});

module.exports = router;