# 🏨 Opal Heights Hotel - Hotel Management System

## Overview

**Opal Heights Hotel** is a comprehensive **MERN Stack** (MongoDB, Express, React, Node.js) web application for managing a hotel with integrated food/pizza delivery system, online booking, mobile money payments, and customer reviews.

### 📍 Location

**Kabulengwa Road, Yesu Amala** | Next to Kamapla Kids Primary School

### 🎯 Key Features

✅ **Room Management** - 12 Rooms (6 Single @ 60K UGX, 6 Double @ 80K UGX)  
✅ **Online Booking System** - Guest booking without accounts, flexible date selection  
✅ **Mobile Money Integration** - MTN/Airtel MoMo Pay for secure payments  
✅ **Food & Pizza Delivery** - Integrated restaurant menu with order management  
✅ **Customer Reviews System** - Rate rooms, food, environment, and experience  
✅ **Photo & Video Gallery** - Showcase rooms, facilities, restaurant, and testimonials  
✅ **Admin Dashboard** - Manage bookings, orders, reviews, and hotel operations  
✅ **WhatsApp & Email Notifications** - Booking confirmations and order updates  
✅ **Social Media Integration** - TikTok, Facebook, Instagram links and embeds  
✅ **Contact & Location Map** - Easy guest inquiries and directions  
✅ ** Design** - Gold/Black theme with modern responsive UI

---

## 🚀 Project Structure

```
opalh/
├── server/                 # Backend (Node.js + Express)
│   ├── config/            # Configuration files
│   ├── controllers/       # Business logic (todo)
│   ├── middleware/        # Auth, error handling (todo)
│   ├── models/            # MongoDB schemas
│   │   ├── Room.js
│   │   ├── Booking.js
│   │   ├── FoodItem.js
│   │   ├── FoodOrder.js
│   │   ├── Review.js
│   │   └── User.js
│   ├── routes/            # API endpoints
│   │   ├── roomRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── foodRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── userRoutes.js
│   │   └── adminRoutes.js
│   ├── .env.example       # Environment variables template
│   ├── package.json
│   └── server.js          # Entry point
│
├── client/                 # Frontend (React)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── Header.js & Header.css
│   │   │   ├── Hero.js & Hero.css
│   │   │   ├── RoomShowcase.js & RoomShowcase.css
│   │   │   ├── FoodMenu.js & FoodMenu.css
│   │   │   ├── Gallery.js & Gallery.css
│   │   │   ├── Reviews.js & Reviews.css
│   │   │   └── Footer.js & Footer.css
│   │   ├── pages/         # Page components
│   │   │   └── Home.js
│   │   ├── context/       # React Context (BookingContext)
│   │   ├── assets/        # Images, videos, fonts
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── App.js         # Main component
│   │   ├── index.js       # React entry point
│   │   └── index.css
│   ├── package.json
│   └── .gitignore
│
└── README.md
```

---

## 💻 Installation & Setup

### Prerequisites

- **Node.js** (v14+) and **npm** installed
- **MongoDB** running locally or connection string to MongoDB Atlas
- Code editor (VSCode recommended)

### Backend Setup

1. **Navigate to server directory**

   ```bash
   cd server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file** (copy from `.env.example`)

   ```bash
   copy .env.example .env
   ```

4. **Configure environment variables** in `.env`:

   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/opal-heights-hotel
   JWT_SECRET=your_secure_jwt_secret
   NODE_ENV=development

   # Email configuration
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password

   # MoMo Pay credentials
   MOMO_API_KEY=your_key
   MOMO_PRIMARY_KEY=your_primary_key
   MOMO_USER_ID=your_user_id

   # WhatsApp (Twilio)
   TWILIO_ACCOUNT_SID=your_sid
   TWILIO_AUTH_TOKEN=your_token
   TWILIO_PHONE_NUMBER=+1234567890

   # Admin contact
   ADMIN_EMAIL=admin@opalhighshotel.com
   HOTEL_PHONE=+256700000000
   ```

5. **Start the server**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

> **Note:** This project uses **Vite** (modern React build tool) instead of Create React App for faster builds and better developer experience.

1. **Navigate to client directory**

   ```bash
   cd client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file** (copy from `.env.example`)

   ```bash
   copy .env.example .env
   ```

4. **Configure environment variables** in `.env`:

   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_APP_NAME=Opal Heights Hotel
   ```

5. **Start React development server with Vite**
   ```bash
   npm run dev
   ```
   App runs on `http://localhost:3000` with Hot Module Replacement (HMR)

---

## 📱 API Endpoints

### Rooms

- `GET /api/rooms` - Get all available rooms
- `GET /api/rooms/:id` - Get room details
- `POST /api/rooms` - Create room (admin)
- `PATCH /api/rooms/:id` - Update room (admin)
- `DELETE /api/rooms/:id` - Delete room (admin)

### Bookings

- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get booking details
- `PATCH /api/bookings/:id` - Update booking status

### Food Items

- `GET /api/food` - Get all food items
- `GET /api/food/category/:category` - Get by category
- `POST /api/food` - Create food item (admin)

### Food Orders

- `POST /api/orders` - Create order
- `GET /api/orders` - Get orders
- `PATCH /api/orders/:id` - Update order status

### Reviews

- `GET /api/reviews` - Get approved reviews
- `GET /api/reviews/type/:type` - Get reviews by type
- `POST /api/reviews` - Create review
- `GET /api/reviews/rating/:rating` - Get reviews by rating

### Payments

- `POST /api/payments/initiate` - Initiate MoMo payment
- `POST /api/payments/verify` - Verify payment

### Admin Dashboard

- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/bookings` - Get all bookings
- `GET /api/admin/orders` - Get all orders
- `PATCH /api/admin/reviews/:id/approve` - Approve review

---

## 🎨 Design Features

### Color Scheme

- **Primary Gold**: `#d4af37`
- **Dark Background**: `#1a1a1a`
- **Light Background**: `#f5f5f5`
- **Accent Black**: `#000000`

### Typography

- Modern, professional font stack
- aesthetic with proper spacing
- Responsive text sizing

### Components

#### Header

- Sticky navigation bar
- Mobile-responsive hamburger menu
- Shopping cart icon with item count
- Admin access link
- Logo with hotel branding

#### Hero Section

- Full-width background banner
- Hotel name and location
- Call-to-action buttons (Book Room, Order Food)
- Statistics display
- Smooth animations

#### Room Showcase

- Grid layout with room cards
- Room type, price, amenities, and capacity
- Hover effects and smooth transitions
- "Book Now" buttons
- Mock image placeholders

#### Food Menu

- Category filtering (Pizza, Meals, Drinks, Desserts, Breakfast)
- Food item cards with images and prices
- "Add to Cart" functionality
- Star ratings
- Contact information

#### Gallery

- Image/video gallery with filtering
- Lightbox modal for enlarged viewing
- Categories: Rooms, Facilities, Restaurant, Bar, Testimonials
- Video play button overlay
- Responsive grid

#### Reviews Section

- Customer testimonials with ratings
- Multiple review types (Room, Food, Environment, Experience)
- Star ratings display
- Guest names and dates
- Dark background with gold accents

#### Footer

- Comprehensive contact information
- Location details
- Social media links
- Quick links navigation
- Services listing
- Copyright and legal links

---

## 🔧 Technology Stack

### Frontend

- **React 18** - UI library
- **React Router v6** - Navigation
- **Axios** - HTTP client
- **React Icons** - Icon library
- **CSS3** - Styling with flexbox and grid
- **Responsive Design** - Mobile-first approach

### Backend

- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM
- **JWT** - Authentication (future)
- **Bcryptjs** - Password hashing (future)
- **Nodemailer** - Email sending
- **CORS** - Cross-origin requests
- **Multer** - File uploads

### Integrations

- **MoMo Pay** - Mobile money payments
- **Twilio** - WhatsApp notifications
- **Nodemailer** - Email confirmations
- **TikTok** - Social media embeds
- **Google Maps** - Location mapping

---

## 📋 TODO / Development Phases

### Phase 1: Core Features (Complete ✅)

- ✅ Project setup
- ✅ Database models
- ✅ Frontend components
- ✅ API routes skeleton
- ✅ Global styling

### Phase 2: Authentication & Booking

- [ ] User authentication (JWT)
- [ ] Booking form with date picker
- [ ] Room availability checking
- [ ] Booking confirmation emails
- [ ] Admin login

### Phase 3: Payments & Orders

- [ ] MoMo Pay integration
- [ ] Food order cart system
- [ ] Order tracking
- [ ] Payment verification

### Phase 4: Notifications & Admin

- [ ] WhatsApp notifications (Twilio)
- [ ] Email confirmations
- [ ] Admin dashboard
- [ ] Review approval system

### Phase 5: Advanced Features

- [ ] Real-time notifications
- [ ] Image upload system
- [ ] Video integration
- [ ] Analytics & reporting

---

## 📸 Screenshots / Pages to Build

### Frontend Pages to Create

1. **Home** ✅ (Done - all sections on one page)
2. **Rooms** - Detailed room listings with filters
3. **Food** - Full food menu and ordering
4. **Gallery** - Expandable photo/video gallery
5. **Reviews** - All reviews with filtering
6. **Booking** - Booking form and confirmation
7. **Admin Dashboard** - Management interface
8. **Cart** - Shopping cart for food orders
9. **Contact** - Contact form and location map
10. **About** - Hotel information

---

## 🌐 Environment Variables Required

```env
# Server Configuration
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/opal-heights-hotel

# Authentication
JWT_SECRET=your_jwt_secret_key_here

# Email (Gmail App Password)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# MoMo Pay Integration
MOMO_API_KEY=your_momo_api_key
MOMO_PRIMARY_KEY=your_momo_primary_key
MOMO_USER_ID=your_momo_user_id

# WhatsApp (Twilio)
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Firebase (for real-time)
FIREBASE_API_KEY=your_api_key
FIREBASE_PROJECT_ID=your_project_id

# Admin Contact
ADMIN_EMAIL=admin@opalhighshotel.com
HOTEL_PHONE=+256700000000
```

---

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

```bash
npm run build
# Deploy the build folder to Vercel or Netlify
```

### Backend Deployment (Heroku/Railway)

```bash
# Set environment variables on hosting platform
git push heroku main
```

### Database

- Use MongoDB Atlas for cloud database
- Create clusters and connection strings

---

## 📝 Room Pricing

| Room Type         | Price       | Capacity | Features                              |
| ----------------- | ----------- | -------- | ------------------------------------- |
| Single Room       | 60,000 UGX  | 1 guest  | WiFi, AC, TV, Private Bath            |
| Double Room       | 80,000 UGX  | 2 guests | WiFi, AC, Large TV, Shower & Tub      |
| Breakfast Package | 100,000 UGX | 2 guests | Room + Full Breakfast, Fruits & Juice |

---

## 🍕 Food Menu Categories

- **Pizza** - Pepperoni, Margherita, Vegetarian
- **Meals** - Burgers, Grilled Chicken, Local Dishes
- **Drinks** - Fresh Juices, Soft Drinks, Smoothies
- **Desserts** - Cakes, Ice Cream, Fresh Fruits
- **Breakfast** - Full breakfast packages with fruits

---

## 📞 Contact Information

- **Hotel Phone**: +256 700 000 000
- **Email**: info@opalhighshotel.com
- **Location**: Kabulengwa Road, Yesu Amala, Uganda
- **Social Media**: @opalhighshotel (TikTok, Facebook, Instagram)

---

## 📄 License

This project is proprietary to Opal Heights Hotel. All rights reserved.

---

## 👨‍💻 Developer Notes

### Best Practices Followed

- Clean separation of concerns (components, pages, routes)
- Reusable component architecture
- Responsive mobile-first design
- Consistent styling with CSS variables
- Semantic HTML structure
- Accessibility considerations
- Performance optimization

### Future Enhancements

- [ ] Progressive Web App (PWA)
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Booking calendar
- [ ] Loyalty program
- [ ] Real-time chat support
- [ ] Mobile app (React Native)

---

**Built with ❤️ for Opal Heights Hotel**
hotel system
starting out, i wanted to test my ai prompt engineering skills, using copilot it has taken me

# prompt one

    ``` work with me, am building a web app for a hotel management system in a teck stack and am torn between mern stack and html css and vanilla javascript, below are my system requirememnts
    pizza or food delivery and dispaly,booking of hotle rooms and pictures and videos of rooms, contact us mixed with about us show pices as affordable and give range of 60k to one houdred thousand ugx where 60k for single and 80k for double and one hundred thousand for the break fast option, add menuwith images ad videos from tiktok, more on pictures add laid beds, surrrounding views, lounges pictures, rooof top plants, resturant, sitting areas,a nice served meal with fruits or juice, satified customers, reviews, good english, something that will attract the eyes like  i dont want to iss this place, show botttle for bar, ask me follow up questions for design of website ```

# prompt two follow up questions

      gold/black, budget-friendly, boutique, Opal hieghts hotel, located in yesu amala, on kabulengwa road next to kamapla kids primary school,

    integrate momo pay
    book as guests
    create admin dashboard to manage bookings
    we have twelve rooms 6 single and six doubles

    yes i have existing photos and videos, and i willll create lots more,
    link socials including tiktok, embed and link

    yes i want a simple customer review syetm of comments
    Beautiful photo/video gallery
    Easy room booking
    Food/pizza delivery system
    Customer reviews & testimonials
    Contact form & location map

    food system integrated into one
    customer should leave general related reivews and display the reviews basedd on rooms nad food and ennvironment, experience,

    yes focus on whatsapp notifications and emails for confrimation purposes, or information flow system,
    just the website.
