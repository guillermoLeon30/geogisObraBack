import { body } from 'express-validator'

const validateIndex = [
  body('buscar')
    .if((value, { req }) => req.body.buscar)
    .isString().withMessage('El campo buscar debe ser un string.'),
  
  body('page')
    .if((value, { req }) => req.body.page)
    .isInt().withMessage('El compo page debe ser numerico.'),
  
  body('perPage')
    .if((value, { req }) => req.body.perPage)
    .isInt().withMessage('El compo page debe ser numerico.')
]

export default {
  validateIndex
}
