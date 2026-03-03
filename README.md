# Royal GuardRails 🛡️

> A Chrome extension that hides comments, reviews, and notifications on [Royal Road](https://royalroad.com) — so you can open your dashboard and actually write.

![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-available-brightgreen?logo=google-chrome&logoColor=white)
![Manifest Version](https://img.shields.io/badge/Manifest-v3-blue)
![License](https://img.shields.io/badge/license-MIT-purple)

---

## Why?

Royal Road is great for sharing your fiction — but every time you open your dashboard you're greeted with a wall of comments, review scores, and notification badges. It's hard not to read them, and once you do, the writing session is over.

Royal GuardRails lets you toggle all of that off with one click, so you can check your stats, update your chapters, and get out without the distraction spiral.

---

## Features

- 🙈 **Hide Recent Comments** — author dashboard card
- 🙈 **Hide Latest Comments** — fiction page card
- ⭐ **Hide Recent Reviews** — author dashboard card
- ⭐ **Hide Latest Reviews** — fiction page card
- 🔔 **Hide Notification Badges** — the red count bubbles in the navbar and author page

All toggles default to **on** (hidden). Everything is saved per-browser with `chrome.storage` — no account, no server, no data collection.

---

## Screenshots

> _Coming soon_

---

## Installation

### From the Chrome Web Store _(recommended)_

Search for **Royal GuardRails** by **TheBusyBard**, or use the direct link once the listing is live.

### Manual / Developer Install

1. Clone or download this repo
   ```bash
   git clone https://github.com/TheBusyBard/royal-guardrails.git
   ```
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer Mode** (toggle in the top-right corner)
4. Click **Load unpacked** and select the `rr-extension` folder
5. The Royal GuardRails icon will appear in your toolbar

---

## Usage

1. Navigate to any page on [royalroad.com](https://royalroad.com)
2. Click the **Royal GuardRails** icon in your Chrome toolbar
3. Toggle whichever sections you want to hide
4. Reload the page — your preferences are saved automatically

---

## Project Structure

```
rr-extension/
├── manifest.json      # Extension config (Manifest V3)
├── content.js         # Injected script — applies hide flags to the page
├── hide.css           # CSS rules driven by HTML class flags
├── popup.html         # Toolbar popup UI
├── popup.js           # Saves/loads toggle state via chrome.storage
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## How It Works

Rather than polling the DOM on a timer, Royal GuardRails uses two complementary approaches:

**CSS class flags** — `content.js` adds classes like `rrf-hide-notifications` to the `<html>` element at `document_start` (before the page renders). `hide.css` uses those classes to immediately hide matching elements with `display: none !important`.

**MutationObserver** — for cards that Royal Road renders dynamically via JavaScript, a `MutationObserver` watches for new nodes and hides any matching card labels (e.g. "Recent Comments", "Latest Reviews") as they appear.

This means no flicker — elements are hidden before they're ever visible.

---

## Contributing

Contributions are welcome! Royal Road occasionally updates their HTML structure, so selectors may need updating over time.

1. Fork the repo
2. Create a feature branch (`git checkout -b fix/selector-update`)
3. Commit your changes (`git commit -m 'fix: update comment card selector'`)
4. Push and open a Pull Request

If a selector breaks after a Royal Road update, please open an issue with the page URL and the new HTML structure if you can find it.

---

## License

MIT — do whatever you like with it. See [LICENSE](LICENSE) for details.

---

Made by [TheBusyBard](https://github.com/TheBusyBard) — a writer who kept reading their reviews when they should have been writing.
