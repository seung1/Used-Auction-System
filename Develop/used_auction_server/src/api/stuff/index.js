import Router from 'koa-router';
import * as stuffCtrl from './stuff.ctrl';

const stuff = new Router();

stuff.get('/', (ctx) => {
  ctx.body = 'Stuff Api working';
});

stuff.post('/enrollStuff', stuffCtrl.enrollStuff)
stuff.get('/getStuff', stuffCtrl.getStuff)
stuff.post('/removeStuff', stuffCtrl.removeStuff)

export default stuff;