// Mock Experience Data for MVP
const experiences = [
    {
        id: 1,
        title: "Cocoa Cultivation Weekend",
        farmName: "Kakum Heritage Farm",
        location: "Central Region, Ghana",
        duration: { days: 2, nights: 1 },
        price: 750,
        currency: "GHS",
        rating: 4.8,
        reviews: 42,
        mainImage: "1.jpg",
        images: [
            "1.jpg",
            "2.jpg",
            "3.jpg",
            "4.jpg",
        ],
        description: "Experience the art and science of cocoa farming in Ghana's heartland. Discover how cocoa beans are cultivated, fermented, and dried before they become world-class chocolate.",
        narrative: `
            Join us for an immersive journey into Ghana's most iconic agricultural heritage. 
            Our 2-day Cocoa Cultivation experience connects you directly with a farming family 
            who has been cultivating cocoa for three generations. You'll participate in hands-on 
            activities including bean fermentation, traditional drying techniques, and learn the 
            cultural significance of cocoa in Ghanaian communities.
        `,
        activities: [
            "Farm orientation and farm family introduction",
            "Cocoa pod harvesting techniques",
            "Bean fermentation process (guided by farmer)",
            "Traditional sun-drying methods",
            "Cocoa tasting and quality assessment workshop",
            "Evening cultural performance and farm family dinner",
            "Early morning plantation walk and bird watching"
        ],
        meals: [
            "Welcome lunch on Day 1",
            "Traditional cocoa farmer's dinner on Day 1",
            "Breakfast on Day 2",
            "Departure meal on Day 2"
        ],
        accommodation: "Comfortable single/double rooms in the farmhouse with shared bathroom facilities",
        included: [
            "1 night accommodation",
            "4 meals (local and international cuisine)",
            "All activities and materials",
            "Transportation to/from meeting point",
            "Professional English-speaking guide",
            "Cocoa samples to take home"
        ],
        notIncluded: [
            "International flights",
            "Travel insurance",
            "Personal expenses",
            "Gratuities"
        ],
        highlights: [
            "Work directly with a farming family",
            "Learn traditional fermentation techniques",
            "Taste diverse cocoa varieties",
            "Immersive cultural exchange"
        ],
        hostInfo: {
            name: "Kofi & Ama Mensah",
            role: "Farm Owners, 3rd Generation Cocoa Farmers",
            bio: "Kofi and Ama have been managing their 50-hectare cocoa farm for 15 years. They are passionate about sharing their agricultural heritage and building bridges between farming communities and urban visitors.",
            image: "photo-1.jpg"
        },
        itinerary: [
            {
                day: 1,
                title: "Arrival & Farm Orientation",
                events: [
                    "12:00 PM - Pickup from central meeting point",
                    "2:00 PM - Arrive at farm, welcome refreshment",
                    "3:00 PM - Meet the farm family, farm orientation tour",
                    "5:00 PM - Rest and freshen up",
                    "7:00 PM - Traditional dinner with farm family",
                    "9:00 PM - Rest"
                ]
            },
            {
                day: 2,
                title: "Hands-On Cocoa Experience",
                events: [
                    "6:00 AM - Early morning plantation walk",
                    "7:30 AM - Breakfast",
                    "9:00 AM - Cocoa pod harvesting demonstration",
                    "11:00 AM - Bean fermentation workshop",
                    "1:00 PM - Lunch",
                    "3:00 PM - Sun-drying techniques & quality assessment",
                    "5:00 PM - Cocoa tasting session",
                    "7:00 PM - Return to meeting point"
                ]
            }
        ],
        cancellationPolicy: "Free cancellation 14 days before experience. 50% refund 7-14 days. No refund within 7 days.",
        safetyInfo: "All activities have trained supervisors. Guests must complete medical screening. Farm provides safety equipment.",
        bestTimeToVisit: "November to March (dry season). Optimal conditions for outdoor activities.",
        availableDates: ["2026-04-15", "2026-04-22", "2026-04-29", "2026-05-06"],
        maxGuests: 8,
        minGuests: 2
    },
    {
        id: 2,
        title: "Pineapple Harvest & Processing",
        farmName: "Ashanti Valley Farm",
        location: "Ashanti Region, Ghana",
        duration: { days: 2, nights: 1 },
        price: 680,
        currency: "GHS",
        rating: 4.7,
        reviews: 38,
        mainImage: "5.jpg",
        images: [
            "5.jpg",
            "6.jpg",
            "7.jpg",
            "photo1.jpg",
        ],
        description: "Participate in fresh pineapple harvesting and learn traditional processing techniques used by Ghanaian farmers for centuries.",
        narrative: `
            Experience the vibrant world of pineapple farming in the lush Ashanti region. 
            This experience takes you through the complete cycle of pineapple cultivation, 
            from plant care to harvesting and processing into juice and preserves. The farm 
            is managed by a dynamic family committed to sustainable farming practices.
        `,
        activities: [
            "Pineapple plantation tour and plant care techniques",
            "Field harvesting with experienced farmers",
            "Pineapple selection and grading process",
            "Juice extraction and bottling workshop",
            "Jam and preserve making demonstration",
            "Market visit to learn about distribution",
            "Evening storytelling and traditional music"
        ],
        meals: [
            "Welcome lunch on Day 1",
            "Home-cooked farm dinner featuring pineapple dishes on Day 1",
            "Breakfast on Day 2",
            "Departure lunch on Day 2"
        ],
        accommodation: "Clean, modern rooms with private bathrooms in the newly renovated farmhouse",
        included: [
            "1 night accommodation",
            "4 meals featuring farm produce",
            "All harvesting and processing activities",
            "Transportation from meeting point",
            "Bilingual guide (English/Twi)",
            "Fresh pineapple juice bottles to take home"
        ],
        notIncluded: [
            "International flights",
            "Travel insurance",
            "Souvenir purchases",
            "Gratuities"
        ],
        highlights: [
            "Actual pineapple harvesting experience",
            "Learn juice extraction techniques",
            "Visit local market with farmer",
            "Connect with farming family"
        ],
        hostInfo: {
            name: "Mary & Kwesi Osei",
            role: "Farm Owners, Sustainable Farming Advocates",
            bio: "Mary and Kwesi operate a 30-hectare pineapple farm using sustainable, organic methods. They are passionate educators committed to changing perceptions about African agriculture.",
            image: "photo-2.jpg"
        },
        itinerary: [
            {
                day: 1,
                title: "Welcome & Plantation Introduction",
                events: [
                    "11:00 AM - Pickup from central meeting point",
                    "1:00 PM - Arrive at farm, lunch",
                    "2:30 PM - Plantation orientation and farm family meeting",
                    "4:00 PM - Plant care techniques demonstration",
                    "5:30 PM - Rest and freshen up",
                    "7:00 PM - Traditional dinner",
                    "8:30 PM - Evening storytelling"
                ]
            },
            {
                day: 2,
                title: "Harvest & Processing Day",
                events: [
                    "7:00 AM - Breakfast",
                    "8:00 AM - Pineapple harvesting in the field",
                    "11:00 AM - Grading and selection workshop",
                    "1:00 PM - Lunch",
                    "2:30 PM - Juice extraction and bottling",
                    "4:00 PM - Jam making demonstration",
                    "5:00 PM - Return to meeting point"
                ]
            }
        ],
        cancellationPolicy: "Free cancellation 14 days before. 50% refund 7-14 days. No refund within 7 days.",
        safetyInfo: "All tools and equipment provided with safety training. Farm has first aid station.",
        bestTimeToVisit: "January to June (main harvest season) for optimal experience.",
        availableDates: ["2026-04-10", "2026-04-17", "2026-04-24", "2026-05-01"],
        maxGuests: 10,
        minGuests: 2
    },
    {
        id: 3,
        title: "Cassava-to-Fufu Traditional Skills",
        farmName: "Gold Coast Agricultural Center",
        location: "Western Region, Ghana",
        duration: { days: 2, nights: 1 },
        price: 620,
        currency: "GHS",
        rating: 4.6,
        reviews: 28,
        mainImage: "photo2.jpg",
        images: [
            "photo2.jpg",
            "photo3.jpg",
            "photo4.jpg",
            "photo-3.jpg",
        ],
        description: "Learn the traditional art of processing cassava into fufu and other staple foods while connecting with farming families.",
        narrative: `
            Immerse yourself in West African culinary and agricultural traditions through cassava farming. 
            This experience teaches you the complete process from cassava root harvest to the preparation 
            of fufu, a staple dish throughout Ghana and West Africa. You'll work alongside skilled farmers 
            who have preserved these traditional methods for generations.
        `,
        activities: [
            "Cassava root harvesting and handling",
            "Traditional peeling and soaking techniques",
            "Cassava grater operation (traditional and modern tools)",
            "Fufu pounding workshop",
            "Other cassava-based dishes preparation",
            "Community cooking and meal sharing",
            "Agricultural economics discussion"
        ],
        meals: [
            "Welcome meal on Day 1",
            "Cassava-based traditional dinner on Day 1",
            "Breakfast featuring cassava products on Day 2",
            "Departure lunch on Day 2"
        ],
        accommodation: "Traditional farmhouse accommodation with modern amenities",
        included: [
            "1 night accommodation",
            "4 meals featuring cassava dishes",
            "All agricultural activities",
            "Transportation from meeting point",
            "English-speaking guide",
            "Recipe booklet and cassava products"
        ],
        notIncluded: [
            "International flights",
            "Travel insurance",
            "Additional market visits",
            "Gratuities"
        ],
        highlights: [
            "Learn traditional processing secrets",
            "Participate in fufu pounding",
            "Community meal sharing",
            "Deep cultural immersion"
        ],
        hostInfo: {
            name: "Abena & Yaw Asante",
            role: "Agricultural Educators",
            bio: "Abena and Yaw have dedicated their lives to preserving traditional African agricultural practices and teaching both locals and visitors about sustainable food production.",
            image: "photo-4.jpg"
        },
        itinerary: [
            {
                day: 1,
                title: "Arrival & Cultural Introduction",
                events: [
                    "10:00 AM - Pickup from meeting point",
                    "12:00 PM - Arrive at farm, welcome meal",
                    "1:30 PM - Farm orientation and family introduction",
                    "3:00 PM - Cassava root identification and harvesting basics",
                    "5:00 PM - Rest and freshen up",
                    "7:00 PM - Traditional cassava-based dinner",
                    "8:30 PM - Cultural sharing and stories"
                ]
            },
            {
                day: 2,
                title: "Traditional Processing Day",
                events: [
                    "6:30 AM - Breakfast",
                    "8:00 AM - Cassava root harvesting",
                    "10:00 AM - Peeling and soaking demonstration",
                    "12:00 PM - Lunch",
                    "1:30 PM - Grinding and fufu preparation",
                    "3:00 PM - Fufu pounding workshop",
                    "5:00 PM - Community meal sharing and return"
                ]
            }
        ],
        cancellationPolicy: "Free cancellation 14 days before. 50% refund 7-14 days. No refund within 7 days.",
        safetyInfo: "All tools provided with proper training. Traditional methods are safe and supervised.",
        bestTimeToVisit: "August to December (harvest season) recommended.",
        availableDates: ["2026-04-12", "2026-04-19", "2026-04-26", "2026-05-03"],
        maxGuests: 12,
        minGuests: 2
    }
];

// Mock User Data
const mockUser = {
    id: "user123",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1234567890",
    country: "USA",
    bookings: [
        {
            id: "BK001",
            experienceId: 1,
            experienceName: "Cocoa Cultivation Weekend",
            bookingDate: "2026-03-10",
            guestCount: 2,
            totalPrice: 1500,
            status: "confirmed",
            checkInDate: "2026-04-15",
            checkOutDate: "2026-04-17",
            confirmationNumber: "GHC-2026-0001",
            specialRequests: "Vegetarian meals if possible"
        }
    ]
};

// Mock Payment Methods
const paymentMethods = [
    { id: "stripe", name: "Credit/Debit Card (Stripe)", icon: "💳" },
    { id: "bank", name: "Bank Transfer", icon: "🏦" },
    { id: "momo", name: "Mobile Money", icon: "📱" }
];

// Currency Conversion (simplified)
const exchangeRates = {
    USD: 1,
    GHS: 13.5, // Approximate rate
    GBP: 0.79,
    EUR: 0.92
};

// Initialize experiences on page load
function initializeExperiences() {
    const container = document.getElementById('experiencesContainer');
    if (!container) return;
    
    container.innerHTML = experiences.map(exp => `
        <div class="experience-card">
            <div class="experience-image">
                <img src="${exp.mainImage}" alt="${exp.title}" onerror="this.src='experience-placeholder.svg'">
                <span class="price-badge">₵${exp.price}</span>
            </div>
            <div class="experience-info">
                <h3>${exp.title}</h3>
                <p class="farm-name">📍 ${exp.farmName}</p>
                <p class="duration">⏱️ ${exp.duration.days}D/${exp.duration.nights}N</p>
                <div class="rating">
                    <span class="stars">${'<i class="icon-star"></i>'.repeat(Math.floor(exp.rating))}</span>
                    <span class="review-count">(${exp.reviews} reviews)</span>
                </div>
                <p class="description">${exp.description}</p>
                <div class="card-actions">
                    <button class="btn-secondary" onclick="viewExperienceDetail(${exp.id})">View Details</button>
                    <button class="btn-primary" onclick="startBooking(${exp.id})">Book Now</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Function to get experience by ID
function getExperienceById(id) {
    return experiences.find(exp => exp.id === parseInt(id));
}

// Local Storage Management
const Storage = {
    setBooking: (booking) => {
        let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        booking.id = 'BK' + Date.now();
        booking.confirmationNumber = 'GHC-' + new Date().getFullYear() + '-' + String(bookings.length + 1).padStart(4, '0');
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        return booking;
    },
    
    getBookings: () => {
        return JSON.parse(localStorage.getItem('bookings') || '[]');
    },
    
    setUser: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
    },
    
    getUser: () => {
        const raw = localStorage.getItem('user');
        if (!raw) return null;
        try {
            return JSON.parse(raw);
        } catch {
            return null;
        }
    },
    
    clearBookings: () => {
        localStorage.removeItem('bookings');
    }
};
