import { Pool } from 'pg';
import http from 'http';

import { apiConfig, postgresConfig } from './config';

const server = http.createServer(async(req, res) => {
  try {
    const payload = await client.query('SELECT * from users');
    const users = payload.rows;
    console.log(users);
    res
      .setHeader('Content-Type', 'application/json')
      .end(JSON.stringify(users));
  } catch(err) {
    console.log(err);
    res.end('Error');
  }

});

const client = new Pool(postgresConfig);

client.connect().then(() => console.log('Connected')).catch(console.log);
(async() => {
  try {
    client.removeAllListeners();
    await client.connect();
    console.log('- Connected to database');
  } catch(error) {
    client.end();
    console.log(error);
  }

  server.listen(apiConfig.port, '0.0.0.0', () => {
    console.log(`- Server is listening on port ${apiConfig.port}`);
  })
})();

function shutdown() {
  client.end();
  server.close();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('SIGUSR2', shutdown);
