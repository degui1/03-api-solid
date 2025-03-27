import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms.repository'
import { SearchGymService } from '../search-gyms.service'

export function makeSearchGymsService() {
  const gymsRepository = new PrismaGymsRepository()
  const service = new SearchGymService(gymsRepository)

  return service
}
