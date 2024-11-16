CREATE DATABASE leetcode_plugin;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,       -- A unique identifier for each user (auto-incremented)
    username VARCHAR(50) UNIQUE NOT NULL,  -- Username column with a unique constraint and not null
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Timestamp for when the user is created
);
CREATE TABLE problems (
    usr_id INTEGER REFERENCES users(id),   -- Foreign key linking to users table's id
    problem_number INTEGER NOT NULL,        -- Problem number (e.g., problem ID)
    runtime INTEGER,                        -- Time taken to solve the problem (in seconds or milliseconds)
    space FLOAT,                            -- Memory used to solve the problem (in floating point)
    PRIMARY KEY (usr_id, problem_number)    -- Composite primary key (usr_id, problem_number)
);
CREATE TABLE challenge_problem (
    challenge INTEGER PRIMARY KEY,            -- Challenge number as the primary key (unique)
    problem_number INTEGER NOT NULL           -- The problem number associated with the challenge
);
CREATE TABLE usr_challenge (
    usr_id INTEGER,                          -- User ID, references the id column in the users table
    challenge INTEGER,                       -- Challenge number (now a foreign key)
    PRIMARY KEY (usr_id, challenge),         -- Composite primary key (user + challenge)
    FOREIGN KEY (usr_id) REFERENCES users(id), -- Foreign key referencing the users table
    FOREIGN KEY (challenge) REFERENCES challenge_problem(challenge) -- Foreign key referencing challenge_problem
);
