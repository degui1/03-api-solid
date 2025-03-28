import { FastifyInstance } from 'fastify'
import { registerController } from './controllers/register.controller'
import { authenticateController } from './controllers/authenticate.controller'
import { profile } from './controllers/profile.controller'
import { verifyJWT } from './middlewares/verify-jwt.middleware'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)

  app.post('/sessions', authenticateController)

  /** Authenticated routes */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
