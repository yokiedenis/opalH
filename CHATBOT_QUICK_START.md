# 🚀 Quick Start - Chatbot Setup

## ⚡ 30-Second Setup

### Step 1: Add Tawk.to Property ID to `.env`

Edit `client/.env`:

```env
VITE_TAWK_PROPERTY_ID=YOUR_PROPERTY_ID/YOUR_WIDGET_ID
```

**Example:**

```env
VITE_TAWK_PROPERTY_ID=6835b454756c901912744d16/1is8sgrbb
```

### Step 2: Start Development Server

```bash
cd client
npm run dev
```

### Step 3: Test the Chat

1. Open http://localhost:5173
2. Look for **💬** button in bottom-right corner
3. Click to open chat popup
4. Send a test message

✅ **Done!** Chat is live.

---

## 🎨 What You Get

### Visual Design

- ✨ Luxury gold gradient button
- ✨ Smooth popup animation
- ✨ Pulsing online indicator
- ✨ Mobile responsive
- ✨ Clean modern UI

### Functionality

- 💬 Live customer support 24/7
- 📱 Works on all devices
- 🔐 Secure environment variables
- 🌐 Global availability
- 📊 Full visitor tracking

---

## 🔧 How to Get Your Tawk.to Property ID

1. Go to **https://tawk.to**
2. Sign up or log in
3. Create a new **Property**
4. Go to **Admin → Property Settings**
5. Find your **Property ID** and **Widget ID**
6. Combine them: `PROPERTY_ID/WIDGET_ID`

**Format Example:**

```
1234567890/1hxxxxxxxxxx
```

---

## 📂 Files Involved

```
opalh/
├── client/
│   ├── .env                           ← Add property ID here
│   ├── .env.example                   ← Template
│   └── src/components/
│       ├── ChatBot.jsx                ← Main component
│       ├── ChatBot.css                ← Styling (168 lines)
│       └── Header.jsx                 ← Integration point
├── CHATBOT_INTEGRATION.md             ← Full docs
└── CHATBOT_IMPLEMENTATION_SUMMARY.md  ← What we did
```

---

## ⚙️ Environment Setup

### Development (.env)

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Opal Heights Hotel
VITE_APP_VERSION=1.0.0
VITE_TAWK_PROPERTY_ID=6835b454756c901912744d16/1is8sgrbb
```

### Production

Same format, but add to your hosting platform's environment variables:

- **Vercel:** Project Settings → Environment Variables
- **Netlify:** Build & Deploy → Environment
- **Other:** Hosting provider documentation

---

## 🎯 Testing Commands

```bash
# Development
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Lint
npm run lint
```

---

## 🐛 Troubleshooting

### Chat button not showing?

- ✅ Check `.env` has `VITE_TAWK_PROPERTY_ID`
- ✅ Verify format: `PROPERTY_ID/WIDGET_ID`
- ✅ Clear browser cache
- ✅ Restart dev server

### Chat not responding?

- ✅ Check Tawk.to dashboard (is service online?)
- ✅ Verify property ID is correct
- ✅ Check browser console for errors
- ✅ Ensure CORS enabled on Tawk.to

### Styling issues?

- ✅ Hard refresh: `Ctrl+Shift+R`
- ✅ Clear cache: `npm run build` then test
- ✅ Check CSS file imported in ChatBot component

---

## 📞 Support

- **Tawk.to Help:** https://help.tawk.to/
- **Dashboard:** https://tawk.to/admin/
- **API Docs:** https://docs.tawk.to/api/

---

## ✅ Checklist Before Deploy

- [ ] Added `VITE_TAWK_PROPERTY_ID` to `.env`
- [ ] Tested chat locally with `npm run dev`
- [ ] Chat button appears in bottom-right
- [ ] Can send/receive messages
- [ ] Mobile view works
- [ ] Added env var to production hosting
- [ ] Verified in production deployment

---

**That's it!** Your hotel now has professional 24/7 customer support. 🎉
