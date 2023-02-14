import http from 'http';

import { apiConfig } from './config';
import { databaseClient } from './database/client'
import { serverListener } from './server-listener';

const server = http.createServer(serverListener);

(async() => {
  try {
    await databaseClient.connect();
    console.log('- Connected to database');
  } catch(error) {
    console.log(error);
  }

  server.listen(apiConfig.port, '0.0.0.0', () => {
    console.log(`- Server is listening on port ${apiConfig.port}`);
  })
})();

function shutdown() {
  databaseClient.end();
  server.close();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('SIGUSR2', shutdown);
