import jwt from 'jsonwebtoken';
import User from '../models/user';

const jwtMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get('access_token');
  // console.log(1);
  // console.log(token);
  if (!token) return next();
  try {
    console.log(process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    ctx.state.user = {
      _id: decoded._obid,
      username: decoded.username,
    };

    console.log(ctx.state);

    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
      const user = await User.findById(decoded._id);
      const token = user.generateToken();
      ctx.cookies.set('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7d
        httpOnly: true,
      });
    }

    return next();
  } catch (e) {
    // token verified error
    return next();
  }
};

export default jwtMiddleware;
