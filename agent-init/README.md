<div align="center">
  <img src="https://raw.githubusercontent.com/Zainul342/AI-Context-Pro/main/agent-init/resources/icon.png" width="120" alt="Agent Init Logo">
  <h1 style="margin: 0.4em 0 0.2em; font-weight: 800; letter-spacing: -0.05em;">AI Context Pro: Agent Init</h1>
  <p style="color: #a1a1aa; font-size: 1.1rem; max-width: 550px; margin: 0 auto 1.5rem; line-height: 1.6;">
    Stop manually copying rules. Let the machine initialize your AI standards so you can actually get back to coding.
  </p>

  <p>
    <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="Version">
    <img src="https://img.shields.io/badge/license-MIT-slate?style=flat-square" alt="License">
    <img src="https://img.shields.io/badge/PRs-welcome-violet?style=flat-square" alt="PRs Welcome">
  </p>
</div>

<hr style="border: 0; height: 1px; background: linear-gradient(to right, transparent, #4b5563, transparent); margin: 2.5rem 0;">

<details open>
<summary><b>Quick Nav</b></summary>

- [The Mess](#-the-mess)
- [How it works](#-how-it-works)
- [Features](#-features)
- [Quick Start](#-quick-start)
- [TODO later](#-todo-later)

</details>

<br>

## 🌪 The Mess
Tbh, I got tired of manually setting up `.cursorrules` and `.agent` directories every time I started a new project. If you're like me, you probably have a "god-folder" of markdown files you copy-paste into every repo just so your AI agent (Cursor, Windsurf, whatever) doesn't start hallucinating about your architecture.

**Agent Init** fixes this. One command, and your workspace is standardized. No more "Wait, did I include the security mandate in this project?"

## � Features (mostly for my own sanity)
- **Automatic Scaffolding**: Dumps the `.agent/` directory with rules, workflows, and skills.
- **Remote Sync**: Pulls from GitHub so you don't use outdated rules from 2024.
- **Fail-safe Fallback**: Embedded scripts in case you're working from a plane or your internet is acting up. (Yeah, I included a 100kb blob inside the extension just for this). 
- **Drift Detection**: Kinda monitors if your rules are getting "weird".
- **Cursor Sync**: Updates `.cursorrules` globally.

## � Quick Start
1. `Ctrl+Shift+P` (or `Cmd+Shift+P` for Mac folks).
2. Type `Agent Init: Initialize Standards`.
3. Press enter and let it do the boring stuff.

## 📂 Structure it creates
```text
.
├── .agent/
│   ├── rules/          # The "don't do stupid stuff" files
│   ├── workflows/      # How we actually move tickets
│   └── skills/         # Specialized AI brains
└── .cursorrules        # The glue
```

## 🧠 Why I built this
Standardisation (or standardization? idk, I use both) is key. Dealing with AI "context rot" where the model forgets your I/O isolation rules after 50 messages is a nightmare. This ensures the prompt always starts with a solid foundation. 

I built this named after my cat who likes to walk on my keyboard whenever I try to write markdown. If it bugs out on ARM64, let me know, though it should be fine.

## 📝 TODO later
- [ ] implementation of proper versioning (rn it just says "latest" lol)
- [ ] fix that one weird flicker in the UI-Controller
- [ ] add more humor to the fallback data

---

## License 
MIT. Do whatever you want with it. 

Made with ❤️ by [Zainul Mutaqin](https://github.com/Zainul342) - tbh mostly built this for my own workflows but hope it helps.
