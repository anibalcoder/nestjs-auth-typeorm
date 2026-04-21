<div align="center">
  <p>
    <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  </p>

  <h1>🔐 Auth API</h1>
  <p>Autenticación segura con verificación por código y JWT</p>
</div>

---

## 🧩 Descripción

Esta API implementa un **flujo de autenticación seguro en dos pasos**:

1. El usuario envía sus credenciales
2. Se genera y envía un **código de verificación por email**
3. El código se valida para completar la autenticación

Una vez verificado, se emite un **JWT (JSON Web Token)** que se utiliza para:

- 🔒 Proteger rutas.
- 🛡️ Gestionar autorización basada en roles.

---

## 📚 Documentación

La API está completamente documentada con **Swagger**, lo que permite:

- Explorar endpoints fácilmente.
- Probar requests desde el navegador.
- Visualizar esquemas de request/response.

> [!IMPORTANT]
> Una vez levantado el proyecto, la documentación estará disponible en: http://localhost:3000/api

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/anibalcoder/nestjs-auth-typeorm.git
cd nestjs-auth-typeorm
```

### 2. Crear el archivo de variables de entorno

Copiar el archivo `.env.template` y renombrarlo a `.env`.

```bash
cp .env.template .env
```

### 3. Instala las dependencias

```bash
pnpm install
```

### 4. Instalar Nest CLI (si no lo tienes)

```bash
pnpm add -g @nestjs/cli
```

### 5. Levantar la base de datos con Docker

```bash
docker-compose up -d
```

### 6. **Ejecutar la aplicación en modo desarrollo**

```bash
pnpm start:dev
```