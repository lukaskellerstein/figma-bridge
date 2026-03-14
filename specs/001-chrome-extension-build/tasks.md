# Tasks: Figma Bridge Chrome Extension

**Input**: Design documents from `/specs/001-chrome-extension-build/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: No automated tests requested. Manual verification via Chrome DevTools console per quickstart.md.

**Organization**: Simple flat structure — only one user story after simplification.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1)
- Include exact file paths in descriptions

## Path Conventions

- **Chrome extension**: flat layout at repository root
- **Source scripts**: `figma-bridge.js`, `figma-status.js` at root

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create extension manifest and icons

- [x] T001 Create `icons/` directory for extension icons
- [x] T002 [P] Create `manifest.json` with Manifest V3 config, content scripts `["figma-bridge.js", "figma-status.js"]`, matching `https://www.figma.com/*`, `"world": "MAIN"`, `"run_at": "document_idle"` in `manifest.json`
- [x] T003 [P] Generate `icons/icon-16.png` — 16x16 PNG extension icon
- [x] T004 [P] Generate `icons/icon-48.png` — 48x48 PNG extension icon
- [x] T005 [P] Generate `icons/icon-128.png` — 128x128 PNG extension icon

**Checkpoint**: Extension is ready to load in Chrome — no build step needed

---

## Phase 2: User Story 1 - Automatic Helper Injection (Priority: P1) 🎯 MVP

**Goal**: `window.__figb` and `window.__figs` available on all `figma.com` pages via direct content script loading

**Independent Test**: Install extension, navigate to any Figma page, verify `typeof window.__figb === 'object'` and `typeof window.__figs === 'object'` in DevTools console

### Implementation for User Story 1

No implementation tasks needed — the source scripts (`figma-bridge.js` and `figma-status.js`) already exist in the repository. The manifest references them directly as content scripts. Chrome handles loading and execution.

**Checkpoint**: Extension fully functional. Load in Chrome and verify helpers are available.

---

## Phase 3: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and cleanup

- [x] T006 Create `.gitignore` with OS and editor file exclusions in `.gitignore`
- [ ] T007 Run quickstart.md validation — load extension in Chrome, follow all verification steps from `specs/001-chrome-extension-build/quickstart.md` (MANUAL — requires browser)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **User Story 1 (Phase 2)**: No implementation needed — scripts already exist
- **Polish (Phase 3)**: Depends on Phase 1

### Parallel Opportunities

- T002, T003, T004, T005 can all run in parallel (different files)

---

## Implementation Strategy

### Single-Step Delivery

1. Complete Phase 1: manifest + icons (T001-T005)
2. Load extension in Chrome — it works immediately
3. Validate per quickstart.md (T007)

No incremental delivery needed — the extension is complete after Phase 1.

---

## Notes

- No build step required — Chrome loads the source scripts directly
- No loader, polling, or SPA re-injection needed
- `figma-bridge.js` must be listed before `figma-status.js` in manifest (ordering dependency for `BRIDGE_VERSION`)
- Helper methods require the `figma` global to be available (user must open a Figma plugin first)
