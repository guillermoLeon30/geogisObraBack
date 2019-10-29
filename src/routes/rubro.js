import express from 'express'

import rubroController from '../controllers/rubro'
import isAuth from '../middleware/isAuth'
import validateGeneral from '../validations/general'
import validateRubro from '../validations/rubro'

const router = express.Router()

// /api/rubro

router.post('/', isAuth, validateGeneral.validateIndex, rubroController.getIndex)
router.get('/:rubroId', isAuth, rubroController.getRubro)
router.post('/save', isAuth, validateRubro.validateRegister, rubroController.postSave)
router.put('/:rubroId', isAuth, validateRubro.validateUpdate, rubroController.putUpdate)
router.delete('/:rubroId', isAuth, rubroController.deleteRubro)

export default router
