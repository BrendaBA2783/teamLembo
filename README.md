Autores del proyecto lembo:[Brenda Bedoya Arenas - Laura Cortés - Jacobo Murillo]

👤 Autor:[Edwar Velasquez]
📧 Email: ricoprogramar@gmail.com
🔗 LinkedIn: linkedin.com/in/tuusuario
🐙 GitHub: github.com/The-Mechatronic
🤖 Pag. Web: ricoprogramar.com

# Mi Proyecto

## Descripción
Este proyecto es un aplicativo web para el lembo de santa rosa. (Mejorar descripcion)

## Estructura del Proyecto

```
/teamLembo
│-- /backend/                # Todo el backend organizado aquí
│   │-- server.js            # Punto de entrada del servidor
│   │-- /config/             # Configuración del proyecto
│   │   ├── db.js            # Conexión a la base de datos
│   │-- /routes/             # Rutas de la API
│   │   ├── registerRoutes.js         # Rutas para usuarios
│   │   ├── sensorsRoutes.js       # Rutas para sensores
│   │   ├── contactRoutes.js       # Rutas para contacto
│   │   ├── servicesRoutes.js      # Rutas para servicios
│   │-- /controllers/        # Lógica de las rutas (controladores)
│   │   ├── registerController.js
│   │   ├── sensorsController.js
│   │   ├── contactController.js
│   │   ├── servicesController.js
│   │-- /models/             # Modelos de la base de datos
│   │   ├── registerModel.js
│   │   ├── sensorsModel.js
│   │   ├── contacModel.js
│   │   ├── servicesModel.js
│   │-- /middlewares/        # Middlewares (autenticación, logs, validaciones)
│   │   ├── user-validacion.js
│   │-- /utils/              # Utilidades y funciones reutilizables
│   │   ├── helpers.js
│   │-- package.json         # Dependencias del backend
│   │-- .env                 # Variables de entorno (credenciales, puertos, etc.)
│
│-- /frontend/               # Todo el frontend organizado aquí
│   │-- /public/             # Archivos estáticos (CSS, JS, imágenes)
│   │   ├── /css/            # Carpeta de estilos
│   │   │-- user/                              # Carpeta para un archivo css unico de usuario
│   │   │   ├── register-credentials.css       # Estilos de la vista de credenciales de usuario
│   │   │-- index.css                              # Archivo principal que contiene los estilos del primer home
│   │   │-- login.css                              # Archivo que contiene los estilos del login
│   │   │-- styles-general.css                         # Archivo principal que contiene los estilos generales
│   │   │-- home-before.css                            # Archivo que contiene los estilos del home depués de iniciar sesión
│   │   │-- id-enable-disable.css                      # Archivo que contiene los estilos para la solicitud de id para habilitar y deshabilitar
│   │   │-- id-update-visualise.css                         # Archivo que contiene los estilos de solicitud de id para actualizar y visualizar
│   │   │-- form-update-register.css                        # Archivo que contiene los estilos generales de los formularios actualizar y registrar
│   │   │-- table.css                                       # Archivo que contiene los estilos generales para las tablas
│   │   │-- visualise.css                                   # Archivo que contiene los estilos generales para visualizar asociaciones
│   │   │-- enable-disable.css                              # Archivo que contiene los estilos generales para habilitar y deshabilitar elemento
│   │   │-- recover-password.css                            # Archivo que contiene los estilos para las vistas de recuperar contraseña
│   │   │-- confirm-update-register-enable-disable.css      # Estilos para la ventana de confirmación de acciones
│   │   │-- pages/
│   │   │   ├── home.css         # Estilos de la página de inicio
│   │   │   ├── register.css     # Estilos de la página de registro
│   │   │   ├── sensors.css      # Estilos de la página de sensores
│   │   │   ├── contact.css      # Estilos de la página de contacto
│   │   │   ├── services.css     # Estilos de la página de servicios
│   │   │-- themes/
│   │   │   ├── dark-mode.css    # Tema oscuro
│   │   │   ├── light-mode.css   # Tema claro
│   │   ├── /js/                 # Scripts frontend
│   │   ├── /img/                # Imágenes
│   │-- /views/                  # Vistas HTML
│   │   ├── index.html  
│   │   ├── register.html
│   │   ├── sensors.html
│   │   ├── contact.html
│   │   ├── services.html
│   │   ├── /components/     # Componentes reutilizables
│   │   │   ├── navbar.html  # Navbar
│   │   │   ├── footer.html  # Footer
│   │   │   ├── sidebar.html # Sidebar
│   │-- package.json         # Dependencias del frontend (si usas npm para frontend)
│   |-- /json/  
│-- /database/               # Archivos relacionados con la base de datos
│   │-- esquema.sql          # Script SQL para crear la base de datos
│   │-- datos_prueba.sql     # Datos de prueba
│
│-- /tests/                  # Pruebas unitarias y de integración
│   │-- backend.test.js      # Pruebas del backend
│   │-- frontend.test.js     # Pruebas del frontend
│
│-- .gitignore               # Archivos y carpetas a ignorar en Git
│-- README.md                # Documentación del proyecto
```
## Descripción detallada estructura
📂 /backend/
Aquí va toda la lógica del servidor.

server.js → Punto de entrada del backend.
/config/ → Contiene la configuración del servidor y la base de datos.
/routes/ → Define las rutas de la API.
/controllers/ → Aquí va la lógica de negocio de cada ruta.
/models/ → Define cómo se estructuran los datos en la base de datos.
/middlewares/ → Contiene autenticación, validaciones, logs, etc.
/utils/ → Funciones de utilidad para no repetir código.

📂 /frontend/
Aquí va todo lo relacionado con la interfaz de usuario.

/public/ → Contiene CSS, JS y archivos estáticos.
/views/ → Aquí van los archivos HTML.
    /components/  → Componentes reutilizables

📂 /database/
Aquí guardamos archivos relacionados con la base de datos.

esquema.sql → Script SQL para crear las tablas.
datos_prueba.sql → Datos de prueba para hacer test.

📂 /tests/
Aquí van las pruebas automatizadas del backend y frontend.

## Instalación

### Requisitos previos
- Node.js superior a la 18 y npm
- Workbench 8.0
- Base de datos (MySQL)

### Creación del servidor y configuraciones
- mkdir proyecto-mysql # Crea una carpeta para tu proyecto y accede a ella desde la terminal:
- cd proyecto-mysql

- npm init -y # Inicializa un proyecto de Node.js:

- npm install express mysql2 cors dotenv # Instala las dependencias necesarias:

- cp .env.example .env  # Configurar variables de entorno

- node backend/server.js # Realizar conexión con la BD

### Clonar el repositorio
```sh
git clone https://github.com/The-Mechatronic/PlantillaEstructuraProyecto.git
cd mi-proyecto
```
### Configuración del Frontend
```sh
cd frontend
npm install
npm start  # Iniciar el servidor de desarrollo
```

## Uso
- Acceder a la API en `http://localhost:3000`
- Acceder a la interfaz en `http://localhost:8080`
- puerto 3306 || 3400

## Pruebas
Ejecutar pruebas unitarias y de integración:
```sh
cd tests
npm test
```

## Contribución
1. Hacer un fork del repositorio (crear una copia del repositorio en tu propia cuenta.)
2. Crear una rama (`feature-nueva`)
3. Realizar cambios y hacer commit
4. Crear un pull request

## Flujo 
Resumen del Flujo
Frontend o cliente envía una petición HTTP (Ej: GET /api/user)
El servidor (server.js) la recibe y la dirige a la ruta correcta (routes/user.js)
La ruta (users.js) llama al controlador (usersController.js)
El controlador ejecuta la lógica y llama al modelo (usersModel.js)
El modelo consulta la base de datos (db.js)
El resultado viaja de regreso: Modelo → Controlador → Ruta → Servidor → Cliente

📜 Licencia
Creative Commons Attribution 4.0	CC-BY-4.0
https://creativecommons.org/licenses/by/4.0/
