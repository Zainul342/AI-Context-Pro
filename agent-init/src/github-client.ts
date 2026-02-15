import { TemplateContent, TemplateSource } from './types';
import { FALLBACK_CONTENT, filesToFetch } from './fallback-data';

export interface FetchResult {
    path: string;
    status: 'remote' | 'fallback' | 'failed';
    error?: Error;
}

export class GitHubClient {
    private readonly baseUrl = 'https://raw.githubusercontent.com';

    /**
     * Fetches templates from the remote repository with concurrency control.
     * @param source The source repository details.
     * @param onProgress Optional callback for progress updates.
     */
    public async fetchTemplate(
        source: TemplateSource,
        onFetchResult?: (result: FetchResult) => void
    ): Promise<TemplateContent> {
        const files = new Map<string, string>();
        const concurrencyLimit = 5;
        const queue = [...filesToFetch];
        const results: Promise<void>[] = [];

        // Simple concurrency limiter
        const next = async () => {
            if (queue.length === 0) return;
            const filePath = queue.shift()!;

            const url = `${this.baseUrl}/${source.owner}/${source.repo}/${source.branch}/${filePath}`;

            try {
                const content = await this.fetchUrl(url);
                files.set(filePath, content);
                onFetchResult?.({ path: filePath, status: 'remote' });
            } catch (error) {
                // Fallback mechanism
                if (FALLBACK_CONTENT[filePath]) {
                    files.set(filePath, FALLBACK_CONTENT[filePath]);
                    onFetchResult?.({ path: filePath, status: 'fallback', error: error as Error });
                } else {
                    onFetchResult?.({ path: filePath, status: 'failed', error: error as Error });
                    if (filePath === '.cursorrules') {
                        throw new Error(`Critical file missing: ${filePath}`);
                    }
                }
            }

            await next(); // Process next item
        };

        // Start initial batch
        for (let i = 0; i < Math.min(concurrencyLimit, filesToFetch.length); i++) {
            results.push(next());
        }

        await Promise.all(results);

        return {
            files,
            version: 'latest'
        };
    }

    private async fetchUrl(url: string): Promise<string> {
        // Add timeout to prevent hanging requests
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

        try {
            const response = await fetch(url, { signal: controller.signal });
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return await response.text();
        } finally {
            clearTimeout(timeoutId);
        }
    }
}
