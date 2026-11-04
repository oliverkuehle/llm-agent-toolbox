---
name: obsidian-vault
description: Rules for working in Oliver's work-related Obsidian vault (~/Documents/Obsidian), which uses `groups` (type) and `parents` (topic) frontmatter links instead of folders and tags. Use before creating, editing, sorting, renaming or searching notes in this vault. Also use when the user writes "ob:" or "obsidian:" followed by terms: search the vault for each term and look for a note with that filename (`omakase` → `Omakase.md`).
---

# Work Obsidian vault

## Structure

- **No folders.** Every note sits in the vault root. Only `Templates/` and `Attachments/` are exceptions.
- **`groups` = type** of note, as links to a group hub: `"[[meetings]]"`, `"[[documentations]]"`.
- **`parents` = topic**, as links to topic notes (Maps of Content): `"[[User Experience]]"`, `"[[Scrum]]"`.
- Example: *Connect to Design System via GitLab artifactory* is a `documentations` note with parents `Design System` and `GitLab`.
- No `tags`. Connect notes with `[[wikilinks]]` in the body, using the shortest form (`[[Note Name]]`).

## Groups

Every note has at least one group, and can have several when it really is several kinds of thing. Use only these groups, and don't invent one without asking. **If unsure, leave `groups` empty**: the note then shows up in `Without a group.base` for the user to sort.

| Group               | What goes in it                                                                                            |
| ------------------- | ---------------------------------------------------------------------------------------------------------- |
| `notes`             | Default. Own notes: concepts, topic notes, cheat sheets, lists                                             |
| `documentations`    | How-tos, runbooks, setup guides, specifications, epic docs, spikes                                         |
| `writing`           | Own longer-form texts and essays                                                                           |
| `analytics`         | Data evaluations, survey results                                                                           |
| `meetings`          | 1:1s, jour fixes, annual talks, sprint ceremonies                                                          |
| `projects`          | Things I build or work on                                                                                  |
| `quotes`            | A single quote                                                                                             |
| `clippings`         | Pasted external content, **verbatim**: never summarised or commented                                       |
| `books`             | Books I've read or am reading                                                                              |
| `research papers`   | Academic papers                                                                                            |
| `websites`          | Websites, blogs and tools as a whole (not a single article)                                                |
| `videos`            | YouTube videos, talks                                                                                      |
| `movies`            | Films and documentaries                                                                                    |
| `series episodes`   | Single episodes of a series                                                                                |
| `podcast episodes`  | Single podcast episodes                                                                                    |
| `lectures`          | University courses, lectures, trainings, crash courses                                                     |
| `presentations`     | Talks and slide decks                                                                                      |
| `people`            | A person: public figures, friends, family, colleagues, contacts                                            |
| `locations`         | Places (cities, regions)                                                                                   |
| `private notes`     | Journal entries, private thoughts (often named `YYYY-MM-DD`), pay, HR, career talks. Off-limits, see Rules |
| `attention seekers` | Status group, alongside another group: notes I'm working on. Remove it when the work is done               |
| `groups`            | Only the group hub notes themselves                                                                        |

A note with my own summary or opinion of external material gets the group of the medium (`books`, `videos`, `websites`, …), not `clippings`. It can have both if the original text is kept.

## Parents

- Link to the **most specific** fitting topic, not to it and its ancestors as well. Topic notes can have parents themselves, so they form a tree.
- **Reuse existing topics.** Check filenames, `aliases` and what similar notes use, in German and English, before adding one. Avoid near-duplicates (`Accessibility` vs `Barrierefreiheit`). Put German terms in the topic note's `aliases`.
- Parents may not exist yet. That's fine. Don't create empty topic notes just to resolve a link.
- `parents` is about topic only. Where something came from goes in `sources`, and who took part goes in `attendees`.
- `[]` is fine when there is no obvious topic (common for quotes and people).
- To suggest parents, use the `obsidian-parents` skill.

## Properties

| Property    | Use                                                                           |
| ----------- | ----------------------------------------------------------------------------- |
| `aliases`   | Alternative names, abbreviations, translations (plain text)                   |
| `groups`    | Type                                                                          |
| `parents`   | Topic                                                                         |
| `attendees` | Meeting participants, as `"[[Link]]"` even if the person's note doesn't exist |
| `authors`   | Creator of a reference: plain name, or `"[[Link]]"` if a note exists          |
| `sources`   | URL and/or `"[[Link]]"` to where it came from                                 |
| `quote`     | Full quote text (quotes only)                                                 |
| `locations` | `"[[Link]]"` to where something was written or happened                       |
| `date`      | `YYYY-MM-DD`                                                                  |

- **Key order:** `aliases, groups, parents, attendees, authors, sources, quote, locations, date`, then any others alphabetically.
- **Lists** are multi-line YAML arrays with values sorted alphabetically. Links in frontmatter are quoted.
- There is no Linter plugin, so keep this by hand.
- **Templates:** are in `/Templates`.

```yaml
---
aliases:
  - Anmeldung mit Azure AD
groups:
  - "[[documentations]]"
parents:
  - "[[Azure AD]]"
---
```

## Conventions

- **People:** the filename is the full name, and nicknames go in `aliases`.
- **Quotes:** the filename is `> ` plus the quote text. The text also goes in `quote`, the speaker in `authors`, and the origin in `sources`.
- **Meetings:** always set `date`, and `attendees` if relevant.

## Rules

1. **Private notes are off-limits.** Find them by frontmatter only (`grep -l '"\[\[private notes\]\]"' *.md`) and exclude them before any vault-wide search or script. Don't read, summarise or edit them, and ask before any task that would touch them.
2. **Internal company material stays internal.** Don't put vault content into web searches, gists, artifacts, pastebins or other tools that send it outside, and never write credentials into notes.
3. **Ask before deleting, renaming or overwriting** content you didn't write in this session, unless the user asked for exactly that change.
4. **Rename and move only with the Obsidian CLI**, so links get updated. A plain `mv` breaks links.
5. Don't touch `.obsidian/` or `.trash/` files.

## Obsidian CLI

```sh
obsidian search query='"[[Topic]]"'                           # notes linking a topic
obsidian backlinks file="Topic"                               # children/mentions of a note
obsidian unresolved counts                                    # parents that don't exist yet
obsidian properties counts sort=count                         # properties in use
obsidian property:set name=groups value="[[notes]]" type=list file="Note"
obsidian base:query path="Without a group.base" format=paths  # ungrouped notes
obsidian create name="New Note" template="Default Template"
obsidian rename file="Old Name" name="New Name"               # keeps links intact
```
