# Publishing to oliverkuehle.de

The website is built from the vault. A builder container watches the vault and rebuilds the site a few seconds after any change. **Only notes with `published: true` leave the vault.** Every other note, and every attachment used only by those notes, stays private. Each published note becomes one page and one entry in the list on the homepage. **Never publish notes without explicit permission and confirmation**.

## Properties

| Property    | Type     | Effect                                                                                                                                       |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `published` | checkbox | Must be exactly `true`.                                                                                                                      |
| `ongoing`   | checkbox | Shows "Ongoing" instead of the date and sorts the note to the top of the list                                                                |
| `date`      | date     | Sort order (newest first) and the date shown. Always set it.                                                                                 |
| `slugs`     | list     | URL. The first entry is the page (`about` → `/about`), further entries redirect to it. Default: the file name (`Über X` → `/ueber-x`)        |
| `title`     | text     | Page title (heading, browser tab, homepage list). Default: the file name                                                                     |

No other property reaches the site: `groups`, `parents`, `aliases`, `tags` etc. are ignored.

```yaml
---
groups:
  - "[[writing]]"
date: 2026-06-16
published: true
slugs:
  - about
  - ueber-mich
---
```

## URLs and titles

- **The file name is the page title** unless `title` is set. Renaming a note renames the page (if it has no `title`) and, without `slugs`, changes its URL, so old links then return 404. `title` never affects the URL.
- `slugs: about` and `slugs: now` are linked from the homepage and aren't repeated in its list. `index` is reserved. Slugs are lowercased and cleaned automatically.

## Body

- Callouts, `[[links]]` and images work. `[[links]]` to published notes become links. For unpublished notes, only the visible text stays.
- `![[image.png]]` and `![alt](Attachments/image.png "Caption")` copy the image to the site. The second form shows the caption.
- `%%comments%%` and `<!-- comments -->` are removed.
- The site also supports `:::columns` / `:::wide` image blocks.

## Build errors

If a note's frontmatter is broken, that note is skipped. An invalid `date` makes the whole build fail, and the site stays on the previous version.
