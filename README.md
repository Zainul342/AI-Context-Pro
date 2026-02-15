<div align="center">
  <img src="https://raw.githubusercontent.com/Zainul342/AI-Context-Pro/main/agent-init/resources/icon.png" width="150" alt="AI Context Pro Logo">
  <h1 style="margin: 0.4em 0 0.2em; font-weight: 800; letter-spacing: -0.05em; font-size: 2.5rem;">AI Context Pro</h1>
  <p style="color: #a1a1aa; font-size: 1.2rem; max-width: 600px; margin: 0 auto 1.5rem; line-height: 1.6;">
    The missing standardization layer for AI-assisted development. Stop fighting context drift and start shipping code.
  </p>
  
  <p>
    <a href="https://www.npmjs.com/package/acp-method">
      <img src="https://img.shields.io/npm/v/acp-method?style=flat-square&color=blue&label=acp-method" alt="npm version">
    </a>
    <img src="https://img.shields.io/badge/license-MIT-slate?style=flat-square" alt="License">
    <img src="https://img.shields.io/badge/status-active-success?style=flat-square" alt="Status">
    <img src="https://img.shields.io/badge/built%20for-VS%20Code%20%7C%20Cursor%20%7C%20Windsurf-blueviolet?style=flat-square" alt="Platform">
  </p>
</div>

<hr style="border: 0; height: 1px; background: linear-gradient(to right, transparent, #4b5563, transparent); margin: 3rem 0;">

## 🚀 Quick Start (The Universal Method)

You don't need to install a VS Code extension to get started. Standardize any project immediately with a single command:

```bash
npx acp-method install
```

This command pulls the latest architectural standards, rules, and workflows from our central repository and structures them into your workspace's `.agent` directory.

> **Why use this?** Because copy-pasting `.cursorrules` manually in 2026 is a waste of your time.

---

## 📦 What's Inside?

### [Agent Init (CLI & Extension)](./agent-init/README.md)
The core toolset. Available as both a CLI tool (`acp-method`) and a VS Code extension. It manages the lifecycle of your AI context, ensuring your rules never go stale.

- **Instant Setup**: Generates standardized `.agent/` folders.
- **Drift Detection**: Warns you if your local rules deviate from standards.
- **Auto-Update**: Keeps your context in sync with the latest best practices.

### [Technical Documentation](./docs/)
Deep dives into the philosophy and architecture of the system.

- **[Product Requirements (PRD)](docs/PRD.md)** - The vision.
- **[System Architecture](docs/System_Architecture.md)** - The blueprint.
- **[Technical Specifications](docs/Technical_Specifications.md)** - The nuts and bolts.

---

## 🌪 The Problem

**"Context Rot"** is the silent killer of AI productivity.
You start a project with clear intentions. You tell the AI "we use TDD here." Two weeks later, the AI is generating untestable code because it forgot the initial prompt.

**AI Context Pro** fixes this by baking the context into the file system. It's not a prompt; it's a constitution.

## 🤝 Contributing

We welcome contributions! Whether it's a new rule for the standard library or a fix for the CLI tool.

1.  Fork the repo.
2.  Create your feature branch.
3.  Submit a Pull Request.

---

<div align="center">
  <p style="font-size: 0.9em; color: #888;">
    Made with ❤️ by <a href="https://github.com/Zainul342">Zainul Mutaqin</a>. 
    <br>
    <i>"Standardization is the liberator that relegates the problems that have already been solved to the field of routine."</i>
  </p>
</div>
