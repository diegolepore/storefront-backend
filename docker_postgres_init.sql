CREATE DATABASE storefront_db;
CREATE DATABASE storefront_test_db;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(100),
  pass VARCHAR
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR NOT NULL,
  image_url VARCHAR NOT NULL,
  price integer NOT NULL,
  category VARCHAR(255) NOT NULL
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_status VARCHAR(64),
  user_id bigint REFERENCES users(id)
);

CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  quantity integer,
  order_id bigint REFERENCES orders(id),
  product_id bigint REFERENCES products(id)
);