# API Testing Guide

This guide provides examples for testing all API endpoints using curl, Postman, or any HTTP client.

## Base URL

```
http://localhost:8000/api
```

---

## Products API

### 1. Get All Products

**Request:**

```bash
curl -X GET http://localhost:8000/api/products
```

**Response (200 OK):**

```json
{
    "data": [
        {
            "id": 1,
            "name": "Laptop",
            "sku": "LAP-001",
            "price": "999.99",
            "stock_quantity": 50,
            "created_at": "2026-02-25T10:00:00.000000Z",
            "updated_at": "2026-02-25T10:00:00.000000Z"
        },
        {
            "id": 2,
            "name": "Mouse",
            "sku": "MOU-001",
            "price": "29.99",
            "stock_quantity": 200,
            "created_at": "2026-02-25T10:00:00.000000Z",
            "updated_at": "2026-02-25T10:00:00.000000Z"
        }
    ]
}
```

---

### 2. Create Product

**Request:**

```bash
curl -X POST http://localhost:8000/api/products \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Wireless Keyboard",
    "sku": "KEY-002",
    "price": 89.99,
    "stock_quantity": 75
  }'
```

**Response (201 Created):**

```json
{
    "data": {
        "id": 9,
        "name": "Wireless Keyboard",
        "sku": "KEY-002",
        "price": "89.99",
        "stock_quantity": 75,
        "created_at": "2026-02-25T12:30:00.000000Z",
        "updated_at": "2026-02-25T12:30:00.000000Z"
    }
}
```

**Validation Error (422 Unprocessable Entity):**

```json
{
    "message": "The sku has already been taken.",
    "errors": {
        "sku": ["The sku has already been taken."]
    }
}
```

---

### 3. Get Single Product

**Request:**

```bash
curl -X GET http://localhost:8000/api/products/1
```

**Response (200 OK):**

```json
{
    "data": {
        "id": 1,
        "name": "Laptop",
        "sku": "LAP-001",
        "price": "999.99",
        "stock_quantity": 50,
        "created_at": "2026-02-25T10:00:00.000000Z",
        "updated_at": "2026-02-25T10:00:00.000000Z"
    }
}
```

---

### 4. Update Product

**Request:**

```bash
curl -X PUT http://localhost:8000/api/products/1 \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Gaming Laptop",
    "price": 1299.99
  }'
```

**Response (200 OK):**

```json
{
    "data": {
        "id": 1,
        "name": "Gaming Laptop",
        "sku": "LAP-001",
        "price": "1299.99",
        "stock_quantity": 50,
        "created_at": "2026-02-25T10:00:00.000000Z",
        "updated_at": "2026-02-25T13:00:00.000000Z"
    }
}
```

---

### 5. Delete Product

**Request:**

```bash
curl -X DELETE http://localhost:8000/api/products/1
```

**Response (204 No Content):**

```
(empty response body)
```

---

## Orders API

### 1. Get All Orders

**Request:**

```bash
curl -X GET http://localhost:8000/api/orders
```

**Response (200 OK):**

```json
{
    "data": [
        {
            "id": 1,
            "customer_name": "John Doe",
            "total_amount": "1059.97",
            "status": "pending",
            "created_at": "2026-02-25T11:00:00.000000Z",
            "updated_at": "2026-02-25T11:00:00.000000Z",
            "items": [
                {
                    "id": 1,
                    "product": {
                        "id": 1,
                        "name": "Laptop",
                        "sku": "LAP-001",
                        "price": "999.99",
                        "stock_quantity": 49
                    },
                    "product_id": 1,
                    "quantity": 1,
                    "unit_price": "999.99",
                    "subtotal": "999.99"
                },
                {
                    "id": 2,
                    "product": {
                        "id": 2,
                        "name": "Mouse",
                        "sku": "MOU-001",
                        "price": "29.99",
                        "stock_quantity": 198
                    },
                    "product_id": 2,
                    "quantity": 2,
                    "unit_price": "29.99",
                    "subtotal": "59.98"
                }
            ]
        }
    ]
}
```

---

### 2. Create Order

**Request:**

```bash
curl -X POST http://localhost:8000/api/orders \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "customer_name": "Jane Smith",
    "items": [
      {
        "product_id": 1,
        "quantity": 2
      },
      {
        "product_id": 3,
        "quantity": 1
      }
    ]
  }'
```

**Response (201 Created):**

```json
{
    "data": {
        "id": 2,
        "customer_name": "Jane Smith",
        "total_amount": "2079.97",
        "status": "pending",
        "created_at": "2026-02-25T14:00:00.000000Z",
        "updated_at": "2026-02-25T14:00:00.000000Z",
        "items": [
            {
                "id": 3,
                "product": {
                    "id": 1,
                    "name": "Laptop",
                    "sku": "LAP-001",
                    "price": "999.99",
                    "stock_quantity": 47
                },
                "product_id": 1,
                "quantity": 2,
                "unit_price": "999.99",
                "subtotal": "1999.98"
            },
            {
                "id": 4,
                "product": {
                    "id": 3,
                    "name": "Keyboard",
                    "sku": "KEY-001",
                    "price": "79.99",
                    "stock_quantity": 149
                },
                "product_id": 3,
                "quantity": 1,
                "unit_price": "79.99",
                "subtotal": "79.99"
            }
        ]
    }
}
```

**Insufficient Stock Error (422 Unprocessable Entity):**

```json
{
    "message": "The items field is invalid",
    "errors": {
        "items": ["Insufficient stock for product Laptop. Available: 5"]
    }
}
```

---

### 3. Get Single Order

**Request:**

```bash
curl -X GET http://localhost:8000/api/orders/1
```

**Response (200 OK):**

```json
{
    "data": {
        "id": 1,
        "customer_name": "John Doe",
        "total_amount": "1059.97",
        "status": "pending",
        "created_at": "2026-02-25T11:00:00.000000Z",
        "updated_at": "2026-02-25T11:00:00.000000Z",
        "items": [
            {
                "id": 1,
                "product": {
                    "id": 1,
                    "name": "Laptop",
                    "sku": "LAP-001",
                    "price": "999.99",
                    "stock_quantity": 49
                },
                "product_id": 1,
                "quantity": 1,
                "unit_price": "999.99",
                "subtotal": "999.99"
            },
            {
                "id": 2,
                "product": {
                    "id": 2,
                    "name": "Mouse",
                    "sku": "MOU-001",
                    "price": "29.99",
                    "stock_quantity": 198
                },
                "product_id": 2,
                "quantity": 2,
                "unit_price": "29.99",
                "subtotal": "59.98"
            }
        ]
    }
}
```

---

### 4. Update Order Status (Confirm)

**Request:**

```bash
curl -X PATCH http://localhost:8000/api/orders/1 \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "status": "confirmed"
  }'
```

**Response (200 OK):**

```json
{
  "data": {
    "id": 1,
    "customer_name": "John Doe",
    "total_amount": "1059.97",
    "status": "confirmed",
    "created_at": "2026-02-25T11:00:00.000000Z",
    "updated_at": "2026-02-25T14:30:00.000000Z",
    "items": [...]
  }
}
```

---

### 5. Update Order Status (Cancel)

**Request:**

```bash
curl -X PATCH http://localhost:8000/api/orders/1 \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "status": "cancelled"
  }'
```

**Response (200 OK):**

```json
{
  "data": {
    "id": 1,
    "customer_name": "John Doe",
    "total_amount": "1059.97",
    "status": "cancelled",
    "created_at": "2026-02-25T11:00:00.000000Z",
    "updated_at": "2026-02-25T15:00:00.000000Z",
    "items": [...]
  }
}
```

**Note:** Stock will be restored automatically when status is changed to "cancelled".

---

### 6. Invalid Status Transition Error

**Request:** (Try to reopen a cancelled order)

```bash
curl -X PATCH http://localhost:8000/api/orders/1 \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "status": "confirmed"
  }'
```

**Response (422 Unprocessable Entity):**

```json
{
    "message": "The status field is invalid",
    "errors": {
        "status": ["Cancelled orders cannot be re-opened."]
    }
}
```

---

## Test Scenarios

### Scenario 1: Complete Order Flow

```bash
# 1. View available products
curl -X GET http://localhost:8000/api/products

# 2. Create an order
curl -X POST http://localhost:8000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"customer_name": "Test User", "items": [{"product_id": 1, "quantity": 2}]}'

# 3. Check stock was deducted
curl -X GET http://localhost:8000/api/products/1

# 4. View order details
curl -X GET http://localhost:8000/api/orders/1

# 5. Confirm the order
curl -X PATCH http://localhost:8000/api/orders/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "confirmed"}'
```

### Scenario 2: Insufficient Stock

```bash
# 1. Check product stock
curl -X GET http://localhost:8000/api/products/1

# 2. Try to order more than available (should fail)
curl -X POST http://localhost:8000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"customer_name": "Test User", "items": [{"product_id": 1, "quantity": 999999}]}'
```

### Scenario 3: Stock Restoration

```bash
# 1. Create an order
curl -X POST http://localhost:8000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"customer_name": "Test User", "items": [{"product_id": 2, "quantity": 5}]}'

# 2. Check stock was deducted
curl -X GET http://localhost:8000/api/products/2

# 3. Cancel the order
curl -X PATCH http://localhost:8000/api/orders/2 \
  -H "Content-Type: application/json" \
  -d '{"status": "cancelled"}'

# 4. Check stock was restored
curl -X GET http://localhost:8000/api/products/2
```

---

## Postman Collection

### Environment Variables

```
base_url: http://localhost:8000/api
```

### Import this JSON into Postman:

```json
{
    "info": {
        "name": "Product & Order Management API",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": [
        {
            "name": "Products",
            "item": [
                {
                    "name": "Get All Products",
                    "request": {
                        "method": "GET",
                        "url": "{{base_url}}/products"
                    }
                },
                {
                    "name": "Create Product",
                    "request": {
                        "method": "POST",
                        "url": "{{base_url}}/products",
                        "body": {
                            "mode": "raw",
                            "raw": "{\n  \"name\": \"Test Product\",\n  \"sku\": \"TEST-001\",\n  \"price\": 99.99,\n  \"stock_quantity\": 100\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        }
                    }
                },
                {
                    "name": "Get Single Product",
                    "request": {
                        "method": "GET",
                        "url": "{{base_url}}/products/1"
                    }
                },
                {
                    "name": "Update Product",
                    "request": {
                        "method": "PUT",
                        "url": "{{base_url}}/products/1",
                        "body": {
                            "mode": "raw",
                            "raw": "{\n  \"name\": \"Updated Product\",\n  \"price\": 199.99\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        }
                    }
                },
                {
                    "name": "Delete Product",
                    "request": {
                        "method": "DELETE",
                        "url": "{{base_url}}/products/1"
                    }
                }
            ]
        },
        {
            "name": "Orders",
            "item": [
                {
                    "name": "Get All Orders",
                    "request": {
                        "method": "GET",
                        "url": "{{base_url}}/orders"
                    }
                },
                {
                    "name": "Create Order",
                    "request": {
                        "method": "POST",
                        "url": "{{base_url}}/orders",
                        "body": {
                            "mode": "raw",
                            "raw": "{\n  \"customer_name\": \"John Doe\",\n  \"items\": [\n    {\n      \"product_id\": 1,\n      \"quantity\": 2\n    },\n    {\n      \"product_id\": 2,\n      \"quantity\": 1\n    }\n  ]\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        }
                    }
                },
                {
                    "name": "Get Single Order",
                    "request": {
                        "method": "GET",
                        "url": "{{base_url}}/orders/1"
                    }
                },
                {
                    "name": "Confirm Order",
                    "request": {
                        "method": "PATCH",
                        "url": "{{base_url}}/orders/1",
                        "body": {
                            "mode": "raw",
                            "raw": "{\n  \"status\": \"confirmed\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        }
                    }
                },
                {
                    "name": "Cancel Order",
                    "request": {
                        "method": "PATCH",
                        "url": "{{base_url}}/orders/1",
                        "body": {
                            "mode": "raw",
                            "raw": "{\n  \"status\": \"cancelled\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        }
                    }
                }
            ]
        }
    ]
}
```

---

## Status Codes

| Code | Meaning               | When                       |
| ---- | --------------------- | -------------------------- |
| 200  | OK                    | Successful GET, PUT, PATCH |
| 201  | Created               | Successful POST            |
| 204  | No Content            | Successful DELETE          |
| 404  | Not Found             | Resource doesn't exist     |
| 422  | Unprocessable Entity  | Validation failed          |
| 500  | Internal Server Error | Server error               |

---

## Common Issues & Solutions

### CORS Error

**Problem:** Browser blocks requests  
**Solution:** Ensure Laravel server is running and CORS is configured in `config/cors.php`

### 404 Not Found on API Routes

**Problem:** Routes not accessible  
**Solution:** Ensure `php artisan serve` is running and check `routes/api.php`

### Validation Errors

**Problem:** 422 with validation messages  
**Solution:** Check the `errors` object in response for specific field errors

### Connection Refused

**Problem:** Can't connect to API  
**Solution:** Make sure Laravel development server is running on port 8000

---

Happy Testing! 🚀
