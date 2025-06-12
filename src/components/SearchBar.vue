<script setup lang="ts">
import { computed, watch } from 'vue'

// Props
interface Props {
  modelValue: string
  loading?: boolean
  disabled?: boolean
  resultCount?: number
  totalCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  disabled: false,
  resultCount: 0,
  totalCount: 0,
})

// Emits
interface Emits {
  'update:modelValue': [value: string]
  search: [query: string]
  clear: []
}

const emit = defineEmits<Emits>()

// Computed
const searchQuery = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value || ''),
})

const hasResults = computed(() => props.resultCount > 0)

const resultsText = computed(() => {
  if (!searchQuery.value) return ''

  if (props.resultCount === 0) {
    return 'Sin resultados'
  } else if (props.resultCount === 1) {
    return '1 usuario encontrado'
  } else {
    return `${props.resultCount} usuarios encontrados`
  }
})

// Methods
const handleSearch = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('search', target.value || '')
}

const handleClear = () => {
  emit('clear')
}

// Watchers
watch(
  () => props.modelValue,
  (newValue) => {
    if (!newValue) {
      emit('clear')
    }
  },
)
</script>

<template>
  <v-card class="search-bar-card" elevation="2">
    <v-card-text>
      <v-text-field
        v-model="searchQuery"
        :loading="loading"
        :disabled="disabled"
        prepend-inner-icon="mdi-magnify"
        label="Buscar usuarios..."
        variant="outlined"
        density="comfortable"
        clearable
        hide-details
        class="search-input"
        @input="handleSearch"
        @click:clear="handleClear"
      >
        <template #append-inner>
          <v-fade-transition>
            <v-icon v-if="searchQuery" :color="hasResults ? 'success' : 'warning'" size="small">
              {{ hasResults ? 'mdi-check-circle' : 'mdi-alert-circle' }}
            </v-icon>
          </v-fade-transition>
        </template>
      </v-text-field>
    </v-card-text>

    <v-card-text v-if="searchQuery && !loading" class="pt-0">
      <v-chip
        :color="hasResults ? 'success' : 'warning'"
        variant="tonal"
        size="small"
        class="results-chip"
      >
        <template #prepend>
          <v-icon size="16">
            {{ hasResults ? 'mdi-account-check' : 'mdi-account-search' }}
          </v-icon>
        </template>
        {{ resultsText }}
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
.search-bar-card {
  margin-bottom: $spacing-lg;
  border-radius: 16px;

  .v-theme--light & {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #1e1e1e;

    .v-field {
      background-color: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 16px;
    }

    .v-field--focused {
      background-color: white;
    }

    .v-field__input {
      color: #1e1e1e;
    }

    .v-label {
      color: rgba(0, 0, 0, 0.6);
    }

    .v-field__prepend-inner {
      color: #666;
    }
  }

  // Tema oscuro
  .v-theme--dark & {
    background: linear-gradient(135deg, #2c3e50 0%, #4a148c 100%);
    color: white;

    .v-field {
      background-color: rgba(30, 30, 30, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 16px;
    }

    .v-field--focused {
      background-color: #2e2e2e;
    }

    .v-field__input {
      color: #ffffff;
    }

    .v-label {
      color: rgba(255, 255, 255, 0.7);
    }

    .v-field__prepend-inner {
      color: rgba(255, 255, 255, 0.5);
    }
  }
}

.search-input {
  :deep(.v-field__outline) {
    --v-field-border-opacity: 0.3;
  }

  :deep(.v-field--focused .v-field__outline) {
    --v-field-border-opacity: 1;
  }
}

.results-chip {
  transition: all $transition-normal;

  &:hover {
    transform: translateY(-1px);
  }
}
</style>
