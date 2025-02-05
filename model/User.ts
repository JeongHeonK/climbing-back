import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      maxLength: 12,
      minLength: 8,
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', UserSchema);

export default User;
