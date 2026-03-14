# Data Model: Figma Bridge Chrome Extension

**Date**: 2026-03-14
**Branch**: `001-chrome-extension-build`

## Entities

This extension has no persistent data storage. All state is ephemeral
(in-memory, per page load). The entities below describe runtime state only.

### Window Globals

| Global | Type | Lifecycle | Description |
|--------|------|-----------|-------------|
| `window.__figb` | Object | Set at page load, persists across SPA navigation | Figma API helper functions (frame, text, image, style, verify) |
| `window.__figs` | Object | Set at page load, persists across SPA navigation | Status panel functions (init, agent, done, remove, info) |

### Manifest Configuration

| Field | Value | Purpose |
|-------|-------|---------|
| `manifest_version` | 3 | Chrome Extension Manifest V3 |
| `content_scripts[0].matches` | `["https://www.figma.com/*"]` | URL pattern for content script injection |
| `content_scripts[0].js` | `["figma-bridge.js", "figma-status.js"]` | Source scripts loaded directly in order |
| `content_scripts[0].world` | `"MAIN"` | Execute in page's main JS context |
| `content_scripts[0].run_at` | `"document_idle"` | Run after page DOM is ready |

## State Transitions

```
Page Load (any figma.com URL)
  └─> Scripts loaded by Chrome at document_idle
       └─> window.__figb and window.__figs available
            └─> User opens Figma plugin → figma global appears
                 └─> Helper methods now functional

SPA Navigation (file switch)
  └─> window.__figb and window.__figs persist
       └─> figma.currentPage auto-updates to new file
            └─> Helper methods work on new file context
```

## Relationships

- `window.__figs` depends on `window.__figb` being loaded first (references `BRIDGE_VERSION` from figma-bridge.js). Guaranteed by manifest script ordering.
- Helper methods depend on the `figma` global being available at call time (Figma plugin runtime active).
