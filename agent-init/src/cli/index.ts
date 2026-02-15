#!/usr/bin/env node

import { GitHubClient } from '../github-client';
import { FileHandler } from './file-handler';


// Polyfill fetch for older Node.js versions if needed
// (Node 18+ has native fetch)
if (!global.fetch) {
    console.warn('Warning: Native fetch not found. Install Node.js 18+ or a polyfill.');
}

async function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    if (command === 'install') {
        console.log('🤖 ACP: Initializing AI Context...');
        await install();
    } else {
        console.log('Usage: npx acp install');
    }
}

async function install() {
    const github = new GitHubClient();
    const fileHandler = new FileHandler();
    const cwd = process.cwd();

    try {
        console.log('📦 Fetching latest standards from GitHub...');

        // MVP: Fetch from main branch
        const template = await github.fetchTemplate({
            owner: 'irahardianto',
            repo: 'antigravity-setup',
            branch: 'main'
        });

        console.log(`📝 Writing ${template.files.size} files to ${cwd}...`);
        await fileHandler.writeFiles(cwd, template.files);

        console.log('✅ AI Context Pro initialized successfully!');
        console.log('🚀 Run "npx acp install" anytime to update standards.');
    } catch (error) {
        console.error('❌ Installation failed:', error);
        process.exit(1);
    }
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
