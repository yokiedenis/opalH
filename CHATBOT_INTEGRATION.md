# Tawk.to Chat Widget Integration

## Overview

The Opal Heights Hotel website now includes a **Tawk.to live chat widget** for 24/7 customer support. The widget displays as a beautiful popup in the bottom-right corner with custom luxury branding.

## Features

✨ **Custom UI/UX**

- Popup design (not full-screen)
- Gold gradient button with smooth animations
- Pulsing indicator showing availability
- Responsive mobile design
- Clean, modern interface aligned with hotel branding

🎨 **Design System**

- Gold accent: `#d4af37` with gradient to `#f0d86d`
- Dark theme: `#1a1a1a` and `#2d2d2d`
- Smooth transitions and animations
- Hover effects and scale transforms

🔧 **Tawk.to API Integration**

- Full API access with callbacks
- Custom attributes for visitor tracking
- Status change monitoring
- Chat event logging
- Visitor information from localStorage

## Setup Instructions

### 1. Get Your Tawk.to Property ID

1. Visit [tawk.to](https://tawk.to)
2. Sign up or log in to your account
3. Create a new property for your website
4. Copy your **Property ID and Widget ID** in the format: `PROPERTY_ID/WIDGET_ID`
   - Example: `1234567890/1hxxxxxxxxxx`

### 2. Add to Environment Variables

Update your `.env` file in the `client` folder:

```env
VITE_TAWK_PROPERTY_ID=YOUR_PROPERTY_ID/YOUR_WIDGET_ID
```

**Example:**

```env
VITE_TAWK_PROPERTY_ID=6835b454756c901912744d16/1is8sgrbb
```

### 3. Testing Locally

1. Ensure your `.env` file has the correct property ID
2. Start the development server: `npm run dev`
3. Visit the website and look for the 💬 chat button in the bottom-right corner
4. Click to open the chat popup
5. Send a test message

### 4. Production Deployment

The environment variable will be automatically used in production when deployed to Vercel, Netlify, or similar platforms. Make sure to:

1. Add `VITE_TAWK_PROPERTY_ID` to your production environment variables
2. Use the same format: `PROPERTY_ID/WIDGET_ID`

## File Structure

```
client/
├── src/
│   ├── components/
│   │   ├── ChatBot.jsx       # Main chatbot integration
│   │   ├── ChatBot.css       # Custom Tawk.to styling
│   │   └── Header.jsx        # ChatBot component imported here
│   └── App.jsx
├── .env                       # Environment variables (local)
├── .env.example              # Template for environment variables
```

## Component Details

### ChatBot.jsx

The main component handles:

- Tawk.to script injection
- API callbacks and event handlers
- Visitor information from localStorage
- Global function exposure for Header integration

**Global Functions:**

```javascript
window.openChatWidget(); // Opens the chat popup
window.closeChat(); // Closes the chat popup
window.toggleChat(); // Toggles open/close state
```

### ChatBot.css

Comprehensive styling for:

- Chat button (FAB - Floating Action Button)
- Chat popup window positioning and animations
- Message styling (visitor vs agent)
- Input area and send button
- Mobile responsive design

## Customization

### Change Button Color

Edit `ChatBot.css` to modify the gradient:

```css
.tawk-widget-button {
  background: linear-gradient(
    135deg,
    #YOUR_COLOR_1 0%,
    #YOUR_COLOR_2 100%
  ) !important;
}
```

### Adjust Popup Size

Modify the dimensions in `ChatBot.css`:

```css
#tawk-iframe-container {
  width: 420px !important; /* Change width */
  max-height: 600px !important; /* Change height */
  bottom: 100px !important; /* Distance from bottom */
  right: 30px !important; /* Distance from right */
}
```

### Disable Pulsing Animation

Remove this class from `.tawk-widget-button`:

```css
animation: tawk-pulse 2s ease-in-out infinite;
```

## Visitor Information

When a visitor opens the chat, their information is automatically captured:

```javascript
const visitorName = localStorage.getItem("guestName") || "Guest";
const visitorEmail = localStorage.getItem("guestEmail") || "";
```

These values are set as Tawk.to attributes for better tracking and personalization.

## Troubleshooting

### Chat Widget Not Appearing

❌ **Issue:** Button not showing in bottom-right corner

✅ **Solution:**

1. Check browser console for errors
2. Verify `VITE_TAWK_PROPERTY_ID` is set in `.env`
3. Ensure property ID format is correct: `PROPERTY_ID/WIDGET_ID`
4. Clear browser cache and reload

### Chat Not Responding

❌ **Issue:** Chat opens but shows "offline" or no messages appear

✅ **Solution:**

1. Check Tawk.to dashboard - ensure agents are available
2. Verify widget is enabled on Tawk.to
3. Check browser DevTools Network tab for failed requests
4. Ensure CORS is enabled on Tawk.to side

### Styling Not Applied

❌ **Issue:** Button doesn't have gold color or animations

✅ **Solution:**

1. Verify `ChatBot.css` is imported correctly
2. Check that Tawk.to hasn't overridden styles
3. Use `!important` flag in CSS (already done)
4. Clear browser cache

## API Methods Available

The ChatBot component exposes several Tawk.to methods:

```javascript
// Toggle chat visibility
window.Tawk_API.toggle();

// Maximize chat window
window.Tawk_API.maximize();

// Minimize chat window
window.Tawk_API.minimize();

// Set custom attributes
window.Tawk_API.setAttributes(
  {
    "custom-key": "custom-value",
  },
  callback,
);

// Add tags for organization
window.Tawk_API.addTags(["tag1", "tag2"], callback);

// Check if chat is ongoing
window.Tawk_API.isChatOngoing();
```

See [Tawk.to API Documentation](https://docs.tawk.to/api/) for full list of methods.

## Browser Support

✅ Chrome, Firefox, Safari, Edge (latest versions)
✅ Mobile browsers (iOS Safari, Chrome Mobile)
✅ Responsive on all screen sizes

## Performance

- **Script Size:** ~50KB (gzipped)
- **Load Time:** <500ms typically
- **No Impact:** On page performance, loaded asynchronously
- **Caching:** Tawk.to handles caching

## Security

✅ **No sensitive data** stored in frontend code
✅ **Property ID** kept in environment variables only
✅ **HTTPS only** for Tawk.to communication
✅ **Secure mode** available for verified visitors (optional)

## Next Steps

1. ✅ Add `VITE_TAWK_PROPERTY_ID` to your `.env`
2. ✅ Test locally with `npm run dev`
3. ✅ Deploy to production
4. ✅ Monitor chat metrics from Tawk.to dashboard
5. ✅ Train staff on customer chat responses

---

**For Support:**

- Tawk.to Help: https://help.tawk.to/
- Your Tawk.to Dashboard: https://tawk.to/admin/dashboard
