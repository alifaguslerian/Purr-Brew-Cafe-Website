// ===================================
// NAVIGATION SCROLL EFFECT & AUTO HIDE
// ===================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Add/remove scrolled class
    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        navbar.classList.add('hide');
        navbar.classList.remove('show');
    } else {
        // Scrolling up - show navbar
        navbar.classList.remove('hide');
        navbar.classList.add('show');
    }
    
    lastScrollY = currentScrollY;
});

// ===================================
// MOBILE MENU TOGGLE
// ===================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===================================
// SMOOTH SCROLLING FOR NAVIGATION
// ===================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Smooth scrolling for ALL links with hash
document.addEventListener('DOMContentLoaded', () => {
    const allHashLinks = document.querySelectorAll('a[href^="#"]');
    
    allHashLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (!href || href === '#') return;
            
            const targetSection = document.querySelector(href);
            
            if (targetSection) {
                e.preventDefault();
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('navMenu');
                const hamburger = document.getElementById('hamburger');
                if (navMenu) navMenu.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
            }
        });
    });
});

// ===================================
// HERO SLIDER
// ===================================
const slides = document.querySelectorAll('.hero-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('sliderIndicators');

let currentSlide = 0;
let slideInterval;

// Create indicators
slides.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
});

const indicators = document.querySelectorAll('.indicator');

// Function to show specific slide
function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// Function to show next slide
function nextSlide() {
    goToSlide(currentSlide + 1);
}

// Function to show previous slide
function prevSlide() {
    goToSlide(currentSlide - 1);
}

// Auto advance slides
function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

// Event listeners for slider buttons
nextBtn.addEventListener('click', () => {
    nextSlide();
    stopSlideShow();
    startSlideShow();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    stopSlideShow();
    startSlideShow();
});

// Start automatic slideshow
startSlideShow();

// Pause slideshow on hover
const heroSection = document.querySelector('.hero');
heroSection.addEventListener('mouseenter', stopSlideShow);
heroSection.addEventListener('mouseleave', startSlideShow);

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.facility-card, .menu-card, .testimonial-card, .gallery-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ===================================
// FORM HANDLING
// ===================================
const contactForm = document.querySelector('.contact-form');
const formInputs = contactForm.querySelectorAll('.form-input');
const submitButton = contactForm.querySelector('.btn-primary');

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Simple validation
    let isValid = true;
    let emptyFields = [];
    
    formInputs.forEach(input => {
        if (input.value.trim() === '') {
            isValid = false;
            emptyFields.push(input.placeholder);
            input.style.borderColor = '#ff4444';
        } else {
            input.style.borderColor = '#e0e0e0';
        }
    });
    
    if (isValid) {
        // Show success message
        alert('Terima kasih! Pesan Anda telah dikirim. Kami akan segera menghubungi Anda.');
        
        // Reset form
        formInputs.forEach(input => {
            input.value = '';
        });
    } else {
        alert(`Mohon lengkapi field berikut: ${emptyFields.join(', ')}`);
    }
});

// Remove error border on input
formInputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
            input.style.borderColor = '#e0e0e0';
        }
    });
});

// ===================================
// GALLERY LIGHTBOX EFFECT
// ===================================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const imgSrc = img.getAttribute('src');
        
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${imgSrc}" alt="Gallery Image">
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Fade in effect
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
        
        // Close lightbox
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        function closeLightbox() {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            }, 300);
        }
        
        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
    });
});

// ===================================
// BOOK NOW BUTTONS
// ===================================
const bookButtons = document.querySelectorAll('.btn-primary');

bookButtons.forEach(button => {
    if (button.textContent.includes('Book Now') || button.textContent.includes('Explore Now')) {
        button.addEventListener('click', () => {
            const contactSection = document.getElementById('contact');
            const offsetTop = contactSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });
    }
});

// ===================================
// ACTIVE NAVIGATION HIGHLIGHT
// ===================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active-link');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active-link');
                }
            });
        }
    });
});

// ===================================
// PARALLAX EFFECT FOR HERO
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSlider = document.querySelector('.hero-slider');
    
    if (heroSlider && scrolled < window.innerHeight) {
        heroSlider.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===================================
// BACK TO TOP BUTTON
// ===================================
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// PRELOADER (Optional)
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===================================
// ADD CSS FOR LIGHTBOX DYNAMICALLY
// ===================================
const style = document.createElement('style');
style.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        animation: zoomIn 0.3s ease;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 90vh;
        border-radius: 10px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 40px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .lightbox-close:hover {
        transform: scale(1.2);
        color: #b8860b;
    }
    
    @keyframes zoomIn {
        from {
            transform: scale(0.5);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    .active-link {
        color: #b8860b !important;
    }
`;
document.head.appendChild(style);

// ===================================
// BACK TO TOP BUTTON
// ===================================
const backtotopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// WHATSAPP FLOATING BUTTON
// ===================================
const whatsappButton = document.getElementById('whatsappBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        whatsappButton.classList.add('show');
    } else {
        whatsappButton.classList.remove('show');
    }
});

// Optional: Click tracking (for analytics)
whatsappButton.addEventListener('click', () => {
    console.log('WhatsApp button clicked at:', new Date().toLocaleString());
});

// ===================================
// RESERVATION SYSTEM
// ===================================

// Tab Switching
const tabButtons = document.querySelectorAll('.tab-btn');
const reservationContents = document.querySelectorAll('.reservation-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all tabs and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        reservationContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
const tableDateInput = document.getElementById('tableDate');
const vipDateInput = document.getElementById('vipDate');

if (tableDateInput) {
    tableDateInput.setAttribute('min', today);
}
if (vipDateInput) {
    vipDateInput.setAttribute('min', today);
}

// Table Booking Submission
const tableSubmitBtn = document.getElementById('tableSubmit');
if (tableSubmitBtn) {
    tableSubmitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('tableName').value;
        const phone = document.getElementById('tablePhone').value;
        const date = document.getElementById('tableDate').value;
        const time = document.getElementById('tableTime').value;
        const guests = document.getElementById('tableGuests').value;
        const seating = document.getElementById('tableSeating').value;
        const notes = document.getElementById('tableNotes').value;
        
        // Validation
        if (!name || !phone || !date || !time || !guests || !seating) {
            alert('Mohon lengkapi semua field yang wajib diisi!');
            return;
        }
        
        // Phone validation
        if (phone.length < 10) {
            alert('Nomor telepon tidak valid!');
            return;
        }
        
        // Format date
        const formattedDate = new Date(date).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Format seating
        let seatingText = seating;
        if (seating === 'indoor') seatingText = 'Indoor';
        else if (seating === 'outdoor') seatingText = 'Outdoor Terrace';
        else if (seating === 'cat-lounge') seatingText = 'Cat Lounge';
        else if (seating === 'scenic') seatingText = 'Scenic View';
        
        // Show success modal
        showReservationModal({
            type: 'Table Booking',
            name: name,
            phone: phone,
            date: formattedDate,
            time: time,
            guests: guests === 'more' ? 'More than 8 People' : guests + ' ' + (guests === '1' ? 'Person' : 'People'),
            seating: seatingText,
            notes: notes || 'None'
        });
        
        // Clear form
        clearTableForm();
    });
}

// ===================================
// VIP ROOM PRICE CALCULATOR
// ===================================

// Pricing Configuration
const VIP_PRICING = {
    baseRate: 200000, // Base rate per hour
    attendeeSurcharge: {
        '2-5': 0,
        '6-10': 50000,
        '11-15': 100000,
        '16-20': 150000,
        '21+': 200000
    },
    facilities: {
        'projector': 100000,
        'whiteboard': 50000,
        'video-conference': 150000,
        'catering': 200000
    },
    fullDayDiscount: 0.20, // 20% discount for 8+ hours
    weekendSurcharge: 0.10 // 10% weekend surcharge
};

function calculateVIPPrice() {
    const duration = parseInt(document.getElementById('vipDuration').value) || 0;
    const attendees = document.getElementById('vipAttendees').value;
    const dateInput = document.getElementById('vipDate').value;
    
    // If no duration or attendees selected, show default message
    if (!duration || !attendees) {
        document.getElementById('vipTotalPrice').textContent = 'Rp 0';
        document.getElementById('vipPriceBreakdown').textContent = 'Select duration and attendees to see pricing';
        return;
    }
    
    // Calculate base price
    let hourlyRate = VIP_PRICING.baseRate;
    let basePrice = hourlyRate * duration;
    
    // Add attendee surcharge
    const attendeeSurcharge = VIP_PRICING.attendeeSurcharge[attendees] || 0;
    const attendeeTotal = attendeeSurcharge * duration;
    basePrice += attendeeTotal;
    
    // Calculate facilities cost
    let facilitiesTotal = 0;
    const facilitiesSelected = [];
    document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked').forEach(checkbox => {
        const facilityName = checkbox.value;
        const facilityCost = VIP_PRICING.facilities[facilityName] || 0;
        facilitiesTotal += facilityCost;
        facilitiesSelected.push(facilityName);
    });
    
    // Apply full day discount
    let discount = 0;
    if (duration >= 8) {
        discount = basePrice * VIP_PRICING.fullDayDiscount;
    }
    
    // Apply weekend surcharge
    let weekendSurcharge = 0;
    if (dateInput) {
        const selectedDate = new Date(dateInput);
        const dayOfWeek = selectedDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) { // Sunday = 0, Saturday = 6
            weekendSurcharge = basePrice * VIP_PRICING.weekendSurcharge;
        }
    }
    
    // Calculate total
    const subtotal = basePrice - discount + weekendSurcharge;
    const total = subtotal + facilitiesTotal;
    
    // Format and display price
    const formattedTotal = formatRupiah(total);
    document.getElementById('vipTotalPrice').textContent = formattedTotal;
    
    // Build breakdown text
    let breakdown = [];
    
    // Base rate breakdown
    breakdown.push(`Base Rate: Rp ${formatNumber(hourlyRate)} × ${duration} hour${duration > 1 ? 's' : ''} = Rp ${formatNumber(hourlyRate * duration)}`);
    
    // Attendee surcharge
    if (attendeeSurcharge > 0) {
        breakdown.push(`Attendee Surcharge (${attendees} people): Rp ${formatNumber(attendeeSurcharge)} × ${duration} hour${duration > 1 ? 's' : ''} = Rp ${formatNumber(attendeeTotal)}`);
    }
    
    // Discount
    if (discount > 0) {
        breakdown.push(`Full Day Discount (20%): -Rp ${formatNumber(discount)}`);
    }
    
    // Weekend surcharge
    if (weekendSurcharge > 0) {
        breakdown.push(`Weekend Surcharge (10%): +Rp ${formatNumber(weekendSurcharge)}`);
    }
    
    // Facilities
    if (facilitiesTotal > 0) {
        breakdown.push(`Facilities: +Rp ${formatNumber(facilitiesTotal)}`);
    }
    
    document.getElementById('vipPriceBreakdown').innerHTML = breakdown.join('<br>');
}

// Format number to Rupiah
function formatRupiah(amount) {
    return 'Rp ' + formatNumber(amount);
}

// Format number with thousand separators
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Add event listeners for real-time calculation
document.addEventListener('DOMContentLoaded', () => {
    // Auto-calculate when date changes (for weekend detection)
    const vipDateInput = document.getElementById('vipDate');
    if (vipDateInput) {
        vipDateInput.addEventListener('change', calculateVIPPrice);
    }
});

// VIP Room Booking Submission
const vipSubmitBtn = document.getElementById('vipSubmit');
if (vipSubmitBtn) {
    vipSubmitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('vipName').value;
        const company = document.getElementById('vipCompany').value;
        const phone = document.getElementById('vipPhone').value;
        const email = document.getElementById('vipEmail').value;
        const date = document.getElementById('vipDate').value;
        const attendees = document.getElementById('vipAttendees').value;
        const startTime = document.getElementById('vipStartTime').value;
        const duration = document.getElementById('vipDuration').value;
        const notes = document.getElementById('vipNotes').value;
        
        // Get selected facilities
        const facilities = [];
        document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked').forEach(cb => {
            const value = cb.value;
            if (value === 'projector') facilities.push('Projector & Screen');
            else if (value === 'whiteboard') facilities.push('Whiteboard');
            else if (value === 'video-conference') facilities.push('Video Conference Setup');
            else if (value === 'catering') facilities.push('Catering Service');
        });
        
        // Validation
        if (!name || !phone || !email || !date || !attendees || !startTime || !duration) {
            alert('Mohon lengkapi semua field yang wajib diisi!');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Format email tidak valid!');
            return;
        }
        
        // Phone validation
        if (phone.length < 10) {
            alert('Nomor telepon tidak valid!');
            return;
        }
        
        // Format date
        const formattedDate = new Date(date).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Format duration
        let durationText = duration;
        if (duration === 'half-day') durationText = 'Half Day (4-6 Hours)';
        else if (duration === 'full-day') durationText = 'Full Day (8+ Hours)';
        else durationText = duration + ' Hour' + (duration === '1' ? '' : 's');
        
        // Show success modal
        showReservationModal({
            type: 'VIP Meeting Room',
            name: name,
            company: company || 'Not specified',
            phone: phone,
            email: email,
            date: formattedDate,
            time: startTime,
            attendees: attendees + ' People',
            duration: durationText,
            facilities: facilities.length > 0 ? facilities.join(', ') : 'None',
            notes: notes || 'None'
        });
        
        // Clear form
        clearVIPForm();
    });
}

// Show Reservation Success Modal
function showReservationModal(data) {
    // Create modal if not exists
    let modal = document.querySelector('.reservation-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'reservation-modal';
        document.body.appendChild(modal);
    }
    
    // Build modal content based on reservation type
    let detailsHTML = '';
    if (data.type === 'Table Booking') {
        detailsHTML = `
            <div class="modal-detail-item">
                <strong>Name:</strong>
                <span>${data.name}</span>
            </div>
            <div class="modal-detail-item">
                <strong>Phone:</strong>
                <span>${data.phone}</span>
            </div>
            <div class="modal-detail-item">
                <strong>Date:</strong>
                <span>${data.date}</span>
            </div>
            <div class="modal-detail-item">
                <strong>Time:</strong>
                <span>${data.time}</span>
            </div>
            <div class="modal-detail-item">
                <strong>Guests:</strong>
                <span>${data.guests}</span>
            </div>
            <div class="modal-detail-item">
                <strong>Seating:</strong>
                <span>${data.seating}</span>
            </div>
            ${data.notes !== 'None' ? `
            <div class="modal-detail-item">
                <strong>Special Requests:</strong>
                <span>${data.notes}</span>
            </div>
            ` : ''}
        `;
    } else {
        detailsHTML = `
            <div class="modal-detail-item">
                <strong>Name:</strong>
                <span>${data.name}</span>
            </div>
            <div class="modal-detail-item">
                <strong>Company:</strong>
                <span>${data.company}</span>
            </div>
            <div class="modal-detail-item">
                <strong>Phone:</strong>
                <span>${data.phone}</span>
            </div>
            <div class="modal-detail-item">
                <strong>Email:</strong>
                <span>${data.email}</span>
            </div>
            <div class="modal-detail-item">
                <strong>Date:</strong>
                <span>${data.date}</span>
            </div>
            <div class="modal-detail-item">
                <strong>Start Time:</strong>
                <span>${data.time}</span>
            </div>
            <div class="modal-detail-item">
                <strong>Duration:</strong>
                <span>${data.duration}</span>
            </div>
            <div class="modal-detail-item">
                <strong>Attendees:</strong>
                <span>${data.attendees}</span>
            </div>
            ${data.facilities !== 'None' ? `
            <div class="modal-detail-item">
                <strong>Facilities:</strong>
                <span>${data.facilities}</span>
            </div>
            ` : ''}
            ${data.notes !== 'None' ? `
            <div class="modal-detail-item">
                <strong>Additional Notes:</strong>
                <span>${data.notes}</span>
            </div>
            ` : ''}
        `;
    }
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-icon">
                <i class="fas fa-check"></i>
            </div>
            <h3>Reservation Confirmed!</h3>
            <p>Terima kasih atas reservasi Anda. Kami telah menerima permintaan booking dan akan mengirimkan konfirmasi ke WhatsApp Anda dalam waktu singkat.</p>
            <div class="modal-details">
                <h4 style="margin-bottom: 15px; color: var(--primary-color); font-size: 20px;">${data.type}</h4>
                ${detailsHTML}
            </div>
            <button class="btn-primary" onclick="closeReservationModal()">Close</button>
        </div>
    `;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close modal function
function closeReservationModal() {
    const modal = document.querySelector('.reservation-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Clear table form
function clearTableForm() {
    document.getElementById('tableName').value = '';
    document.getElementById('tablePhone').value = '';
    document.getElementById('tableDate').value = '';
    document.getElementById('tableTime').value = '';
    document.getElementById('tableGuests').value = '';
    document.getElementById('tableSeating').value = '';
    document.getElementById('tableNotes').value = '';
}

// Clear VIP form
function clearVIPForm() {
    document.getElementById('vipName').value = '';
    document.getElementById('vipCompany').value = '';
    document.getElementById('vipPhone').value = '';
    document.getElementById('vipEmail').value = '';
    document.getElementById('vipDate').value = '';
    document.getElementById('vipAttendees').value = '';
    document.getElementById('vipStartTime').value = '';
    document.getElementById('vipDuration').value = '';
    document.getElementById('vipNotes').value = '';
    document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.querySelector('.reservation-modal');
    if (modal && e.target === modal) {
        closeReservationModal();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeReservationModal();
    }
});


// ===================================
// MENU CAROUSEL & FILTER
// ===================================

// Carousel Navigation
const menuCarousel = document.getElementById('menuCarousel');
const menuPrevBtn = document.getElementById('menuPrevBtn');
const menuNextBtn = document.getElementById('menuNextBtn');
const menuIndicatorsContainer = document.getElementById('menuIndicators');

let currentMenuIndex = 0;
const scrollAmount = 350; // Width of card + gap

// Create indicators
function createMenuIndicators() {
    const totalCards = document.querySelectorAll('.menu-card:not(.hidden)').length;
    const visibleCards = Math.floor(menuCarousel.offsetWidth / 350);
    const totalPages = Math.ceil(totalCards / visibleCards);
    
    menuIndicatorsContainer.innerHTML = '';
    
    for (let i = 0; i < totalPages; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('carousel-indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => {
            goToMenuPage(i);
        });
        menuIndicatorsContainer.appendChild(indicator);
    }
}

// Update indicators
function updateMenuIndicators() {
    const indicators = document.querySelectorAll('.carousel-indicator');
    const scrollPosition = menuCarousel.scrollLeft;
    const pageWidth = menuCarousel.offsetWidth;
    const currentPage = Math.round(scrollPosition / pageWidth);
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentPage);
    });
}

// Go to specific page
function goToMenuPage(pageIndex) {
    const pageWidth = menuCarousel.offsetWidth;
    menuCarousel.scrollTo({
        left: pageWidth * pageIndex,
        behavior: 'smooth'
    });
}

// Next button
if (menuNextBtn) {
    menuNextBtn.addEventListener('click', () => {
        menuCarousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
}

// Previous button
if (menuPrevBtn) {
    menuPrevBtn.addEventListener('click', () => {
        menuCarousel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
}

// Update indicators on scroll
if (menuCarousel) {
    menuCarousel.addEventListener('scroll', () => {
        updateMenuIndicators();
    });
}

// Menu Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter');
        
        // Update active filter button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter menu cards
        menuCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all') {
                card.classList.remove('hidden');
                card.style.display = 'block';
            } else {
                if (category === filterValue) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            }
        });
        
        // Reset carousel position
        menuCarousel.scrollTo({
            left: 0,
            behavior: 'smooth'
        });
        
        // Recreate indicators based on filtered items
        setTimeout(() => {
            createMenuIndicators();
        }, 100);
    });
});

// Initialize indicators on load
window.addEventListener('load', () => {
    createMenuIndicators();
});

// Recreate indicators on window resize
window.addEventListener('resize', () => {
    createMenuIndicators();
});

// ===================================
// MENU DESCRIPTION TOGGLE
// ===================================
function toggleMenuDescription(menuId) {
    const description = document.getElementById(`menu-desc-${menuId}`);
    const menuCard = document.querySelector(`[data-menu="${menuId}"]`);
    const viewBtn = menuCard.querySelector('.menu-view-btn');
    
    // Close all other descriptions
    document.querySelectorAll('.menu-description').forEach(desc => {
        if (desc.id !== `menu-desc-${menuId}`) {
            desc.classList.remove('active');
            const otherCard = desc.closest('.menu-card');
            const otherBtn = otherCard.querySelector('.menu-view-btn');
            if (otherBtn) {
                otherBtn.innerHTML = '<i class="fas fa-info-circle"></i> View Details';
            }
        }
    });
    
    // Toggle current description
    if (description.classList.contains('active')) {
        description.classList.remove('active');
        viewBtn.innerHTML = '<i class="fas fa-info-circle"></i> View Details';
    } else {
        description.classList.add('active');
        viewBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Details';
        
        // Smooth scroll to card
        setTimeout(() => {
            menuCard.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 100);
    }
}



// ===================================
// CAT CAROUSEL & FILTER
// ===================================

// Carousel Navigation
const catCarousel = document.getElementById('catCarousel');
const catPrevBtn = document.getElementById('catPrevBtn');
const catNextBtn = document.getElementById('catNextBtn');
const catIndicatorsContainer = document.getElementById('catIndicators');

const scrollCatAmount = 370; // Width of card + gap

// Create indicators
function createCatIndicators() {
    const totalCards = document.querySelectorAll('.cat-card:not(.hidden)').length;
    const visibleCards = Math.floor(catCarousel.offsetWidth / 370);
    const totalPages = Math.ceil(totalCards / visibleCards);
    
    catIndicatorsContainer.innerHTML = '';
    
    for (let i = 0; i < totalPages; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('cat-indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => {
            goToCatPage(i);
        });
        catIndicatorsContainer.appendChild(indicator);
    }
}

// Update indicators
function updateCatIndicators() {
    const indicators = document.querySelectorAll('.cat-indicator');
    const scrollPosition = catCarousel.scrollLeft;
    const pageWidth = catCarousel.offsetWidth;
    const currentPage = Math.round(scrollPosition / pageWidth);
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentPage);
    });
}

// Go to specific page
function goToCatPage(pageIndex) {
    const pageWidth = catCarousel.offsetWidth;
    catCarousel.scrollTo({
        left: pageWidth * pageIndex,
        behavior: 'smooth'
    });
}

// Next button
if (catNextBtn) {
    catNextBtn.addEventListener('click', () => {
        catCarousel.scrollBy({
            left: scrollCatAmount,
            behavior: 'smooth'
        });
    });
}

// Previous button
if (catPrevBtn) {
    catPrevBtn.addEventListener('click', () => {
        catCarousel.scrollBy({
            left: -scrollCatAmount,
            behavior: 'smooth'
        });
    });
}

// Update indicators on scroll
if (catCarousel) {
    catCarousel.addEventListener('scroll', () => {
        updateCatIndicators();
    });
}

// Cat Gender Filter
const catFilterButtons = document.querySelectorAll('.cat-filter-btn');
const catCards = document.querySelectorAll('.cat-card');

catFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-gender');
        
        // Update active filter button
        catFilterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter cat cards
        catCards.forEach(card => {
            const gender = card.getAttribute('data-gender');
            
            if (filterValue === 'all') {
                card.classList.remove('hidden');
                card.style.display = 'block';
            } else {
                if (gender === filterValue) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            }
        });
        
        // Close all expanded details when filtering
        document.querySelectorAll('.cat-extended').forEach(ext => {
            ext.classList.remove('active');
        });
        document.querySelectorAll('.cat-expand-btn').forEach(btn => {
            btn.classList.remove('active');
            const catId = btn.closest('.cat-card').getAttribute('data-cat');
            btn.innerHTML = '<i class="fas fa-chevron-down"></i> More About ' + getCatName(parseInt(catId));
        });
        
        // Reset carousel position
        catCarousel.scrollTo({
            left: 0,
            behavior: 'smooth'
        });
        
        // Recreate indicators based on filtered items
        setTimeout(() => {
            createCatIndicators();
        }, 100);
    });
});

// Initialize indicators on load
window.addEventListener('load', () => {
    if (catIndicatorsContainer) {
        createCatIndicators();
    }
});

// Recreate indicators on window resize
window.addEventListener('resize', () => {
    if (catIndicatorsContainer) {
        createCatIndicators();
    }
});

// ===================================
// CAT DETAILS TOGGLE
// ===================================
function toggleCatDetails(catId) {
    const extended = document.getElementById(`cat-extended-${catId}`);
    const button = extended.previousElementSibling;
    const allExtended = document.querySelectorAll('.cat-extended');
    const allButtons = document.querySelectorAll('.cat-expand-btn');
    
    // Close all other cat details
    allExtended.forEach((ext) => {
        if (ext.id !== `cat-extended-${catId}`) {
            ext.classList.remove('active');
            const otherBtn = ext.previousElementSibling;
            if (otherBtn && otherBtn.classList.contains('cat-expand-btn')) {
                const otherCatId = otherBtn.closest('.cat-card').getAttribute('data-cat');
                otherBtn.classList.remove('active');
                otherBtn.innerHTML = '<i class="fas fa-chevron-down"></i> More About ' + getCatName(parseInt(otherCatId));
            }
        }
    });
    
    // Toggle current cat details
    if (extended.classList.contains('active')) {
        extended.classList.remove('active');
        button.classList.remove('active');
        button.innerHTML = '<i class="fas fa-chevron-down"></i> More About ' + getCatName(catId);
    } else {
        extended.classList.add('active');
        button.classList.add('active');
        button.innerHTML = '<i class="fas fa-chevron-up"></i> Show Less';
        
        // Smooth scroll to card
        setTimeout(() => {
            const card = extended.closest('.cat-card');
            card.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 100);
    }
}

// Helper function to get cat names
function getCatName(catId) {
    const names = ['Luna', 'Milo', 'Bella', 'Shadow', 'Whiskers', 'Coco', 'Simba', 'Nala'];
    return names[catId - 1] || 'Cat';
}

// ===================================
// ONLINE ORDER SYSTEM
// ===================================

// Order state
let orderType = 'dine-in';
let cart = [];

// Pricing configuration
const ORDER_CONFIG = {
    serviceCharge: 0.10, // 10% for dine-in
    tax: 0.11, // 11% PB1
    packagingFee: 5000 // Rp 5.000 for takeaway
};

// Select order type
function selectOrderType(type) {
    orderType = type;
    
    // Update button states
    document.querySelectorAll('.order-type-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-type') === type) {
            btn.classList.add('active');
        }
    });
    
    // Update display
    const displayElement = document.getElementById('orderTypeDisplay');
    if (type === 'dine-in') {
        displayElement.innerHTML = '<i class="fas fa-utensils"></i><span>Dine In</span>';
        document.getElementById('tableNumberSection').style.display = 'block';
        document.getElementById('pickupTimeSection').style.display = 'none';
    } else {
        displayElement.innerHTML = '<i class="fas fa-shopping-bag"></i><span>Takeaway</span>';
        document.getElementById('tableNumberSection').style.display = 'none';
        document.getElementById('pickupTimeSection').style.display = 'block';
    }
    
    // Recalculate prices
    updateCartDisplay();
}

// Filter order menu
function filterOrderMenu(category) {
    // Update button states
    document.querySelectorAll('.order-category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        }
    });
    
    // Filter items
    document.querySelectorAll('.order-menu-item').forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
            item.classList.remove('hidden');
            item.style.display = 'block';
        } else {
            item.classList.add('hidden');
            item.style.display = 'none';
        }
    });
}

// Increase quantity
function increaseQty(itemId) {
    const qtyDisplay = document.getElementById(`qty-${itemId}`);
    let currentQty = parseInt(qtyDisplay.textContent);
    currentQty++;
    qtyDisplay.textContent = currentQty;
    
    // Update cart
    updateCart(itemId, currentQty);
}

// Decrease quantity
function decreaseQty(itemId) {
    const qtyDisplay = document.getElementById(`qty-${itemId}`);
    let currentQty = parseInt(qtyDisplay.textContent);
    if (currentQty > 0) {
        currentQty--;
        qtyDisplay.textContent = currentQty;
        
        // Update cart
        updateCart(itemId, currentQty);
    }
}

// Update cart
function updateCart(itemId, quantity) {
    const menuItem = document.querySelector(`[data-id="${itemId}"]`);
    const itemName = menuItem.getAttribute('data-name');
    const itemPrice = parseInt(menuItem.getAttribute('data-price'));
    
    // Find item in cart
    const existingItemIndex = cart.findIndex(item => item.id === itemId);
    
    if (quantity > 0) {
        if (existingItemIndex >= 0) {
            // Update quantity
            cart[existingItemIndex].quantity = quantity;
            cart[existingItemIndex].total = itemPrice * quantity;
        } else {
            // Add new item
            cart.push({
                id: itemId,
                name: itemName,
                price: itemPrice,
                quantity: quantity,
                total: itemPrice * quantity
            });
        }
    } else {
        // Remove item if quantity is 0
        if (existingItemIndex >= 0) {
            cart.splice(existingItemIndex, 1);
        }
    }
    
    updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
    } else {
        let cartHTML = '';
        cart.forEach(item => {
            cartHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-details">${item.quantity}x @ Rp ${formatNumber(item.price)}</div>
                    </div>
                    <span class="cart-item-price">Rp ${formatNumber(item.total)}</span>
                    <button class="cart-item-remove" onclick="removeCartItem(${item.id})">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        });
        cartItemsContainer.innerHTML = cartHTML;
    }
    
    // Update price summary
    updatePriceSummary();
}

// Remove cart item
function removeCartItem(itemId) {
    // Reset quantity display
    document.getElementById(`qty-${itemId}`).textContent = '0';
    
    // Remove from cart
    cart = cart.filter(item => item.id !== itemId);
    
    updateCartDisplay();
}

// Update price summary
function updatePriceSummary() {
    // Calculate subtotal
    const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
    
    // Calculate service charge (only for dine-in)
    let serviceCharge = 0;
    if (orderType === 'dine-in') {
        serviceCharge = subtotal * ORDER_CONFIG.serviceCharge;
        document.getElementById('serviceChargeRow').style.display = 'flex';
        document.getElementById('serviceChargeAmount').textContent = formatRupiah(serviceCharge);
    } else {
        document.getElementById('serviceChargeRow').style.display = 'none';
    }
    
    // Calculate packaging fee (only for takeaway)
    let packagingFee = 0;
    if (orderType === 'takeaway' && cart.length > 0) {
        packagingFee = ORDER_CONFIG.packagingFee;
        document.getElementById('packagingFeeRow').style.display = 'flex';
        document.getElementById('packagingFeeAmount').textContent = formatRupiah(packagingFee);
    } else {
        document.getElementById('packagingFeeRow').style.display = 'none';
    }
    
    // Calculate tax
    const taxableAmount = subtotal + serviceCharge + packagingFee;
    const tax = taxableAmount * ORDER_CONFIG.tax;
    
    // Calculate total
    const total = taxableAmount + tax;
    
    // Update display
    document.getElementById('subtotalAmount').textContent = formatRupiah(subtotal);
    document.getElementById('taxAmount').textContent = formatRupiah(tax);
    document.getElementById('totalAmount').textContent = formatRupiah(total);
}

// Place order
function placeOrder() {
    // Validation
    if (cart.length === 0) {
        alert('Keranjang Anda masih kosong! Silakan pilih menu terlebih dahulu.');
        return;
    }
    
    const customerName = document.getElementById('customerName').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();
    
    if (!customerName || !customerPhone) {
        alert('Mohon lengkapi nama dan nomor telepon Anda!');
        return;
    }
    
    // Validate phone number
    if (customerPhone.length < 10) {
        alert('Nomor telepon tidak valid!');
        return;
    }
    
    // Validate pickup time for takeaway
    if (orderType === 'takeaway') {
        const pickupTime = document.getElementById('pickupTime').value;
        if (!pickupTime) {
            alert('Mohon pilih waktu pengambilan untuk takeaway!');
            return;
        }
    }
    
    // Build order summary
    const customerEmail = document.getElementById('customerEmail').value.trim();
    const orderNotes = document.getElementById('orderNotes').value.trim();
    const tableNumber = document.getElementById('tableNumber').value.trim();
    const pickupTime = document.getElementById('pickupTime').value;
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
    const serviceCharge = orderType === 'dine-in' ? subtotal * ORDER_CONFIG.serviceCharge : 0;
    const packagingFee = orderType === 'takeaway' ? ORDER_CONFIG.packagingFee : 0;
    const tax = (subtotal + serviceCharge + packagingFee) * ORDER_CONFIG.tax;
    const total = subtotal + serviceCharge + packagingFee + tax;
    
    // Build WhatsApp message
    let message = `*PESANAN BARU - LUXE CAFÉ*\n\n`;
    message += `*Tipe Order:* ${orderType === 'dine-in' ? 'Dine In' : 'Takeaway'}\n`;
    message += `*Nama:* ${customerName}\n`;
    message += `*No. Telepon:* ${customerPhone}\n`;
    if (customerEmail) message += `*Email:* ${customerEmail}\n`;
    if (orderType === 'dine-in' && tableNumber) message += `*Nomor Meja:* ${tableNumber}\n`;
    if (orderType === 'takeaway' && pickupTime) {
        const timeText = {
            '15-min': '15 menit',
            '30-min': '30 menit',
            '45-min': '45 menit',
            '1-hour': '1 jam'
        }[pickupTime];
        message += `*Waktu Pengambilan:* ${timeText}\n`;
    }
    
    message += `\n*--- PESANAN ---*\n`;
    cart.forEach(item => {
        message += `${item.quantity}x ${item.name} @ Rp ${formatNumber(item.price)}\n`;
        message += `   Subtotal: Rp ${formatNumber(item.total)}\n`;
    });
    
    message += `\n*--- RINGKASAN ---*\n`;
    message += `Subtotal: Rp ${formatNumber(subtotal)}\n`;
    if (serviceCharge > 0) message += `Service Charge (10%): Rp ${formatNumber(serviceCharge)}\n`;
    if (packagingFee > 0) message += `Biaya Kemasan: Rp ${formatNumber(packagingFee)}\n`;
    message += `Pajak (11%): Rp ${formatNumber(tax)}\n`;
    message += `*TOTAL: Rp ${formatNumber(total)}*\n`;
    
    if (orderNotes) {
        message += `\n*Catatan:* ${orderNotes}`;
    }
    
    // Encode message for WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/6282278330156?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Show confirmation
    setTimeout(() => {
        if (confirm('Pesanan Anda telah dikirim via WhatsApp!\n\nApakah Anda ingin membuat pesanan baru?')) {
            // Reset order
            resetOrder();
        }
    }, 1000);
}

// Reset order
function resetOrder() {
    // Clear cart
    cart = [];
    
    // Reset all quantities
    document.querySelectorAll('.qty-display').forEach(display => {
        display.textContent = '0';
    });
    
    // Clear customer info
    document.getElementById('customerName').value = '';
    document.getElementById('customerPhone').value = '';
    document.getElementById('customerEmail').value = '';
    document.getElementById('orderNotes').value = '';
    document.getElementById('tableNumber').value = '';
    document.getElementById('pickupTime').value = '';
    
    // Update display
    updateCartDisplay();
}

// ===================================
// LOYALTY PROGRAM SYSTEM
// ===================================

// Loyalty database (simulated with localStorage)
const LOYALTY_STORAGE_KEY = 'luxe_cafe_loyalty';
const ORDERS_STORAGE_KEY = 'luxe_cafe_orders';

// Initialize loyalty system
function initLoyaltySystem() {
    if (!localStorage.getItem(LOYALTY_STORAGE_KEY)) {
        localStorage.setItem(LOYALTY_STORAGE_KEY, JSON.stringify({}));
    }
    if (!localStorage.getItem(ORDERS_STORAGE_KEY)) {
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify({}));
    }
}

// Generate unique loyalty code
function generateLoyaltyCode(phone) {
    const prefix = 'LUXE';
    const hash = phone.slice(-4);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${hash}${random}`;
}

// Calculate points from amount
function calculatePoints(amount) {
    // Every Rp 10.000 = 1 point
    return Math.floor(amount / 10000);
}

// Get member tier based on points
function getMemberTier(points) {
    if (points >= 1000) {
        return { name: 'Gold Member', class: 'gold', icon: 'fa-crown' };
    } else if (points >= 500) {
        return { name: 'Silver Member', class: 'silver', icon: 'fa-gem' };
    } else {
        return { name: 'Bronze Member', class: '', icon: 'fa-medal' };
    }
}

// Check loyalty points
function checkLoyaltyPoints() {
    const phone = document.getElementById('loyaltyPhone').value.trim();
    
    // Validation
    if (!phone) {
        alert('Mohon masukkan nomor telepon Anda!');
        return;
    }
    
    if (phone.length < 10) {
        alert('Nomor telepon tidak valid!');
        return;
    }
    
    // Normalize phone number
    const normalizedPhone = normalizePhone(phone);
    
    // Get loyalty data
    const loyaltyData = JSON.parse(localStorage.getItem(LOYALTY_STORAGE_KEY));
    const member = loyaltyData[normalizedPhone];
    
    if (member) {
        // Existing member - show points
        displayMemberPoints(member, normalizedPhone);
    } else {
        // New member - show welcome
        showNewMemberWelcome(normalizedPhone);
    }
}

// Display member points
function displayMemberPoints(member, phone) {
    // Hide new member welcome
    document.getElementById('newMemberWelcome').style.display = 'none';
    document.getElementById('joinFormCard').style.display = 'none';
    
    // Show points display
    const pointsDisplay = document.getElementById('pointsDisplay');
    pointsDisplay.style.display = 'block';
    
    // Update member info
    document.getElementById('customerNameDisplay').textContent = member.name;
    document.getElementById('totalPoints').textContent = member.points;
    document.getElementById('loyaltyCode').textContent = member.loyaltyCode;
    
    // Update tier
    const tier = getMemberTier(member.points);
    const tierElement = document.getElementById('pointsTier');
    tierElement.className = 'points-tier ' + tier.class;
    tierElement.innerHTML = `<i class="fas ${tier.icon}"></i><span>${tier.name}</span>`;
    
    // Display order history
    displayOrderHistory(phone);
}

// Show new member welcome
function showNewMemberWelcome(phone) {
    // Hide points display
    document.getElementById('pointsDisplay').style.display = 'none';
    document.getElementById('joinFormCard').style.display = 'none';
    
    // Show new member welcome
    const welcomeDiv = document.getElementById('newMemberWelcome');
    welcomeDiv.style.display = 'block';
    
    // Store phone for join process
    welcomeDiv.setAttribute('data-phone', phone);
}

// Show join form
function showJoinForm() {
    const welcomeDiv = document.getElementById('newMemberWelcome');
    const phone = welcomeDiv.getAttribute('data-phone');
    
    // Hide welcome
    welcomeDiv.style.display = 'none';
    
    // Show join form
    const joinFormCard = document.getElementById('joinFormCard');
    joinFormCard.style.display = 'block';
    
    // Pre-fill phone
    document.getElementById('joinPhone').value = phone;
}

// Back to check
function backToCheck() {
    document.getElementById('joinFormCard').style.display = 'none';
    document.getElementById('loyaltyPhone').value = '';
}

// Complete join
function completeJoin() {
    const name = document.getElementById('joinName').value.trim();
    const phone = document.getElementById('joinPhone').value.trim();
    const email = document.getElementById('joinEmail').value.trim();
    const birthday = document.getElementById('joinBirthday').value;
    
    // Validation
    if (!name) {
        alert('Mohon masukkan nama lengkap Anda!');
        return;
    }
    
    // Normalize phone
    const normalizedPhone = normalizePhone(phone);
    
    // Generate loyalty code
    const loyaltyCode = generateLoyaltyCode(normalizedPhone);
    
    // Create member object
    const member = {
        name: name,
        phone: normalizedPhone,
        email: email,
        birthday: birthday,
        loyaltyCode: loyaltyCode,
        points: 50, // Welcome bonus
        joinDate: new Date().toISOString(),
        tier: 'bronze'
    };
    
    // Save to localStorage
    const loyaltyData = JSON.parse(localStorage.getItem(LOYALTY_STORAGE_KEY));
    loyaltyData[normalizedPhone] = member;
    localStorage.setItem(LOYALTY_STORAGE_KEY, JSON.stringify(loyaltyData));
    
    // Show success message
    alert(`Selamat datang, ${name}!\n\nLoyalty Code: ${loyaltyCode}\nWelcome Bonus: 50 poin\n\nSimpan kode ini untuk mendapatkan benefit di setiap pembelian!`);
    
    // Display member points
    displayMemberPoints(member, normalizedPhone);
    
    // Hide join form
    document.getElementById('joinFormCard').style.display = 'none';
    
    // Clear form
    document.getElementById('joinName').value = '';
    document.getElementById('joinEmail').value = '';
    document.getElementById('joinBirthday').value = '';
}

// Display order history
function displayOrderHistory(phone) {
    const ordersData = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY));
    const userOrders = ordersData[phone] || [];
    
    const orderHistoryList = document.getElementById('orderHistoryList');
    
    if (userOrders.length === 0) {
        orderHistoryList.innerHTML = '<p class="no-orders">Belum ada riwayat pembelian</p>';
    } else {
        let historyHTML = '';
        
        // Show last 5 orders
        const recentOrders = userOrders.slice(-5).reverse();
        
        recentOrders.forEach(order => {
            const orderDate = new Date(order.date).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
            
            historyHTML += `
                <div class="order-history-item">
                    <div class="order-date">${orderDate} - ${order.type === 'dine-in' ? 'Dine In' : 'Takeaway'}</div>
                    <div class="order-items">${order.itemCount} items</div>
                    <div class="order-total">Rp ${formatNumber(order.total)} (+${order.pointsEarned} poin)</div>
                </div>
            `;
        });
        
        orderHistoryList.innerHTML = historyHTML;
    }
}

// Normalize phone number
function normalizePhone(phone) {
    // Remove all non-numeric characters
    let normalized = phone.replace(/\D/g, '');
    
    // Add country code if missing
    if (normalized.startsWith('0')) {
        normalized = '62' + normalized.substring(1);
    } else if (!normalized.startsWith('62')) {
        normalized = '62' + normalized;
    }
    
    return normalized;
}

// Add order to history and update points
function addOrderToHistory(phone, orderData) {
    const normalizedPhone = normalizePhone(phone);
    
    // Get loyalty member
    const loyaltyData = JSON.parse(localStorage.getItem(LOYALTY_STORAGE_KEY));
    const member = loyaltyData[normalizedPhone];
    
    if (!member) {
        return; // Not a member, skip
    }
    
    // Calculate points earned
    const pointsEarned = calculatePoints(orderData.total);
    
    // Update member points
    member.points += pointsEarned;
    loyaltyData[normalizedPhone] = member;
    localStorage.setItem(LOYALTY_STORAGE_KEY, JSON.stringify(loyaltyData));
    
    // Add to order history
    const ordersData = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY));
    if (!ordersData[normalizedPhone]) {
        ordersData[normalizedPhone] = [];
    }
    
    ordersData[normalizedPhone].push({
        date: new Date().toISOString(),
        type: orderData.type,
        items: orderData.items,
        itemCount: orderData.items.length,
        total: orderData.total,
        pointsEarned: pointsEarned
    });
    
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(ordersData));
    
    return {
        pointsEarned: pointsEarned,
        totalPoints: member.points,
        loyaltyCode: member.loyaltyCode
    };
}

// Initialize loyalty system on page load
document.addEventListener('DOMContentLoaded', () => {
    initLoyaltySystem();
});

// ===================================
// UPDATE ORDER SYSTEM TO INCLUDE LOYALTY
// ===================================

// Update the placeOrder function to integrate with loyalty
const originalPlaceOrder = placeOrder;

function placeOrder() {
    // Validation (same as before)
    if (cart.length === 0) {
        alert('Keranjang Anda masih kosong! Silakan pilih menu terlebih dahulu.');
        return;
    }
    
    const customerName = document.getElementById('customerName').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();
    
    if (!customerName || !customerPhone) {
        alert('Mohon lengkapi nama dan nomor telepon Anda!');
        return;
    }
    
    if (customerPhone.length < 10) {
        alert('Nomor telepon tidak valid!');
        return;
    }
    
    if (orderType === 'takeaway') {
        const pickupTime = document.getElementById('pickupTime').value;
        if (!pickupTime) {
            alert('Mohon pilih waktu pengambilan untuk takeaway!');
            return;
        }
    }
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
    const serviceCharge = orderType === 'dine-in' ? subtotal * ORDER_CONFIG.serviceCharge : 0;
    const packagingFee = orderType === 'takeaway' ? ORDER_CONFIG.packagingFee : 0;
    const tax = (subtotal + serviceCharge + packagingFee) * ORDER_CONFIG.tax;
    const total = subtotal + serviceCharge + packagingFee + tax;
    
    // Add to order history and get loyalty points
    const loyaltyResult = addOrderToHistory(customerPhone, {
        type: orderType,
        items: cart,
        total: total
    });
    
    // Build order data
    const customerEmail = document.getElementById('customerEmail').value.trim();
    const orderNotes = document.getElementById('orderNotes').value.trim();
    const tableNumber = document.getElementById('tableNumber').value.trim();
    const pickupTime = document.getElementById('pickupTime').value;
    
    // Build WhatsApp message (same as before, but add loyalty info)
    let message = `*PESANAN BARU - LUXE CAFÉ*\n\n`;
    message += `*Tipe Order:* ${orderType === 'dine-in' ? 'Dine In' : 'Takeaway'}\n`;
    message += `*Nama:* ${customerName}\n`;
    message += `*No. Telepon:* ${customerPhone}\n`;
    if (customerEmail) message += `*Email:* ${customerEmail}\n`;
    
    // Add loyalty info if member
    if (loyaltyResult) {
        message += `*Loyalty Code:* ${loyaltyResult.loyaltyCode}\n`;
        message += `*Poin Earned:* +${loyaltyResult.pointsEarned} poin\n`;
        message += `*Total Poin:* ${loyaltyResult.totalPoints} poin\n`;
    }
    
    if (orderType === 'dine-in' && tableNumber) message += `*Nomor Meja:* ${tableNumber}\n`;
    if (orderType === 'takeaway' && pickupTime) {
        const timeText = {
            '15-min': '15 menit',
            '30-min': '30 menit',
            '45-min': '45 menit',
            '1-hour': '1 jam'
        }[pickupTime];
        message += `*Waktu Pengambilan:* ${timeText}\n`;
    }
    
    message += `\n*-- PESANAN --*\n`;
    cart.forEach(item => {
        message += `${item.quantity}x ${item.name} @ Rp ${formatNumber(item.price)}\n`;
        message += `   Subtotal: Rp ${formatNumber(item.total)}\n`;
    });
    
    message += `\n*--- RINGKASAN ---*\n`;
    message += `Subtotal: Rp ${formatNumber(subtotal)}\n`;
    if (serviceCharge > 0) message += `Service Charge (10%): Rp ${formatNumber(serviceCharge)}\n`;
    if (packagingFee > 0) message += `Biaya Kemasan: Rp ${formatNumber(packagingFee)}\n`;
    message += `Pajak (11%): Rp ${formatNumber(tax)}\n`;
    message += `*TOTAL: Rp ${formatNumber(total)}*\n`;
    
    if (orderNotes) {
        message += `\n*Catatan:* ${orderNotes}`;
    }
    
    // Show loyalty points earned if member
    if (loyaltyResult) {
        message += `\n\n✨ *Selamat!*\nAnda mendapatkan *${loyaltyResult.pointsEarned} poin*!\nTotal poin Anda sekarang: *${loyaltyResult.totalPoints} poin*`;
    }
    
    // Encode and send via WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/123456789=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
    
    // Show confirmation with loyalty info
    setTimeout(() => {
        let confirmMsg = 'Pesanan Anda telah dikirim via WhatsApp!';
        if (loyaltyResult) {
            confirmMsg += `\n\n🎉 Selamat! Anda mendapatkan ${loyaltyResult.pointsEarned} poin!\nTotal poin Anda: ${loyaltyResult.totalPoints} poin`;
        } else {
            confirmMsg += '\n\n💡 Tips: Join loyalty program kami untuk mendapatkan poin di setiap pembelian!';
        }
        confirmMsg += '\n\nApakah Anda ingin membuat pesanan baru?';
        
        if (confirm(confirmMsg)) {
            resetOrder();
        }
    }, 1000);
}

console.log('🎉 Luxe Café Website Loaded Successfully!');