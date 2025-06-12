# 🚀 Directorio de Usuarios - Vue 3 + TypeScript + Vuetify

Una Single Page Application (SPA) moderna que implementa un directorio interactivo de usuarios con funcionalidades avanzadas de búsqueda y visualización, desarrollada con Vue 3, TypeScript y Vuetify 3.

## ✨ Características Principales

### 🎯 Funcionalidades Core
- 📋 Listado de usuarios con tarjetas interactivas
- 🔍 Búsqueda en tiempo real (nombre, username, email)
- 👁️ Modal detallado de usuario con toda la información
- 📱 Diseño completamente responsive
- 🌗 Tema claro/oscuro

### ⚡ Características Técnicas
- ✅ TypeScript para tipado estático
- ✅ Composables reutilizables (useUsers)
- ✅ Manejo de estados y loading states
- ✅ Interceptores de Axios para errores
- ✅ SCSS con variables y sistema de diseño

## 🛠️ Stack Tecnológico

- **Frontend:** Vue 3 con Composition API
- **UI Framework:** Vuetify 3
- **Lenguaje:** TypeScript
- **Estilos:** SCSS/SASS
- **HTTP Client:** Axios
- **Build Tool:** Vite
- **Iconos:** Material Design Icons

## 📦 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/crcascr/user-management-app.git
cd user-management-app
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar servidor de desarrollo:
```bash
npm run dev
```

4. Construir para producción:
```bash
npm run build
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/      # Componentes reutilizables
├── composables/     # Composables (useUsers)
├── services/        # Servicios HTTP y lógica de negocio
├── interfaces/      # TypeScript interfaces
├── styles/         # Estilos globales y variables
└── views/          # Vistas/páginas de la aplicación
```

## 🎨 Decisiones Técnicas

### Arquitectura
- **Vue 3 + Composition API**: Mejor organización del código y reusabilidad con composables
- **TypeScript**: Tipado estático para prevenir errores y mejorar mantenibilidad
- **Vuetify 3**: Framework UI material design con componentes optimizados

### Patrones y Prácticas
- **Service Layer**: Separación de lógica de negocio en servicios (UserService)
- **Composition API**: Uso de composables para lógica reutilizable
- **Type Safety**: Interfaces TypeScript para modelos de datos
- **Error Handling**: Sistema robusto de manejo de errores con interceptores

### Optimizaciones
- **Lazy Loading**: Carga diferida de componentes grandes
- **Skeleton Loading**: UI mejorada durante estados de carga
- **Debounced Search**: Optimización de búsqueda en tiempo real
- **Responsive Design**: Diseño adaptativo con breakpoints personalizados

## 🚀 Demo

Puedes ver una demo en vivo del proyecto aquí: [Demo Link](https://user-management-app-orpin.vercel.app/)

![Screenshot de la aplicación](image.png)

## 📝 Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Construye para producción
npm run preview  # Vista previa de build
npm run lint     # Ejecuta ESLint
npm run format   # Formatea código con Prettier
```


