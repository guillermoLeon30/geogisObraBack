import bcrypt from 'bcryptjs'

import Categoria from './categoria'
import generatedToken from '../utils/generatedToken'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  nombres: {
    type: String,
    required: true
  },
  apellidos: {
    type: String,
    required: true
  },
  cargo: {
    type: String,
    required: true
  },
  id_tipo_documento: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true
  },
  numero_documento: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  id_tipo: {
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

userSchema.statics.registrarUsuario = async function (data) {
  const { nombres, apellidos, cargo, id_tipo_documento, numero_documento, email, password, id_tipo } = data

  try {
    let user = await this.findOne({ email })

    if (user) {
      let error = new Error()
      error.statusCode = 400
      error.lista = [{ msg: 'Ya existe un usuario con este correo.' }]
      throw error
    }

    const estado = await Categoria.findOne({ valor: 'activo' })

    const hashPassword = await bcrypt.hash(password, 12)

    user = await this.create({
      nombres,
      apellidos,
      cargo,
      id_tipo_documento,
      numero_documento,
      email,
      password: hashPassword,
      id_tipo,
      estado: estado._id
    })

    return user
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    throw error
  }
}

userSchema.statics.login = async function (data) {
  const { email, password } = data
  
  try {
    const user = await this.findOne({ email })
      .populate('id_tipo', 'valor')
      .populate('estado', 'valor')

    if (!user) {
      const error = new Error()
      error.statusCode = 400
      error.lista = [ { msg: 'Un usuario con este email no se encuentra.' } ]
      throw error
    }

    if (user.estado.valor !== 'activo') {
      const error = new Error()
      error.statusCode = 400
      error.lista = [ { msg: 'Usuario no authorizado.' } ]
      throw error
    }

    const isEqual = await bcrypt.compare(password, user.password)

    if (!isEqual) {
      const error = new Error()
      error.statusCode = 400
      error.lista = [ { msg: 'Password Incorrecta!' } ]
      throw error
    }

    const tokenCorto = await generatedToken({ id: user._id, tipo: user.id_tipo.valor }, '15m')
    const tokenLargo = await generatedToken({ id: user._id, tipo: user.id_tipo.valor }, '7 days')
    const categorias = await Categoria.find({})

    return {
      nombres: user.nombres,
      apellidos: user.apellidos,
      cargo: user.cargo,
      tipo: user.id_tipo,
      token: {
        corto: tokenCorto,
        largo: tokenLargo
      },
      categorias
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    throw error;
  }
}

userSchema.statics.usuarios = async function (req) {
  const currentPage = req.body.page || 1
  const buscar = req.body.buscar || ''
  const perPage = req.body.perPage || 5

  try {
    let totalItems = await this.find().countDocuments();
    let users = await this.find({
      $or: [
        { nombres: { $regex: buscar } },
        { apellidos: { $regex: buscar } },
        { email: { $regex: buscar } }
      ]
    })
      .populate('id_tipo', 'valor')
      .populate('id_tipo_documento', 'valor')
      .populate('estado', 'valor')
      .skip((currentPage - 1) * perPage)
      .limit(perPage)

    users = users.map(({ _id, nombres, apellidos, cargo, id_tipo_documento, numero_documento, email, id_tipo, estado }) => ({
      _id,
      nombres,
      apellidos,
      cargo,
      tipo_documento: id_tipo_documento,
      numero_documento,
      email,
      tipo: id_tipo,
      estado
    }))

    if(req.user.tipo !== 'superAdministrador') {
      const superAdministradores = users.filter(({ tipo }) => ( tipo.valor === 'superAdministrador' ))
      users = users.filter(({ tipo }) => ( tipo.valor !== 'superAdministrador' ))
      totalItems = totalItems - superAdministradores.length
    }

    return {
      users,
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

userSchema.statics.usuario = async function (_id) {
  try {
    const user = await this.findOne({ _id })

    if (!user) {
      let error = new Error()
      error.statusCode = 400
      error.lista = [{
        msg: 'El usuario no existe.'
      }]
      throw error
    }

    const { password, ...restUser } = user._doc

    return restUser
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    throw error
  }
}

userSchema.statics.update = async function (_id, data) {
  let user = await this.findOne({ _id })

  if (!user) {
    const error = new Error()
    error.statusCode = 400
    error.lista = [ { msg: 'Un usuario no encontrado.' } ]
    throw error
  }

  const pass = data.password ? await bcrypt.hash(data.password, 12) : null

  user.nombres = data.nombres || user.nombres
  user.apellidos = data.apellidos || user.apellidos
  user.cargo = data.cargo || user.cargo
  user.id_tipo_documento = data.id_tipo_documento || user.id_tipo_documento
  user.numero_documento = data.numero_documento || user.numero_documento
  user.email = data.email || user.email
  user.password = pass || user.password
  user.id_tipo = data.id_tipo || user.id_tipo
  user.estado = data.estado || user.estado

  return await user.save()
}

userSchema.statics.deleteUser = async function (_id) {
  let user = await this.findOne({ _id })

  if (!user) {
    const error = new Error()
    error.statusCode = 400
    error.lista = [{
      msg: 'Un usuario no encontrado.'
    }]
    throw error
  }

  const estado = await Categoria.findOne({ valor: 'desactivado' })

  user.estado = estado._id

  return await user.save()
}

export default mongoose.model('User', userSchema)
