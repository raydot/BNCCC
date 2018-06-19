const http = require('http');
const { Client } = require('pg');
const pgerror = require('pg-error');

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
    .on("pgerror", function(err){
      // cute error handling from the dev site
      // why not?
        switch (err.severity) {
          case "ERROR" :
          case "FATAL" :
          case "PANIC" : return this.emit("oops-error", err)
          default: return this.emit("oops-notice", err)
      }
    });
  res.end(`Error: ${ err }\n`);
});

server.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://${PORT}/`);
});
