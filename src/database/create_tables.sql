CREATE DATABASE leetcode_plugin;
CREATE TABLE users (
    usr_id SERIAL PRIMARY KEY,       -- A unique identifier for each user (auto-incremented)
    username VARCHAR(50) UNIQUE NOT NULL,  -- Username column with a unique constraint and not null
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Timestamp for when the user is created
);
CREATE TABLE problems (
    usr_id INTEGER REFERENCES users(usr_id),   -- Foreign key linking to users table's id
    title_slug VARCHAR(50) NOT NULL,        -- Problem number (e.g., problem ID)
    runtime INTEGER,                        -- Time taken to solve the problem (in seconds or milliseconds)
    space FLOAT,                            -- Memory used to solve the problem (in floating point)
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp for when the problem was completed
    PRIMARY KEY (usr_id, title_slug)    -- Composite primary key (usr_id, title_slug)
);
CREATE TABLE challenge_problem (
    challenge_id SERIAL PRIMARY KEY,            -- Challenge number as the primary key (unique)
    title_slug VARCHAR(50) NOT NULL,           -- The problem number associated with the challenge
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp for when the challnege was created
    expiration TIMESTAMP                            -- Timestamp for when the challnege is expired
);
CREATE TABLE usr_challenge (
   usr_id INTEGER,                          -- User ID, references the id column in the users table
   challenge_id INTEGER,                    -- Challenge number (now a foreign key)
   PRIMARY KEY (usr_id, challenge_id),      -- Composite primary key (user + challenge)
   FOREIGN KEY (usr_id) REFERENCES users(usr_id),  -- Foreign key referencing the users table
   FOREIGN KEY (challenge_id) REFERENCES challenge_problem(challenge_id) -- Foreign key referencing challenge_problem
);

CREATE TABLE friends (
    usr_id INTEGER REFERENCES users(usr_id),         --user that will have a friend
    friend_id INTEGER REFERENCES users(usr_id),     --the friend of the user above
    PRIMARY KEY (usr_id, friend_id)                 --primary key
);
