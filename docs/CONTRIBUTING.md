# Contributing to Agent Init

First off, thank you for taking the time to contribute! 🎉

All types of contributions are encouraged and valued. See the [Table of Contents](#table-of-contents) for different ways to help and details about how this project handles them. Please make sure to read the relevant section before making your contribution. It will make it a lot easier for us maintainers and smooth out the experience for all involved.

> If you like the project, but just don't have time to contribute, that's fine. There are other easy ways to support the project and show your appreciation, which we would also be very happy about:
> - Star the project
> - Tweet about it
> - Refer this project in your project's README
> - Mention the project at local meetups and tell your friends/colleagues

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [I Have a Question](#i-have-a-question)
- [I Want to Contribute](#i-want-to-contribute)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project team.

## I Have a Question

Before you ask a question, it is best to search for existing [Issues](https://github.com/irahardianto/agent-init/issues) that might help you. If you have found a suitable issue and still need clarification, you can write your question in this issue.

If you then need clarification on the specific details of this project, don't hesitate to reach out to the maintainers.

## I Want to Contribute

### Reporting Bugs

Before submitting a bug report, please check if the issue has already been reported. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title** for the issue to identify the problem.
- **Describe the exact steps which reproduce the problem** in as many details as possible.
- **Provide specific examples** to demonstrate the steps.
- **Describe the behavior you observed** after following the steps and point out what exactly is the problem with that behavior.
- **Explain which behavior you expected** to see instead and why.
- **Include screenshots** and animated GIFs if possible.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for Agent Init:

- **Use a clear and descriptive title** for the issue to identify the suggestion.
- **Provide a step-by-step description** of the suggested enhancement in as many details as possible.
- **Provide specific examples** to demonstrate the steps.
- **Describe the current behavior** and explain which behavior you expected to see instead.
- **Include screenshots** and animated GIFs which help you demonstrate the steps.

### Pull Request Guidelines

1. **Fork the repository** and create your branch from `main`.
2. **Follow the Coding Standards** and ensure your code passes linting.
3. **Write meaningful commit messages** following our commit message format.
4. **Test your changes** thoroughly before submitting.
5. **Update documentation** if your changes affect the API or user-facing features.
6. **Submit your Pull Request** with a clear title and description.

## Development Setup

### Prerequisites

- Node.js 18+
- npm 9+
- VS Code (latest version for testing)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/irahardianto/agent-init.git

# Navigate to the project directory
cd agent-init

# Install dependencies
npm install

# Build the project
npm run compile

# Run tests
npm test
```

### Running the Extension

1. Press `F5` in VS Code to launch the extension in a new window
2. Open a folder to test the extension functionality

## Coding Standards

- **Language:** TypeScript (Strict Mode)
- **Formatting:** Prettier
- **Linting:** ESLint
- **File Naming:** `kebab-case.ts`
- **Function Naming:** `camelCase` with verb prefix
- **Class Naming:** `PascalCase`

### Code Style Guidelines

- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions small and focused
- Write unit tests for new features

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning (formatting)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to build process or auxiliary tools

### Examples

```
feat(watcher): add support for multiple workspace folders
fix(github-client): handle rate limiting gracefully
docs(readme): update installation instructions
```

---

## Attribution

This Contributing Guide is adapted from [Contributing.md template](https://github.com/nayafia/contributing-template) and [Contributor Covenant](https://www.contributor-covenant.org/).
