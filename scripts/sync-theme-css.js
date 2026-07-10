const fs = require("fs");
const path = require("path");
const { getCssVariables } = require("../src/lib/theme.js");

const cssPath = path.join(__dirname, "../src/styles/theme.css");
const variables = getCssVariables();

const lines = Object.entries(variables).map(([name, value]) => `  ${name}: ${value};`);

const content = `/* Generated from src/lib/theme.js — run: pnpm theme:sync */
:root {
${lines.join("\n")}
}
`;

fs.writeFileSync(cssPath, content, "utf8");
console.log("Synced theme.css from theme.js");
