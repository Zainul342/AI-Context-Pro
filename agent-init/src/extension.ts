import * as vscode from 'vscode';
import { WatcherService } from './watcher';
import { UIController } from './ui-controller';
import { GitHubClient } from './github-client';
import { FileHandler } from './file-handler';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "agent-init" is now active!');

    // 1. Register Commands
    const disposable = vscode.commands.registerCommand('agentInit.initialize', async () => {
        // Manual Trigger
        const ui = new UIController(context);
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
    const watcher = new WatcherService();
    const ui = new UIController(context);

    watcher.watch(context, async (folder) => {
        console.log(`Agent Init: Standards missing in ${folder.name}`);

        const shouldInit = await ui.showInitializePrompt();
        if (shouldInit) {
            await performInitialization(folder, ui);
        }
    });

    console.log('Agent Init: Detection Watcher Active');
}

async function performInitialization(folder: vscode.WorkspaceFolder, ui: UIController) {
    const github = new GitHubClient();
    const fileHandler = new FileHandler();

    try {
        ui.showSuccessMessage('Agent Init: Fetching templates...');

        const template = await github.fetchTemplate({
            owner: 'irahardianto',
            repo: 'antigravity-setup',
            branch: 'main'
        });

        await fileHandler.writeFiles(folder.uri, template.files);

        ui.showSuccessMessage('Agent Init: AI Standards initialized successfully!');
    } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        ui.showErrorMessage(`Initialization Failed: ${msg}`);
        console.error('Agent Init Error:', error);
    }
}

export function deactivate() {
    // Clean up resources
}
