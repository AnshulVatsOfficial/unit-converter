// scripts/generatePriorityPairs.js
// Usage: node scripts/generatePriorityPairs.js
// Output: data/priorityPairs.json

const fs = require("fs");
const path = require("path");

const UNITS_PATH = path.join(process.cwd(), "data", "units.json");
const OUT_PATH = path.join(process.cwd(), "data", "priorityPairs.json");

// Config: how many top units per category to use for generating pairs.
// Increase to generate more pages. 8x8 per category => ~56 pairs per category (excluding same->same).
const TOP_PER_CATEGORY = 8; // tweak to control output size
const MAX_TOTAL = 500; // safety cap for total pairs written

if (!fs.existsSync(UNITS_PATH)) {
  console.error("Cannot find units.json at", UNITS_PATH);
  process.exit(1);
}

const unitsJson = JSON.parse(fs.readFileSync(UNITS_PATH, "utf8"));

const out = [];

for (const [category, catObj] of Object.entries(unitsJson)) {
  const unitKeys = Object.keys(catObj.units || {});
  if (unitKeys.length === 0) continue;

  // Heuristic for priority: prefer canonical/common names first.
  // We simply take the first TOP_PER_CATEGORY keys; reorder units.json if you want different priority.
  const top = unitKeys.slice(0, Math.min(unitKeys.length, TOP_PER_CATEGORY));

  for (let i = 0; i < top.length; i++) {
    for (let j = 0; j < top.length; j++) {
      if (i === j) continue; // skip same->same
      out.push({ category, from: top[i], to: top[j] });
      if (out.length >= MAX_TOTAL) break;
    }
    if (out.length >= MAX_TOTAL) break;
  }
  if (out.length >= MAX_TOTAL) break;
}

// Optional: dedupe (shouldn't be necessary) and sort for nice deterministic output
const uniq = [];
const seen = new Set();
for (const p of out) {
  const key = `${p.category}___${p.from}___${p.to}`;
  if (!seen.has(key)) {
    uniq.push(p);
    seen.add(key);
  }
}

fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
fs.writeFileSync(OUT_PATH, JSON.stringify(uniq, null, 2), "utf8");
console.log(`Wrote ${uniq.length} priority pairs to ${OUT_PATH}`);
