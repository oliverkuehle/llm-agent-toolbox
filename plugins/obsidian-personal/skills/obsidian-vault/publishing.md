# Publishing to oliverkuehle.de

The website is built from the vault. A builder container watches the vault and rebuilds the site a few seconds after any change. **Only notes with `published: true` leave the vault.** Every other note, and every attachment used only by those notes, stays private. Each published note becomes one page and one entry in the list on the homepage. **Never publish notes without explicit permission and confirmation**.

## Properties

| Property    | Type     | Effect                                                                                                                            |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `title`     | text     | **Required**, or the note isn't published. Page title (heading, browser tab, homepage list), and the URL if `slugs` is not set    |
| `slugs`     | list     | URL. Always a list. The first entry is the page (`about` → `/about`), further entries redirect to it. Default: the `title`       |
| `published` | checkbox | Must be exactly `true`.                                                                                                           |
| `ongoing`   | checkbox | Shows "Ongoing" instead of the date and sorts the note to the top of the list                                                     |
| `date`      | date     | Sort order (newest first) and the date shown. Always set it.                                                                      |

No other property reaches the site: `groups`, `parents`, `aliases`, `tags` etc. are ignored, and so is the file name.

**Key order:** the vault's usual keys (`aliases` … `date`, see SKILL.md), then `title`, `slugs`, `published`, `ongoing`, then any others alphabetically.

```yaml
---
groups:
  - "[[writing]]"
date: 2026-06-16
title: About me
slugs:
  - about
  - ueber-mich
published: true
---
```

## URLs and titles

- **The file name never reaches the site.** Renaming a note or restructuring the vault doesn't change its page or URL.
- **The URL is the first `slugs` entry, or else the `title`** (`Über X: Y` → `/ueber-x-y`). Once `slugs` is set, the title no longer affects the URL.
- **Without `slugs`, changing `title` changes the URL**, and old links then return 404. Before changing the title of a published note without `slugs`, add its current URL as `slugs`.
- Slugs are lowercased and cleaned automatically: umlauts become `ae`/`oe`/`ue`/`ss`, every run of other characters becomes `-`.
- `slugs: [about]` and `slugs: [now]` are linked from the homepage and aren't repeated in its list. `index` is reserved.

## Body

- Callouts, `[[links]]` and images work. `[[links]]` to published notes become links. For unpublished notes, only the visible text stays.
- `![[image.png]]` and `![alt](Attachments/image.png "Caption")` copy the image to the site. The second form shows the caption.
- `%%comments%%` and `<!-- comments -->` are removed.
- The site also supports `:::columns` / `:::wide` image blocks.

## Build errors

If a note's frontmatter is broken, it has no `title`, or `slugs` isn't a list, that note is skipped. An invalid `date` makes the whole build fail, and the site stays on the previous version.
