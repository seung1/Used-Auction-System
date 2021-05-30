import User from '../../models/user';
import mongoose from 'mongoose';

// id가 valid한 값인지 확인
const { ObjectId } = mongoose.Types;

export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }
  return next();
};

// 페이지기능(스킵) 추가해본거
// 이런식으로 하면 http://localhost:4000/api/auth/admin?page=2 형식으로 페이지를 지정하여 조회할 수 있다
export const users = async (ctx) => {
  // query는 문자열이기 때문에 숫자로 변환해 주어야 합니다
  // 값이 주어지지 않았다면 1을 기본으로 사용합니다
  const page = parseInt(ctx.query.page || '1', 10);
  if (page < 1) {
    ctx.status = 400;
    return;
  }
  try {
    const users = await User.find({ joinType: 'user' })
      .sort({ _id: -1 })
      .limit(5)
      .skip((page - 1) * 5)
      .lean()
      .exec();
    // 마지막 페이지 알려주기
    const userCount = await User.countDocuments().exec();
    ctx.set('Last-Page', Math.ceil(userCount / 5));
    //
    ctx.body = users;
  } catch (e) {
    ctx.throw(500, e);
  }
};

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
  } catch (e) {
    ctx.status = 204;
  }
};

// 일단 필요없는 기능
/*
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
*/
