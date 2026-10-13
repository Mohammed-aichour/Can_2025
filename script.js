// Navigation
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            navMenu.classList.remove('active');
        }
    });
});

// Navigation active link detection
const navLinks = document.querySelectorAll('.nav-link');
const currentPath = window.location.pathname.split('/').pop() || 'index.html';

navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
    } else if (href && !href.startsWith('#') && href !== currentPath) {
        link.classList.remove('active');
    }
});

// Scroll spy for index.html sections
const sections = document.querySelectorAll('section[id]');
if (sections.length > 0 && (currentPath === 'index.html' || currentPath === '')) {
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        if (current) {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${current}` || link.getAttribute('href') === `index.html#${current}`) {
                    link.classList.add('active');
                } else if (link.getAttribute('href')?.startsWith('#')) {
                    link.classList.remove('active');
                }
            });
        }
    });
}

// Visa Form
const visaForm = document.getElementById('visaForm');
if (visaForm) {
    visaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validation
        if (!data.nationality || !data.firstname || !data.lastname || !data.email || 
            !data.phone || !data.birthdate || !data.passport || !data.arrival || 
            !data.departure || !data.purpose) {
            showModal('Erreur', 'Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }

        // Persist visa application in LocalStorage
        try {
            const savedVisas = JSON.parse(localStorage.getItem('can2025_visas') || '[]');
            savedVisas.push({
                id: 'VISA-' + Date.now().toString(36).toUpperCase(),
                nationality: data.nationality,
                name: `${data.firstname} ${data.lastname}`,
                email: data.email,
                passport: data.passport,
                submissionDate: new Date().toISOString()
            });
            localStorage.setItem('can2025_visas', JSON.stringify(savedVisas));
        } catch (err) {
            console.warn('LocalStorage error:', err);
        }

        showModal(
            'Demande soumise avec succès !',
            `Votre demande de visa a été enregistrée. Vous recevrez une confirmation par email à ${data.email} dans les 24-48 heures.`,
            'success'
        );
        
        visaForm.reset();
    });
}

// Match Data
const matchsData = [
    {
        id: 1,
        phase: 'Phase de groupes',
        team1: 'Maroc',
        team2: 'Égypte',
        date: '2025-01-15',
        time: '20:00',
        city: 'Casablanca',
        stadium: 'Stade Mohammed V',
        price: 150
    },
    {
        id: 2,
        phase: 'Phase de groupes',
        team1: 'Sénégal',
        team2: 'Nigeria',
        date: '2025-01-16',
        time: '17:00',
        city: 'Rabat',
        stadium: 'Stade Moulay Abdallah',
        price: 120
    },
    {
        id: 3,
        phase: 'Phase de groupes',
        team1: 'Algérie',
        team2: 'Cameroun',
        date: '2025-01-17',
        time: '20:00',
        city: 'Marrakech',
        stadium: 'Stade de Marrakech',
        price: 130
    },
    {
        id: 4,
        phase: 'Huitièmes de finale',
        team1: 'Ghana',
        team2: 'Côte d\'Ivoire',
        date: '2025-01-25',
        time: '18:00',
        city: 'Tanger',
        stadium: 'Stade Ibn Batouta',
        price: 200
    },
    {
        id: 5,
        phase: 'Quarts de finale',
        team1: 'TBD',
        team2: 'TBD',
        date: '2025-01-30',
        time: '20:00',
        city: 'Casablanca',
        stadium: 'Stade Mohammed V',
        price: 300
    },
    {
        id: 6,
        phase: 'Demi-finales',
        team1: 'TBD',
        team2: 'TBD',
        date: '2025-02-05',
        time: '20:00',
        city: 'Rabat',
        stadium: 'Stade Moulay Abdallah',
        price: 400
    },
    {
        id: 7,
        phase: 'Finale',
        team1: 'TBD',
        team2: 'TBD',
        date: '2025-02-10',
        time: '20:00',
        city: 'Casablanca',
        stadium: 'Stade Mohammed V',
        price: 800
    }
];

// Generate Match Cards
function generateMatchCards(matchs) {
    const matchsGrid = document.getElementById('matchsGrid');
    if (!matchsGrid) return;

    matchsGrid.innerHTML = '';

    matchs.forEach(match => {
        const matchCard = document.createElement('div');
        matchCard.className = 'match-card';
        matchCard.innerHTML = `
            <div class="match-header">
                <div class="match-phase">${match.phase}</div>
                <div class="match-price-header">
                    <span class="price-label">À partir de</span>
                    <div class="price">${match.price} MAD</div>
                </div>
            </div>
            <div class="match-teams">
                <div class="team">
                    <div class="team-flag">${getTeamEmblem(match.team1)}</div>
                    <div class="team-name">${match.team1}</div>
                </div>
                <div class="match-vs">VS</div>
                <div class="team">
                    <div class="team-flag">${getTeamEmblem(match.team2)}</div>
                    <div class="team-name">${match.team2}</div>
                </div>
            </div>
            <div class="match-info">
                <div class="match-details">
                    <i class="fas fa-calendar-alt"></i>
                    <span>${formatDate(match.date)}</span>
                </div>
                <div class="match-details">
                    <i class="fas fa-clock"></i>
                    <span>${match.time}</span>
                </div>
                <div class="match-details">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${match.city} - ${match.stadium}</span>
                </div>
            </div>
            <div class="match-actions">
                <button class="btn-buy" onclick="buyTicket(${match.id})">
                    <i class="fas fa-shopping-cart"></i> Acheter
                </button>
            </div>
        `;
        matchsGrid.appendChild(matchCard);
    });
}

// Get Team Emblem
function getTeamEmblem(country) {
    const emblems = {
        'Maroc': '<div class="team-emblem morocco"><img src="https://flagcdn.com/w160/ma.png" alt="Maroc" onerror="this.onerror=null; this.innerHTML=\'🇲🇦\'"></div>',
        'Égypte': '<div class="team-emblem egypt"><img src="https://flagcdn.com/w160/eg.png" alt="Égypte" onerror="this.onerror=null; this.innerHTML=\'🇪🇬\'"></div>',
        'Sénégal': '<div class="team-emblem senegal"><img src="https://flagcdn.com/w160/sn.png" alt="Sénégal" onerror="this.onerror=null; this.innerHTML=\'🇸🇳\'"></div>',
        'Nigeria': '<div class="team-emblem nigeria"><img src="https://flagcdn.com/w160/ng.png" alt="Nigeria" onerror="this.onerror=null; this.innerHTML=\'🇳🇬\'"></div>',
        'Algérie': '<div class="team-emblem algeria"><img src="https://flagcdn.com/w160/dz.png" alt="Algérie" onerror="this.onerror=null; this.innerHTML=\'🇩🇿\'"></div>',
        'Cameroun': '<div class="team-emblem cameroon"><img src="https://flagcdn.com/w160/cm.png" alt="Cameroun" onerror="this.onerror=null; this.innerHTML=\'🇨🇲\'"></div>',
        'Ghana': '<div class="team-emblem ghana"><img src="https://flagcdn.com/w160/gh.png" alt="Ghana" onerror="this.onerror=null; this.innerHTML=\'🇬🇭\'"></div>',
        'Côte d\'Ivoire': '<div class="team-emblem ivory-coast"><img src="https://flagcdn.com/w160/ci.png" alt="Côte d\'Ivoire" onerror="this.onerror=null; this.innerHTML=\'🇨🇮\'"></div>',
        'Tunisie': '<div class="team-emblem tunisia"><img src="https://flagcdn.com/w160/tn.png" alt="Tunisie" onerror="this.onerror=null; this.innerHTML=\'🇹🇳\'"></div>',
        'Mali': '<div class="team-emblem mali"><img src="https://flagcdn.com/w160/ml.png" alt="Mali" onerror="this.onerror=null; this.innerHTML=\'🇲🇱\'"></div>',
        'TBD': '<div class="team-emblem tbd"><i class="fas fa-futbol"></i></div>'
    };
    return emblems[country] || '<div class="team-emblem tbd"><i class="fas fa-futbol"></i></div>';
}

// Get Flag Emoji (kept for backward compatibility)
function getFlagEmoji(country) {
    const flags = {
        'Maroc': '🇲🇦',
        'Égypte': '🇪🇬',
        'Sénégal': '🇸🇳',
        'Nigeria': '🇳🇬',
        'Algérie': '🇩🇿',
        'Cameroun': '🇨🇲',
        'Ghana': '🇬🇭',
        'Côte d\'Ivoire': '🇨🇮',
        'TBD': '⚽'
    };
    return flags[country] || '⚽';
}

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}

// Filter Matchs
const filterPhase = document.getElementById('filter-phase');
const filterCity = document.getElementById('filter-city');
const filterDate = document.getElementById('filter-date');

function filterMatchs() {
    let filtered = [...matchsData];

    if (filterPhase && filterPhase.value !== 'all') {
        const phaseMap = {
            'group': 'Phase de groupes',
            'round16': 'Huitièmes de finale',
            'quarter': 'Quarts de finale',
            'semi': 'Demi-finales',
            'final': 'Finale'
        };
        filtered = filtered.filter(m => m.phase === phaseMap[filterPhase.value]);
    }

    if (filterCity && filterCity.value !== 'all') {
        filtered = filtered.filter(m => m.city.toLowerCase() === filterCity.value);
    }

    if (filterDate && filterDate.value) {
        filtered = filtered.filter(m => m.date === filterDate.value);
    }

    generateMatchCards(filtered);
}

if (filterPhase) filterPhase.addEventListener('change', filterMatchs);
if (filterCity) filterCity.addEventListener('change', filterMatchs);
if (filterDate) filterDate.addEventListener('change', filterMatchs);

// Initialize matchs
generateMatchCards(matchsData);

// Buy Ticket
function buyTicket(matchId) {
    const match = matchsData.find(m => m.id === matchId);
    if (!match) return;

    const quantity = prompt(`Combien de billets souhaitez-vous pour ${match.team1} vs ${match.team2} ?`, '1');
    if (!quantity || isNaN(quantity) || quantity <= 0) return;

    const total = match.price * parseInt(quantity);
    
    try {
        const savedTickets = JSON.parse(localStorage.getItem('can2025_tickets') || '[]');
        savedTickets.push({
            id: 'TICKET-' + Date.now().toString(36).toUpperCase(),
            matchId: match.id,
            match: `${match.team1} vs ${match.team2}`,
            quantity: parseInt(quantity),
            total,
            date: match.date,
            time: match.time,
            stadium: match.stadium,
            city: match.city,
            boughtAt: new Date().toISOString()
        });
        localStorage.setItem('can2025_tickets', JSON.stringify(savedTickets));
    } catch (err) {
        console.warn('LocalStorage error:', err);
    }
    
    showModal(
        'Billet ajouté au panier !',
        `Vous avez ajouté ${quantity} billet(s) pour ${match.team1} vs ${match.team2}.\n\nTotal: ${total} MAD\n\nDate: ${formatDate(match.date)} à ${match.time}\nLieu: ${match.stadium}, ${match.city}`,
        'success'
    );
}

// Hotels Data
const hotelsData = [
    {
        id: 1,
        name: 'Hôtel Royal Casablanca',
        city: 'Casablanca',
        location: 'Centre-ville, près du Stade Mohammed V',
        price: 450,
        rating: 4.5,
        features: ['WiFi', 'Parking', 'Restaurant', 'Spa']
    },
    {
        id: 2,
        name: 'Riad Marrakech Premium',
        city: 'Marrakech',
        location: 'Médina, 5 min du stade',
        price: 350,
        rating: 4.8,
        features: ['WiFi', 'Piscine', 'Petit-déjeuner', 'Terrasse']
    },
    {
        id: 3,
        name: 'Hotel Rabat Palace',
        city: 'Rabat',
        location: 'Quartier administratif',
        price: 400,
        rating: 4.3,
        features: ['WiFi', 'Parking', 'Gym', 'Bar']
    },
    {
        id: 4,
        name: 'Resort Tanger Beach',
        city: 'Tanger',
        location: 'Face à la mer',
        price: 500,
        rating: 4.7,
        features: ['WiFi', 'Plage', 'Spa', 'Restaurant']
    },
    {
        id: 5,
        name: 'Hotel Agadir Resort',
        city: 'Agadir',
        location: 'Bord de mer',
        price: 380,
        rating: 4.6,
        features: ['WiFi', 'Piscine', 'Plage', 'Restaurant']
    },
    {
        id: 6,
        name: 'Palais Fès Heritage',
        city: 'Fès',
        location: 'Médina historique',
        price: 320,
        rating: 4.4,
        features: ['WiFi', 'Patio', 'Restaurant', 'Guide']
    }
];

// Generate Hotel Cards
function generateHotelCards(hotels) {
    const hotelsGrid = document.getElementById('hotelsGrid');
    if (!hotelsGrid) return;

    hotelsGrid.innerHTML = '';

    if (hotels.length === 0) {
        hotelsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 40px; color: var(--text-secondary);">Aucun hôtel trouvé pour vos critères.</p>';
        return;
    }

    hotels.forEach(hotel => {
        const hotelCard = document.createElement('div');
        hotelCard.className = 'hotel-card';
        hotelCard.innerHTML = `
            <div class="hotel-image">
                <i class="fas fa-hotel"></i>
            </div>
            <div class="hotel-info">
                <h3 class="hotel-name">${hotel.name}</h3>
                <div class="hotel-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${hotel.location}</span>
                </div>
                <div class="hotel-features">
                    ${hotel.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                </div>
                <div class="hotel-price">
                    <div>
                        <div class="price">${hotel.price} MAD</div>
                        <div style="font-size: 12px; color: var(--text-secondary);">par nuit</div>
                    </div>
                    <button class="btn-buy" onclick="bookHotel(${hotel.id})">
                        <i class="fas fa-calendar-check"></i> Réserver
                    </button>
                </div>
            </div>
        `;
        hotelsGrid.appendChild(hotelCard);
    });
}

// Reservation Form
const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const city = document.getElementById('hotel-city').value;
        const checkin = document.getElementById('hotel-checkin').value;
        const checkout = document.getElementById('hotel-checkout').value;
        
        if (!city || !checkin || !checkout) {
            showModal('Erreur', 'Veuillez remplir tous les champs.', 'error');
            return;
        }

        const filtered = hotelsData.filter(h => h.city.toLowerCase() === city);
        generateHotelCards(filtered);
    });
}

// Initialize hotels
generateHotelCards(hotelsData);

// Book Hotel
function bookHotel(hotelId) {
    const hotel = hotelsData.find(h => h.id === hotelId);
    if (!hotel) return;

    try {
        const saved = JSON.parse(localStorage.getItem('can2025_hotels') || '[]');
        saved.push({
            id: 'HTL-' + Date.now().toString(36).toUpperCase(),
            hotelId: hotel.id,
            hotelName: hotel.name,
            city: hotel.city,
            price: hotel.price,
            bookedAt: new Date().toISOString()
        });
        localStorage.setItem('can2025_hotels', JSON.stringify(saved));
    } catch (err) {
        console.warn('LocalStorage error:', err);
    }

    showModal(
        'Réservation effectuée !',
        `Votre réservation à l'${hotel.name} a été confirmée.\n\nVous recevrez un email de confirmation avec tous les détails.\n\nPrix: ${hotel.price} MAD par nuit`,
        'success'
    );
}

// Transport Tabs
const transportTabs = document.querySelectorAll('.transport-tab');
transportTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        transportTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// Transport Form
const transportForm = document.getElementById('transportForm');
if (transportForm) {
    transportForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const from = document.getElementById('transport-from').value;
        const to = document.getElementById('transport-to').value;
        const date = document.getElementById('transport-date').value;
        const passengers = document.getElementById('transport-passengers').value;
        const transportType = document.querySelector('.transport-tab.active')?.dataset.transport || 'bus';

        if (!from || !to || !date) {
            showModal('Erreur', 'Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }

        if (from === to) {
            showModal('Erreur', 'La ville de départ et d\'arrivée doivent être différentes.', 'error');
            return;
        }

        generateTransportResults(from, to, date, passengers, transportType);
    });
}

// Generate Transport Results
function generateTransportResults(from, to, date, passengers, type) {
    const resultsContainer = document.getElementById('transportResults');
    if (!resultsContainer) return;

    const transportNames = {
        'bus': 'Bus',
        'train': 'Train',
        'shuttle': 'Navette'
    };

    const times = ['08:00', '12:00', '16:00', '20:00'];
    const durations = {
        'bus': '4h 30min',
        'train': '3h 15min',
        'shuttle': '5h 00min'
    };

    const prices = {
        'bus': 120,
        'train': 180,
        'shuttle': 100
    };

    resultsContainer.innerHTML = '';

    times.forEach((time, index) => {
        const result = document.createElement('div');
        result.className = 'transport-result';
        result.innerHTML = `
            <div class="transport-route">
                <div class="route-info">
                    <div class="route-time">${time}</div>
                    <div class="route-cities">${capitalizeFirst(from)} → ${capitalizeFirst(to)}</div>
                </div>
            </div>
            <div class="transport-details">
                <div class="detail-item">
                    <div class="detail-label">Type</div>
                    <div class="detail-value">${transportNames[type]}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Durée</div>
                    <div class="detail-value">${durations[type]}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Prix</div>
                    <div class="detail-value">${prices[type] * parseInt(passengers)} MAD</div>
                </div>
                <button class="btn-buy" onclick="bookTransport('${from}', '${to}', '${date}', '${time}', '${type}', ${prices[type] * parseInt(passengers)})">
                    Réserver
                </button>
            </div>
        `;
        resultsContainer.appendChild(result);
    });
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Book Transport
function bookTransport(from, to, date, time, type, price) {
    try {
        const saved = JSON.parse(localStorage.getItem('can2025_transports') || '[]');
        saved.push({
            id: 'TR-' + Date.now().toString(36).toUpperCase(),
            from, to, date, time, type, price,
            bookedAt: new Date().toISOString()
        });
        localStorage.setItem('can2025_transports', JSON.stringify(saved));
    } catch (err) {
        console.warn('LocalStorage error:', err);
    }

    showModal(
        'Transport réservé !',
        `Votre réservation de transport a été confirmée.\n\nTrajet: ${capitalizeFirst(from)} → ${capitalizeFirst(to)}\nDate: ${formatDate(date)}\nHeure: ${time}\nType: ${type}\nPrix: ${price} MAD\n\nVous recevrez un email de confirmation.`,
        'success'
    );
}

// Calendar
let currentDate = new Date(2025, 0, 1); // January 2025

function generateCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthEl = document.getElementById('currentMonth');
    
    if (!calendarGrid || !currentMonthEl) return;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    currentMonthEl.textContent = currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    
    calendarGrid.innerHTML = '';
    
    // Header
    daysOfWeek.forEach(day => {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day header';
        dayEl.textContent = day;
        calendarGrid.appendChild(dayEl);
    });
    
    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
        const emptyEl = document.createElement('div');
        emptyEl.className = 'calendar-day other-month';
        calendarGrid.appendChild(emptyEl);
    }
    
    // Days of month
    const matchDates = matchsData.map(m => m.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        
        const date = new Date(year, month, day);
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        if (matchDates.includes(dateString)) {
            dayEl.classList.add('has-match');
            dayEl.title = 'Match prévu ce jour';
        }
        
        if (date.getTime() === today.getTime()) {
            dayEl.classList.add('today');
        }
        
        dayEl.textContent = day;
        calendarGrid.appendChild(dayEl);
    }
}

const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

if (prevMonthBtn) {
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar();
    });
}

if (nextMonthBtn) {
    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar();
    });
}

generateCalendar();

// Modal
const modal = document.getElementById('bookingModal');
const modalClose = document.querySelector('.modal-close');

function showModal(title, message, type = 'success') {
    if (!modal) return;
    
    const modalBody = document.getElementById('modalBody');
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    const iconColor = type === 'success' ? 'var(--success-color)' : 'var(--error-color)';
    
    modalBody.innerHTML = `
        <i class="fas ${icon}" style="color: ${iconColor}; font-size: 64px; margin-bottom: 20px;"></i>
        <h3>${title}</h3>
        <p style="white-space: pre-line;">${message}</p>
        <button class="btn btn-primary" onclick="closeModal()" style="margin-top: 20px;">
            Fermer
        </button>
    `;
    
    modal.classList.add('show');
}

function closeModal() {
    if (modal) {
        modal.classList.remove('show');
    }
}

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Set minimum dates for date inputs
const today = new Date().toISOString().split('T')[0];
document.querySelectorAll('input[type="date"]').forEach(input => {
    if (input.id !== 'visa-birthdate') {
        input.setAttribute('min', today);
    }
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Update button icon based on theme
function updateDarkModeIcon() {
    if (darkModeToggle) {
        const icon = darkModeToggle.querySelector('i');
        if (html.getAttribute('data-theme') === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            darkModeToggle.classList.add('active');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            darkModeToggle.classList.remove('active');
        }
    }
}

// Initialize icon
updateDarkModeIcon();

// Toggle dark mode
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateDarkModeIcon();
    });
}

// Initialize
console.log('CAN 2025 Morocco - Plateforme chargée avec succès !');
