import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
      _Objectid: this.id,
      username: this.username,
    },
    process.env.JWT_SECRET, // JWT password
    {
      expiresIn: '7d', // the Object which impilied key expired after 7 days
    },
  );
  return token;
};

const User = mongoose.model('User', UserSchema);
export default User;
