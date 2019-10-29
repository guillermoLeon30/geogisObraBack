import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'

import User from '../models/user'
import generatedToken from '../utils/generatedToken'

const postLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const err = new Error()
      err.statusCode = 400
      err.lista = errors.array()
      throw err
    }

    const user = await User.login(req.body)

    res.status(200).json(user)
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}

const postRegistrarUsuario = async (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const err = new Error()
      err.statusCode = 400
      err.lista = errors.array()
      throw err
    }

    const user = User.registrarUsuario(req.body)

    res.status(200).json(user)
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}

const refreshToken = async (req, res, next) => {
  try {
    const token = req.body.token

    let decodedToken = await verificar(token)

    const user = {
      id: decodedToken.id,
      tipo: decodedToken.tipo
    }

    const tokenCorto = await generatedToken(user, '15m')

    res.status(200).json({ token: tokenCorto })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}

const verificar = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      const error = new Error('Not authenticated.')
      error.lista = [{ msg: 'Sesion expirada, ingresar nuevamente.' }]
      if (err) reject(error)
      resolve(decoded)
    })
  })
}

export default {
  postLogin,
  postRegistrarUsuario,
  refreshToken
}
