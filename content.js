// Royal Road Focus Mode - Content Script
// Hides comments and notifications based on user preferences

const STORAGE_KEYS = {
  hideRecentComments: 'rr_hideRecentComments',
  hideLatestComments: 'rr_hideLatestComments',
  hideRecentReviews: 'rr_hideRecentReviews',
  hideLatestReviews: 'rr_hideLatestReviews',
  hideNotifications: 'rr_hideNotifications',
};

// Default all settings to ON (hiding enabled)
const DEFAULTS = {
  rr_hideRecentComments: true,
  rr_hideLatestComments: true,
  rr_hideRecentReviews: true,
  rr_hideLatestReviews: true,
  rr_hideNotifications: true,
};

// CSS class names we inject on <html> to drive hide.css rules
const CSS_FLAGS = {
  hideRecentComments: 'rrf-hide-recent-comments',
  hideLatestComments: 'rrf-hide-latest-comments',
  hideRecentReviews: 'rrf-hide-recent-reviews',
  hideLatestReviews: 'rrf-hide-latest-reviews',
  hideNotifications: 'rrf-hide-notifications',
};

function applyFlags(settings) {
  const html = document.documentElement;

  // Recent Comments card (Author Dashboard)
  if (settings.rr_hideRecentComments) {
    html.classList.add(CSS_FLAGS.hideRecentComments);
  } else {
    html.classList.remove(CSS_FLAGS.hideRecentComments);
  }

  // Latest Comments card (Fiction pages)
  if (settings.rr_hideLatestComments) {
    html.classList.add(CSS_FLAGS.hideLatestComments);
  } else {
    html.classList.remove(CSS_FLAGS.hideLatestComments);
  }

  // Recent Reviews card (Author Dashboard)
  if (settings.rr_hideRecentReviews) {
    html.classList.add(CSS_FLAGS.hideRecentReviews);
  } else {
    html.classList.remove(CSS_FLAGS.hideRecentReviews);
  }

  // Latest Reviews card (Fiction pages)
  if (settings.rr_hideLatestReviews) {
    html.classList.add(CSS_FLAGS.hideLatestReviews);
  } else {
    html.classList.remove(CSS_FLAGS.hideLatestReviews);
  }

  // Notification badges (header + author page)
  if (settings.rr_hideNotifications) {
    html.classList.add(CSS_FLAGS.hideNotifications);
  } else {
    html.classList.remove(CSS_FLAGS.hideNotifications);
  }
}

// Also hide comment cards via JS for robustness (catches dynamically rendered cards)
function hideCommentCardsByLabel(labelText) {
  // Find all card-label elements
  const labels = document.querySelectorAll('h3.card-label, .card-label');
  labels.forEach(label => {
    const text = label.textContent.trim().toLowerCase();
    if (text.includes(labelText.toLowerCase())) {
      // Walk up to the card container and hide it
      const card = label.closest('.card-custom, .card, .portlet');
      if (card) {
        card.style.setProperty('display', 'none', 'important');
      }
    }
  });
}

function applyJSHiding(settings) {
  if (settings.rr_hideRecentComments) {
    hideCommentCardsByLabel('Recent Comments');
  }
  if (settings.rr_hideLatestComments) {
    hideCommentCardsByLabel('Latest Comments');
  }
  if (settings.rr_hideRecentReviews) {
    hideCommentCardsByLabel('Recent Reviews');
  }
  if (settings.rr_hideLatestReviews) {
    hideCommentCardsByLabel('Latest Reviews');
  }
}

// Load settings from chrome.storage and apply
function init() {
  chrome.storage.local.get(Object.values(STORAGE_KEYS), (result) => {
    // Merge with defaults (missing keys → default value)
    const settings = { ...DEFAULTS, ...result };
    applyFlags(settings);

    // Also run JS-based hiding once DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => applyJSHiding(settings));
    } else {
      applyJSHiding(settings);
    }

    // Observe for dynamically inserted cards (Royal Road uses JS rendering)
    const observer = new MutationObserver(() => applyJSHiding(settings));
    observer.observe(document.body || document.documentElement, {
      childList: true,
      subtree: true,
    });
  });
}

// Listen for settings changes from the popup
chrome.storage.onChanged.addListener((changes) => {
  chrome.storage.local.get(Object.values(STORAGE_KEYS), (result) => {
    const settings = { ...DEFAULTS, ...result };
    applyFlags(settings);
    applyJSHiding(settings);
  });
});

init();
