---
name: obsidian-parents
description: Find and suggest fitting `parents` (topic notes / MoCs, existing or not yet created) for one or more notes in an Obsidian vault, then apply them on approval. Use whenever you work with an Obsidian vault and need to set or check a note's parents, e.g. when creating or sorting a note, when the user asks for parents, topics or where a note belongs, or runs /obsidian-parents <note>.
---

# Suggest parents

Load the `obsidian-vault` skill first if it isn't already loaded; it defines the vault's structure. The rules that matter here: `parents` = topic, not origin (origin goes in `sources`); reuse existing topics instead of near-duplicates; never read or touch `private notes` unasked.

## Steps

1. **Refuse private notes.** If the target's `groups` contains `"[[private notes]]"`, stop and ask before reading it.
2. **Build the topic index:**
   ```sh
   obsidian eval code="const TARGET='Note Name'; $(cat <skill-dir>/scripts/topic_index.js)"
   ```
   `<skill-dir>` is this skill's base directory, shown when the skill is loaded. The script runs inside Obsidian on its metadata cache, so Obsidian must be running. Add `vault=<name>` if the vault isn't the active one. Use `TARGET=''` for the topic table only.
   It lists every topic used as a parent (child count, exists/unresolved, aliases, its own parents, sample children) plus the target's links and the parents its linked notes use. Private notes are excluded.
   Example output for `TARGET='Flexbox Froggy'`:
   ```
   # Topics (parent | children | status | aliases | its parents | sample children)
   Software Development | 27 | exists |  |  | Agile; Clean Code; Git Basics; Refactoring
   Design | 14 | exists | Gestaltung |  | Color Theory; Grid Systems; Typography Basics; > Less, but better.
   CSS | 3 | exists |  | Software Development | CSS Grid; Flexbox; Specificity
   User Research | 4 | UNRESOLVED |  |  | Card Sorting; Interviews; Personas; Usability Testing

   # Target: Flexbox Froggy
   groups: websites
   parents: Design
   aliases: 

   # Linked from target body: CSS Grid, Flexbox
   # Children of target: 
   # Parents used by linked notes: CSS (2)
   ```
   Here `CSS` is the obvious pick: both linked notes use it, and it is more specific than the current `Design`.
3. **Read the target note** to understand what it is actually about.
4. **Pick 1–3 parents**, in this order of preference:
   - An **existing** topic note (match by meaning, filename *and* aliases, in every language the vault uses).
   - An **unresolved** topic that other notes already use.
   - A **new** topic only if nothing fits. Name it like its likely siblings (match their language and style).
   Choose the **most specific** fitting level. Don't add both a topic and its ancestor. Use the topic's own parents column to see the tree.
5. **Flag duplicates** you notice along the way (e.g. `Philosophie` vs `Philosophy`, `Ethik` vs `Ethics`), but don't fix them unasked.

## Output

Present the suggestion as a list of changes, not just as a list of topics. Use a table in both cases.

**One note:** one numbered row per change, then the result:

```
Flexbox Froggy

| # | Action | Topic          | Status                               | Why                          |
| - | ------ | -------------- | ------------------------------------ | ---------------------------- |
| 1 | add    | CSS            | exists · 3 children                  | both linked notes use it     |
| 2 | add    | Web Games      | new · under Software Development     | no fitting topic yet         |
| 3 | remove | Design         | exists · 14 children                 | too broad, CSS covers it     |

→ parents: [[CSS]], [[Web Games]]
Apply all, some (e.g. "1, 3") or none?
```

- **Action:** `keep`, `add` or `remove`. List current parents that stay as `keep`.
- **Status:** `exists · N children`, `unresolved · N notes`, or `new · under Topic` (where the new topic would sit in the tree).
- **Why:** at most about 8 words, so the user can judge without opening the note.
- **`→` line:** the full resulting `parents`, which is what the user approves.

**Several notes:** one row per note, numbered by note:

```
| # | Note           | Now    | Suggested               | Why                       |
| - | -------------- | ------ | ----------------------- | ------------------------- |
| 1 | Flexbox Froggy | Design | CSS, Web Games (new)    | linked notes use CSS      |
| 2 | Omakase        | –      | Food, Japan             | Japanese restaurant style |
| 3 | > Less, but…   | –      | – (keep empty)          | quote without clear topic |

Apply all, some (e.g. "1, 3") or none?
```

Mark new topics in the Suggested column with `(new)`. Keep rows where nothing changes, so the user sees where you deliberately suggest nothing. `[]` is often the honest answer for quotes and people.

## Applying (only after approval)

Apply only the approved lines or notes. Edit the frontmatter directly, following the vault's formatting rules (multi-line list, quoted links, key order):

```yaml
parents:
  - "[[CSS]]"
  - "[[User Research]]"
```

Don't create topic notes for new or unresolved parents unless asked.
