import { defineService } from '@furystack/inject'
import { EventHub } from '@furystack/utils'

export const ScrollService = defineService({
  name: 'scrollService',
  lifetime: 'singleton',
  factory: () => new EventHub<{ onScroll: { top: boolean } }>(),
})
