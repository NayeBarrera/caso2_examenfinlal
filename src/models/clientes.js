import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre: { type: String, require: true, trim : true  },
  cedula: { type: Number, require: true, unique: true, trim : true  },
  edad: { type: Number, require: true, trim : true  },
  celular: { type: Number, require: true, trim : true  },
  email: { type: String, require: true, unique: true, trim : true  },
  direccion: { type : String, require : true, trim : true  },
  ciudad : { type : String, require : true, trim : true }
});

export default mongoose.model('Cliente', clienteSchema);