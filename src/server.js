import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import dbConfig from './config/db.config.js';
import routes from './routes';

export default () => {
  const app = express();
  const port = 8000;

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());

  // Configuring the database
  mongoose.Promise = global.Promise;

  // Connecting to the database
  mongoose
    .connect(dbConfig.url, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log('Successfully connected to the database');
    })
    .catch(err => {
      console.log('Could not connect to the database. Exiting now...', err);
      process.exit();
    });

  routes(app, {});
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
};
