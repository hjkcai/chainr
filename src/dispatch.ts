import * as pathToRegexp from 'path-to-regexp'
import { RequestProxyHandlerOptions } from './handler'

export function dispatchRequest ({ rules, config, instance, urlParts }: RequestProxyHandlerOptions) {
  config.url = urlParts.join('/')
  debugger
}
