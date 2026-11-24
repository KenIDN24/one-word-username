// One Word, One Username, One Reward
// Entry: the entrant's own make.fun username, one word, nothing else.
// Gate: /output/entry.txt must be UTF-8 text, 1-30 characters,
// not only whitespace. This program writes exactly "kenidn24"
// (8 characters, no trailing newline, no @, no spaces, no gloss).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const USERNAME = "kenidn24";

function main(): void {
  // Layer 1: the entry is exactly the own handle, one word.
  if (!/^[A-Za-z0-9_-]+$/.test(USERNAME)) {
    throw new Error("username must be a single word");
  }
  const chars = [...USERNAME];
  if (chars.length < 1 || chars.length > 30) {
    throw new Error(`entry must be 1-30 characters, got ${chars.length}`);
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, USERNAME, "utf8");
  // Round-trip check: what lands on disk is byte-for-byte the handle.
  const back = readFileSync(outPath, "utf8");
  if (back !== USERNAME) {
    throw new Error(`round-trip mismatch: wrote ${JSON.stringify(USERNAME)} but disk holds ${JSON.stringify(back)}`);
  }
  console.log(`wrote ${outPath}: ${JSON.stringify(USERNAME)} (${chars.length} chars)`);
}

main();
