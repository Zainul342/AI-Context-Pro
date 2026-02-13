import * as assert from 'assert';
import * as vscode from 'vscode';
import * as sinon from 'sinon';
import { WatcherService } from '../../src/watcher';
import { ConfigManager } from '../../src/config';

suite('WatcherService Test Suite', () => {
    let sandbox: sinon.SinonSandbox;

    setup(() => {
        sandbox = sinon.createSandbox();
    });

    teardown(() => {
        sandbox.restore();
    });

    test('needsInitialization returns true when both .agent and .cursorrules are missing', async () => {
        // Mock Config
        sandbox.stub(ConfigManager, 'getConfiguration').returns({
            autoInit: false,
            checkOnStartup: true,
            watchForDrift: false
        });

        // Mock fs.stat to throw (file not found)
        const fsStub = sandbox.stub(vscode.workspace.fs, 'stat');
        fsStub.rejects(new Error('File not found'));

        const watcher = new WatcherService();
        const folder = { uri: vscode.Uri.file('/test/workspace'), name: 'Test', index: 0 };

        const result = await watcher.needsInitialization(folder);
        assert.strictEqual(result, true);
    });

    test('needsInitialization returns true when only .agent exists', async () => {
        // Mock Config
        sandbox.stub(ConfigManager, 'getConfiguration').returns({
            autoInit: false,
            checkOnStartup: true,
            watchForDrift: false
        });

        const fsStub = sandbox.stub(vscode.workspace.fs, 'stat');

        // .agent exists
        fsStub.withArgs(sinon.match.has('path', sinon.match(/.agent$/))).resolves({ type: vscode.FileType.Directory, ctime: 0, mtime: 0, size: 0 });
        // .cursorrules missing
        fsStub.withArgs(sinon.match.has('path', sinon.match(/.cursorrules$/))).rejects(new Error('File not found'));

        const watcher = new WatcherService();
        const folder = { uri: vscode.Uri.file('/test/workspace'), name: 'Test', index: 0 };

        const result = await watcher.needsInitialization(folder);
        assert.strictEqual(result, true);
    });

    test('needsInitialization returns false when checkOnStartup is disabled', async () => {
        sandbox.stub(ConfigManager, 'getConfiguration').returns({
            autoInit: false,
            checkOnStartup: false, // Disabled
            watchForDrift: false
        });

        const watcher = new WatcherService();
        const folder = { uri: vscode.Uri.file('/test/workspace'), name: 'Test', index: 0 };

        const result = await watcher.needsInitialization(folder);
        assert.strictEqual(result, false);
    });
});
