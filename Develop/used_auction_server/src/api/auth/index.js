import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';

const auth = new Router();

// auth.get('/', (ctx) => {
//   ctx.body = 'Auth Api working';
// });

auth.post('/register', authCtrl.register);
auth.post('/login', authCtrl.login);
auth.get('/check', authCtrl.check);
auth.post('/logout', authCtrl.logout);

export default auth;
