import { validationResult } from 'express-validator'

import User from '../models/user'

const getIndex = async (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const err = new Error()
      err.statusCode = 400
      err.lista = errors.array()
      throw err
    }
    
    let data = await User.usuarios(req)

    res.status(200).json(data)
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}

const getUser = async (req, res, next) => {
  try {
    const id = req.params.userId
    const user = await User.usuario(id)

    res.status(200).json(user)
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}

const putUpdate = async (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const err = new Error()
      err.statusCode = 400
      err.lista = errors.array()
      throw err
    }

    const id = req.params.userId
    const data = req.body

    await User.update(id, data)

    res.status(200).json({ mensaje: 'Usuario Actualizado' })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.userId

    await User.deleteUser(id)

    res.status(200).json({ mensaje: 'Usuario Borrado' })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}

export default {
  getIndex,
  getUser,
  putUpdate,
  deleteUser
}
