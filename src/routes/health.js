import { Router } from 'express';

export default () => {
  const app = new Router();

  app.get('/health', (_, res) => {
    res.status(200).send({ status: 'OK' });
  });

  return app;
};
