const express = require('express');
const bodyParser = require('body-parser');
const emailRoute = require('./routes/email');

const PORT = 3000;
const app = express();

app.use(bodyParser.json())
app.use('/api', emailRoute);


app.listen(PORT, () => {
  console.log(`Application is running at http://localhost:${PORT}`);
});