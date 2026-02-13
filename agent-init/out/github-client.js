"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubClient = void 0;
class GitHubClient {
    constructor() {
        this.baseUrl = 'https://raw.githubusercontent.com';
    }
    /**
     * Fetches templates from the remote repository.
     * @param source The source repository details.
     */
    async fetchTemplate(source) {
        const filesToFetch = [
            '.cursorrules',
            '.agent/rules/api-design-principles.md',
            '.agent/rules/architectural-pattern.md',
            '.agent/rules/code-completion-mandate.md',
            '.agent/rules/core-design-principles.md',
            '.agent/rules/project-structure.md',
            '.agent/rules/rugged-software-constitution.md',
            '.agent/rules/security-mandate.md',
            '.agent/rules/testing-strategy.md'
            // Added key rules found in local .agent
        ];
        const files = new Map();
        // Parallel fetch
        await Promise.all(filesToFetch.map(async (filePath) => {
            const url = `${this.baseUrl}/${source.owner}/${source.repo}/${source.branch}/${filePath}`;
            try {
                const content = await this.fetchUrl(url);
                files.set(filePath, content);
            }
            catch (error) {
                console.error(`Failed to fetch ${url}:`, error);
                // For MVP, we might log and continue, or fail hard?
                // Let's ensure at least .cursorrules exists
                if (filePath === '.cursorrules') {
                    throw new Error(`Critical file missing: ${filePath}`);
                }
            }
        }));
        return {
            files,
            version: 'latest' // Todo: Implement versioning
        };
    }
    async fetchUrl(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
        }
        return await response.text();
    }
}
exports.GitHubClient = GitHubClient;
//# sourceMappingURL=github-client.js.map