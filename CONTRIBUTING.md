# Contributing to AI Context Pro

## Versioning Policy

We follow [Semantic Versioning (SemVer) 2.0.0](https://semver.org/).

### Version Format: `MAJOR.MINOR.PATCH`

- **MAJOR**: Incompatible API changes or fundamental behavior shifts.
- **MINOR**: Backward-compatible functionality (new features).
- **PATCH**: Backward-compatible bug fixes.

### Release Workflow

1.  **Develop**: Create a feature branch/story branch.
2.  **Test**: Ensure all tests pass.
3.  **Bump**: Use the release script to bump the version.
    ```bash
    npm run release -- --bump <major|minor|patch>
    ```
    This will:
    - Update `package.json`
    - Create a git tag
    - Commit the change
4.  **Push**: Push the commit and tags.
5.  **Publish**: CI/CD will handle publishing to VS Code Marketplace (future).

## Development Setup

1.  Install dependencies: `npm install`
2.  Run extension: Press `F5` in VS Code
3.  Test: `npm test`
