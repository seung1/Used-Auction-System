import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';

const auth = new Router();

auth.get('/', (ctx) => {
  ctx.body = 'Auth Api working';
});

auth.post('/login', authCtrl.login);

export default auth;
