# Emotional countdown web contract

Use this checklist to turn a brief into implementation decisions.

## Inputs

| Field | Default |
|---|---|
| Off-work time | `18:00` |
| Time basis | Browser local time |
| Main format | `HH:MM:SS` |
| Runtime | Static offline HTML/CSS/JS |
| Persistence | `localStorage` for target time only |
| Screenshot | `1440 × 1920` unless specified |
| Mobile QA | `390 × 844` |

## Pure-function boundary

Export functions similar to:

```js
parseClock(value, baseDate)
formatDuration(seconds)
getMood(secondsRemaining)
resolvePersona(date, override)
getFridayMood(secondsRemaining)
getFridayDemandCopy(clickCount)
```

Node must be able to import the file without a DOM. Wrap browser initialization in `if (typeof document !== 'undefined')`.

## State table

Write literal expected values before implementation. A typical table is:

| Remaining | Normal intent | Friday intent |
|---:|---|---|
| `> 3h` | restrained | notices it is Friday |
| `2h-3h` | anticipation | heart leaves early |
| `1h-2h` | preparation | weekend preparation |
| `30m-60m` | caution | refuse new projects |
| `10m-30m` | alert | weekend loading |
| `1m-10m` | sensitive | hands off |
| `< 1m` | holding breath | keep quiet |
| `<= 0` | off work | weekend unlocked |
| `<= -30m` | overtime | weekend already started |

Treat exact endpoints as product decisions. Encode and test them explicitly.

## Preview parameters

Use single-parameter variants on Windows to avoid command-shell handling of `&`:

```text
?preview=17:50
?previewEvent=17:50
?previewFriday=17:50
?previewFridayEvent=17:50
```

Support optional seconds. Preview dates inherit the local calendar day and change only hours, minutes, seconds, and milliseconds.

## Browser acceptance

Check:

1. Default mode and target time.
2. Target-time edit persists after reload.
3. Every required preview shows literal expected copy.
4. Demand reaction appears immediately and restores later.
5. Friday rapid-click sequence advances without disabling controls.
6. Release state appears at exactly zero.
7. Desktop and mobile have no overflow.
8. Reduced-motion users receive no shaking, looping hop, or confetti.
9. Console reports zero errors and warnings.

## Screenshot order

Prefer a narrative sequence: calm or cover, approaching release, highly sensitive, demand interruption, released. Do not include two images that communicate the same beat unless the user requests them.
