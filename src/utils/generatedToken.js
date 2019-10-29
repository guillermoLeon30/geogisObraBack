import jwt from 'jsonwebtoken'

const generatedToken = async (user, duracion) => {
  return await jwt.sign(user, process.env.JWT_SECRET, { expiresIn: duracion })
}

export { generatedToken as default }