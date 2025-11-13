// marrakech.js - JavaScript for Marrakech city page

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize user data
  initializeUserData();
  
  // Load and display comments
  loadComments();
  
  // Setup event listeners
  setupEventListeners();
  
  // Check if user has enough points to claim reward
  checkPointsForReward();
});

// Initialize user data in localStorage
function initializeUserData() {
  // Check if user data exists, if not create default
  if (!localStorage.getItem('faltrav_user')) {
    const defaultUser = {
      email: null,
      name: null,
      points: 0,
      gamesPlayed: 0,
      lastVisit: new Date().toISOString()
    };
    localStorage.setItem('faltrav_user', JSON.stringify(defaultUser));
  }
  
  // Initialize comments array for Marrakech if it doesn't exist
  if (!localStorage.getItem('city_marrakech_comments')) {
    localStorage.setItem('city_marrakech_comments', JSON.stringify([]));
  }
  
  // Update points display
  updatePointsDisplay();
}

// Load and display comments for Marrakech
function loadComments() {
  const commentsContainer = document.getElementById('commentsContainer');
  const comments = JSON.parse(localStorage.getItem('city_marrakech_comments')) || [];
  
  if (comments.length === 0) {
    commentsContainer.innerHTML = '<div class="alert alert-info">No reviews yet. Be the first to share your experience!</div>';
    return;
  }
  
  // Sort comments by date (newest first)
  comments.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  let commentsHTML = '<div class="row g-4">';
  
  comments.forEach(comment => {
    const date = new Date(comment.date);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    commentsHTML += `
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start">
              <h6 class="card-title">${escapeHtml(comment.name)}</h6>
              <small class="text-muted">${formattedDate}</small>
            </div>
            <div class="mb-2">
              ${renderStars(comment.rating)}
            </div>
            <p class="card-text">${escapeHtml(comment.comment)}</p>
          </div>
        </div>
      </div>
    `;
  });
  
  commentsHTML += '</div>';
  commentsContainer.innerHTML = commentsHTML;
}

// Render star rating
function renderStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += '<i class="bi bi-star-fill text-warning"></i>';
    } else {
      stars += '<i class="bi bi-star text-secondary"></i>';
    }
  }
  return stars;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Setup event listeners
function setupEventListeners() {
  // Comment form submission
  const commentForm = document.getElementById('commentForm');
  if (commentForm) {
    commentForm.addEventListener('submit', handleCommentSubmit);
  }
  
  // Star rating functionality
  const stars = document.querySelectorAll('.star-rating .star');
  stars.forEach(star => {
    star.addEventListener('click', function() {
      const rating = parseInt(this.getAttribute('data-rating'));
      document.getElementById('commentRating').value = rating;
      
      // Update visual stars
      stars.forEach((s, index) => {
        if (index < rating) {
          s.classList.add('text-warning');
          s.classList.remove('text-secondary');
        } else {
          s.classList.remove('text-warning');
          s.classList.add('text-secondary');
        }
      });
    });
  });
  
  // Play game button
  const playGameBtn = document.getElementById('playGameBtn');
  if (playGameBtn) {
    playGameBtn.addEventListener('click', handlePlayGame);
  }
  
  // Claim reward button
  const claimRewardBtn = document.getElementById('claimRewardBtn');
  if (claimRewardBtn) {
    claimRewardBtn.addEventListener('click', handleClaimReward);
  }
  
  // Language switcher
  const languageLinks = document.querySelectorAll('[data-lang]');
  languageLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const lang = this.getAttribute('data-lang');
      switchLanguage(lang);
    });
  });
}

// Handle comment submission
async function handleCommentSubmit(e) {
  e.preventDefault();
  
  const name = document.getElementById('commentName').value.trim();
  const rating = parseInt(document.getElementById('commentRating').value);
  const commentText = document.getElementById('commentText').value.trim();
  
  if (!name || rating === 0 || commentText.length < 10) {
    alert('Please fill all fields. Comment must be at least 10 characters.');
    return;
  }
  
  // Collect email if not already done
  const userEmail = await collectEmailIfNotPresent();
  if (!userEmail) return; // User cancelled
  
  // Create comment object
  const newComment = {
    name: name,
    rating: rating,
    comment: commentText,
    date: new Date().toISOString()
  };
  
  // Get existing comments
  const comments = JSON.parse(localStorage.getItem('city_marrakech_comments')) || [];
  
  // Add new comment
  comments.push(newComment);
  
  // Save comments to localStorage
  localStorage.setItem('city_marrakech_comments', JSON.stringify(comments));
  
  // Reset form
  document.getElementById('commentForm').reset();
  document.getElementById('commentRating').value = '0';
  
  // Remove star highlighting
  document.querySelectorAll('.star-rating .star').forEach(star => {
    star.classList.remove('text-warning');
    star.classList.add('text-secondary');
  });
  
  // Reload comments display
  loadComments();
  
  alert('Thank you for your review!');
}

// Handle playing game
async function handlePlayGame() {
  const userEmail = await collectEmailIfNotPresent();
  if (!userEmail) return; // User cancelled
  
  // Get current user data
  const user = JSON.parse(localStorage.getItem('faltrav_user'));
  
  // Update user data
  user.points += 10;
  user.gamesPlayed += 1;
  
  // Save updated user data
  localStorage.setItem('faltrav_user', JSON.stringify(user));
  
  // Update points display
  updatePointsDisplay();
  
  // Check if user has enough points for reward
  checkPointsForReward();
  
  alert('Game completed! You earned 10 points.');
}

// Handle claiming reward
async function handleClaimReward() {
  const userEmail = await collectEmailIfNotPresent();
  if (!userEmail) return; // User cancelled
  
  // Get current user data
  const user = JSON.parse(localStorage.getItem('faltrav_user'));
  
  // Check if user has enough points
  if (user.points < 50) {
    alert('You need at least 50 points to claim this reward.');
    return;
  }
  
  // Deduct points for claiming reward
  user.points -= 50;
  
  // Save updated user data
  localStorage.setItem('faltrav_user', JSON.stringify(user));
  
  // Update points display
  updatePointsDisplay();
  
  alert('Reward claimed! You received the Marrakech PDF guide. (In a real implementation, this would download a file)');
  
  // Hide claim div since points are now less than 50
  document.getElementById('claimDiv').style.display = 'none';
}

// Collect email if not already present in user data
async function collectEmailIfNotPresent() {
  const user = JSON.parse(localStorage.getItem('faltrav_user'));
  
  if (user.email) {
    return user.email; // Email already exists
  }
  
  // Show email collection modal
  const modal = new bootstrap.Modal(document.getElementById('emailModal'));
  modal.show();
  
  return new Promise((resolve) => {
    document.getElementById('submitEmail').onclick = function() {
      const email = document.getElementById('userEmail').value.trim();
      const name = document.getElementById('userName').value.trim();
      
      if (email) {
        // Update user data with email and name
        user.email = email;
        if (name) user.name = name;
        localStorage.setItem('faltrav_user', JSON.stringify(user));
        
        modal.hide();
        
        // Reset form
        document.getElementById('emailForm').reset();
        
        resolve(email);
      } else {
        alert('Please enter a valid email address.');
        resolve(null);
      }
    };
    
    // Close modal listener
    document.getElementById('emailModal').addEventListener('hidden.bs.modal', function() {
      // Reset form when modal is closed
      document.getElementById('emailForm').reset();
      resolve(null); // User cancelled
    });
  });
}

// Update points display on page
function updatePointsDisplay() {
  const user = JSON.parse(localStorage.getItem('faltrav_user'));
  const pointsCounter = document.getElementById('pointsCounter');
  
  if (pointsCounter) {
    pointsCounter.textContent = user.points;
  }
  
  // Also update in user profile if needed elsewhere
  window.currentPoints = user.points;
}

// Check if user has enough points to show claim reward option
function checkPointsForReward() {
  const user = JSON.parse(localStorage.getItem('faltrav_user'));
  const claimDiv = document.getElementById('claimDiv');
  
  if (user.points >= 50) {
    claimDiv.style.display = 'block';
  } else {
    claimDiv.style.display = 'none';
  }
}

// Switch language (basic implementation)
function switchLanguage(lang) {
  // In a real implementation, this would load language-specific content
  // For now, just show an alert
  alert(`Language switched to ${lang.toUpperCase()}. In a full implementation, this would change all text content.`);
  
  // Update the dropdown button text to show selected language
  const langNames = {
    'en': 'EN',
    'ar': 'AR',
    'fr': 'FR'
  };
  
  document.querySelector('.dropdown-toggle').innerHTML = `<i class="bi bi-globe"></i> ${langNames[lang]}`;
}

// Check for cookie consent on page load
if (!localStorage.getItem('cookieConsent')) {
  document.getElementById('cookie-consent').classList.remove('d-none');
}

// Handle cookie consent
document.getElementById('accept-cookies').addEventListener('click', function() {
  localStorage.setItem('cookieConsent', 'accepted');
  document.getElementById('cookie-consent').classList.add('d-none');
});

document.getElementById('reject-cookies').addEventListener('click', function() {
  localStorage.setItem('cookieConsent', 'rejected');
  document.getElementById('cookie-consent').classList.add('d-none');
});