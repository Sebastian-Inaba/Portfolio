const yearToday = new Date();
const year = yearToday.getFullYear();

if (confirm("This is part of an old portfolio, which is no longer in use.\n\nWould you like to visit my current portfolio?")) {
  window.location.href = "https://InabaSebastian.com/";
}

function updateButtons() {
  if (window.innerWidth <= 425) {
    document.querySelector('.contact-btn').textContent = "Contact";
    document.querySelector('.cv-btn').textContent = "CV";
  } else {
    document.querySelector('.contact-btn').textContent = "Contact Me";
    document.querySelector('.cv-btn').textContent = "Download CV";
  }
}

window.addEventListener('resize', updateButtons);
window.addEventListener('load', updateButtons);

document.getElementById('getYear').textContent = year;