<div align="center">
  <img src="https://raw.githubusercontent.com/Zainul342/AI-Context-Pro/main/agent-init/resources/icon.png" width="120" alt="Agent Init Logo">
  <h1 style="margin: 0.4em 0 0.2em; font-weight: 800; letter-spacing: -0.05em;">AI Context Pro: Agent Init</h1>
  <p style="color: #a1a1aa; font-size: 1.1rem; max-width: 550px; margin: 0 auto 1.5rem; line-height: 1.6;">
    The "I'm tired of copy-pasting .cursorrules" solution. Standardize your AI coding environment in seconds.
  </p>

  <p>
    <img src="https://img.shields.io/badge/version-1.0.2-blue?style=flat-square" alt="Version">
    <img src="https://img.shields.io/badge/license-MIT-slate?style=flat-square" alt="License">
    <img src="https://img.shields.io/badge/VS%20Code-Extension-blueviolet?style=flat-square" alt="VS Code">
  </p>
</div>

<hr style="border: 0; height: 1px; background: linear-gradient(to right, transparent, #4b5563, transparent); margin: 2.5rem 0;">

## 🌪 Why? (The Mess)

If you're like me, you probably have a folder somewhere full of markdown files (`.cursorrules`, specific prompts, etc.) that you manually copy-paste into every new projected. And then 2 weeks later, you realize you're using an outdated version of your own rules.

**Agent Init** fixes this. One command and your workspace is standardized with the latest AI context protocols. No more hallucinations because you forgot to tell the agent about your "I/O Isolation" rule.

## ✨ Features

- **🚀 Instant Scaffolding**: Dumps a complete `.agent/` directory with standardized Rules, Workflows, and Skills.
- **🔄 GitHub Sync**: Pulls the *absolute latest* rules from the central repo. No more stale configs.
- **🛡️ Drift Detection**: Watches your `.agent` files. If they get weird or deleted, it warns you.
- **🔧 Self-Repair**: Accidentally deleted a core rule? `Repair Standards` brings it back.
- **📦 Offline Fallback**: Internet down? It uses a bundled "best-effort" version so you're never stuck.
- **🤖 Cursor & Windsurf Ready**: Automatically manages `.cursorrules` to point to the right context.

## 🕹 Usage

You can use this either via the VS Code Command Palette or the CLI.

### Extension Commands
Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and type:

- **`Agent Init: Initialize Standards`**
  Restores/Creates the full `.agent` structure and `.cursorrules`. Best for new projects.

- **`Agent Init: Check Status`**
  Verifies if your current rules match the latest standards.

- **`Agent Init: Repair Standards`**
  Fixes missing or corrupted files without blowing away your custom work if possible.

### CLI Way
If you prefer the terminal:
```bash
npx acp install
```

## ⚙️ Configuration

You can tweak how aggressive the agent is in your `.vscode/settings.json`:

| Setting | Default | Description |
| :--- | :--- | :--- |
| `agentInit.autoInit` | `false` | Automatically initialize standards on new projects without asking. |
| `agentInit.checkOnStartup` | `true` | Check if standards are valid every time you open a folder. |
| `agentInit.watchForDrift` | `false` | Actively monitor `.agent/` files for changes and scream if they break. |

## 📂 Structure Created

```text
.
├── .agent/
│   ├── rules/          # The "Constitution" (coding standards, security mandates)
│   ├── workflows/      # Standard operating procedures (e.g., "how to debug")
│   └── skills/         # Specialized capabilities (e.g., "frontend-design")
└── .cursorrules        # The bridge that connects your AI to these rules
```

## 🤝 Contributing

Found a better rule? Open a PR. This is a living standard.

- [Contribution Guide](../docs/CONTRIBUTING.md)
- [Technical Docs](../docs/)
- [Repository](https://github.com/Zainul342/AI-Context-Pro)

---
<div align="center">
  <p style="font-size: 0.9em; color: #888;">
    Made with ❤️ by <a href="https://github.com/Zainul342">Zainul Mutaqin</a>. 
    <br>
    <i>"Standardization is the liberator that relegates the problems that have already been solved to the field of routine."</i>
  </p>
</div>
