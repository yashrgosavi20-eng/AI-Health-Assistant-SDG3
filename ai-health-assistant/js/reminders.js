/**
 * SDG 3 AI Health Assistant - Medicine Reminder CRUD Controller
 */

// Local storage key identifier
const REMINDERS_STORAGE_KEY = 'healthai_reminders';

// Initial state load
let medicationReminders = [];

/**
 * Initializes medication reminder system, loads cached records
 */
function initReminders() {
    loadRemindersFromCache();
    renderRemindersList();
    updateDashboardPreview();
    updateGlobalCounters();

    const form = document.getElementById('reminder-form');
    if (form) {
        form.addEventListener('submit', handleReminderSubmit);
    }

    const cancelEditBtn = document.getElementById('btn-cancel-edit');
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', exitEditMode);
    }
}

/**
 * Pulls reminders from local storage
 */
function loadRemindersFromCache() {
    const cached = localStorage.getItem(REMINDERS_STORAGE_KEY);
    if (cached) {
        try {
            medicationReminders = JSON.parse(cached);
        } catch (error) {
            console.error("Failed to parse reminders cache", error);
            medicationReminders = [];
        }
    } else {
        medicationReminders = [];
    }
}

/**
 * Saves active memory state back to local storage
 */
function saveRemindersToCache() {
    localStorage.setItem(REMINDERS_STORAGE_KEY, JSON.stringify(medicationReminders));
}

/**
 * Renders reminders onto the list interface
 */
function renderRemindersList() {
    const container = document.getElementById('reminders-list-container');
    if (!container) return;

    container.innerHTML = '';

    if (medicationReminders.length === 0) {
        container.innerHTML = `
            <div class="reminder-empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <h4>No Active Reminders</h4>
                <p>Fill out the form on the left to set up medical reminders and tracking.</p>
            </div>
        `;
        return;
    }

    // Sort reminders chronologically by time
    const sorted = [...medicationReminders].sort((a, b) => a.time.localeCompare(b.time));

    sorted.forEach(rem => {
        const item = document.createElement('div');
        item.className = 'reminder-item';
        item.innerHTML = `
            <div class="reminder-item-details">
                <span class="ri-name">${escapeHTML(rem.name)}</span>
                <div class="ri-dosage-freq">
                    <span class="badge badge-primary">${escapeHTML(rem.dosage)}</span>
                    <span class="badge badge-success">${escapeHTML(rem.frequency)}</span>
                </div>
                <div class="ri-time-date">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span>Time: <strong>${formatTime12Hr(rem.time)}</strong> | Starts: ${rem.startDate}</span>
                </div>
                ${rem.notes ? `<p class="ri-notes">Note: ${escapeHTML(rem.notes)}</p>` : ''}
            </div>
            <div class="reminder-actions">
                <button class="action-btn edit-btn" onclick="enterEditMode('${rem.id}')" title="Edit Reminder">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                </button>
                <button class="action-btn delete-btn" onclick="deleteMedicationReminder('${rem.id}')" title="Delete Reminder">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
            </div>
        `;
        container.appendChild(item);
    });
}

/**
 * Updates Dashboard preview widget
 */
function updateDashboardPreview() {
    const previewContainer = document.getElementById('dashboard-reminder-preview');
    if (!previewContainer) return;

    if (medicationReminders.length === 0) {
        previewContainer.innerHTML = `
            <span class="no-meds-msg">No medication reminders set. Click 'Med Reminders' to schedule one.</span>
        `;
        return;
    }

    // Grab first 2 upcoming schedules
    const sorted = [...medicationReminders].sort((a, b) => a.time.localeCompare(b.time));
    const slice = sorted.slice(0, 2);

    previewContainer.innerHTML = '';
    slice.forEach(rem => {
        const row = document.createElement('div');
        row.className = 'reminder-preview-row';
        row.style.display = 'flex';
        row.style.justifyContent = 'space-between';
        row.style.alignItems = 'center';
        row.style.padding = '0.5rem 0';
        row.style.borderBottom = '1px solid var(--border)';
        row.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:2px;">
                <strong style="font-size:0.85rem; color:var(--text-primary);">${escapeHTML(rem.name)}</strong>
                <span style="font-size:0.75rem; color:var(--text-light);">${escapeHTML(rem.dosage)} (${escapeHTML(rem.frequency)})</span>
            </div>
            <span class="badge badge-primary">${formatTime12Hr(rem.time)}</span>
        `;
        previewContainer.appendChild(row);
    });
}

/**
 * Updates bell notification badge counts and dashboard summaries
 */
function updateGlobalCounters() {
    const count = medicationReminders.length;
    
    // Updates list view active card badge
    const listCountBadge = document.getElementById('reminder-badge-count-list');
    if (listCountBadge) {
        listCountBadge.innerText = `${count} Active`;
    }

    // Updates top bar notification bell
    const bellBadge = document.getElementById('reminder-badge-count');
    if (bellBadge) {
        if (count > 0) {
            bellBadge.innerText = count;
            bellBadge.style.display = 'flex';
        } else {
            bellBadge.style.display = 'none';
        }
    }
}

/**
 * Handles medication form submit
 * @param {Event} e 
 */
function handleReminderSubmit(e) {
    e.preventDefault();

    const nameInput = document.getElementById('med-name');
    const dosageInput = document.getElementById('med-dosage');
    const freqInput = document.getElementById('med-frequency');
    const dateInput = document.getElementById('med-start-date');
    const timeInput = document.getElementById('med-time');
    const notesInput = document.getElementById('med-notes');
    const editIdInput = document.getElementById('edit-reminder-id');

    if (!nameInput || !dosageInput || !freqInput || !dateInput || !timeInput || !notesInput || !editIdInput) return;

    const name = nameInput.value.trim();
    const dosage = dosageInput.value.trim();
    const freq = freqInput.value;
    const date = dateInput.value;
    const time = timeInput.value;
    const notes = notesInput.value.trim();
    const editId = editIdInput.value;

    if (!name || !dosage || !date || !time) return;

    if (editId) {
        // Edit Mode: Update existing
        const index = medicationReminders.findIndex(rem => rem.id === editId);
        if (index !== -1) {
            medicationReminders[index] = {
                id: editId,
                name: name,
                dosage: dosage,
                frequency: freq,
                startDate: date,
                time: time,
                notes: notes
            };
        }
        exitEditMode();
    } else {
        // Add Mode: Insert new
        const newReminder = {
            id: Date.now().toString(),
            name: name,
            dosage: dosage,
            frequency: freq,
            startDate: date,
            time: time,
            notes: notes
        };
        medicationReminders.push(newReminder);
    }

    saveRemindersToCache();
    renderRemindersList();
    updateDashboardPreview();
    updateGlobalCounters();

    // Reset Form fields
    document.getElementById('reminder-form').reset();
}

/**
 * Populates form inputs for edit mode
 * @param {string} id 
 */
function enterEditMode(id) {
    const reminder = medicationReminders.find(rem => rem.id === id);
    if (!reminder) return;

    document.getElementById('med-name').value = reminder.name;
    document.getElementById('med-dosage').value = reminder.dosage;
    document.getElementById('med-frequency').value = reminder.frequency;
    document.getElementById('med-start-date').value = reminder.startDate;
    document.getElementById('med-time').value = reminder.time;
    document.getElementById('med-notes').value = reminder.notes;
    document.getElementById('edit-reminder-id').value = reminder.id;

    // Adjust forms UI labels
    document.getElementById('reminder-form-title').innerText = "Update Medication Schedule";
    document.getElementById('btn-submit-reminder').querySelector('span').innerText = "Update Reminder";
    document.getElementById('btn-cancel-edit').style.display = 'inline-flex';

    // Scroll form back into focus on mobile layouts
    document.getElementById('reminder-form').scrollIntoView({ behavior: 'smooth' });
}

/**
 * Reverts forms UI to normal state
 */
function exitEditMode() {
    document.getElementById('edit-reminder-id').value = '';
    document.getElementById('reminder-form').reset();

    document.getElementById('reminder-form-title').innerText = "Add Medication Schedule";
    document.getElementById('btn-submit-reminder').querySelector('span').innerText = "Add Reminder";
    document.getElementById('btn-cancel-edit').style.display = 'none';
}

/**
 * Removes medication reminder record
 * @param {string} id 
 */
function deleteMedicationReminder(id) {
    // If active edit target is deleted, reset the form state
    const currentEditId = document.getElementById('edit-reminder-id').value;
    if (currentEditId === id) {
        exitEditMode();
    }

    medicationReminders = medicationReminders.filter(rem => rem.id !== id);
    saveRemindersToCache();
    renderRemindersList();
    updateDashboardPreview();
    updateGlobalCounters();
}

/**
 * Converts 24h clock string into readable 12h representation
 * @param {string} time24 
 */
function formatTime12Hr(time24) {
    if (!time24) return '';
    const parts = time24.split(':');
    let hour = parseInt(parts[0], 10);
    const minute = parts[1];
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12; // conversion of '0' to '12'
    return `${hour}:${minute} ${ampm}`;
}

/**
 * Helper function for HTML escapes inside template renders
 */
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}
