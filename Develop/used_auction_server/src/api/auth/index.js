import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';
import * as userCtrl from './user.ctrl';

const auth = new Router();

// auth.get('/', (ctx) => {
//   ctx.body = 'Auth Api working';
// });

//
auth.post('/register', authCtrl.register);
auth.post('/login', authCtrl.login);
auth.get('/check', authCtrl.check);
auth.post('/logout', authCtrl.logout);

// get으로 http://localhost:4000/api/auth/users 으로 가면 authCtrl.users메소드가 실행
// get으로 http://localhost:4000/api/auth/users?page=2 를 하면 2페이지로 넘어감
// 사용자 정보 5개씩 끊어서 페이지 생성함
auth.get('/users', userCtrl.users);

// delete로 http://localhost:4000/api/auth/remove/"DB에있는id" 으로 가면 authCtrl.remove 메소드가 실행되면서 "DB에있는id"가 삭제됨
auth.delete('/remove/:id', userCtrl.checkObjectId, userCtrl.remove);

// get으로 http://localhost:4000/api/auth/"DB에있는id" 으로 가면 authCtrl.read 메소드가 실행되면서 "DB에있는id"에 해당하는 정보만 가져옴
// 이 프로젝트에서는 필요 없는 기능
//auth.get('/:id', authCtrl.checkObjectId, authCtrl.read);

export default auth;
