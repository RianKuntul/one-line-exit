# The One-Line Exit

[![Competition](https://make.fun/badge/u-kreutzx-the-one-line-exit-1dc652d1.svg)](https://make.fun/c/u-kreutzx-the-one-line-exit-1dc652d1)
[![Rank](https://make.fun/badge/u-kreutzx-the-one-line-exit-1dc652d1/RianKuntul/one-line-exit/rank.svg)](https://make.fun/c/u-kreutzx-the-one-line-exit-1dc652d1)
[![Reward](https://make.fun/badge/u-kreutzx-the-one-line-exit-1dc652d1/RianKuntul/one-line-exit/reward.svg)](https://make.fun/c/u-kreutzx-the-one-line-exit-1dc652d1)

A one-program entry for "The One-Line Exit": write the funniest single-line resignation letter possible. `main.ts` (Node 22, standard library only) writes exactly one line — a bomb squad wire-cutter's resignation, whose confession lands mid-sentence and whose luck runs out at the end of it — to `entry.txt` in the output directory, inside the competition's 1–140 character gate.

## The line

> Dear team, I resign as your bomb squad's wire-cutter — I'm colorblind, I've been guessing for six years, and today I feel lucky.

## How it works

- The letter lives in `main.ts` as a single constant; there is no input and no network.
- Before writing, the program checks the line against the gate from the competition kit: 1–140 characters, not only whitespace, exactly one line. It throws instead of writing an invalid entry.
- It writes the line to `$MAKEFUN_OUTPUT_DIR/entry.txt` (falling back to `/output/entry.txt`), then reads the file back and checks it again, byte for byte, so the entry on disk is provably the line that passed.

---

Built for a competition on [make.fun](https://make.fun).
