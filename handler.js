import db from './src/config/db'
import app from './src/app'

const mongoose = require('mongoose')
const serverless = require('serverless-http')

let conn = null
const uri = db.uri()

const handler = serverless(app)

const generic = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  if (conn == null) {
    conn = await mongoose.connect(uri, {
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0 // and MongoDB driver buffering
    })
  }

  const result = await handler(event, context)

  return result
}

export { generic }
