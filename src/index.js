import config from './config';
import server from './server';
import system from './system';

const run = async config => {
  const sys = await system(config);

server(config, sys)
  .then(({ port }) => {
    console.log(`🚀  We are live on port ${port}!`);
  })
  .catch(e => {
    console.error(`💥 Startup failed with exception!`, e);
    process.exit(1);
  });
};

run(config);
