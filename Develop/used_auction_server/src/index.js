// import Koa from 'koa';
const Koa = require('koa');
// import Router from 'koa-router';
// import bodyParser from 'koa-bodyparser';
// import mongoose from 'mongoose';
// import serve from 'koa-static';
// import path from 'path';
// import send from 'koa-send';

const app = new Koa();
// const router = new Router();

app.use((ctx) => {
  ctx.body = 'auction';
});

app.listen(4000, () => {
  console.log('Listening');
});

/* eslint-disable no-global-assign */

// require = require('esm')(module /*, options*/);
// module.exports = require('./main.js');
