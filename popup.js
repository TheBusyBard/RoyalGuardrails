// Royal Road Focus Mode - Popup Script

const KEYS = {
  hideRecentComments: 'rr_hideRecentComments',
  hideLatestComments: 'rr_hideLatestComments',
  hideRecentReviews: 'rr_hideRecentReviews',
  hideLatestReviews: 'rr_hideLatestReviews',
  hideNotifications: 'rr_hideNotifications',
};

const DEFAULTS = {
  rr_hideRecentComments: true,
  rr_hideLatestComments: true,
  rr_hideRecentReviews: true,
  rr_hideLatestReviews: true,
  rr_hideNotifications: true,
};

const statusEl = document.getElementById('status');

function showSaved() {
  statusEl.textContent = 'Saved! Reload page to apply.';
  statusEl.className = 'status saved';
  setTimeout(() => { statusEl.textContent = 'royalroad.com only'; statusEl.className = 'status'; }, 2500);
}

chrome.storage.local.get(Object.values(KEYS), (result) => {
  const settings = { ...DEFAULTS, ...result };
  document.getElementById('hideRecentComments').checked = settings.rr_hideRecentComments;
  document.getElementById('hideLatestComments').checked = settings.rr_hideLatestComments;
  document.getElementById('hideRecentReviews').checked = settings.rr_hideRecentReviews;
  document.getElementById('hideLatestReviews').checked = settings.rr_hideLatestReviews;
  document.getElementById('hideNotifications').checked = settings.rr_hideNotifications;
});

Object.entries(KEYS).forEach(([inputId, storageKey]) => {
  const checkbox = document.getElementById(inputId);
  checkbox.addEventListener('change', () => {
    chrome.storage.local.set({ [storageKey]: checkbox.checked }, showSaved);
  });
});