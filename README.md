# SIGECHIP_lite

Sistema integral para la gestión e identificación de mascotas mediante tecnología RFID. Este proyecto consta de tres componentes principales: Backend API REST, Frontend Angular y Sistema de Lectura RFID.

## 📋 Descripción General

SIGECHIP_lite es una solución completa para el registro, identificación y gestión de mascotas a través de tarjetas RFID. Permite a los propietarios registrar sus mascotas, gestionar su información y facilitar la identificación en caso de pérdida.

## 🏗️ Arquitectura del Proyecto

```
SIGECHIP_lite/
├── SigechipBackend/         # API REST en .NET Core con Clean Architecture
├── SigechipFrontend/        # Aplicación Angular con PrimeNG
├── SigechipLectorRFID/      # Sistema de lectura RFID
├── DataBase/                # Scripts y modelo de base de datos
├── .github/                 # Configuración CI/CD
└── README.md               # Documentación principal
```

## 🔧 Tecnologías Utilizadas

### Backend
- **.NET Core 8.0** - Framework principal
- **Entity Framework Core** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos principal
- **JWT Bearer Authentication** - Autenticación y autorización
- **Swagger/OpenAPI** - Documentación de API
- **Clean Architecture** - Patrón arquitectónico

### Frontend
- **Angular 18** - Framework principal
- **PrimeNG 17.18.8** - Librería de componentes UI
- **PrimeFlex** - Sistema de grid y utilidades CSS
- **Bootstrap Icons** - Iconografía
- **AngularX QR Code** - Generación de códigos QR
- **TypeScript** - Lenguaje de programación
- **SCSS** - Preprocesador CSS

### Base de Datos
- **PostgreSQL** - Sistema de gestión de base de datos relacional

---

## 🏛️ BACKEND - SigechipBackend

### Arquitectura Clean Architecture

#### 📁 **sigechip.API** - Capa de Presentación
Contiene los controladores que exponen los endpoints REST.

**Controladores disponibles:**
- `AuthController.cs` - Autenticación y autorización JWT
- `MascotaController.cs` - CRUD completo de mascotas
- `PropietarioController.cs` - Gestión de propietarios
- `TarjetaController.cs` - Administración de tarjetas RFID
- `EspecieController.cs` - Catálogo de especies
- `RazaController.cs` - Catálogo de razas por especie
- `GeneroController.cs` - Catálogo de géneros
- `TipoDocumentoController.cs` - Tipos de documentos de identidad
- `BaseController.cs` - Controlador base con funcionalidades comunes

**Configuración:**
- `Program.cs` - Configuración principal, DI, CORS, JWT, Swagger
- `appsettings.json` - Configuración de la aplicación

#### 📁 **sigechip.Core.Domain** - Capa de Dominio
Contiene las entidades del negocio y contratos principales.

**Entidades:**
- `Mascota.cs` - Entidad principal para información de mascotas
- `Propietario.cs` - Información de propietarios de mascotas
- `Tarjeta.cs` - Tarjetas RFID asociadas a mascotas
- `Especie.cs` - Catálogo de especies (Perro, Gato, etc.)
- `Raza.cs` - Razas específicas por especie
- `Genero.cs` - Género de las mascotas (Macho, Hembra)
- `TipoDocumento.cs` - Tipos de documento (CC, CE, TI, etc.)

**Interfaces:**
- Contratos de repositorios para cada entidad
- Interfaces de servicios de dominio

#### 📁 **sigechip.Core.Application** - Capa de Aplicación
Lógica de negocio y casos de uso.

**Servicios:**
- Servicios de aplicación para cada entidad
- DTOs para transferencia de datos
- Interfaces de servicios

**DTOs disponibles:**
- Data Transfer Objects para todas las entidades
- ViewModels para presentación

#### 📁 **sigechip.Infrastructure** - Capa de Infraestructura
Implementación de persistencia y servicios externos.

**Persistence:**
- `AplicationDbContext` - Contexto de Entity Framework
- Configuraciones de entidades
- Migraciones

**Repositories:**
- `GenericRepository<T>` - Repositorio genérico base
- Repositorios específicos para cada entidad
- Implementación de patrones Repository y Unit of Work

### 🔐 Autenticación y Seguridad

- **JWT Bearer Token** - Autenticación basada en tokens
- **CORS** configurado para frontend específico
- **Swagger con autenticación** integrada
- **Validación de modelos** automática

### 📡 API Endpoints

#### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/refresh` - Renovar token

#### Mascotas
- `GET /api/mascota` - Listar todas las mascotas
- `GET /api/mascota/{id}` - Obtener mascota por ID
- `POST /api/mascota` - Crear nueva mascota
- `PUT /api/mascota/{id}` - Actualizar mascota
- `DELETE /api/mascota/{id}` - Eliminar mascota

#### Propietarios
- `GET /api/propietario` - Listar propietarios
- `GET /api/propietario/{id}` - Obtener propietario por ID
- `POST /api/propietario` - Crear propietario
- `PUT /api/propietario/{id}` - Actualizar propietario
- `DELETE /api/propietario/{id}` - Eliminar propietario

#### Tarjetas RFID
- `GET /api/tarjeta` - Listar tarjetas
- `GET /api/tarjeta/{id}` - Obtener tarjeta por ID
- `POST /api/tarjeta` - Registrar nueva tarjeta
- `PUT /api/tarjeta/{id}` - Actualizar tarjeta

#### Catálogos
- `GET /api/especie` - Listar especies
- `GET /api/raza` - Listar razas
- `GET /api/genero` - Listar géneros
- `GET /api/tipodocumento` - Listar tipos de documento

---

## 🎨 FRONTEND - SigechipFrontend

### Estructura de Componentes

#### 📁 **Pages** - Páginas principales
- `login-page/` - Página de inicio de sesión
- `register-page/` - Registro de nuevos usuarios
- `dashboard-page/` - Panel principal del sistema
- `pet-page/` - Gestión de mascotas
- `pet-detail-page/` - Detalle individual de mascota
- `user-page/` - Perfil de usuario
- `card-rfid-page/` - Gestión de tarjetas RFID
- `contact-page/` - Página de contacto
- `forgot-password-page/` - Recuperación de contraseña
- `notfound/` - Página de error 404

#### 📁 **Components** - Componentes reutilizables
- `layout/` - Componentes de estructura (header, sidebar, footer)
- `pet-search/` - Buscador de mascotas
- `qr-code/` - Generador de códigos QR

#### 📁 **Services** - Servicios Angular
- `auth.service.ts` - Servicio de autenticación
- `mascota.service.ts` - Gestión de mascotas
- `propietario.service.ts` - Gestión de propietarios
- `tarjeta.service.ts` - Gestión de tarjetas RFID
- `especie.service.ts` - Servicio de especies
- `raza.service.ts` - Servicio de razas
- `genero.service.ts` - Servicio de géneros
- `tipo-documento.service.ts` - Servicio tipos de documento
- `banner.service.ts` - Gestión de banners y notificaciones

#### 📁 **Models** - Modelos TypeScript
- Interfaces TypeScript para todas las entidades
- DTOs para comunicación con API

#### 📁 **Guards** - Guardias de ruta
- Protección de rutas autenticadas
- Validaciones de permisos

#### 📁 **Interceptors** - Interceptores HTTP
- Interceptor de autenticación JWT
- Manejo de errores HTTP

#### 📁 **Shared** - Componentes compartidos
- Componentes comunes reutilizables
- Utilidades compartidas

#### 📁 **Controls, Directives, Pipes**
- Controles personalizados
- Directivas específicas del dominio
- Pipes para formateo de datos

### 🎯 Funcionalidades Principales

#### Autenticación
- Login con JWT
- Registro de usuarios
- Recuperación de contraseña
- Gestión de sesiones

#### Gestión de Mascotas
- Registro completo de mascotas
- Edición de información
- Búsqueda y filtrado
- Galería de fotos
- Generación de códigos QR

#### Gestión de Propietarios
- Registro de propietarios
- Actualización de datos de contacto
- Vinculación con mascotas

#### Tarjetas RFID
- Asociación de tarjetas con mascotas
- Lectura de códigos RFID
- Gestión de tarjetas activas/inactivas

#### Reportes y Visualización
- Dashboard con estadísticas
- Reportes de mascotas registradas
- Visualización de datos

### 🚦 Routing
Configurado en `app.routes.ts` con:
- Rutas protegidas por autenticación
- Lazy loading de módulos
- Guardias de navegación
- Resolvers para precarga de datos

---

## 🏷️ LECTOR RFID - SigechipLectorRFID

### Descripción
Componente dedicado para la lectura y gestión de tarjetas RFID físicas.

**Funcionalidades esperadas:**
- Lectura de tarjetas RFID
- Comunicación con backend para validación
- Interface de hardware RFID
- Logging de lecturas

---

## 🗄️ BASE DE DATOS - DataBase

### Modelo de Datos

#### Tablas Principales

**mascota**
- `id` (PK, Serial) - Identificador único
- `id_propietario` (FK) - Referencia al propietario
- `tipo_documento` (FK) - Tipo de documento de la mascota
- `documento` (Unique) - Número de documento único
- `nombre` - Nombre de la mascota
- `id_especie` (FK) - Especie (perro, gato, etc.)
- `id_raza` (FK) - Raza específica
- `id_genero` (FK) - Género (macho, hembra)
- `fecha_nacimiento` - Fecha de nacimiento
- `peso` - Peso en kilogramos
- `foto` - URL o path de la foto
- `descripcion` - Descripción adicional
- `activo` - Estado activo/inactivo
- `fecha_creacion` - Timestamp de creación
- `fecha_actualizacion` - Timestamp de última actualización

**propietario**
- `id` (PK, Serial) - Identificador único
- `tipo_documento` (FK) - Tipo de documento
- `documento` (Unique) - Número de documento único
- `nombre` - Nombres del propietario
- `apellido` - Apellidos del propietario
- `celular` - Número de celular
- `email` - Correo electrónico
- `activo` - Estado activo/inactivo

**Tablas de Catálogo:**
- `tipo_documento` - CC, CE, TI, Pasaporte, etc.
- `especie` - Perro, Gato, Ave, etc.
- `raza` - Razas específicas por especie
- `genero` - Macho, Hembra

#### Relaciones
- Una mascota pertenece a un propietario (1:N)
- Una mascota tiene una especie específica (N:1)
- Una especie tiene múltiples razas (1:N)
- Una mascota tiene un género (N:1)
- Propietarios y mascotas tienen tipos de documento (N:1)

### Scripts Disponibles
- `ScriptInicial.sql` - Creación de tablas y relaciones
- `modeloEntidadRelacion.pdf` - Diagrama ER completo

---

## 🚀 Instalación y Configuración

### Prerrequisitos
- .NET 8.0 SDK
- Node.js 18+ y npm
- PostgreSQL 12+
- Angular CLI 18

### Backend
```bash
cd SigechipBackend
dotnet restore
dotnet build
dotnet run --project sigechip.API
```

### Frontend
```bash
cd SigechipFrontend
npm install
ng serve
```

### Base de Datos
```sql
-- Ejecutar ScriptInicial.sql en PostgreSQL
psql -U usuario -d sigechip_db -f DataBase/ScriptInicial.sql
```

## 🔧 Configuración de Entorno

### Backend - appsettings.json
```json
{
  "ConnectionStrings": {
    "Postgres": "Host=localhost;Database=sigechip_db;Username=usuario;Password=password"
  },
  "JwtSettings": {
    "SecretKey": "tu_clave_secreta_jwt",
    "Issuer": "SigechipAPI",
    "Audience": "SigechipFrontend"
  },
  "CorsSettings": {
    "AllowedOrigin": "http://localhost:4200"
  }
}
```

### Frontend - environment.ts
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7001/api'
};
```

## 📚 Documentación API

Una vez ejecutado el backend, la documentación Swagger estará disponible en:
`https://localhost:7001/swagger`

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para la nueva funcionalidad
3. Hacer commit de los cambios
4. Push a la rama
5. Crear un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

## 👥 Autores

- **Equipo SIGECHIP** - Desarrollo inicial

## 🆘 Soporte

Para soporte técnico o reportar bugs, crear un issue en el repositorio o contactar al equipo de desarrollo.