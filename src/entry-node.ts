import { inspect } from 'util'
import { ChainrTarget } from './lib/types'
import { ChainrProxyHandler } from './lib/proxy'

const proto = ChainrProxyHandler.prototype
const originalGet = proto.get

proto.get = function get (target: ChainrTarget, key: PropertyKey): any {
  if (key === inspect.custom) {
    const that: any = this
    return function customNodeInspect () {
      return `Chainr ${inspect(that.keys)}`
    }
  }

  return originalGet.call(this, target, key)
}

export * from './lib'
