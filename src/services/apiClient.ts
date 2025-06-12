import { API_BASE_URL } from '@/constants'
import type { ApiError } from '@/interfaces'
import axios, { type AxiosResponse } from 'axios'

/**
 * Configuración de axios
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Interceptor para manejo de errores
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || 'Error desconocido',
      status: error.response?.status,
      code: error.code,
    }
    return Promise.reject(apiError)
  },
)
