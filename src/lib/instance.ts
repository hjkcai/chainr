import { createProxy } from './proxy'
import {
  Chainr,
  ChainrTarget,
  ChainrDispatch,
  DISPATCH
} from './types'

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

export function createInstance<T = Chainr> (dispatch: ChainrDispatch): T {
  if (typeof dispatch !== 'function') {
    throw new TypeError('Dispatch function is missing')
  }

  const target = createTarget(dispatch)
  return createProxy<T>([], Object.freeze(target) as ChainrTarget)
}
