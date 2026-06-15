/**
 * SDG 3 AI Health Assistant - Health Tips Library & Engine
 */

// Library of curated wellness tips matching SDG 3 principles
const HEALTH_TIPS = [
    {
        id: 1,
        title: "Focus on Whole Foods",
        category: "nutrition",
        text: "Prioritize fresh vegetables, fruits, whole grains, and lean proteins. Try to minimize processed foods high in trans fats, added sugars, and excess sodium to protect cardiovascular health.",
        metric: "Heart Health",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>`
    },
    {
        id: 2,
        title: "Incorporate Healthy Fats",
        category: "nutrition",
        text: "Eat sources of monounsaturated and polyunsaturated fats daily. Avocados, olive oil, nuts, and fatty fish (like salmon) provide essential omega-3 fatty acids that support brain health.",
        metric: "Brain & Joint Care",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 22s1-1 4-1 5 2 8 2 7-1 8-1V5s-1 1-4 1-5-2-8-2-7 1-8 1z"/></svg>`
    },
    {
        id: 3,
        title: "Practice Portion Awareness",
        category: "nutrition",
        text: "Eat mindfully and slow down. It takes roughly 20 minutes for your brain to receive chemical signals from your gut that you are full. Using smaller plates can help prevent overeating.",
        metric: "Digestion Control",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`
    },
    {
        id: 4,
        title: "150 Minutes of Weekly Cardio",
        category: "exercise",
        text: "Aim for at least 150 minutes of moderate-intensity aerobic exercise (like brisk walking or cycling) or 75 minutes of vigorous activity weekly to maintain strong cardiovascular fitness.",
        metric: "Stamina Boost",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/></svg>`
    },
    {
        id: 5,
        title: "Don't Ignore Strength Training",
        category: "exercise",
        text: "Perform resistance training exercises at least twice a week. Building lean muscle mass supports joint mobility, improves metabolic rate, and helps maintain high bone density as you age.",
        metric: "Bone Strength",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12M6 21h12M12 3v18"/></svg>`
    },
    {
        id: 6,
        title: "Active Desk Stretches",
        category: "exercise",
        text: "If you work at a computer, stand up and stretch for 5 minutes every hour. Gently roll your neck, stretch your hamstrings, and do shoulder rolls to relieve muscle stiffness.",
        metric: "Posture Relief",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`
    },
    {
        id: 7,
        title: "Practice Mindfulness Meditation",
        category: "mental",
        text: "Allocate 10 minutes a day to sit quietly, close your eyes, and focus solely on your breath. Mindfulness reduces cortisol levels, lowers blood pressure, and helps alleviate daily stress.",
        metric: "Stress Reduction",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>`
    },
    {
        id: 8,
        title: "Digital Detox Before Bed",
        category: "mental",
        text: "Avoid screens (phones, tablets, TVs) for at least 45 minutes before bedtime. The blue light suppresses melatonin production, which disrupts your circadian rhythm and increases anxiety.",
        metric: "Cognitive Calm",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`
    },
    {
        id: 9,
        title: "Maintain Social Connections",
        category: "mental",
        text: "Human connection is vital for emotional well-being. Call a friend, join community wellness groups, or volunteer. Strong relationships are associated with lower rates of depression.",
        metric: "Social Support",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
    },
    {
        id: 10,
        title: "Carry a Reusable Water Bottle",
        category: "hydration",
        text: "Keep water nearby at all times. Sipping water continuously throughout the day is much more effective for absorption than chugging large amounts at once.",
        metric: "Detoxification",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`
    },
    {
        id: 11,
        title: "Monitor Hydration Levels",
        category: "hydration",
        text: "A simple way to check your hydration is looking at your urine color. Light straw or pale yellow indicates good hydration. Dark yellow or amber means you need to drink water immediately.",
        metric: "Kidney Health",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/></svg>`
    },
    {
        id: 12,
        title: "Hydrate Before Coffee",
        category: "hydration",
        text: "Drink a full glass of water immediately when you wake up. Caffeine is a mild diuretic, and hydrating first helps restart metabolic functions and offsets overnight dehydration.",
        metric: "Morning Energy",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>`
    },
    {
        id: 13,
        title: "Consistent Sleep Schedule",
        category: "sleep",
        text: "Go to bed and wake up at the same time every day, even on weekends. Consistency anchors your internal body clock, improving the quality of deep sleep and overall energy levels.",
        metric: "Circadian Sync",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
    },
    {
        id: 14,
        title: "Create a Sleep-Friendly Room",
        category: "sleep",
        text: "Ensure your bedroom is dark, quiet, and cool (ideally around 65°F / 18°C). Use blackout curtains or an eye mask, and block sound variables to increase REM sleep cycles.",
        metric: "Deep Recovery",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`
    },
    {
        id: 15,
        title: "Limit Late-Night Heavy Meals",
        category: "sleep",
        text: "Avoid eating heavy, rich, or spicy foods within 2-3 hours of sleeping. Digestion raises body temperature and can trigger acid reflux, preventing your body from entering deep rest states.",
        metric: "Indigestion Relief",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`
    }
];

/**
 * Initializes and handles Tip render logic
 */
function initTips() {
    renderTips('all');
    
    // Set up category tab event listeners
    const tabs = document.querySelectorAll('.category-tabs .tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            tabs.forEach(t => t.classList.remove('active'));
            e.currentTarget.classList.add('active');
            const category = e.currentTarget.getAttribute('data-category');
            renderTips(category);
        });
    });

    // Set up "Get Random Tip" button listener
    const rollBtn = document.getElementById('btn-roll-tip');
    if (rollBtn) {
        rollBtn.addEventListener('click', getRandomTip);
    }
}

/**
 * Renders filtered tips to the DOM
 * @param {string} category 
 */
function renderTips(category) {
    const container = document.getElementById('tips-grid-container');
    if (!container) return;

    container.innerHTML = '';
    const filtered = category === 'all' 
        ? HEALTH_TIPS 
        : HEALTH_TIPS.filter(tip => tip.category === category);

    filtered.forEach(tip => {
        const card = document.createElement('div');
        card.className = `tip-card ${tip.category}-tip`;
        card.innerHTML = `
            <div class="tip-card-header">
                <span class="badge ${getCategoryBadgeClass(tip.category)} tip-category-badge">${tip.category}</span>
                <div class="tip-card-icon col-${getCategoryColorClass(tip.category)}">
                    ${tip.icon}
                </div>
            </div>
            <h4>${tip.title}</h4>
            <p>${tip.text}</p>
            <div class="tip-card-footer col-${getCategoryColorClass(tip.category)}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <span>${tip.metric}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

/**
 * Picks a random tip and displays it in a special modal-style alert
 */
function getRandomTip() {
    const randomIndex = Math.floor(Math.random() * HEALTH_TIPS.length);
    const tip = HEALTH_TIPS[randomIndex];
    
    // Switch filter tab to match this tip's category for visual sync
    const tabs = document.querySelectorAll('.category-tabs .tab-btn');
    tabs.forEach(tab => {
        if (tab.getAttribute('data-category') === tip.category) {
            tab.click();
        }
    });

    // Temporarily highlight the card in the list
    setTimeout(() => {
        const cards = document.querySelectorAll('.tip-card');
        cards.forEach(card => {
            const heading = card.querySelector('h4').innerText;
            if (heading === tip.title) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                card.style.transform = 'scale(1.05)';
                card.style.borderColor = 'var(--primary)';
                card.style.boxShadow = 'var(--shadow-lg), 0 0 20px rgba(13, 148, 136, 0.4)';
                
                setTimeout(() => {
                    card.style.transform = '';
                    card.style.borderColor = '';
                    card.style.boxShadow = '';
                }, 2000);
            }
        });
    }, 200);
}

function getCategoryBadgeClass(cat) {
    switch (cat) {
        case 'nutrition': return 'badge-primary';
        case 'exercise': return 'badge-danger';
        case 'mental': return 'badge-indigo';
        case 'hydration': return 'badge-warning';
        case 'sleep': return 'badge-success';
        default: return 'badge-primary';
    }
}

function getCategoryColorClass(cat) {
    switch (cat) {
        case 'nutrition': return 'teal';
        case 'exercise': return 'red';
        case 'mental': return 'indigo';
        case 'hydration': return 'orange';
        case 'sleep': return 'emerald';
        default: return 'teal';
    }
}
