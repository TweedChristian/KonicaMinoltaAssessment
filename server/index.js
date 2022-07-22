const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Getting started');
});

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});
