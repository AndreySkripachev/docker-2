CREATE TABLE users
(
    id SERIAL,
    email text,
    password text,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

INSERT INTO users(email, password) VALUES
 ('andrey.skripachev@gmail.com', 'password'),
 ('qwe@qwe.qwe', 'qwe123qwe');
