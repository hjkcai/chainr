import {
  createProxy,
  Chainr, ChainrTarget,
  CHAINR_HANDLER, CHAINR_TARGET_DATA
} from './proxy'

import { ChainrHandler } from './handler'

export function createTarget<T> (handler: ChainrHandler<T>, data?: T): ChainrTarget<T> {
  const noop = () => { /* empty */ }
  return Object.assign(noop, {
    [CHAINR_HANDLER]: handler,
    [CHAINR_TARGET_DATA]: data
  })
}

function createInstance<T> (dispatch: ChainrHandler<T>['dispatch'], data?: T): Chainr<T>
function createInstance<T> (handler: ChainrHandler<T>, data?: T): Chainr<T>
function createInstance<T> (dispatchOrHandler: ChainrHandler<T>['dispatch'] | ChainrHandler<T>, data?: T): Chainr<T> {
  let target: ChainrTarget<T>
  if (typeof dispatchOrHandler === 'object' && typeof dispatchOrHandler.dispatch === 'function') {
    target = createTarget(dispatchOrHandler, data)
  } else if (typeof dispatchOrHandler === 'function') {
    target = createTarget({ dispatch: dispatchOrHandler }, data)
  } else {
    throw new TypeError('Dispatch function is missing')
  }

  return createProxy([], Object.seal(target))
}

export default createInstance
