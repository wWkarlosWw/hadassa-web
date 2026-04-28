import { useState, useEffect, useCallback } from 'react'
import { apiClient } from '@/services'
import { ApiError } from '@/types'

interface UseFetchOptions<T> {
  immediate?: boolean
  onSuccess?: (data: T) => void
  onError?: (error: ApiError) => void
}

interface UseFetchReturn<T> {
  data: T | null
  loading: boolean
  error: ApiError | null
  execute: () => Promise<void>
  reset: () => void
}

export function useFetch<T>(
  fetchFn: () => Promise<T>,
  options?: UseFetchOptions<T>
): UseFetchReturn<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  const execute = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetchFn()
      setData(result)
      options?.onSuccess?.(result)
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError)
      options?.onError?.(apiError)
    } finally {
      setLoading(false)
    }
  }, [fetchFn, options])

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (options?.immediate) {
      execute()
    }
  }, [execute, options?.immediate])

  return { data, loading, error, execute, reset }
}

export function useFetchEndpoint<T, P>(
  endpoint: string,
  method: 'get' | 'post' | 'put' | 'patch' | 'delete' = 'get',
  options?: UseFetchOptions<T>
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  const execute = useCallback(
    async (params?: P, body?: unknown) => {
      setLoading(true)
      setError(null)
      try {
        let result: T
        switch (method) {
          case 'get':
            result = await apiClient.get<T>(endpoint, { params: params as Record<string, string | number> })
            break
          case 'post':
            result = await apiClient.post<T>(endpoint, body, { params: params as Record<string, string | number> })
            break
          case 'put':
            result = await apiClient.put<T>(endpoint, body, { params: params as Record<string, string | number> })
            break
          case 'patch':
            result = await apiClient.patch<T>(endpoint, body, { params: params as Record<string, string | number> })
            break
          case 'delete':
            result = await apiClient.delete<T>(endpoint, { params: params as Record<string, string | number> })
            break
        }
        setData(result)
        options?.onSuccess?.(result)
      } catch (err) {
        const apiError = err as ApiError
        setError(apiError)
        options?.onError?.(apiError)
      } finally {
        setLoading(false)
      }
    },
    [endpoint, method, options]
  )

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  return { data, loading, error, execute, reset }
}