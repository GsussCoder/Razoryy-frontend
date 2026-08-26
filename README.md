# Razoryy — Frontend

Frontend de **Razoryy**, una plataforma SaaS multi-tenant de gestión de citas y finanzas para barberías. Permite a barberos independientes y barberías con una o varias sucursales administrar su agenda, y a sus clientes reservar citas mediante un enlace público, sin necesidad de llamadas ni mensajes.

**Backend:** [razoryy-backend](https://github.com/GsussCoder/razoryy-backend) · **Demo:** https://razoryy.vercel.app/

---

## Stack

- **React** — interfaz
- **Vercel** — despliegue
- Consume la API REST del [backend en Spring Boot](https://github.com/GsussCoder/razoryy-backend), autenticando con JWT

## Funcionalidades

- Panel de administración para dueños de barbería (`ADMIN`) y barberos (`EMPLOYEE`)
- Vista pública de reserva de citas por tenant, mediante enlace compartible
- Gestión de agenda y disponibilidad de barberos
- Autenticación y manejo de sesión con JWT
- Interfaz adaptada a los distintos roles del sistema (`SUPER_ADMIN`, `ADMIN`, `EMPLOYEE`)

*(En desarrollo: notificaciones automáticas vía WhatsApp)*

## Cómo correrlo localmente

```bash
# Clonar el repositorio
git clone https://github.com/GsussCoder/razoryy-frontend.git
cd razoryy-frontend

# Instalar dependencias
npm install

# Configurar variables de entorno (ver .env.example)
cp .env.example .env

# Levantar en modo desarrollo
npm run dev
```

> Necesitas el [backend](https://github.com/GsussCoder/razoryy-backend) corriendo (local o desplegado) y apuntar la URL de la API en tu `.env` local.

## Estado del proyecto

Funcional y desplegado en producción, en fase de validación de mercado.

## Contacto

¿Buscas un desarrollador frontend/full-stack para tu proyecto? Escríbeme en nadergomezj@gmail.com.
