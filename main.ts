// The Funniest AI Out-of-Office Reply — writes our one-liner to /output/entry.txt.
// Deterministic: the line lives in entry.txt next to this file and is
// copied byte for byte, so every run produces identical output.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

mkdirSync("/output", { recursive: true });
copyFileSync(join(here, "entry.txt"), "/output/entry.txt");

// Verify the write: read the output back and compare it byte for byte
// with the source, so a partial or corrupted copy fails loudly instead
// of submitting the wrong text.
const written = readFileSync("/output/entry.txt");
const source = readFileSync(join(here, "entry.txt"));
if (!written.equals(source)) {
  console.error("entry.txt verification failed: /output copy differs from source");
  process.exit(1);
}
