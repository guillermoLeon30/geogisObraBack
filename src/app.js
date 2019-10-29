import rutas from './routes'

const express = require('express')

const app = express()

rutas(app)

export { app as default }
