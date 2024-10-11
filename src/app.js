import express from 'express';
import handlebars from 'express-handlebars';
import usersRouter from './routes/users.router.js';
import config from './config.js';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js'
import { productsManager } from './filesystem/productsManager.js';
import { cartsManager } from './filesystem/cartsManager.js';
import { Server } from 'socket.io';

const app = express();
const midd1 = (req, res, next) => {
    console.log('Solicitud general recibida');
    next();
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const managerP= new productsManager ('./product_manager.json');
await managerP.init();
const managerC= new cartsManager ('./cart_manager.json');
await managerC.init();


app.use (midd1); //habilitado en forma global ante cualquier solicitud

app.engine('handlebars', handlebars.engine()); // motor de plantilla HANDLEBARS
app.set ('views', `${config.DIRNAME}/views`);
app.set ('view engine','handlebars');

app.use('/views',viewsRouter); //servicio de plantillas para vistas
app.use('/api/users', usersRouter); //paquete de rutas USUARIOS
app.use('/api/products',productsRouter); //paquete rutas PRODUCTOS
app.use('/api/carts',cartsRouter); // paquete de rutas CARRITO

app.use('/static', express.static(`${config.DIRNAME}/public`)); //paquete de rutas ESTATICAS


const httpServer = app.listen(config.PORT, () => {
    console.log(`Server activo en puerto ${config.PORT}`);
});

const socketServer = new Server(httpServer);
app.set('socketServer', socketServer);

socketServer.on('connection', socket => {
    console.log(`Nuevo cliente conectado con id ${socket.id}`);

    socket.on('init_message', data => {
        console.log(data);
    });

    socket.emit('welcome', `Bienvenido cliente, estás conectado con el id ${socket.id}`);

});