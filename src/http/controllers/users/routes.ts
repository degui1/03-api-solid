import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt.middleware'

import { registerController } from './register.controller'
import { authenticateController } from './authenticate.controller'
import { profile } from './profile.controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)

  /** Authenticated routes */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
