import mongoose from 'mongoose';

import MeetingModel from './models/meeting';

// --- Promise Setup
mongoose.Promise = global.Promise;

// --- Connection to Database
const connect = async ({ url }) => {
  console.debug('[db] connecting to database ...');
  await mongoose.connect(url, { useNewUrlParser: true });
  console.debug(`[db] successfully connected to '${url}'`);

  return {
    shutdown: () => mongoose.disconnect(),
  };
};

// --- Helpers
const rangeToday = clock => ({
  $gte: clock.today(),
  $lt: clock.endOfToday(),
});

const rangeUpcoming = clock => ({
  $gte: clock.today(),
});

// --- Database Operations
const Meeting = clock => ({
  clear: () => MeetingModel.remove({}),
  create: data => new MeetingModel(data).save(),
  delete: async id => {
    const meeting = await MeetingModel.findByIdAndRemove(id);
    if (!meeting) {
      throw new Error(`Meeting not found: ${id}`);
    }
  },
  list: () => MeetingModel.find(),
  listToday: () => MeetingModel.find({ date: rangeToday(clock) }),
  listUpcoming: () => MeetingModel.find({ date: rangeUpcoming(clock) }),
});

// --- Database Facade
export default async (config, clock) => {
  const database = await connect(config);

  return {
    ...database,
    Meeting: Meeting(clock),
  };
};
