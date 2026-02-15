import * as fs from 'fs/promises';
import * as path from 'path';

export class FileHandler {
    /**
     * Writes multiple files to the filesystem.
     * @param root The root directory path.
     * @param files A map of relative paths to content.
     */
    public async writeFiles(root: string, files: Map<string, string>): Promise<void> {
        for (const [relativePath, content] of files) {
            const targetPath = path.join(root, relativePath);
            await this.writeSingleFile(targetPath, content);
        }
    }

    private async writeSingleFile(filePath: string, content: string): Promise<void> {
        // Ensure directory exists
        const parentDir = path.dirname(filePath);
        await fs.mkdir(parentDir, { recursive: true });

        // Write file
        await fs.writeFile(filePath, content, 'utf-8');
        console.log(`Created: ${filePath}`);
    }
}
