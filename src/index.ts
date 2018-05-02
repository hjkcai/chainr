import {
  createProxy,
  Chainr, ChainrTarget,
  ChainrDispatch, DISPATCH
} from './proxy'

function createEmptyFunction (): Function {
  const noop: any = () => { /* empty */ }
  delete noop.name
  delete noop.length

  return noop
}

function createTarget (dispatch: ChainrDispatch): ChainrTarget {
  const target = createEmptyFunction()
  return Object.assign(target, { [DISPATCH]: dispatch })
}

export function createInstance (dispatch: ChainrDispatch): Chainr {
  if (typeof dispatch !== 'function') {
    throw new TypeError('Dispatch function is missing')
  }

  const target = createTarget(dispatch)
  return createProxy([], Object.freeze(target) as ChainrTarget)
}

export default createInstance
export { Chainr, ChainrDispatch }
