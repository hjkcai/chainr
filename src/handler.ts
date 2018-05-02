import {
  createProxy,
  Chainr, ChainrTarget,
  ChainrDispatch, DISPATCH
} from './proxy'

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

  public set (): never {
    throw new TypeError('Cannot set properties on the chainr instance')
  }

  public defineProperty (): never {
    throw new TypeError('Cannot define properties on the chainr instance')
  }

  public enumerate () {
    return []
  }
}
