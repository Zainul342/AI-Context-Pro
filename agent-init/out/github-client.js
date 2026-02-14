"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubClient = void 0;
const fallback_data_1 = require("./fallback-data");
class GitHubClient {
    constructor() {
        this.baseUrl = 'https://raw.githubusercontent.com';
    }
    /**
     * Fetches templates from the remote repository.
     * @param source The source repository details.
     */
    async fetchTemplate(source) {
        const files = new Map();
        // Parallel fetch
        await Promise.all(fallback_data_1.filesToFetch.map(async (filePath) => {
            const url = `${this.baseUrl}/${source.owner}/${source.repo}/${source.branch}/${filePath}`;
            try {
                const content = await this.fetchUrl(url);
                files.set(filePath, content);
            }
            catch (error) {
                console.error(`Failed to fetch ${url}:`, error);
                // Fallback mechanism for ALL files
                if (fallback_data_1.FALLBACK_CONTENT[filePath]) {
                    console.warn(`Using fallback content for ${filePath}`);
                    files.set(filePath, fallback_data_1.FALLBACK_CONTENT[filePath]);
                    return;
                }
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