import request from 'supertest';
import server from '../../server';

describe('POST /api/productos', () => {
    it('Shloud create a new product', async() => {
        const res = await request(server).post('/api/productos').send({});
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveLength(4);
    });
    
    it('Shloud validate price is greater than 0', async() => {
        const res = await request(server).post('/api/productos').send({
            name: "Producto - Test",
            price: 0
        });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveLength(1);

        expect(res.status).not.toBe(404);
        expect(res.body.errors).not.toHaveLength(2);
    });
    
    it('Shloud validate price is a number and greater than 0', async() => {
        const res = await request(server).post('/api/productos').send({
            name: "Producto - Test",
            price: "Hola"
        });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveLength(2);

        expect(res.status).not.toBe(404);
        expect(res.body.errors).not.toHaveLength(4);
    });
    
    it('Shloud create a new product', async() => {
    const res = await request(server).post('/api/productos').send({
        name: "Producto - Testing",
        price: 50
    });
    
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('data');

    expect(res.status).not.toBe(404);
    expect(res.body).not.toHaveProperty('errors');
    });
    
});

describe('GET /api/productos', () => {
    it('Should check if api/products url exist', async() => {
        const res = await request(server).get('/api/productos');
        expect(res.status).not.toBe(404);
    });

    it('GET a json with products', async() => {
        const res = await request(server).get('/api/productos');
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveLength(1);

        expect(res.body).not.toHaveProperty('errors');
    });
    
});

describe('GET /api/products/:id', () => {
    test('Should return a 404 response for a non-existent product', async () => {
        const productId = 2000;
        const response = await request(server).get(`/api/productos/${productId}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Producto no encontrado');
    });

    test('Should check a valid ID in the URL', async () => {
        const response = await request(server).get('/api/productos/not-valid-url');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('ID no valido');
    });
    
    test('Get a json response for a single product', async () => {
        const response = await request(server).get('/api/productos/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
    });
});

describe('PUT /api/products/:id', () => {

    test('Should check a valid ID in the URL', async () => {
        const response = await request(server).put('/api/productos/not-valid-url').send(
            {
                "name": "Producto - Test",
                "price": 300,
                "availability": false
            }
        );
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('ID no valido');
    });

    test('Should display validation error messages when updating a product', async() => {
        const response = await request(server).put('/api/productos/1').send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(5);

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    });
    
    test('Should validate that the price is greather than 0', async() => {
        const response = await request(server).put('/api/productos/1').send(
            {
                "name": "Producto - Test",
                "price": 0,
                "availability": false
            }
        );

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('Precio no valido');

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    });
    
    test('Should return a 404 response for a non-exixtent product', async() => {
        const productId = 2000;
        const response = await request(server).put(`/api/productos/${productId}`).send(
            {
                "name": "Producto - Test",
                "price": 300,
                "availability": false
            }
        );

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Producto no encontrado');

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    });
    
    test('Should update an existing product with valid data', async() => {
        const response = await request(server).put(`/api/productos/1`).send(
            {
                "name": "Producto - Test",
                "price": 300,
                "availability": false
            }
        );

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty('errors');
    });
});

describe('PATCH /api/productos/:id', () => {
    it('Should return 404 response fot a non-existing product', async () => {
        const productId = 2000;
        const response = await request(server).patch(`/api/productos/${productId}`);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Producto no encontrado');
        
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    });

    it('Should update the product availability', async () => {
        const response = await request(server).patch('/api/productos/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        //expect(response.body.data.availability).toBe(false)
        
        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty('error');
    })
});

describe('DELETE /api/products/:id', () => {
    test('Should check a valid ID', async () => {
        const response = await request(server).delete('/api/productos/not-valid');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors[0].msg).toBe('ID no valido');
    });

    test('Should return 404 response for a non-existent product', async() => {
        const productId = 200;
        const response = await request(server).delete(`/api/productos/${productId}`);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Producto no encontrado');
        expect(response.status).not.toBe(200);
    })
    
    test('Should delete existent product', async() => {
        const response = await request(server).delete(`/api/productos/1`);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe('Producto eliminado');
        
        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(400);
    })
});