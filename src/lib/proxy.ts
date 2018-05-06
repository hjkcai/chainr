import {
  Chainr,
  ChainrTarget,
  DISPATCH
} from './types'

export class ChainrProxyHandler implements ProxyHandler<ChainrTarget> {
  private keys: PropertyKey[]

  public constructor (keys: PropertyKey[]) {
    this.keys = keys
  }

  public get (target: ChainrTarget, key: PropertyKey): Chainr {
    const keys = [...this.keys, key]
    return createProxy(keys, target)
  }

  public apply (target: ChainrTarget, thisArg: any, args: any[]) {
    const dispatch = target[DISPATCH]
    return dispatch.call(thisArg, this.keys, args)
  }
}

export function createProxy<T = Chainr> (keys: PropertyKey[], target: ChainrTarget): T {
  const proxy: any = new Proxy(target, new ChainrProxyHandler(keys))
  return proxy
}
