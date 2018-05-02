import {
  createProxy,
  Chainr, ChainrTarget,
  CHAINR_HANDLER, CHAINR_TARGET_DATA
} from './proxy'

export interface ChainrDispatchParameter<T> {
  args: any[],
  keys: string[],
  data?: T,
  thisArg: any
}

export interface ChainrHandler<T> {
  parseKey? (key: PropertyKey): string,
  dispatch (params: ChainrDispatchParameter<T>): any
}

export class ChainrProxyHandler<T> implements ProxyHandler<ChainrTarget<T>> {
  private keys: string[]

  public constructor (keys: string[]) {
    this.keys = keys
  }

  public get (target: ChainrTarget<T>, key: PropertyKey): Chainr<T> {
    const { parseKey } = target[CHAINR_HANDLER]
    const newKey = this.parsePropertyKey(key, parseKey)

    const keys = [...this.keys, newKey]
    return createProxy(keys, target)
  }

  public apply (target: ChainrTarget<T>, thisArg: any, args: any[]) {
    const data = target[CHAINR_TARGET_DATA]
    const { keys } = this
    const { dispatch } = target[CHAINR_HANDLER]

    return dispatch({ args, keys, data, thisArg })
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

  private parsePropertyKey (key: PropertyKey, parser: ChainrHandler<T>['parseKey']): string {
    if (parser) {
      key = parser(key)
    }

    if (typeof key !== 'string') {
      throw new TypeError('Cannot use Symbols as a part of the chainr key')
    }

    return key.toString()
  }
}
