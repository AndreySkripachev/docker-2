import { Client } from 'pg'

const client = new Client({
  password: "root",
  user: "root",
  host: "postgres",
});

client.connect().then(() => console.log('Connected')).catch(console.log)
