import config from './config';
import server from './server';

server(config)
  .then(({ port }) => {
    console.log(`🚀  We are live on port ${port}!`);
  })
  .catch(e => {
    console.error(`💥 Startup failed with exception!`, e);
    process.exit(1);
  });
