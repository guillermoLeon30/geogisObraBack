import { body } from 'express-validator'

const validateRegister = [
  body('nombre')
    .not().isEmpty().withMessage('El campo nombre no debe estar vacio.')
    .isString().withMessage('El campo nombre debe ser un string.'),
  
  body('avance')
    .if((value, { req }) => req.body.avance)
    .isInt().withMessage('El campo avance debe ser entero'),
  
  body('tipo')
    .isMongoId().withMessage('El campo tipo debe ser un ID')
]

const validateUpdate = [
  body('nombre')
    .if((value, { req }) => req.body.nombre)
    .isString().withMessage('El campo nombre debe ser un string.'),
  
  body('avance')
    .if((value, { req }) => req.body.avance)
    .isInt().withMessage('El campo avance debe ser entero'),
  
  body('tipo')
    .if((value, { req }) => req.body.tipo)
    .isMongoId().withMessage('El campo tipo debe ser un ID')
]

export default {
  validateRegister,
  validateUpdate
}
