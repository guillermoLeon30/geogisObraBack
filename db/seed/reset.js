import User from '../../src/models/user'
import Categoria from '../../src/models/categoria'

export default async () => {
  await Categoria.deleteMany({})
  await User.deleteMany({})

  console.log('Reseteada la Base de Datos.')
}
