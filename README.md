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
  </p>
</div>

<hr style="border: 0; height: 1px; background: linear-gradient(to right, transparent, #4b5563, transparent); margin: 3rem 0;">

## The Context Problem

The bottleneck in modern AI coding isn't intelligence; it's context. You start a project with clear architectural intentions, but as the codebase grows, the AI forgets your standards. It starts hallucinating patterns, ignoring test protocols, and drifting from your original design. You find yourself constantly correcting the same mistakes, wasting time you should be spending on logic.

**AI Context Pro** solves this by baking your architectural constitution directly into the file system. It ensures that every project starts with a unified, standardized context layer that the AI respects from day one.

## The Solution

We have built a universal standard for AI context management. Whether you use VS Code, Cursor, or Windsurf, our tooling ensures your environment is always synchronized with the latest best practices.

### Quick Start

Standardize any repository instantly with our CLI tool. No plugins required.

```bash
npx acp-method install
```

This command pulls the latest `.agent` directory structure—containing Rules, Workflows, and Skills—directly into your workspace. It serves as the single source of truth for your AI, eliminating the need for manual configuration.

## Repository Architecture

This monorepo houses the complete ecosystem for the project.

**Agent Init (`packages/agent-init`)**
The core engine of the project. This package contains both the CLI tool (`acp-method`) and the VS Code Extension. It handles the logic for fetching, verifying, and repairing the `.agent` context directory.
[Explore Agent Init →](./agent-init/README.md)

**Documentation (`/docs`)**
The theoretical foundation of the system. Here we document the product requirements, system architecture, and the long-term vision for AI standardization.
[Read the Docs →](./docs/)

## Contributing

We are building a living standard for AI development. If you have improvements for the CLI, the extension, or the documentation, your contributions are welcome.

1.  Fork the repository.
2.  Create a feature branch.
3.  Submit a Pull Request.

---

<div align="center">
  <p style="font-size: 0.9em; color: #888;">
    Made with ❤️ by <a href="https://github.com/Zainul342">Zainul Mutaqin</a>. 
    <br>
    <i>"Standardization is the liberator that relegates the problems that have already been solved to the field of routine."</i>
  </p>
</div>
