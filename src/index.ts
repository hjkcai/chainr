import {
  createProxy,
  Chainr, ChainrTarget,
  ChainrDispatch, DISPATCH
} from './proxy'

function createTarget (dispatch: ChainrDispatch): ChainrTarget {
  const ChainrTarget = () => { /* empty */ }
  return Object.assign(ChainrTarget, {
    [DISPATCH]: dispatch
  })
}

export function createInstance (dispatch: ChainrDispatch): Chainr {
  if (typeof dispatch !== 'function') {
    throw new TypeError('Dispatch function is missing')
  }

  const target = createTarget(dispatch)
  return createProxy([], Object.seal(target))
}

export default createInstance
export { Chainr, ChainrDispatch }
