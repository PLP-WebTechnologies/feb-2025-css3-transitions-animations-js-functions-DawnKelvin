// script.js

// Utility functions for localStorage
function setUserPreference(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function getUserPreference(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
    // Dynamic Greeting based on time
    const greetingDiv = document.getElementById('greeting');
    function setGreeting() {
        const hour = new Date().getHours();
        let greet = "Welcome!";
        if (hour < 12) greet = "Good morning!";
        else if (hour < 18) greet = "Good afternoon!";
        else greet = "Good evening!";
        greetingDiv.textContent = greet + " 👋";
    }
    setGreeting();

    // Dark Mode Toggle
    const darkModeBtn = document.getElementById('darkModeToggle');
    function updateDarkModeBtn() {
        darkModeBtn.textContent = document.body.classList.contains('dark-mode')
            ? '☀️ Light Mode'
            : '🌙 Dark Mode';
    }
    // On page load, apply stored preference
    if (getUserPreference('darkMode')) {
        document.body.classList.add('dark-mode');
    }
    updateDarkModeBtn();

    darkModeBtn.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        setUserPreference('darkMode', document.body.classList.contains('dark-mode'));
        updateDarkModeBtn();
        // Animate the toggle button
        darkModeBtn.classList.remove('btn-animate');
        void darkModeBtn.offsetWidth; // trigger reflow
        darkModeBtn.classList.add('btn-animate');
    });

    // Create a button for dynamic actions
    const dynamicBtn = document.createElement('button');
    dynamicBtn.textContent = 'Click Me!';
    dynamicBtn.className = 'btn';
    dynamicBtn.style.marginTop = '20px';

    // Insert the button after the Interests section
    const interestsSection = document.getElementById('Interests');
    interestsSection.appendChild(dynamicBtn);

    // Create a removable element
    const removableDiv = document.createElement('div');
    removableDiv.textContent = 'This is a dynamically added element!';
    removableDiv.id = 'removableDiv';
    removableDiv.style.marginTop = '15px';
    removableDiv.style.padding = '10px';
    removableDiv.style.backgroundColor = '#f0f0f0';
    removableDiv.style.borderRadius = '5px';

    let isAdded = false;

    dynamicBtn.addEventListener('click', function () {
        // Change text content in the Interests section
        const interestsP = interestsSection.querySelector('p');
        interestsP.textContent = 'You clicked the button! My interests now include JavaScript interactivity.';

        // Modify CSS styles of the button
        dynamicBtn.style.backgroundColor = '#007bff';
        dynamicBtn.style.color = '#fff';
        dynamicBtn.style.border = 'none';

        // Add or remove the removableDiv
        if (!isAdded) {
            interestsSection.appendChild(removableDiv);
            dynamicBtn.textContent = 'Remove Element';
            isAdded = true;
        } else {
            if (removableDiv.parentNode) {
                removableDiv.parentNode.removeChild(removableDiv);
            }
            dynamicBtn.textContent = 'Click Me!';
            isAdded = false;
        }

        // Animate the removableDiv when added
        if (isAdded) {
            removableDiv.classList.remove('pop');
            void removableDiv.offsetWidth;
            removableDiv.classList.add('pop');
        }
    });

    // Animate profile image on hover using CSS class
    const profileImg = document.querySelector('img[alt="My Photo"]');
    if (profileImg) {
        profileImg.addEventListener('mouseenter', () => {
            profileImg.classList.remove('pop');
            void profileImg.offsetWidth;
            profileImg.classList.add('pop');
        });
    }

    // Surprise Me! button: shows a random project or fun fact and animates text
    const surpriseBtn = document.getElementById('surpriseBtn');
    const surpriseText = document.getElementById('surpriseText');
    const surprises = [
        "Did you know? Kelvin loves aviation trivia!",
        "Check out the Database Design project above!",
        "Fun fact: JavaScript can make your site come alive.",
        "Try the dark mode toggle for a new look!",
        "Python is one of Kelvin's favorite languages.",
        "You can copy the email address below with one click!"
    ];
    if (surpriseBtn && surpriseText) {
        surpriseBtn.addEventListener('click', function () {
            const idx = Math.floor(Math.random() * surprises.length);
            surpriseText.textContent = surprises[idx];
            surpriseText.classList.remove('pop');
            void surpriseText.offsetWidth;
            surpriseText.classList.add('pop');
        });
    }

    // Copy Email button
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const emailText = document.getElementById('emailText');
    const copyIcon = document.getElementById('copyIcon');
    if (copyEmailBtn && emailText && copyIcon) {
        copyEmailBtn.addEventListener('click', function () {
            navigator.clipboard.writeText(emailText.textContent);
            // Change SVG to a checkmark
            copyIcon.outerHTML = `<svg id="copyIcon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" style="vertical-align:middle;">
                <path d="M5 13l4 4L19 7" stroke="#28a745" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;
            setTimeout(() => {
                copyEmailBtn.querySelector('svg').outerHTML = `<svg id="copyIcon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" style="vertical-align:middle;">
                    <rect x="9" y="9" width="13" height="13" rx="2" fill="#fff" stroke="#007bff" stroke-width="2"/>
                    <rect x="3" y="3" width="13" height="13" rx="2" fill="#fff" stroke="#007bff" stroke-width="2"/>
                </svg>`;
            }, 1500);
        });
    }

    // Scroll to Top Button
    const scrollBtn = document.createElement('button');
    scrollBtn.textContent = "⬆️ Top";
    scrollBtn.className = "btn";
    scrollBtn.style.position = "fixed";
    scrollBtn.style.bottom = "30px";
    scrollBtn.style.right = "30px";
    scrollBtn.style.display = "none";
    scrollBtn.style.zIndex = "1000";
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', function () {
        if (window.scrollY > 200) {
            scrollBtn.style.display = "block";
        } else {
            scrollBtn.style.display = "none";
        }
    });
    scrollBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Animation triggered by user action (e.g., clicking "Surprise Me!" button)
const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseText = document.getElementById('surpriseText');
if (surpriseBtn && surpriseText) {
    surpriseBtn.addEventListener('click', () => {
        surpriseText.textContent = "🎉 Here's your surprise animation!";
        surpriseText.classList.remove('pop');
        // Trigger reflow to restart animation
        void surpriseText.offsetWidth;
        surpriseText.classList.add('pop');
    });
}

// Add this CSS to style.css for the animation;
/*
.pop {
    animation: popIn 0.7s;
}
*/