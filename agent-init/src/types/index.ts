export interface AgentInitConfig {
    autoInit: boolean;
    checkOnStartup: boolean;
    watchForDrift: boolean;
}

export interface TemplateSource {
    owner: string;
    repo: string;
    branch: string;
}

export interface TemplateContent {
    files: Map<string, string>;
    version: string;
}

export enum InitStatus {
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
    SKIPPED = 'SKIPPED'
}
