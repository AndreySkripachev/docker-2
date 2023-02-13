CREATE TABLE users
(
    id SERIAL,
    email text,
    password text,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

INSERT INTO users(email, password) VALUES
 ('Meadow Crystalfreak ', 'Head of Operations'),
 ('Buddy-Ray Perceptor', 'DevRel'),
 ('Prince Flitterbell', 'Marketing Guru');
