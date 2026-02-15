const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/fallback-data.ts');
console.log(`Reading file from ${filePath}`);
let content = fs.readFileSync(filePath, 'utf8');

const replacements = {
    '".agent/rules/api-design-principles.md"': "---\\ntrigger: model_decision\\ndescription: When implementing REST/HTTP APIs (endpoints, handlers, middleware, or response formatting)\\n---\\n\\n## API Design Principles (The Funny Edition)\\n\\n### RESTful API Standards\\n\\n**Resource-Based URLs:**\\n\\n- Use plural nouns: \`/api/{version}/users\` (because users satisfy the need for company). \\n- Hierarchical relationships: \`/api/{version}/users/:userId/orders\` (order matters, chaos does not). \\n- **AVOID VERBS IN URLS**: \`/api/{version}/getUser\` ❌ -> If you use verbs, a kitten cries somewhere. \`/api/{version}/users/:id\` ✅\\n\\n**HTTP Methods (The Sacred Verbs):**\\n\\n- **GET**: Read (safe, idempotent, like looking but not touching).\\n- **POST**: Create (not idempotent, creates life... or resources).\\n- **PUT**: Replace (idempotent, swap it out like Indiana Jones).\\n- **PATCH**: Partial update (idempotent, fix it with duct tape).\\n- **DELETE**: Remove (idempotent, maximize entropy).\\n\\n**Versioning:**\\n\\n- URL path versioning: \`/api/v1/users\` (because v0 was a disaster).\\n\\n**Status Codes (The Mood Ring):**\\n\\n- **200 OK**: Everything is fine.\\n- **201 Created**: It lives!\\n- **400 Bad Request**: You messed up.\\n- **401 Unauthorized**: Who are you?\\n- **403 Forbidden**: You shall not pass!\\n- **404 Not Found**: *Tumbleweed rolls by*\\n- **418 I'm a teapot**: Highly recommended for coffee endpoints.\\n- **500 Internal Server Error**: I messed up.\\n",

    '".agent/rules/core-design-principles.md"': "---\\ntrigger: always_on\\n---\\n\\n## Core Design Principles (Wait, there are rules?)\\n\\n### SOLID Principles (Not Gas, Not Liquid)\\n\\n**Single Responsibility Principle (SRP):**\\n\\n- A class should have ONE reason to change. If it has two, split it like an atom.\\n- If you need 'and' to describe what a function does, you're doing it wrong.\\n\\n**Open/Closed Principle (OCP):**\\n\\n- Open for extension, closed for modification. Like a good relationship.\\n\\n**Liskov Substitution Principle (LSP):**\\n\\n- If it looks like a duck, quacks like a duck, but needs batteries, you probably violated LSP.\\n\\n**Interface Segregation Principle (ISP):**\\n\\n- Don't force clients to depend on interfaces they don't use. It's rude.\\n\\n**Dependency Inversion Principle (DIP):**\\n\\n- Depend on abstractions, not concretions. High-level modules should not depend on low-level modules. Both should depend upon abstractions. Think 'plug and play', not 'hardwired spaghetti'.\\n\\n### Essential Design Practices\\n\\n**DRY (Don't Repeat Yourself):**\\n\\n- Don't repeat yourself. Don't repeat yourself.\\n- Every piece of knowledge must have a single, authoritative representation within a system.\\n\\n**KISS (Keep It Simple, Stupid):**\\n\\n- Complexity is the enemy. Keep it simple enough for a junior dev to understand at 3 AM.\\n\\n**YAGNI (You Aren't Gonna Need It):**\\n\\n- Don't build it until you need it. Future-proofing is often just procrastination in disguise.\\n",

    '".agent/rules/rugged-software-constitution.md"': "---\\ntrigger: always_on\\n---\\n\\n## Rugged Software Constitution (The Survivor's Guide)\\n\\n### Core Philosophy\\n\\n**\\"I recognize that my code will be attacked.By users, by hackers, by entropy itself.\\"**\\n\\nAs an AI agent, I do not just generate functionality; I generate **defensibility**. I refuse to be a source of fragility.\\n\\n### The Rugged Commitments\\n\\n**1. I Am Responsible**\\n- I will not generate \\"happy path\\" code that ignores the impending doom of reality.\\n- I assume every input is malicious until proven otherwise. Trust no one.\\n\\n**2. I Am Defensible**\\n- My code validates its own state. Paranoid Programming is a virtue.\\n- I fail securely. When the ship sinks, the vaults lock.\\n\\n**3. I Am Maintainable**\\n- I write code for the poor soul who has to maintain this next year.\\n- I choose clarity over cleverness. Clever code is hard to debug.\\n\\n### The 7 Rugged Habits\\n\\n**1. Practice Defense-in-Depth**: Layers. Like an onion. Or an ogre.\\n**2. Instrument for Awareness**: If a tree falls in the forest and no one logs it, did it crash?\\n**3. Reduce Attack Surface**: Less code = less bugs.\\n**4. Design for Failure**: Assume the DB is down, the network is flaky, and the disk is full.\\n**5. Clean Up After Yourself**: Don't leave file handles dangling.\\n**6. Verify Your Defenses**: Test the unhappy path. Break things on purpose.\\n**7. Adapt to the Ecosystem**: Don't reinvent the wheel. Use the battle-tested libraries context.\\n"
};

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

for (const [key, replacementValue] of Object.entries(replacements)) {
    // Regex to match: key: "VALUE"
    // We need to match the key exactly, then : space " then the content until the next " NOT preceded by \
    const safeKey = escapeRegExp(key);
    const regexString = `(${safeKey}:\\s*")((?:[^"\\\\]|\\\\.)*)(")`;
    const re = new RegExp(regexString);

    if (re.test(content)) {
        // Use a function for replacement to avoid issues with $ in the replacement string if any
        content = content.replace(re, (match, p1, p2, p3) => {
            return p1 + replacementValue + p3;
        });
        console.log(`Replaced content for ${key}`);
    } else {
        console.log(`Could not find key ${key}`);
    }
}

fs.writeFileSync(filePath, content);
console.log('Update complete.');
