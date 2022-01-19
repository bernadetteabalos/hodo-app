DROP TABLE IF EXISTS boards CASCADE;

CREATE TABLE boards(
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
<<<<<<< HEAD
    owner_id INTEGER REFERENCES users(id) NOT NULL,
    metadata JSON
);
=======
    content TEXT
);
>>>>>>> ba0132e49ba54903613b814ef3161400c9293667
