/**
 * SDG 3 AI Health Assistant - Main Coordinator & Route Handler
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Sub-modules
    if (typeof initTips === 'function') initTips();
    if (typeof initChatbot === 'function') initChatbot();
    if (typeof initSymptomChecker === 'function') initSymptomChecker();
    if (typeof initReminders === 'function') initReminders();
    if (typeof initEmergency === 'function') initEmergency();

    // 2. Set up Page Navigation
    initNavigation();

    // 3. Set up Theme Toggles
    initThemeToggle();

    // 4. Set up Mobile Toggle Drawer
    initMobileNav();

    // 5. Connect Presentation Demo Button
    const demoBtn = document.getElementById('btn-load-demo');
    if (demoBtn) {
        demoBtn.addEventListener('click', loadScreenshotDemoData);
    }
});

/**
 * Navigation routing logic
 */
function initNavigation() {
    const navItems = document.querySelectorAll('.sidebar-nav li');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = item.getAttribute('data-page');
            navigateToPage(targetPage);

            // Close mobile menu if open
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) sidebar.classList.remove('mobile-open');
        });
    });
}

/**
 * Changes active page view panel
 * @param {string} pageId 
 */
function navigateToPage(pageId) {
    const sections = document.querySelectorAll('.page-section');
    const navItems = document.querySelectorAll('.sidebar-nav li');

    // Deactivate all
    sections.forEach(sec => sec.classList.remove('active-page'));
    navItems.forEach(item => item.classList.remove('active'));

    // Find and activate matching section
    const targetSection = document.getElementById(pageId) || document.getElementById(pageId + '-section');
    const targetNavItem = document.querySelector(`.sidebar-nav li[data-page="${pageId}"]`);

    if (targetSection) {
        targetSection.classList.add('active-page');
    }
    if (targetNavItem) {
        targetNavItem.classList.add('active');
    }

    // Update Header Texts dynamically
    updateHeaderInfo(pageId);
}

/**
 * Updates upper header title & description
 * @param {string} pageId 
 */
function updateHeaderInfo(pageId) {
    const titleEl = document.getElementById('header-title');
    const subEl = document.getElementById('header-subtitle');
    if (!titleEl || !subEl) return;

    switch (pageId) {
        case 'dashboard':
            titleEl.innerText = "Dashboard Overview";
            subEl.innerText = "Welcome to your health companion platform.";
            break;
        case 'chatbot':
            titleEl.innerText = "AI Health Chatbot";
            subEl.innerText = "Ask about nutrition, workout ideas, sleep hygiene, or wellness.";
            break;
        case 'symptom':
            titleEl.innerText = "Symptom Assessment Tool";
            subEl.innerText = "Identify symptoms severity and medical care indicators.";
            break;
        case 'reminder':
            titleEl.innerText = "Medicine Reminders";
            subEl.innerText = "Schedule, edit, and log medication intervals.";
            break;
        case 'tips':
            titleEl.innerText = "Wellness Library";
            subEl.innerText = "Explore structured tips and educate yourself on health principles.";
            break;
        case 'emergency':
            titleEl.innerText = "Emergency Response Center";
            subEl.innerText = "Immediate basic life support steps and hotline contacts.";
            break;
        default:
            titleEl.innerText = "AI Health Assistant";
            subEl.innerText = "Supporting UN Sustainable Development Goal 3.";
    }
}

/**
 * Handles Dark/Light Theme Switching
 */
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    const sunIcon = toggleBtn.querySelector('.sun-icon');
    const moonIcon = toggleBtn.querySelector('.moon-icon');

    // Check localStorage cache for theme preference
    const currentTheme = localStorage.getItem('healthai_theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
    } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        if (sunIcon) sunIcon.style.display = 'block';
        if (moonIcon) moonIcon.style.display = 'none';
    }

    toggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('light-theme')) {
            // Switch to Dark
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
            localStorage.setItem('healthai_theme', 'dark');
            if (sunIcon) sunIcon.style.display = 'none';
            if (moonIcon) moonIcon.style.display = 'block';
        } else {
            // Switch to Light
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
            localStorage.setItem('healthai_theme', 'light');
            if (sunIcon) sunIcon.style.display = 'block';
            if (moonIcon) moonIcon.style.display = 'none';
        }
    });
}

/**
 * Sets up collapsible hamburger navigations
 */
function initMobileNav() {
    const toggle = document.querySelector('.mobile-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (toggle && sidebar) {
        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
        });

        // Close sidebar if clicking outside of it on mobile
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !toggle.contains(e.target) && sidebar.classList.contains('mobile-open')) {
                sidebar.classList.remove('mobile-open');
            }
        });
    }
}

/**
 * Presentation Mode Core Data Injector
 * Triggered on "Load Demo Data" button click
 */
function loadScreenshotDemoData() {
    // 1. Inject Medicine Reminders Data
    const mockReminders = [
        {
            id: "demo-med-1",
            name: "Amoxicillin (Antibiotic)",
            dosage: "500mg",
            frequency: "Three Times Daily",
            startDate: "2026-06-12",
            time: "08:00",
            notes: "Take with water after food. Complete full course."
        },
        {
            id: "demo-med-2",
            name: "Vitamin D3",
            dosage: "1000 IU",
            frequency: "Once Daily",
            startDate: "2026-06-12",
            time: "13:00",
            notes: "Take with lunch for optimal absorption."
        },
        {
            id: "demo-med-3",
            name: "Metformin (Glucophage)",
            dosage: "500mg",
            frequency: "Twice Daily",
            startDate: "2026-06-12",
            time: "20:30",
            notes: "Take with dinner to mitigate stomach sensitivity."
        }
    ];
    localStorage.setItem('healthai_reminders', JSON.stringify(mockReminders));
    
    // Refresh Reminders Memory
    if (typeof loadRemindersFromCache === 'function') {
        loadRemindersFromCache();
        renderRemindersList();
        updateDashboardPreview();
        updateGlobalCounters();
    }

    // 2. Inject Emergency Contacts Data
    const mockContacts = [
        {
            name: "Dr. Sarah Jenkins (PCP)",
            phone: "+1 (555) 019-2834"
        },
        {
            name: "Mom (Speed Dial)",
            phone: "+1 (555) 014-9988"
        }
    ];
    localStorage.setItem('healthai_emergency_contacts', JSON.stringify(mockContacts));
    
    // Refresh Emergency Memory
    if (typeof loadCustomContacts === 'function') {
        loadCustomContacts();
        renderCustomContacts();
    }

    // 3. Inject Chatbot History
    const chatContainer = document.getElementById('chat-messages-container');
    if (chatContainer) {
        chatContainer.innerHTML = `
            <div class="chat-bubble bot">
                <div class="bubble-content">
                    <p>Hello! I am your HealthAI assistant. I can help with wellness advice, nutrition tips, exercise schedules, hydration goals, and general medical education. How can I support your health journey today?</p>
                </div>
                <span class="bubble-time">Just now</span>
            </div>
            
            <div class="chat-bubble user">
                <div class="bubble-content">
                    <p>What is a balanced diet plan?</p>
                </div>
                <span class="bubble-time">Just now</span>
            </div>
            
            <div class="chat-bubble bot">
                <div class="bubble-content">
                    <h4>Balanced Nutrition & Diet Guidelines</h4>
                    <p>A nutritious diet is crucial for promoting long-term cellular health and maintaining immune function. Here are the core pillars recommended by dietary guides:</p>
                    <ul>
                        <li><strong>Emphasize Whole Foods:</strong> Build plates around leafy greens, colorful vegetables, whole grains (oats, quinoa), and legumes.</li>
                        <li><strong>Lean Proteins:</strong> Include lean poultry, fish (rich in omega-3), tofu, or beans.</li>
                        <li><strong>Healthy Fats:</strong> Consume avocados, extra virgin olive oil, nuts, and seeds daily.</li>
                        <li><strong>Reduce Processed Sugar:</strong> Limit soda, confectionery, and packaged snacks to reduce cardiovascular strain and lower diabetes risks.</li>
                    </ul>
                    <p><em>Tip: Try filling half your plate with vegetables at lunch and dinner to ensure sufficient micronutrient intake!</em></p>
                </div>
                <span class="bubble-time">Just now</span>
            </div>
            
            <div class="chat-bubble user">
                <div class="bubble-content">
                    <p>How can I sleep better at night?</p>
                </div>
                <span class="bubble-time">Just now</span>
            </div>
            
            <div class="chat-bubble bot">
                <div class="bubble-content">
                    <h4>Optimal Sleep Hygiene Practices</h4>
                    <p>Quality sleep is a primary driver of neural recovery, hormone regulation, and cardiovascular repairs. For standard adult wellness, aim for 7-9 hours of sleep using these tips:</p>
                    <ul>
                        <li><strong>Consistent Sleep-Wake Times:</strong> Go to bed and wake up at the same hour daily, establishing a regular circadian rhythm.</li>
                        <li><strong>Optimize Bedroom Environment:</strong> Keep your room dark, quiet, and cool (60-67°F or 15-19°C).</li>
                        <li><strong>Limit Blue Light Exposure:</strong> Power down smartphones, laptops, and TVs 45-60 minutes before attempting to sleep.</li>
                        <li><strong>Avoid Night Stimulants:</strong> Refrain from heavy meals, caffeine, or alcohol in the late evening, as they disrupt REM and deep sleep cycles.</li>
                    </ul>
                </div>
                <span class="bubble-time">Just now</span>
            </div>
        `;
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // 4. Inject Symptom Checker State
    const textInput = document.getElementById('symptom-text-input');
    const resultsContainer = document.getElementById('symptom-results-container');
    if (textInput && resultsContainer && typeof analyzeSymptomsText === 'function') {
        textInput.value = "I have a cough, sore throat, and high fever starting 3 days ago. Also feeling a bit fatigued.";
        
        // Auto check tag buttons visually
        const tagBtns = document.querySelectorAll('.symptom-tags-container .tag-btn');
        tagBtns.forEach(btn => {
            const val = btn.getAttribute('data-symptom');
            if (['cough', 'fever', 'sore throat', 'fatigue'].includes(val)) {
                btn.classList.add('selected');
            } else {
                btn.classList.remove('selected');
            }
        });

        // Trigger analysis simulation
        const report = analyzeSymptomsText(textInput.value.toLowerCase(), "few-days", "adult");
        renderSymptomReport(report, resultsContainer);
    }

    // 5. Fill out Dashboard Health Stats
    document.getElementById('stat-health-score').innerText = "94%";
    document.getElementById('stat-steps').innerText = "10,240";
    document.getElementById('stat-water').innerText = "2.4 L";
    document.getElementById('stat-sleep').innerText = "8.2 Hrs";

    // 6. Display Success Feedback to User (Custom temporary overlay alert)
    showToastNotification();
}

/**
 * Creates and shows a dynamic success notification toast
 */
function showToastNotification() {
    // Prevent duplicate overlays
    const existing = document.getElementById('demo-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'demo-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '2rem';
    toast.style.right = '2rem';
    toast.style.backgroundColor = 'var(--primary)';
    toast.style.color = '#ffffff';
    toast.style.padding = '1.25rem 1.75rem';
    toast.style.borderRadius = 'var(--radius-md)';
    toast.style.boxShadow = 'var(--shadow-lg)';
    toast.style.zIndex = '999';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '0.75rem';
    toast.style.animation = 'slideInToast 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    toast.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:24px; height:24px; color:#ffffff;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <div style="display:flex; flex-direction:column; gap:2px;">
            <strong style="font-family:'Outfit'; font-size:0.95rem;">Presentation Mode Activated!</strong>
            <span style="font-size:0.8rem; opacity:0.9;">Mock data loaded. Navigate all tabs to capture screenshots!</span>
        </div>
    `;

    // Add toast keyframe inject keyframes stylesheet dynamically if needed
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes slideInToast {
            from { transform: translateY(50px) scale(0.9); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(toast);

    // Dismiss toast after 5 seconds
    setTimeout(() => {
        toast.style.animation = 'slideInToast 0.4s cubic-bezier(0.16, 1, 0.3, 1) reverse forwards';
        setTimeout(() => {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 400);
    }, 4500);
}
