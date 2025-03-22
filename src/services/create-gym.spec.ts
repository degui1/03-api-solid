import { expect, it, describe, beforeEach } from 'vitest'
import { CreateGymService } from './create-gym.service'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let createGymService: CreateGymService

describe('Create gym service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    createGymService = new CreateGymService(gymsRepository)
  })

  it(`should be able to create a gym.`, async () => {
    const { gym } = await createGymService.execute({
      title: 'JavaScript Gym',
      description: null,
      latitude: -16.8613945,
      longitude: -44.9087921,
      phone: null,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
