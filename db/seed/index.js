import db from '../../src/config/db'
import reset from './reset'
import categoria from './categoria'
import user from './usuario'

db.connect()
  .then(async () => {
    await reset()
    await categoria.crearCategorias()
    await user.crearSuperUsuario()
    // await user.crearUsuarioAdministrador()
  })
  .catch(error => {
    console.log(error)
  })
