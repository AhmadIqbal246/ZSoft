const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "../src");

const replacements = [
  ["text-text-primary", "text-foreground"],
  ["hover:text-text-primary", "hover:text-foreground"],
  ["text-cyan", "text-accent"],
  ["text-violet", "text-accent"],
  ["border-violet", "border-foreground"],
  ["bg-violet", "bg-foreground"],
  ["hover:border-violet", "hover:border-foreground"],
  ["hover:text-violet", "hover:text-accent"],
  ["hover:text-cyan", "hover:text-accent"],
  ["focus:border-violet", "focus:border-accent"],
  ["focus:ring-violet", "focus:ring-accent"],
  ["focus:border-cyan", "focus:border-accent"],
  ["focus:ring-cyan", "focus:ring-accent"],
  ["bg-cyan", "bg-accent"],
  ["border-cyan", "border-accent"],
  ["hover:border-cyan", "hover:border-accent"],
  ["shadow-glow-cyan", "shadow-glow-accent"],
  ["via-violet", "via-foreground"],
  ["from-violet", "from-foreground"],
  ["to-violet", "to-foreground"],
  ["from-cyan", "from-accent"],
  ["to-cyan", "to-accent"],
  ["bg-[#080808]", "bg-base"],
  ["selection:bg-violet", "selection:bg-accent"],
  ["gradient-mesh-blob--violet", "gradient-mesh-blob--foreground"],
  ["gradient-mesh-blob--cyan", "gradient-mesh-blob--accent"],
  ["var(--color-violet)", "var(--color-accent)"],
  ['style={{ color: \'#b0b0b0\' }}', 'className="text-body"'],
  ['style={{ color: "#b0b0b0" }}', 'className="text-body"'],
  ['style={{ color: "#b0b0b0" }} className=', 'className="text-body '],
];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (!/\.(js|jsx)$/.test(entry.name)) continue;
    let content = fs.readFileSync(fullPath, "utf8");
    let changed = false;
    for (const [from, to] of replacements) {
      if (content.includes(from)) {
        content = content.split(from).join(to);
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(fullPath, content, "utf8");
      console.log("Updated:", fullPath);
    }
  }
}

walk(root);
