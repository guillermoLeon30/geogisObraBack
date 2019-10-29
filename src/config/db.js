const mongoose = require('mongoose')

const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

const MONGODB_URI =
  `mongodb://${DB_USER}:${DB_PASS}@obra-shard-00-00-lvt9l.mongodb.net:27017,obra-shard-00-01-lvt9l.mongodb.net:27017,obra-shard-00-02-lvt9l.mongodb.net:27017/${DB_NAME}?ssl=true&replicaSet=obra-shard-0&authSource=admin&retryWrites=true&w=majority`
  // `mongodb+srv://${DB_USER}:${DB_PASS}@obra-lvt9l.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

const db = class {
  static uri() {
    return MONGODB_URI;
  }

  static connect() {
    return mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
  }
}

export { db as default }
