import User from '../../src/models/user'
import Categoria from '../../src/models/categoria'

let superUsuario = {
  nombres: 'Guillermo',
  apellidos: 'Leon',
  cargo: 'Administrador',
  id_tipo_documento: null,
  numero_documento: '0704741362',
  email: 'gleon@gmail.com', 
  password: 'guillermo', 
  id_tipo: null,
  estado: null
}

let usuarioAdministrador = {
  nombres: 'Carlos',
  apellidos: 'Jimenez',
  cargo: 'Gerente',
  id_tipo_documento: null,
  numero_documento: '02863154',
  email: 'carlos@gmail.com',
  password: 'carlos',
  id_tipo: null,
  estado: null
}


const crearSuperUsuario = async () => {
  const documento = await Categoria.findOne({
    valor: 'Cedula'
  })
  const tipo = await Categoria.findOne({
    valor: 'superAdministrador'
  })
  const estado = await Categoria.findOne({
    valor: 'activo'
  })

  superUsuario.id_tipo_documento = documento._id
  superUsuario.id_tipo = tipo._id
  superUsuario.estado = estado._id

  await User.registrarUsuario(superUsuario)

  console.log('super usuario creado')
}

const crearUsuarioAdministrador = async () => {
  const documento = await Categoria.findOne({
    valor: 'Cedula'
  })
  const tipo = await Categoria.findOne({
    valor: 'administrador'
  })
  const estado = await Categoria.findOne({
    valor: 'activo'
  })

  usuarioAdministrador.id_tipo_documento = documento._id
  usuarioAdministrador.id_tipo = tipo._id
  usuarioAdministrador.estado = estado._id

  await User.registrarUsuario(usuarioAdministrador)

  console.log('Usuario Administrador creado')
}

export default {
  crearSuperUsuario,
  crearUsuarioAdministrador
}
