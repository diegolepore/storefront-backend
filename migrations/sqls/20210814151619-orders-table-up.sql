CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  products JSONB,
  order_status varchar(20),
  user_id bigint REFERENCES users(id)
);