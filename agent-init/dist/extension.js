/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WatcherService = void 0;
const vscode = __webpack_require__(1);
const config_1 = __webpack_require__(3);
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


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigManager = void 0;
const vscode = __webpack_require__(1);
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


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UIController = void 0;
const vscode = __webpack_require__(1);
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


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GitHubClient = void 0;
class GitHubClient {
    constructor() {
        this.baseUrl = 'https://raw.githubusercontent.com';
    }
    /**
     * Fetches templates from the remote repository.
     * @param source The source repository details.
     */
    async fetchTemplate(source) {
        const filesToFetch = [
            '.cursorrules',
            '.agent/rules/api-design-principles.md',
            '.agent/rules/architectural-pattern.md',
            '.agent/rules/code-completion-mandate.md',
            '.agent/rules/core-design-principles.md',
            '.agent/rules/project-structure.md',
            '.agent/rules/rugged-software-constitution.md',
            '.agent/rules/security-mandate.md',
            '.agent/rules/testing-strategy.md'
            // Added key rules found in local .agent
        ];
        const files = new Map();
        // Parallel fetch
        await Promise.all(filesToFetch.map(async (filePath) => {
            const url = `${this.baseUrl}/${source.owner}/${source.repo}/${source.branch}/${filePath}`;
            try {
                const content = await this.fetchUrl(url);
                files.set(filePath, content);
            }
            catch (error) {
                console.error(`Failed to fetch ${url}:`, error);
                // Fallback for .cursorrules to ensure critical path success
                if (filePath === '.cursorrules') {
                    console.warn('Using fallback content for .cursorrules');
                    files.set(filePath, '# Agent Init Fallback Rules\n\nALWAYS FOLLOW THESE RULES:\n1. Be helpful.\n2. Write clean code.');
                    return;
                }
                if (filePath === '.cursorrules') {
                    throw new Error(`Critical file missing: ${filePath}`);
                }
            }
        }));
        return {
            files,
            version: 'latest' // Todo: Implement versioning
        };
    }
    async fetchUrl(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
        }
        return await response.text();
    }
}
exports.GitHubClient = GitHubClient;


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileHandler = void 0;
const vscode = __webpack_require__(1);
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


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __webpack_require__(1);
const watcher_1 = __webpack_require__(2);
const ui_controller_1 = __webpack_require__(4);
const github_client_1 = __webpack_require__(5);
const file_handler_1 = __webpack_require__(6);
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

})();

var __webpack_export_target__ = exports;
for(var __webpack_i__ in __webpack_exports__) __webpack_export_target__[__webpack_i__] = __webpack_exports__[__webpack_i__];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=extension.js.map