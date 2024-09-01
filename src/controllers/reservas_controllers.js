import Reserva from "../models/reservas.js";
import Cliente from '../models/clientes.js'
import Vehiculo from '../models/vehiculos.js';
import mongoose from "mongoose";

const mostrarReservas = async (req, res) => {
    try {
      const Reservas = await Reserva.find();
      if (!Reservas || Reservas.length === 0) {
        return res.json({ message: 'No existen registros de Reservas' });
      }
      res.status(200).json(Reservas);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las Reservas" });
      console.log(error);
    }
}

const buscarReserva = async (req, res) => {
    const ReservaId = req.params.id;
    try {
      const Reserva = await Reserva.findById(ReservaId);
      if (!Reserva) {
        return res.status(404).json({ error: "No se encontró la Reserva" });
      }else{
        res.status(200).json(Reserva);
      }
    } catch (error) {
      res.status(500).json({ error: "Error al obtener la Reserva" });
      console.log(error);
    }
}

const registrarReserva = async (req, res) => {
    const { codigo, cedula, marca, modelo } = req.body;
    let { nombre,celular } = req.body
    try {
    const buscarCliente = await Cliente.find({ cedula });
    const buscarMarca = await Vehiculo.find({ marca });
    let ClienteEncontrado = null;
    let MarcaEncontrada = null;
    let ModeloEncontrado = null;
    for (let i = 0 ; i < buscarCliente.length ; i++){
      if(cedula == buscarCliente[i].cedula){
        ClienteEncontrado = buscarCliente[i].cedula
        nombre = buscarCliente[i].nombre
        celular = buscarCliente[i].celular
        break
      }
    }
    for (let i = 0 ; i < buscarMarca.length ; i++){
      if(marca == buscarMarca[i].nombreVehiculo && modelo == buscarMarca[i].modelo){
        MarcaEncontrada = buscarMarca[i].marca
        ModeloEncontrado = buscarMarca[i].modelo
        break
      }
    }
    if(ClienteEncontrado == null && MarcaEncontrada == null && ModeloEncontrado == null) return res.status(404).json({ message : 'No existe la Vehiculo y tampoco el Cliente'})
    else if(ClienteEncontrado==null) return res.status(404).json({ message : 'No existe ese Cliente'})
    else if(MarcaEncontrada==null) return res.status(404).json({ message : 'No existe esa Marca'})
    else if(ModeloEncontrado==null) return res.status(404).json({ message : 'No existe ese Modelo'})
    else {
      const exisMarca = await Reserva.findOne({ marca, modelo })
      const exisCliente = await Reserva.findOne({ cedula })
      const exisCodigo = await Reserva.findOne({ codigo })
      if(exisCliente && exisMarca && exisCodigo) return res.status(200).json({ message : 'El Cliente ya ha reservado ese Vehiculo'})
      const nuevaReserva = await Reserva.create({
        _id: new mongoose.Types.ObjectId(),
        codigo,
        cedula,
        marca,
        modelo,
        nombre,
        celular
      });
      res.status(201).json({ message: "Reserva creada", Reserva : nuevaReserva });
    }
    } catch (error) {
      res.status(500).json({ error: "Error al crear la Reserva" });
      console.log(error);
    }
}

const actualizarReserva = async (req, res) => {
  const ReservaId = req.params.id;
  const { codigo, cedula, marca, modelo } = req.body;
    let { nombre,celular } = req.body
    try {
    const buscarCliente = await Cliente.find({ cedula });
    const buscarMarca = await Vehiculo.find({ marca });
    let ClienteEncontrado = null;
    let MarcaEncontrada = null;
    let ModeloEncontrado = null;
    for (let i = 0 ; i < buscarCliente.length ; i++){
      if(cedula == buscarCliente[i].cedula){
        ClienteEncontrado = buscarCliente[i].cedula
        nombre = buscarCliente[i].nombre
        celular = buscarCliente[i].celular
        break
      }
    }
    for (let i = 0 ; i < buscarMarca.length ; i++){
      if(marca == buscarMarca[i].nombreVehiculo && modelo == buscarMarca[i].modelo){
        MarcaEncontrada = buscarMarca[i].marca
        ModeloEncontrado = buscarMarca[i].modelo
        break
      }
    }
    if (MarcaEncontrada == null && ClienteEncontrado == null && ModeloEncontrado == null) {
      return res.status(404).json({ message: 'No se puede actualizar porque no existe ese Cliente y tampoco el Vehiculo' });
    } else if (ClienteEncontrado == null) {
      return res.status(404).json({ message: 'No se puede actualizar porque no existe ese Cliente' });
    } else if (MarcaEncontrada == null) {
      return res.status(404).json({ message: 'No se puede actualizar porque no existe esa Marca' });
    } else if (ModeloEncontrado == null){
      return res.status(404).json({ message: 'No se puede actualizar porque no existe ese Modelo' });
    } else {
      const ReservaActualizada = await Reserva.findByIdAndUpdate(
        ReservaId,
        {
          codigo,
          cedula,
          marca,
          modelo,
          nombre,
          celular
        },
        {
          new: true
        });
      if (!ReservaActualizada) return res.status(404).json({ error: "No se encontró la reserva para actualizar" });
      res.status(200).json({ message: "Reserva actualizada", Reserva: ReservaActualizada });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la reserva" });
    console.log(error);
  }
};

const borrarReserva = async (req, res) => {
    const ReservaId = req.params.id;
    try {
      const ReservaEliminada = await Reserva.findByIdAndDelete(ReservaId);
      if (!ReservaEliminada) {
        return res.status(404).json({ error: "No se encontró la Reserva para eliminar" });
      }
      res.status(200).json({ message: "Reserva eliminada" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la Reserva" });
      console.log(error);
    }
}

export {
    mostrarReservas,
    buscarReserva,
    registrarReserva,
    actualizarReserva,
    borrarReserva
}