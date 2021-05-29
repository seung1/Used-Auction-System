import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
  email: String,
  joinType: String,
});

UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

UserSchema.methods.setJoinTypeAdmin = function () {
  this.joinType = 'admin';
};

UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  // delete data.joinType;
  return data;
};

//static method
UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

// Create current method
UserSchema.methods.checkPassword = async function (password) {
  const isMatched = await bcrypt.compare(password, this.hashedPassword);
  return isMatched;
};

// Create current method
UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    // the Object which located in token value
    {
      _obid: this.id,
      username: this.username,
      _jt: this.joinType,
    },
    process.env.JWT_SECRET, // JWT password
    {
      expiresIn: '7d', // the Object which impilied key expired after 7 days
    },
  );
  return token;
};

// mongoose.model(스키마 이름, 스키마 객체);
// 스키마 이름을 User라고 설정하면, 실제 데이터베이스에 만드는 컬렉션 이름은 users이다
const User = mongoose.model('User', UserSchema);
export default User;
