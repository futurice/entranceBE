import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';

import addRoutes from './routes';

const errorLogger = (err, req, res, _next) => {
  console.error(`${req.method} ${req.url} >>> ERROR\n`, err);
  res.status(500).send({ message: err.message });
};

const shutdown = async (server, { database }) => {
  await server.close();
  await database.shutdown();
}

export default async ({ development, port }, system) => {
  // --- Server
  const app = express();
  app.use(morgan(development ? 'dev' : 'combined'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  addRoutes(app, system);
  app.use(errorLogger);

  // --- Startup
  const server = await app.listen(port);
  const actualPort = server.address().port;
  return {
    port: actualPort,
    shutdown: () => shutdown(server, system),
  };
};
