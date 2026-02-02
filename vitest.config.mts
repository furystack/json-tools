import { defineConfig } from 'vitest/config'

const cfg = defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',
      enabled: true,
      include: ['common/src/**/*.ts', 'service/src/**/*.ts', 'frontend/src/**/*.ts', 'frontend/src/**/*.tsx'],
    },
    projects: [
      {
        test: {
          name: 'Common',
          include: ['common/src/**/*.test.(ts|tsx)'],
        },
      },
      {
        test: {
          name: 'Service',
          include: ['service/src/**/*.test.(ts|tsx)'],
        },
      },
      {
        test: {
          name: 'Frontend',
          environment: 'jsdom',
          include: ['frontend/src/**/*.test.(ts|tsx)'],
        },
      },
    ],
  },
})

export default cfg
