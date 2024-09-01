import Cliente from '../models/clientes.js'
import mongoose from 'mongoose'

const mostrarClientes = async (req, res) => {
    try {
      const Clientes = await Cliente.find();
      if(!Clientes || Clientes.length === 0){
        res.status(200).json({message : "No existen registros de Clientes"})
      }else{
        res.status(200).json(Clientes);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los Clientes' });
      console.log(error);
    }
}

const buscarCliente = async (req, res) => {
    const ClienteID = req.params.id
    try {
      const Clientes = await Cliente.findById(ClienteID);
      if (!Clientes) {
        res.status(404).json({ message: 'No existe ese Cliente' });
      } else {
        res.status(200).json(Clientes);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los Clientes' });
      console.log(error);
    }
}

const registrarCliente = async (req, res) => {
    const { nombre, cedula, edad, email, celular, direccion, ciudad } = req.body;
    try {
        const exisCliente = await Cliente.findOne({cedula})
        const exisCorreo = await Cliente.findOne({email})
        if (exisCliente || exisCorreo){
          if (exisCliente && exisCorreo) return res.status(200).json({message : 'Ya existe un Cliente con ese correo y cedula'})
          else if (exisCorreo) return res.status(200).json({message : 'Ya existe un Cliente con ese correo'})
          else if (exisCliente) return res.status(200).json({message : 'Ya existe un Cliente con esa cedula'})
        }else{
          const nuevoCliente = new Cliente({
              _id: new mongoose.Types.ObjectId(), 
              nombre, 
              cedula, 
              edad, 
              email, 
              celular, 
              direccion, 
              ciudad
          });
          await nuevoCliente.save();
          res.status(200).json({ message: 'Cliente registrado' , Cliente : nuevoCliente});
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al registrar el Cliente' });
        console.log(err);
    }
}

const actualizarCliente = async (req, res) => {
    const ClienteID = req.params.id; 
    try {
        const ClienteActualizado = await Cliente.findByIdAndUpdate(ClienteID, req.body, { new: true });
        if (!ClienteActualizado) {
            return res.status(404).json({ error: 'No se encontró el Cliente para actualizar' });
        }
        res.status(200).json({ message: 'Cliente actualizado', Cliente: ClienteActualizado });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el Cliente' });
        console.log(error);
    }
}

const borrarCliente = async (req, res) => {
    const ClienteID = req.params.id;
    try {
      const ClienteEliminado = await Cliente.findByIdAndDelete(ClienteID);
      if (!ClienteEliminado) {
        return res.status(404).json({ error: 'No se encontró el Cliente para eliminar' });
      }
      res.status(200).json({ message: 'Cliente eliminado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el Cliente' });
      console.log(error);
    }
}

export {
    mostrarClientes,
    buscarCliente,
    registrarCliente,
    actualizarCliente,
    borrarCliente
}