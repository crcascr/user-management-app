<script setup lang="ts">
import type { User } from '@/interfaces'
import { computed } from 'vue'

// Props
interface Props {
  user: User & { avatar: string }
  loading?: boolean
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  compact: false,
})

// Emits
interface Emits {
  'view-more': [user: Props['user']]
  click: [user: Props['user']]
}

const emit = defineEmits<Emits>()

// Computed
const avatarSize = computed(() => (props.compact ? 48 : 64))

// Methods
const handleClick = () => {
  if (!props.loading) {
    emit('click', props.user)
  }
}

const handleViewMore = () => {
  if (!props.loading) {
    emit('view-more', props.user)
  }
}
</script>

<template>
  <v-card
    class="user-card"
    :class="{ 'user-card-loading': loading }"
    elevation="3"
    @click="handleClick"
  >
    <v-card-text class="pa-4">
      <div class="user-card__content">
        <div class="user-card__avatar-section">
          <v-avatar :size="avatarSize" class="user-card__avatar">
            <v-img :src="user.avatar" :alt="`Avatar de ${user.name}`" cover>
              <template #placeholder>
                <v-skeleton-loader type="avatar" />
              </template>
            </v-img>
          </v-avatar>

          <v-badge :content="user.id" color="primary" class="user-card__badge" />
        </div>

        <div class="user-card__info">
          <h3 class="user-card__name text-truncate">
            {{ user.name }}
          </h3>
          <p class="user-card__username text-body-2 text-medium-emphasis">@{{ user.username }}</p>
          <div class="user-card__email">
            <v-icon size="16" class="mr-2">mdi-email</v-icon>
            <span class="text-body-2 text-lowercase">{{ user.email }}</span>
          </div>
        </div>
      </div>
    </v-card-text>

    <v-card-actions class="pa-4 pt-0">
      <v-spacer />
      <v-btn
        color="primary"
        variant="elevated"
        size="small"
        :loading="loading"
        @click.stop="handleViewMore"
      >
        <template #prepend>
          <v-icon>mdi-eye</v-icon>
        </template>
        Ver más
      </v-btn>
    </v-card-actions>

    <v-overlay v-if="loading" contained class="user-card__overlay">
      <v-progress-circular indeterminate color="primary" size="32" />
    </v-overlay>
  </v-card>
</template>

<style lang="scss" scoped>
.user-card {
  cursor: pointer;
  transition: all $transition-normal;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-heavy;

    .user-card__avatar {
      transform: scale(1.05);
    }
  }

  &--loading {
    pointer-events: none;
  }

  &__content {
    display: flex;
    align-items: flex-start;
    gap: $spacing-md;
  }

  &__avatar-section {
    position: relative;
    flex-shrink: 0;
  }

  &__avatar {
    transition: transform $transition-normal;
    border: 3px solid white;
    box-shadow: $shadow-medium;
  }

  &__badge {
    position: absolute;
    top: -8px;
    right: -8px;
  }

  &__info {
    flex: 1;
    min-width: 0;
  }

  &__name {
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: $spacing-xs;
    line-height: 1.3;
  }

  &__username {
    color: #666;
    margin-bottom: $spacing-sm;
  }

  &__email {
    display: flex;
    align-items: center;
    color: #555;
    min-width: 0;

    span {
      min-width: 0;
    }
  }

  &__overlay {
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(2px);
  }
}

// Responsive adjustments
@media (max-width: $mobile) {
  .user-card {
    &__content {
      gap: $spacing-sm;
    }

    &__name {
      font-size: 1.1rem;
    }
  }
}
</style>
