const { model, Schema } = require('mongoose');

const NivelSchema = Schema({

    nivel: {
        type: String,
        required: [true, 'El nivel es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true, 
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    }

});


NivelSchema.methods.toJSON = function () {
    const { __v, estado,_id, ...nivel } = this.toObject();
    nivel.uid = _id;
    return nivel ;
}

module.exports = model('Nivel', NivelSchema);