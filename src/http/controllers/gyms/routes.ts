import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt.middleware'

import { searchController } from './search.controller'
import { nearbyController } from './nearby.controller'
import { createController } from './create.controller'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', searchController)
  app.get('/gyms/nearby', nearbyController)

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, createController)
}
