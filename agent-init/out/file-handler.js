"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHandler = void 0;
const vscode = require("vscode");
class FileHandler {
    /**
     * Writes multiple files to the workspace.
     * @param root The root URI of the workspace.
     * @param files A map of relative paths to content.
     */
    async writeFiles(root, files) {
        for (const [relativePath, content] of files) {
            const targetUri = vscode.Uri.joinPath(root, relativePath);
            await this.writeSingleFile(targetUri, content);
        }
    }
    async writeSingleFile(uri, content) {
        // Ensure directory exists
        const parentDir = vscode.Uri.joinPath(uri, '..');
        await vscode.workspace.fs.createDirectory(parentDir);
        // Write file
        const encoder = new TextEncoder();
        const data = encoder.encode(content);
        await vscode.workspace.fs.writeFile(uri, data);
    }
}
exports.FileHandler = FileHandler;
//# sourceMappingURL=file-handler.js.map