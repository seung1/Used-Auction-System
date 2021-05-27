import Router from 'koa-router';
import auth from './auth';
import stuff from './stuff';


const api = new Router();

api.use('/auth', auth.routes());
api.use('/stuff', stuff.routes());

api.get('/', (ctx) => {
  ctx.body = 'Api working';
});

export default api;
