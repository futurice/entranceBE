module.exports = app => {
  app.get("/health", (_, res) => {
    res.status(200).send({ status: "OK" });
  });
};
