---
name: build-emotional-offwork-countdown
description: Use when Codex needs to create or extend a local emotional off-work countdown webpage, 下班倒计时, 摸鱼小网页, or screenshot-friendly countdown widget with staged copy, a sudden-demand reaction, Friday Mode, offline HTML/CSS/JavaScript, preview URLs, browser validation, and social-image screenshots. Excludes post titles, captions, hashtags, publishing, and unrelated productivity-app features.
---

# Build Emotional Off-work Countdown

Build a working webpage first. Treat personality copy as behavior, not decoration.

## Core contract

- Deliver `index.html`, `style.css`, and `script.js` that work by opening `index.html` directly.
- Keep the page single-screen, offline-capable, dependency-free, responsive, and screenshot-friendly.
- Use one huge tabular countdown as the visual center.
- Preserve existing modes when extending a project. Add personas through data and small CSS overrides, not a redesign.
- Keep visible copy conversational and brief. Avoid product language, AI language, dashboards, cards, complex settings, sound, and games.
- Do not create social-post titles, captions, hashtags, or publishing plans.

## Start from the bundled template

For a new project, run:

```powershell
python scripts/scaffold.py --out "<destination>"
```

If `python` is unavailable on Windows, load the workspace dependency paths and use the bundled Python executable.

The scaffold copies `assets/starter/` without overwriting existing files. For an existing project, inspect its HTML, CSS, JavaScript, tests, screenshots, and character assets first; patch in place.

## Workflow

1. Search GitHub for reusable countdown, date-mode, reduced-motion, and screenshot-testing patterns before implementation. Reuse ideas, not unnecessary dependencies.
2. Read [references/web-contract.md](references/web-contract.md) and translate the user's brief into:
   - target time and time zones;
   - interval boundaries;
   - normal copy;
   - sudden-demand copy;
   - optional Friday copy;
   - required preview timestamps and screenshot size.
3. Write failing Node tests for every exact boundary and persona override before changing production JavaScript.
4. Keep time and persona logic as exported pure functions. Keep DOM rendering and effects below that layer.
5. Use URL preview parameters so screenshots are deterministic:
   - `?preview=17:50`
   - `?previewEvent=17:50`
   - `?previewFriday=17:50`
   - `?previewFridayEvent=17:50`
6. Use `localStorage` only for the selected off-work time. Keep preview overrides in the URL and avoid hidden persistent state.
7. Add motion only for state transitions and feedback. Honor `prefers-reduced-motion`.
8. Validate with a real browser at desktop and mobile sizes. Export every requested screenshot from the real page.
9. Run the bundled validator before delivery:

```powershell
python scripts/validate_project.py "<project-directory>"
```

## Required behavior

### Countdown

- Recompute from the local clock every second; do not decrement a stored integer.
- Render positive time as `HH:MM:SS` with tabular digits.
- Define exact equality behavior at every boundary. Test 3h, 2h, 1h, 30m, 10m, 1m, 0, and -30m when those intervals exist.
- At or after zero, show a clear released state instead of negative digits.

### Personality

- Map each interval to `{ key, label, headline, detail }`.
- Keep copy stable inside a minute or use fixed stage copy. Never randomize every second.
- Normal mode is restrained frustration. Friday Mode is the same component with more excited, less cooperative copy.
- Detect Friday with local `date.getDay() === 5`; allow explicit `normal` and `friday` preview overrides.

### Sudden demand

- Keep the countdown accurate while the reaction temporarily replaces copy.
- Use one short shake/stamp feedback and restore the current stage after roughly 2-3 seconds.
- Friday may escalate through three rapid clicks. Cap the escalation; do not disable the page.

## Visual rules

- Preserve the established page structure: compact top bar, large countdown, primary line, supporting line, small bottom action.
- Prefer warm off-white, charcoal text, one acid accent, generous negative space, and no rounded card grid.
- A character asset may sit in the lower corner if supplied. Keep it secondary and use at most a small hop near release.
- Keep controls readable, keyboard-focusable, and within the first viewport.
- A screenshot state must communicate the joke without explanatory text outside the webpage.

## Verification gate

Do not claim completion until all are fresh and green:

- Node tests pass with zero failures.
- `node --check script.js` passes.
- Browser console contains zero errors and warnings.
- Normal, sudden-demand, Friday, and release states show the expected copy.
- Rapid Friday demand clicks produce the intended sequence.
- Mobile `scrollWidth === innerWidth` and the page fits the target viewport.
- Screenshot count and exact dimensions match the brief.
- Opening `index.html` locally requires no network request.

## Delivery

Return the clickable absolute path to `index.html`, the screenshot folder, the recommended cover state, one-sentence run instructions, and verification evidence. Keep source files and prior screenshots; do not delete or overwrite unrelated user work.

## Common mistakes

| Mistake | Correction |
|---|---|
| Friday is only a color swap | Change labels, prefix, staged copy, demand reaction, and release copy while preserving layout. |
| Copy changes every second | Select by stage or stable minute. |
| Preview depends on the current date | Use explicit URL parameters. |
| Test screenshot mutates normal settings | Keep previews stateless in the URL. |
| Character blocks the button | Pin it outside the primary text and verify mobile. |
| Celebration becomes a party poster | Limit it to a short type pop, small accent, or a few particles. |
| Social post content appears in the skill output | Remove it; this skill ends at webpage files, tests, and screenshots. |
