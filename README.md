# FarmStay Ghana - MVP Implementation Guide

## Project Overview

This is the **Minimum Viable Product (MVP)** implementation of the FarmStay Ghana booking platform - a web-based agri-tourism experience marketplace connecting urban dwellers and diaspora visitors with authentic farm experiences in Ghana.

**Current Implementation Status**: Frontend website with local storage booking system (no backend required for MVP testing)

---

## Quick Start Guide

### System Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server or backend infrastructure needed (MVP uses browser localStorage)
- No database setup required for testing

### Getting Started

1. **Open the Website**
   - Open `index.html` in your web browser
   - The website should fully load with all experiences visible

2. **Explore Experiences**
   - Click on experience cards to view full details
   - Scroll through images, activities, testimonials
   - Read itineraries and pricing information

3. **Complete a Booking**
   - Click "Book Now" on any experience
   - Step 1: Select check-in date and number of guests
   - Step 2: Enter guest details (name, email, phone, country)
   - Step 3: Review booking summary and agree to terms
   - Step 4: Select payment method (Stripe, Bank Transfer, or Mobile Money)
   - Confirmation number is displayed and saved to browser storage

4. **View Your Bookings**
   - Go to "My Account" → Dashboard
   - View all your bookings with confirmation numbers
   - Cancel bookings or view details

5. **Admin Panel**
   - Click "Admin" in navigation (yellow button)
   - View summary analytics (total revenue, bookings, etc.)
   - Manage pending bookings
   - Export booking data as CSV

---

## File Structure

```
birthday/
├── index.html              # Homepage and main booking platform
├── dashboard.html          # User account & booking management
├── admin.html              # Admin panel & analytics
├── styles.css              # All styling (responsive design)
├── script.js               # Application logic (800+ lines)
├── data.js                 # Mock data & local storage management
├── site.webmanifest        # PWA configuration
├── MVP_DELIVERABLE.md      # Complete project management documentation
├── TECHNICAL_SPECIFICATIONS.md  # Technical architecture details
└── README.md               # This file
```

---

## Key Features (MVP)

### For Guests
✅ Browse 3 featured farm experiences  
✅ View detailed experience information (activities, meals, host bios)  
✅ 4-step booking flow with price calculation  
✅ Multiple payment method options  
✅ Booking confirmation with email reference  
✅ View past and upcoming bookings  
✅ Cancel bookings  
✅ Guest testimonials and ratings  

### For Administrators
✅ View booking analytics (revenue, totals)  
✅ Manage bookings (confirm, delete)  
✅ Export booking data (CSV format)  
✅ Performance metrics dashboard  

### Technical Features
✅ Fully responsive design (mobile, tablet, desktop)  
✅ Modal-based booking workflow  
✅ Browser localStorage for data persistence  
✅ Accessible form validation  
✅ Animated modals and transitions  
✅ SEO-friendly HTML structure  

---

## How Booking Data is Stored

The MVP uses **browser localStorage** (no backend needed):

```javascript
// Bookings are stored as JSON in the browser
// Format: localStorage['bookings'] = [
//   {
//     id: "BK1234567890",
//     confirmationNumber: "GHC-2026-0001",
//     experienceName: "Cocoa Cultivation Weekend",
//     checkInDate: "2026-04-15",
//     numGuests: 2,
//     totalPrice: 1500,
//     status: "pending",
//     firstName: "John",
//     lastName: "Doe",
//     email: "john@example.com",
//     ...
//   }
// ]
```

**Important:** Data is cleared if browser cache is cleared!

---

## Experiences Included in MVP

### 1. Cocoa Cultivation Weekend
- **Location:** Central Region, Ghana
- **Price:** ₵750 per person
- **Activities:** Harvesting, fermentation, drying, tasting
- **Host:** Kofi & Ama Mensah (3rd generation farmers)

### 2. Pineapple Harvest & Processing
- **Location:** Ashanti Region, Ghana
- **Price:** ₵680 per person
- **Activities:** Harvesting, grading, juice extraction, jam making
- **Host:** Mary & Kwesi Osei (Organic farming advocates)

### 3. Cassava-to-Fufu Traditional Skills
- **Location:** Western Region, Ghana
- **Price:** ₵620 per person
- **Activities:** Root harvesting, peeling, traditional pounding
- **Host:** Abena & Yaw Asante (Agricultural educators)

---

## Payment Methods (MVP)

### 1. Credit/Debit Card (Stripe Integration Ready)
- **Test Card:** 4242 4242 4242 4242
- **Expiry:** Any future date
- **CVC:** Any 3 digits
- *(Full Stripe integration required for production)*

### 2. Bank Transfer
- **Mock Details Provided:**
  - Account: FarmStay Ghana Ltd
  - Bank: Ghana National Bank
  - Account #: 1234567890
- *(Real bank details to be configured in Phase 2)*

### 3. Mobile Money
- **Providers:** MTN Mobile Money, Vodafone Cash, AirtelTigo Money
- *(Live integration required for production)*

---

## Admin Dashboard Features

### Analytics Tab (Default)
- **Total Revenue:** Sum of all booking amounts
- **Total Bookings:** Count of completed bookings
- **Top Experience:** Most frequently booked experience
- **Avg. Party Size:** Average guests per booking
- **Recent Stats:** Last 7 days activity

### Bookings Tab
- **Booking Table:** View all bookings with details
- **Actions:** 
  - Confirm pending bookings
  - Delete bookings
  - View guest information

### Export Function
- **Format:** CSV (Excel-compatible)
- **Includes:** All booking details with guest info
- **Use:** For external reporting and analysis

---

## Customization Guide

### Change Prices
Edit `data.js` → `experiences` array → `price` field:
```javascript
{
    id: 1,
    title: "Cocoa Cultivation Weekend",
    price: 750,  // Change this value
    ...
}
```

### Add New Experience
Add new object to `experiences` array in `data.js`:
```javascript
{
    id: 4,  // New ID
    title: "Your Experience",
    farmName: "Farm Name",
    location: "Region, Ghana",
    duration: { days: 2, nights: 1 },
    price: 600,
    // ... Add all required fields
}
```

### Change Colors
Edit `:root` variables in `styles.css`:
```css
:root {
    --primary-color: #2D5016;      /* Dark green */
    --secondary-color: #7AC74F;    /* Light green */
    --accent-color: #FFB81C;       /* Gold/Yellow */
    ...
}
```

### Update Company Branding
- **Logo/Text:** Edit `.nav-logo` in `index.html`
- **Colors:** Update CSS variables in `styles.css`
- **Contact Info:** Update footer in `index.html`

---

## Testing Scenarios

### Test Scenario 1: Complete a Booking
1. Open index.html
2. Click "Explore Experiences"
3. Select any experience → "Book Now"
4. Choose dates and guests
5. Fill guest details
6. Review and agree to terms
7. Select payment method
8. Confirm booking
9. Go to Dashboard to view confirmation

### Test Scenario 2: Admin Analytics
1. Click "Admin" in navigation
2. View analytics cards
3. Check recent bookings stats
4. Click "Export CSV" to download data

### Test Scenario 3: Mobile Responsiveness
1. Open on mobile device or use browser dev tools
2. Test hamburger menu
3. Verify forms are readable
4. Check modal display on small screens

### Test Scenario 4: Data Persistence
1. Complete a booking
2. Go to admin panel
3. Refresh the page
4. Data should still appear (saved in localStorage)

---

## Production Deployment Checklist

### Phase 2 Enhancements Needed
- [ ] Backend API development (Node.js + Express recommended)
- [ ] Database setup (PostgreSQL)
- [ ] Stripe payment integration (replace mock)
- [ ] Email service integration (SendGrid)
- [ ] Cloud hosting (AWS EC2 / DigitalOcean)
- [ ] SSL/HTTPS certificate
- [ ] Analytics integration (Google Analytics)
- [ ] Multi-farm support
- [ ] User authentication system
- [ ] Admin user management

### Suggested Tech Stack for Production
- **Frontend:** Vue.js or React (refactor from vanilla JS)
- **Backend:** Node.js + Express.js
- **Database:** PostgreSQL
- **Payment:** Stripe API
- **Email:** SendGrid
- **Hosting:** AWS or DigitalOcean
- **CDN:** Cloudflare

---

## Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| Mobile Chrome | Latest | ✅ Fully Supported |
| Mobile Safari | Latest | ✅ Fully Supported |

---

## Known Limitations (MVP)

1. **No Persistent Backend:** Data is stored in browser localStorage only
2. **No Real Payments:** Payment methods are mock/simulated
3. **No Email Integration:** Confirmations not actually emailed
4. **Single Farm:** Only 3 experiences for MVP (Phase 2: multi-farm)
5. **No User Accounts:** No login/authentication system
6. **No Search/Filtering:** Browse all experiences only
7. **No Wishlist:** Save to collection not implemented
8. **Test Data Only:** All farms and sample data are fictional

---

## Future Enhancements (Phase 2+)

- Mobile app (React Native)
- Multi-language support
- Advanced search and filtering
- Wish list and saved experiences
- User reviews and rating system
- Host messaging system
- Travel agent partnerships
- Corporate retreat packages
- Dynamic pricing
- Blog and educational content
- Video tours
- Travel package partnerships

---

## Support & Contact

For questions about the MVP implementation:
- Review the `MVP_DELIVERABLE.md` for project details
- Check `TECHNICAL_SPECIFICATIONS.md` for technical architecture
- Contact your development team for deployment guidance

---

## License

This MVP implementation is proprietary to FarmStay Ghana. Unauthorized use, modification, or distribution is prohibited.

**Version:** 1.0 MVP  
**Created:** March 2026  
**Last Updated:** March 2026

---

**Ready to Deploy?** 
Simply open `index.html` in any web browser. No installation required!
