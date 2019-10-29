import { body } from 'express-validator'

const validateUserData = [
  body('nombres')
    .if((value, { req }) => req.body.nombres)
    .isString().withMessage('Debe ser alfabetico'),
  
  body('apellidos')
    .if((value, { req }) => req.body.apellidos)
    .isString().withMessage('Debe ser alfabetico'),
  
  body('cargo')
    .if((value, { req }) => req.body.cargo)
    .trim()
    .isString().withMessage('Debe ser alfabetico'),
  
  body('id_tipo_documento')
    .if((value, { req }) => req.body.id_tipo_documento)
    .isMongoId().withMessage('Debe ser tipo de dato Mongo ID'),
    
  body('numero_documento')
    .if((value, { req }) => req.body.numero_documento)
    .trim()
    .isAlphanumeric().withMessage('Debe ser alfanumerico'),

  body('email')
    .if((value, { req }) => req.body.email)
    .isEmail().withMessage('Ingrese un email valido.')
    .normalizeEmail(),

  body('password', 'Ingrese una contraseña.')
    .if((value, { req }) => req.body.password)
    .trim()
    .isAlphanumeric(),
    
  body('id_tipo')
    .if((value, { req }) => req.body.id_tipo)
    .isMongoId().withMessage('Debe ser tipo de dato Mongo ID'),

  body('estado')
    .if((value, { req }) => req.body.estado)
    .isMongoId().withMessage('Debe ser tipo de dato Mongo ID'),
]

export default {
  validateUserData
}
