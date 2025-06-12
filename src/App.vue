<script setup lang="ts">
import { useTheme } from 'vuetify'
import { computed, ref } from 'vue'

// Theme
const theme = useTheme()

// Local state

const showInfo = ref(false)
const snackbar = ref({
  show: false,
  message: '',
  color: 'success',
  timeout: 3000,
})

// Computed
const themeIcon = computed(() =>
  theme.global.name.value === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night',
)

// Methods
const toggleTheme = () => {
  theme.global.name.value = theme.global.name.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-app>
    <!-- App bar -->
    <v-app-bar elevation="2" color="primary" dark app>
      <v-app-bar-title class="app-title">
        <v-icon class="mr-2" size="28">mdi-account-group</v-icon>
        <span class="font-weight-bold">User Manager</span>
      </v-app-bar-title>
      <v-spacer />

      <!-- Theme toggle -->
      <v-btn icon @click="toggleTheme">
        <v-icon>{{ themeIcon }}</v-icon>
      </v-btn>

      <!-- Info button -->
      <v-btn icon @click="showInfo = true">
        <v-icon>mdi-information</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Main content -->
    <v-main>
      <router-view />
    </v-main>

    <!-- Footer -->
    <v-footer color="grey-lighten-3" class="text-center pa-6">
      <div class="footer-content">
        <p class="text-body-2 text-medium-emphasis mb-3">
          Desarrollado con ❤️ por
          <a
            href="https://www.linkedin.com/in/crcascr"
            target="_blank"
            rel="noopener noreferrer"
            class="font-weight-medium text-primary"
          >
            Cristian Castillo
          </a>
          usando Vue 3 + TypeScript + Vuetify 3
        </p>

        <div class="footer-links d-flex justify-center flex-wrap">
          <v-chip size="small" variant="outlined" class="ma-1">
            <v-icon start>mdi-vuejs</v-icon>
            Vue 3
          </v-chip>
          <v-chip size="small" variant="outlined" class="ma-1">
            <v-icon start>mdi-language-typescript</v-icon>
            TypeScript
          </v-chip>
          <v-chip size="small" variant="outlined" class="ma-1">
            <v-icon start>mdi-material-design</v-icon>
            Vuetify 3
          </v-chip>
          <v-chip
            size="small"
            variant="outlined"
            class="ma-1"
            href="https://github.com/crcascr"
            target="_blank"
          >
            <v-icon start>mdi-github</v-icon>
            GitHub
          </v-chip>
          <v-chip
            size="small"
            variant="outlined"
            class="ma-1"
            href="https://www.linkedin.com/in/crcascr"
            target="_blank"
          >
            <v-icon start>mdi-linkedin</v-icon>
            LinkedIn
          </v-chip>
        </div>
      </div>
    </v-footer>

    <!-- Dialogo de información -->
    <v-dialog v-model="showInfo" max-width="500">
      <v-card>
        <v-card-title class="text-h5 text-primary">
          <v-icon class="mr-2">mdi-information</v-icon>
          Información del proyecto
        </v-card-title>

        <v-card-text>
          <p class="text-body-1 mb-3">
            Esta aplicación es una prueba técnica que demuestra el uso de:
          </p>

          <v-list density="compact">
            <v-list-item>
              <template #prepend>
                <v-icon color="success">mdi-check</v-icon>
              </template>
              <v-list-item-title>Vue 3 Composition API</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <template #prepend>
                <v-icon color="success">mdi-check</v-icon>
              </template>
              <v-list-item-title>TypeScript</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <template #prepend>
                <v-icon color="success">mdi-check</v-icon>
              </template>
              <v-list-item-title>Vuetify 3</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <template #prepend>
                <v-icon color="success">mdi-check</v-icon>
              </template>
              <v-list-item-title>Diseño Responsive</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <template #prepend>
                <v-icon color="success">mdi-check</v-icon>
              </template>
              <v-list-item-title>Consumo de APIs</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <template #prepend>
                <v-icon color="success">mdi-check</v-icon>
              </template>
              <v-list-item-title>Manejo de estados</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" variant="elevated" @click="showInfo = false"> Entendido </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar de notificaciones -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
      location="top"
    >
      {{ snackbar.message }}

      <template #actions>
        <v-btn variant="text" @click="snackbar.show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<style lang="scss" scoped>
.app-title {
  display: flex;
  align-items: center;
  font-size: 1.25rem;
}

.footer-content {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.footer-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: $spacing-xs;
}

// Responsive adjustments
@media (max-width: $mobile) {
  .app-title {
    font-size: 1.1rem;

    span {
      display: none;
    }
  }

  .footer-content {
    p {
      font-size: 0.875rem;
    }
  }
}
</style>
