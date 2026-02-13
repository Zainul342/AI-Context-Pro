# Agent Init

[![VS Code Marketplace](https://img.shields.io/badge/VS_Code-Marketplace-blue?style=flat-square)](https://marketplace.visualstudio.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)
[![Version](https://img.shields.io/badge/Version-0.1.0-orange?style=flat-square)](./CHANGELOG.md)
[![Last Updated](https://img.shields.io/badge/Last_Updated-2026--02--13-yellow?style=flat-square)](./CHANGELOG.md)

## Overview

Agent Init is a VS Code/Cursor extension designed to bridge the gap between ad-hoc "vibe coding" and professional, scalable software engineering. It automatically initializes the "Project Constitution" (specifically `.agent`, `.cursorrules`, and associated standards) when a new project folder is opened.

This ensures AI agents operate with a clear, standardized technical context from the very first line of code, reducing hallucinations and setup friction.

## Features

### Core Features (MVP)
- **🤖 Automatic Context Detection** - Detects when a workspace is opened and checks for existing AI standards
- **🔔 User Consent First** - Prompts user before writing any files to the project
- **🌐 Remote Synchronization** - Fetches the latest standard templates from GitHub
- **📁 Smart File Generation** - Creates `.cursorrules` and `.agent/` structure automatically

### Coming Soon
- **🔍 Context Adaptation** - Auto-detect programming language and tailor rules accordingly
- **🛡️ Standard Guard** - Monitor and protect AI standard files from accidental modification
- **🏢 Enterprise Sync** - Support for private repository configurations
- **📦 Template Versioning** - Semantic versioning support for templates

## Prerequisites

Before installing Agent Init, ensure you have:

- **VS Code** version 1.80.0 or higher
- **Node.js** version 18 or higher (for development)
- **Internet connection** (required for fetching templates)

### Supported IDEs
- Visual Studio Code
- Cursor (VS Code fork with AI features)

## Installation

### From VS Code Marketplace
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X or Cmd+Shift+X)
3. Search for "Agent Init"
4. Click Install

### From VSIX File (Development)
```bash
# Clone the repository
git clone https://github.com/irahardianto/agent-init.git

# Navigate to project directory
cd agent-init

# Install dependencies
npm install

# Build the extension
npm run compile

# Package the extension
vsce package

# Install the .vsix file
code --install-extension agent-init-*.vsix
```

## Quick Start

1. **Install** the extension (see Installation above)
2. **Open** any project folder in VS Code or Cursor
3. **Wait** for the extension to detect missing AI standards
4. **Click** "Initialize" when prompted to set up AI standards
5. **Done!** AI agents now have context about your project

### First-Time Setup

```
project-root/
├── .cursorrules          # Root instruction file for Cursor
├── .agent/               # AI Agent Brain Directory
│   ├── rules/            # Coding standards & guidelines
│   ├── skills/          # AI agent capabilities
│   └── workflows/        # Workflow definitions
```

## Usage

### Automatic Mode
The extension runs automatically when you open a project folder. If no AI standards are detected, you'll see a notification asking to initialize.

### Manual Commands
Access via Command Palette (Ctrl+Shift+P or Cmd+Shift+P):

| Command | Description |
|---------|-------------|
| `Agent Init: Initialize` | Force initialization of AI standards |
| `Agent Init: Check Status` | View current AI standards status |
| `Agent Init: Repair` | Repair/reinstall AI standards |

## Configuration

### Settings
Go to VS Code Settings to configure:

| Setting | Default | Description |
|---------|---------|-------------|
| `agentInit.autoInit` | `false` | Automatically initialize without prompt |
| `agentInit.checkOnStartup` | `true` | Check for standards when opening folder |
| `agentInit.watchForDrift` | `false` | Monitor for file changes |

### Custom Template Source (Future)
Point to your own template repository:
```json
{
  "agentInit.source": {
    "owner": "your-org",
    "repo": "your-templates",
    "branch": "main"
  }
}
```

## Documentation Index

| Document | Description | Target Audience |
|----------|-------------|-----------------|
| **[Product Requirements (PRD)](./PRD.md)** | The definition of what we are building, why, and for whom. Includes MVP scope and success metrics. | Product Managers, Stakeholders |
| **[System Architecture](./System_Architecture.md)** | High-level technical design, component diagrams, and data flow strategies. | Architects, Lead Developers |
| **[Technical Specifications](./Technical_Specifications.md)** | Detailed implementation guide, technology stack, and API usage. | Developers, QA |
| **[User Stories & Use Cases](./User_Stories_and_Use_Cases.md)** | Breakdown of features into actionable stories and user flow scenarios. | Developers, Testers |
| **[Risk & Scalability](./Risk_Security_Scalability.md)** | Analysis of security risks, network dependencies, and future roadmap. | Security Audit, DevOps |

## Community & Contribution

| Document | Description |
|----------|-------------|
| **[CONTRIBUTING.md](./CONTRIBUTING.md)** | Guidelines for contributing to this project. |
| **[CHANGELOG.md](./CHANGELOG.md)** | Version history and notable changes. |
| **[LICENSE](./LICENSE)** | License information and third-party dependencies. |

## Support

### Troubleshooting
- **Extension not activating?** Check VS Code version (need 1.80.0+)
- **Network errors?** Ensure internet connection is available
- **Files not created?** Check workspace folder permissions

### Getting Help
- 📖 [Documentation](./README.md)
- 🐛 [Issue Tracker](https://github.com/irahardianto/agent-init/issues)
- 💬 [Discussions](https://github.com/irahardianto/agent-init/discussions)

## Getting Started for Developers

1. Read the **PRD** to understand the vision.
2. Review the **Architecture** to understand the system design.
3. Consult **Technical Specifications** for implementation details.
4. Pick a story from **User Stories** to start coding!

---

Built with ❤️ for the AI-assisted development community.
