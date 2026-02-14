import { TemplateContent, TemplateSource } from './types';

export class GitHubClient {
    private readonly baseUrl = 'https://raw.githubusercontent.com';

    /**
     * Fetches templates from the remote repository.
     * @param source The source repository details.
     */
    public async fetchTemplate(source: TemplateSource): Promise<TemplateContent> {
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

        const files = new Map<string, string>();

        // Parallel fetch
        await Promise.all(filesToFetch.map(async (filePath) => {
            const url = `${this.baseUrl}/${source.owner}/${source.repo}/${source.branch}/${filePath}`;
            try {
                const content = await this.fetchUrl(url);
                files.set(filePath, content);
            } catch (error) {
                console.error(`Failed to fetch ${url}:`, error);
                // Fallback for .cursorrules to ensure critical path success
                if (filePath === '.cursorrules') {
                    console.warn('Using fallback content for .cursorrules');
                    files.set(filePath, '# Agent Init Fallback Rules\n\nALWAYS FOLLOW THESE RULES:\n1. Be helpful.\n2. Write clean code.');
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

    private async fetchUrl(url: string): Promise<string> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
        }
        return await response.text();
    }
}
