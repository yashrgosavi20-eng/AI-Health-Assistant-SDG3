/**
 * SDG 3 AI Health Assistant - Local NLP Chatbot Engine
 */

// Simulated AI Chatbot Response Database
const CHAT_RESPONSES = {
    diet: `
        <h4>Balanced Nutrition & Diet Guidelines</h4>
        <p>A nutritious diet is crucial for promoting long-term cellular health and maintaining immune function. Here are the core pillars recommended by dietary guides:</p>
        <ul>
            <li><strong>Emphasize Whole Foods:</strong> Build plates around leafy greens, colorful vegetables, whole grains (oats, quinoa), and legumes.</li>
            <li><strong>Lean Proteins:</strong> Include lean poultry, fish (rich in omega-3), tofu, or beans.</li>
            <li><strong>Healthy Fats:</strong> Consume avocados, extra virgin olive oil, nuts, and seeds daily.</li>
            <li><strong>Reduce Processed Sugar:</strong> Limit soda, confectionery, and packaged snacks to reduce cardiovascular strain and lower diabetes risks.</li>
        </ul>
        <p><em>Tip: Try filling half your plate with vegetables at lunch and dinner to ensure sufficient micronutrient intake!</em></p>
    `,
    sleep: `
        <h4>Optimal Sleep Hygiene Practices</h4>
        <p>Quality sleep is a primary driver of neural recovery, hormone regulation, and cardiovascular repairs. For standard adult wellness, aim for 7-9 hours of sleep using these tips:</p>
        <ul>
            <li><strong>Consistent Sleep-Wake Times:</strong> Go to bed and wake up at the same hour daily, establishing a regular circadian rhythm.</li>
            <li><strong>Optimize Bedroom Environment:</strong> Keep your room dark, quiet, and cool (60-67°F or 15-19°C).</li>
            <li><strong>Limit Blue Light Exposure:</strong> Power down smartphones, laptops, and TVs 45-60 minutes before attempting to sleep.</li>
            <li><strong>Avoid Night Stimulants:</strong> Refrain from heavy meals, caffeine, or alcohol in the late evening, as they disrupt REM and deep sleep cycles.</li>
        </ul>
    `,
    workout: `
        <h4>General Fitness & Exercise Suggestions</h4>
        <p>Regular physical activity is vital in mitigating chronic conditions and boosting mental clarity. A balanced weekly exercise program should integrate:</p>
        <ul>
            <li><strong>Aerobic Cardio:</strong> Aim for 150 minutes of moderate activity (brisk walking, cycling) or 75 minutes of vigorous exercise (running, swimming) weekly.</li>
            <li><strong>Resistance Strength:</strong> Perform full-body muscle-strengthening sessions (weights, bands, bodyweight) 2-3 times per week.</li>
            <li><strong>Flexibility & Balance:</strong> Incorporate yoga, pilates, or targeted stretching routines for 10 minutes daily to maintain healthy joint mobility.</li>
        </ul>
        <p><em>Note: If you are beginning a new exercise program, start slowly and build intensity gradually to avoid injuries.</em></p>
    `,
    hydration: `
        <h4>Hydration & Daily Water Guidelines</h4>
        <p>Water comprises roughly 60% of human body weight and is essential for kidney filtration, joint lubrication, cognitive function, and cellular energy:</p>
        <ul>
            <li><strong>Intake Targets:</strong> A standard guideline is approximately 2.7 to 3.7 liters of total fluids daily for adults, varying with activity levels and climate.</li>
            <li><strong>Pre-emptive Sipping:</strong> Drink water continuously rather than waiting to feel thirsty, as thirst is an early indicator of mild dehydration.</li>
            <li><strong>Cognitive Benefits:</strong> Even mild dehydration (1-2% body weight loss) can lead to headaches, brain fog, fatigue, and mood swings.</li>
        </ul>
    `,
    stress: `
        <h4>Mental Well-being & Stress Management</h4>
        <p>Emotional and psychological wellness is highly linked to physical longevity. Manage daily anxiety and stress with these behavioral tools:</p>
        <ul>
            <li><strong>Box Breathing Exercises:</strong> Inhale for 4 seconds, hold for 4, exhale for 4, and hold empty for 4. Repeat 5 times to activate the parasympathetic nervous system.</li>
            <li><strong>Daily Mindfulness:</strong> Dedicate 5-10 minutes to meditation or quiet contemplation, focusing on physical grounding.</li>
            <li><strong>Regular Work Breaks:</strong> Step away from workspaces for short periods to lower mental fatigue.</li>
            <li><strong>Professional Support:</strong> Don't hesitate to consult licensed counselors if stress or sadness feels persistent.</li>
        </ul>
    `,
    vitamin: `
        <h4>Essential Vitamins & Nutrient Guidance</h4>
        <p>While a varied diet is the optimal way to get vitamins, understanding key micronutrients supports overall longevity:</p>
        <ul>
            <li><strong>Vitamin D3:</strong> Essential for calcium absorption, bone strength, and immune activation. Can be synthesized via sunlight or obtained via supplements.</li>
            <li><strong>Vitamin B12:</strong> Critical for nerve function and red blood cell production. Primarily found in animal products; vegans should seek fortified foods or supplements.</li>
            <li><strong>Vitamin C & Zinc:</strong> Powerful antioxidants that support skin integrity, wound healing, and cellular immunity.</li>
        </ul>
        <p><em>Always consult a physician before starting new dietary supplements to avoid counter-interactions.</em></p>
    `,
    prevention: `
        <h4>Preventive Healthcare & Screenings</h4>
        <p>In alignment with UN SDG 3, preventive care forms the foundation of sustainable health systems, helping detect concerns early:</p>
        <ul>
            <li><strong>Routine Checkups:</strong> Schedule annual physical exams to track blood pressure, lipid profiles, and fasting glucose levels.</li>
            <li><strong>Immunization Records:</strong> Keep vaccinations up to date (flu shots, tetanus boosters, boosters for shingles/pneumonia as appropriate).</li>
            <li><strong>Healthy Vitals:</strong> Knowing your baseline numbers (resting heart rate, BMI, blood sugar) helps identify anomalies early.</li>
        </ul>
    `,
    greeting: `
        <h4>Welcome to HealthAI Companion!</h4>
        <p>I can help answer general questions regarding:</p>
        <ul>
            <li>Balanced diet planning and nutrition science.</li>
            <li>Sleep optimization techniques.</li>
            <li>Cardio, strength, and stretching exercises.</li>
            <li>Hydration, stress relief, and vitamin benefits.</li>
        </ul>
        <p>Please enter a topic in the text field or choose one of our suggested questions to begin.</p>
    `
};

/**
 * Initializes chatbot event listeners
 */
function initChatbot() {
    const chatForm = document.getElementById('chat-form');
    if (chatForm) {
        chatForm.addEventListener('submit', handleChatSubmit);
    }
}

/**
 * Handles user form submission in chatbot panel
 * @param {Event} e 
 */
function handleChatSubmit(e) {
    e.preventDefault();
    const inputField = document.getElementById('chat-input-text');
    if (!inputField) return;

    const userMessage = inputField.value.trim();
    if (!userMessage) return;

    // Append user message bubble
    appendChatBubble('user', `<p>${escapeHTML(userMessage)}</p>`);
    inputField.value = '';

    // Simulate AI thinking and reply
    triggerBotResponse(userMessage);
}

/**
 * Interface entry to trigger chatbot query from click prompts
 * @param {string} promptText 
 */
function sendChatPrompt(promptText) {
    // Navigate to chatbot tab if not currently active
    navigateToPage('chatbot');
    
    // Append user bubble and respond
    appendChatBubble('user', `<p>${escapeHTML(promptText)}</p>`);
    triggerBotResponse(promptText);
}

/**
 * Appends a bubble element inside the chat screen
 * @param {'user' | 'bot'} sender 
 * @param {string} htmlContent 
 */
function appendChatBubble(sender, htmlContent) {
    const container = document.getElementById('chat-messages-container');
    if (!container) return;

    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    bubble.innerHTML = `
        <div class="bubble-content">
            ${htmlContent}
        </div>
        <span class="bubble-time">${timeString}</span>
    `;

    container.appendChild(bubble);
    // Scroll container to bottom
    container.scrollTop = container.scrollHeight;
}

/**
 * Simulates AI thinking delay and outputs matched text reply
 * @param {string} text 
 */
function triggerBotResponse(text) {
    const container = document.getElementById('chat-messages-container');
    if (!container) return;

    // Create a temporary loading bubble
    const typingBubble = document.createElement('div');
    typingBubble.className = 'chat-bubble bot typing-bubble';
    typingBubble.innerHTML = `
        <div class="bubble-content">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    container.appendChild(typingBubble);
    container.scrollTop = container.scrollHeight;

    // Parse keywords local NLP
    const cleanText = text.toLowerCase();
    let matchedResponse = '';

    if (cleanText.includes('diet') || cleanText.includes('food') || cleanText.includes('eat') || cleanText.includes('nutrition') || cleanText.includes('meal')) {
        matchedResponse = CHAT_RESPONSES.diet;
    } else if (cleanText.includes('sleep') || cleanText.includes('night') || cleanText.includes('rest') || cleanText.includes('insomnia')) {
        matchedResponse = CHAT_RESPONSES.sleep;
    } else if (cleanText.includes('workout') || cleanText.includes('exercise') || cleanText.includes('gym') || cleanText.includes('cardio') || cleanText.includes('stretch') || cleanText.includes('running')) {
        matchedResponse = CHAT_RESPONSES.workout;
    } else if (cleanText.includes('water') || cleanText.includes('hydrate') || cleanText.includes('hydration') || cleanText.includes('drink')) {
        matchedResponse = CHAT_RESPONSES.hydration;
    } else if (cleanText.includes('stress') || cleanText.includes('anxiety') || cleanText.includes('mental') || cleanText.includes('calm') || cleanText.includes('depression')) {
        matchedResponse = CHAT_RESPONSES.stress;
    } else if (cleanText.includes('vitamin') || cleanText.includes('supplement') || cleanText.includes('mineral') || cleanText.includes('d3')) {
        matchedResponse = CHAT_RESPONSES.vitamin;
    } else if (cleanText.includes('prevent') || cleanText.includes('vaccine') || cleanText.includes('checkup') || cleanText.includes('screening') || cleanText.includes('doctor')) {
        matchedResponse = CHAT_RESPONSES.prevention;
    } else if (cleanText.includes('hello') || cleanText.includes('hi') || cleanText.includes('hey') || cleanText.includes('help')) {
        matchedResponse = CHAT_RESPONSES.greeting;
    } else {
        // Dynamic fallback generator
        matchedResponse = `
            <h4>Health & Well-Being Consultation</h4>
            <p>Thank you for your inquiry about <strong>"${escapeHTML(text)}"</strong>.</p>
            <p>While I run as a local AI assistant and don't have custom training on that specific phrasing, here are foundational wellness guidelines associated with SDG 3 to help you:</p>
            <ul>
                <li>Maintain a hydration target of at least 2.5 liters of clean water daily.</li>
                <li>Strive for 7-8 hours of sleep to support neurological and vascular cell restoration.</li>
                <li>Engage in 20-30 minutes of low-impact physical activity to increase nitric oxide and blood flow.</li>
            </ul>
            <p>Please feel free to ask me more specifically about topics like <em>diet, exercise, stress relief, hydration, or sleep hygiene</em> for customized breakdowns!</p>
        `;
    }

    // Delay bot reply for premium AI feel
    setTimeout(() => {
        // Remove typing indicator
        if (typingBubble.parentNode) {
            typingBubble.parentNode.removeChild(typingBubble);
        }
        appendChatBubble('bot', matchedResponse);
    }, 800 + Math.random() * 800); // 0.8s to 1.6s variable delay
}

/**
 * Escapes characters to prevent HTML injections
 * @param {string} str 
 */
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}
