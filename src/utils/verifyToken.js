import jwt from 'jsonwebtoken'

const verificar = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      const error = new Error('Not authenticated.')
      error.statusCode = 401
      if (err) reject(error)
      resolve(decoded)
    })
  })
}

export default verificar
