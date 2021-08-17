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

## Data Shapes
#### Product
- id SERIAL PRIMARY KEY,
- name VARCHAR(255) NOT NULL,
- description VARCHAR NOT NULL,
- price integer NOT NULL,
- category VARCHAR(255) NOT NULL

#### User
- id SERIAL PRIMARY KEY,
- first_name VARCHAR(100),
- last_name VARCHAR(100),
- email VARCHAR(100),
- pass VARCHAR

#### Orders
- id SERIAL PRIMARY KEY,
- products JSONB,
- order_status varchar(20),
- user_id bigint REFERENCES users(id)
