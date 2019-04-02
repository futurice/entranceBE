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

// --- Database Operations
const Meeting = {
  clear: () => MeetingModel.remove({}),
  create: data => new MeetingModel(data).save(),
  delete: async id => {
    const meeting = await MeetingModel.findByIdAndRemove(id);
    if (!meeting) {
      throw new Error(`Meeting not found: ${id}`);
    }
  },
  list: () => MeetingModel.find(),
};

// --- Database Facade
export default async config => {
  const database = await connect(config);

  return {
    ...database,
    Meeting,
  };
};
