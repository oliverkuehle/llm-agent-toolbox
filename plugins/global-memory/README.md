# global-memory

One memory file shared across all projects: `~/.claude/global-memory/MEMORY.md`
(override with `CLAUDE_GLOBAL_MEMORY_FILE`). A SessionStart hook loads it into every
session, along with the rules for adding to it.

Sections:

- `## User`: who you are
- `## Feedback`: how you want Claude to work
- `## Environment`: facts about this machine

## Permissions

To let Claude read and edit the file without asking, add this to `~/.claude/settings.json`:

```json
{
  "permissions": {
    "allow": [
      "Read(~/.claude/global-memory/MEMORY.md)",
      "Edit(~/.claude/global-memory/MEMORY.md)"
    ]
  }
}
```
