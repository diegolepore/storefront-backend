CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR NOT NULL,
  image_url VARCHAR NOT NULL,
  price integer NOT NULL,
  category VARCHAR(255) NOT NULL
);