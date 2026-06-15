/**
 * SDG 3 AI Health Assistant - Emergency Section & First-Aid Guide
 */

// Local storage key for custom emergency speed dials
const CONTACTS_STORAGE_KEY = 'healthai_emergency_contacts';

// First-Aid Guide Data
const FIRST_AID_GUIDE = {
    cpr: {
        title: "Cardiopulmonary Resuscitation (CPR) - Adults",
        steps: [
            "<strong>Check Surroundings:</strong> Ensure the environment is safe for both you and the patient.",
            "<strong>Verify Responsiveness:</strong> Shake the patient gently and yell, 'Are you okay?'",
            "<strong>Call for Help:</strong> Yell for help. Tell a specific bystander to dial 911/112 and retrieve an AED.",
            "<strong>Check Breathing:</strong> Listen and look for chest rises for no more than 10 seconds.",
            "<strong>Push Hard & Fast:</strong> Place both hands in the center of the chest. Compress 2 to 2.4 inches deep at a rate of 100-120 compressions per minute.",
            "<strong>Breathe (If Trained):</strong> Give 2 rescue breaths after every 30 compressions. Repeat cycle until medical help arrives."
        ]
    },
    choking: {
        title: "Choking Relief (Heimlich Maneuver) - Adults",
        steps: [
            "<strong>Ask and Confirm:</strong> Ask, 'Are you choking?' Verify if they can speak or cough.",
            "<strong>Stand Behind Them:</strong> Wrap your arms around the person's waist, bending them slightly forward.",
            "<strong>Position Fist:</strong> Make a fist with one hand. Place it slightly above the navel (belly button).",
            "<strong>Perform Thrusts:</strong> Grasp your fist with the other hand. Deliver quick, upward, inward abdominal thrusts.",
            "<strong>Repeat:</strong> Continue thrusts until the blockage is dislodged or the person becomes unconscious.",
            "<strong>If Unconscious:</strong> Lower them to the floor gently, dial 911, and perform chest compressions (CPR)."
        ]
    },
    burns: {
        title: "Thermal Burns First-Aid Treatment",
        steps: [
            "<strong>Stop Burn Source:</strong> Move the person away from fire, heat sources, or hot water.",
            "<strong>Cool the Burn:</strong> Run cool (not cold/ice) tap water over the burn for 10-20 minutes.",
            "<strong>Remove Restrictive Items:</strong> Gently take off rings, jewelry, or belts before swelling begins.",
            "<strong>Apply Cover:</strong> Loose-wrap the area with a clean, dry, non-stick sterile bandage.",
            "<strong>Do Not Pop Blisters:</strong> Fluid-filled blisters protect the underlying skin layer from infection.",
            "<strong>Seek Medical Care:</strong> Visit a doctor if burns cover joints, face, hands, or have blistered extensively."
        ]
    },
    bleeding: {
        title: "Severe Bleeding Control",
        steps: [
            "<strong>Apply Pressure:</strong> Place a clean cloth, bandage, or sterile gauze directly over the wound.",
            "<strong>Deliver Firm Force:</strong> Push down firmly with both hands to constrict blood vessels and promote clotting.",
            "<strong>Elevate (If Safe):</strong> Raise the bleeding extremity above heart level, if no bone fracture is suspected.",
            "<strong>Wrap Dressing:</strong> Secure the cloth with a pressure wrap. Do not remove original dressings if blood seeps through; place more pads on top.",
            "<strong>Apply Tourniquet (Extreme Cases):</strong> If bleeding is life-threatening on a limb and pressure fails, apply a tourniquet above the wound."
        ]
    }
};

let customContacts = [];

/**
 * Initializes emergency contacts list and interactive guide tabs
 */
function initEmergency() {
    loadCustomContacts();
    renderCustomContacts();
    renderFirstAidGuide('cpr');

    // Attach custom contact submit handler
    const contactForm = document.getElementById('custom-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleAddContact);
    }

    // Set up first-aid guide tab click handlers
    const tabs = document.querySelectorAll('.first-aid-tabs .fa-tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            tabs.forEach(t => t.classList.remove('active'));
            e.currentTarget.classList.add('active');
            const topic = e.currentTarget.getAttribute('data-topic');
            renderFirstAidGuide(topic);
        });
    });
}

/**
 * Loads custom emergency contacts from LocalStorage
 */
function loadCustomContacts() {
    const cached = localStorage.getItem(CONTACTS_STORAGE_KEY);
    if (cached) {
        try {
            customContacts = JSON.parse(cached);
        } catch (error) {
            console.error("Failed to load custom contacts", error);
            customContacts = [];
        }
    } else {
        customContacts = [];
    }
}

/**
 * Saves memory contacts list to LocalStorage
 */
function saveCustomContacts() {
    localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(customContacts));
}

/**
 * Renders first-aid guide panel details based on active topic selection
 * @param {string} topic 
 */
function renderFirstAidGuide(topic) {
    const container = document.getElementById('first-aid-display-container');
    if (!container) return;

    const data = FIRST_AID_GUIDE[topic];
    if (!data) return;

    container.innerHTML = `
        <div class="fa-guide-header">
            <h4>${data.title}</h4>
        </div>
        <ol class="fa-guide-steps">
            ${data.steps.map((step, index) => `
                <li>
                    <div class="fa-step-num">${index + 1}</div>
                    <div class="fa-step-desc">${step}</div>
                </li>
            `).join('')}
        </ol>
    `;
}

/**
 * Draws custom emergency speed dial list
 */
function renderCustomContacts() {
    const list = document.getElementById('custom-contacts-list');
    if (!list) return;

    if (customContacts.length === 0) {
        list.innerHTML = `<span class="no-meds-msg">No custom emergency contacts added.</span>`;
        return;
    }

    list.innerHTML = '';
    customContacts.forEach((contact, idx) => {
        const item = document.createElement('div');
        item.className = 'custom-contact-item';
        item.innerHTML = `
            <div>
                <span>${escapeHTML(contact.name)}:</span> 
                <strong>${escapeHTML(contact.phone)}</strong>
            </div>
            <button class="btn-delete-contact" onclick="deleteEmergencyContact(${idx})" title="Remove Contact">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
        `;
        list.appendChild(item);
    });
}

/**
 * Handles adding a custom emergency contact
 * @param {Event} e 
 */
function handleAddContact(e) {
    e.preventDefault();
    const nameInput = document.getElementById('contact-name');
    const phoneInput = document.getElementById('contact-phone');

    if (!nameInput || !phoneInput) return;

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!name || !phone) return;

    customContacts.push({ name, phone });
    saveCustomContacts();
    renderCustomContacts();

    // Reset inputs
    nameInput.value = '';
    phoneInput.value = '';
}

/**
 * Removes emergency contact record by index
 * @param {number} idx 
 */
function deleteEmergencyContact(idx) {
    customContacts.splice(idx, 1);
    saveCustomContacts();
    renderCustomContacts();
}

/**
 * HTML Escape helper
 */
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}
