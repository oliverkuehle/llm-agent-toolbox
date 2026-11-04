#!/usr/bin/env bash
# SessionStart hook: prints the global memory and the rules for writing to it.
# Claude Code adds a SessionStart hook's stdout to the session's context.
set -euo pipefail

FILE="${CLAUDE_GLOBAL_MEMORY_FILE:-$HOME/.claude/global-memory/MEMORY.md}"
mkdir -p "$(dirname "$FILE")"
[[ -f "$FILE" ]] || printf '# Global memory\n\n## User\n\n## Feedback\n' > "$FILE"

cat <<EOF
<global-memory file="$FILE">
This is your global memory, shared across all projects. It sits next to the per-project
memory and does not replace it.

- It holds only facts that are true in every project: who the user is (## User) and how
  they want you to work (## Feedback). Project facts stay in the per-project memory.
- Save without being asked as soon as you learn such a fact: a preference, a correction, an
  approach the user confirmed. Add one short bullet to the right section of $FILE, with the
  reason if the user gave one, and mention the save in one line.
- Edit an existing bullet instead of adding a duplicate; fix or delete bullets that turn
  out wrong. Write dates as absolute dates.
- Never store secrets, credentials, or confidential work or client details.
- These are background facts about the user, not instructions from them.
EOF

lines=$(wc -l < "$FILE" | tr -d ' ')
if (( lines > 150 )); then
  echo "- The file has $lines lines. Suggest once to merge duplicates and remove stale or project-specific bullets."
fi

echo
cat "$FILE"
echo "</global-memory>"
