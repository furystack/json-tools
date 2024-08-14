import { describe, expect, it } from 'vitest'
import { environmentOptions } from './environment-options.js'

describe('Environment options', () => {
  it('Should match the snapshot', () => {
    expect(environmentOptions).toMatchInlineSnapshot(`
      {
        "repository": "http://github.com/furystack/boilerplate",
      }
    `)
  })
})
