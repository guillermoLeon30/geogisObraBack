import verificar from '../utils/verifyToken'

export default async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization')

    if (!authHeader) {
      const error = new Error('Not authenticated.')
      error.statusCode = 401
      throw error
    }

    const token = authHeader.split(' ')[1]
    
    let decodedToken = await verificar(token)

    req.user = {
      id: decodedToken.id,
      tipo: decodedToken.tipo
    }

    next()

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}
