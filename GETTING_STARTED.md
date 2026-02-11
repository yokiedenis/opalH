# ⚡ GETTING STARTED - Run Opal Heights Hotel Website

**Complete setup in 6 steps (15 minutes)**

---

## Quick Setup

### 1️⃣ Install Frontend Dependencies

```bash
cd client
npm install
```

### 2️⃣ Install Backend Dependencies

```bash
cd ../server
npm install
```

### 3️⃣ Create Environment Files

**Backend (`server/.env`):**

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/opal-heights-hotel
JWT_SECRET=your_secret_key_here
NODE_ENV=development
ADMIN_EMAIL=admin@opalhighshotel.com
HOTEL_PHONE=+256700000000
```

**Frontend (`client/.env`):**

```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Opal Heights Hotel
```

### 4️⃣ Start MongoDB

```bash
mongod
```

(Or update `MONGODB_URI` in `.env` to use MongoDB Atlas)

### 5️⃣ Start Backend (Terminal 1)

```bash
cd server
npm run dev
```

Expected: `Server running on http://localhost:5000`

### 6️⃣ Start Frontend (Terminal 2)

```bash
cd client
npm run dev
```

Expected: Opens `http://localhost:3000` in your browser! 🎉

---

## What You'll See

✨ **Luxury Gold & Black Theme**

- Professional hotel website with modern design
- 8 fully functional React components
- Responsive mobile/tablet/desktop layout
- Hot Module Replacement (HMR) - changes appear instantly

---

## Testing

### Test Backend API

```bash
curl http://localhost:5000/api/rooms
```

Should return: `{"success":true,"data":[],"message":"Rooms fetched successfully"}`

### Test Frontend

- Click navigation menu items
- Scroll to see sections (Hero, Rooms, Food, Gallery, Reviews, Contact)
- Resize browser to test responsive design (F12)
- Changes to files appear instantly (thanks to Vite!)

---

## Common Issues

| Issue                   | Fix                                                         |
| ----------------------- | ----------------------------------------------------------- |
| `npm install` fails     | `npm cache clean --force` then retry                        |
| Port 3000 in use        | Change port in `vite.config.js` or kill process             |
| MongoDB fails           | Run `mongod` or use MongoDB Atlas connection string         |
| API requests fail       | Check backend running on 5000 & `VITE_API_BASE_URL` correct |
| Old packages still used | Delete `node_modules` and `package-lock.json`, reinstall    |

---

## File Structure

```
client/
├── src/
│   ├── components/        # 8 React components (Header, Hero, Rooms, etc.)
│   ├── App.jsx           # Main app
│   ├── main.jsx          # Vite entry point
│   └── styles/globals.css # Luxury theme (gold/black)
├── vite.config.js        # Vite configuration
└── package.json          # Dependencies

server/
├── routes/               # 8 API endpoint files
├── models/              # 6 MongoDB schemas
├── server.js            # Express app
└── package.json         # Dependencies
```

---

## Available Commands

```bash
# Frontend
cd client
npm run dev      # Start dev server with HMR
npm run build    # Production build
npm run preview  # Preview production build

# Backend
cd server
npm run dev      # Start server with nodemon
npm run start    # Start server
```

---

## Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Frontend | React 18.3.1 + Vite 5               |
| Backend  | Node.js + Express.js                |
| Database | MongoDB (local or Atlas)            |
| Styling  | CSS3 + CSS Variables (luxury theme) |
| HTTP     | Axios + REST API                    |

---

## What's Ready

✅ Full website design with 8 components  
✅ API structure with 8 routes  
✅ Database models (6 schemas)  
✅ Luxury responsive design  
✅ Vite dev environment with HMR  
✅ Backend/frontend communication setup

---

## Next: Add Features

After verifying everything works, check **NEXT_STEPS.md** for:

- Connecting to MongoDB
- Building booking page
- Implementing food orders
- Setting up payment integration
- Creating admin dashboard

---

## 📞 Hotel Info

**Opal Heights Hotel**  
🏠 Kabulengwa Road, Yesu Amala  
📞 +256700000000  
💰 Rooms: 60K-100K UGX | 12 rooms (6 single, 6 double)

---

**Got stuck?** Check detailed guides:

- `QUICKSTART.md` - Full quickstart
- `VITE_SETUP_GUIDE.md` - Vite migration details
- `README.md` - Complete overview
- `IMPLEMENTATION_GUIDE.md` - Development walkthrough
