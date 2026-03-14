# Implementation Plan: Figma Bridge Chrome Extension

**Branch**: `001-chrome-extension-build` | **Date**: 2026-03-14 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-chrome-extension-build/spec.md`

## Summary

Build a Chrome Extension (Manifest V3) that directly loads two existing JavaScript helper libraries (`figma-bridge.js` and `figma-status.js`) as content scripts in the `MAIN` world on `figma.com` pages. No build step, no loader, no polling — the manifest references the source scripts directly.

## Technical Context

**Language/Version**: JavaScript (ES2020+, no transpilation needed — Chrome extension environment)
**Primary Dependencies**: None (vanilla JS, Chrome Extension Manifest V3 APIs only)
**Storage**: N/A
**Testing**: Manual verification via Chrome DevTools console (no automated test framework)
**Target Platform**: Chrome/Chromium browsers with Manifest V3 support
**Project Type**: Chrome Extension (browser extension)
**Performance Goals**: Immediate availability — scripts load at `document_idle`
**Constraints**: Zero permissions beyond content script URL matching; MAIN world execution context required
**Scale/Scope**: Single-user local extension, 2 source scripts (~900 lines total), 1 manifest file, 3 icons

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Simplicity First | ✅ PASS | No build step, no loader, no polling, no bundler. Scripts loaded directly by Chrome. Simplest possible approach. |
| II. Consistency | ✅ PASS | Vanilla JS matches the existing source scripts. No new dependencies introduced. |
| III. Maintainability | ✅ PASS | Only 3 files to maintain: manifest.json + 2 source scripts. No intermediate build artifacts. |
| IV. Scalability | ✅ PASS | N/A for a local browser extension. |
| V. Best Practices | ✅ PASS | Standard Chrome Extension Manifest V3 content script loading. |
| VI. Clean Architecture | ✅ PASS | Manifest declares scripts directly — no abstraction layers. |
| VII. Quality First | ✅ PASS | No dead code. No build artifacts to get out of sync. |

**Gate result**: ALL PASS — proceed to implementation.

## Project Structure

### Documentation (this feature)

```text
specs/001-chrome-extension-build/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
figma-bridge.js          # Figma API helpers (sets window.__figb)
figma-status.js          # Status panel (sets window.__figs)
manifest.json            # Manifest V3 config — loads scripts directly
icons/
├── icon-16.png          # Extension icon 16x16
├── icon-48.png          # Extension icon 48x48
└── icon-128.png         # Extension icon 128x128
```

**Structure Decision**: Minimal flat layout. The manifest references the two source scripts directly as content scripts. No `src/` directory, no build script, no intermediate artifacts.

## Complexity Tracking

> No violations. The design is minimal by nature — even simpler than initial plan after removing the unnecessary build system.
