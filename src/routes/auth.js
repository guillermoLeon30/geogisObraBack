import express from 'express'

import authController from '../controllers/auth'
import isAuth from '../middleware/isAuth'
import validateAuth from '../validations/auth'

const router = express.Router()

// /api/auth

router.post('/login', validateAuth.validateLogin, authController.postLogin)
router.post('/register', isAuth, validateAuth.validateRegister, authController.postRegistrarUsuario)
router.post('/refresh', authController.refreshToken)

export default router
