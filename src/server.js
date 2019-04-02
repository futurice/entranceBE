import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import connectDb from './db';
import addRoutes from './routes';

const shutdown = async (server, { database }) => {
  await server.close();
  await database.shutdown();
}

export default async ({ port, db }) => {
  // --- Infrastructure
  const database = await connectDb(db);
  const system = { database };

  // --- Server
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  addRoutes(app, system);

  // --- Startup
  const server = await app.listen(port);
  const actualPort = server.address().port;
  return {
    port: actualPort,
    shutdown: () => shutdown(server, system),
  };
};
