# Setup Instructions

Follow these steps to get the Product & Order Management System up and running.

## Prerequisites

Make sure you have the following installed:

- PHP 8.2 or higher
- Composer
- Node.js (v18 or higher) & npm
- MySQL or MariaDB
- Git

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd akaarit_practical_task
```

### 2. Backend Setup (Laravel)

#### Install Dependencies

```bash
composer install
```

#### Environment Configuration

```bash
# Copy the environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

#### Configure Database

Open the `.env` file and update the database credentials:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=product_order_db
DB_USERNAME=root
DB_PASSWORD=your_password
```

#### Create Database

Create a new database in MySQL:

```sql
CREATE DATABASE product_order_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Or use your MySQL client/PhpMyAdmin to create it.

#### Run Migrations

```bash
php artisan migrate
```

This will create all required tables:

- users
- products
- orders
- order_items
- cache, jobs (for Laravel functionality)

#### Seed Sample Data

```bash
php artisan db:seed
```

This will create:

- 8 sample products with stock
- 1 test user

#### Start Laravel Development Server

```bash
php artisan serve
```

The backend API will be running at: `http://localhost:8000`

You can test the API by visiting: `http://localhost:8000/api/products`

### 3. Frontend Setup (React + TypeScript)

#### Navigate to Frontend Directory

```bash
cd frontend
```

#### Install Dependencies

```bash
npm install
```

#### Start Development Server

```bash
npm run dev
```

The frontend will be running at: `http://localhost:5173`

### 4. Access the Application

Open your browser and navigate to:

```
http://localhost:5173
```

You should see the Product & Order Management System with navigation links.

## Testing the Application

### 1. View Products

- Click on "Products" in the navigation
- You should see 8 sample products with stock quantities

### 2. Create an Order

- Click on "Create Order"
- Enter a customer name
- Select products and quantities
- Notice the subtotal calculation in real-time
- Click "Create Order"
- The order will be created and stock will be deducted

### 3. View Orders

- Click on "Orders" in the navigation
- You should see all created orders
- Click "View" on any order to see details

### 4. Manage Order Status

- In the order details page, you can:
    - Click "Confirm" to confirm the order
    - Click "Cancel" to cancel the order (stock will be restored)

### 5. Test Edge Cases

- Try ordering more quantity than available stock (should show error)
- Try cancelling an order and check if stock is restored
- Try confirming a cancelled order (should show error)

## API Endpoints

### Products

- `GET /api/products` - List all products
- `POST /api/products` - Create a product
- `GET /api/products/{id}` - Get a product
- `PUT /api/products/{id}` - Update a product
- `DELETE /api/products/{id}` - Delete a product

### Orders

- `GET /api/orders` - List all orders
- `POST /api/orders` - Create an order
- `GET /api/orders/{id}` - Get order details
- `PATCH /api/orders/{id}` - Update order status

## Troubleshooting

### Backend Issues

**Database Connection Error**

- Verify your database credentials in `.env`
- Make sure MySQL is running
- Check if the database exists

**Port 8000 Already in Use**

```bash
php artisan serve --port=8001
```

Don't forget to update the API_BASE_URL in `frontend/src/api.ts`

**CORS Errors**

- Make sure `config/cors.php` exists
- Restart the Laravel server after configuration changes

### Frontend Issues

**Port 5173 Already in Use**

```bash
npm run dev -- --port 5174
```

**API Connection Error**

- Verify Laravel server is running on port 8000
- Check the API_BASE_URL in `frontend/src/api.ts`

**Module Not Found Errors**

```bash
cd frontend
rm -rf node_modules
npm install
```

## Project Structure

```
akaarit_practical_task/
├── app/
│   ├── Http/
│   │   ├── Controllers/Api/
│   │   ├── Requests/
│   │   └── Resources/
│   └── Models/
├── database/
│   ├── migrations/
│   └── seeders/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── api.ts
│   │   ├── types.ts
│   │   └── App.tsx
│   └── package.json
├── routes/
│   └── api.php
└── config/
```

## Next Steps

After successful setup:

1. Review the code architecture
2. Test all features
3. Check the API responses
4. Verify database transactions
5. Test edge cases

## Support

If you encounter any issues, check:

1. Laravel logs: `storage/logs/laravel.log`
2. Browser console for frontend errors
3. Network tab for API requests/responses

## Development Commands

**Backend**

```bash
# Clear cache
php artisan cache:clear
php artisan config:clear

# Run migrations
php artisan migrate:fresh --seed

# View routes
php artisan route:list
```

**Frontend**

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run type-check
```

---

Happy coding! 🚀
