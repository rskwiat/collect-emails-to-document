const express = require('express');
const bodyParser = require('body-parser');
const emailRoute = require('./routes/email');

const app = express();

app.use(bodyParser.json())
app.use('/api', emailRoute);

app.get('/', (req, res) => {
  res.send({ success: 'Application is running' });
});

module.exports = app;
