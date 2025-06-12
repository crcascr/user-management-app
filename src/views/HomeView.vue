<script setup lang="ts">
import { useUsers } from '@/composables/useUsers'
import { onMounted, ref } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import UserList from '@/components/UserList.vue'
import UserModal from '@/components/UserModal.vue'

// Composables
const {
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
} = useUsers()

// Local state
const refreshing = ref(false)

// Methods
const handleSearch = (query: string) => {
  searchTerm.value = query
}

const handleClearSearch = () => {
  searchTerm.value = ''
}

const handleRefresh = async () => {
  refreshing.value = true
  try {
    await fetchUsers()
  } finally {
    refreshing.value = false
  }
}

// Lifecycle
onMounted(() => {
  // Los usuarios se cargan automáticamente en el composable
  console.log('HomeView mounted - User will be loaded automatically')
})
</script>

<template>
  <div class="home-view">
    <v-container fluid class="pa-4">
      <!-- Header -->
      <div class="home-header">
        <div class="home-header__content">
          <h1 class="home-header__title">Gestión de Usuarios</h1>
          <p class="home-header__subtitle">Explora y encuentra información detallada de usuarios</p>
        </div>

        <!-- Tarjeta de estadísticas -->
        <div class="home-header__stats">
          <v-card class="stats-card" elevation="2">
            <v-card-text class="text-center">
              <v-icon size="32" color="primary" class="mb-2">mdi-account-group</v-icon>
              <div class="text-h4 font-weight-bold text-primary">{{ users.length }}</div>
              <div class="text-body-2 text-medium-emphasis">Total Usuarios</div>
            </v-card-text>
          </v-card>

          <v-card class="stats-card" elevation="2">
            <v-card-text class="text-center">
              <v-icon size="32" color="success" class="mb-2">mdi-eye-check</v-icon>
              <div class="text-h4 font-weight-bold text-success">{{ filteredUsers.length }}</div>
              <div class="text-body-2 text-medium-emphasis">Visibles</div>
            </v-card-text>
          </v-card>
        </div>
      </div>

      <!-- Sección de búsqueda -->
      <SearchBar
        v-model="searchTerm"
        :loading="loading"
        :result-count="filteredUsers.length"
        :total-count="users.length"
        @search="handleSearch"
        @clear="handleClearSearch"
      />

      <!-- Alerta de error -->
      <v-alert
        v-if="error"
        type="error"
        variant="tonal"
        closable
        class="mb-4"
        @click:close="clearError"
      >
        <template #prepend>
          <v-icon>mdi-alert-circle</v-icon>
        </template>

        <div class="d-flex justify-space-between align-center">
          <div>
            <div class="font-weight-medium">Error al cargar usuarios</div>
            <div class="text-body-2">{{ error }}</div>
          </div>
          <v-btn color="error" variant="text" size="small" @click="fetchUsers"> Reintentar </v-btn>
        </div>
      </v-alert>

      <!-- Lista de usuarios -->
      <UserList
        :users="filteredUsers"
        :loading="loading"
        :error="error"
        :search-term="searchTerm"
        @view-more="selectUser"
        @user-click="selectUser"
        @retry="fetchUsers"
      />

      <!-- Modal de detalles de usuario -->
      <UserModal v-model="modalOpen" :user="selectedUser" :loading="loading" @close="closeModal" />

      <!-- Botón de refrescar -->
      <v-btn
        v-show="!loading && users.length > 0"
        icon
        size="large"
        class="fab-refresh"
        color="primary"
        @click="handleRefresh"
      >
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.home-view {
  min-height: 100vh;

  // Tema claro
  :deep(.v-theme--light) & {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }

  // Tema oscuro
  :deep(.v-theme--dark) & {
    background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  }
}

.home-header {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: $spacing-xl;
  align-items: center;
  margin-bottom: $spacing-xl;
  padding: $spacing-lg 0;

  &__content {
    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: $spacing-sm;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    p {
      font-size: 1.1rem;
      margin: 0;
    }

    :deep(.v-theme--light) & p {
      color: #7f8c8d;
    }

    :deep(.v-theme--dark) & p {
      color: #b0bec5;
    }
  }

  &__stats {
    display: flex;
    gap: $spacing-md;
  }
}

.stats-card {
  min-width: 120px;
  border-radius: 16px;
  transition: transform $transition-normal;

  &:hover {
    transform: translateY(-4px);
  }

  :deep(.v-theme--light) {
    background-color: white;
    color: #1e1e1e;
  }

  :deep(.v-theme--dark) {
    background-color: #2e2e2e;
    color: #f5f5f5;
  }
}

.fab-refresh {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  transition: all $transition-normal;

  &:hover {
    transform: scale(1.1);
  }

  :deep(.v-theme--light) & {
    background-color: $primary-color;
    color: white;

    .v-icon {
      color: white;
    }
  }

  :deep(.v-theme--dark) & {
    background-color: #424242;
    color: white;

    .v-icon {
      color: #ffffff;
    }
  }
}

// Responsive design
@media (max-width: $tablet) {
  .home-header {
    grid-template-columns: 1fr;
    gap: $spacing-lg;
    text-align: center;

    &__stats {
      justify-content: center;
    }
  }
}

@media (max-width: $mobile) {
  .home-header {
    padding: $spacing-md 0;

    &__content h1 {
      font-size: 2rem;
    }

    &__content p {
      font-size: 1rem;
    }

    &__stats {
      flex-direction: column;
      align-items: center;
    }
  }

  .stats-card {
    width: 100%;
    max-width: 200px;
  }

  .fab-refresh {
    bottom: 16px;
    right: 16px;
  }
}
</style>
