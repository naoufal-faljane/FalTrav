// main.js - Main JavaScript file for FalTrav website

// Get the user's preferred language or default to English
let currentLanguage = localStorage.getItem('language') || 'en';

// Set up language switcher event listeners
function setupLanguageSwitcher() {
  const langBtns = document.querySelectorAll('[data-lang]');
  if (langBtns.length > 0) {
    langBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const lang = this.getAttribute('data-lang');
        changeLanguage(lang);
      });
    });
  } else {
    // Fallback to old method if using the old header
    const languageButtons = {
      en: document.getElementById('lang-en'),
      ar: document.getElementById('lang-ar'),
      fr: document.getElementById('lang-fr')
    };

    if (languageButtons.en) {
      languageButtons.en.addEventListener('click', () => changeLanguage('en'));
    }
    if (languageButtons.ar) {
      languageButtons.ar.addEventListener('click', () => changeLanguage('ar'));
    }
    if (languageButtons.fr) {
      languageButtons.fr.addEventListener('click', () => changeLanguage('fr'));
    }
  }
}

// Change the language
function changeLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  setLanguage(lang);
}

// Set the language for the entire page
function setLanguage(lang) {
  // Update language buttons active state if using dropdown
  const langItems = document.querySelectorAll('.dropdown-item[data-lang]');
  if (langItems.length > 0) {
    langItems.forEach(item => {
      if (item.getAttribute('data-lang') === lang) {
        // Update the dropdown toggle text to show selected language
        const langNames = {
          'en': 'EN',
          'ar': 'AR',
          'fr': 'FR'
        };
        const dropdownToggle = document.querySelector('.dropdown-toggle');
        if (dropdownToggle) {
          dropdownToggle.innerHTML = `<i class="bi bi-globe"></i> ${langNames[lang]}`;
        }
      }
    });
  }

  // Update language buttons active state for old header style
  const languageButtons = {
    en: document.getElementById('lang-en'),
    ar: document.getElementById('lang-ar'),
    fr: document.getElementById('lang-fr')
  };

  Object.keys(languageButtons).forEach(key => {
    if (languageButtons[key]) {
      if (key === lang) {
        languageButtons[key].classList.add('active');
      } else {
        languageButtons[key].classList.remove('active');
      }
    }
  });

  // Set document direction for Arabic
  if (lang === 'ar') {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ar');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', lang);
  }

  // Update all translatable elements
  updateTranslations(lang);
}

// Update all elements with data-i18n attributes
function updateTranslations(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translations[lang][key];
      } else {
        element.textContent = translations[lang][key];
      }
    }
  });
}

// Set up shop filter functionality
function setupShopFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');
        filterProducts(filter);
      });
    });
  }
}

// Filter products based on type
function filterProducts(filterType) {
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    const productType = card.getAttribute('data-type');

    if (filterType === 'all' || filterType === productType) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', () => {
  // Set 'Show All' as active by default (for shop page)
  const allButton = document.querySelector('.filter-btn[data-filter="all"]');
  if (allButton) {
    allButton.classList.add('active');
  }

  // Initialize language switcher
  setupLanguageSwitcher();

  // Initialize shop filters if on shop page
  setupShopFilters();

  // Initialize newsletter form
  setupNewsletterForm();

  // Check for cookie consent on pages that have the banner
  if (document.getElementById('cookie-consent')) {
    if (!localStorage.getItem('cookieConsent')) {
      document.getElementById('cookie-consent').classList.remove('d-none');
    }

    // Handle cookie consent
    const acceptBtn = document.getElementById('accept-cookies');
    const rejectBtn = document.getElementById('reject-cookies');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        document.getElementById('cookie-consent').classList.add('d-none');
      });
    }

    if (rejectBtn) {
      rejectBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'rejected');
        document.getElementById('cookie-consent').classList.add('d-none');
      });
    }
  }
});

// Set up newsletter subscription
function setupNewsletterForm() {
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value;

      // Simple validation
      if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // Here you would normally send the email to your server
      // For now, just show a success message
      alert('Thank you for subscribing to our newsletter!');
      emailInput.value = '';
    });
  }
}

// Email validation helper
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}