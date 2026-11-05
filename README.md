# llm-agent-toolbox

My instructions, skills and prompts. For sharing and versioning purposes.

Currently this repo is setup as a [Claude Code plugin marketplace](https://code.claude.com/docs/en/plugin-marketplaces).

## Plugins

| Plugin              | Skills                               | For                                       |
| ------------------- | ------------------------------------ | ----------------------------------------- |
| `obsidian-personal` | `obsidian-vault`, `obsidian-parents` | My personal Obsidian vault                |
| `obsidian-work`     | `obsidian-vault`, `obsidian-parents` | My work Obsidian vault                    |
| `zotero`            | `zotero-cli`                         | My Zotero library                         |
| `global-memory`     | none (SessionStart hook)             | Memory shared across all projects         |
| `mattpocock-curated` | `wait-what`, `teach`, `grilling`, `chief-of-staff`, `code-review`, `implement-spec` | A selection of [Matt Pocock's skills](https://github.com/mattpocock/skills) (see its `CREDITS.md`) |

## Install

```
/plugin marketplace add https://git.oliverkuehle.de/oliverkuehle/llm-agent-toolbox.git
/plugin install <plugin>@llm-agent-toolbox
```

## Update

Installed plugins are copied into a cache. To make edits take effect immediately:

```
/plugin marketplace update llm-agent-toolbox
```

Bump `version` in the plugin's `.claude-plugin/plugin.json` when changing a plugin.

## Layout

```
.claude-plugin/marketplace.json     lists the plugins
plugins/<plugin>/
├── .claude-plugin/plugin.json      plugin manifest
└── skills/<skill>/
    ├── SKILL.md
    ├── *.md                        extra files loaded on demand (e.g. references.md)
    └── scripts/                    scripts the skill runs
```

## Contributing

`obsidian-parents` and its `topic_index.js` are identical in both Obsidian plugins. Change them in both. The script runs via `obsidian eval`, so Obsidian must be running.

## License

[MIT](LICENSE). Third-party skills keep their own license and credits, see each plugin's `CREDITS.md`.