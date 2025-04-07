import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSearchGymsService } from '@/services/factories/make-search-gyms.service'

export async function searchController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { page, query } = searchGymsQuerySchema.parse(request.body)

  const searchGymsService = makeSearchGymsService()

  const { gyms } = await searchGymsService.execute({
    query,
    page,
  })

  return reply.status(200).send({
    gyms,
  })
}
