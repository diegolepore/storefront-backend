# Storefront backend

### Dependencies used 
Along with the corresponding type definitions, even though these are not included in the list below.

| Name | Link |
| ------ | ------ |
| Node | https://nodejs.org/ |
| Express | https://expressjs.com/ |
| TypeScript | https://www.typescriptlang.org/ |
| bcrypt  | https://github.com/kelektiv/node.bcrypt.js |
| db-migrate | https://db-migrate.readthedocs.io/en/latest/ |
| db-migrate-pg | https://github.com/db-migrate/pg |
| dotenv | https://github.com/motdotla/dotenv |
| supertest | https://github.com/visionmedia/supertest#readme |
| ESLint | https://eslint.org/ |
| Husky | https://typicode.github.io/husky/#/ |
| jasmine | https://jasmine.github.io/ |
| jasmine-spec-reporter | https://github.com/bcaudan/jasmine-spec-reporter |
| jasmine-ts | https://github.com/svi3c/jasmine-ts#readme |
| jsonwebtoken | https://github.com/auth0/node-jsonwebtoken#readme |
| pg | https://www.npmjs.com/package/pg |
| supertest | https://www.npmjs.com/package/supertest |
| tsc-watch | https://www.npmjs.com/package/tsc-watch |
| ts-node | https://www.npmjs.com/package/ts-node |


### .env file I am using for the project
```sh
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront_db
POSTGRES_TEST_DB=storefront_test_db
POSTGRES_USER=full_stack_user
POSTGRES_PASSWORD=Pass1234

POSTGRES_PROD_HOST=db
POSTGRES_PROD_DB=storefront_db
POSTGRES_PROD_TEST_DB=storefront_test_db
POSTGRES_PROD_USER=full_stack_user
POSTGRES_PROD_PASSWORD=123456

ENV=dev

APP_PORT=3000
APP_PROD_PORT=3030

BCRYPT_PASSWORD=your-secret-password
SALT_ROUNDS=10

TOKEN_SECRET=supersecret123!
```

### Setup, installation & running server locally  ( http://localhost:3000 )
```sh
npm install

# Create databases locally
npm run createdb:dev

# Migrate tables locally
npm run migrate:dev

# Testing
npm run test:dev

# Linting
npm run lint

# Start server locally on port 3000
npm run watch
```

![gif: Lets do this!](https://media.giphy.com/media/0DYipdNqJ5n4GYATKL/giphy.gif)

# Basic usage

### /users

👤 **Create a user:**

```
POST - http://localhost:3000/users

headers: {
    Content-Type: application/json
}

BODY: 
{
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe@test.com",
    "pass": "Pass1234"
}
```

🔐 **Authenticate user:**

```
POST - http://localhost:3000/users/auth

headers: {
    Content-Type: application/json
}

BODY: 
{
    "email": "johndoe@test.com",
    "pass": "Pass1234"
}
```

👥 **Get users:**
```
GET - http://localhost:3000/users

headers : {
    Authorization: 'Bearer access_token'
}
```

👤 **Get user:**
```
GET - http://localhost:3000/users/:id

headers : {
    Authorization: 'Bearer access_token'
}
```

🗑 **Delete user:**
```
DELETE - http://localhost:3000/users/:id

headers : {
    Authorization: 'Bearer access_token'
}
```

### /products

🛍 **Create a product:**

```
POST - http://localhost:3000/products
headers : {
    Authorization: 'Bearer access_token',
    Content-Type: application/json
}
BODY: 
{
	"name": "Skateboard",
	"description": "ZERO board",
	"price": 80,
	"category": "sports"
}
```

📦📦📦 **Get products:**
```
GET - http://localhost:3000/products
```

📦 **Get product:**
```
GET - http://localhost:3000/products/:id
```

🗑📦 **Delete product:**
```
DELETE - http://localhost:3000/products/:id
headers : {
    Authorization: 'Bearer access_token'
}
```

### /orders

**Create an order:**

```
POST - http://localhost:3000/orders
headers : {
    Authorization: 'Bearer access_token',
    Content-Type: application/json
}
BODY: 
{
    "products": "[
        {'id': '1', 'quantity': '2'}, 
        {'id': '3', 'quantity': '7'}
    ]",
    "order_status": "active",
    "user_id": "1"
}
```

📦📦📦 **Get orders:**
```
GET - http://localhost:3000/orders

headers : {
    Authorization: 'Bearer access_token'
}
```

📦 **Get order:**
```
GET - http://localhost:3000/orders/:id

headers : {
    Authorization: 'Bearer access_token'
}
```

🗑📦 **Delete order:**
```
DELETE - http://localhost:3000/orders/:id

headers : {
    Authorization: 'Bearer access_token'
}
```

✏️ **Edit order status ('active' or 'complete'):**
```
PUT - http://localhost:3000/orders/:id

headers : {
    Authorization: 'Bearer access_token',
    Content-Type: application/json
}

BODY: 
{
    "status": "complete"
}
```

### Other

**Get users active (or current) order:**
```
GET - http://localhost:3000/active-order

headers : {
    Authorization: 'Bearer access_token'
}
```

### 🐳 Docker setup ( http://localhost:3030 )

```sh
# After running this command the application will be running at port 3030
docker-compose up -d

# Create databases in Docker
docker exec storefront-backend_server_1 npm run createdb:prod

# Migrate tables
docker exec storefront-backend_server_1 npm run migrate:prod

# Testing
docker exec storefront-backend_server_1 npm run test:prod

# Linting
docker exec storefront-backend_server_1 npm run lint
```

### Building & starting locally

```sh
npm run build
npm start
```

### Other
In order to have automatically have Git hooks enabled after install, run the following commnad. You can read more about it in the [Husky documentation](https://typicode.github.io/husky/#/?id=install).
```sh
npm run prepare
```
