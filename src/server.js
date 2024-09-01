import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import routerLogin from './routers/router_login.js';
import routerCliente from './routers/router_clientes.js';
import routerVehiculo from './routers/router_vehiculos.js';
import routerReserva from './routers/router_reservas.js';


// Inicializaciones
const app = express()
dotenv.config()

// Configuraciones 
app.set('port',process.env.port || 3000)
app.use(cors())

// Middlewares 
app.use(express.json())

// Rutas 
app.use('/api/login', routerLogin);
app.use('/api/clientes', routerCliente);
app.use('/api/vehiculo', routerVehiculo);
app.use('/api/reserva', routerReserva);

// Manejo de una ruta que no sea encontrada
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))



// Exportar la instancia de express por medio de app
export default  app
