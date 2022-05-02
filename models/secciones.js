const {Schema, model } = require('mongoose');

const SeccionSchema = Schema({
    nombre_seccion: {
        type: String,
        required:[true, 'El nombre es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true, 
        required: true,
    },
    id_categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    }
})

SeccionSchema.methods.toJSON = function () {

    const { __v, _id, ...seccion} = this.toObject();
    seccion.uid = _id;
    return seccion;

}
module.exports = model('Seccion', SeccionSchema);
