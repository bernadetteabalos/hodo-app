DROP TABLE IF EXISTS collaborators CASCADE;

CREATE TABLE collaborators(
id SERIAL PRIMARY KEY NOT NULL,
user_id INTEGER REFERENCES users(id),
board_id INTEGER REFERENCES boards(id)
);