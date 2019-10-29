import Categoria from '../../src/models/categoria'

const data = [
  {
    tipo: 'documento',
    valor: 'Cedula'
  },
  {
    tipo: 'documento',
    valor: 'Pasaporte'
  },
  {
    tipo: 'usuario',
    valor: 'superAdministrador'
  },
  {
    tipo: 'usuario',
    valor: 'administrador'
  },
  {
    tipo: 'usuario',
    valor: 'revisador'
  },
  {
    tipo: 'usuario',
    valor: 'ejecutante'
  },
  {
    tipo: 'rubro',
    valor: 'Civil'
  },
  {
    tipo: 'rubro',
    valor: 'Mecánico'
  },
  {
    tipo: 'rubro',
    valor: 'Eléctrico'
  },
  {
    tipo: 'rubro',
    valor: 'Otros'
  },
  {
    tipo: 'estado',
    valor: 'activo'
  },
  {
    tipo: 'estado',
    valor: 'desactivado'
  }
]

const crearCategorias = async () => {
  await Categoria.insertMany(data)

  console.log('Creado Categorias.')
}

export default {
  crearCategorias
}
