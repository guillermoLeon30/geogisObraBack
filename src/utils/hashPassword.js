import bcrypt from 'bcryptjs'

const hashPassword = (password) => {
  if (password.length < 8) {
    throw new Error('Pasword must be 8 caracters or longer.')
  }

  return bcrypt.hash(password, 10)
}

export { hashPassword as default }