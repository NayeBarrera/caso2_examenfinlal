import mongoose from "mongoose";

const vehiculoSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  marca: { type: String, required: true, trim: true },
  modelo: { type: String, required: true, trim: true },
  color: { type: String, required: true, trim: true },
  año: { type: Number, required: true },
  tipo: { type: String, required: true, trim: true },
  transmision: { type: String, required: true, trim: true },
  kilometraje: { type: Number, required: true },
  capacidadPasajeros: { type: Number, required: true },
});

export default mongoose.model('Vehiculo', vehiculoSchema);