import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
  {
    name: String,
    phone: String,
  },
  {
    timestamps: true,
  }
);



export default mongoose.model('User', UserSchema);
