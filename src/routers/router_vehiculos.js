import express  from "express";
import { 
  actualizarVehiculo,
  borrarVehiculo,
  buscarVehiculo,
  mostrarVehiculos,
  registrarVehiculo
} from "../controllers/vehiculos_controllers.js";

import { verificadoAutentication } from "../controllers/login_controllers.js"

const routerVehiculo = express.Router()

routerVehiculo.use(express.json())


  routerVehiculo.get('/listar', verificadoAutentication,  mostrarVehiculos);
  
  routerVehiculo.get('/obtener/:id', verificadoAutentication,  buscarVehiculo);
  
  routerVehiculo.post('/register', verificadoAutentication,  registrarVehiculo);
  
  
  routerVehiculo.put('/actualizar/:id', verificadoAutentication,  actualizarVehiculo);
  
  routerVehiculo.delete('/eliminar/:id', verificadoAutentication,  borrarVehiculo);
  
  routerVehiculo.use((req, res) => res.status(404).end())

export default routerVehiculo