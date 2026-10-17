# Continuous Deployment with Staging and Production Gates

This repository includes a GitHub Actions Continuous Deployment pipeline (`.github/workflows/cd.yml`).

## Deployment Pipeline Overview

1. **Staging Deployment (`staging` job):**
   - Triggered automatically on push to `main`.
   - Uses `staging` GitHub Environment.
   - Secure deployment using encrypted secrets.
   - Performs post-deployment health check verification.
   - Automatically executes rollback on health check failure.

2. **Production Deployment (`production` job):**
   - Depends on successful completion of `staging` deployment.
   - Target environment `production` protected by GitHub Actions environment approval gates (requiring maintainer approval sign-off).
   - Secure deployment using encrypted secrets.
   - Performs post-deployment health check verification.
   - Automatically executes rollback on health check failure.

## Developer Setup & Git Hooks

Custom native pre-commit git hooks are included in `.githooks/` to ensure syntax verification and prevent committing code with unresolved merge conflicts.

To set up git hooks after cloning the repository, run:

```sh
git config core.hooksPath .githooks
```

Or execute the onboarding script:

```sh
./.githooks/setup.sh
```
