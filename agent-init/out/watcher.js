"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatcherService = void 0;
const vscode = require("vscode");
const config_1 = require("./config");
class WatcherService {
    constructor() { }
    /**
     * Checks if the workspace needs initialization.
     * @param folder The workspace folder to check.
     * @returns true if standards are missing, false if they exist.
     */
    async needsInitialization(folder) {
        const config = config_1.ConfigManager.getConfiguration();
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
    async pathExists(root, pathFragment) {
        try {
            const uri = vscode.Uri.joinPath(root, pathFragment);
            await vscode.workspace.fs.stat(uri);
            return true;
        }
        catch {
            return false;
        }
    }
    watch(context, callback) {
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
        context.subscriptions.push(vscode.workspace.onDidChangeWorkspaceFolders(event => {
            event.added.forEach(folder => {
                this.needsInitialization(folder).then(needsInit => {
                    if (needsInit) {
                        callback(folder);
                    }
                });
            });
        }));
    }
}
exports.WatcherService = WatcherService;
//# sourceMappingURL=watcher.js.map