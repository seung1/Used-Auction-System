import e from 'cors';
import Joi from 'joi';
import User from '../../models/user';

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
    await user.setPassword(password); // ��й�ȣ ����
    await user.save(); // �����ͺ��̽��� ����

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



export const users = async(ctx) => {
  try{
    const users = await User.find().sort({ _id: -1 }).limit(10)
    lean().exec();
  } catch(e) {
    ctx.throw(500, e);
  }
}

export const remove = async (ctx) => {
  try {
    const { id } = ctx.params;
    await User.findByIdAndRemove(id).exec();
  } catch(e) {
    ctx.status = 204;
  }
}

export const save_buyStuff = async (ctx) => {
  const {username, product_number, mode, have} = ctx.request.body;

  console.log(ctx)
  if (mode === 'save') {
    if (!have) {
      await User.updateOne({username : username}, { $push : {saveList : parseInt(product_number)}})
      ctx.body = 'save_push_success'
      console.log('yaho_push')
    } else {
      await User.updateOne({username:username}, {$pull : {saveList : parseInt(product_number)}})
      ctx.body = 'save_pop_success'
      console.log('yaho_pop')
    }
  }
  else if (mode === 'buy') {
    await User.updateOne({username : username}, { $push : {buyList : parseInt(product_number)}})
    ctx.body = 'buy_success'
  }
}

export const getSaveList = async (ctx) => {
  const {username} = ctx.request.body;
  const buyList = await User.findOne({'username' : username})
  const buyLen = await buyList.buyList.length;
  if (buyLen === 0) 
    return ;
  else {
    // 구매 목록 랜덤 선택
    const randnum = Math.floor(Math.random() * buyLen)
    // 같은 구매를 한 사람
    const tempAnotherUser = await User.find({'buyList' : {$all: buyList.buyList[randnum]}})
    const anotherUser = tempAnotherUser.filter(v => v.username !== username)
    // 구매한 사람 랜덤 선택
    const randnum2 = Math.floor(Math.random() * anotherUser.length)
    // 저장목록 반환
    ctx.body = anotherUser[randnum2].saveList
    // console.log(ctx.body)
    return anotherUser
  }
}

export const getMySaveList = async (ctx) => {
  const {username} = ctx.request.body;
  const userObj = await User.findOne({'username' : username})
  const saveList = await userObj.saveList;

  console.log(userObj)
  ctx.body = saveList;
  console.log(ctx.body)
}