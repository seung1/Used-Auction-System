import User from '../../models/user';

/*
  POST /api/auth/login
  {
    username: (string),
    password: (string)
  }
*/
export const login = async (ctx) => {
  const { username, password } = ctx.request.body;

  // username, password 가 없으면 ERROR!!!!!
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
  } catch (e) {
    ctx.throw(500, e);
  }
};
