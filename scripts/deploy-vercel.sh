#!/usr/bin/env bash
set -euo pipefail

export PATH="/Users/jessicaerickson/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/Users/jessicaerickson/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin:$PATH"

pnpm dlx vercel
