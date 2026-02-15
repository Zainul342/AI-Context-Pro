const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PACKAGE_JSON_PATH = path.join(__dirname, '../package.json');

function getCurrentVersion() {
    const pkg = require(PACKAGE_JSON_PATH);
    return pkg.version;
}

function bumpVersion(type) {
    console.log(`🚀 Bumping ${type} version...`);
    try {
        // npm version updates package.json and git tag
        execSync(`npm version ${type} --no-git-tag-version`, { cwd: path.dirname(PACKAGE_JSON_PATH) });

        const newVersion = getCurrentVersion();
        console.log(`✅ Version updated to ${newVersion}`);

        // Stage and commit
        execSync(`git add package.json`, { cwd: path.dirname(PACKAGE_JSON_PATH) });
        execSync(`git commit -m "chore(release): bump version to ${newVersion}"`, { cwd: path.dirname(PACKAGE_JSON_PATH) });
        execSync(`git tag v${newVersion}`, { cwd: path.dirname(PACKAGE_JSON_PATH) });

        console.log(`🎉 Git tag v${newVersion} created.`);
    } catch (error) {
        console.error('❌ Failed to bump version:', error.message);
        process.exit(1);
    }
}

const args = process.argv.slice(2);
const bumpType = args[0];

if (!['major', 'minor', 'patch'].includes(bumpType)) {
    console.error('Usage: node release.js <major|minor|patch>');
    process.exit(1);
}

bumpVersion(bumpType);
