const { Schema, model } = require('mongoose');

//* Modelo de Evento en MongoDB
const EventoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

// Modifico el esquema para que tenga esta estructura al retornar la data
// {
//     "id": "6738f570a965306055697e61",
//     "title": "Nuevo evento",
//     "notes": "Comprar pastel",
//     "start": "1970-01-01T00:00:00.001Z",
//     "end": "1970-01-01T00:16:40.000Z",
//     "user": "67363ce2a0edeb507c425c3e"
// }
EventoSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id  = _id
    return object;
});

module.exports = model('Evento', EventoSchema);