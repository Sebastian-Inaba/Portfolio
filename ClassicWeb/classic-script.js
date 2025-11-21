const yearToday = new Date();
const year = yearToday.getFullYear();

window.addEventListener('DOMContentLoaded', () => {
    if (
        confirm(
            'You are viewing an old version of my portfolio. Which is no longer in use.\n\n' +
                'Click OK to continue viewing the old portfolio.\n' +
                'Click Cancel to go back to where you came from.'
        )
    ) {
        // OK, stay on the page
    } else {
        // Cancel, go back to previous page
        history.back();
    }
});

function updateButtons() {
    if (window.innerWidth <= 425) {
        document.querySelector('.contact-btn').textContent = 'Contact';
        document.querySelector('.cv-btn').textContent = 'CV';
    } else {
        document.querySelector('.contact-btn').textContent = 'Contact Me';
        document.querySelector('.cv-btn').textContent = 'Download CV';
    }
}

window.addEventListener('resize', updateButtons);
window.addEventListener('load', updateButtons);

document.getElementById('getYear').textContent = year;
