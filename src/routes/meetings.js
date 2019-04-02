export default (app, { database: { Meeting } }) => {

  app.post('/meetings', async (req, res) => {
    const { host, meeting, phone, date } = req.body;

    if (!host || !meeting) {
      return res.status(400).send({
        message: 'Meeting content can not be empty',
      });
    }

    const created = await Meeting.create({ host, meeting, phone, date });
    res.send(created);
  });

  app.get('/meetings', async (_, res) => {
    const meetings = await Meeting.list();
    res.send(meetings);
  });

  app.delete('/meetings/:id', async (req, res) => {
    const { id } = req.params;
    await Meeting.delete(id);
    res.send({ message: 'Meeting deleted successfully!' });
  });

  //todo remove after dev finished
  app.delete('/meetings/', async (_, res) => {
    await Meeting.clear();
    res.send({ message: 'All meetings deleted' });
  });

};
