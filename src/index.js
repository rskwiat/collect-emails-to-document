const app = require('./app');
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Application is running at http://localhost:${PORT}`);
});
