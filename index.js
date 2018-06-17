const http = require('http');

// keep the port flexible to work with Heroku
const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Base code!\n');
});

server.listen(PORT, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});