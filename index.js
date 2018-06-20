const http = require('http');
const { Client } = require('pg');
// const pgerror = require('pg-error');

// because of the insanity of running Postgress
// I have to involve a dev-focused error library...
// ...another mouth to feed!


// keep the port flexible to work with Heroku
const PORT = process.env.PORT || 5000;
const { DATABASE_URL } = process.env;

const server = http.createServer((req, res) => {
  const client = new Client({
    connectionString: DATABASE_URL,
  });
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  client.connect()
    .then(() => client.query('SELECT * FROM alltables'))
    .then((result) => {
      res.end(`${result.rows[0].name}\n`);
      client.end();
    })
    .catch(() => {
      res.end('Oops!');
      client.end();
    });
  const myOutput = res;
  console.log(`Output: ${myOutput[0]}\n`);
  res.end(`Response: ${myOutput}\n`);
  // res.end(`Response: ${result.rows[0].name}\n`);
});

server.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://${PORT}/`);
});
