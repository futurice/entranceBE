import clock from './clock';
import connectDb from '../db';

export default async ({ db }) => {
  const clockInst = clock();
  const database = await connectDb(db, clockInst);

  return { clock, database };
};
