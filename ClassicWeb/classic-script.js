const yearToday = new Date();
const year = yearToday.getFullYear();

(function () {
  function updateButtons() {
    const contact = document.querySelector('.contact-btn');
    const cv = document.querySelector('.cv-btn');

    if (window.innerWidth <= 425) {
      if (contact) contact.textContent = "Contact";
      if (cv) cv.textContent = "CV";
    } else {
      if (contact) contact.textContent = "Contact Me";
      if (cv) cv.textContent = "Download CV";
    }
  }

  // Show prompt once per tab session, then optionally redirect
  function maybeShowOldPortfolioPrompt() {
    if (sessionStorage.getItem('portfolioPromptShown')) return;
    sessionStorage.setItem('portfolioPromptShown', '1');

    // Prevent redirect loop: don't redirect if already on ClassicWeb
    const classicPath = '/Portfolio/ClassicWeb/';
    if (location.pathname.includes(classicPath) || location.href.includes('ClassicWeb')) return;

    if (confirm("This is part of an old portfolio, which is no longer in use.\n\nWould you like to visit my current portfolio?")) {
      window.location.href = "https://inabasebastian.com/Portfolio/ClassicWeb/";
    }
  }

  // Run when DOM is ready
  window.addEventListener('DOMContentLoaded', function () {
    // Set year 
    const yearEl = document.getElementById('getYear');
    if (yearEl) yearEl.textContent = (new Date()).getFullYear();

    // Prompt 
    maybeShowOldPortfolioPrompt();

    // Initial button labels and resize handler
    updateButtons();
    window.addEventListener('resize', updateButtons);
  });
})();