import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsService } from './fetch-nearby-gyms.service'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsService

describe('Fetch nearby Gyms service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsService(gymsRepository)
  })

  it('should be able to search gyms by title', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      latitude: -20.3303171,
      longitude: -47.7948197,
      phone: null,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      latitude: -16.8613945,
      longitude: -44.9087921,
      phone: null,
    })

    const { gyms } = await sut.execute({
      userLatitude: -20.3295902,
      userLongitude: -47.7931372,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
