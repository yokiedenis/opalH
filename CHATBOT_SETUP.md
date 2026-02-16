# 🤖 Chatbot Integration Setup Guide

## Opal Heights Hotel - Tawk.to Live Chat & AI Chatbot

Complete setup guide for Tawk.to - FREE live chat + AI chatbot for customer service.

---

## ✅ What's Already Done

- ✅ ChatBot component created with full Tawk.to integration
- ✅ WhatsApp icon button in header to toggle chat
- ✅ Visitor information auto-capture ready
- ✅ Event listeners for chat messages
- ✅ Custom styling for luxury hotel theme
- ✅ Mobile responsive design

---

## 🚀 Quick Setup (3 Simple Steps)

### Step 1️⃣: Create Free Tawk.to Account

1. Visit https://tawk.to
2. Click **"Start Free"**
3. Sign up with your email (no credit card needed!)
4. Verify email address

### Step 2️⃣: Get Your Property ID (IMPORTANT - Must Be Complete!)

1. Log in to Tawk.to dashboard
2. Click **"Admin"** → **"Property Settings"**
3. Look for **"Widget Code"** section
4. Copy the **COMPLETE Widget Code** - you need PROPERTY_ID/WIDGET_ID
5. The format should be: `1234567890/1hxxxxxxxxxx` (with the slash!)

⚠️ **IMPORTANT:** Don't use just one number! Get the complete ID with both parts separated by `/`

### Step 3️⃣: Add Property ID to Code

Edit `client/src/components/ChatBot.jsx` and replace on line ~21:

**BEFORE:**

```javascript
s1.src = "https://embed.tawk.to/YOUR_PROPERTY_ID/default";
```

**AFTER (Example - use YOUR actual ID):**

```javascript
s1.src = "https://embed.tawk.to/1234567890/1hxxxxxxxxxx";
```

**Then deploy:**

```bash
git add -A
git commit -m "feat: add tawk.to property ID"
git push origin main
```

✅ **Done!** Chat will appear in bottom-right corner and WhatsApp icon in header toggles it.
s1.src = "https://embed.tawk.to/1234567890/1hxxxxxxxxxx/default";

````

### Step 5: Deploy & Test

1. Commit and push your changes:
```bash
git add -A
git commit -m "feat: integrate tawk.to live chat"
git push origin main
````

2. Wait for Render deployment (2-3 minutes)
3. Visit https://opalh.onrender.com
4. Click the **WhatsApp icon** in the top-right corner
5. Chat window should appear! ✅

---

## 📱 How It Works

### For Customers:

1. Click the **WhatsApp icon** (💬) in the header
2. Chat window opens
3. They can:
   - Ask questions
   - Get instant FAQ responses
   - Connect with live agent if online
   - Leave messages for later

### For You (Admin):

1. Go to https://tawk.to/dashboard
2. **Chat** tab shows incoming messages
3. **Visitors** tab shows who's on your site
4. **Reports** tab shows chat analytics

---

## 🎨 Customization Options

### Set Visitor Information

The ChatBot automatically captures visitor name and email if available:

```javascript
// Email will be auto-filled if user booked a room or submitted a review
Tawk_API.setAttributes({
  name: visitorName,
  email: visitorEmail,
});
```

### Change Chat Position

Edit `Header.css` - `.logos` class:

```css
.logos {
  right: 0; /* Left side: change to "auto" */
  top: 480px; /* Adjust vertical position */
}
```

### Custom Messages

Set up canned responses in Tawk.to dashboard for common questions:

- "What are your check-in times?"
- "How do I book a room?"
- "What's included in breakfast?"
- "How do I pay?"

---

## 💡 Pro Tips

### 1. Set Up Pre-Chat Questions

In Tawk.to Settings → Pre-Chat:

- "What's your name?"
- "Why are you contacting us?"
- "Best contact method?"

### 2. Create Departments

Set up departments for:

- **Reservations** - Room bookings
- **Food & Dining** - Menu questions
- **Guest Services** - General inquiries
- **Technical Support** - Website issues

### 3. Set Working Hours

Configure when agents are available:

- Daytime: 9 AM - 6 PM (active)
- Off-hours: Auto-responder enabled

### 4. Link to Knowledge Base

Upload FAQ documents:

- Room information
- Dining menus
- Policies
- Contact information

---

## 📊 Monitor Performance

### Key Metrics to Track:

- **Chat Volume**: Messages per day
- **Response Time**: Average time to respond
- **Satisfaction**: Customer ratings
- **Conversion**: Bookings from chats

View all in Tawk.to Dashboard → **Reports**

---

## 🔧 Troubleshooting

### Chat not appearing?

1. Clear browser cache (Ctrl+Shift+Del)
2. Wait 5 minutes for deployment
3. Check browser console for errors (F12)
4. Verify Property ID is correct

### Messages not sending?

1. Check internet connection
2. Verify Tawk.to account is active
3. Check if agents are online
4. Refresh the page

### Can't find Property ID?

1. Log in to https://tawk.to/dashboard
2. Look for your site name
3. Click **Expand** → **Settings**
4. Copy ID from "Chat Widget" section

---

## 📞 Support

- **Tawk.to Help**: https://tawk.to/help
- **Live Chat Support**: Use Tawk.to's own chat for help
- **Community**: https://community.tawk.to

---

## 🎯 Next Steps

1. ✅ Set up Tawk.to account
2. ✅ Add Property ID to ChatBot.jsx
3. ✅ Deploy to Render
4. ✅ Test the chat widget
5. ✅ Configure departments & working hours
6. ✅ Add FAQ responses
7. ✅ Monitor analytics

---

**You're all set! Your customers can now chat with you 24/7! 🎉**

For questions or updates, refer to this guide or contact Tawk.to support.
