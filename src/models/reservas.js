import mongoose from "mongoose";

const reservaSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    codigo : { type : String, require : true, unique : true, trim : true},
    nombre : {
        type : mongoose.Schema.Types.String,
        ref : 'Cliente',
        require : true
    },
    cedula : {
        type : mongoose.Schema.Types.Number,
        ref : 'Cliente',
        require : true
    },
    celular : {
        type : mongoose.Schema.Types.Number,
        ref : 'Cliente',
        require : true
    },
    marca : {
        type : mongoose.Schema.Types.String,
        ref : 'Vehiculo',
        require : true
    },
    modelo : {
        type : mongoose.Schema.Types.String,
        ref : 'Vehiculo',
        require : true
    }
})

export default mongoose.model('Reserva', reservaSchema)