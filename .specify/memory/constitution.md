<!--
  Sync Impact Report
  ==================
  Version change: 0.0.0 → 1.0.0 (MAJOR — initial ratification)
  Modified principles: N/A (first version)
  Added sections:
    - 7 Core Principles (Simplicity, Consistency, Maintainability,
      Scalability, Best Practices, Clean Architecture, Quality First)
    - Code Quality Standards
    - Development Workflow
    - Governance
  Removed sections: N/A
  Templates requiring updates:
    - .specify/templates/plan-template.md ✅ no changes needed
      (Constitution Check section is generic, will be filled per-feature)
    - .specify/templates/spec-template.md ✅ no changes needed
      (spec structure is principle-agnostic)
    - .specify/templates/tasks-template.md ✅ no changes needed
      (task phases are generic, no principle-specific task types required)
  Follow-up TODOs: none
-->

# Figma Bridge Constitution

## Core Principles

### I. Simplicity First

Choose the simplest solution that meets requirements (KISS principle).
- Every design decision MUST favor the simplest viable approach.
- YAGNI: features MUST NOT be added speculatively.
- Write code that is easy to delete, not easy to extend.
- Premature optimization is prohibited; optimize only when
  measurements prove a bottleneck exists.

### II. Consistency

Maintain tech stack consistency unless there is strong justification
for change.
- New dependencies or patterns MUST be justified against existing
  project conventions.
- Naming, formatting, and file organization MUST follow established
  project patterns.
- Deviations MUST be documented with rationale.

### III. Maintainability

Prioritize code clarity and self-documentation over clever solutions.
- Functions MUST be small (< 20 lines ideally, < 100 lines maximum).
- One level of abstraction per function.
- Names MUST be meaningful and pronounceable; abbreviations are
  allowed only when widely known.
- Comments explain "why", not "what". Self-documenting code is
  the goal.

### IV. Scalability

Design for growth without premature optimization.
- Architecture MUST accommodate reasonable growth without rewrites.
- Performance goals MUST be defined before optimizing.
- Premature optimization MUST NOT compromise readability.

### V. Best Practices

Follow established patterns, idioms, and community conventions.
- Fail fast and explicitly.
- Use typed errors/exceptions with clear messages.
- Never silently ignore errors.
- Validate inputs at system boundaries.
- No hardcoded values — use configuration or environment variables.

### VI. Clean Architecture (SOLID — Non-Negotiable)

Apply SOLID principles and maintain separation of concerns.
- **Single Responsibility**: each class/function has exactly one
  reason to change.
- **Open/Closed**: open for extension, closed for modification.
- **Liskov Substitution**: subtypes MUST be substitutable for their
  base types.
- **Interface Segregation**: many specific interfaces over one
  general-purpose interface.
- **Dependency Inversion**: depend on abstractions, not concrete
  implementations.
- Prefer composition over inheritance.
- DRY: eliminate duplication through abstraction.

### VII. Quality First

Continuous refactoring and cleanup are not optional.
- All unused code (functions, variables, imports, comments) MUST
  be removed.
- No commented-out code "just in case".
- No TODO comments in committed code.
- No copy-paste instead of abstracting.
- No ignoring compiler/linter warnings.
- Security best practices MUST be followed (no secrets in code,
  input validation at boundaries).

## Code Quality Standards

Before considering code complete, the following MUST be verified:

- All unused code removed (functions, variables, imports, comments)
- Comments updated to reflect current implementation
- No code duplication (DRY principle applied)
- Functions are small and focused (single responsibility)
- Error handling is explicit and comprehensive
- Type safety maintained where applicable
- Tests written/updated and passing (when tests are in scope)
- No hardcoded values
- Security best practices followed
- Performance considered (no obvious bottlenecks)

## Development Workflow

- Code explanations MUST focus on "why" decisions were made, not
  "what" the code does.
- Highlight tradeoffs and alternatives considered.
- Point out areas that may need future attention.
- Never commit code without explicit user request (per project
  CLAUDE.md policy).

## Governance

This constitution supersedes all other development practices for
the Figma Bridge project.

- **Amendments**: any change to this constitution MUST be documented
  with version bump, rationale, and migration plan for affected code.
- **Versioning**: MAJOR.MINOR.PATCH semantic versioning.
  - MAJOR: principle removal or incompatible redefinition.
  - MINOR: new principle or materially expanded guidance.
  - PATCH: clarifications, typo fixes, non-semantic refinements.
- **Compliance**: all code contributions MUST be reviewed against
  these principles. Complexity beyond the simplest solution MUST
  be justified.
- **Runtime guidance**: see `CLAUDE.md` for agent-specific
  development guidance.

**Version**: 1.0.0 | **Ratified**: 2026-03-14 | **Last Amended**: 2026-03-14
