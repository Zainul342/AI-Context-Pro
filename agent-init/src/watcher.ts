import * as vscode from 'vscode';
import { ConfigManager } from './config';

export class WatcherService {
    constructor() {
        // Initialize watcher
    }

    /**
     * Checks if the workspace needs initialization.
     * @param folder The workspace folder to check.
     * @returns true if standards are missing, false if they exist.
     */
    public async needsInitialization(folder: vscode.WorkspaceFolder): Promise<boolean> {
        const config = ConfigManager.getConfiguration();
        if (!config.checkOnStartup) {
            return false;
        }

        const hasAgentDir = await this.pathExists(folder.uri, '.agent');
        const hasCursorRules = await this.pathExists(folder.uri, '.cursorrules');

        // Needs init if EITHER is missing (for now, stricter check)
        // Or maybe just if .cursorrules is missing? 
        // Let's require BOTH for a "complete" standard.
        return !(hasAgentDir && hasCursorRules);
    }

    private async pathExists(root: vscode.Uri, pathFragment: string): Promise<boolean> {
        try {
            const uri = vscode.Uri.joinPath(root, pathFragment);
            await vscode.workspace.fs.stat(uri);
            return true;
        } catch {
            return false;
        }
    }

    public watch(context: vscode.ExtensionContext, callback: (folder: vscode.WorkspaceFolder) => void) {
        // 1. Check on startup
        if (vscode.workspace.workspaceFolders) {
            vscode.workspace.workspaceFolders.forEach(folder => {
                this.needsInitialization(folder).then(needsInit => {
                    if (needsInit) {
                        callback(folder);
                    }
                });
            });
        }

        // 2. Watch for new folders
        context.subscriptions.push(
            vscode.workspace.onDidChangeWorkspaceFolders(event => {
                event.added.forEach(folder => {
                    this.needsInitialization(folder).then(needsInit => {
                        if (needsInit) {
                            callback(folder);
                        }
                    });
                });
            })
        );
    }
}
