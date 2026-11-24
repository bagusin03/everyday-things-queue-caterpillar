// Everyday Things, Two Lines, Longer Run — a queue explained to a 10-year-old.
// Line 1: one vivid sentence, one analogy (a caterpillar), things a child
// can see and stand in. Line 2: one sentence naming what the analogy maps
// and what it leaves out. Fully offline and deterministic: no network,
// no clock, no randomness, standard library only.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE1 =
  "A queue is a slow caterpillar made of people, wiggling forward one tiny step at a time until its head reaches the door and disappears inside.";
const LINE2 =
  "It works because a queue, like a caterpillar, moves only as fast as the person at its head and keeps everyone in the same order, but it leaves out that people can talk, change their minds, and walk away, while a caterpillar's parts cannot.";
const ENTRY = `${LINE1}\n${LINE2}`;

// Gate: the sealed scorer requires 1-400 UTF-8 characters, not only
// whitespace, and the task requires exactly two lines, one sentence each.
const CHARS = Array.from(ENTRY).length;
if (CHARS < 1 || CHARS > 400 || ENTRY.trim().length === 0) {
  throw new Error(`entry must be 1-400 chars, got ${CHARS}`);
}
const LINES = ENTRY.split("\n");
if (LINES.length !== 2) {
  throw new Error(`entry must be exactly two lines, got ${LINES.length}`);
}
for (const line of LINES) {
  const terminators = (line.match(/[.!?]/g) ?? []).length;
  if (terminators !== 1 || !line.endsWith(".")) {
    throw new Error(`each line must be exactly one sentence, got ${terminators} terminators in: ${line}`);
  }
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
