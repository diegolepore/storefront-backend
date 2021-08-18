CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_status VARCHAR(64),
  user_id bigint REFERENCES users(id)
);