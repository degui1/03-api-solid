import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymService } from './search-gyms.service'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymService

describe('Search Gyms service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymService(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      latitude: -16.8613945,
      longitude: -44.9087921,
      phone: null,
    })

    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: null,
      latitude: -16.8613945,
      longitude: -44.9087921,
      phone: null,
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        latitude: -16.8613945,
        longitude: -44.9087921,
        phone: null,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })
})
