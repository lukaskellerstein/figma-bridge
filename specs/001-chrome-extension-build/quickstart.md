# Quickstart: Figma Bridge Chrome Extension

## Prerequisites

- Chrome or Chromium-based browser (version 110+ for Manifest V3 support)
- Developer mode enabled in `chrome://extensions`
- A Figma account with access to at least one design file

## Install

No build step required.

1. Open `chrome://extensions` in Chrome
2. Enable **Developer mode** (toggle in top-right)
3. Click **Load unpacked**
4. Select the repository root directory (the folder containing `manifest.json`)
5. The "Figma Bridge" extension should appear in the extensions list

## Verify

1. Navigate to any Figma design file (e.g., `https://www.figma.com/design/...`)
2. Open Chrome DevTools Console (`Ctrl+Shift+J` / `Cmd+Option+J`)
3. Verify helpers are available:
   ```javascript
   typeof window.__figb  // → 'object'
   typeof window.__figs  // → 'object'
   ```
4. Open any Figma plugin (e.g., the built-in "Iconify" or any plugin), then close it
   - This activates the `figma` global object needed by helper methods
5. Test a helper function:
   ```javascript
   __figb.frame('Test', { w: 200, h: 100, fill: __figb.hex('#3B82F6') })
   // → A blue frame should appear on the Figma canvas
   ```
6. Test the status panel:
   ```javascript
   await __figs.init()
   // → Status panel appears in the top-right of the viewport
   ```
7. Test the verify function:
   ```javascript
   __figb.verify()
   // → Returns a stats object with node counts and issues
   ```

## Test SPA Navigation

1. While on a Figma design file (with helpers verified), navigate to a different Figma design file
2. Verify `window.__figb` and `window.__figs` are still available
3. Open a Figma plugin in the new file, then test a helper — it should work on the new file's context

## Troubleshooting

- **Helper methods throw errors**: Make sure you opened a Figma plugin first. The `figma` global only exists after a plugin has been activated. The helper objects (`__figb`, `__figs`) are always available, but their methods need `figma` to work.
- **`typeof __figb` returns `undefined`**: Check `chrome://extensions` for errors. Verify the extension is enabled and the page is on `figma.com`.
