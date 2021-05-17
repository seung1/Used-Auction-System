import Koa from 'koa';
require('dotenv').config();
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import api from './api';

const { PORT, MONGO_URI } = process.env;

const app = new Koa();
const router = new Router();

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });

// main router setup
router.use('/api', api.routes()); // main js에 api 라우트 적용

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods);

const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening to port %d', port);
});
