<script setup lang="ts">
import type { User } from '@/interfaces'
import { computed } from 'vue'
import UserCard from '@/components/UserCard.vue'

// Props
interface Props {
  users: (User & { avatar: string })[]
  loading?: boolean
  error?: string | null
  searchTerm?: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  error: null,
  searchTerm: '',
})

//Emits
interface Emits {
  'view-more': [user: Props['users'][0]]
  'user-click': [user: Props['users'][0]]
  retry: []
}

const emit = defineEmits<Emits>()

// Computed
const skeletonCount = computed(() => 8)

const isSearching = computed(() => Boolean(props.searchTerm?.trim()))

const emptyIcons = computed(() => {
  if (props.error) return 'mdi-wifi-off'
  if (isSearching.value) return 'mdi-account-search'
  return 'mdi-account-group'
})

const emptyTitle = computed(() => {
  if (props.error) return 'Error de conexión'
  if (isSearching.value) return 'Sin resultados'
  return 'No hay usuarios'
})

const emptyMessage = computed(() => {
  if (props.error) return 'No se pudieron cargar los usuarios. Verifica tu conexión.'
  if (isSearching.value) return `No se encontraron usuarios que coincidan con "${props.searchTerm}"`
  return 'No hay usuarios disponibles en este momento'
})

const showRetryButton = computed(() => Boolean(props.error))

// Methods
const handleViewMore = (user: Props['users'][0]) => {
  emit('view-more', user)
}

const handleUserClick = (user: Props['users'][0]) => {
  emit('user-click', user)
}

const handleRetry = () => {
  emit('retry')
}
</script>

<template>
  <div class="user-list">
    <template v-if="loading">
      <v-row>
        <v-col v-for="i in skeletonCount" :key="`skeleton-${i}`" cols="12">
          <v-card class="user-skeleton" elevation="2">
            <v-card-text class="pa-4">
              <div class="d-flex align-start ga-4">
                <v-skeleton-loader type="avatar" />
                <div class="flex-grow-1">
                  <v-skeleton-loader type="heading" />
                  <v-skeleton-loader type="text" class="mt-2" />
                  <v-skeleton-loader type="text" width="60%" />
                </div>
              </div>
            </v-card-text>
            <v-card-actions class="pa-4 pt-0">
              <v-spacer />
              <v-skeleton-loader type="button" />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </template>
    <template v-else-if="users.length > 0">
      <transition-group name="user-list" tag="div" class="user-grid">
        <v-col v-for="user in users" :key="user.id" cols="12" class="user-grid__item">
          <UserCard :user="user" @view-more="handleViewMore" @click="handleUserClick" />
        </v-col>
      </transition-group>
    </template>

    <template v-else>
      <v-card class="empty-state" elevation="1">
        <v-card-text class="text-center pa-8">
          <v-icon size="80" color="grey-lighten-1" class="mb-4">{{ emptyIcons }}</v-icon>
          <h3 class="text-h6 text-medium-emphasis mb-2">{{ emptyTitle }}</h3>
          <p class="text-body-2 text-medium-emphasis mb-4">{{ emptyMessage }}</p>
          <v-btn
            v-if="showRetryButton"
            color="primary"
            variant="elevated"
            size="small"
            @click="handleRetry"
          >
            <template #prepend>
              <v-icon>mdi-refresh</v-icon>
            </template>
          </v-btn>
        </v-card-text>
      </v-card>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.user-list {
  min-height: 400px;
}

.user-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: $spacing-lg;

  &__item {
    padding: 0;
  }
}

.user-skeleton {
  height: 180px;
}

.empty-state {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 16px;
}

// Animaciones para la lista
.user-list-enter-active,
.user-list-leave-active {
  transition: all $transition-normal;
}

.user-list-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}

.user-list-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.9);
}

.user-list-move {
  transition: transform $transition-normal;
}

// Responsive grid
@media (max-width: $tablet) {
  .user-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: $spacing-md;
  }
}

@media (max-width: $mobile) {
  .user-grid {
    grid-template-columns: 1fr;
    gap: $spacing-sm;
  }
}
</style>
