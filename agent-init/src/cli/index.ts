#!/usr/bin/env node

import { GitHubClient } from '../github-client';
import { FileHandler } from './file-handler';

// --- Minimal ANSI Color & UI Utils ---
const c = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    bgBlue: "\x1b[44m"
};

const symbols = {
    info: c.blue + 'ℹ' + c.reset,
    success: c.green + '✔' + c.reset,
    warning: c.yellow + '⚠' + c.reset,
    error: c.red + '✖' + c.reset,
    arrow: c.cyan + '➜' + c.reset,
    star: c.magenta + '★' + c.reset
};

class Spinner {
    private frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    private interval: NodeJS.Timeout | null = null;
    private currentFrame = 0;

    constructor(private text: string) { }

    start() {
        process.stdout.write('\x1B[?25l'); // Hide cursor
        this.interval = setInterval(() => {
            const frame = this.frames[this.currentFrame];
            this.currentFrame = (this.currentFrame + 1) % this.frames.length;
            process.stdout.write(`\r${c.cyan}${frame}${c.reset} ${this.text}`);
        }, 80);
    }

    stop(symbol: string = symbols.success, endText?: string) {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        const finalText = endText || this.text;
        process.stdout.write(`\r${symbol} ${finalText}\n`);
        process.stdout.write('\x1B[?25h'); // Show cursor
    }

    fail(errorText?: string) {
        this.stop(symbols.error, errorText);
    }
}

function printBanner() {
    console.log('');
    console.log(`${c.bright}${c.magenta}   ___   ___  ___  ${c.reset}`);
    console.log(`${c.bright}${c.magenta}  / _ | / __|/ _ \\ ${c.reset}`);
    console.log(`${c.bright}${c.magenta} / __ || (__/ ___/ ${c.reset} ${c.dim}AI Context Pro${c.reset}`);
    console.log(`${c.bright}${c.magenta}/_/ |_| \\___/_/    ${c.reset} ${c.dim}v1.0.1${c.reset}`);
    console.log('');
    console.log(`${c.dim}Standardizing your AI workspace...${c.reset}`);
    console.log('');
}

// --- Main Logic ---

// Polyfill fetch
if (!global.fetch) {
    console.warn(`${symbols.warning} Warning: Native fetch not found. Install Node.js 18+ or a polyfill.`);
}

async function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    // Handle --version or -v
    if (command === '--version' || command === '-v') {
        console.log('1.0.1');
        process.exit(0);
    }

    // Handle --help or -h
    if (command === '--help' || command === '-h' || !command) {
        printBanner();
        console.log(`${c.bright}Usage:${c.reset}`);
        console.log(`  npx acp-method ${c.cyan}<command>${c.reset}`);
        console.log('');
        console.log(`${c.bright}Commands:${c.reset}`);
        console.log(`  ${c.cyan}install${c.reset}    Initialize or update AI standards in the current directory`);
        console.log('');
        return;
    }

    if (command === 'install') {
        printBanner();
        await install();
    } else {
        console.log(`${symbols.error} Unknown command: ${command}`);
        console.log(`Run ${c.cyan}npx acp-method --help${c.reset} for usage.`);
        process.exit(1);
    }
}

async function install() {
    const github = new GitHubClient();
    const fileHandler = new FileHandler();
    const cwd = process.cwd();

    const fetchSpinner = new Spinner('Fetching latest standards from GitHub...');

    try {
        fetchSpinner.start();

        // MVP: Fetch from main branch
        // Simulated delay for UX (optional, can remove)
        // await new Promise(r => setTimeout(r, 800));

        const template = await github.fetchTemplate({
            owner: 'irahardianto',
            repo: 'antigravity-setup',
            branch: 'main'
        });

        fetchSpinner.stop(symbols.success, `Fetched ${c.bright}${template.files.size}${c.reset} files from remote.`);

        const writeSpinner = new Spinner(`Writing files to ${c.dim}${cwd}${c.reset}...`);
        writeSpinner.start();

        await fileHandler.writeFiles(cwd, template.files);

        writeSpinner.stop(symbols.success, 'Files written successfully.');

        console.log('');
        console.log(`${c.green}┌──────────────────────────────────────────────┐${c.reset}`);
        console.log(`${c.green}│                                              │${c.reset}`);
        console.log(`${c.green}│   ${c.bright}🚀 MISSION ACCOMPLISHED!${c.reset}                   ${c.green}│${c.reset}`);
        console.log(`${c.green}│                                              │${c.reset}`);
        console.log(`${c.green}│   Your workspace is now AI-ready.            │${c.reset}`);
        console.log(`${c.green}│   Check .agent/ folder for rules.            │${c.reset}`);
        console.log(`${c.green}│                                              │${c.reset}`);
        console.log(`${c.green}└──────────────────────────────────────────────┘${c.reset}`);
        console.log('');

    } catch (error) {
        if (fetchSpinner['interval']) fetchSpinner.fail('Failed to fetch templates.');
        else console.error(`${symbols.error} Installation failed:`, error);

        // Show detailed error if needed
        console.error(c.red + (error instanceof Error ? error.message : String(error)) + c.reset);
        process.exit(1);
    }
}

main().catch(err => {
    console.error(`${c.bgBlue} FATAL ERROR ${c.reset}`, err);
    process.exit(1);
});
