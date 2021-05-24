/* eslint-disable no-global-assign */

// 나중에 이 주석을 지우면 됩니다. 테스트용으로 잠시 주석처리 -고재원
//require = require('esm')(module /*, options*/);
//module.exports = require('./main.js');

// 이 밑부터 전부 테스트 코드입니다. -고재원
require('dotnev').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const { PORT } = process.env;
const api = require('./api');
const app = new Koa();
const router = new Router();

router.use( '/api', api.routes());

app.use(bodyParser());

app. use(router ,routes()). use( router. allowedMethodsO);

const port = PORT || 4000;
app.listen(port, () => {
console.log('Listening to port %d', port);
});