# ⚡ Quick Reference - Tawk.to Chat Widget

## 🔑 Your Property Details

```
Property ID: 69936448714c191c390eea53
Widget ID:   1jhjrvf45
URL:         https://embed.tawk.to/69936448714c191c390eea53/1jhjrvf45
```

## 📍 Where to Find It on Website

- **Button Location:** Bottom-right corner
- **Button Style:** Gold gradient circle with 💬 emoji
- **Button Size:** 60×60px (desktop), 56×56px (mobile)
- **Animation:** Subtle pulsing effect

## 💻 Code Reference

### Files Modified

```
✅ client/.env
✅ client/src/components/ChatBot.jsx
✅ client/src/components/Header.jsx
✅ client/src/components/ChatBot.css
```

### Global Functions Available

```javascript
// Open/toggle chat
window.openChatWidget();

// Minimize chat
window.closeChat();

// Toggle open/closed
window.toggleChat();

// Check status
window.Tawk_API.getStatus(); // 'online', 'away', 'offline'

// Set visitor info
window.Tawk_API.setAttributes({
  name: "Visitor Name",
  email: "email@example.com",
});

// Add tags
window.Tawk_API.addTags(["vip", "booking-inquiry"]);

// Add custom event
window.Tawk_API.addEvent("room-inquiry");
```

## 🎯 Access Points

| What                | Where                         |
| ------------------- | ----------------------------- |
| **Chat Widget**     | Bottom-right of every page    |
| **Agent Dashboard** | https://dashboard.tawk.to     |
| **Admin Settings**  | Tawk.to Dashboard → Admin     |
| **Chat History**    | Tawk.to Dashboard → Archives  |
| **Analytics**       | Tawk.to Dashboard → Analytics |
| **Reports**         | Tawk.to Dashboard → Reports   |

## 🚀 Deployment Info

**Environment:** Development (`http://localhost:5173`)
**Production:** (When deployed)

**Environment Variable:**

```
VITE_TAWK_PROPERTY_ID=69936448714c191c390eea53/1jhjrvf45
```

## 📞 Support Channels

1. **For Tawk.to Issues:** https://tawk.to/support
2. **For Integration Issues:** Check TAWK_SETUP_COMPLETE.md
3. **For Customization:** Tawk.to Dashboard → Admin Panel

## ⚙️ Common Tasks

### How to...

**Set Working Hours**

1. Go to Tawk.to Dashboard
2. Click Admin → Properties → Working Hours
3. Set your schedule

**Create Quick Replies**

1. Admin → Canned Messages
2. Add responses like "Room rates?" → Your answer
3. Use in chat by typing `:roomrates`

**Change Chat Widget Color**

1. Admin → Properties → Appearance
2. Select your brand color (hotel theme: gold #d4af37)

**Add More Agents**

1. Admin → Members
2. Invite team members with email
3. Assign departments/roles

**Track Chat Analytics**

1. Dashboard → Reports
2. View chat volume, satisfaction, response time
3. Export data as needed

## 🔐 Security Checklist

- ✅ Property ID in .env (not hardcoded)
- ✅ Script loaded securely via HTTPS
- ✅ Visitor data captured with consent
- ✅ GDPR-compliant data handling
- ✅ Secure cross-origin attributes set

## 📊 What Gets Captured

**Automatic:**

- Visitor name (from localStorage)
- Visitor email (from localStorage)
- Page URL where chat started
- Timestamp of message
- Browser/device info

**Optional:**

- Custom attributes (room number, booking ID, etc.)
- Tags (vip, inquiry-type, etc.)
- Events (room-inquiry, booking-help, etc.)

## 🎨 Styling Configuration

**Button Colors:** Gold gradient (#d4af37 → #f0d86d)
**Header:** Dark theme (#1a1a1a, #2d2d2d)
**Accent:** Gold (#d4af37)
**Text:** White/light gray

**Customizable in:** ChatBot.css

## 🆘 Troubleshooting

**Problem:** Chat button not visible

- Solution: Hard refresh (Ctrl+Shift+Delete)

**Problem:** Messages not sending

- Solution: Check .env has correct Property ID

**Problem:** Agent not receiving messages

- Solution: Verify Tawk.to dashboard is open and agent is logged in

**Problem:** Chat appears on wrong position

- Solution: Check ChatBot.css positioning rules

## 📚 Documentation Files

```
📄 CHAT_WIDGET_READY.md ................ This file
📄 TAWK_SETUP_COMPLETE.md ............. Full setup guide
📄 CHATBOT_INTEGRATION.md ............. Integration details
📄 CHATBOT_QUICK_START.md ............. Getting started
📄 CHATBOT_ARCHITECTURE.md ............ Technical architecture
```

## 💡 Pro Tips

1. **Add visitor context** - Set name/email before chat opens
2. **Use tags** - Tag important conversations (vip, follow-up, etc.)
3. **Create templates** - Common responses save typing time
4. **Set working hours** - Guests know when to expect responses
5. **Monitor analytics** - Track chat performance monthly
6. **Respond quickly** - First response time matters most
7. **Use departments** - Route different queries to right team

## 🎯 Success Metrics

Monitor these in Tawk.to Dashboard:

- **Response Time:** How quickly agents reply
- **Chat Satisfaction:** Visitor satisfaction score
- **Chat Volume:** Number of chats per day/week
- **Visitor Engagement:** How many chats vs. unique visitors
- **Conversion:** Track bookings from chat inquiries

---

**Quick Deploy Command:**

```bash
npm run build  # Build for production
```

**Quick Dev Start:**

```bash
npm run dev    # Start development server
```

---

_Property ID: 69936448714c191c390eea53/1jhjrvf45_  
_Last Updated: February 16, 2026_  
_Status: ✅ Production Ready_
