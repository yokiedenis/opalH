# 🧪 Frontend Testing Guide

Test your hotel website against the backend APIs.

---

## ✅ Setup Checklist

Before testing, ensure:

- [ ] Backend running: `npm run dev` (in server folder, port 5000)
- [ ] MongoDB connected or Atlas URI configured
- [ ] Frontend running: `npm run dev` (in client folder, port 3000)
- [ ] Browser console open (F12)
- [ ] No CORS errors in console

---

## 🧪 Test Scenarios

### Test 1: Load Home Page

**What to test:** Do all components load without errors?

**Steps:**

1. Go to `http://localhost:3000`
2. Scroll down and check:
   - [ ] Hero section displays
   - [ ] Rooms grid shows (from `/api/rooms`)
   - [ ] Food menu shows (from `/api/food`)
   - [ ] Gallery displays
   - [ ] Reviews section shows
   - [ ] Footer visible
3. Open browser console (F12) - should have no errors

**Expected:** All sections display with data from backend

---

### Test 2: Room Showcase - API Call

**What to test:** RoomShowcase fetches rooms correctly

**Steps:**

1. Open browser DevTools (F12)
2. Go to Network tab
3. Reload page
4. Look for `/api/rooms` request
   - [ ] Status: 200 OK
   - [ ] Response shows room data

**Expected Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "roomNumber": "101",
      "type": "single",
      "price": 60000,
      ...
    }
  ]
}
```

---

### Test 3: Food Menu - Filter by Category

**What to test:** Food items filter correctly

**Steps:**

1. Scroll to Food Menu section
2. Click filter buttons: Pizza, Meal, Drink, Dessert, Breakfast
   - [ ] Items filter correctly
   - [ ] No errors in console
3. Hover over items
   - [ ] Price and description visible

**Expected:** Categories filter items correctly

---

### Test 4: Add to Cart

**What to test:** Food items add to cart via context

**Steps:**

1. Click "Add to Cart" on a food item
   - [ ] Alert confirms item added
   - [ ] Badge on cart icon shows count
2. Add more items
   - [ ] Badge increases
3. Click cart icon (shopping bag)
   - [ ] Navigate to `/cart`
   - [ ] Items visible in cart

**Expected:** Items stored in context and cart shows them

---

### Test 5: Make a Booking

**What to test:** Booking form submits to backend

**Steps:**

1. Click "Book Now" button or go to `/booking`
2. Fill form:
   - [ ] Full Name: "John Doe"
   - [ ] Email: "john@example.com"
   - [ ] Phone: "+256700123456"
   - [ ] Select a room from dropdown (loads from `/api/rooms`)
   - [ ] Check-in: 2024-02-20
   - [ ] Check-out: 2024-02-23
   - [ ] Guests: 2
   - [ ] Check "Include Breakfast"
   - [ ] Special Requests: "Late checkout if possible"
3. Watch sidebar:
   - [ ] Room, dates, nights display
   - [ ] Price calculates: room + breakfast
   - [ ] Total updates in real-time
4. Click "Confirm Booking"
   - [ ] Submitting message shows
   - [ ] Check Network tab for POST request

**Expected Network Request:**

```json
POST /api/bookings
{
  "guestName": "John Doe",
  "guestEmail": "john@example.com",
  "guestPhone": "+256700123456",
  "roomId": "...",
  "checkInDate": "2024-02-20T00:00:00.000Z",
  "checkOutDate": "2024-02-23T00:00:00.000Z",
  "numberOfGuests": 2,
  "breakfastIncluded": true,
  "totalPrice": 260000,
  "breakfastPrice": 60000
}
```

**Expected Response:**

- [ ] Success message displays
- [ ] Page redirects to home after 2 seconds
- [ ] Booking created in database

---

### Test 6: Place Food Order

**What to test:** Cart submits order to backend

**Steps:**

1. Add 2-3 food items to cart
2. Go to cart (`/cart`)
3. Adjust quantities:
   - [ ] Click + to increase
   - [ ] Click - to decrease
   - [ ] Total updates
4. Fill customer info:
   - [ ] Name: "Jane Doe"
   - [ ] Phone: "+256701234567"
   - [ ] Delivery Address: "Kabulengwa Road"
5. Click "Place Order"

**Expected Network Request:**

```json
POST /api/orders
{
  "items": [
    {
      "foodId": "...",
      "name": "Pizza Margherita",
      "price": 30000,
      "quantity": 2
    }
  ],
  "customerName": "Jane Doe",
  "customerPhone": "+256701234567",
  "deliveryAddress": "Kabulengwa Road",
  "totalPrice": 60000
}
```

**Expected Response:**

- [ ] Success message displays
- [ ] Cart clears
- [ ] Order saved in database

---

### Test 7: Admin Dashboard - View Bookings

**What to test:** Admin can view all bookings

**Steps:**

1. Go to `/admin`
2. Check "Bookings" tab (should be active)
   - [ ] Bookings table loads
   - [ ] Columns: ID, Guest, Email, Phone, Check-in, Check-out, Total, Status
   - [ ] Your test booking appears
   - [ ] Status shows (e.g., "Pending")
3. Click "Export" button
   - [ ] CSV file downloads

**Expected:** Bookings list shows all created bookings

---

### Test 8: Admin Dashboard - View Orders

**What to test:** Admin can view all food orders

**Steps:**

1. Click "Orders" tab
   - [ ] Orders table loads
   - [ ] Your test order appears
   - [ ] Items count, total, delivery address shown
   - [ ] Status visible
2. Click "Export"
   - [ ] CSV file downloads

**Expected:** Orders list shows all placed orders

---

### Test 9: Admin Dashboard - Delete

**What to test:** Admin can delete items

**Steps:**

1. In any tab, click red trash icon on any row
   - [ ] Confirmation dialog appears
2. Confirm deletion
   - [ ] Item removed from table
   - [ ] Confirm with backend check

**Expected:** Item deleted from database

---

### Test 10: Navigation

**What to test:** Navigation menu works

**Steps:**

1. Click Home link
   - [ ] Navigate to `/`
2. Click menu items:
   - [ ] "Rooms" → stays on home
   - [ ] "Food & Pizza" → stays on home
   - [ ] "Gallery" → stays on home
   - [ ] "Reviews" → stays on home
3. On mobile (resize browser to <768px):
   - [ ] Hamburger menu appears
   - [ ] Click to open menu
   - [ ] Click link to navigate

**Expected:** Navigation works on all screen sizes

---

### Test 11: Responsive Design

**What to test:** Mobile layout works

**Steps:**

1. Open DevTools (F12)
2. Click responsive design (Ctrl+Shift+M)
3. Test on:
   - [ ] iPhone 12 (390px)
   - [ ] iPad (768px)
   - [ ] Desktop (1024px+)
4. Check on each:
   - [ ] Components stack vertically on mobile
   - [ ] Text readable
   - [ ] Buttons clickable
   - [ ] Forms fill full width
   - [ ] No horizontal scrollbar

**Expected:** All layouts responsive and readable

---

### Test 12: Error Handling

**What to test:** Error messages display

**Steps:**

1. Stop backend server
2. Reload page
   - [ ] Error message shows
   - [ ] "No rooms available" displays
   - [ ] No crashes
3. Try booking without filling form
   - [ ] Validation error shows
4. Start backend again
   - [ ] Reload works normally

**Expected:** Graceful error handling

---

## 📊 Test Results Template

```
Frontend Test Results
====================
Date: ___________
Tester: ___________

Test 1: Home Page Load         [ PASS ] [ FAIL ]
Test 2: API Call (Rooms)       [ PASS ] [ FAIL ]
Test 3: Filter Food            [ PASS ] [ FAIL ]
Test 4: Add to Cart            [ PASS ] [ FAIL ]
Test 5: Make Booking           [ PASS ] [ FAIL ]
Test 6: Place Order            [ PASS ] [ FAIL ]
Test 7: View Bookings (Admin)  [ PASS ] [ FAIL ]
Test 8: View Orders (Admin)    [ PASS ] [ FAIL ]
Test 9: Delete Item (Admin)    [ PASS ] [ FAIL ]
Test 10: Navigation            [ PASS ] [ FAIL ]
Test 11: Responsive Design     [ PASS ] [ FAIL ]
Test 12: Error Handling        [ PASS ] [ FAIL ]

Overall Status: ___________
Issues Found:
-
-
-

Notes:
```

---

## 🐛 Common Issues & Fixes

### Issue: "Cannot GET /api/rooms"

**Cause:** Backend not running or wrong URL
**Fix:**

- Start backend: `npm run dev` in server folder
- Check VITE_API_BASE_URL in client/.env

### Issue: Booking shows "Please select a room"

**Cause:** Rooms dropdown empty
**Fix:**

- Check rooms exist in database
- Check /api/rooms returns data

### Issue: Cart shows "Your cart is empty"

**Cause:** Items not added
**Fix:**

- Add food items first
- Check BookingContext exists in App.js

### Issue: "CORS error" in console

**Cause:** Backend CORS not configured
**Fix:**

- Backend should have: `app.use(cors())`
- Restart backend

### Issue: Page loads blank

**Cause:** JavaScript error
**Fix:**

- Open console (F12)
- Fix errors shown
- Reload page

---

## ✅ Final Checklist

All tests passing? Check these:

- [ ] Backend running (port 5000)
- [ ] Frontend running (port 3000)
- [ ] No errors in console
- [ ] All API calls return 200 status
- [ ] Booking form works
- [ ] Cart works
- [ ] Admin dashboard shows data
- [ ] Navigation works
- [ ] Mobile layout responsive
- [ ] Error handling works

**Status:** ✅ Ready for Production!

---

## 🚀 Next Steps

If all tests pass:

1. Add real hotel images
2. Implement payment gateway (MoMo Pay)
3. Setup WhatsApp notifications (Twilio)
4. Add email confirmations (Nodemailer)
5. Deploy to production
