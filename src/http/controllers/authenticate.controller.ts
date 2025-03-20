import { InvalidCredentialsError } from '@/services/erros/invalid-credentials.error'
import { makeAuthenticateService } from '@/services/factories/make-authenticate.service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticateController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const authenticateService = makeAuthenticateService()

    await authenticateService.execute({ email, password })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }

  return reply.send()
}
