import { Router } from 'express';
import { body, param } from 'express-validator';
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailanility, updateProduct } from './handlers/products';
import { handleInputErrors } from './middleware';

const router = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The product ID
 *                  example: 1
 *              name:
 *                  type: string
 *                  description: The product name
 *                  example: Monitor curvo 27 pulgadas
 *              price:
 *                  type: number
 *                  description: The product price
 *                  example: 250
 *              availability:
 *                  type: boolean
 *                  description: The product availability
 *                  example: true
 */

/**
 * @swagger
 * /api/productos:
 *  get:
 *      sumary: Get a list of products
 *      tags:
 *          - Products
 *      description: Return a list of products
 *      responses:
 *          200:
 *              description: Succesful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 */

// Routing
router.get('/', getProducts);

/**
 * @swagger
 * /api/productos/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not found
 *          400:
 *              description: Bad Request - Invalid ID
 */

router.get('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById);

/**
 * @swagger
 * /api/productos:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 49 Pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *      responses:
 *          201:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - invalid input data
 * 
 */

router.post('/',
    // Validacion
    body('name').notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price').isNumeric().withMessage('Valor no valido')
                            .notEmpty().withMessage('El nombre del producto no puede ir vacio')
                            .custom(value => value > 0).withMessage('Precio no valido'),
    handleInputErrors,        
    createProduct

);

/**
 * @swagger
 * /api/productos/{id}:  
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 49 Pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID or Invalid input data
 *          404:
 *              description: Product Not Found
 */

router.put('/:id',
    // Validacion
    param('id').isInt().withMessage('ID no valido'),
    body('name').notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price').isNumeric().withMessage('Valor no valido')
                            .notEmpty().withMessage('El nombre del producto no puede ir vacio')
                            .custom(value => value > 0).withMessage('Precio no valido'),
    body('availability').isBoolean().withMessage('Valor para disponibilidad no valido'),
    handleInputErrors,
    updateProduct
);

/**
 * @swagger
 * /api/productos/{id}:
 *  patch:
 *      summary: Update Product availability
 *      tags: 
 *          - Products
 *      description: Returns the updated availability
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product Not Found
 */

router.patch('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailanility);

/**
 * @swagger
 * /api/productos/{id}:
 *  delete:
 *      summary: Deletes a product by a given ID
 *      tags: 
 *          - Products
 *      description: Returns a confirmation message
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to delete
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: 'Producto Eliminado'
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product Not Found
 */

router.delete('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct
);

export default router;