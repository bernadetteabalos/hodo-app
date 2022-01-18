DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_photo VARCHAR(255) DEFAULT 'https://media.istockphoto.com/photos/woman-walking-on-a-path-by-the-sea-holding-a-friends-hand-picture-id1288078486?b=1&k=20&m=1288078486&s=170667a&w=0&h=_Hh6hjBsu4hxPhphKow6kk8YHaqtqYFCRRsadwnvRRY='
);