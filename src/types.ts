export interface Chainr {
  [key: string]: Chainr
}

export type ChainrDispatch = (this: any, keys: PropertyKey[], args: any[]) => any

export const DISPATCH = Symbol('ChainrHandler')

export interface ChainrTarget {
  [DISPATCH]: ChainrDispatch
}
