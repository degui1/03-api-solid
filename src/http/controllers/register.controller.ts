import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { UserAlreadyExistsError } from '@/services/erros/user-already-exists.error'
import { RegisterService } from '@/services/register.service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, name, password } = registerBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerService = new RegisterService(usersRepository)

    await registerService.execute({ name, email, password })
    reply.status(201).send()
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
