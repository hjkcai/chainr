import {
  createProxy,
  Chainr, ChainrTarget,
  ChainrDispatch, DISPATCH
} from './proxy'

function createTarget (dispatch: ChainrDispatch): ChainrTarget {
  const noop = () => { /* empty */ }
  return Object.assign(noop, {
    [DISPATCH]: dispatch
  })
}

export default function createInstance (dispatch: ChainrDispatch): Chainr {
  if (typeof dispatch !== 'function') {
    throw new TypeError('Dispatch function is missing')
  }

  const target = createTarget(dispatch)
  return createProxy([], Object.seal(target))
}

export { Chainr, ChainrDispatch }
