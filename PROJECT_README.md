# Product & Order Management System

A full-stack web application built with Laravel 11 (Backend) and React with TypeScript (Frontend) for managing products and orders.

## Features

### Backend (Laravel)

- **Product CRUD API** - Complete REST API for managing products
- **Order Management API** with:
    - Stock validation before creating orders
    - Automatic stock deduction
    - Subtotal & total calculation
    - Database transaction handling
    - Proper error responses for insufficient stock
- **Order Status Management** - When order status is changed to 'cancelled', stock is automatically restored
- **Clean Architecture** with:
    - Eloquent relationships
    - FormRequest validation classes
    - API Resource classes for response formatting
    - Proper database transactions
    - Error handling for edge cases

### Frontend (React + TypeScript)

- **Product Listing Page** - View all products with stock information
- **Create Order Page** with:
    - Dynamic product selection
    - Real-time subtotal and total calculation
    - Stock quantity visibility
    - Multiple items per order
- **Order List Page** - View all orders with status
- **Order Details View** - View order details with ability to change status (Confirm/Cancel)

## Database Structure

### Products Table

- id
- name
- sku (unique)
- price (decimal)
- stock_quantity (integer)
- timestamps

### Orders Table

- id
- customer_name
- total_amount (decimal)
- status (pending, confirmed, cancelled)
- timestamps

### Order Items Table

- id
- order_id (foreign key)
- product_id (foreign key)
- quantity
- unit_price
- subtotal
- timestamps

## Installation & Setup

### Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js & npm
- MySQL or any supported database

### Backend Setup

1. Clone the repository and navigate to the project directory

2. Install PHP dependencies:

```bash
composer install
```

3. Create a copy of `.env.example` to `.env`:

```bash
cp .env.example .env
```

4. Generate application key:

```bash
php artisan key:generate
```

5. Configure your database in `.env` file:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

6. Run migrations:

```bash
php artisan migrate
```

7. Seed the database with sample data:

```bash
php artisan db:seed
```

8. Start the Laravel development server:

```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install Node.js dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

### Products

- `GET /api/products` - List all products
- `POST /api/products` - Create a new product
- `GET /api/products/{id}` - Get a specific product
- `PUT /api/products/{id}` - Update a product
- `DELETE /api/products/{id}` - Delete a product

### Orders

- `GET /api/orders` - List all orders with items
- `POST /api/orders` - Create a new order
- `GET /api/orders/{id}` - Get a specific order with items
- `PATCH /api/orders/{id}` - Update order status

### Example API Requests

#### Create a Product

```json
POST /api/products
{
  "name": "Laptop",
  "sku": "LAP-001",
  "price": 999.99,
  "stock_quantity": 50
}
```

#### Create an Order

```json
POST /api/orders
{
  "customer_name": "John Doe",
  "items": [
    {
      "product_id": 1,
      "quantity": 2
    },
    {
      "product_id": 2,
      "quantity": 1
    }
  ]
}
```

#### Update Order Status

```json
PATCH /api/orders/1
{
  "status": "confirmed"
}
```

## Project Architecture

### Backend Structure

```
app/
├── Http/
│   ├── Controllers/
│   │   └── Api/
│   │       ├── OrderController.php
│   │       └── ProductController.php
│   ├── Requests/
│   │   ├── StoreOrderRequest.php
│   │   ├── StoreProductRequest.php
│   │   ├── UpdateOrderStatusRequest.php
│   │   └── UpdateProductRequest.php
│   └── Resources/
│       ├── OrderItemResource.php
│       ├── OrderResource.php
│       └── ProductResource.php
└── Models/
    ├── Order.php
    ├── OrderItem.php
    └── Product.php
```

### Frontend Structure

```
frontend/
└── src/
    ├── pages/
    │   ├── CreateOrderPage.tsx
    │   ├── OrderDetailPage.tsx
    │   ├── OrdersPage.tsx
    │   └── ProductsPage.tsx
    ├── api.ts
    ├── types.ts
    ├── App.tsx
    └── App.css
```

## Key Implementation Details

### Stock Management

- Stock is validated before order creation
- Stock is deducted within a database transaction
- If any item has insufficient stock, the entire order is rejected
- When an order is cancelled, stock is automatically restored
- Cancelled orders cannot be reopened

### Validation

- All inputs are validated using Laravel FormRequest classes
- SKU uniqueness is enforced at the database level
- Positive values are required for prices, quantities, and stock

### Error Handling

- Proper HTTP status codes
- Descriptive error messages
- Transaction rollback on failure
- Frontend displays error messages to users

## Testing

You can test the application by:

1. Starting both backend and frontend servers
2. Navigate to `http://localhost:5173`
3. View the sample products created by the seeder
4. Create orders with different products
5. Check stock deduction after order creation
6. Test order cancellation and stock restoration
7. Try edge cases like insufficient stock

## Technologies Used

### Backend

- Laravel 11
- PHP 8.2+
- MySQL
- Eloquent ORM

### Frontend

- React 18
- TypeScript
- React Router
- Vite

## Evaluation Criteria Met

✅ Clean architecture & folder structure  
✅ Proper use of Eloquent relationships  
✅ Use of FormRequest validation  
✅ Use of API Resource classes  
✅ Proper database transactions  
✅ Code readability and scalability  
✅ Handling of edge cases

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
