import { TemplateContent, TemplateSource } from './types';
import { FALLBACK_CONTENT, filesToFetch } from './fallback-data';

export class GitHubClient {
    private readonly baseUrl = 'https://raw.githubusercontent.com';

    /**
     * Fetches templates from the remote repository.
     * @param source The source repository details.
     */
    public async fetchTemplate(source: TemplateSource): Promise<TemplateContent> {
        const files = new Map<string, string>();

        // Parallel fetch
        await Promise.all(filesToFetch.map(async (filePath) => {
            const url = `${this.baseUrl}/${source.owner}/${source.repo}/${source.branch}/${filePath}`;
            try {
                const content = await this.fetchUrl(url);
                files.set(filePath, content);
            } catch (error) {
                console.error(`Failed to fetch ${url}:`, error);

                // Fallback mechanism for ALL files
                if (FALLBACK_CONTENT[filePath]) {
                    console.warn(`Using fallback content for ${filePath}`);
                    files.set(filePath, FALLBACK_CONTENT[filePath]);
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
