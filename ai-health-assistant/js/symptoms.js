/**
 * SDG 3 AI Health Assistant - Symptom Checker Logic
 */

// Diagnostic reference data mapping key combinations to indicators
const SYMPTOM_DATABASE = {
    high: {
        keywords: ['chest pain', 'shortness of breath', 'difficulty breathing', 'severe bleeding', 'numbness', 'slurred speech', 'confusion', 'tightness in chest'],
        possibleCauses: "Cardiac distress, acute asthma exacerbation, severe anaphylaxis, or neurological warning signs.",
        recommendations: [
            "Dial emergency services (911/112) immediately.",
            "Do not drive yourself to the hospital; await an ambulance.",
            "Sit in a comfortable, upright position to ease breathing.",
            "Keep emergency contacts notified of your location."
        ]
    },
    medium: {
        keywords: ['fever', 'abdominal pain', 'vomiting', 'nausea', 'migraine', 'dizziness', 'stomach ache', 'earache', 'swollen glands'],
        possibleCauses: "Gastrointestinal infection, viral influenza, acute migraine, localized bacterial infection, or dehydration.",
        recommendations: [
            "Schedule a visit to your primary care physician or local urgent clinic.",
            "Monitor body temperature regularly using a thermometer.",
            "Stay well hydrated with water or electrolyte solutions.",
            "Ensure plenty of rest; avoid intense physical labor."
        ]
    },
    low: {
        keywords: ['headache', 'cough', 'sore throat', 'runny nose', 'fatigue', 'sneezing', 'heartburn', 'congestion', 'itch'],
        possibleCauses: "Common viral cold, seasonal allergic rhinitis (allergies), mild muscle fatigue, or minor indigestion.",
        recommendations: [
            "Rest at home and prioritize hydration.",
            "Consider saline nasal sprays or warm saline gargles for throat discomfort.",
            "Monitor symptoms for changes; look out for new or worsening indications.",
            "Consult a pharmacist for over-the-counter options if appropriate."
        ]
    }
};

/**
 * Initializes symptom checker interface
 */
function initSymptomChecker() {
    const symptomForm = document.getElementById('symptom-form');
    if (symptomForm) {
        symptomForm.addEventListener('submit', handleSymptomSubmit);
    }

    const resetBtn = document.getElementById('btn-reset-symptoms');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetSymptomForm);
    }

    // Interactive Tag button listeners
    const tagBtns = document.querySelectorAll('.symptom-tags-container .tag-btn');
    tagBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            btn.classList.toggle('selected');
            updateTextInputFromTags();
        });
    });
}

/**
 * Updates textarea value based on which tag buttons are toggled
 */
function updateTextInputFromTags() {
    const textInput = document.getElementById('symptom-text-input');
    if (!textInput) return;

    const selectedTags = [];
    const activeTags = document.querySelectorAll('.symptom-tags-container .tag-btn.selected');
    activeTags.forEach(tag => {
        selectedTags.push(tag.getAttribute('data-symptom'));
    });

    if (selectedTags.length > 0) {
        textInput.value = `I am experiencing the following symptoms: ${selectedTags.join(', ')}.`;
    } else {
        textInput.value = '';
    }
}

/**
 * Resets form elements and tags
 */
function resetSymptomForm() {
    const form = document.getElementById('symptom-form');
    if (form) form.reset();

    const tagBtns = document.querySelectorAll('.symptom-tags-container .tag-btn');
    tagBtns.forEach(btn => btn.classList.remove('selected'));

    const resultsContainer = document.getElementById('symptom-results-container');
    if (resultsContainer) {
        resultsContainer.innerHTML = `
            <div class="symptom-empty-state">
                <div class="pulse-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/><circle cx="12" cy="12" r="10" opacity="0.15"/></svg>
                </div>
                <h4>Awaiting Input</h4>
                <p>Fill out the symptom details on the left and click "Analyze Symptoms" to see severity, possible causes, and professional recommendations.</p>
            </div>
        `;
    }
}

/**
 * Handles form submit, parses description and renders result
 * @param {Event} e 
 */
function handleSymptomSubmit(e) {
    e.preventDefault();
    const textInput = document.getElementById('symptom-text-input');
    const durationSelect = document.getElementById('symptom-duration');
    const ageSelect = document.getElementById('symptom-age');
    
    if (!textInput || !durationSelect || !ageSelect) return;

    const query = textInput.value.trim().toLowerCase();
    if (!query) return;

    const resultsContainer = document.getElementById('symptom-results-container');
    if (!resultsContainer) return;

    // Run analyzer
    const report = analyzeSymptomsText(query, durationSelect.value, ageSelect.value);
    
    // Render report card
    renderSymptomReport(report, resultsContainer);
}

/**
 * Core clinical text parsing algorithm
 * @param {string} text 
 * @param {string} duration 
 * @param {string} age 
 */
function analyzeSymptomsText(text, duration, age) {
    let matchedHigh = [];
    let matchedMedium = [];
    let matchedLow = [];

    // Evaluate keywords
    SYMPTOM_DATABASE.high.keywords.forEach(kw => {
        if (text.includes(kw)) matchedHigh.push(kw);
    });
    SYMPTOM_DATABASE.medium.keywords.forEach(kw => {
        if (text.includes(kw)) matchedMedium.push(kw);
    });
    SYMPTOM_DATABASE.low.keywords.forEach(kw => {
        if (text.includes(kw)) matchedLow.push(kw);
    });

    let severity = 'low';
    let databaseReference = SYMPTOM_DATABASE.low;

    // Hierarchy check: High wins, then Medium, then Low
    if (matchedHigh.length > 0) {
        severity = 'high';
        databaseReference = SYMPTOM_DATABASE.high;
    } else if (matchedMedium.length > 0) {
        severity = 'medium';
        databaseReference = SYMPTOM_DATABASE.medium;
    } else if (matchedLow.length > 0) {
        severity = 'low';
        databaseReference = SYMPTOM_DATABASE.low;
    }

    const allMatchedTags = [...matchedHigh, ...matchedMedium, ...matchedLow];

    // Format human-friendly duration text
    let durationText = "recently";
    if (duration === 'today') durationText = "starting today";
    if (duration === 'few-days') durationText = "over the last few days";
    if (duration === 'week') durationText = "for approximately a week";
    if (duration === 'chronic') durationText = "persistently for over 2 weeks";

    return {
        severity: severity,
        ageGroup: age.charAt(0).toUpperCase() + age.slice(1),
        durationText: durationText,
        possibleCauses: databaseReference.possibleCauses,
        recommendations: databaseReference.recommendations,
        matchedTags: allMatchedTags
    };
}

/**
 * Draws analysis result card inside container
 * @param {object} report 
 * @param {HTMLElement} container 
 */
function renderSymptomReport(report, container) {
    container.innerHTML = '';
    
    const matchedTagsHtml = report.matchedTags.length > 0
        ? `<div class="analysis-section">
            <h5>Identified Symptoms</h5>
            <div class="matched-symptom-tags">
                ${report.matchedTags.map(tag => `<span class="matched-tag">${tag}</span>`).join('')}
            </div>
           </div>`
        : '';

    const recsHtml = report.recommendations.map(rec => `<li>${rec}</li>`).join('');

    const reportCard = document.createElement('div');
    reportCard.className = 'analysis-report';
    reportCard.innerHTML = `
        <div class="report-header">
            <h4>Assessment Report</h4>
            <div class="report-severity">
                <span class="severity-indicator ${report.severity}">${report.severity.toUpperCase()} SEVERITY</span>
            </div>
        </div>
        
        <div class="analysis-section">
            <h5>Patient Details</h5>
            <p>Target Profile: <strong>${report.ageGroup}</strong>, presenting symptoms <strong>${report.durationText}</strong>.</p>
        </div>

        ${matchedTagsHtml}

        <div class="analysis-section">
            <h5>Potential Care Indicators</h5>
            <p>${report.possibleCauses}</p>
        </div>

        <div class="recommendations-box ${report.severity === 'high' ? 'high-severity' : ''}">
            <h5>${report.severity === 'high' ? 'Emergency Action Steps' : 'Recommended Next Steps'}</h5>
            <ul>
                ${recsHtml}
            </ul>
        </div>

        <p class="no-meds-msg" style="text-align: left; line-height: 1.3;">
            <em>Remember: This analysis is based on static wellness guidelines. If symptoms do not improve, consult a healthcare provider.</em>
        </p>
    `;

    container.appendChild(reportCard);
}
