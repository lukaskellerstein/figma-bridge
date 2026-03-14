# Core Philosophy

Write code that is **simple, maintainable, and production-ready**. Prioritize clarity over cleverness, and always leave the codebase cleaner than you found it.

## Key Principles

1. **Simplicity First**: Choose the simplest solution that meets requirements (KISS principle)
2. **Consistency**: Maintain tech stack consistency unless there's strong justification for change
3. **Maintainability**: Prioritize code clarity and self-documentation over clever solutions
4. **Scalability**: Design for growth without premature optimization
5. **Best Practices**: Follow established patterns, idioms, and community conventions
6. **Clean Architecture**: Apply SOLID principles and maintain separation of concerns
7. **Quality First**: Continuous refactoring and cleanup are not optional

## Code Quality Standards

### SOLID Principles (Non-negotiable)

- **Single Responsibility**: Each class/function has exactly one reason to change
- **Open/Closed**: Open for extension, closed for modification
- **Liskov Substitution**: Subtypes must be substitutable for their base types
- **Interface Segregation**: Many specific interfaces beat one general-purpose interface
- **Dependency Inversion**: Depend on abstractions, not concrete implementations

### Clean Code Practices

**Code Organization:**

- Keep functions small (< 20 lines ideally, < 100 lines maximum)
- One level of abstraction per function
- Use meaningful, pronounceable names (avoid abbreviations unless widely known)
- Self-documenting code is the goal; comments explain "why", not "what"

**Code Quality:**

- **DRY Principle**: Don't Repeat Yourself - eliminate duplication through abstraction
- **YAGNI**: You Aren't Gonna Need It - don't add features speculatively
- Write code that's easy to delete, not easy to extend
- Prefer composition over inheritance

**Error Handling:**

- Fail fast and explicitly
- Use typed errors/exceptions with clear messages
- Never silently ignore errors
- Validate inputs at system boundaries

---

# Code Review Checklist

Before considering code complete, verify:

- [ ] All unused code removed (functions, variables, imports, comments)
- [ ] Comments updated to reflect current implementation
- [ ] No code duplication (DRY principle applied)
- [ ] Functions are small and focused (single responsibility)
- [ ] Error handling is explicit and comprehensive
- [ ] Type safety maintained (TypeScript/Python type hints)
- [ ] Tests written/updated and passing
- [ ] No hardcoded values (use configuration/environment variables)
- [ ] Security best practices followed (no secrets in code, input validation, etc.)
- [ ] Performance considered (no obvious bottlenecks)

---

# Communication Guidelines

**Code Explanations:**

- Focus on "why" decisions were made, not "what" the code does
- Highlight tradeoffs and alternatives considered
- Point out areas that may need future attention

## Anti-Patterns to Avoid

- No commented-out code "just in case"
- No TODO comments
- No copy-paste instead of abstracting
- No premature optimization
- No over-engineering simple solutions
- No ignoring compiler/linter warnings
- No writing code without understanding its purpose
- No implementing features "we might need someday"

## Remember

> "Code is read far more often than it is written." - Guido van Rossum

> "Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler

Write code you'd be proud to maintain in 2 years.

## Active Technologies
- JavaScript (ES2020+, no transpilation needed — Chrome extension environment) + None (vanilla JS, Chrome Extension Manifest V3 APIs only) (001-chrome-extension-build)

## Recent Changes
- 001-chrome-extension-build: Added JavaScript (ES2020+, no transpilation needed — Chrome extension environment) + None (vanilla JS, Chrome Extension Manifest V3 APIs only)
