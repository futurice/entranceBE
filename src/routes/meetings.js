import { Router } from 'express';

export default () => {
  const app = new Router();
  const Meeting = req => req.system.database.Meeting;

  app.post('/meetings', async (req, res) => {
    const { host, meeting, phone, date } = req.body;

    if (!host || !meeting) {
      return res.status(400).send({
        message: 'Meeting content can not be empty',
      });
    }

    const created = await Meeting(req).create({ host, meeting, phone, date });
    res.send(created);
  });

  app.get('/meetings', async (req, res) => {
    const meetings = await Meeting(req).list();
    res.send(meetings);
  });

  app.get('/meetings/q/today', async (req, res) => {
    const meetings = await Meeting(req).listToday();
    res.send(meetings);
  });

  app.get('/meetings/q/upcoming', async (req, res) => {
    const meetings = await Meeting(req).listUpcoming();
    res.send(meetings);
  });

  app.delete('/meetings/:id', async (req, res) => {
    const { id } = req.params;
    await Meeting(req).delete(id);
    res.send({ message: 'Meeting deleted successfully!' });
  });

  //todo remove after dev finished
  app.delete('/meetings/', async (req, res) => {
    await Meeting(req).clear();
    res.send({ message: 'All meetings deleted' });
  });

  return app;
};
