import Koa from 'koa';
require('dotenv').config();
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import api from './api';
import jwtMiddleware from './util/jwtMiddleWare';
// import send from 'koa-send';

const { PORT, MONGO_URI } = process.env;

const app = new Koa();
const router = new Router();

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });

// main router setup
router.use('/api', api.routes()); // main js에 api 라우트 적용

app.use(bodyParser());
app.use(jwtMiddleware);

app.use(router.routes()).use(router.allowedMethods);

router.get('/', (ctx) => {
  ctx.body = 'Used_Auction API SERVER WORKING!!!!!!';
});

// app.use((ctx) => {
//   // NOT FOUND && path to the file is not begin with /api
//   if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
//     if ('/' == ctx.path) send(ctx, '/src/index.html');
//   }
// });

const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening to port %d', port);
});
