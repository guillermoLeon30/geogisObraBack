import express from 'express'

import userController from '../controllers/user'
import isAuth from '../middleware/isAuth'
import validateUser from '../validations/user'
import validateGeneral from '../validations/general'

const router = express.Router()

// /api/user

router.post('/', isAuth, validateGeneral.validateIndex, userController.getIndex)
router.get('/:userId', isAuth, userController.getUser)
router.put('/:userId', isAuth, validateUser.validateUserData, userController.putUpdate)
router.delete('/:userId', isAuth, userController.deleteUser)

export default router
