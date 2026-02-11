# 🚀 Quick Start Guide - Opal Heights Hotel

## ⚡ Get Running in 5 Minutes

### 1️⃣ Backend Setup

```powershell
cd server
npm install
copy .env.example .env
# Edit .env with your MongoDB connection
npm run dev
```

Server starts at: `http://localhost:5000`

---

### 2️⃣ Frontend Setup

```powershell
cd client
npm install
npm start
```

App opens at: `http://localhost:3000`

---

## 📋 What's Built

### ✅ Completed Components

- **Header** - Navigation, cart icon, mobile menu
- **Hero Section** - Gorgeous landing banner with CTA buttons
- **Room Showcase** - Display all room types with pricing
- **Food Menu** - Pizza and food items with categories
- **Gallery** - Photo/video gallery with filtering
- **Reviews** - Customer testimonials with ratings
- **Footer** - Contact info, social links, site map

### ✅ Database Models

- Room
- Booking
- FoodItem
- FoodOrder
- Review
- User

### ✅ API Routes (Skeleton)

- `/api/rooms` - Room management
- `/api/bookings` - Booking management
- `/api/food` - Food items
- `/api/orders` - Food orders
- `/api/reviews` - Customer reviews
- `/api/payments` - MoMo Pay
- `/api/users` - User management
- `/api/admin` - Admin dashboard

---

## 🎯 Next Steps

### Priority 1: User-Facing Pages

1. **Rooms Page** - Detailed room listings with availability calendar
2. **Booking Form** - Full booking experience with date picker
3. **Order Cart** - Shopping cart for food orders
4. **Payment Page** - MoMo integration

### Priority 2: Admin Features

1. **Admin Login** - Secure authentication
2. **Dashboard** - View stats, bookings, orders
3. **Management Pages** - Manage rooms, food, reviews

### Priority 3: Integrations

1. **MoMo Pay** - Mobile money payments
2. **WhatsApp** - Order notifications
3. **Email** - Booking confirmations

---

## 🎨 Customization

### Colors

All colors are in `client/src/styles/globals.css` using CSS variables:

```css
--primary-gold: #d4af37 --dark-bg: #1a1a1a --light-bg: #f5f5f5;
```

### Images

Replace placeholders in components with actual images:

```javascript
// Current: placeholder divs
<div className="placeholder">room-single</div>

// To do: actual images
<img src={require('../assets/images/room-single.jpg')} />
```

---

## 📞 Hotel Details

**Opal Heights Hotel**

- 📍 Kabulengwa Road, Yesu Amala
- 📱 +256 700 000 000
- 📧 info@opalhighshotel.com
- 🕐 12 Rooms (6 Single, 6 Double)
- 💰 60K-100K UGX per night

---

## 🆘 Troubleshooting

### MongoDB Connection Error

- Ensure MongoDB is running locally OR use MongoDB Atlas
- Check `MONGODB_URI` in `.env`

### Port 5000 Already in Use

```powershell
# Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Port 3000 Already in Use

```bash
npm start -- --port 3001
```

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Mongoose Documentation](https://mongoosejs.com)

---

**Happy Building! 🎉**
