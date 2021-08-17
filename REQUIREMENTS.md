# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index - GET '/products', index
- Show  - GET '/products/:id', show
- Create [token required] - POST '/products'
- Delete (args: product id)[token required] - DELETE '/products/:id'

#### Users
- Create - POST '/users'
- Auth - POST '/users/auth'
- Index [token required] - GET '/users'
- Show (args: user id)[token required] - GET '/users/:id'
- Delete (args: user id)[token required] - DELETE '/users/:id'

#### Orders
- Create [token required] - POST '/orders'
- Index [token required] - GET '/orders'
- Show (args: user id)[token required] - GET '/orders/:id'
- Delete (args: user id)[token required] - DELETE '/orders/:id'
- EditStatus (args: user id)[token required] - PUT '/orders/:id'
- Current Order by user [token required] - GET '/active-order'
- Get products in orders [token required] - GET '/products-in-orders'

#### Order Products
- Create (args: order id)[token required] - POST '/orders/:id/products'

## Data Shapes
### Databases names
- storefront_db
- storefront_test_db

#### products
- id SERIAL PRIMARY KEY,
- name VARCHAR(255) NOT NULL,
- description VARCHAR NOT NULL,
- price integer NOT NULL,
- category VARCHAR(255) NOT NULL

#### users
- id SERIAL PRIMARY KEY,
- first_name VARCHAR(100),
- last_name VARCHAR(100),
- email VARCHAR(100),
- pass VARCHAR

#### orders
- id SERIAL PRIMARY KEY,
- order_status VARCHAR(64),
- user_id bigint REFERENCES users(id)

#### order_products
- id SERIAL PRIMARY KEY,
- quantity integer,
- order_id bigint REFERENCES orders(id),
- product_id bigint REFERENCES products(id)

## Database Schema

### products
| Column      | Type                   | Collation | Nullable | Default                              |
|-------------|------------------------|-----------|----------|--------------------------------------|
| id          | integer                |           | not null | nextval('products_id_seq'::regclass) |
| name        | character varying(255) |           | not null |                                      |
| description | character varying      |           | not null |                                      |
| price       | integer                |           | not null |                                      |
| category    | character varying(255) |           | not null |                                      |

**Indexes:** "products_pkey" PRIMARY KEY, btree (id)
**Referenced by:**
    TABLE "order_products" CONSTRAINT "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)

### users
| Column     | Type                   | Collation | Nullable | Default                           |
|------------|------------------------|-----------|----------|-----------------------------------|
| id         | integer                |           | not null | nextval('users_id_seq'::regclass) |
| first_name | character varying(100) |           |          |                                   |
| last_name  | character varying(100) |           |          |                                   |
| email      | character varying(100) |           |          |                                   |
| pass       | character varying      |           |          |                                   |

**Indexes:** "users_pkey" PRIMARY KEY, btree (id)
**Referenced by:**
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
    
    
### orders
| Column       | Type                  | Collation | Nullable | Default                            |
|--------------|-----------------------|-----------|----------|------------------------------------|
| id           | integer               |           | not null | nextval('orders_id_seq'::regclass) |
| order_status | character varying(64) |           |          |                                    |
| user_id      | bigint                |           |          |                                    |

**Indexes:** "orders_pkey" PRIMARY KEY, btree (id)
**Foreign-key constraints:**
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
**Referenced by:**
    TABLE "order_products" CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
    
### order_products
| Column     | Type    | Collation | Nullable | Default                                    |
|------------|---------|-----------|----------|--------------------------------------------|
| id         | integer |           | not null | nextval('order_products_id_seq'::regclass) |
| quantity   | integer |           |          |                                            |
| order_id   | bigint  |           |          |                                            |
| product_id | bigint  |           |          |                                            |

**Indexes:** "order_products_pkey" PRIMARY KEY, btree (id)
**Foreign-key constraints:**
    "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
    "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)
    
    
    