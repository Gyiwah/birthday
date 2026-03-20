// Main Application Script for FarmStay Ghana MVP
// Handles all interactions: browsing, booking flows, user management

// ============= INITIALIZATION =============
document.addEventListener('DOMContentLoaded', function() {
    initializeExperiences();
    setupMobileMenu();
    loadUserData();
});

// ============= NAVIGATION & MENU =============
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (!hamburger) return;
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============= EXPERIENCE DETAILS =============
function viewExperienceDetail(experienceId) {
    const experience = getExperienceById(experienceId);
    if (!experience) return;
    
    const detailHTML = `
        <div class="experience-detail-container">
            <!-- Gallery Section -->
            <div class="detail-gallery">
                <div class="main-image">
                    <img id="mainImageDisplay" src="${experience.mainImage}" alt="${experience.title}" onerror="this.src='experience-placeholder.jpg'">
                </div>
                <div class="thumbnail-gallery">
                    ${experience.images.map((img, idx) => `
                        <img src="${img}" alt="View ${idx + 1}" onclick="updateMainImage('${img}')" 
                             class="${idx === 0 ? 'active' : ''}" onerror="this.src='experience-placeholder.jpg'">
                    `).join('')}
                </div>
            </div>
            
            <!-- Experience Info -->
            <div class="detail-content">
                <h1>${experience.title}</h1>
                <div class="experience-meta">
                    <span class="rating">⭐ ${experience.rating} (${experience.reviews} reviews)</span>
                    <span class="price">Price: ₵${experience.price} per person</span>
                </div>
                
                <div class="info-section">
                    <h2>Experience Overview</h2>
                    <p>${experience.narrative}</p>
                </div>
                
                <div class="two-column">
                    <div class="info-section">
                        <h3>📍 Location & Duration</h3>
                        <p><strong>Farm:</strong> ${experience.farmName}</p>
                        <p><strong>Region:</strong> ${experience.location}</p>
                        <p><strong>Duration:</strong> ${experience.duration.days} Days / ${experience.duration.nights} Night(s)</p>
                        <p><strong>Group Size:</strong> ${experience.minGuests}-${experience.maxGuests} guests</p>
                    </div>
                    
                    <div class="info-section">
                        <h3>🏡 Accommodation</h3>
                        <p>${experience.accommodation}</p>
                    </div>
                </div>
                
                <div class="info-section">
                    <h3>🎯 Activities</h3>
                    <ul class="activity-list">
                        ${experience.activities.map(activity => `<li>✓ ${activity}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="two-column">
                    <div class="info-section">
                        <h3>🍽️ Meals</h3>
                        <ul>
                            ${experience.meals.map(meal => `<li>✓ ${meal}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="info-section">
                        <h3>✅ What's Included</h3>
                        <ul>
                            ${experience.included.map(item => `<li>✓ ${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="info-section">
                    <h3>❌ What's NOT Included</h3>
                    <ul>
                        ${experience.notIncluded.map(item => `<li>✗ ${item}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="info-section">
                    <h3>📅 Itinerary</h3>
                    <div class="itinerary">
                        ${experience.itinerary.map(day => `
                            <div class="itinerary-day">
                                <h4>Day ${day.day}: ${day.title}</h4>
                                <ul>
                                    ${day.events.map(event => `<li>${event}</li>`).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="info-section">
                    <h3>👨‍🌾 Meet Your Host</h3>
                    <div class="host-card">
                        <h4>${experience.hostInfo.name}</h4>
                        <p class="host-role">${experience.hostInfo.role}</p>
                        <p>${experience.hostInfo.bio}</p>
                    </div>
                </div>
                
                <div class="info-section">
                    <h3>⚠️ Important Information</h3>
                    <p><strong>Safety:</strong> ${experience.safetyInfo}</p>
                    <p><strong>Best Time to Visit:</strong> ${experience.bestTimeToVisit}</p>
                    <p><strong>Cancellation Policy:</strong> ${experience.cancellationPolicy}</p>
                </div>
                
                <div class="booking-actions">
                    <button class="cta-button" onclick="startBooking(${experience.id})">Book This Experience</button>
                    <button class="btn-secondary" onclick="closeModal('experienceModal')">Close</button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('experienceDetail').innerHTML = detailHTML;
    openModal('experienceModal');
}

function updateMainImage(imageSrc) {
    document.getElementById('mainImageDisplay').src = imageSrc;
    document.querySelectorAll('.thumbnail-gallery img').forEach(img => {
        img.classList.remove('active');
    });
    event.target.classList.add('active');
}

// ============= BOOKING FLOW =============
function startBooking(experienceId) {
    const experience = getExperienceById(experienceId);
    if (!experience) return;
    
    window.currentBooking = {
        experienceId: experienceId,
        experienceName: experience.title,
        pricePerPerson: experience.price,
        currentStep: 1,
        totalSteps: 4
    };
    
    closeModal('experienceModal');
    showBookingStep(1);
    openModal('bookingModal');
}

function showBookingStep(step) {
    const booking = window.currentBooking;
    const container = document.getElementById('bookingContainer');
    
    let html = `
        <div class="booking-progress">
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${(step / booking.totalSteps) * 100}%"></div>
            </div>
            <p>Step ${step} of ${booking.totalSteps}</p>
        </div>
    `;
    
    if (step === 1) {
        // Date & Guest Selection
        const experience = getExperienceById(booking.experienceId);
        html += `
            <div class="booking-step">
                <h2>Select Your Dates & Guests</h2>
                <div class="form-group">
                    <label>Check-in Date</label>
                    <select id="checkInDate" onchange="updateBookingSummary()">
                        <option value="">Select a date...</option>
                        ${experience.availableDates.map(date => `
                            <option value="${date}">${formatDate(date)}</option>
                        `).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Number of Guests</label>
                    <select id="numGuests" onchange="updateBookingSummary()">
                        ${Array.from({length: experience.maxGuests - experience.minGuests + 1}, (_, i) => 
                            `<option value="${i + experience.minGuests}">${i + experience.minGuests} guest${i + experience.minGuests > 1 ? 's' : ''}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <div class="booking-summary">
                    <h3>Price Breakdown</h3>
                    <div class="summary-line">
                        <span>Price per person:</span>
                        <span>$${experience.price}</span>
                    </div>
                    <div class="summary-line">
                        <span id="guestCount">1 guest</span>
                        <span id="guestTotal">₵${experience.price}</span>
                    </div>
                    <div class="summary-line total">
                        <span>Total Price:</span>
                        <span id="totalPrice">₵${experience.price}</span>
                    </div>
                </div>
                
                <div class="booking-buttons">
                    <button class="btn-secondary" onclick="closeModal('bookingModal')">Cancel</button>
                    <button class="cta-button" onclick="proceedToStep(2)" id="nextBtn1" disabled>Next: Guest Details →</button>
                </div>
            </div>
        `;
    } else if (step === 2) {
        // Guest Details
        html += `
            <div class="booking-step">
                <h2>Guest Details</h2>
                <div class="form-group">
                    <label>First Name *</label>
                    <input type="text" id="firstName" placeholder="Your first name">
                </div>
                
                <div class="form-group">
                    <label>Last Name *</label>
                    <input type="text" id="lastName" placeholder="Your last name">
                </div>
                
                <div class="form-group">
                    <label>Email Address *</label>
                    <input type="email" id="email" placeholder="your.email@example.com">
                </div>
                
                <div class="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" id="phone" placeholder="+233 XXX XXX XXX">
                </div>
                
                <div class="form-group">
                    <label>Country *</label>
                    <input type="text" id="country" placeholder="Your country">
                </div>
                
                <div class="form-group">
                    <label>Special Requests (e.g., dietary preferences)</label>
                    <textarea id="specialRequests" placeholder="Tell us about any special needs..." rows="4"></textarea>
                </div>
                
                <div class="booking-buttons">
                    <button class="btn-secondary" onclick="proceedToStep(1)">← Back</button>
                    <button class="cta-button" onclick="proceedToStep(3)">Next: Review →</button>
                </div>
            </div>
        `;
    } else if (step === 3) {
        // Review Booking
        const experience = getExperienceById(booking.experienceId);
        const checkInDate = document.getElementById('checkInDate')?.value || booking.checkInDate;
        const numGuests = parseInt(document.getElementById('numGuests')?.value || 1);
        
        html += `
            <div class="booking-step">
                <h2>Review Your Booking</h2>
                <div class="review-section">
                    <h3>Experience Details</h3>
                    <p><strong>Experience:</strong> ${booking.experienceName}</p>
                    <p><strong>Farm:</strong> ${experience.farmName}</p>
                    <p><strong>Duration:</strong> ${experience.duration.days}D/${experience.duration.nights}N</p>
                    <p><strong>Check-in:</strong> ${formatDate(checkInDate)}</p>
                    <p><strong>Number of Guests:</strong> ${numGuests}</p>
                </div>
                
                <div class="review-section">
                    <h3>Guest Information</h3>
                    <p><strong>Name:</strong> ${document.getElementById('firstName')?.value} ${document.getElementById('lastName')?.value}</p>
                    <p><strong>Email:</strong> ${document.getElementById('email')?.value}</p>
                    <p><strong>Phone:</strong> ${document.getElementById('phone')?.value}</p>
                    <p><strong>Country:</strong> ${document.getElementById('country')?.value}</p>
                </div>
                
                <div class="review-section">
                    <h3>Price Summary</h3>
                    <div class="summary-line">
                        <span>₵${booking.pricePerPerson} × ${numGuests} guests</span>
                        <span>₵${booking.pricePerPerson * numGuests}</span>
                    </div>
                    <div class="summary-line total">
                        <span>Total Amount Due:</span>
                        <span>₵${booking.pricePerPerson * numGuests}</span>
                    </div>
                </div>
                
                <div class="review-section">
                    <h3>Cancellation Policy</h3>
                    <p>${experience.cancellationPolicy}</p>
                </div>
                
                <div class="terms-checkbox">
                    <input type="checkbox" id="agreeTerms">
                    <label for="agreeTerms">I agree to the terms and conditions</label>
                </div>
                
                <div class="booking-buttons">
                    <button class="btn-secondary" onclick="proceedToStep(2)">← Back</button>
                    <button class="cta-button" onclick="proceedToStep(4)" id="reviewBtn" disabled>Next: Payment →</button>
                </div>
            </div>
        `;
        
        setTimeout(() => {
            document.getElementById('agreeTerms').addEventListener('change', () => {
                document.getElementById('reviewBtn').disabled = !document.getElementById('agreeTerms').checked;
            });
        }, 100);
    } else if (step === 4) {
        // Payment
        html += `
            <div class="booking-step">
                <h2>Complete Your Booking</h2>
                
                <div class="payment-methods">
                    <h3>Select Payment Method</h3>
                    ${paymentMethods.map(method => `
                        <div class="payment-option">
                            <input type="radio" name="paymentMethod" value="${method.id}" id="pay_${method.id}" onchange="updatePaymentDisplay('${method.id}')">
                            <label for="pay_${method.id}">${method.icon} ${method.name}</label>
                        </div>
                    `).join('')}
                </div>
                
                <div id="paymentDetails" class="payment-details">
                    <!-- Payment details will be shown based on method selection -->
                </div>
                
                <div class="booking-buttons">
                    <button class="btn-secondary" onclick="proceedToStep(3)">← Back</button>
                    <button class="cta-button" onclick="completeBooking()" id="completeBtn" disabled>Confirm Booking</button>
                </div>
            </div>
        `;
    }
    
    container.innerHTML = html;
    booking.currentStep = step;
}

function updateBookingSummary() {
    const checkInDate = document.getElementById('checkInDate')?.value;
    const numGuests = parseInt(document.getElementById('numGuests')?.value || 1);
    const booking = window.currentBooking;
    const totalPrice = booking.pricePerPerson * numGuests;
    
    document.getElementById('guestCount').textContent = `${numGuests} guest${numGuests > 1 ? 's' : ''}`;
    document.getElementById('guestTotal').textContent = `₵${totalPrice}`;
    document.getElementById('totalPrice').textContent = `₵${totalPrice}`;
    
    const nextBtn = document.getElementById('nextBtn1');
    if (nextBtn) {
        nextBtn.disabled = !checkInDate;
    }
    
    booking.checkInDate = checkInDate;
    booking.numGuests = numGuests;
    booking.totalPrice = totalPrice;
}

function updatePaymentDisplay(method) {
    const detailsDiv = document.getElementById('paymentDetails');
    const completeBtn = document.getElementById('completeBtn');
    
    if (method === 'stripe') {
        detailsDiv.innerHTML = `
            <div class="payment-form">
                <h4>💳 Credit/Debit Card</h4>
                <div class="form-group">
                    <label>Cardholder Name</label>
                    <input type="text" placeholder="John Doe">
                </div>
                <div class="form-group">
                    <label>Card Number</label>
                    <input type="text" placeholder="4242 4242 4242 4242" maxlength="19">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Expires</label>
                        <input type="text" placeholder="MM/YY" maxlength="5">
                    </div>
                    <div class="form-group">
                        <label>CVC</label>
                        <input type="text" placeholder="123" maxlength="3">
                    </div>
                </div>
                <p class="info-text">Test: Use 4242-4242-4242-4242 (valid until any future date)</p>
            </div>
        `;
    } else if (method === 'bank') {
        detailsDiv.innerHTML = `
            <div class="payment-form">
                <h4>🏦 Bank Transfer</h4>
                <p>Please transfer the amount to:</p>
                <div class="bank-details">
                    <p><strong>Bank:</strong> Ghana National Bank</p>
                    <p><strong>Account Name:</strong> FarmStay Ghana Ltd</p>
                    <p><strong>Account Number:</strong> 1234567890</p>
                    <p><strong>Routing Number:</strong> GH1234</p>
                    <p><strong>Amount (GHS):</strong> ₵${window.currentBooking.totalPrice}</p>
                </div>
                <p class="info-text">Your booking will be confirmed once payment is received.</p>
            </div>
        `;
    } else if (method === 'momo') {
        detailsDiv.innerHTML = `
            <div class="payment-form">
                <h4>📱 Mobile Money</h4>
                <div class="form-group">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="0541234567">
                </div>
                <div class="form-group">
                    <label>Provider</label>
                    <select>
                        <option>MTN Mobile Money</option>
                        <option>Vodafone Cash</option>
                        <option>AirtelTigo Money</option>
                    </select>
                </div>
                <p class="info-text">You will receive a prompt to confirm payment on your phone.</p>
            </div>
        `;
    }
    
    completeBtn.disabled = false;
}

function proceedToStep(step) {
    if (step === 2) {
        // Validate Step 1
        const checkInDate = document.getElementById('checkInDate')?.value;
        if (!checkInDate) {
            alert('Please select a check-in date');
            return;
        }
    } else if (step === 3) {
        // Validate Step 2
        const firstName = document.getElementById('firstName')?.value;
        const lastName = document.getElementById('lastName')?.value;
        const email = document.getElementById('email')?.value;
        const phone = document.getElementById('phone')?.value;
        
        if (!firstName || !lastName || !email || !phone) {
            alert('Please fill in all required fields');
            return;
        }
        
        if (!email.includes('@')) {
            alert('Please enter a valid email address');
            return;
        }
    }
    
    showBookingStep(step);
}

function completeBooking() {
    const booking = window.currentBooking;
    const firstName = document.getElementById('firstName')?.value;
    const lastName = document.getElementById('lastName')?.value;
    const email = document.getElementById('email')?.value;
    const phone = document.getElementById('phone')?.value;
    const country = document.getElementById('country')?.value;
    const specialRequests = document.getElementById('specialRequests')?.value || '';
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;
    
    if (!paymentMethod) {
        alert('Please select a payment method');
        return;
    }
    
    // Create booking object
    const newBooking = {
        experienceId: booking.experienceId,
        experienceName: booking.experienceName,
        checkInDate: booking.checkInDate,
        numGuests: booking.numGuests,
        totalPrice: booking.totalPrice,
        status: 'pending',
        paymentMethod: paymentMethod,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        country: country,
        specialRequests: specialRequests,
        bookedAt: new Date().toISOString()
    };
    
    // Save to storage
    const savedBooking = Storage.setBooking(newBooking);
    
    // Show success modal
    showSuccessModal(savedBooking);
    
    // Close booking modal
    closeModal('bookingModal');
}

function showSuccessModal(booking) {
    document.getElementById('confirmationNumber').textContent = booking.confirmationNumber;
    document.getElementById('successDetails').innerHTML = `
        <div class="success-booking-details">
            <p><strong>Experience:</strong> ${booking.experienceName}</p>
            <p><strong>Check-in:</strong> ${formatDate(booking.checkInDate)}</p>
            <p><strong>Guests:</strong> ${booking.numGuests}</p>
            <p><strong>Total:</strong> ${formatPrice(booking.totalPrice)}</p>
            <p><strong>Confirmation email will be sent to:</strong> ${booking.email}</p>
        </div>
    `;
    openModal('successModal');
}

// ============= USER DASHBOARD =============
function loadUserData() {
    const user = Storage.getUser();
    if (!user) return;
    
    // Store in window for access from dashboard
    window.currentUser = user;
}

function subscribeNewsletter() {
    const email = document.getElementById('newsletterEmail')?.value;
    if (!email) {
        alert('Please enter your email');
        return;
    }
    
    if (!email.includes('@')) {
        alert('Please enter a valid email');
        return;
    }
    
    alert(`Thank you for subscribing! Check ${email} for updates.`);
    if (document.getElementById('newsletterEmail')) {
        document.getElementById('newsletterEmail').value = '';
    }
}

// ============= MODAL MANAGEMENT =============
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// ============= UTILITY FUNCTIONS =============
function formatDate(dateStr) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
}

function formatPrice(price, decimals = 2) {
    return '₵' + parseFloat(price).toFixed(decimals);
}

// ============= DASHBOARD FUNCTIONS (loaded from dashboard.html) =============
function initializeDashboard() {
    const user = Storage.getUser();
    if (!user) return;
    
    if (document.getElementById('userName')) {
        document.getElementById('userName').textContent = `${user.firstName} ${user.lastName}`;
    }
    
    const bookings = Storage.getBookings();
    displayBookings(bookings);
}

function displayBookings(bookings) {
    const container = document.getElementById('bookingsContainer');
    if (!container) return;
    
    if (bookings.length === 0) {
        container.innerHTML = '<p class="no-bookings">No bookings yet. <a href="index.html">Browse experiences</a></p>';
        return;
    }
    
    container.innerHTML = bookings.map(booking => `
        <div class="booking-card">
            <div class="booking-header">
                <h3>${booking.experienceName}</h3>
                <span class="status-badge status-${booking.status.toLowerCase()}">${booking.status.toUpperCase()}</span>
            </div>
            <div class="booking-details">
                <p><strong>Confirmation:</strong> ${booking.confirmationNumber}</p>
                <p><strong>Check-in:</strong> ${formatDate(booking.checkInDate)}</p>
                <p><strong>Guests:</strong> ${booking.numGuests}</p>
                <p><strong>Total Amount:</strong> ${formatPrice(booking.totalPrice)}</p>
                <p><strong>Payment Method:</strong> ${booking.paymentMethod}</p>
            </div>
            <div class="booking-actions">
                <button class="btn-secondary" onclick="viewBookingDetails('${booking.id}')">View Details</button>
                <button class="btn-secondary" onclick="cancelBooking('${booking.id}')">Cancel Booking</button>
            </div>
        </div>
    `).join('');
}

function cancelBooking(bookingId) {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    
    let bookings = Storage.getBookings();
    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    
    if (bookingIndex > -1) {
        bookings[bookingIndex].status = 'cancelled';
        localStorage.setItem('bookings', JSON.stringify(bookings));
        alert('Booking cancelled successfully.');
        location.reload();
    }
}

function viewBookingDetails(bookingId) {
    const bookings = Storage.getBookings();
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;
    
    alert(`Booking Details for ${booking.experienceName}\n\nConfirmation: ${booking.confirmationNumber}\nCheck-in: ${formatDate(booking.checkInDate)}\nGuests: ${booking.numGuests}\nTotal: $${booking.totalPrice}\nStatus: ${booking.status}`);
}

// ============= ADMIN FUNCTIONS =============
function initializeAdmin() {
    loadAdminBookings();
    loadAdminAnalytics();
}

function loadAdminBookings() {
    const bookings = Storage.getBookings();
    const container = document.getElementById('adminBookingsContainer');
    if (!container) return;
    
    if (bookings.length === 0) {
        container.innerHTML = '<p>No bookings yet.</p>';
        return;
    }
    
    container.innerHTML = `
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Confirmation</th>
                    <th>Experience</th>
                    <th>Guest</th>
                    <th>Check-in</th>
                    <th>Guests</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${bookings.map(booking => `
                    <tr>
                        <td>${booking.confirmationNumber}</td>
                        <td>${booking.experienceName}</td>
                        <td>${booking.firstName} ${booking.lastName}</td>
                        <td>${formatDate(booking.checkInDate)}</td>
                        <td>${booking.numGuests}</td>
                        <td>${formatPrice(booking.totalPrice)}</td>
                        <td><span class="status-${booking.status}">${booking.status}</span></td>
                        <td>
                            <button onclick="updateBookingStatus('${booking.id}', 'confirmed')" class="btn-small">Confirm</button>
                            <button onclick="deleteBooking('${booking.id}')" class="btn-small btn-danger">Delete</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function loadAdminAnalytics() {
    const bookings = Storage.getBookings();
    const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
    const totalBookings = bookings.length;
    const topExperience = bookings.length > 0 ? bookings[0].experienceName : 'N/A';
    
    document.getElementById('totalRevenue').textContent = formatPrice(totalRevenue);
    document.getElementById('totalBookings').textContent = totalBookings;
    document.getElementById('topExperience').textContent = topExperience;
}

function updateBookingStatus(bookingId, newStatus) {
    let bookings = Storage.getBookings();
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
        booking.status = newStatus;
        localStorage.setItem('bookings', JSON.stringify(bookings));
        loadAdminBookings();
        alert(`Booking updated to ${newStatus}`);
    }
}

function deleteBooking(bookingId) {
    if (!confirm('Delete this booking?')) return;
    
    let bookings = Storage.getBookings();
    const filtered = bookings.filter(b => b.id !== bookingId);
    localStorage.setItem('bookings', JSON.stringify(filtered));
    loadAdminBookings();
    loadAdminAnalytics();
}

function exportBookingsCSV() {
    const bookings = Storage.getBookings();
    if (bookings.length === 0) {
        alert('No bookings to export');
        return;
    }
    
    let csv = 'Confirmation,Experience,Guest,Email,Phone,CheckIn,Guests,Amount_GHS,Status\n';
    csv += bookings.map(b => 
        `${b.confirmationNumber},"${b.experienceName}","${b.firstName} ${b.lastName}",${b.email},${b.phone},${b.checkInDate},${b.numGuests},₵${b.totalPrice},${b.status}`
    ).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `farmstay-bookings-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
}
