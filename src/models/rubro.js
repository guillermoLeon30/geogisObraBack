import Categoria from './categoria'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const rubroSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  avance: {
    type: Number,
    default: 0
  },
  tipo: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true
  },
  estado: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true
  }
})

rubroSchema.statics.registrarRubro = async function (data) {
  try {
    let { nombre, avance, tipo } = data
    
    nombre = nombre.toUpperCase()

    let rubro = await this.findOne({ nombre })

    if (rubro) {
      let error = new Error()
      error.statusCode = 400
      error.lista = [{ msg: 'Ya existe un rubro con este nombre' }]
      throw error
    }

    const estado = await Categoria.findOne({ valor: 'activo' })

    rubro = await this.create({
      nombre,
      tipo,
      estado: estado._id
    })

    return rubro
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    throw error
  }
}

rubroSchema.statics.rubros = async function (req) {
  const currentPage = req.body.page || 1
  let buscar = req.body.buscar || ''
  const perPage = req.body.perPage || 5

  buscar = buscar.toUpperCase()

  try {
    let totalItems
    let rubros
    const estado = await Categoria.findOne({ valor: 'activo' })
    
    if (req.user.tipo === 'superAdministrador' || req.user.tipo === 'administrador') {
      rubros = await this.find({ nombre: { $regex: buscar } })
        .populate('tipo', 'valor')
        .populate('estado', 'valor')
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
      
      totalItems = rubros.length
    } else {
      rubros = await this.find({
        nombre: { $regex: buscar },
        estado: estado._id
      })
        .populate('tipo', 'valor')
        .populate('estado', 'valor')
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
      
      totalItems = rubros.length
    }

    return {
      rubros,
      pagination: {
        currentPage,
        totalItems,
        perPage,
        maxPage: Math.ceil(totalItems / perPage),
        viewPage: 5,
        offset: 2,
        url: 'api/user'
      }
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    throw error
  }
}

rubroSchema.statics.rubro = async function (_id) {
  try {
    const rubro = await this.findOne({ _id })

    if (!rubro) {
      let error = new Error()
      error.statusCode = 400
      error.lista = [{
        msg: 'El usuario no existe.'
      }]
      throw error
    }

    return rubro
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    throw error
  }
}

rubroSchema.statics.update = async function (_id, data) {
  let rubro = await this.findOne({ _id })

  if (!rubro) {
    const error = new Error()
    error.statusCode = 400
    error.lista = [ { msg: 'Rubro no encotrado.' } ]
    throw error
  }

  const nombre = data.nombre ? data.nombre.toUpperCase() : null

  rubro.nombre = nombre || rubro.nombre
  rubro.avance = data.avance || rubro.avance
  rubro.tipo = data.tipo || rubro.tipo
  rubro.estado = data.estado || rubro.estado

  return await rubro.save()
}

rubroSchema.statics.deleteRubro = async function (_id) {
  let rubro = await this.findOne({ _id })

  if (!rubro) {
    const error = new Error()
    error.statusCode = 400
    error.lista = [{
      msg: 'Rubro no encontrado.'
    }]
    throw error
  }

  return await this.findOneAndDelete({ _id })
}

export default mongoose.model('Rubro', rubroSchema)
