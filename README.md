# Web Wizard Studio v4.0 — Focused Workspace Patch

A non-destructive update for the existing `juliemarlina-collab/webwizardstudio` repository (v3.3.1). The original site remains intact.

## Install
1. Upload `studio-v4.css` and `studio-v4.js` to the repository root.
2. In `index.html`, immediately BEFORE `</head>` add:
   `<link rel="stylesheet" href="studio-v4.css">`
3. In `index.html`, immediately BEFORE `</body>` add:
   `<script src="studio-v4.js"></script>`
   IMPORTANT: this script must load **after** `script.js`, `enhancement.js`, `interface-i18n.js`, and `studio-fix.js`. Move `studio-fix.js` inside the body if needed.
4. Commit and deploy. Force-refresh the website.

## What changes
- Five icon buttons replace the large always-visible settings blocks.
- Only the selected group opens; tap again to close.
- Live Canvas stays directly under the compact toolbar.
- Gallery icon mapping is repaired by the actual card order.
- Project settings are saved locally and restored when returning.
- Existing device preview and standalone HTML export remain handled by the original scripts.

## Important limitations
- This is an integration patch, not a full rewrite of the generated website templates.
- Browser visual testing and deployment verification are pending.
- ZIP export, section-level editing, import/export JSON and complete BM/EN content remain future modules; do not describe them as implemented.
- Autosave is browser-local and not an account backup.

## Smoke tests
1. Open Studio, choose each of the five toolbar icons; verify only its panel opens.
2. Select a website type and style; verify the canvas updates.
3. Switch Desktop, Tablet, Mobile.
4. Edit title, refresh and verify local restore.
5. Check 12 gallery icons and browser console for missing assets.
6. Export standalone HTML and open it offline.
