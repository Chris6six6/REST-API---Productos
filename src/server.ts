import express from 'express';
import colors from 'colors';
import swaggrUI from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import router from './router';
import db from './config/db';


// Conexion a la BD
export async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        //console.log( colors.blue('Conexion exitosa a la BD'));
    } catch (error) {
        console.log( colors.red.bold('Hubo un error al conectar a la base de datos'));
    }
}
connectDB();

// Instancia de express
const server = express();

// Leer datos de formulario
server.use(express.json());

// Routing
server.use('/api/productos', router);

// Docs
server.use('/docs', swaggrUI.serve, swaggrUI.setup(swaggerSpec));

export default server;