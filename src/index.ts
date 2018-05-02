import { compileRules, RequestRule } from './rule'
import { createProxy, RequestProxy } from './proxy'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export interface RequestConfig extends AxiosRequestConfig {
  rules?: RequestRule[]
}

export function createInstance (config?: RequestConfig): RequestProxy
export function createInstance (instance: AxiosInstance, config?: RequestConfig): RequestProxy
export function createInstance (
  instance: AxiosInstance | RequestConfig = axios,
  config: RequestConfig = {}
): RequestProxy {
  if (instance != null && typeof instance === 'object') {
    config = instance
    instance = axios
  }

  if (config == null || typeof config !== 'object') {
    config = {}
  }

  const rules = compileRules(config.rules || [])
  const urlParts: string[] = []
  return createProxy({ rules, config, instance, urlParts })
}

createInstance({
  baseURL: '/',
  rules: [
    { match: /.*/ }
  ]
}).insertBooks()
