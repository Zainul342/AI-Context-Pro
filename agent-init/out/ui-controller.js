"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIController = void 0;
const vscode = require("vscode");
class UIController {
    constructor(context) {
        this.context = context;
    }
    /**
     * Shows a prompt to the user to initialize the project.
     * @returns true if the user clicked "Initialize", false otherwise.
     */
    async showInitializePrompt() {
        // Check if user ignored this workspace previously
        const isIgnored = this.context.workspaceState.get('agentInit.ignored', false);
        if (isIgnored) {
            return false;
        }
        const selection = await vscode.window.showInformationMessage('Agent Init: AI Standards missing in this workspace. Initialize now?', 'Initialize', 'Ignore');
        if (selection === 'Initialize') {
            return true;
        }
        if (selection === 'Ignore') {
            await this.context.workspaceState.update('agentInit.ignored', true);
        }
        return false;
    }
    showSuccessMessage(message) {
        vscode.window.showInformationMessage(message);
    }
    showErrorMessage(message) {
        vscode.window.showErrorMessage(message);
    }
}
exports.UIController = UIController;
//# sourceMappingURL=ui-controller.js.map