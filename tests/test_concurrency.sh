#!/bin/sh
# Concurrency and Regression Test for .githooks/pre-commit

set -u

SCRIPT_DIR=$(cd "$(dirname "$0")/.." && pwd)
PRE_COMMIT_HOOK="${SCRIPT_DIR}/.githooks/pre-commit"

if [ ! -f "$PRE_COMMIT_HOOK" ]; then
    echo "Error: Pre-commit hook not found at $PRE_COMMIT_HOOK" >&2
    exit 1
fi

echo "=== 1. Testing Concurrency (Race Condition Regression) ==="

TMP_REPO=$(mktemp -d)
trap 'rm -rf "$TMP_REPO"' EXIT HUP INT TERM

cd "$TMP_REPO" || exit 1
git init -q
git config user.name "Test"
git config user.email "test@example.com"

# Create 20 valid JS test files and stage them
for i in $(seq 1 20); do
    cat <<EOF > "file_${i}.js"
// Valid JS file $i
const value_${i} = ${i};
console.log("File $i:", value_${i});
EOF
    git add "file_${i}.js"
done

# Extract pre-commit functions
eval "$(sed -n '/^log_error() {/,/^}/p' "$PRE_COMMIT_HOOK")"
eval "$(sed -n '/^check_file() {/,/^}/p' "$PRE_COMMIT_HOOK")"

# Execute 10 iterations of concurrent checks with isolated temp dirs
FAIL_COUNT=0
for iter in $(seq 1 10); do
    TMP_DIR=$(mktemp -d)
    TMP_ERR="${TMP_DIR}/errors.txt"
    export TMP_DIR TMP_ERR

    for i in $(seq 1 20); do
        check_file "file_${i}.js" &
    done
    wait

    if [ -s "$TMP_ERR" ]; then
        FAIL_COUNT=$((FAIL_COUNT + 1))
        echo "Iteration $iter produced errors:"
        cat "$TMP_ERR"
    fi

    # Check that temporary files inside TMP_DIR were cleaned up
    LEAKS=$(find "$TMP_DIR" -type f -name "check_*" | wc -l)
    if [ "$LEAKS" -ne 0 ]; then
        echo "Iteration $iter leaked $LEAKS temporary files."
        FAIL_COUNT=$((FAIL_COUNT + 1))
    fi

    rm -rf "$TMP_DIR"
done

if [ "$FAIL_COUNT" -gt 0 ]; then
    echo "FAIL: Concurrent execution failed ($FAIL_COUNT/10 iterations failed)"
    exit 1
fi

echo "PASS: Concurrent checks completed with 0 errors and 0 leaked temporary files across 10 iterations."

echo "=== 2. Testing Syntax Error & Conflict Marker Detection ==="

# Test merge conflict detection
cat <<EOF > "conflict.js"
const a = 1;
<<<<<<< HEAD
const b = 2;
=======
const b = 3;
>>>>>>> feature
EOF
git add "conflict.js"

TMP_DIR=$(mktemp -d)
TMP_ERR="${TMP_DIR}/errors.txt"
LOG_OUT="${TMP_DIR}/stderr.txt"

check_file "conflict.js" 2>"$LOG_OUT"
if grep -q "Contains unresolved merge conflict markers" "$LOG_OUT"; then
    echo "PASS: Correctly detected merge conflict markers."
else
    echo "FAIL: Failed to detect merge conflict markers."
    rm -rf "$TMP_DIR"
    exit 1
fi
rm -rf "$TMP_DIR"

# Test invalid syntax detection
cat <<EOF > "invalid.js"
const x = ; // Syntax error
EOF
git add "invalid.js"

TMP_DIR=$(mktemp -d)
TMP_ERR="${TMP_DIR}/errors.txt"
LOG_OUT="${TMP_DIR}/stderr.txt"

check_file "invalid.js" 2>"$LOG_OUT"
if grep -q "JavaScript syntax error detected" "$LOG_OUT"; then
    echo "PASS: Correctly detected JavaScript syntax error."
else
    echo "FAIL: Failed to detect JavaScript syntax error."
    rm -rf "$TMP_DIR"
    exit 1
fi
rm -rf "$TMP_DIR"

echo "=== 3. Verifying Deadlock Freedom & Hook Execution ==="

git rm -f "conflict.js" "invalid.js" >/dev/null 2>&1 || true

# Run hook executable directly
if "$PRE_COMMIT_HOOK"; then
    echo "PASS: Hook executed cleanly and exited 0 on valid staged files without hanging."
else
    echo "FAIL: Hook execution failed unexpectedly."
    exit 1
fi

echo "=== All Concurrency and Regression Tests PASSED ==="
