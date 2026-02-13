import * as vscode from 'vscode';

export class FileHandler {
    /**
     * Writes multiple files to the workspace.
     * @param root The root URI of the workspace.
     * @param files A map of relative paths to content.
     */
    public async writeFiles(root: vscode.Uri, files: Map<string, string>): Promise<void> {
        for (const [relativePath, content] of files) {
            const targetUri = vscode.Uri.joinPath(root, relativePath);
            await this.writeSingleFile(targetUri, content);
        }
    }

    private async writeSingleFile(uri: vscode.Uri, content: string): Promise<void> {
        // Ensure directory exists
        const parentDir = vscode.Uri.joinPath(uri, '..');
        await vscode.workspace.fs.createDirectory(parentDir);

        // Write file
        const encoder = new TextEncoder();
        const data = encoder.encode(content);
        await vscode.workspace.fs.writeFile(uri, data);
    }
}
