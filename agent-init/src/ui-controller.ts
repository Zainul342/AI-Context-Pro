import * as vscode from 'vscode';

export class UIController {
    private context: vscode.ExtensionContext;
    private static isPromptOpen = false;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
    }

    /**
     * Shows a prompt to the user to initialize the project.
     * @returns true if the user clicked "Initialize", false otherwise.
     */
    public async showInitializePrompt(): Promise<boolean> {
        if (UIController.isPromptOpen) {
            return false;
        }

        UIController.isPromptOpen = true;

        try {
            // Check if user ignored this workspace previously
            const isIgnored = this.context.workspaceState.get<boolean>('agentInit.ignored', false);
            if (isIgnored) {
                return false;
            }

            // Small delay to ensure UI is ready and prevent instant-flash on startup
            await new Promise(resolve => setTimeout(resolve, 500));

            const selection = await vscode.window.showInformationMessage(
                'Agent Init: AI Standards missing in this workspace. Initialize now?',
                'Initialize',
                'Ignore'
            );

            if (selection === 'Initialize') {
                return true;
            }

            if (selection === 'Ignore') {
                await this.context.workspaceState.update('agentInit.ignored', true);
            }

            return false;
        } finally {
            UIController.isPromptOpen = false;
        }
    }

    public showSuccessMessage(message: string): void {
        vscode.window.showInformationMessage(message);
    }

    public showErrorMessage(message: string): void {
        vscode.window.showErrorMessage(message);
    }
}
