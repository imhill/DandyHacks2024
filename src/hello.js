// Load HTTP module
const http = require("http");
const { Client } = require('pg');

const hostname = "0.0.0.0";
const port = 8000;

// PostgreSQL connection setup
const client = new Client({
  user: 'postgres', // Replace with your PostgreSQL username
  host: 'localhost',     // Change to the host if your DB is remote
  database: 'leetcode_plugin',   // Replace with your PostgreSQL database name
  password: 'jile', // Replace with your password
  port: 5432,            // Default PostgreSQL port
});

// Connect to PostgreSQL database
client.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL', err.stack);
  } else {
    console.log('Connected to PostgreSQL');
  }
});

// Create HTTP server
const server = http.createServer(function (req, res) {
  if (req.url === '/ping') {
    // Set the response HTTP header with HTTP status and Content type
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("PONG\n");
  } else if (req.url === '/postgres-test') {
    client.query('SELECT * FROM users', (err, result) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error querying the database\n');
      } else {
        // Send the response with data retrieved from PostgreSQL
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(`Data from PostgreSQL: ${JSON.stringify(result.rows)}\n`);
      }
    });
  } else {
    // Handle 404 for any other route
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Prints a log once the server starts listening
server.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});

