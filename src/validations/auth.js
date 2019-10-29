import { body } from 'express-validator'

const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Ingrese un email valido.')
    .normalizeEmail(),

  body('password', 'Ingrese una contraseña.')
    .isAlphanumeric()
    .trim()
]

const validateRegister = [
  body('nombres')
    .isString().withMessage('Debe ser alfabetico'),
  
  body('apellidos')
    .isString().withMessage('Debe ser alfabetico'),
  
  body('cargo')
    .trim()
    .isString().withMessage('Debe ser alfabetico'),
  
  body('id_tipo_documento')
    .isMongoId().withMessage('Debe ser tipo de dato Mongo ID'),
    
  body('numero_documento')
    .trim()
    .isAlphanumeric().withMessage('Debe ser alfanumerico'),

  body('email')
    .isEmail().withMessage('Ingrese un email valido.')
    .normalizeEmail(),

  body('password', 'Ingrese una contraseña.')
    .trim()
    .isAlphanumeric(),
    
  body('id_tipo')
    .isMongoId().withMessage('Debe ser tipo de dato Mongo ID'),
]

export default {
  validateLogin,
  validateRegister
}
