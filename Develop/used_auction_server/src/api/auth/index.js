import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';

const auth = new Router();

auth.post('/login', authCtrl.login);

export default auth;
