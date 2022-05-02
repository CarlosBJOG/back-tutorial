const Usuario = require('../models/usuario');
const Role = require('../models/role');
const Nivel = require('../models/nivel');
const Seccion = require('../models/secciones');
const Categoria = require('../models/categoria');



const emailValido = async ( correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if( existeEmail ) {
        throw new Error(`El correo ${correo} ya esta registrado en la BD`);
    } 
}

const esRoleValido = async ( rol = '') => {
    const existeRol = await Role.findOne({rol});
    if( !existeRol ) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    } 
}

const existeUsuarioById = async (id = '') => {
    const existeUsuario = await Usuario.findById( id );
    if( !existeUsuario ) {
        throw new Error(`El Usuario con id ${id} no esta registrado en la BD`);
    } 
} 


const usuarioIsActive = async ( id = '' ) => {
    const usuario = await Usuario.findById( id )
    if( !usuario.estado ) {
        throw new Error(`El usuario con id ${id} ya esta eliminado de la BD`);
    }
}

// niveles

const existeNivel = async (nivel = '') => {
    const existeNivel = await Nivel.findOne( {nivel} );
    if( existeNivel ) {
        throw new Error(`El Nivel con  nombre ${nivel} ya esta registrado en la BD`);
    } 
} 
const existeNivelById = async ( id = '' ) => {
    const nivel = await Nivel.findById( id );
    if( !nivel ) {
        throw new Error(`El nivel con id ${id} no existe en la BD`);
    }
}

const nivelIsActive = async ( id = '' ) => {
    const nivel = await Nivel.findById( id );
    if( !nivel.estado ) {
        throw new Error(`El nivel con id ${id} esta desactivado`);
    }
}

//secciones
const existeSeccion = async ( id = '' ) => {
    const seccion = await Seccion.findById( id );
    if( !seccion ){
        throw new Error( `La seccion con id ${id} no existe`);
    }
}

const seccionIsActive = async ( id = '' ) => {

    const seccion = await Seccion.findById(id);
    if(!seccion.estado){
        throw new Error('La seccion esta desactivada');
    }

}

//categorias
const existeCategoria = async ( categoria = '' ) => {
    categoria = categoria.toUpperCase();
    const categoriaDb = await Categoria.findOne({nombre_categoria: categoria});
    if(categoriaDb){
        throw new Error('La categorioa ya esta registrada en la bd');
    }
}

const existeCategoriaById = async ( id = '' ) => {
    const categoriaDb = await Categoria.findById( id );
    if(!categoriaDb){
        throw new Error('La categorioa no existe en la bd');
    }
}

const categoriaIsActive = async ( id = '' ) => {

    const categoriaDb = await Categoria.findById( id );
    if(!categoriaDb){
        throw new Error('La categorioa no existe en la bd');
    }
}


module.exports = {
    emailValido,
    esRoleValido,
    existeUsuarioById,
    existeNivel,
    usuarioIsActive,
    existeNivelById,
    nivelIsActive,
    existeSeccion,
    seccionIsActive,
    existeCategoria,
    categoriaIsActive,
    existeCategoriaById
}