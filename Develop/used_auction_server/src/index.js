// import Koa from 'koa';
const Koa = require('koa');
const mongoose = require('mongoose');
require('dotenv').config();
// import Router from 'koa-router';
// import bodyParser from 'koa-bodyparser';
// import mongoose from 'mongoose';
// import serve from 'koa-static';
// import path from 'path';
// import send from 'koa-send';

const { PORT, MONGO_URI } = process.env;
const app = new Koa();
// const router = new Router();

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });

app.use((ctx) => {
  ctx.body = 'auction';
});

const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening to port %d', port);
});

/* eslint-disable no-global-assign */

// require = require('esm')(module /*, options*/);
// module.exports = require('./main.js');
