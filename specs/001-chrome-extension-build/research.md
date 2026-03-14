# Research: Figma Bridge Chrome Extension

**Date**: 2026-03-14
**Branch**: `001-chrome-extension-build`

## R1: Content Script World Execution

**Decision**: Use `"world": "MAIN"` in the manifest's content_scripts configuration.

**Rationale**: Chrome Extension content scripts run in an isolated world by default, meaning `window` globals set by the content script are invisible to the page and to CDP `browser_evaluate`. Setting `"world": "MAIN"` places the content script in the page's own execution context, making `window.__figb` and `window.__figs` directly accessible to Playwright MCP's `browser_evaluate` calls.

**Alternatives considered**:
- Isolated world + `window.postMessage` bridge: Rejected — adds complexity, requires listener on page side, and CDP `browser_evaluate` still can't see isolated world globals.
- `chrome.scripting.executeScript` from background: Rejected — requires `scripting` permission and `activeTab`, adds unnecessary permission surface.

## R2: Direct Script Loading vs. Build System

**Decision**: Load source scripts directly via manifest `content_scripts.js` array — no loader, no build step, no polling.

**Rationale**: The source scripts define objects on `window` (`window.__figb`, `window.__figs`). The methods *reference* the `figma` global but don't *call* it at definition time, so they can be safely loaded before `figma` exists. The `figma-status.js` auto-init block checks `typeof figma !== 'undefined'` and safely no-ops when `figma` isn't available. `window` globals persist across SPA navigations, and `figma.currentPage` auto-updates to the new file context. Therefore, no polling, SPA re-injection, or build concatenation is needed.

**Alternatives considered**:
- IIFE loader with polling + SPA MutationObserver + build.sh concatenation: Rejected — unnecessary complexity. The source scripts work correctly when loaded directly. Polling was only needed for a console log, SPA re-injection was unnecessary (globals persist), and the build system existed only to wrap scripts in the loader.
- Single bundled `content.js`: Rejected — adds a build step and intermediate artifact that can get out of sync with source scripts.

## R3: Script Loading Order

**Decision**: List `figma-bridge.js` before `figma-status.js` in the manifest `js` array.

**Rationale**: `figma-status.js` references `BRIDGE_VERSION`, a constant defined in `figma-bridge.js`. Chrome executes content scripts in the order listed, so this ordering ensures the dependency is satisfied.

## R4: Extension Icons

**Decision**: Generate PNG icons (16x16, 48x48, 128x128) featuring the Figma logo with a bridge/connector symbol.

**Rationale**: Chrome extensions require icons in these three sizes. The icon design communicates the extension's purpose (bridging Figma with automation tools).
