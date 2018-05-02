import { AxiosRequestConfig } from 'axios'
import { RequestProxyHandler, RequestProxyHandlerOptions } from './handler'

export interface RequestProxy {
  [key: string]: RequestProxy,
  <T>(data?: any, config?: AxiosRequestConfig): Promise<T>
}

export type RequestProxyTarget = (...args: any[]) => any

export function createProxy (options: RequestProxyHandlerOptions): RequestProxy {
  const noop: RequestProxyTarget = () => { /* nothing */ }
  const proxy = new Proxy(noop, new RequestProxyHandler(options))
  return proxy as any
}
