# User Stories & Use Cases: Agent Init

## 1. User Personas

- **Alex (The Architect):** Wants to ensure all team members follow the same project structure. Hates when juniors commit code that doesn't follow the "Antigravity" standard.
- **Jamie (The Freelancer):** Switches between 3-4 projects a day. Needs AI to instantly know "where things are" without manual configuration.
- **Sam (The Security Lead):** Worried about malicious code being injected through templates. Needs verification and safety checks.

## 2. Priority Matrix (MoSCoW Method)

| Story ID | Story | Priority | Story Points | Sprint |
|----------|-------|----------|--------------|--------|
| 1.1 | Extension Activation | Must Have | 2 | 1 |
| 2.1 | Missing File Detection | Must Have | 3 | 1 |
| 3.1 | Initialization Prompt | Must Have | 3 | 1 |
| 4.1 | Fetch Latest Standards | Must Have | 5 | 2 |
| 4.2 | Write to Disk | Must Have | 5 | 2 |
| 5.1 | Error Handling | Should Have | 3 | 2 |
| 5.2 | Success Notification | Should Have | 1 | 2 |
| 6.1 | Manual Command | Could Have | 2 | 3 |
| 6.2 | Status Command | Could Have | 2 | 3 |

## 3. Epics & User Stories

### Epic 1: Extension Foundation & Environment Setup
**Goal:** Establish the extension runtime and basic lifecycle.

#### Story 1.1: Extension Activation
**As a** Developer,
**I want** the extension to activate automatically when I open a VS Code window,
**So that** I don't have to manually run a command to start the check.

*Acceptance Criteria:*
- [ ] Extension activates on `onStartupFinished` or `workspaceContains:*`.
- [ ] Debug console logs "Agent Init Active".

*Story Points:* 2

---

### Epic 2: Context Detection (The Watcher)
**Goal:** Intelligently detect if a project needs initialization.

#### Story 2.1: Missing File Detection
**As a** System,
**I want** to scan the root directory for `.agent` folder and `.cursorrules` file,
**So that** I can determine if initialization is required.

*Acceptance Criteria:*
- [ ] Returns `true` if files are missing.
- [ ] Returns `false` if files exist.
- [ ] Does not scan subdirectories (performance).

*Story Points:* 3

---

### Epic 3: User Interaction
**Goal:** Respect user consent.

#### Story 3.1: Initialization Prompt
**As a** User,
**I want** to be asked before any files are added to my project,
**So that** I maintain control over my workspace.

*Acceptance Criteria:*
- [ ] Display "Information Message" modal.
- [ ] Options: "Initialize", "Ignore".
- [ ] If "Ignore" is clicked, do not ask again for this session.

*Story Points:* 3

---

### Epic 4: Content Delivery
**Goal:** Deliver the latest standards.

#### Story 4.1: Fetch Latest Standards
**As a** Developer,
**I want** the extension to download the *latest* version of rules from GitHub,
**So that** I don't have to update the extension just to get new rule templates.

*Acceptance Criteria:*
- [ ] GET request to `antigravity-setup/main`.
- [ ] Handle 404/500 errors gracefully.

*Story Points:* 5

#### Story 4.2: Write to Disk
**As a** System,
**I want** to write the fetched content to `.cursorrules` and `.agent/`,
**So that** the AI can immediately read them.

*Acceptance Criteria:*
- [ ] Create `.agent/` directory if not exists.
- [ ] Write file content with UTF-8 encoding.
- [ ] Show "Initialization Complete" message.

*Story Points:* 5

---

### Epic 5: Error Handling
**Goal:** Provide graceful degradation on failures.

#### Story 5.1: Network Error Handling
**As a** User,
**I want** to see a clear error message when network fails,
**So that** I understand what went wrong and how to fix it.

*Acceptance Criteria:*
- [ ] Show toast notification for network errors.
- [ ] Display actionable error message.
- [ ] Log error for debugging.

*Story Points:* 3

#### Story 5.2: Permission Error Handling
**As a** User,
**I want** to be informed if files cannot be written,
**So that** I can fix permission issues.

*Acceptance Criteria:*
- [ ] Detect write permission errors.
- [ ] Show clear error message with resolution steps.
- [ ] Do not crash the extension.

*Story Points:* 2

---

### Epic 6: Command Palette (Future)
**Goal:** Provide manual control options.

#### Story 6.1: Manual Initialize Command
**As a** User,
**I want** to manually trigger initialization from command palette,
**So that** I can force re-initialization when needed.

*Acceptance Criteria:*
- [ ] Register `agentInit.initialize` command.
- [ ] Command appears in command palette.
- [ ] Works even if standards exist.

*Story Points:* 2

#### Story 6.2: View Status Command
**As a** User,
**I want** to check current AI standards status,
**So that** I know if initialization is needed.

*Acceptance Criteria:*
- [ ] Register `agentInit.checkStatus` command.
- [ ] Show current status in output channel.
- [ ] Display file locations if initialized.

*Story Points:* 2

---

## 4. Non-Functional Requirement Stories

### NFR 1: Performance
**As a** User,
**I want** the extension to not slow down my IDE,
**So that** I can work without frustration.

*Acceptance Criteria:*
- [ ] Extension activation < 100ms
- [ ] Detection process < 500ms
- [ ] No UI blocking during operations

### NFR 2: Security
**As a** Security Lead,
**I want** the extension to only fetch text files,
**So that** malicious code cannot be injected.

*Acceptance Criteria:*
- [ ] Reject binary files
- [ ] Validate content type
- [ ] Use sandboxed file operations

### NFR 3: Reliability
**As a** User,
**I want** the extension to handle errors gracefully,
**So that** my IDE never crashes.

*Acceptance Criteria:*
- [ ] No unhandled exceptions
- [ ] All errors logged
- [ ] User-friendly error messages

---

## 5. Use Cases

### UC-01: Initialize New Project
1.  **Actor:** Alex (User)
2.  **Precondition:** Opens a fresh folder `my-new-app` in VS Code.
3.  **Flow:**
    -   Extension detects missing `.cursorrules`.
    -   Extension shows "Initialize Standards?" prompt.
    -   Alex clicks "Initialize".
    -   Extension fetches data from GitHub.
    -   Extension writes files.
    -   Extension notifies "Setup Complete".
4.  **Postcondition:** Files exist, AI context is active.

### UC-02: Ignore Initialization
1.  **Actor:** Jamie (User)
2.  **Precondition:** Opens an old legacy project.
3.  **Flow:**
    -   Extension detects missing files.
    -   Extension shows prompt.
    -   Jamie clicks "Ignore".
    -   Extension suppresses further checks for this session.
4.  **Postcondition:** No files changed.

### UC-03: Network Error
1.  **Actor:** Sam (User)
2.  **Precondition:** No internet connection.
3.  **Flow:**
    -   Extension detects missing files.
    -   Extension shows prompt.
    -   User clicks "Initialize".
    -   Extension attempts GitHub fetch.
    -   Network timeout occurs.
    -   Extension shows error: "Unable to fetch standards. Check internet connection."
4.  **Postcondition:** User notified, no files written.

### UC-04: Permission Denied
1.  **Actor:** Alex (User)
2.  **Precondition:** Folder with read-only permissions.
3.  **Flow:**
    -   Extension detects missing files.
    -   User clicks "Initialize".
    -   Extension attempts write.
    -   Permission error occurs.
    -   Extension shows: "Write permission denied. Check folder permissions."
4.  **Postcondition:** User notified, no files written.

### UC-05: Re-initialization
1.  **Actor:** Jamie (User)
2.  **Precondition:** Already initialized project.
3.  **Flow:**
    -   User runs Command Palette > "Agent Init: Initialize"
    -   Extension shows: "Standards already exist. Overwrite?"
    -   User confirms.
    -   Extension overwrites files.
    -   Extension shows: "Standards updated."
4.  **Postcondition:** Files updated with latest templates.

---

## 6. Testing Scenarios

### TS-01: Happy Path
1. Open VS Code with new folder
2. Extension activates
3. Prompt appears
4. Click Initialize
5. Files created
6. Success message shown

### TS-02: Network Failure
1. Open VS Code with new folder
2. Disconnect internet
3. Extension activates
4. Prompt appears
5. Click Initialize
6. Error message shown
7. Extension does not crash

### TS-03: Permission Error
1. Open VS Code with read-only folder
2. Extension activates
3. Prompt appears
4. Click Initialize
5. Permission error shown
6. Extension does not crash

### TS-04: Ignore Prompt
1. Open VS Code with new folder
2. Extension activates
3. Prompt appears
4. Click "Ignore"
5. No files created
6. No prompt on subsequent folder opens

---

## 7. Post-MVP Stories (Future Phases)

### Epic 7: Context Adaptation (Phase 2)
- Language Detection from `package.json`, `go.mod`, etc.
- Language-specific template selection

### Epic 8: Standard Guard (Phase 3)
- File watcher for drift detection
- Auto-repair capability

### Epic 9: Enterprise Sync (Phase 3)
- Private repository support
- Custom source configuration

---

## 8. Definition of Done

Each story must meet the following criteria:
- [ ] Code implemented
- [ ] Unit tests written (80% coverage)
- [ ] Integration tests passed
- [ ] Code reviewed by peers
- [ ] Documentation updated
- [ ] Acceptance criteria met
