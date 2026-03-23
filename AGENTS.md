# AGENTS.md

Notes for AI agents and developers working on this repo.

## Toolchain

### Ruby

Ruby is managed via **[Hermit](https://github.com/cashapp/hermit)** — do NOT use rbenv, rvm, or asdf here.

The Ruby version is pinned in `bin/.ruby-X.Y.Z.pkg`. To check the current version:

```bash
ls bin/.ruby-*.pkg
```

To activate the Hermit environment (so `ruby`, `bundle`, etc. resolve correctly):

```bash
. bin/activate-hermit
```

### Updating Ruby

When Renovate bumps the Ruby version, it renames the `.pkg` file in `bin/` and updates CI workflows. If `bundle install` fails after a Ruby major version bump, check for gem compatibility issues in `Gemfile.lock` (e.g. gems with hardcoded upper-bound Ruby version constraints).

To regenerate the lockfile after a Ruby version bump:

```bash
. bin/activate-hermit
bundle lock --update
```

## CI

Workflows live in `.github/workflows/`:
- `ci.yml` — validates the build
- `deploy.yml` — deploys to production
