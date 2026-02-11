# Shopping Cart API Documentation

## Overview
Complete shopping cart system for food ordering with add, remove, update, and clear functionality.

## Base URL
```
/api/cart
```

## Authentication
All cart endpoints require authentication via JWT token in `Authorization: Bearer <token>` header.

---

## Endpoints

### 1. Get User's Cart
**Endpoint:** `GET /api/cart`
**Description:** Retrieve the current user's shopping cart with all items

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "object_id",
    "userId": "user_id",
    "items": [
      {
        "foodId": "food_id",
        "name": "Pizza",
        "price": 25000,
        "quantity": 2,
        "image": "image_url",
        "description": "Delicious pizza",
        "addedAt": "2026-02-11T10:30:00Z"
      }
    ],
    "totalItems": 2,
    "totalPrice": 50000,
    "createdAt": "2026-02-11T10:00:00Z",
    "updatedAt": "2026-02-11T10:30:00Z"
  },
  "message": "Cart retrieved successfully"
}
```

**Empty Cart Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "items": [],
    "totalItems": 0,
    "totalPrice": 0
  },
  "message": "Cart is empty"
}
```

---

### 2. Add Item to Cart
**Endpoint:** `POST /api/cart/add`
**Description:** Add a food item to the user's cart or increase quantity if already present

**Request Body:**
```json
{
  "foodId": "food_item_id",
  "quantity": 1
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "object_id",
    "userId": "user_id",
    "items": [
      {
        "foodId": "food_id",
        "name": "Pizza",
        "price": 25000,
        "quantity": 1,
        "image": "image_url",
        "description": "Delicious pizza"
      }
    ],
    "totalItems": 1,
    "totalPrice": 25000
  },
  "message": "Item added to cart successfully"
}
```

**Error Responses:**
- 400: Missing foodId
- 404: Food item not found
- 500: Server error

---

### 3. Remove Item from Cart
**Endpoint:** `DELETE /api/cart/remove/:foodId`
**Description:** Remove a specific food item from the cart

**URL Parameters:**
- `foodId` (required): The ID of the food item to remove

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "object_id",
    "userId": "user_id",
    "items": [],
    "totalItems": 0,
    "totalPrice": 0
  },
  "message": "Pizza removed from cart"
}
```

**Error Responses:**
- 400: Missing foodId
- 404: Cart not found or item not found in cart
- 500: Server error

---

### 4. Update Item Quantity
**Endpoint:** `PATCH /api/cart/update/:foodId`
**Description:** Update the quantity of a food item in the cart

**URL Parameters:**
- `foodId` (required): The ID of the food item to update

**Request Body:**
```json
{
  "quantity": 5
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "object_id",
    "userId": "user_id",
    "items": [
      {
        "foodId": "food_id",
        "name": "Pizza",
        "price": 25000,
        "quantity": 5,
        "image": "image_url"
      }
    ],
    "totalItems": 5,
    "totalPrice": 125000
  },
  "message": "Cart item updated successfully"
}
```

**Error Responses:**
- 400: Missing foodId or invalid quantity (< 1)
- 404: Cart not found or item not found in cart
- 500: Server error

---

### 5. Clear Entire Cart
**Endpoint:** `DELETE /api/cart/clear`
**Description:** Remove all items from the user's cart

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "object_id",
    "userId": "user_id",
    "items": [],
    "totalItems": 0,
    "totalPrice": 0
  },
  "message": "Cart cleared successfully"
}
```

**Error Responses:**
- 404: Cart not found
- 500: Server error

---

## Features

### Auto-Calculation
- `totalItems`: Sum of all item quantities
- `totalPrice`: Sum of (price × quantity) for all items
- Calculated automatically on each save via pre-save hook

### Item Structure
Each cart item includes:
- `foodId`: Reference to FoodItem document
- `name`: Food item name
- `price`: Price per unit
- `quantity`: Number of units in cart
- `image`: Food item image URL
- `description`: Food item description
- `addedAt`: Timestamp when item was added/updated

### Unique Cart per User
- One cart per user (userId is unique)
- Automatically created on first add
- Persists until explicitly cleared

---

## Integration with Frontend

### Example Usage (React)

```javascript
// Add to cart
const addToCart = async (foodId) => {
  const response = await fetch('/api/cart/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ foodId, quantity: 1 })
  });
  return response.json();
};

// Get cart
const getCart = async () => {
  const response = await fetch('/api/cart', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};

// Remove item
const removeFromCart = async (foodId) => {
  const response = await fetch(`/api/cart/remove/${foodId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};

// Update quantity
const updateQuantity = async (foodId, quantity) => {
  const response = await fetch(`/api/cart/update/${foodId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ quantity })
  });
  return response.json();
};

// Clear cart
const clearCart = async () => {
  const response = await fetch('/api/cart/clear', {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};
```

---

## Error Handling

All endpoints return errors in the following format:

```json
{
  "success": false,
  "message": "Error description"
}
```

HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request (validation error)
- 404: Not Found
- 500: Server Error

---

## Notes

1. **Authentication Required**: All cart endpoints require a valid JWT token
2. **User-Specific**: Each user has their own isolated cart
3. **Auto-Update**: Total items and total price are automatically calculated
4. **Existing Items**: Adding the same item again increases quantity instead of creating duplicate
5. **Minimum Quantity**: Quantity must be at least 1
