// Topic index for parent suggestions. Run inside Obsidian via the CLI:
//   obsidian eval code="const TARGET='Note Name'; $(cat topic_index.js)"
// TARGET is optional (use '' for the topic table only).
// Uses Obsidian's metadata cache: reads no note bodies. Notes in
// [[private notes]] are skipped entirely: never listed, never counted.
(() => {
  const mc = app.metadataCache;
  const target = typeof TARGET === "string" ? TARGET.replace(/\.md$/, "") : "";
  // "[[Name|alias]]" -> "Name"
  const links = (v) =>
    [].concat(v ?? [])
      .map((s) => String(s).replace(/^\[\[|\]\]$/g, "").split(/[|#]/)[0].trim())
      .filter(Boolean);

  const notes = {};
  for (const file of app.vault.getMarkdownFiles()) {
    if (file.parent?.path !== "/" || file.basename.includes("Conflicted copy")) continue;
    const fm = mc.getFileCache(file)?.frontmatter ?? {};
    const groups = links(fm.groups);
    if (groups.includes("private notes")) continue;
    notes[file.basename] = { file, groups, parents: links(fm.parents), aliases: [].concat(fm.aliases ?? []) };
  }

  const children = {};
  for (const [name, n] of Object.entries(notes))
    for (const p of n.parents) (children[p] ??= []).push(name);

  const out = ["# Topics (parent | children | status | aliases | its parents | sample children)"];
  const byCount = Object.keys(children).sort((a, b) => children[b].length - children[a].length || a.localeCompare(b));
  for (const topic of byCount) {
    const n = notes[topic];
    const kids = children[topic].sort((a, b) => a.startsWith("> ") - b.startsWith("> ") || a.localeCompare(b));
    const sample = kids.slice(0, 4).map((k) => (k.length > 40 ? k.slice(0, 37) + "…" : k)).join("; ");
    out.push([topic, kids.length, n ? "exists" : "UNRESOLVED", n?.aliases.join(", ") ?? "", n?.parents.join(", ") ?? "", sample].join(" | "));
  }

  if (target) {
    const t = notes[target];
    if (!t) {
      out.push(`\n# Target '${target}' not found (or it is a private note).`);
    } else {
      // Body links only (frontmatter links live in frontmatterLinks), resolved to notes.
      const linked = [...new Set((mc.getFileCache(t.file)?.links ?? [])
        .map((l) => mc.getFirstLinkpathDest(l.link.split("#")[0], t.file.path))
        .filter((f) => f?.extension === "md" && f.basename !== target && notes[f.basename])
        .map((f) => f.basename))].sort();
      const used = {};
      for (const name of linked) for (const p of notes[name].parents) used[p] = (used[p] ?? 0) + 1;
      out.push(
        `\n# Target: ${target}`,
        `groups: ${t.groups.join(", ")}`,
        `parents: ${t.parents.join(", ")}`,
        `aliases: ${t.aliases.join(", ")}`,
        `\n# Linked from target body: ${linked.join(", ")}`,
        `# Children of target: ${(children[target] ?? []).sort().join(", ")}`,
        `# Parents used by linked notes: ${Object.entries(used).sort((a, b) => b[1] - a[1]).map(([p, c]) => `${p} (${c})`).join(", ")}`,
      );
    }
  }
  return out.join("\n");
})()
