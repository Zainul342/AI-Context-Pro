const fs = require('fs');
const path = require('path');

// Go up to the root where .agent and .cursorrules are
const rootDir = path.resolve(__dirname, '..');
const agentDir = path.join(rootDir, '.agent');
const outputFilePath = path.join(__dirname, 'src', 'fallback-data.ts');

const filesToFetch = [];
const FALLBACK_CONTENT = {};

function addFile(relativeToProject, absolutePath) {
    if (fs.existsSync(absolutePath)) {
        console.log(`Adding ${relativeToProject}`);
        filesToFetch.push(relativeToProject);
        FALLBACK_CONTENT[relativeToProject] = fs.readFileSync(absolutePath, 'utf-8');
    }
}

// 1. .cursorrules
addFile('.cursorrules', path.join(rootDir, '.cursorrules'));

// 2. Rules
const rulesDir = path.join(agentDir, 'rules');
if (fs.existsSync(rulesDir)) {
    fs.readdirSync(rulesDir).forEach(file => {
        if (file.endsWith('.md')) {
            addFile(`.agent/rules/${file}`, path.join(rulesDir, file));
        }
    });
}

// 3. Workflows
const workflowsDir = path.join(agentDir, 'workflows');
if (fs.existsSync(workflowsDir)) {
    fs.readdirSync(workflowsDir).forEach(file => {
        if (file.endsWith('.md')) {
            addFile(`.agent/workflows/${file}`, path.join(workflowsDir, file));
        }
    });
}

// 4. Skills
const skillsDir = path.join(agentDir, 'skills');
if (fs.existsSync(skillsDir)) {
    fs.readdirSync(skillsDir).forEach(skillName => {
        const skillPath = path.join(skillsDir, skillName);
        if (fs.statSync(skillPath).isDirectory()) {
            const skillFile = path.join(skillPath, 'SKILL.md');
            if (fs.existsSync(skillFile)) {
                addFile(`.agent/skills/${skillName}/SKILL.md`, skillFile);
            }
        }
    });
}

const content = `// AUTOMATICALLY GENERATED - DO NOT EDIT MANUALLY
export const filesToFetch = ${JSON.stringify(filesToFetch, null, 2)};

export const FALLBACK_CONTENT: Record<string, string> = ${JSON.stringify(FALLBACK_CONTENT, null, 2)};
`;

fs.writeFileSync(outputFilePath, content);
console.log(`Successfully generated ${outputFilePath}`);
