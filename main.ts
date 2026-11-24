// "The One-Line Exit" — a resignation letter that fits on one line.
//
// The whole entry is a single joke, so this program is deliberately small:
// it holds the letter, checks it against the competition gate, writes it
// to entry.txt, then reads the file back to prove what landed on disk is
// exactly what passed the check. Nothing else is written anywhere.
//
// Runtime: Node 22, standard library only.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The gate, copied from the competition kit: the file must be UTF-8 text
// of 1 to 140 characters and not only whitespace. One line, obviously —
// a second line would be a second line of the letter, and there is none.
const GATE_MIN_CHARS = 1;
const GATE_MAX_CHARS = 140;

// The letter itself. The setup is a routine resignation; the turn is the
// confession in the middle — six years of guessing — and the sign-off
// twist is that today, of all days, he feels lucky. Specific job, real
// letter shape, and the punchline is the part nobody saw coming.
const RESIGNATION_LINE =
  "Dear team, I resign as your bomb squad's wire-cutter — I'm colorblind, I've been guessing for six years, and today I feel lucky.";

// The grader sets no output variable, so fall back to /output; local runs
// can point MAKEFUN_OUTPUT_DIR anywhere writable.
function outputFilePath() {
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  return join(dir, "entry.txt");
}

// Reject anything the sealed scorer would reject, plus anything that is
// not a single line. Throwing here is better than writing a dead entry.
function assertInsideGate(text, origin) {
  const chars = [...text].length;
  if (chars < GATE_MIN_CHARS || chars > GATE_MAX_CHARS) {
    throw new Error(
      `${origin}: ${chars} characters is outside the gate (${GATE_MIN_CHARS}-${GATE_MAX_CHARS})`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error(`${origin}: entry must not be only whitespace`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error(`${origin}: entry must be exactly one line`);
  }
}

function main() {
  assertInsideGate(RESIGNATION_LINE, "draft line");

  const target = outputFilePath();
  mkdirSync(join(target, ".."), { recursive: true });
  writeFileSync(target, RESIGNATION_LINE, "utf8");

  // Trust nothing: read the file back and gate-check what is actually
  // on disk, byte for byte the line we meant to send.
  const written = readFileSync(target, "utf8");
  assertInsideGate(written, "written file");
  if (written !== RESIGNATION_LINE) {
    throw new Error("written file does not match the intended line");
  }

  console.log(`entry.txt: ${[...written].length} chars -> ${target}`);
  console.log(written);
}

main();
