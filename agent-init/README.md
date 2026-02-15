<div align="center">
  <img src="https://raw.githubusercontent.com/Zainul342/AI-Context-Pro/main/agent-init/resources/icon.png" width="120" alt="Agent Init Logo">
  <h1 style="margin: 0.4em 0 0.2em; font-weight: 800; letter-spacing: -0.05em;">AI Context Pro: Agent Init</h1>
  <p style="color: #a1a1aa; font-size: 1.1rem; max-width: 550px; margin: 0 auto 1.5rem; line-height: 1.6;">
    Standardize your AI coding environment in seconds.
  </p>
  <p>
    <img src="https://img.shields.io/badge/version-1.0.3-blue?style=flat-square" alt="Version">
    <img src="https://img.shields.io/badge/license-MIT-slate?style=flat-square" alt="License">
    <img src="https://img.shields.io/badge/VS%20Code-Extension-blueviolet?style=flat-square" alt="VS Code">
  </p>
</div>

<hr style="border: 0; height: 1px; background: linear-gradient(to right, transparent, #4b5563, transparent); margin: 2.5rem 0;">

## The Context Problem

The problem with modern AI coding isn't the intelligence of the model; it is the context it lacks. You start a new project, and the AI immediately forgets your architectural standards, testing protocols, and design principles. You find yourself copy-pasting the same instructions, over and over, hoping the AI respects them this time.

**Agent Init** solves this by enforcing a standardized context layer. It injects a comprehensive `.agent` directory into your project, defining the rules of engagement before you write a single line of code.

## The Universal Method

We believe in tools that work everywhere, not just inside a specific editor. The CLI tool is the fastest way to standardize any repository.

```bash
npx acp-method install
```

When you run this command, the system pulls the latest architectural standards from our central repository and structures them into your workspace. It handles network failures gracefully and ensures your environment is ready for high-level AI collaboration immediately.

> **Note**: This tool checks for the latest standards every time it runs, ensuring your project never drifts from the best practices.

## Core Capabilities

Agent Init is designed to be invisible when you don't need it and indispensable when you do.

**Instant Scaffolding**
The tool automatically generates the `.agent` directory structures for Rules, Workflows, and Skills. This isn't just a file dump; it is a structured knowledge base that your AI agent consumes to understand *how* you write code.

**Centralized Synchronization**
Your local rules are synchronized with the absolute latest standards. If a new security mandate is released or a testing protocol is updated, a single command brings your project to the bleeding edge.

**Resilience**
Built with offline fallback capabilities. Development doesn't stop just because the internet does. If the central repository is unreachable, the system automatically uses a bundled, high-quality backup of the standards.

**Editor Integration**
While the CLI works everywhere, we provide deep integration for VS Code. The extension manages `.cursorrules` to point directly to the generated context, creating a seamless bridge between your editor and the AI context.

## VS Code Extension

For those who prefer a GUI approach, the VS Code extension offers the same power accessible directly from the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).

**Initialize Standards**
Restores or creates the full `.agent` structure and `.cursorrules`. This is the recommended first step for any new project.

**Repair Standards**
Scans your existing configuration for missing or corrupted files. If it finds discrepancies, it repairs them without overwriting your custom modifications where possible.

## Configuration

You can customize the behavior of Agent Init through your `.vscode/settings.json`:

| Setting | Default | Description |
| :--- | :--- | :--- |
| `agentInit.autoInit` | `false` | Automatically initialize standards on new projects without asking. |
| `agentInit.checkOnStartup` | `true` | Check if standards are valid every time you open a folder. |
| `agentInit.watchForDrift` | `false` | Actively monitor the `.agent` directory for changes and warn on deletion. |

## Directory Structure

When properly initialized, your project will contain the following structure:

```text
.
├── .agent/
│   ├── rules/          # The Constitution: coding standards and mandates
│   ├── workflows/      # Standard Operating Procedures (e.g., debug flows)
│   └── skills/         # Specialized Capabilities (e.g., frontend design)
└── .cursorrules        # The bridge connecting AI to your rules
```

## Contributing

This standard is living and breathing. If you find a better way to structure code or a rule that needs refinement, open a Pull Request.

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
