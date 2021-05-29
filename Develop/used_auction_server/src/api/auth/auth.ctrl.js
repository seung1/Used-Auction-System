import Joi from 'joi';
import User from '../../models/user';
import mongoose from 'mongoose';

/*
  POST /api/auth/register
  {
    username: 'aaa',
    password: 'aaa',
    email: 'aaa',
    joinType: 'user',
  }
*/
export const register = async (ctx) => {
  // Request Body �����ϱ�
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
    email: Joi.string().alphanum().min(3).max(20),
    joinType: Joi.string(),
    admin: Joi.string().empty('').default('default value'),
    // admin: Joi.string().optional().allow(''),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, password, email, admin } = ctx.request.body;
  try {
    // username  �� �̹� �����ϴ��� Ȯ��
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409; // Conflict
      return;
    }

    const user = new User({
      username,
      email,
      joinType: 'user',
    });
    if (admin === 'admin') {
      user.setJoinTypeAdmin();
    }
    // user.setJoinType();
    await user.setPassword(password); // 비밀번호 설정
    await user.save(); // 데이터베이스에 저장

    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7��
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  POST /api/auth/login
  {
    username: (string),
    password: (string)
  }
*/
export const login = async (ctx) => {
  const { username, password } = ctx.request.body;
  // username, password �� ������ ERROR!!!!!
  if (!username || !password) {
    ctx.status = 401; // Unauthorized
    return;
  }

  try {
    const user = await User.findByUsername(username);
    if (!user) {
      ctx.status = 401;
      return;
    }
    const valid = await user.checkPassword(password);
    if (!valid) {
      ctx.status = 401;
      return;
    }
    ctx.body = user.serialize();
    console.log(ctx.body);
    const token = user.generateToken();
    // console.log('token');
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7��
      httpOnly: true,
    });
    // console.log(token);
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  GET /api/auth/check
*/
export const check = async (ctx) => {
  const { user } = ctx.state;
  if (!user) {
    // �α����� �ƴ�
    ctx.status = 401; // Unauthorized
    return;
  }
  ctx.body = user;
};

/*
  POST /api/auth/logout
*/
export const logout = async (ctx) => {
  ctx.cookies.set('access_token');
  ctx.status = 204; // No Content
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// id가 valid한 값인지 확인
const { ObjectId } = mongoose.Types;

export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if(!ObjectId.isValid(id)){
    ctx.status=400; // Bad Request
    return;
  }
  return next();
};


// 형이 알려준거 (사용자정보 리스트 역순으로 10개 보여주는거)
/*
export const users = async(ctx) => {
  try{
    const users = await User.find().sort({ _id: -1 }).limit(10).lean().exec();
    ctx.body = users;
  } catch(e) {
    ctx.throw(500, e);
  }
}*/


// 형이 알려준거에 페이지기능(스킵) 추가해본거
// 이런식으로 하면 http://localhost:4000/api/auth/admin?page=2 형식으로 페이지를 지정하여 조회할 수 있다
export const users = async ctx => {
  // query는 문자열이기 때문에 숫자로 변환해 주어야 합니다
  // 값이 주어지지 않았다면 1을 기본으로 사용합니다
  const page = parseInt(ctx.query.page || '1', 10);
  if (page < 1){
    ctx.status = 400;
    ruturn;
  }
  try{
    const users = await User.find().sort({ _id: -1 }).limit(10).skip((page - 1) * 10).lean().exec();
    // 마지막 페이지 알려주기
    const userCount = await User.countDocuments().exec();
    ctx.set('Last-Page', Math.ceil(userCount / 10));
    //
    ctx.body = users;
  } catch(e) {
    ctx.throw(500, e);
  }
}

// 역순으로 불러오는거 없앤거
/*
export const users = async ctx => {
  try {
    const users = await User.find().exec();
    ctx.body = users;
  } catch(e){
    ctx.throw(500,e);
  }
}*/

export const remove = async (ctx) => {
  try {
    const { id } = ctx.params;
    await User.findByIdAndRemove(id).exec();
  } catch(e) {
    ctx.status = 204;
  }
}


////////////////////////////////////////////////////////////
/*
export const write = async (ctx) => {
  const { username, hashedPassword, email, joinType } = ctx.request.body;
  const schema = new User({
    username,
    hashedPassword,
    email,
    joinType,
  });
  try {
    await auth.save();
    ctx.body=auth;

  }catch(e){
    ctx.throw(500,e);
  }
};
*/

// 일단 필요없는 기능

// GET    /api/auth/:id
export const read = async ctx => {
  const { id } = ctx.params;
  try {
    const users = await User.findById(id).exec();
    if(!users){
      ctx.status = 404;
      return;
    }
    ctx.body = users;
  } catch(e){
    ctx.throw(500,e);
  }
};
