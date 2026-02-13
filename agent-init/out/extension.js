"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const watcher_1 = require("./watcher");
const ui_controller_1 = require("./ui-controller");
const github_client_1 = require("./github-client");
const file_handler_1 = require("./file-handler");
function activate(context) {
    console.log('Congratulations, your extension "agent-init" is now active!');
    // 1. Register Commands
    const disposable = vscode.commands.registerCommand('agentInit.initialize', async () => {
        // Manual Trigger
        const ui = new ui_controller_1.UIController(context);
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            ui.showErrorMessage('No workspace open.');
            return;
        }
        // For manual trigger, we can pick the first one or ask user. 
        // MVP: Pick first.
        const folder = workspaceFolders[0];
        await performInitialization(folder, ui);
    });
    const checkStatusDisposable = vscode.commands.registerCommand('agentInit.checkStatus', () => {
        vscode.window.showInformationMessage('Agent Init: Status Check');
    });
    context.subscriptions.push(disposable);
    context.subscriptions.push(checkStatusDisposable);
    // 2. Initialize Watcher (Automatic Detection)
    const watcher = new watcher_1.WatcherService();
    const ui = new ui_controller_1.UIController(context);
    watcher.watch(context, async (folder) => {
        console.log(`Agent Init: Standards missing in ${folder.name}`);
        const shouldInit = await ui.showInitializePrompt();
        if (shouldInit) {
            await performInitialization(folder, ui);
        }
    });
    console.log('Agent Init: Detection Watcher Active');
}
async function performInitialization(folder, ui) {
    const github = new github_client_1.GitHubClient();
    const fileHandler = new file_handler_1.FileHandler();
    try {
        ui.showSuccessMessage('Agent Init: Fetching templates...');
        const template = await github.fetchTemplate({
            owner: 'irahardianto',
            repo: 'antigravity-setup',
            branch: 'main'
        });
        await fileHandler.writeFiles(folder.uri, template.files);
        ui.showSuccessMessage('Agent Init: AI Standards initialized successfully!');
    }
    catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        ui.showErrorMessage(`Initialization Failed: ${msg}`);
        console.error('Agent Init Error:', error);
    }
}
function deactivate() { }
//# sourceMappingURL=extension.js.map