import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
  email: String,
  joinType: String,
});

const User = mongoose.model('User', UserSchema);
export default User;
