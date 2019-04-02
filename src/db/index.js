import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

// --- Connection to Database
const connect = async ({ url }) => {
  console.debug('[db] connecting to database ...');
  await mongoose.connect(url, { useNewUrlParser: true, })
  console.debug(`[db] successfully connected to '${url}'`);

  return {
    shutdown: () => mongoose.disconnect(),
  };
};

// --- Database Logic

// --- Database Constructor
export default async config => {
  const database = await connect(config);

  return {
    ...database
  };
}
