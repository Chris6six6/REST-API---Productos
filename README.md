# API REST with Node.js, TypeScript, Swagger, Jest, and Supertest

This project is a RESTful API for managing products, built with Node.js and TypeScript. It's documented using Swagger and tested with Jest and Supertest.

## API Documentation

The API is documented using Swagger. Once the server is running, you can access the Swagger UI.

### Available Endpoints

- `GET /api/productos`: Get all products
- `GET /api/productos/:id`: Get a product by ID
- `POST /api/productos`: Create a new product
- `PUT /api/productos/:id`: Update a product
- `PATCH /api/productos/:id`: Update product availability
- `DELETE /api/productos/:id`: Delete a product

For detailed information about request/response formats and examples, please refer to the Swagger documentation.

## How It Works

This API manages a collection of products. Each product has the following properties:

- `id`: A unique identifier (integer)
- `name`: The name of the product (string)
- `price`: The price of the product (number)
- `availability`: Whether the product is available or not (boolean)

The API uses Express.js for routing and middleware. Here's a brief overview of each endpoint:

1. `GET /api/productos`: Retrieves all products from the database.
2. `GET /api/productos/:id`: Retrieves a single product by its ID.
3. `POST /api/productos`: Creates a new product. The request body should include `name` and `price`.
4. `PUT /api/productos/:id`: Updates an existing product. The request body can include `name`, `price`, and `availability`.
5. `PATCH /api/productos/:id`: Updates only the availability of a product.
6. `DELETE /api/productos/:id`: Deletes a product by its ID.

The API uses middleware for input validation and error handling. The `express-validator` library is used to validate incoming requests.

## Testing

This project uses Jest and Supertest for testing. To run the tests:

```
npm test
```

The tests cover various scenarios for each endpoint:

1. GET /api/productos
   - Checks if the endpoint exists
   - Verifies that it returns a JSON response with an array of products

2. GET /api/productos/:id
   - Tests for a non-existent product (should return 404)
   - Checks for invalid ID in the URL (should return 400)
   - Verifies successful retrieval of an existing product

3. POST /api/productos
   - Tests creation with invalid data (should return 400 with error messages)
   - Verifies that price must be greater than 0
   - Checks that price must be a number
   - Tests successful creation of a new product

4. PUT /api/productos/:id
   - Checks for invalid ID in the URL
   - Tests updating with invalid data (should return 400 with error messages)
   - Verifies that price must be greater than 0
   - Tests updating a non-existent product (should return 404)
   - Verifies successful update of an existing product

5. PATCH /api/productos/:id
   - Tests patching a non-existent product (should return 404)
   - Verifies successful update of product availability

6. DELETE /api/productos/:id
   - Checks for invalid ID in the URL
   - Tests deleting a non-existent product (should return 404)
   - Verifies successful deletion of an existing product

These tests ensure that the API behaves correctly under various conditions, including both valid and invalid inputs.

## Project Structure

```
.
├── src/
│   ├── handlers/
│   │   └── products.ts
│   ├── middleware/
│   │   └── index.ts
│   ├── routes/
│   │   └── products.ts
│   ├── server.ts
│   └── index.ts
├── tests/
│   └── products.test.ts
├── package.json
├── tsconfig.json
└── README.md
```

- `src/handlers/`: Contains the logic for handling requests
- `src/middleware/`: Custom middleware functions
- `src/routes/`: API route definitions
- `src/server.ts`: Express server setup
- `src/index.ts`: Application entry point
- `tests/`: Test files for the API