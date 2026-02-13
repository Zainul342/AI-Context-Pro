import * as vscode from 'vscode';
import { AgentInitConfig } from './types';

export class ConfigManager {
    static getConfiguration(): AgentInitConfig {
        const config = vscode.workspace.getConfiguration('agentInit');
        return {
            autoInit: config.get<boolean>('autoInit', false),
            checkOnStartup: config.get<boolean>('checkOnStartup', true),
            watchForDrift: config.get<boolean>('watchForDrift', false)
        };
    }
}
