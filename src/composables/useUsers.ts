import { ref, computed, onMounted } from 'vue'
import type { Ref } from 'vue'
import { UserService } from '@/services/userService'
import type { ApiError, User } from '@/interfaces/user'

export interface UseUsersReturn {
  users: Ref<User[]>
  filteredUsers: Ref<User[]>
  loading: Ref<boolean>
  error: Ref<string | null>
  searchTerm: Ref<string>
  selectedUser: Ref<User | null>
  modalOpen: Ref<boolean>
  fetchUsers: () => Promise<void>
  selectUser: (user: User) => void
  closeModal: () => void
  clearError: () => void
}

export function useUsers(): UseUsersReturn {
  // Estado reactivo
  const users = ref<User[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const searchTerm = ref<string>('')
  const selectedUser = ref<User | null>(null)
  const modalOpen = ref<boolean>(false)

  // Computed para usuarios filtrados
  const filteredUsers = computed(() => UserService.filterUsersByName(users.value, searchTerm.value))

  // Métodos
  const fetchUsers = async (): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      // Simular delay para mostrar loading
      await UserService.delay(800)

      const response = await UserService.getAllUsers()
      users.value = response.data
    } catch (err) {
      const apiError = err as ApiError
      error.value = apiError.message || 'Error al cargar los usuarios'
      console.error('Error in fetchUsers:', apiError)
    } finally {
      loading.value = false
    }
  }

  const selectUser = (user: User): void => {
    selectedUser.value = user
    modalOpen.value = true
  }

  const closeModal = (): void => {
    modalOpen.value = false
    // Delay para la animación antes de limpiar
    setTimeout(() => {
      selectedUser.value = null
    }, 300)
  }

  const clearError = (): void => {
    error.value = null
  }

  // Cargar usuarios al montar el composable
  onMounted(() => {
    fetchUsers()
  })

  return {
    users,
    filteredUsers,
    loading,
    error,
    searchTerm,
    selectedUser,
    modalOpen,
    fetchUsers,
    selectUser,
    closeModal,
    clearError,
  }
}
