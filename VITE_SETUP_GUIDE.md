# 🚀 Vite + React Setup Guide

## What Changed?

We've upgraded from Create React App (deprecated 2025) to **Vite** - the modern, fast build tool!

### Benefits of Vite:

- ⚡ **10x faster** build and dev server
- 🔄 **Instant HMR** (Hot Module Replacement)
- 📦 **Optimized production builds**
- 🎯 **ES modules** throughout
- 💨 **Lightning-fast startup**

## Installation & Setup

### Step 1: Install Dependencies

```bash
cd client
npm install
```

This will install:

- React 18.3.1 (latest)
- Vite 5 (latest)
- React Router v6
- All other packages

### Step 2: Create .env File

```bash
copy .env.example .env
```

Edit `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Opal Heights Hotel
```

### Step 3: Start Development Server

```bash
npm run dev
```

Opens at: http://localhost:3000

### Step 4: Build for Production

```bash
npm run build
```

Optimized build created in `dist/` folder

### Step 5: Preview Production Build

```bash
npm run preview
```

## File Structure Changes

**Old (Create React App):**

```
src/
├── index.js          (entry point)
└── index.css
```

**New (Vite):**

```
src/
├── main.jsx          (entry point)
├── App.jsx           (React components use .jsx)
└── styles/
    └── globals.css
```

### Important:

- Entry point is now `main.jsx` (not `index.js`)
- React component files should use `.jsx` extension
- CSS files stay as `.css`

## Key Files Added

1. **vite.config.js** - Vite configuration
2. **main.jsx** - New entry point
3. **eslint.config.js** - ESLint configuration
4. **.env.example** - Environment variables template

## Key Files Updated

1. **package.json** - Updated dependencies and scripts
2. **index.html** - Added `<script type="module">` tag

## Environment Variables in Vite

All env variables must start with `VITE_` to be exposed to client:

```javascript
// Accessing in code:
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const appName = import.meta.env.VITE_APP_NAME;
```

### Example `.env` for development:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Opal Heights Hotel
VITE_DEBUG=true
```

## Component File Extensions

Update your component imports to use `.jsx`:

```javascript
// Old (still works, but not recommended)
import App from "./App.js";

// New (recommended for Vite)
import App from "./App.jsx";
```

However, for this project we kept `.js` for consistency. Both work in Vite!

## Development Server

```bash
npm run dev
```

Features:

- ⚡ Instant server start
- 🔄 Hot Module Replacement (HMR)
- 🎯 Fast refresh
- 📊 Build progress in terminal

## Production Build

```bash
npm run build
```

Creates optimized `dist/` folder with:

- Minified code
- Optimized assets
- Source maps (optional)
- Code splitting

## Linting

```bash
npm run lint
```

Checks code quality using ESLint

## Deployment

### Frontend Deployment

**Vercel** (recommended):

```bash
npm run build
# Deploy dist/ folder to Vercel
```

**Netlify**:

```bash
# Connect GitHub, set build command to: npm run build
# Set publish directory to: dist
```

**Docker**:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## Troubleshooting

### Error: "Cannot find module '@vitejs/plugin-react'"

**Solution:**

```bash
npm install
```

### Port 3000 already in use

**Solution:** Update `vite.config.js`:

```javascript
server: {
  port: 3001,  // Change to different port
  open: true
}
```

### Assets not loading in build

**Solution:** Ensure assets are imported, not hardcoded paths:

```javascript
// ✅ Correct
import logo from './assets/logo.png'
<img src={logo} />

// ❌ Wrong
<img src="./assets/logo.png" />
```

### Hot reload not working

**Solution:** Check `vite.config.js` has React plugin:

```javascript
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```

## Script Commands Reference

| Command           | Purpose                      |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start dev server (port 3000) |
| `npm run build`   | Build for production         |
| `npm run preview` | Preview production build     |
| `npm run lint`    | Run ESLint                   |

## Performance Improvements

With Vite, you'll notice:

- ✅ Dev server starts in ~1 second (vs 30+ with CRA)
- ✅ Hot reload updates in < 100ms
- ✅ Production builds 10x smaller
- ✅ Instant dependency resolution

## API Proxy Configuration

In `vite.config.js`, API calls to `/api` are proxied to backend:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  }
}
```

This means:

```javascript
// Works automatically
axios.get("/api/rooms");
// Proxied to: http://localhost:5000/api/rooms
```

## Browser Support

Vite supports all modern browsers:

- Chrome 90+
- Firefox 87+
- Safari 14+
- Edge 90+

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Create `.env` file
3. ✅ Start dev server: `npm run dev`
4. ✅ Build: `npm run build`
5. ✅ Deploy to Vercel/Netlify

## Learn More

- [Vite Docs](https://vitejs.dev)
- [React + Vite](https://vitejs.dev/guide/why.html)
- [Environment Variables](https://vitejs.dev/guide/env-and-modes.html)

## Summary

You're now using **Vite**, the modern build tool for React!

- 🚀 Faster development
- ⚡ Better performance
- 🎯 Optimized builds
- 💨 Lightning-fast hot reload

Ready to code! 🎉
