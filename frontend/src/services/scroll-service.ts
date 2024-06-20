import { Injectable } from '@furystack/inject'
import { EventHub } from '@furystack/utils'

@Injectable({ lifetime: 'singleton' })
export class ScrollService extends EventHub<{ onScroll: { top: boolean } }> {}
