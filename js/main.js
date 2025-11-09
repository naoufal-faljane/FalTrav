// main.js - Main JavaScript file for FalTrav website

// Get the user's preferred language or default to English
let currentLanguage = localStorage.getItem('language') || 'en';

// DOM elements
const languageButtons = {
  en: document.getElementById('lang-en'),
  ar: document.getElementById('lang-ar'),
  fr: document.getElementById('lang-fr')
};

// Set the initial language
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLanguage);
  setupLanguageSwitcher();
  setupShopFilters();
});

// Set up language switcher event listeners
function setupLanguageSwitcher() {
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

// Change the language
function changeLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  setLanguage(lang);
}

// Set the language for the entire page
function setLanguage(lang) {
  // Update language buttons active state
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

// Initialize shop filters on page load
document.addEventListener('DOMContentLoaded', () => {
  // Set 'Show All' as active by default
  const allButton = document.querySelector('.filter-btn[data-filter="all"]');
  if (allButton) {
    allButton.classList.add('active');
  }
});
