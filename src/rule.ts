import { AxiosResponse, AxiosRequestConfig } from 'axios'

export interface RequestRuleHooks {
  beforeRequest (config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig>,
  afterResponse<T = any, U = any> (response: AxiosResponse<T>): AxiosResponse<U> | Promise<AxiosResponse<U>>
}

export interface RequestRule extends AxiosRequestConfig, Partial<RequestRuleHooks> {
  match: RegExp
}

export interface CompiledRequestRules extends Partial<RequestRuleHooks> {
  match: RegExp,
  config: AxiosRequestConfig
}

export function compileRules (rules: RequestRule[]): CompiledRequestRules[] {
  return rules.map(({ match, beforeRequest, afterResponse, ...config }) => {
    return { match, config, beforeRequest, afterResponse }
  })
}
