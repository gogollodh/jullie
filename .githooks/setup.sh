#!/bin/sh
# Setup script to configure custom git hooks path

set -e

git config core.hooksPath .githooks
echo "Successfully configured git core.hooksPath to .githooks"
