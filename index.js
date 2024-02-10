const express = require('express');
const app = express();
require('./connection/connection')();
const bodyParser = require('body-parser');

const { userRouter } = require('./Router/userRouter');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);

app.listen(8080, () => {
  console.log('server devloyed');
});
