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

const matchOffice = office =>
  // FIXME: remove after clients have migrated
  office === 'munich' ? [office, null] : office;

// --- Database Operations
const Meeting = ({ office }, clock) => {
  const filters = { office: matchOffice(office) };

  return {
    clear: () => MeetingModel.remove({}),

    create: data => new MeetingModel({ ...data, office }).save(),

    delete: async id => {
      const meeting = await MeetingModel.findByIdAndRemove(id);
      if (!meeting) {
        throw new Error(`Meeting not found: ${id}`);
      }
    },

    list: () => MeetingModel.find(filters).sort({ date: 1 }),

    listToday: () =>
      MeetingModel.find({ date: rangeToday(clock), ...filters }).sort({
        date: 1,
      }),

    listUpcoming: () =>
      MeetingModel.find({ date: rangeUpcoming(clock), ...filters }).sort({
        date: 1,
      }),
  };
};

// --- Database Facade
export default async (config, clock) => {
  const database = await connect(config);

  return context => ({
    ...database,
    Meeting: Meeting(context, clock),
  });
};
