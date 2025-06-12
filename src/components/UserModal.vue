<script setup lang="ts">
import type { User } from '@/interfaces'
import { UserService } from '@/services'
import { computed } from 'vue'

// Props
interface Props {
  modelValue: boolean
  user: (User & { avatar: string }) | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

// Emits
interface Emits {
  'update:modelValue': [value: boolean]
  close: []
}

const emit = defineEmits<Emits>()

// Computed
const mapsUrl = computed(() => {
  const geo = props.user?.address?.geo
  if (!geo?.lat || !geo?.lng) return '#'

  return `https://www.google.com/maps/search/?api=1&query=${geo.lat},${geo.lng}`
})

const formatSector = (sector: string) => {
  const sectors = sector.split(' ')
  return sectors.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(', ')
}

// Methods
const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

const formatPhone = (phone: string) => {
  return UserService.formatPhone(phone)
}

const formatWebsite = (website: string) => {
  return website.startsWith('http') ? website : `http://${website}`
}
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    max-width="600"
    :persistent="loading"
    transition="dialog-bottom-transition"
    @update:model-value="handleClose"
  >
    <v-card class="user-modal" :loading="loading">
      <v-card-title class="user-modal__header">
        <div class="user-modal__header-content">
          <v-avatar :size="56" class="user-modal__avatar">
            <v-img :src="user?.avatar" :alt="`Avatar de ${user?.name}`" cover>
              <template #placeholder>
                <v-skeleton-loader type="avatar" />
              </template>
            </v-img>
          </v-avatar>
          <div class="user-modal__title-section">
            <h2 class="text-h5 font-weight-bold">{{ user?.name || 'Cargando...' }}</h2>
            <p class="text-body-2 ma-0">@{{ user?.username || '...' }}</p>
          </div>
        </div>
        <v-btn icon variant="text" size="small" :disabled="loading" @click="handleClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider />

      <v-card-text class="user-modal__content">
        <template v-if="loading">
          <div class="user-modal__loading">
            <v-skeleton-loader type="paragraph" />
            <v-skeleton-loader type="paragraph" class="mt-4" />
            <v-skeleton-loader type="paragraph" class="mt-4" />
          </div>
        </template>

        <template v-else-if="user">
          <div class="user-modal__details">
            <!-- Información de contacto -->
            <div class="user-modal__section">
              <h3 class="text-h6 mb-3 text-primary">
                <v-icon class="mr-2">mdi-card-account-details</v-icon>
                Información de Contacto
              </h3>
              <v-list class="user-modal__list">
                <v-list-item class="px-0">
                  <template #prepend>
                    <v-icon color="primary">mdi-email</v-icon>
                  </template>
                  <v-list-item-title>Email</v-list-item-title>
                  <v-list-item-subtitle>
                    <a
                      :href="`mailto:${user.email}`"
                      class="text-decoration-none text-primary text-lowercase"
                      >{{ user.email }}
                    </a>
                  </v-list-item-subtitle>
                </v-list-item>

                <v-list-item class="px-0">
                  <template #prepend>
                    <v-icon color="primary">mdi-phone</v-icon>
                  </template>
                  <v-list-item-title>Teléfono</v-list-item-title>
                  <v-list-item-subtitle>
                    <a
                      :href="`tel:${formatPhone(user.phone)}`"
                      class="text-decoration-none text-primary"
                      >{{ formatPhone(user.phone) }}
                    </a>
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item class="px-0">
                  <template #prepend>
                    <v-icon color="primary">mdi-web</v-icon>
                  </template>
                  <v-list-item-title>Sitio Web</v-list-item-title>
                  <v-list-item-subtitle>
                    <a
                      :href="formatWebsite(user.website)"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-decoration-none text-primary"
                    >
                      {{ user.website }}
                      <v-icon size="12" class="ml-1">mdi-open-in-new</v-icon>
                    </a>
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </div>

            <!-- Información de dirección -->
            <div class="user-modal__section">
              <h3 class="text-h6 mb-3 text-primary">
                <v-icon class="mr-2">mdi-map-marker</v-icon>
                Dirección
              </h3>
              <v-card variant="tonal" class="user-modal__address-card">
                <v-card-text>
                  <div class="user-modal__address">
                    <p class="text-body-1 mb-1">
                      <strong>{{ user.address.street }}, {{ user.address.suite }}</strong>
                    </p>
                    <p class="text-body-2 text-medium-emphasis mb-2">
                      {{ user.address.city }} {{ user.address.zipcode }}
                    </p>

                    <v-btn
                      size="small"
                      color="primary"
                      variant="text"
                      :href="mapsUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <template #prepend>
                        <v-icon>mdi-map</v-icon>
                      </template>
                      Ver en mapa
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </div>

            <!-- Información de empresa -->
            <div class="user-modal__section">
              <h3 class="text-h6 mb-3 text-primary">
                <v-icon class="mr-2">mdi-domain</v-icon>
                Empresa
              </h3>

              <v-card variant="tonal" class="user-modal__company-card">
                <v-card-text>
                  <h4 class="text-h6 mb-2">{{ user.company.name }}</h4>
                  <p class="text-body-2 text-medium-emphasis mb-2">
                    "{{ formatSector(user.company.catchPhrase) }}"
                  </p>
                  <p class="text-body-2">
                    <strong>Sector:</strong> {{ formatSector(user.company.bs) }}
                  </p>
                </v-card-text>
              </v-card>
            </div>
          </div>
        </template>
      </v-card-text>

      <!-- Botones de acción -->
      <v-card-actions class="user-modal__actions">
        <v-spacer />
        <v-btn color="grey" variant="text" :disabled="loading" @click="handleClose"> Cerrar </v-btn>

        <v-btn
          v-if="user?.email"
          color="primary"
          variant="elevated"
          :disabled="loading"
          :href="`mailto:${user.email}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          <template #prepend>
            <v-icon>mdi-email-fast</v-icon>
          </template>
          Contactar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
.user-modal {
  &__header {
    display: flex;
    justify-content: space-between;
    padding: $spacing-lg;
    color: white;

    :deep(.v-theme--light) & {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    :deep(.v-theme--dark) & {
      background: linear-gradient(135deg, #2c3e50 0%, #4a148c 100%);
    }

    &-content {
      display: flex;
      align-items: center;
      gap: $spacing-md;
      flex: 1;
    }
  }

  &__avatar {
    border: 3px solid rgba(255, 255, 255, 0.3);
    box-shadow: $shadow-medium;
  }

  &__title-section {
    flex: 1;

    h2 {
      margin-bottom: $spacing-xs;

      :deep(.v-theme--light) & {
        color: white;
      }

      :deep(.v-theme--dark) & {
        color: #ffffff;
      }
    }
  }

  &__content {
    padding: $spacing-lg;
    max-height: 60vh;
    overflow-y: auto;

    :deep(.v-theme--light) & {
      background-color: #ffffff;
      color: #1e1e1e;
    }

    :deep(.v-theme--dark) & {
      background-color: #1e1e1e;
      color: #f5f5f5;
    }
  }

  &__loading {
    padding: $spacing-md 0;
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: $spacing-xl;
  }

  &__section {
    h3 {
      display: flex;
      align-items: center;
      font-weight: 600;

      :deep(.v-theme--dark) & {
        color: #f5f5f5;
      }

      :deep(.v-theme--light) & {
        color: #1e1e1e;
      }
    }
  }

  &__list {
    background: transparent;

    .v-list-item {
      border-radius: 8px;
      margin-bottom: $spacing-xs;
      transition: background-color $transition-fast;

      :deep(.v-theme--light) & {
        &:hover {
          background-color: rgba(0, 0, 0, 0.04);
        }
      }

      :deep(.v-theme--dark) & {
        &:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &__address-card,
  &__company-card {
    border-radius: 12px;
    transition: transform $transition-fast;

    :deep(.v-theme--light) & {
      background-color: #f9f9f9;
    }

    :deep(.v-theme--dark) & {
      background-color: #2a2a2a;
    }

    &:hover {
      transform: translateY(-2px);
    }
  }

  &__address {
    p {
      margin: 0;
    }
  }

  &__actions {
    padding: $spacing-md $spacing-lg;

    :deep(.v-theme--light) & {
      background-color: #fafafa;
    }

    :deep(.v-theme--dark) & {
      background-color: #222;
    }
  }
}

// Responsive adjustments
@media (max-width: $mobile) {
  .user-modal {
    &__header {
      padding: $spacing-md;

      &-content {
        gap: $spacing-sm;
      }
    }

    &__content {
      padding: $spacing-md;
    }

    &__details {
      gap: $spacing-lg;
    }

    &__actions {
      padding: $spacing-sm $spacing-md;
      flex-direction: column;
      gap: $spacing-sm;

      .v-btn {
        width: 100%;
      }

      .v-spacer {
        display: none;
      }
    }
  }
}

// Animaciones personalizadas
:deep(.v-dialog-transition-enter-active) {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

:deep(.v-dialog-transition-leave-active) {
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
}

:deep(.v-dialog-transition-enter-from) {
  opacity: 0;
  transform: translateY(50px) scale(0.9);
}

:deep(.v-dialog-transition-leave-to) {
  opacity: 0;
  transform: translateY(-50px) scale(0.9);
}
</style>
