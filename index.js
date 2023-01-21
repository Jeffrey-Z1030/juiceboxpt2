// inside index.js
const PORT = 8080;
const express = require('express');
const server = express();
const morgan = require('morgan');
server.use(morgan('dev'));
require('dotenv').config();

server.use(express.json())

const apiRouter = require('./api');
server.use('/api', apiRouter);

// server.get('/', (req, res) => {
// res.send('hi')
// });

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");
 // console.log(process.env.JWT_SECRET);
  next();
});


const { client } = require('./db');
client.connect();

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});