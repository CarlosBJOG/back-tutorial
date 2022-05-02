const { model, Schema } = require('mongoose');

const CategoriaSchema = Schema({

    nombre_categoria: {
        type: String,
        required: [true, 'EL nombre de la categoria es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true, 
        required: true,
    },
    id_nivel: {
        type: Schema.Types.ObjectId,
        ref: 'Nivel',
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    }

});


CategoriaSchema.methods.toJSON = function () {
    const { __v, estado,_id, ...categoria } = this.toObject();
    categoria.uid = _id;
    return categoria ;
}

module.exports = model('Categoria', CategoriaSchema);