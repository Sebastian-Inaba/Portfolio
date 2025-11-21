const yearToday = new Date();
const year = yearToday.getFullYear();

window.addEventListener('DOMContentLoaded', () => {
    // Prompt with slight delay
    setTimeout(() => {
        if (
            confirm(
                'This is part of an old portfolio, which is no longer in use.\n\nWould you like to visit my current portfolio?'
            )
        ) {
            window.location.href = 'https://sebastian-inaba.github.io/Portfolio/ClassicWeb/';
        }
    }, 100);

    // Set year
    const yearEl = document.getElementById('getYear');
    if (yearEl) yearEl.textContent = year;

    // Update buttons initially
    updateButtons();

    // Update buttons on resize
    window.addEventListener('resize', updateButtons);
});

function updateButtons() {
    const contactBtn = document.querySelector('.contact-btn');
    const cvBtn = document.querySelector('.cv-btn');

    if (!contactBtn || !cvBtn) return;

    if (window.innerWidth <= 425) {
        contactBtn.textContent = 'Contact';
        cvBtn.textContent = 'CV';
    } else {
        contactBtn.textContent = 'Contact Me';
        cvBtn.textContent = 'Download CV';
    }
}