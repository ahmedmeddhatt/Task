# Udacity: Build a Storefront Backend

## Contents:

1-Description.

2-Project build depended on.

3-Database diagram

4-Project Structure.

5-How To Use.

6-Functionality and Endpoints.

7-Development.

## Description

This is a backend API build in Nodejs for an online store. It exposes a RESTful API that will be used by the frontend developer on the frontend.

The database schema and and API route information can be found in the [REQUIREMENT.md](REQUIREMENTS.md)

## Database diagram

![Database Diagram](https://user-images.githubusercontent.com/83477647/165020178-20807a29-de77-4275-bff4-880a3590d6bc.png)


## Project build depended on

- The language used and application logic

1. [TypeScript] (https://www.typescriptlang.org/docs/)
2. [Node.JS] (https://nodejs.org/dist/latest-v16.x/docs/api/)
3. [Express] (https://expressjs.com/)

- For managing environment variables

1. [dotenv] (https://www.npmjs.com/package/dotenv)

- For the database and migration

1. [pg] (https://node-postgres.com/)
2. [db-migrate] (https://db-migrate.readthedocs.io/en/latest/)
3. [db-migrate-pg] (https://www.npmjs.com/package/db-migrate-pg)

- For authentication and security

1. [jsonwebtoken] (https://www.npmjs.com/package/jsonwebtoken)
2. [bcrypt] (https://www.npmjs.com/package/bcrypt)
3. [morgan] (https://www.npmjs.com/package/morgan)
4. [helmet] (https://www.npmjs.com/package/helmet)

- For Fixing and Formatting Code

1. [ESLint] (https://eslint.org/docs/user-guide/getting-started)
2. [Prettier] (https://prettier.io/docs/en/index.html)

- For Unit testing

1. [Jasmine] (https://jasmine.github.io/)
2. [supertest] (https://www.npmjs.com/package/supertest)

## Project Structure

```
migrations
    sqls
        20220326180310-users-down.sql
        20220326180310-usersup.sql
        20220326180329-products-down.sql
        20220326180329-products-up.sql
        20220326180346-orders-down.sql
        20220326180346-orders-up.sql
        20220331093311-order-products-down.sql
        20220331093311-order-products-up.sql
    20220326180310-users.js
    20220326180329-products.js
    20220326180346-orders.js
    20220331093311-order-products.js
node_modules
spec
    support
        jasmine.json
src
    controller
        order_controller.ts
        product_order_controller.ts
        products_controller.ts
        user_controller.ts
    database
        schema
            order-products-table.sql
            orders-table.sql
            products-table.sql
            user-table.sql
        database.ts
    helpers
        reporter.ts
    middleware
        auth_middleware.ts
        error_middleware.ts
    model
        order_model.ts
        product_order_model.ts
        product_model.ts
        user_model.ts
    routes
        api
            product_order_routes.ts
            orders_routes.ts
            product_routes.ts
            user_routes.ts
        main.routes.ts
    tests
        index.spec.ts
    types
        order_type.ts
        product_type.ts
        product_Orders_type.ts
        user.type.ts
    index.ts
.gitignore
.eslintrc.js
.prettierignore
.prettierrrc
database.json
package-lock.json
pachage.json
README.md
REQUIREMENTS.md
tsconfig.json

```

## How To Use:

### Create Databases

We shall create the dev and test database.

- connect to the default postgres database as the server's root user `psql -U postgres`
- In psql run the following to create a user
  - `CREATE USER store_user WITH PASSWORD 'password123';`
- In psql run the following to create the dev and test database
  - `CREATE DATABASE store;`
  - `CREATE DATABASE store_test;`
- Connect to the databases and grant all privileges
  - Grant for dev database
    - `\c store`
    - `GRANT ALL PRIVILEGES ON DATABASE store TO store_user;`
  - Grant for test database
    - `\c store_test`
    - `GRANT ALL PRIVILEGES ON DATABASE store_test TO store_user;`

### Migrate Database

Navigate to the root directory and run the command below to migrate the database

`npm run migrateUp`

### Enviromental Variables Set up

Bellow are the environmental variables that needs to be set in a `.env` file. This is the default setting that I used for development, but you can change it to what works for you.

**NB:** The given values are used in developement and testing but not in production.

```
PORT = 3000
ENV = dev

# database connection informations
POSTGRES_HOST = localhost
POSTGRES_PORT = 5432
POSTGRES_DB = store_database
POSTGRES_DB_TEST = store_test
POSTGRES_USER = postgres
POSTGRES_PASSWORD = Ahmed medhat0

# hashing enviroments
BCRYPT_PASSWORD=my-long-password
SALT=10

# token
TOKEN_SECRET=my-long-secret-token


```

### NPM Scripts

to build the project and use it do the following orders in terminal:

- To install required packages: `npm install`

- To create the tables of database by migrate: `db-migrate up` or `npm run migration:run`

- to run test: `npm run test`

- to start project development: `npm run dev`

- to run and start the project: `npm run start`

- to run Prettier: `npm run format`

- to run ESLint: `npm run lint`

- to run ESLint fix: `npm run lint:fix`

## Functionality and Endpoints

- Homepage Endpoint
  `http://localhost:3000/`
  
- User CRUD API EndPoints
- 
  Post - create user
  `/api/users`
  
  Get - get all users
  `/api/users`
  
  Get - get specified user
  `/api/users/:id`
  
  Put - update specified user
  `/api/users/:id`
  
  Delete - delete specified user
  `/api/users/:id`

  
- Product CRUD API End Points
- 
  Post - create product
  `/api/products`
  
  Get - get all products
  `/api/products`
  
  Get - get specified product
  `/api/products/:id`
  
  Put - update specified product
  `/api/products/:id`
  
  Delete - delete specified product
  `/api/products/:id`
  
  
- Orders CRUD API End Points
- 
  Post - create order
  `/api/orders/:user_id`
  
  Get - get all orders
  `/api/orders/`
  
  Get - get active orders for specified user
  `/api/orders/active/:user_id`
  
  Get - get complete orders for specified user
  `/api/orders/complete/:user_id`
  
  Put - update specified order
  `/api/orders/:user_id`
  
  Delete - delete specified order
  `/api/orders/:user_id`

- Product Orders CRUD API End Points
- 
  Post - create order
  `/api/productOrder/:user_id/:order_id`
  
  Get - get all orders
  `/api/productOrder/:user_id/:order_id`
  
  Put - update specified order
  `/api/productOrder/:user_id/:order_id`
  
  Delete - delete specified order
  `/api/productOrder/:user_id/:order_id`
  
## Development:

- Ahmed Medhat
