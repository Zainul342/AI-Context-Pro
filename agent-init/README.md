<div align="center">
  <img src="https://raw.githubusercontent.com/Zainul342/AI-Context-Pro/main/agent-init/resources/icon.png" width="120" alt="Agent Init Logo">
  <h1 style="margin: 0.4em 0 0.2em; font-weight: 800; letter-spacing: -0.05em;">AI Context Pro: Agent Init</h1>
  <p style="color: #a1a1aa; font-size: 1.1rem; max-width: 550px; margin: 0 auto 1.5rem; line-height: 1.6;">
    I built this because honestly.. copying rules manually is for people who have more time than me. Standardize your AI context in seconds!!
  </p>

  <p>
    <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="Version">
    <img src="https://img.shields.io/badge/license-MIT-slate?style=flat-square" alt="License">
    <img src="https://img.shields.io/badge/PRs-welcome-violet?style=flat-square" alt="PRs Welcome">
  </p>
</div>

<hr style="border: 0; height: 1px; background: linear-gradient(to right, transparent, #4b5563, transparent); margin: 2.5rem 0;">

<details open>
<summary><b>Navigation</b></summary>

- [The Mess](#-why-the-mess)
- [How it works](#-how-it-works)
- [Quick Start](#-quick-start)
- [TODO later](#-todo-later)

</details>

<br>

## 🌪 Why? (The Mess)
Tbh, I got really tired of manually setting up `.cursorrules` and `.agent` directories for every small project I spin up. If you're like me, you probably have some folder somewhere full of markdown files that you copy-paste into every repo just so your AI agents (Cursor, Windsurf, whatever) doesn't start hallucinating after 10 messages.

**Agent Init** fixes this. One command and your workspace is standardized. Its simple and it works.. No more wondering "Wait, did I include the security mandate in this project?"

## ✨ Features (mostly for my own sanity)
- **Automatic Scaffolding** -- Dumps the `.agent/` directory with rules, workflows, and skills.
- **Remote Sync** -- Pulls from GitHub so you dont use outdated rules from 2024 (gross).
- **Fail-safe Fallback** -- I included a 100kb blob inside the extension just for this so it works on planes or with bad wifi!!
- **Drift Detection** -- Kinda monitors if your rules are getting "weird".
- **Cursor Sync** -- It updates `.cursorrules` globally. Pretty cool.

## 🕹 Quick Start
1. `Ctrl+Shift+P` (or `Cmd+Shift+P` for Mac folks).
2. Type `Agent Init: Initialize Standards`.
3. Press enter and just wait.. thats it!!

## 📂 Structure it creates
```text
.
├── .agent/
│   ├── rules/          # The "don't do stupid stuff" files
│   ├── workflows/      # How we move tickets
│   └── skills/         # Specialized AI brains
└── .cursorrules        # The glue
```

## 🧠 Why I built this
Standardisation is key (standardization? idk, I use both). Dealing with AI "context rot" where the model forgets your I/O isolation rules after a while is a nightmare. This ensures the prompt always starts with a solid foundation. 

Notes: I built this named after my cat who likes to walk on my keyboard whenever I try to write code. Its probably fine on ARM64 tho.. let me know if it breaks lol

## 📝 TODO later
- [ ] Implement of proper versioning (rn it just says "latest" lol)
- [ ] Fix that one weird flicker in the UI-Controller
- [ ] Add more humor to the fallback data!!

---

## 📚 Technical Docs

If you're a contributor or just curious about how this mess works:

- **[Product Requirements (PRD)](../docs/PRD.md)**
- **[System Architecture](../docs/System_Architecture.md)**
- **[Technical Specifications](../docs/Technical_Specifications.md)**
- **[Risk & Scalability](../docs/Risk_Security_Scalability.md)**

## License 
MIT. Do whatever you want with it. 

---
Made with ❤️ by [Zainul Mutaqin](https://github.com/Zainul342) - hope this helps someone else!
