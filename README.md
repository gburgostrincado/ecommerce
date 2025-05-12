# E-Commerce API Backend

## Descripción

Este proyecto es un backend para una aplicación de comercio electrónico desarrollada con Express.js, Sequelize y PostgreSQL. La API permite gestionar productos, carritos de compra, procesar pagos mediante Stripe y manejar reembolsos totales o parciales.

## Tecnologías

- **Node.js**: Entorno de ejecución
- **Express.js**: Framework para el desarrollo de API RESTful
- **Sequelize**: ORM para PostgreSQL
- **PostgreSQL**: Base de datos relacional
- **Stripe**: Plataforma de procesamiento de pagos

## Requisitos previos

- Node.js (v14 o superior)
- PostgreSQL (v12 o superior)
- Cuenta de Stripe (para la configuración de las claves API)

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd backend
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   - Crear un archivo `.env` en la raíz del proyecto
   ```
   PORT=4000
   DB_USERNAME=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=ecommerce_db
   DB_HOST=localhost
   STRIPE_SECRET_KEY=sk_test_...
   ```

4. Configurar la base de datos:
   ```bash
   npx sequelize-cli db:create
   npx sequelize-cli db:migrate
   ```

5. Cargar datos semilla de productos:
   ```bash
   npx sequelize-cli db:seed:all
   ```

## Endpoints API

### Productos

- `GET /api/v1/products` - Obtener todos los productos
- `GET /api/v1/products/:id` - Obtener un producto específico

### Pagos y Checkout

- `POST /api/v1/payment` - Iniciar proceso de pago

### Órdenes

- `GET /api/v1/orders` - Obtener todas las órdenes
- `GET /api/v1/orders/:id` - Obtener una orden específica
- `POST /api/v1/orders/` - Crear una nueva orden

### Reembolsos

- `POST /api/v1/orders/:id/refund` - Realizar un reembolso total o parcial

## Configuración de Stripe

Para procesar pagos y reembolsos, necesitarás:

1. Configurar tu cuenta de Stripe y obtener las claves API

## Ejecución

Para iniciar el servidor:

```bash
npm run dev     # Modo desarrollo con nodemon
```

o

```bash
npm start       # Modo producción
```

El servidor estará disponible en `http://localhost:4000` (o el puerto definido en tu archivo .env).

## Scripts disponibles

- `npm run dev`: Inicia el servidor en modo desarrollo
- `npm start`: Inicia el servidor en modo producción

## Flujo de trabajo de pagos

1. El cliente añade productos al carrito
2. Al hacer checkout, el backend crea una sesión de pago en Stripe
3. El cliente debe ingresar sus datos de pago en el frontend
4. Después del pago, Stripe notifica al backend mediante webhook
5. El backend crea una orden completada y vacía el carrito

## Flujo de trabajo de reembolsos

1. El cliente solicita un reembolso total o parcial para una orden
2. El backend procesa el reembolso
3. Se actualiza el estado de la orden en la base de datos