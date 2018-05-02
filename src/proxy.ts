import { ChainrHandler, ChainrProxyHandler } from './handler'

export interface Chainr<T> {
  [key: string]: Chainr<T>
}

export const CHAINR_HANDLER = Symbol('ChainrHandler')
export const CHAINR_TARGET_DATA = Symbol('ChainrTargetData')

export interface ChainrTarget<T> {
  [CHAINR_HANDLER]: ChainrHandler<T>,
  [CHAINR_TARGET_DATA]?: T
}

export function createProxy<T> (keys: string[], target: ChainrTarget<T>): Chainr<T> {
  const proxy = new Proxy(target, new ChainrProxyHandler<T>(keys))
  return proxy as any
}
