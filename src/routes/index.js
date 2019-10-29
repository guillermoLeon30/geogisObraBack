import bodyParser from 'body-parser'

import authRoutes from './auth'
import userRoutes from './user'
import rubroRoutes from './rubro'

export default app => {
  app.use(bodyParser.json())

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  })

  // ---------------------- Rutas ----------------------

  app.use('/api/auth', authRoutes)
  app.use('/api/user', userRoutes)
  app.use('/api/rubro', rubroRoutes)

  // ---------------------------------------------------
  app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const lista = error.lista;
    res.status(status).json({ message, lista });
  });
}
