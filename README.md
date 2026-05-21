# FastFood App

Proyecto full stack de portfolio construido con Next.js.

La app simula la operacion de un local de comida rapida con dos caras:
1. Cliente: navegar categorias, armar carrito y crear pedido.
2. Admin: gestionar productos y completar ordenes pendientes.

Tambien tiene modo demo (fallback) para mantener navegabilidad cuando la base externa no responde.

## Demo

- Web: https://fastfooduy.vercel.app
- Flujo cliente: https://fastfooduy.vercel.app/order/cafe
- Admin productos: https://fastfooduy.vercel.app/admin/products
- Admin ordenes: https://fastfooduy.vercel.app/admin/orders

## Stack

- Next.js 15 + React 19 + TypeScript
- Prisma + MongoDB
- Tailwind CSS
- Zustand + SWR
- Zod
- Cloudinary (imagenes)

## Funcionalidades

- Catalogo por categorias y carrito lateral.
- Creacion de orden desde cliente.
- Vista de ordenes listas para retiro.
- Panel admin para productos (crear, editar, buscar).
- Panel admin para completar ordenes.
- Validacion de payloads con Zod.
- Sync entre vistas con SWR + eventos.
- Fallback demo configurable por entorno.

## Arquitectura (resumen)

- UI y rutas: App Router (`app/`)
- Mutaciones de ordenes:
1. `POST /order/api`
2. `POST /admin/orders/api/complete`
- Lectura de ordenes:
1. `GET /admin/orders/api`
2. `GET /orders/api`
- Prisma client compartido en `src/lib/prisma.ts`

## Instalacion local

1. Clonar repo

```bash
git clone https://github.com/leamartinez1707/next-tienda.git
cd next-tienda
```

2. Instalar dependencias

```bash
npm install
```

3. Crear `.env` (puedes copiar `.env.template`)

```bash
DATABASE_URL=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Opcional (default: 8000)
DB_QUERY_TIMEOUT_MS=8000

# Opcional: en produccion queda false por defecto
DEMO_FALLBACK_ENABLED=false

# Opcional: bloqueo basico para demo en rutas /admin (no reemplaza auth real)
ADMIN_BASIC_USER=admin
ADMIN_BASIC_PASSWORD=tu_password_segura
```

4. Generar Prisma Client

```bash
npx prisma generate
```

5. Levantar proyecto

```bash
npm run dev
```

6. Abrir

```text
http://localhost:3000
```

## Scripts

- `npm run dev`: desarrollo
- `npm run build`: build produccion
- `npm run start`: correr build
- `npm run lint`: lint Next.js

## Variables de entorno importantes

- `DATABASE_URL`: conexion MongoDB (obligatoria)
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: cloud name para widget
- `NEXT_PUBLIC_CLOUDINARY_API_KEY`: api key publica para upload widget
- `CLOUDINARY_API_SECRET`: secreto de Cloudinary
- `DB_QUERY_TIMEOUT_MS`: timeout de queries Prisma con fallback de 8000ms
- `DEMO_FALLBACK_ENABLED`: habilita fallback demo (`true/false`)
- `ADMIN_BASIC_USER` y `ADMIN_BASIC_PASSWORD`: usuario admin con acceso total (no se recomienda publicarlo)


### Credenciales de demo para recruiters

La pantalla ` /admin/login ` muestra credenciales demo fijas para facilitar pruebas sin configurar entorno:

- usuario: `demo`
- password: `demo123`

Con este esquema:

- usuario `demo`: puede navegar el admin y completar pedidos, pero no crear/editar productos
- usuario `full`: mantiene acceso total para gestion real

## Nota de produccion (Vercel)

Si en produccion ves errores 500 al crear/listar ordenes, revisa primero variables:
1. `DATABASE_URL` cargada en entorno `Production`.
2. Re-deploy despues de editar variables.
3. Verificar conectividad de MongoDB (red/IP/usuario).

## Estructura base

```text
next-tienda/
├── app/
├── actions/
├── components/
├── prisma/
├── public/
└── src/
```

## Contacto

- Email: leandromartinez.dev@gmail.com
- Portfolio: https://leandromartinez.dev/
- GitHub: https://github.com/leamartinez1707