// Load HTTP module
const http = require("http");
const { Client } = require('pg');
const express = require('express');

const hostname = "0.0.0.0";
const port = 8000;

const app = express();
const cors = require('cors');
app.use(express.json());

// PostgreSQL connection setup
const client = new Client({
  user: 'sike', // Replace with your PostgreSQL username
  host: 'sike',     // Change to the host if your DB is remote
  database: 'sike',   // Replace with your PostgreSQL database name
  password: 'sike', // Replace with your password
  port: 6969,            // Default PostgreSQL port
});

// Connect to PostgreSQL database
client.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL', err.stack);
  } else {
    console.log('Connected to PostgreSQL');
  }
});

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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
    // Execute the query with parameters
    const userRes = await client.query(`SELECT usr_id FROM users WHERE username = ($1);`, [queryParams.username]);
    const friendRes = await client.query(`SELECT usr_id FROM users WHERE username = ($1);`, [jsonBody.friend]);
  
    if (userRes.rows.length === 0) {
      res.status(400).json({ error: `${queryParams.username} does not exist in users database` })
    }
  
    if (friendRes.rows.length === 0) {
      res.status(400).json({ error: `Friend with username ${jsonBody.friend} does not exist.`});
    }
  
    const usrId = userRes.rows[0].usr_id;
    const friendId = friendRes.rows[0].usr_id;
    const result = await client.query(query, [usrId, friendId]);
    // Send the response
    res.sendStatus(201);
  } catch (err) {
    console.error('Error executing query:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/get-friends', async (req, res) => {
  // Access query parameters and JSON body
  const queryParams = req.query;
  const jsonBody = req.body;
  
  // Validate query parameters and body
  if (!queryParams.username) {
    return res.status(400).json({ error: 'Missing required query parameter: username' });
  }
  
  const query = `
    SELECT f.friend_id
    FROM friends f
    WHERE f.usr_id = $1
      AND EXISTS (
        SELECT $1
        FROM friends f2
        WHERE f2.usr_id = f.friend_id
          AND f2.friend_id = $1
      );
  `;
  try {
    // Execute the query with parameters
    const userRes = await client.query(`SELECT usr_id FROM users WHERE username = ($1);`, [queryParams.username]);
    
    if (userRes.rows.length === 0) {
      res.status(400).json({ error: `${queryParams.username} does not exist in users database` })
    }
    
    const usrId = userRes.rows[0].usr_id;
    const result = await client.query(query, [usrId]);
    console.log(result);
    // Send the response
    res.sendStatus(201);
  } catch (err) {
    console.error('Error executing query:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Dummy for now
app.get('/get-challenge-leaderboard', async (req, res) => {
  // Access query parameters and JSON body
  const queryParams = req.query;
  const jsonBody = req.body;
  
  // Validate query parameters and body
  if (!queryParams.username) {
    return res.status(400).json({error: 'Missing required query parameter: username'});
  }
  try {
    // Execute the query with paramet
    res.status(201).json({challenges: [{'leo':10}, {'ezra':5}]}).headers;
  } catch (err) {
    console.error('Error executing query:', err.stack);
    res.set('Access-Control-Allow-Origin', '*');
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
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.sendStatus(201);
  } catch (err) {
    console.error('Error executing query:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Preflight CORS
app.options('/post-problem', (req, res) => {
  res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.status(204).send();
});

// Prints a log once the server starts listening
app.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
