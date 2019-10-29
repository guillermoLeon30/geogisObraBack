import { validationResult } from 'express-validator'

import Rubro from '../models/rubro'

const getIndex = async (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const err = new Error()
      err.statusCode = 400
      err.lista = errors.array()
      throw err
    }

    let data = await Rubro.rubros(req)

    res.status(200).json(data)
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}

const postSave = async (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const err = new Error()
      err.statusCode = 400
      err.lista = errors.array()
      throw err
    }

    const rubro = await Rubro.registrarRubro(req.body)

    res.status(200).json(rubro)
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
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

    const id = req.params.rubroId
    const data = req.body

    await Rubro.update(id, data)

    res.status(200).json({
      mensaje: 'Rubro Actualizado'
    })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}

const getRubro = async (req, res, next) => {
  try {
    const id = req.params.rubroId
    const user = await Rubro.rubro(id)

    res.status(200).json(user)
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}

const deleteRubro = async (req, res, next) => {
  try {
    const id = req.params.rubroId
    
    await Rubro.deleteRubro(id)

    res.status(200).json({ mensaje: 'Rubro Borrado' })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}

export default {
  getIndex,
  postSave,
  putUpdate,
  getRubro,
  deleteRubro
}
