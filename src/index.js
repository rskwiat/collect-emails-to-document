const express = require('express');
const bodyParser = require('body-parser');
const emailRoute = require('./routes/email');

const app = express();
const { PORT } = process.env;

app.use(bodyParser.json())
app.use('/api', emailRoute);

app.listen(PORT, () => {
  console.log(`Application is running at http://localhost:${PORT}`);
});
