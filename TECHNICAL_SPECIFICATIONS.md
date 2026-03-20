# TECHNICAL SPECIFICATIONS & ARCHITECTURE DOCUMENT
## Project 10: Agri-Tourism & Farm-Stay Experience

**Document Version**: 1.0  
**Status**: MVP Phase - Development Ready  
**Last Updated**: March 2026

---

## 1. SYSTEM ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────┐
│                    END-USER LAYER                        │
├─────────────────────────────────────────────────────────┤
│  Guest Web Browser    │   Admin Panel    │  Mobile View  │
└───────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│               PRESENTATION LAYER (Frontend)              │
├─────────────────────────────────────────────────────────┤
│  HTML5/CSS3  │  JavaScript  │  Responsive Design        │
│  SEO Meta Tags │  Analytics Tracking (GA4)              │
└───────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│            API GATEWAY & MIDDLEWARE LAYER               │
├─────────────────────────────────────────────────────────┤
│  Express.js Routes  │  JWT Authentication  │  CORS       │
│  Rate Limiting      │  Request Validation  │  Logging    │
└───────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│             APPLICATION LOGIC LAYER (Backend)            │
├─────────────────────────────────────────────────────────┤
│  Booking Service  │  Payment Service  │  Email Service  │
│  User Management  │  Availability Logic  │  Review Engine│
└───────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│           DATA PERSISTENCE & INTEGRATION LAYER           │
├─────────────────────────────────────────────────────────┤
│  PostgreSQL   │  Redis Cache  │  S3 Storage  │ Stripe API│
│  Email Service │  SMS Service │  Analytics   │  Logging  │
└───────────────────────────────────────────────────────────┘
```

---

## 2. DATABASE SCHEMA (MVP)

### 2.1 Core Entities

```sql
-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    country VARCHAR(100),
    user_type ENUM('guest', 'admin', 'partner') NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Farm Profile Table
CREATE TABLE farms (
    id UUID PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    location_latitude DECIMAL(9,6),
    location_longitude DECIMAL(9,6),
    region VARCHAR(100),
    contact_person VARCHAR(150),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    capacity INT (max guests),
    featured_image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Experiences Table
CREATE TABLE experiences (
    id UUID PRIMARY KEY,
    farm_id UUID FOREIGN KEY REFERENCES farms(id),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    duration_days INT (typically 2),
    duration_nights INT (typically 1),
    price_per_person DECIMAL(10,2),
    capacity INT,
    activities TEXT (JSON array),
    meals_included TEXT (JSON array),
    images JSONB (array of image URLs),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Bookings Table
CREATE TABLE bookings (
    id UUID PRIMARY KEY,
    experience_id UUID FOREIGN KEY REFERENCES experiences(id),
    guest_id UUID FOREIGN KEY REFERENCES users(id),
    booking_date DATE,
    num_guests INT,
    total_price DECIMAL(10,2),
    status ENUM('pending', 'confirmed', 'completed', 'cancelled'),
    special_requests TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Payments Table
CREATE TABLE payments (
    id UUID PRIMARY KEY,
    booking_id UUID FOREIGN KEY REFERENCES bookings(id),
    amount DECIMAL(10,2),
    currency ENUM('GHS', 'USD'),
    payment_method ENUM('stripe', 'bank_transfer', 'mobile_money'),
    status ENUM('pending', 'success', 'failed'),
    stripe_transaction_id VARCHAR(500),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Guest Reviews Table
CREATE TABLE reviews (
    id UUID PRIMARY KEY,
    booking_id UUID FOREIGN KEY REFERENCES bookings(id),
    guest_id UUID FOREIGN KEY REFERENCES users(id),
    rating INT (1-5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Farm Availability Table
CREATE TABLE farm_availability (
    id UUID PRIMARY KEY,
    farm_id UUID FOREIGN KEY REFERENCES farms(id),
    date DATE,
    available_slots INT,
    is_booked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Email Queue Table (for async email processing)
CREATE TABLE email_queue (
    id UUID PRIMARY KEY,
    recipient_email VARCHAR(255),
    template_name VARCHAR(100),
    data JSONB,
    status ENUM('pending', 'sent', 'failed'),
    created_at TIMESTAMP DEFAULT NOW(),
    sent_at TIMESTAMP
);
```

### 2.2 Data Indexing Strategy

```sql
-- Performance indexes
CREATE INDEX idx_bookings_guest ON bookings(guest_id);
CREATE INDEX idx_bookings_experience ON bookings(experience_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_farm_availability_date ON farm_availability(date);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_reviews_booking ON reviews(booking_id);
CREATE INDEX idx_payments_booking ON payments(booking_id);
```

---

## 3. API ENDPOINTS SPECIFICATION

### 3.1 Public Endpoints (No Authentication Required)

```
# Farm & Experience Discovery
GET /api/v1/experiences
  - Query params: region, price_range, date
  - Response: List of experiences with basic info

GET /api/v1/experiences/:id
  - Response: Detailed experience (images, activities, reviews)

GET /api/v1/farms/:id
  - Response: Farm details, contact, operations

# Availability Check
GET /api/v1/experiences/:id/availability
  - Query params: from_date, to_date
  - Response: Available dates

# Reviews (read-only)
GET /api/v1/experiences/:id/reviews
  - Query params: limit=10, offset=0
  - Response: Paginated reviews
```

### 3.2 Authenticated Endpoints (Requires JWT Token)

```
# User Management
POST /api/v1/auth/register
  - Body: {email, password, first_name, last_name, country, phone}
  - Response: {user, auth_token}

POST /api/v1/auth/login
  - Body: {email, password}
  - Response: {user, auth_token}

POST /api/v1/auth/logout
  - Response: {message: "logged out"}

GET /api/v1/auth/me
  - Response: Current user profile

PUT /api/v1/auth/profile
  - Body: {first_name, last_name, phone, country}
  - Response: Updated user

# Bookings Management
POST /api/v1/bookings
  - Body: {experience_id, booking_date, num_guests, special_requests}
  - Response: {booking, requires_payment}

GET /api/v1/bookings
  - Response: User's booking history

GET /api/v1/bookings/:id
  - Response: Booking details with confirmation

PUT /api/v1/bookings/:id/cancel
  - Response: Cancellation confirmation

# Payments
POST /api/v1/payments
  - Body: {booking_id, amount, payment_method}
  - Response: {stripe_client_secret} OR {bank_details}

POST /api/v1/payments/confirm
  - Body: {booking_id, stripe_token}
  - Response: {status, receipt}

# Reviews
POST /api/v1/bookings/:id/review
  - Body: {rating, comment}
  - Response: {review}

GET /api/v1/bookings/:id/review
  - Response: User's review for this booking (if exists)
```

### 3.3 Admin Endpoints (Requires Admin Role)

```
# Booking Management
GET /api/v1/admin/bookings
  - Query: status=pending, from_date, to_date
  - Response: All bookings with filters

PUT /api/v1/admin/bookings/:id/confirm
  - Response: Confirmed booking

GET /api/v1/admin/analytics
  - Response: {total_revenue, num_bookings, avg_rating, traffic}

# Farm Management
POST /api/v1/admin/farms
  - Body: Farm details
  - Response: Created farm

PUT /api/v1/admin/farms/:id
  - Body: Farm update
  - Response: Updated farm

PUT /api/v1/admin/farms/:id/availability
  - Body: {dates: [{date, available_slots}]}
  - Response: Updated availability
```

---

## 4. FRONTEND COMPONENTS & PAGES

### 4.1 Page Structure (Wireframe)

```
┌─────────────────────────────────────────────────────┐
│  HOMEPAGE                                            │
├─────────────────────────────────────────────────────┤
│  [Header: Nav | Logo | Auth Button]                 │
│  [Hero Section: Video + CTA "Book Experience"]      │
│  [Why Agri-Tourism: Benefits cards]                 │
│  [Featured Experience: Hero image + quick info]     │
│  [Testimonials: 3-4 guest quotes + photos]         │
│  [CTA: "Browse All Experiences"]                    │
│  [Footer: Links | Socials | Newsletter]             │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  EXPERIENCE DETAIL PAGE                              │
├─────────────────────────────────────────────────────┤
│  [Gallery: 20+ images carousel]                      │
│  [Experience Title + Rating]                         │
│  [Price & Duration Badge]                            │
│  [Narrative Description (rich text)]                │
│  [What's Included: Activities, Meals, Lodging]      │
│  [Day-by-Day Itinerary]                             │
│  [Photo Gallery by Theme (Tabs)]                    │
│  [Reviews Section (sortable by date/rating)]        │
│  [HOST/FARM INFO: Block with photo + bio]           │
│  [FAQs Accordion]                                    │
│  [BOOKING WIDGET: Calendar + CTA]                   │
│  [Similar Experiences: Carousel (future farms)]     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  BOOKING FLOW (4-Step Modal)                         │
├─────────────────────────────────────────────────────┤
│  Step 1: Select Dates & Guests                       │
│    [Calendar picker with availability]               │
│    [Number of guests dropdown]                       │
│    [Dynamic price calculation]                       │
│                                                      │
│  Step 2: Guest Details                               │
│    [First Name, Last Name, Email, Phone]            │
│    [Country, Address]                                │
│    [Special Requests textarea]                       │
│    [Agree to Terms checkbox]                         │
│                                                      │
│  Step 3: Review & Confirm                            │
│    [Booking summary with all details]                │
│    [Price breakdown]                                 │
│    [Cancellation policy]                             │
│                                                      │
│  Step 4: Payment                                     │
│    [Stripe card input OR Bank transfer details]      │
│    [Pay button]                                      │
│    [Security badges]                                 │
│                                                      │
│  Success Page:                                       │
│    [Booking confirmation]                            │
│    [Confirmation number]                             │
│    [What to expect next]                             │
│    [FAQ link]                                        │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  USER ACCOUNT DASHBOARD                              │
├─────────────────────────────────────────────────────┤
│  [Profile: Edit name, email, phone]                  │
│  [My Bookings: List of past/upcoming]                │
│    - Each booking card: dates, experience, status    │
│    - Actions: View details, Cancel, Leave review     │
│  [Messages: Communication with farm hosts]           │
│  [Saved Experiences (wishlist)]                      │
│  [Account Settings: Password, preferences]           │
└─────────────────────────────────────────────────────┘
```

### 4.2 Key Frontend Components (Reusable)

```jsx
Components Needed:
- Header/Navigation (sticky, mobile-aware)
- Footer (5 column)
- Hero Section (video background)
- Experience Card (grid layout)
- Image Gallery/Carousel (Lightbox)
- Testimonial Card
- Calendar Picker (availability aware)
- Guest Details Form
- Price Summary Widget
- Review Card
- Rating Stars Component
- CTA Buttons (consistent styling)
- Loading Spinner
- Modal/Dialog (for booking flow)
- Pagination (for reviews/listings)
- Search/Filter Bar
- Social Share Buttons
- Newsletter Signup
```

---

## 5. SECURITY & COMPLIANCE

### 5.1 Authentication & Authorization

```
• JWT tokens for session management
• Password hashing: bcrypt (salt rounds: 10)
• HTTPS required for all API calls
• CORS: Only whitelist production domain
• Rate limiting: 100 requests/minute per IP
• Token expiry: 7 days (with refresh token)
• 2FA: Optional for admin accounts
```

### 5.2 Data Protection

```
• PCI DSS compliance: Use Stripe Hosted Fields (no card storage)
• Data encryption: AES-256 for sensitive fields
• PII: Encrypted in transit and at rest
• GDPR compliance: Right to deletion, data export
• CCPA: Privacy policy & opt-out mechanisms
• Backup: Daily automated, encrypted, geo-redundant
• Audit logs: All admin actions logged with timestamp/user
```

### 5.3 Vulnerability Management

```
• OWASP Top 10: Mitigations documented
• SQL Injection: Use parameterized queries
• XSS Prevention: Sanitize inputs, Content Security Policy headers
• CSRF: Token-based protection on forms
• Dependency scanning: Weekly vulnerability checks
• Penetration testing: Pre-launch (optional)
• Security headers: X-Frame-Options, X-Content-Type-Options, etc.
```

---

## 6. PERFORMANCE REQUIREMENTS

### 6.1 Frontend Performance Targets

```
Metric              Target      Measurement Tool
─────────────────────────────────────────────
Page Load Time      <3 seconds  Google PageSpeed
First Contentful Paint <1.5s   Google Lighthouse
Largest Contentful Paint <2.5s Lighthouse
Cumulative Layout Shift <0.1    Lighthouse
Time to Interactive <3.5s       Lighthouse
Mobile Score        >90         Lighthouse
Desktop Score       >95         Lighthouse

Optimization tactics:
- Image optimization: Convert to WebP, lazy loading
- Code splitting: Async chunk loading
- CSS minification
- JavaScript minification & tree-shaking
- CDN for static assets (Cloudflare)
- Browser caching (cache headers)
```

### 6.2 Backend Performance

```
API Response Time Targets:
- GET /experiences: <200ms (cached)
- GET /experiences/:id: <300ms 
- POST /bookings: <500ms
- POST /payments: <2s (awaiting Stripe)

Database Query Targets:
- All queries: <100ms (99th percentile)
- Complex queries: <500ms max

Concurrency:
- Support 100 simultaneous users
- Database connection pool: 20-40 connections
```

### 6.3 Uptime & Reliability

```
Target Uptime: 99% (52 min downtime/month acceptable)
- Load balancing: 2+ server instances
- Auto-scaling: Based on CPU/memory thresholds
- Database replication: Active-Passive setup
- Health checks: Every 30 seconds
- Failover: <2 min automatic
```

---

## 7. EXTERNAL INTEGRATIONS

### 7.1 Payment Processing (Stripe)

```
# MVP Phase Implementation
- Stripe Elements for card collection
- Webhook handling for payment status updates
- Refund processing for cancellations
- Settlement reports (daily/weekly)
- Test mode for QA

# Data Flow
Guest submits payment → Stripe API → Webhook callback → 
DB update (booking confirmed) → Send confirmation email

# Error Handling
Failed payment → Retry with exponential backoff →
Send user email requesting resubmission
```

### 7.2 Email Service (SendGrid or AWS SES)

```
Email Templates Needed:
1. Welcome/Registration email
2. Booking confirmation with details
3. Reminders: 7 days before, 1 day before
4. Post-experience: Review request
5. Cancellation confirmation
6. Receipt/Invoice
7. Marketing newsletter
8. Password reset

Scheduling:
- Transactional: Sent immediately
- Reminder: Scheduled via cron job
- Newsletter: Manual or scheduled sequence
```

### 7.3 Analytics (Google Analytics 4)

```
Tracking Events:
- page_view: Every page
- experience_view: When viewing details
- start_booking: When booking flow started
- begin_payment: When entering payment info
- complete_booking: After successful booking
- share_experience: Social sharing

Goals/Conversions:
- Booking completion (primary KPI)
- Newsletter signup
- Contact farm

Dashboard Metrics:
- Top experiences by view
- Conversion funnel analysis
- Traffic source attribution
- Geographic visitor data
```

### 7.4 SMS Service (Optional - Phase 2)

```
Future implementation for:
- Booking reminders (24 hours before)
- Guest check-in confirmation
- Emergency contact during experience
- OTP for 2FA
```

---

## 8. DEPLOYMENT & DEVOPS

### 8.1 Environment Strategy

```
Development (Dev)
├── Local machine development
├── Local database
├── Test Stripe account
└── Unrestricted logging

Staging
├── AWS EC2 (t3.micro)
├── PostgreSQL replica of production structure
├── Test data seeds
└── Full testing before prod

Production
├── AWS EC2 (t3.small, scaled to t3.medium as traffic grows)
├── PostgreSQL managed (AWS RDS)
├── CloudFront CDN
├── Automated backups
└── Monitoring & alerts
```

### 8.2 Deployment Pipeline

```
1. Developer commits to GitHub
2. GitHub Actions triggers:
   - Run tests (unit + integration)
   - Build Docker image
   - Push to container registry
3. If tests pass:
   - Deploy to Staging
   - Run smoke tests
   - Notify team
4. Manual approval for Production:
   - Review logs
   - Check metrics
   - Click "Deploy to Prod"
5. Production deployment:
   - Gradual rollout (blue-green deployment)
   - Monitor for errors
   - Auto-rollback if error rate spikes
```

### 8.3 Monitoring & Alerting

```
Monitoring Tools: DataDog or New Relic

Key Metrics:
- Server CPU/Memory usage
- Database query performance
- API response times
- Error rate (aim: <0.1%)
- Payment success rate (aim: >98%)
- Daily active users
- Booking rate

Alerts (Send to Slack):
- Error rate > 1%
- Response time > 5s
- Database connection pool full
- Disk space > 80%
- Payment API down
- Any production errors (high priority)
```

---

## 9. TESTING STRATEGY

### 9.1 Test Coverage Targets

```
Unit Tests (Jest/Mocha)
- Target: 80%+ code coverage
- All business logic functions
- All API endpoint logic
- Payment processing logic

Integration Tests
- Booking flow end-to-end
- Payment processing with Stripe test API
- Email sending via SendGrid sandbox
- Database queries with test data

E2E Tests (Cypress/Playwright)
- User guest journey: Browse → Book → Pay
- Admin: Create farm, manage bookings
- Search and filter experiences
- User account management

Penetration Testing
- SQL injection attempts
- XSS payload testing
- CSRF token validation
- Authentication bypass attempts

Performance/Load Testing
- Simulate 100 concurrent users
- Target: 95th percentile response time <1s
- Database query analysis
```

### 9.2 Pre-Launch Testing Checklist

```
✓ All unit tests passing (100%)
✓ All integration tests passing
✓ E2E tests passing across browsers (Chrome, Firefox, Safari, Mobile)
✓ Payment flow tested with Stripe test account
✓ Email sending tested (check templates)
✓ Mobile responsiveness verified (5 devices)
✓ Page load time <3s (verified)
✓ All external integrations tested
✓ Database backup & restore tested
✓ Security audit completed
✓ User feedback from closed beta reviewed
✓ Documentation complete & reviewed
```

---

## 10. MAINTENANCE & SUPPORT

### 10.1 Post-Launch SLA

```
Issue Severity & Response Times
─────────────────────────────────
Critical (Site down):        30 min response, 2 hour fix target
High (Feature broken):        2 hour response, 8 hour fix target
Medium (Degradation):         4 hour response, 24 hour fix target
Low (Minor bugs):             24 hour response, week fix target

Support Hours:
- Hours: 8 AM - 6 PM GMT (Mon-Fri)
- On-call: 24 hr critical issues (first 3 months post-launch)
```

### 10.2 Ongoing Maintenance Tasks

```
Daily:
- Monitor error logs (dashboard)
- Check payment reconciliation
- Verify backups completed

Weekly:
- Review analytics (traffic, conversions)
- Check dependency security updates
- Performance metrics review

Monthly:
- Database optimization (VACUUM/ANALYZE)
- Review user feedback
- Capacity planning
- Patch management

Quarterly:
- Full security audit
- Load testing
- Disaster recovery drill
- Roadmap review
```

---

## APPENDIX: Tech Stack Summary

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Frontend** | HTML5, CSS3, Vanilla JS | Lightweight, fast, no heavy framework for MVP |
| **Backend** | Node.js + Express | Fast, JavaScript full-stack, easy async handling |
| **Database** | PostgreSQL | Reliable, free, excellent for structured data |
| **Caching** | Redis | Session management, rate limiting |
| **Storage** | AWS S3 | Scalable image storage, CDN integration |
| **Hosting** | AWS EC2 | Flexible, scalable, good Ghana region coverage |
| **Payments** | Stripe + Local Bank | International + local capabilities |
| **Email** | SendGrid | Reliable delivery, good templates |
| **Analytics** | Google Analytics 4 | Free, standard, good insights |
| **CI/CD** | GitHub Actions | Built into GitHub, no extra cost |
| **Monitoring** | Sentry + CloudWatch | Exception tracking + infrastructure |

---

**Next Review**: After MVP Launch + 1 month  
**Owner**: Lead Developer & Backend Architect

