// Load HTTP module
const http = require("http");
const { Client } = require('pg');
const express = require('express');

const hostname = "0.0.0.0";
const port = 8000;

const app = express();
app.use(express.json());

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


//Create User Endpoint
app.post('/create-user', async (req, res) => {
  // Access query parameters and JSON body
  const queryParams = req.query;
  const jsonBody = req.body;
  
  // Validate query parameters and body
  if (!queryParams.username) {
    return res.status(400).json({error: 'Missing required query parameter: username'});
  }
  
  const query = `
    INSERT INTO users (username)
    VALUES ($1) ON CONFLICT (username) DO NOTHING
  `;
  try {
    // Execute the query with parameters
    const result = await client.query(query, [queryParams.username]);
    res.sendStatus(201);
  } catch (err) {
    console.error('Error executing query:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/add-friend', async (req, res) => {
  // Access query parameters and JSON body
  const queryParams = req.query;
  const jsonBody = req.body;
  
  // Validate query parameters and body
  if (!queryParams.username) {
    return res.status(400).json({ error: 'Missing required query parameter: username' });
  }
  
  if (!jsonBody || !jsonBody.friend ) {
    return res.status(400).json({ error: 'Missing JSON field friend' });
  }
  const query = `
    INSERT INTO friends (usr_id, friend_id)
    VALUES (
               $1,  -- Get the usr_id based on the username
               $2   -- Get the friend_id based on the friend's username
           )
      ON CONFLICT (usr_id, friend_id)  -- Avoid conflicts if the same friendship already exists
    DO NOTHING;
  `;
  try {
    console.log(queryParams);
    // Execute the query with parameters
    const userRes = await client.query('SELECT usr_id FROM users WHERE username = $1', [queryParams.username]);
    const friendRes = await client.query('SELECT usr_id FROM users WHERE username = $2', [jsonBody.friend]);
  
    console.log(userRes.rows);
    if (userRes.rows.length === 0) {
      res.status(400).json({ error: `${queryParams.username} does not exist in users database` })
    }
  
    if (friendRes.rows.length === 0) {
      res.status(400).json({ error: `Friend with username ${jsonBody.friend} does not exist.`});
    }
  
    const usrId = userRes.rows[0].usr_id;
    const friendId = friendRes.rows[0].usr_id;
    const result = await client.query(query, [userRes, friendRes]);
    // Send the response
    res.sendStatus(201);
  } catch (err) {
    console.error('Error executing query:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/post-problem', async (req, res) => {
  // Access query parameters and JSON body
  const queryParams = req.query;
  const jsonBody = req.body;
  
  // Validate query parameters and body
  if (!queryParams.username) {
    return res.status(400).json({ error: 'Missing required query parameter: username' });
  }
  
  if (!jsonBody || !jsonBody.problemNum || !jsonBody.runtime || !jsonBody.space ) {
    return res.status(400).json({ error: 'Missing required JSON field' });
  }
  const query = `
    INSERT INTO problems (usr_id, problem_number, runtime, space)
    VALUES ((SELECT usr_id FROM users WHERE username = $1), $2, $3, $4)
    ON CONFLICT (usr_id, problem_number)
    DO UPDATE SET runtime = EXCLUDED.runtime, space = EXCLUDED.space;
  `;
  try {
    // Execute the query with parameters
    const result = await client.query(query, [queryParams.username, jsonBody.problemNum, jsonBody.runtime, jsonBody.space]);
    // Send the response
    res.sendStatus(201);
  } catch (err) {
    console.error('Error executing query:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Prints a log once the server starts listening
app.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
