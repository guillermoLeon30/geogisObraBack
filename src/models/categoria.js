const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categoriaSchema = new Schema({
  tipo: {
    type: String,
    required: true
  },
  valor: {
    type: String,
    required: true
  }
})

export default mongoose.model('Categoria', categoriaSchema)
