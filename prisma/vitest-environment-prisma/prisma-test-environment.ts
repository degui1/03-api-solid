import { Environment } from 'vitest/environments'

export default {
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    console.log('test')

    return {
      teardown() {},
    }
  },
} as Environment
