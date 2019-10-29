import db from './config/db'
import app from './app'

const port = process.env.PORT

db.connect().then(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
})
