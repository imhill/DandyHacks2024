const { Client } = require('pg');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const hostname = "0.0.0.0";
const port = 8000;

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  const originalSend = res.send; // Save the original res.send method
  
  res.send = function (body) {
    console.log(`
      ${req.method} request to ${req.url} at ${new Date().toISOString()}
      Response: ${body}
    `);
    originalSend.call(this, body); // Call the original res.send with the response body
  };
  
  next(); // Pass to the next middleware or route handler
});

// PostgreSQL connection setup
const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Connect to PostgreSQL database
client.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL', err.stack);
  } else {
    console.log(`Connected to PostgreSQL with environment variables:\n${JSON.stringify(process.env, null, 2)}`);
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
      return res.status(400).json({ error: `${queryParams.username} does not exist in users database` });
    }
    
    if (friendRes.rows.length === 0) {
      return res.status(400).json({ error: `Friend with username ${jsonBody.friend} does not exist.`});
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

app.post('/remove-friend', async (req, res) => {
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
    DELETE FROM friends
    WHERE usr_id = $1  -- The usr_id (user) based on the username
      AND friend_id = $2;  -- The friend_id (friend) based on the friend's username
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
    res.sendStatus(200);
  } catch (err) {
    console.error('Error executing query:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/get-friends', async (req, res) => {
  // Access query parameters and JSON body
  const queryParams = req.query;
  
  // Validate query parameters and body
  if (!queryParams.username) {
    return res.status(400).json({ error: 'Missing required query parameter: username' });
  }
  
  const query = `
    SELECT u.username FROM friends f JOIN users u ON f.friend_id = u.usr_id WHERE f.usr_id = $1 AND EXISTS ( SELECT $1 FROM friends f2 WHERE f2.usr_id = f.friend_id AND f2.friend_id = $1 );
  `;
  const query2 = `
    SELECT u.username
    FROM friends f
    JOIN users u
    ON f.friend_id =u.usr_id
    WHERE f.usr_id = $1
  `;
  try {
    // Execute the query with parameters
    const userRes = await client.query(`SELECT usr_id FROM users WHERE username = ($1);`, [queryParams.username]);
    
    if (userRes.rows.length === 0) {
      res.status(400).json({ error: `${queryParams.username} does not exist in users database` });
      return;
    }
    
    const usrId = userRes.rows[0].usr_id;
    const friendsResult = await client.query(query, [usrId]);
    const totalResult = await client.query(query2, [usrId]);
    // Send the response
    res.status(200).json({friends: friendsResult.rows.map(row => row.username), pending: totalResult.rows.filter(item => !friendsResult.rows.includes(item)).map(row => row.username)});
  } catch (err) {
    console.error('Error executing query:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/get-challenge-leaderboard', async (req, res) => {
  // Access query parameters and JSON body
  const queryParams = req.query;
  
  // Validate query parameters and body
  if (!queryParams.username) {
    return res.status(400).json({ error: 'Missing required query parameter: username' });
  }
  
  const query = `
    SELECT COUNT(*) AS challenge_count
    FROM usr_challenge
    WHERE usr_id = $1;
  `;
  try {
    // Execute the query with parameters
    const userRes = await client.query(`SELECT usr_id FROM users WHERE username = ($1);`, [queryParams.username]);
    
    if (userRes.rows.length === 0) {
      res.status(400).json({ error: `${queryParams.username} does not exist in users database` })
    }
    
    const usrId = userRes.rows[0].usr_id;
    const result = await client.query(query, [usrId]);
    // Send the response
    res.status(200).json(result.rows[0].challenge_count);
  } catch (err) {
    console.error('Error executing query:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/get-problem-count', async (req, res) => {
  // Access query parameters and JSON body
  const queryParams = req.query;
  
  // Validate query parameters and body
  if (!queryParams.username) {
    return res.status(400).json({ error: 'Missing required query parameter: username' });
  }
  
  const query = `
    SELECT COUNT(*) AS problems_count
    FROM problems
    WHERE usr_id = $1;
  `;
  try {
    // Execute the query with parameters
    const userRes = await client.query(`SELECT usr_id FROM users WHERE username = ($1);`, [queryParams.username]);
    
    if (userRes.rows.length === 0) {
      res.status(400).json({ error: `${queryParams.username} does not exist in users database` })
    }
    
    const usrId = userRes.rows[0].usr_id;
    const result = await client.query(query, [usrId]);
    // Send the response
    res.status(200).json(result.rows[0].problems_count);
  } catch (err) {
    console.error('Error executing query:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/get-active-challenges', async (req, res) => {
  // Access query parameters and JSON body
  const queryParams = req.query;
  
  // Validate query parameters and body
  if (!queryParams.username) {
    return res.status(400).json({ error: 'Missing required query parameter: username' });
  }
  
  const query = `
    FROM usr_challenge uc
    JOIN challenge_problem cp ON uc.challenge_id = cp.challenge_id
    WHERE uc.usr_id = 1
    AND cp.expiration > CURRENT_TIMESTAMP;
  `;
  try {
    // Execute the query with parameters
    const userRes = await client.query(`SELECT usr_id FROM users WHERE username = ($1);`, [queryParams.username]);
    
    if (userRes.rows.length === 0) {
      res.status(400).json({ error: `${queryParams.username} does not exist in users database` })
    }
    
    const usrId = userRes.rows[0].usr_id;
    const result = await client.query(query, [usrId]);
    // Send the response
    res.status(200).json(result.rows[0].problems_count);
  } catch (err) {
    console.error('Error executing query:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/get-problem-stats', async (req, res) => {
  const queryParm = req.query;
  const jsonBody = req.body;
  
  if (!queryParm.titleSlug && queryParm.titleSlug) {
    return res.status(400).json({ error: 'Missing required query parameter: username' });
  }
  const query = `SELECT p.runtime, p.space, p.completed_at, u.username, p.problem_number
                 FROM problems p
                        JOIN friends f
                             ON p.usr_id = f.friend_id
                        JOIN users u
                             ON u.usr_id = f.friend_id
                 WHERE f.usr_id = (
                   SELECT usr_id
                   FROM users
                   WHERE username = $1
                 )
                   AND EXISTS (
                     SELECT 1
                     FROM friends f2
                     WHERE f2.usr_id = f.friend_id
                       AND f2.friend_id = f.usr_id
                   )
                   AND p.problem_number = $2
  
                 UNION
  
                 SELECT p.runtime, p.space, p.completed_at, u.username, p.problem_number
                 FROM problems p
                        JOIN users u
                             ON u.usr_id = p.usr_id
  
                 WHERE p.usr_id = (
                   SELECT usr_id
                   FROM users
                   WHERE username = $1
                 )
                   AND p.problem_number = $2;
  
  `
  try {
    // Execute the query with parameters
    const result = await client.query(query, [queryParm.username, queryParm.titleSlug]);
    // const result = await client.query(query, [queryParm.titleSlug]);
    // Send the response
    res.status(200).json(result.rows);
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
  
  if (!jsonBody || !jsonBody.titleSlug || !jsonBody.runtime || !jsonBody.space ) {
    return res.status(400).json({ error: 'Missing required JSON field' });
  }
  const query = `
    INSERT INTO problems (usr_id, problem_number, runtime, space)
    VALUES ((SELECT usr_id FROM users WHERE username = $1), $2, $3, $4)
      ON CONFLICT (usr_id, problem_number)
    DO UPDATE
               SET runtime = CASE
               WHEN EXCLUDED.runtime < problems.runtime THEN EXCLUDED.runtime
               ELSE problems.runtime
    END,
            space = CASE
                        WHEN EXCLUDED.runtime < problems.runtime THEN EXCLUDED.space
                        ELSE problems.space
    END;
  
  `;
  
  try {
    // Execute the query with parameters
    const result = await client.query(query, [queryParams.username, jsonBody.titleSlug, jsonBody.runtime, jsonBody.space]);
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