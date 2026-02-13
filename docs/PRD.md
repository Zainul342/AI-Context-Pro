# Product Requirements Document (PRD)
**Project Name:** Agent Init
**Version:** 0.1 (MVP)
**Status:** Draft
**Last Updated:** 2026-02-13

## 1. Executive Summary
**Agent Init** is an IDE extension (VS Code/Cursor) designed to bridge the gap between ad-hoc "vibe coding" and professional, scalable software engineering. It automatically initializes the "Project Constitution" (specifically `.agent`, `.cursorrules`, and associated standards) when a new project folder is opened. This ensures AI agents operate with a clear, standardized technical context from the very first line of code, reducing hallucinations and setup friction.

## 2. Problem Statement
-   **Context Exhaustion:** AI agents often lose context or provide non-standard solutions when working in fresh projects without explicit guidelines.
-   **Manual Friction:** The process of manually setting up AI instruction files (downloading, copying from repo, configuring) is repetitive and often skipped by developers, leading to inconsistent project structures.
-   **Lack of Standardization:** Without enforced standards, AI-generated code can vary significantly in quality and style, making long-term maintenance difficult for teams.

## 3. Product Vision
To build a "Zero-Friction" initialization tool that provides every AI agent with a professional engineering roadmap, enabling developers to build scalable, enterprise-ready software with the ease of AI assistance.

## 4. Target Audience
-   **Primary:** Professional Developers using AI-powered IDEs (Cursor, VS Code) who value code quality and structure.
-   **Secondary:** Tech Leads and Architects who need to enforce coding standards across their teams' AI workflows.
-   **Tertiary:** Solopreneurs building complex MVPs who need to maintain architectural integrity as their codebase grows.

## 5. Success Metrics (KPIs)
-   **Setup Time:** Reduction of project initialization time from minutes (manual terminal commands) to < 5 seconds (automated).
-   **Adoption Rate:** % of new folders opened that successfully initialize the standard.
-   **User Retention:** Continued use of the extension across multiple projects.

### 5.1 Success Metrics Details
| Metric | Target | Measurement Method |
|--------|--------|---------------------|
| Initialization Time | < 5 seconds | Time from click to success notification |
| Detection Latency | < 500ms | Time from workspace open to detection complete |
| Success Rate | > 95% | % of successful initializations |
| Error Recovery | < 30 seconds | Time to show error message on failure |

## 6. Functional Requirements (MVP Scope)

### FR.1: Context Detection (The Watcher)
-   The system must automatically detect when a workspace or folder is opened in the IDE.
-   It must check for the existence of critical standard files (e.g., `.agent/`, `.cursorrules`) in the root directory.

**Acceptance Criteria:**
-   [ ] Extension triggers on workspace open event
-   [ ] Checks `.agent/` directory existence
-   [ ] Checks `.cursorrules` file existence
-   [ ] Returns boolean result within 500ms
-   [ ] Does not block IDE startup

### FR.2: User Interaction (The Gatekeeper)
-   If standard files are missing, the system MUST NOT write files silently.
-   It must trigger a non-intrusive notification (pop-up) asking for permission: *"AI Standards not detected. Initialize Agent Init standards?"*
-   Options provided: `[Initialize]` and `[Dismiss/Later]`.

**Acceptance Criteria:**
-   [ ] Shows non-blocking notification
-   [ ] Has "Initialize" action button
-   [ ] Has "Dismiss/Later" action button
-   [ ] Does NOT auto-write files without confirmation
-   [ ] Respects user's dismiss choice for session

### FR.3: Remote Synchronization (The Bridge)
-   Upon user confirmation (`Initialize`), the system must fetch the latest standard templates directly from the `antigravity-setup` GitHub repository.
-   **Constraint:** Must use the latest version from `main` branch to ensure standards are up-to-date.

**Acceptance Criteria:**
-   [ ] Fetches from `irahardianto/antigravity-setup`
-   [ ] Uses `main` branch by default
-   [ ] Handles 404 error gracefully
-   [ ] Handles network timeout (30s max)
-   [ ] Shows loading indicator during fetch

### FR.4: File Generation (The Builder)
-   The system must write the fetched content to the local file system.
-   It must preserve any existing non-conflicting files (though MVP assumes empty/non-standard folder).
-   A success notification must be displayed upon completion.

**Acceptance Criteria:**
-   [ ] Creates `.agent/` directory recursively
-   [ ] Creates `.agent/rules/` subdirectory
-   [ ] Creates `.agent/skills/` subdirectory
-   [ ] Creates `.agent/workflows/` subdirectory
-   [ ] Writes `.cursorrules` file to project root
-   [ ] Writes content to `.agent/rules/` (coding standards, architectural guidelines)
-   [ ] Writes content to `.agent/skills/` (AI agent capabilities/competencies)
-   [ ] Writes content to `.agent/workflows/` (workflow definitions)
-   [ ] Preserves existing non-conflicting files
-   [ ] Shows success notification after all files written

## 7. Non-Functional Requirements
-   **Performance:** The detection process must be lightweight and not delay the IDE startup time.
-   **Resilience:** The system must handle network failures (e.g., cannot reach GitHub) gracefully with an error message, without crashing the IDE.
-   **Security:** The extension must only write to the open workspace scope and not access system files outside the project root.

## 8. Future Roadmap (Post-MVP)

### Phase 2: Context Adaptation
**Target:** v0.2-v0.3
-   **Language Detection:** Automatically detect project language (Node.js, Python, Go, Rust, Java) from root files
-   **Tailored Rules:** Fetch language-specific rule files based on detection
-   **Configuration:** User preferences and custom source URL support

### Phase 3: Standard Guard & Enterprise
**Target:** v0.4-v0.5
-   **File Watcher:** Monitor `.agent/` and `.cursorrules` for changes
-   **Drift Detection:** Alert user when files are modified or deleted
-   **Auto-Repair:** One-click restoration from cached/remote versions
-   **Enterprise Sync:** Private repository support for custom standards
-   **Team Configuration:** Organization-specific rule sets

### Phase 4: Advanced Features
**Target:** v1.0+
-   **Template Versioning:** Semantic versioning support with rollback capability
-   **Offline Mode:** Bundled fallback templates
-   **Multi-Workspace Support:** Handle multiple folders in one window
-   **Command Palette Integration:** Manual commands for initialize, repair, view-status

## 9. Dependencies

### 9.1 Platform Requirements
| Component | Requirement | Justification |
|-----------|-------------|---------------|
| VS Code | v1.80.0+ | Minimum version for API compatibility |
| Node.js | 18+ | Included with VS Code bundler |
| TypeScript | 5.0+ | For strict mode support |

### 9.2 External Dependencies
| Service | Requirement | Justification |
|---------|-------------|---------------|
| Internet Connection | Required | For fetching templates from GitHub |
| GitHub Raw Content | Required | Source of template files |

### 9.3 Internal Dependencies
- Extension follows modular architecture with separate services (Watcher, GitHub Client, File Handler)
- No external npm packages required (uses native fetch API)

## 10. Out of Scope (MVP)

The following features are explicitly NOT included in MVP scope:

| Feature | Reason | Planned Phase |
|---------|--------|---------------|
| Multi-language detection | Phase 2 | v0.2 |
| Private/enterprise repo support | Phase 3 | v0.5 |
| File watcher / Standard Guard | Phase 3 | v0.4 |
| Template versioning | Phase 4 | v1.0 |
| Offline bundled templates | Phase 4 | v1.0 |
| Configuration UI/settings panel | Phase 2 | v0.3 |
| CLI version (non-extension) | Different product | N/A |
| Support for other IDEs (JetBrains, etc.) | Out of focus | N/A |

## 11. Glossary

| Term | Definition |
|------|------------|
| **Project Constitution** | Kumpulan file konfigurasi AI Agent (`.agent/`, `.cursorrules`) yang mendefinisikan aturan dan konteks project |
| **Flag Files** | File-file kritis yang menjadi penanda apakah standar sudah diinisialisasi (`.agent/`, `.cursorrules`) |
| **Standard Guard** | Fitur untuk memantau dan mencegah modifikasi tidak sengaja pada file standar |
| **Context Adaptation** | Kemampuan untuk mendeteksi bahasa pemrograman dan menyesuaikan aturan |
| **Enterprise Sync** | Kemampuan untuk menggunakan repository privat untuk standar kustom |
| **Raw GitHub Content** | File yang diambil langsung dari GitHub repository tanpa melalui API |
| **Workspace Scope** | Batasan operasi extension hanya pada folder workspace yang terbuka |
| **Drift** | Perubahan yang tidak disengaja pada file standar dari state yang diharapkan |

## 12. Open Questions

| # | Question | Status | Action Needed |
|---|----------|--------|---------------|
| 1 | Apakah `.cursorrules` nama file final atau bisa diganti? | Open | Need decision |
| 2 | Berapa banyak file yang akan di-download dari remote? | Open | Depends on remote repo structure |
| 3 | Bagaimana jika user membuka workspace dengan 100+ subfolder? | Open | Need performance testing |
| 4 | Apakah perlu support untuk workspace dengan multiple roots? | Open | MVP likely single root |
| 5 | Bagaimana handling jika user cancel di tengah-tengah operasi? | Open | Need to define behavior |
| 6 | Apakah perlu analytics/telemetry di MVP? | Open | Consider for Phase 2 |

## 13. Appendix

### Related Documents
- [System Architecture](./System_Architecture.md) - High-level technical design
- [Technical Specifications](./Technical_Specifications.md) - Implementation details
- [User Stories & Use Cases](./User_Stories_and_Use_Cases.md) - Feature breakdown
- [Risk & Security](./Risk_Security_Scalability.md) - Risk assessment

### Version History
| Version | Date | Changes |
|---------|------|---------|
| 0.1 | 2026-02-13 | Initial MVP draft |
