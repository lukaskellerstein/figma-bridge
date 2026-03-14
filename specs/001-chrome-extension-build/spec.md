# Feature Specification: Figma Bridge Chrome Extension

**Feature Branch**: `001-chrome-extension-build`
**Created**: 2026-03-14
**Status**: Draft
**Input**: User description: "Build a Chrome Extension (Manifest V3) called Figma Bridge that automatically injects two JavaScript helper libraries into Figma design pages, eliminating manual script injection when using Claude Code's Figma automation plugin."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Automatic Helper Injection on Figma Pages (Priority: P1)

As a developer using Claude Code's Figma automation, I want the Figma Bridge helper libraries (`window.__figb` and `window.__figs`) to be automatically available on any Figma page, so that I never need to manually inject scripts before running automation commands.

**Why this priority**: This is the core value proposition — without automatic injection, the extension has no purpose. It directly eliminates the ~2-minute, ~6000-token manual injection step every time automation is used.

**Independent Test**: Install the extension, navigate to a Figma page, open DevTools console, and verify `window.__figb` and `window.__figs` are available as objects.

**Acceptance Scenarios**:

1. **Given** the extension is installed and the user navigates to any `figma.com` page, **When** the page finishes loading, **Then** `window.__figb` is an object with Figma helper functions and `window.__figs` is an object with status panel functions.
2. **Given** the helpers are loaded, **When** the user calls helper methods (e.g., `__figb.frame(...)`) after a Figma plugin has been activated, **Then** the methods execute correctly using the `figma` global.
3. **Given** the extension is installed, **When** the user navigates between Figma files via SPA navigation, **Then** `window.__figb` and `window.__figs` remain available because they persist on `window` and reference `figma.currentPage` which auto-updates.

---

### Edge Cases

- What happens when helper methods are called before the `figma` global is available (no plugin opened)? The methods will throw an error referencing `figma` — this is expected and the caller's responsibility to ensure a plugin has been activated first.
- What happens if the `figma-status.js` auto-init block runs when `figma` is not available? It safely no-ops because it checks `typeof figma !== 'undefined'` before calling `__figs.init()`.
- What happens on SPA navigations? The `window` globals persist. Helper methods reference `figma.currentPage` which auto-updates to the current file context.
- What happens on non-design pages (dashboard, settings)? The globals are still set on `window` but are harmlessly unused — no side effects.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Extension MUST inject `window.__figb` (Figma API helper functions) into the page's main JavaScript execution context on `figma.com` pages.
- **FR-002**: Extension MUST inject `window.__figs` (status panel functions) into the page's main JavaScript execution context on `figma.com` pages.
- **FR-003**: Extension MUST run its content scripts in the `MAIN` world so that injected globals are accessible via Chrome DevTools Protocol `browser_evaluate` calls.
- **FR-004**: Extension MUST load `figma-bridge.js` before `figma-status.js` (ordering dependency: `BRIDGE_VERSION` constant).
- **FR-005**: Extension MUST use Chrome Extension Manifest V3.
- **FR-006**: Extension MUST NOT require any special browser permissions beyond the content script URL match pattern.
- **FR-007**: Extension MUST load the source scripts directly without a build step — no bundling, concatenation, or transformation.

### Key Entities

- **Helper Library (`window.__figb`)**: A collection of Figma Plugin API wrapper functions for frame creation, text, images, styles, and verification. Set on the global `window` object.
- **Status Panel (`window.__figs`)**: A visual status panel rendered as Figma canvas elements, with an `init()` method for explicit activation. Set on the global `window` object.
- **Manifest (`manifest.json`)**: Chrome Extension Manifest V3 configuration specifying content script loading rules, URL patterns, and extension metadata.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Helper libraries are available in the browser console immediately after page load — zero delay.
- **SC-002**: Zero manual steps required to make helpers available — user only needs to have the extension installed.
- **SC-003**: Helpers remain available across SPA file navigation without re-injection.
- **SC-004**: No build step required — the extension is ready to load directly from the repository.
- **SC-005**: Extension requires zero additional browser permissions beyond the default content script URL matching.
- **SC-006**: Elimination of the ~6000-token manual script injection step, reducing automation setup from ~2 minutes to zero user effort.

### Assumptions

- The user has Chrome (or a Chromium-based browser) that supports Manifest V3 extensions.
- The user knows how to load an unpacked Chrome extension via developer mode.
- The source scripts (`figma-bridge.js` and `figma-status.js`) are correct and functional.
- The `figma` global becomes available after opening any Figma plugin at least once in a given file. Helper methods will only work after this.
