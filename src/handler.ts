import * as deepmerge from 'deepmerge'
import { dispatchRequest } from './dispatch'
import { CompiledRequestRules } from './rule'
import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { createProxy, RequestProxy, RequestProxyTarget } from './proxy'

export interface RequestProxyHandlerOptions {
  rules: CompiledRequestRules[],
  config: AxiosRequestConfig,
  instance: AxiosInstance,
  urlParts: string[]
}

export class RequestProxyHandler implements RequestProxyHandlerOptions, ProxyHandler<RequestProxyTarget> {
  public rules: CompiledRequestRules[]
  public config: AxiosRequestConfig
  public instance: AxiosInstance
  public urlParts: string[]

  public constructor ({ rules, config, instance, urlParts }: RequestProxyHandlerOptions) {
    this.rules = rules
    this.config = config
    this.instance = instance
    this.urlParts = urlParts
  }

  public get (target: RequestProxyTarget, key: PropertyKey): RequestProxy {
    const stringKey = this.parsePropertyKey(key)
    const urlParts = [...this.urlParts, stringKey]

    return createProxy(this.clone({ urlParts }))
  }

  public apply (target: RequestProxyTarget, thisArg: any, [data, options]: any[]) {
    if (options == null || typeof options !== 'object') {
      options = {}
    }

    const config: AxiosRequestConfig = deepmerge.all([this.config, { data }, options])
    return dispatchRequest(this.clone({ config }))
  }

  public set (): never {
    throw new Error('Cannot assgin properties of the request proxy')
  }

  public enumerate () {
    return []
  }

  private clone (options: Partial<RequestProxyHandlerOptions> = {}): RequestProxyHandlerOptions {
    return {
      ...(this as RequestProxyHandlerOptions),
      ...options
    }
  }

  private parsePropertyKey (key: PropertyKey): string {
    if (typeof key === 'symbol') {
      throw new TypeError('Cannot use Symbols as a part of the request')
    }

    return key.toString()
  }
}
