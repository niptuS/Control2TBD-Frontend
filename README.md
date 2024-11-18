# control2

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

# Pasos para ejecutar el frontend:
- Asegurar que nodejs está instalado.
- Asegurar que el backend esté en ejecución en el puerto 8090.
- Ejecutar ```npm install ``` en la carpeta con este repositorio.
- Asegurar que no haya otro proceso en ejecución usando el puerto 3000.
- Ejecutar ```npm run dev ``` en la carpeta con este repositorio.

# Cómo se realizó la implementación
1. Crear 'index.js' para definir rutas a Controllers del backend.
2. Crear archivos 'notifier.js', 'task.js', 'user.js' para manejar CRUD con entidades de la base de datos.
3. Crear archivos 'auth.js' y 'authStorage.js' para manejar el registro de usuario e interacciones con usuarios que necesitan autorización (ej. crear una tarea).
4. Crear Componentes de estructura (Home, SideBar, Footer, Header).
5. Crear Componentes para registro de usuario (Register, Login, Profile).
6. Crear Componentes para gestión de tareas, búsqueda por filtro, notificaciones (CreateTaskForm, EditTaskForm, TaskList).
