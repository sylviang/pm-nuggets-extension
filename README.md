# Nuggets of Wisdom

A Chrome extension that helps product managers learn one bite-sized concept per new tab. Each nugget covers PM frameworks, mental models, metrics, strategy, and more.

## Features

- **Random nugget on every new tab** — never the same one twice in a row
- **85+ nuggets** across 20+ categories (metrics, strategy, discovery, prioritisation, etc.)
- **Favourites** — star nuggets to revisit later
- **Search and filter** — find nuggets by title or category
- **Dark/light mode** — follows your system preference

## Install locally (for development)

1. Clone the repo:
   ```bash
   git clone https://github.com/sylviang/pm-nuggets-extension.git
   ```
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top-right)
4. Click **Load unpacked** and select the project folder
5. Open a new tab to see it in action

## Project structure

```
├── manifest.json          # Chrome extension config (Manifest V3)
├── newtab.html            # New tab override page
├── script.js              # Random nugget loader
├── all.html / all.js      # All nuggets browse page
├── favourites.html / favourites.js  # Favourites page
├── style.css              # Styles (dark/light theme)
├── data/index.json        # Nugget registry (id, category, title, file)
├── nuggets/               # Markdown content by category
└── images/                # Nugget illustrations
```

## Adding a new nugget

1. Create a markdown file in `nuggets/<category>/<slug>.md`
2. Add an entry to `data/index.json` (keep alphabetical order within category):
   ```json
   {
     "id": "your-slug",
     "category": "category-name",
     "title": "Your Nugget Title",
     "file": "nuggets/category-name/your-slug.md"
   }
   ```
3. Optionally add an image to `images/` and reference it in the markdown

## Publishing to the Chrome Web Store

### Prerequisites

- A [Google Developer account](https://chrome.google.com/webstore/devconsole/) ($5 one-time registration fee)
- The extension packaged as a `.zip` file

### Step 1: Prepare assets

You'll need:
- **Extension icon**: 128x128 px (already at `images/icon128.png`)
- **Store icon**: 128x128 px PNG
- **Screenshots**: at least 1, recommended 3-5 (1280x800 or 640x400)
- **Promotional images** (optional): small tile 440x280

### Step 2: Create the zip

Zip the extension files (exclude `.git`, `README.md`, and any dev-only files):

```bash
zip -r pm-nuggets-extension.zip . \
  -x ".git/*" \
  -x ".gitignore" \
  -x "README.md" \
  -x ".claude/*" \
  -x "*.zip" \
  -x "*.DS_Store"
```

### Step 3: Upload to Chrome Web Store

1. Go to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
2. Click **New Item**
3. Upload your `.zip` file
4. Fill in the store listing:
   - **Name**: Nuggets of Wisdom
   - **Summary**: Become a better product manager by learning one bite-sized concept, one tab at a time.
   - **Description**: Add a longer description of the categories and value
   - **Category**: Education
   - **Language**: English
5. Upload screenshots and promotional images
6. Set **visibility** (Public, Unlisted, or Private)

### Step 4: Privacy and permissions

- Under **Privacy practices**, declare:
  - **Single purpose**: Displays product management learning content on new tabs
  - **Permissions justification**: `chrome_url_overrides` is used to replace the new tab page
  - **Data use**: No user data is collected or transmitted (favourites are stored locally via localStorage)
- No remote code is loaded
- No host permissions required

### Step 5: Submit for review

1. Click **Submit for Review**
2. Google reviews typically take 1-3 business days
3. You'll receive an email when approved (or if changes are requested)

### Updating the extension

1. Increment the `version` in `manifest.json`
2. Create a new `.zip`
3. Go to Developer Dashboard > your extension > **Package** > **Upload new package**
4. Submit for review

## License

MIT
