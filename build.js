/**
 * Chicken Shoarma Tycoon – Build Script
 *
 * Kopieert alle benodigde bestanden naar de /dist map,
 * klaar om te deployen naar GitHub Pages of elke andere
 * statische webserver.
 */

const fs = require("fs");
const path = require("path");

const DIST = path.join(__dirname, "dist");
const SRC = __dirname;

// Bestanden die naar dist moeten worden gekopieerd
const FILES_TO_COPY = ["index.html", "style.css", "game.js"];

// --- setup -------------------------------------------------------------------
if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true, force: true });
}
fs.mkdirSync(DIST, { recursive: true });

// --- copy --------------------------------------------------------------------
for (const file of FILES_TO_COPY) {
  const src = path.join(SRC, file);
  const dest = path.join(DIST, file);

  if (!fs.existsSync(src)) {
    console.warn(`⚠  ${file} niet gevonden, overgeslagen.`);
    continue;
  }

  fs.copyFileSync(src, dest);
  const size = fs.statSync(dest).size;
  console.log(`✅  ${file}  →  dist/${file}  (${(size / 1024).toFixed(1)} KB)`);
}

// --- CNAME (optioneel – vul hier je domein in) ------------------------------
// const cname = "jouwdomein.nl";
// fs.writeFileSync(path.join(DIST, "CNAME"), cname);
// console.log(`✅  CNAME  →  ${cname}`);

// --- klaar -------------------------------------------------------------------
console.log("\n🎉  Build voltooid! Bestanden staan in /dist.");
console.log("📦  Gebruik 'npx serve dist' om lokaal te previewen.");
console.log("🚀  Push naar GitHub; de Actions workflow deployt automatisch.\n");