import mongoose from 'mongoose';

const MeetingSchema = mongoose.Schema(
  {
    host: String,
    phone: String,
    meeting: String,
    date: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Meeting', MeetingSchema);
