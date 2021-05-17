import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
  email: String,
  joinType: String,
});

//static method
UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

//current method
UserSchema.methods.checkPassword = async function (password) {
  const isMatched = await bcrypt.compare(password, this.hashedPassword);
  return isMatched;
};

const User = mongoose.model('User', UserSchema);
export default User;
