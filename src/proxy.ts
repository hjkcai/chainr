import { ChainrProxyHandler, ChainrDispatch } from './handler'

export interface Chainr {
  [key: string]: Chainr
}

export const DISPATCH = Symbol('ChainrHandler')

export interface ChainrTarget {
  [DISPATCH]: ChainrDispatch
}

export function createProxy (keys: PropertyKey[], target: ChainrTarget): Chainr {
  const proxy = new Proxy(target, new ChainrProxyHandler(keys))
  return proxy as any
}
