import { AVATAR_BASE_URL } from '@/constants'
import type { Address, ApiError, ApiResponse, User } from '@/interfaces'
import { apiClient } from '@/services'

export class UserService {
  /**
   * Obtiene todos los usuarios de la API
   */
  static async getAllUsers(): Promise<ApiResponse<User[]>> {
    try {
      const response = await apiClient.get<User[]>('/users')

      /**
       * Agregar avatares aleatorios a los usuarios
       * Pravatar tiene ~70 imágenes
       */
      const usersWithAvatars = response.data.map((user, index) => ({
        ...user,
        avatar: `${AVATAR_BASE_URL}${(index % 70) + 1}`,
      }))

      return {
        data: usersWithAvatars,
        status: response.status,
        message: 'Usuarios obtenidos exitosamente',
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error as ApiError
    }
  }

  /**
   * Obtiene un usuario específico por ID
   */
  static async getUserById(id: number): Promise<ApiResponse<User>> {
    try {
      const response = await apiClient.get<User>(`/users/${id}`)

      const userWithAvatar = {
        ...response.data,
        avatar: `${AVATAR_BASE_URL}${(id % 70) + 1}`,
      }

      return {
        data: userWithAvatar,
        status: response.status,
        message: 'Usuario obtenido exitosamente',
      }
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error)
      throw error as ApiError
    }
  }

  /**
   * Simula un delay para mostrar loading states
   */
  static async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  /**
   * Filtra usuarios por nombre
   */
  static filterUsersByName(users: User[], searchTerm: string): User[] {
    if (!searchTerm.trim()) return users

    const term = searchTerm.toLowerCase().trim()
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.username.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term),
    )
  }

  /**
   * Formatea la dirección completa del usuario
   */
  static formatAddress(address: Address): string {
    return `${address.street}, ${address.suite}, ${address.city} ${address.zipcode}`
  }

  /**
   * Valida si una URL es válida
   */
  static isValidUrl(url: string): boolean {
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`)
      return true
    } catch {
      return false
    }
  }

  /**
   * Formatea el número de teléfono removiendo caracteres especiales
   * excepto números, espacios y guiones
   */
  static formatPhone(phone: string): string {
    return phone.replace(/[^\d\s-().]/g, '')
  }
}
