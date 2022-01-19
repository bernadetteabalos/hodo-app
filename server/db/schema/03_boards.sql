DROP TABLE IF EXISTS boards CASCADE;

CREATE TABLE boards(
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    owner_id INTEGER REFERENCES users(id) NOT NULL,
    metadata JSON
    budget_data JSON
);
