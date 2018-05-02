import {
  createProxy,
  Chainr, ChainrTarget,
  DISPATCH
} from './proxy'

import { ChainrDispatch } from './handler'

export function createTarget (dispatch: ChainrDispatch): ChainrTarget {
  const noop = () => { /* empty */ }
  return Object.assign(noop, {
    [DISPATCH]: dispatch
  })
}

function createInstance (dispatch: ChainrDispatch): Chainr {
  if (typeof dispatch !== 'function') {
    throw new TypeError('Dispatch function is missing')
  }

  const target = createTarget(dispatch)
  return createProxy([], Object.seal(target))
}

export default createInstance
