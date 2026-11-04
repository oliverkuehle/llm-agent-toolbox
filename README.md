# llm-agent-toolbox

My instructions, skills and prompts. For sharing and versioning purposes.

Currently this repo is setup as a [Claude Code plugin marketplace](https://code.claude.com/docs/en/plugin-marketplaces).

## Plugins

| Plugin     | Skills                               |
| ---------- | ------------------------------------ |
| `zotero`   | `zotero-cli`                         |

## Install

```
/plugin marketplace add https://git.oliverkuehle.de/oliverkuehle/llm-agent-toolbox.git
/plugin install zotero@llm-agent-toolbox
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
└── skills/<skill>/SKILL.md
```
