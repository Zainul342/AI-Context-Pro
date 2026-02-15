---
project_name: Agent Init
version: 1.0.0
stack:
  runtime: Node.js 18+
  language: TypeScript (Strict)
  framework: VS Code Extension API (v1.80.0+)
  build: Webpack
  test: Mocha, VS Code Test Electron
documentation_standards:
  language: English
  format: Markdown
---

# Project Context: Agent Init

## 1. Project Overview
**Agent Init** is a VS Code extension that standardizes AI coding environments by automatically scaffolding `.agent/` directories and `.cursorrules`. It acts as a bridge between a remote standard definition (GitHub) and the local workspace.

## 2. Technology Stack
- **Language**: TypeScript (Strict Mode)
- **Runtime**: Node.js (Bundled with VS Code)
- **Core API**: `vscode` (v1.80.0+)
- **Networking**: Native `fetch` API (No Axios)
- **Build**: Webpack (`ts-loader`)
- **Testing**: Mocha, `@vscode/test-electron`

## 3. Architecture
**Pattern**: Event-Driven Modular Monolith.
- **Core**: `ExtensionContext` manages lifecycle.
- **Services**:
    - `Watcher`: Scans for `.agent`/`.cursorrules` (Lazy detection).
    - `GitHubClient`: Fetches raw content from `raw.githubusercontent.com`.
    - `FileHandler`: Manages safe disk writes.
    - `UIController`: Handles VS Code UI interactions.

## 4. Critical Implementation Rules
### General
- **No External deps**: Minimize runtime dependencies. Use native APIs where possible.
- **Stateless**: Do not rely on persistent local state for logic.
- **Security**: Operations strictly limited to `workspaceFolders`. No executable writing.

### Naming Conventions
- **Files**: `kebab-case.ts` (e.g., `github-client.ts`)
- **Classes**: `PascalCase` (e.g., `GitHubClient`)
- **Functions/Variables**: `camelCase`

### Coding Standards
- **Strict Types**: No `any`. Define interfaces for all data structures.
- **Error Handling**: Graceful degradation. Catch errors at the service boundary.
- **Async/Await**: Prefer over callbacks/promises chains.

## 5. Development Workflow
- **Linting**: `eslint` must pass.
- **Testing**:
  - Unit tests for logic.
  - Integration tests for VS Code API interactions.
- **Build**: `npm run package` for production builds.

## 6. Key Directories
- `src/`: Source code.
- `test/`: Test suites.
- `.agent/`: Governance rules (Self-hosted).
