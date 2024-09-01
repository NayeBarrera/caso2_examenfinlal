import Vehiculo from '../models/vehiculos.js';
import mongoose from 'mongoose';

const mostrarVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find();
    if (!vehiculos || vehiculos.length === 0) {
      res.status(200).json({ message: 'No existen registros de vehículos' });
    } else {
      res.status(200).json(vehiculos);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los vehículos' });
    console.log(error);
  }
};

const buscarVehiculo = async (req, res) => {
  const vehiculoID = req.params.id;
  try {
    const vehiculos = await Vehiculo.findById(vehiculoID);
    if (!vehiculo) {
      res.status(404).json({ message: 'No existe ese vehículo' });
    } else {
      res.status(200).json(vehiculos);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los vehículos' });
    console.log(error);
  }
};

const registrarVehiculo = async (req, res) => {
  const { marca, modelo, color, año, tipo, transmision, kilometraje, capacidadPasajeros } = req.body;
  try {
    const exisModelo = await Vehiculo.findOne({ modelo });
    const exisMarca = await Vehiculo.findOne({ marca });
    if (exisModelo && exisMarca) {
      return res.status(200).json({ message: 'Ya existe un vehículo con ese modelo y marca' });
    } else {
      const nuevoVehiculo = new Vehiculo({
        _id: new mongoose.Types.ObjectId(),
        marca,
        modelo,
        color,
        año,
        tipo,
        transmision,
        kilometraje,
        capacidadPasajeros,
      });
      await nuevoVehiculo.save();
      res.status(200).json({ message: 'Vehículo registrado', vehiculo: nuevoVehiculo });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar el vehículo' });
    console.log(err);
  }
};

const actualizarVehiculo = async (req, res) => {
  const vehiculoID = req.params.id;
  try {
    const vehiculoActualizado = await Vehiculo.findByIdAndUpdate(vehiculoID, req.body, { new: true });
    if (!vehiculoActualizado) {
      return res.status(404).json({ error: 'No se encontró el vehículo para actualizar' });
    }
    res.status(200).json({ message: 'Vehículo actualizado', vehiculo: vehiculoActualizado });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el vehículo' });
    console.log(error);
  }
};

const borrarVehiculo = async (req, res) => {
  const vehiculoID = req.params.id;
  try {
    const vehiculoEliminado = await Vehiculo.findByIdAndDelete(vehiculoID);
    if (!vehiculoEliminado) {
      return res.status(404).json({ error: 'No se encontró el vehículo para eliminar' });
    }
    res.status(200).json({ message: 'Vehículo eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el vehículo' });
    console.log(error);
  }
};

export {
  mostrarVehiculos,
  buscarVehiculo,
  registrarVehiculo,
  actualizarVehiculo,
  borrarVehiculo
};