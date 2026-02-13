"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigManager = void 0;
const vscode = require("vscode");
class ConfigManager {
    static getConfiguration() {
        const config = vscode.workspace.getConfiguration('agentInit');
        return {
            autoInit: config.get('autoInit', false),
            checkOnStartup: config.get('checkOnStartup', true),
            watchForDrift: config.get('watchForDrift', false)
        };
    }
}
exports.ConfigManager = ConfigManager;
//# sourceMappingURL=config.js.map