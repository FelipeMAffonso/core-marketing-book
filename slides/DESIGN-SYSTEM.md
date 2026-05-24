# MKTG 4333 — Slide Design System (v1 aesthetic)

A restrained, McKinsey-adjacent system. White backgrounds, black titles, one coral
accent, Segoe UI throughout. Built for clarity over decoration.

> **Philosophy:** Restraint over excess · Insight over label · Whitespace over density · One accent, not many.

### Voice rules

**Em-dashes are rationed.** One per slide, maximum. Zero is better. They read as a Claude tell and weaken the sentence. Before reaching for one, try:

- A period. Two short sentences almost always beat one long one.
- A colon, when the second half defines or elaborates the first.
- A semicolon, when two clauses are equal weight.
- Parentheses, when the aside is truly parenthetical.
- Just cut the aside — if it needed an em-dash to fit, it probably didn't need to be there.

**Sentence fragments > run-ons.** If a slide title runs 14+ words, you're trying to say two things. Pick one.

**No exclamation marks.** This is research, not marketing.

**Numbers:** round to the precision the audience cares about. `42%` not `42.31%`. Always disclose the base (`n = 2,840`) in the source line.

---

## Header rhythm — eyebrow is OPTIONAL

The slide title does the heavy lifting. An eyebrow (§1.3 · Visual hierarchy) only earns its spot when one of these is true:

- **Reference slides in a long deck** — students use the section numbers to navigate back to a specific idea.
- **Chart exhibits** — a short caption like `Exhibit 23 · Weekly active users by segment` tells the audience what they're looking at.
- **Section position marker** — `Part 2 of 3 · The makeover`, used sparingly.

**Everywhere else: no eyebrow.** The action title is enough. Two labels stacked above the content just adds noise.

---

## Canvas

- **Size:** 960 × 540 px (16:9, matches the original exhibit format).
- **Safe padding:** `28px` top · `40px` left/right · `48px` bottom.
- **Content area:** 880 × 464 px.

All templates use a fixed-size slide shell scaled to fit viewport — see the
starter component `deck_stage.js` for decks, or render stand-alone at 960×540
for exhibits.

---

## Color

```css
:root{
  /* Backgrounds */
  --bg:        #ffffff;   /* Primary slide background (ALWAYS white on content) */
  --bg-soft:   #f8f9fa;   /* Cards, callouts, quiet fills */
  --bg-dark:   #1a1a1a;   /* Title slides + section dividers */

  /* Text (on white) */
  --ink:       #1a1a1a;   /* Titles, primary body */
  --ink-body:  #333333;   /* Secondary body / inside cards */
  --ink-soft:  #4A4A4A;   /* Subtitles, descriptions */
  --ink-label: #5C5C5C;   /* Labels, captions */
  --ink-mute:  #7A7A7A;   /* De-emphasized chrome */
  --rule:      #E8E6E1;   /* Hairlines, axes, dividers */

  /* Text (on #1a1a1a) */
  --dk-ink:    #ffffff;
  --dk-ink-2:  #D4CFC5;
  --dk-mute:   #A39E94;

  /* Accent — USE SPARINGLY */
  --accent:     #DA7756;  /* Coral. One per slide, one claim. */
  --accent-tint:#FDF6F3;  /* Quiet featured-item background */

  /* Source line */
  --source: #888888;
}
```

### Absolute rules

1. **White backgrounds on content slides.** Cream/gray backgrounds only for optional variants.
2. **Titles are always black (`--ink`).** Never coral. Coral belongs on the ONE element the slide is arguing about.
3. **One accent per slide.** The accent is how the audience knows what matters. Two accents = no accent.
4. **Source line bottom-right, 11px `--source`.** The one font size allowed below 20px.

---

## Typography

```css
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
```

| Role             | Size           | Weight | Notes                              |
|------------------|----------------|--------|------------------------------------|
| Section title    | 42–48px        | 600    | Dark dividers only                 |
| Slide title      | 28–32px        | 600    | Action-oriented, one sentence      |
| Eyebrow / kicker | 11px uppercase | 600    | `letter-spacing: 0.12em`, muted    |
| Body             | 20–24px        | 400    | 24px preferred; 20px when dense    |
| Label / caption  | 20–24px        | 600    | Bolded to read as UI, not prose    |
| Value / callout  | 32–56px        | 600    | For KPIs and big numbers           |
| **Minimum**      | **20px**       | —      | Hard floor. Below = cut content.   |
| Source citation  | 11px           | 400    | Only size allowed below 20px       |

### Title voice

Slide titles are **complete thoughts**, not labels. Write the finding, not the topic:

- ❌ "Afternoon visits"
- ✅ "Afternoon visits dropped 42% after the café opened"

If you can't write the title as a sentence, the slide isn't ready.

---

## Layout system

- **Grid:** 12-column, `gap: 24px`. Most slides use 2-col (1fr 1fr) or asymmetric (1.4fr 1fr).
- **Rhythm:** eyebrow → title → hairline rule → content → source line.
- **Whitespace:** at least half an inch of quiet around every chart. Cut content before shrinking type.
- **Hairlines:** 1px `--rule` for axes and dividers. No heavy borders.
- **Corners:** 0–4px radius on cards. Sharp over soft.
- **Shadows:** none. This system has no drop shadows.

---

## Components

### Slide shell
```
.slide     — 960×540 white canvas with padding 28/40/48/40
.slide.dark— inverted (#1a1a1a bg), for title + section dividers
```

### Header block
```
.eyebrow   — 11px uppercase muted — §1.3 · Visual hierarchy
.title     — 28–32px, black, action sentence
.rule      — 2px × 60px coral bar, margin-top: 4px (optional emphasis)
```

### Body components
```
.card           — 1px #E8E6E1 border, white, 20–24px padding
.card.featured  — background: var(--accent-tint), border: none
.tag            — 11px uppercase pill, --bg-soft fill
.kpi            — big number (40–56px) + 13px label underneath
.checklist      — 20px items with a 10×2px coral bar on the left
.ba             — before/after split, equal columns, coral only on "after"
```

### Chart defaults
- Bars: `--rule` fill (`#E8E6E1`) for context, `--accent` for the one insight bar.
- Axis: single 1px `--rule` line. No gridlines. No tickmarks smaller than 8px.
- Labels: **direct** (on/above the bar), no legends.
- One delta annotation max. Write the number, don't make the audience calculate.

### Source line (always bottom-right)
```html
<p class="source">Source: ESOMAR 2024 · n = 2,840</p>
```
```css
.source{ position:absolute; bottom:12px; right:20px; font-size:11px; color:var(--source); }
```

---

## Templates (in this folder)

**Structural** (shape the deck):

| File | Use when… |
|---|---|
| `_tokens.css` | Shared variables + base type (import into every template) |
| `00-cover-variants.html` | Three cover treatments — pick whichever fits the tone |
| `01-title.html` | Default cover / opening |
| `02-section-divider.html` | "Part N of M" dividers in longer decks |
| `03-content-text.html` | Headline + supporting paragraphs / bullets |
| `04-two-column.html` | Two ideas side-by-side — before/after, problem/solution, A vs. B |
| `05-kpi-row.html` | Three or four big numbers with labels |
| `07-quote.html` | Pull quote with attribution |
| `08-closing.html` | Payoff / takeaways / next steps |

**Chart-purpose templates** (shape the evidence — see `CHART-PRINCIPLES.md`):

| File | Purpose | Reach for when… |
|---|---|---|
| `06-chart.html` | Paired before/after | Two time points, one segment moved |
| `10-comparison-bars.html` | Comparison | Ranking categories by a single measure |
| `11-trend-line.html` | Trend | Tracking a metric over time against a benchmark |
| `12-part-to-whole.html` | Part-to-whole | The mix inside a total |
| `13-relationship-scatter.html` | Relationship | Two variables, looking for correlation |
| `14-distribution-likert.html` | Distribution | Likert / diverging sentiment data |

Each template is a self-contained 960×540 HTML file with placeholder content and
inline comments marking what to edit.

---

## Which templates for which deliverable

These are **starting points, not rules**. Any template works for any deliverable —
the right mix depends on the argument you're making. If a section divider helps
students navigate your research talk, use it. If a KPI row makes your lecture open
stronger, use it. The lists below are just common rhythms.

**Lecture / teaching session.** Often benefits from: `01` → `02` to signpost each
part → alternating `03` and a chart-purpose template per idea → `07` for authority
quotes → `08` to close with takeaways. Dividers earn their place here because
students use them to navigate back later.

**Research project / dissertation defense.** Often leans on: `01` → a `05` KPI row
for headline findings → chart-purpose templates as evidence → `04` for competing
explanations or method trade-offs → `08` for implications. Evidence density is
higher; section dividers are usually optional.

**Conference / paper presentation.** Time-compressed, so often: `01` → `05` for
the one-glance result → one dominant chart template per claim → `08`. Skip
dividers unless the paper has genuinely distinct sections. Less is more.

The chart templates especially are format-agnostic — a comparison bar chart is a
comparison bar chart whether it's in a 50-minute lecture or a 10-minute talk.
The difference is the title, the source line, and how many of them you show.

---

## Pre-flight checklist

- [ ] Background is white (`#ffffff`) on content slides
- [ ] Title is black, written as an action sentence
- [ ] Exactly ONE coral element carries the insight
- [ ] All body text ≥ 20px (only 11px allowed is source line)
- [ ] Direct labels on charts — no legends
- [ ] Source line in bottom-right
- [ ] No drop shadows, no gradients, no chart junk
- [ ] The slide still communicates with the accent removed (test: swap coral for gray — is the claim still visible via position and label? if yes, good)

---

## Don't

- Use emoji, icon soup, or multiple accent colors.
- Write slide titles as labels ("Results", "Overview", "Data").
- Apply shadows, rounded bubbles, or gradient backgrounds.
- Shrink text below 20px to fit. Cut content instead.
- Put a legend on any chart that can be direct-labeled.
- **Reach for an em-dash.** Try a period first.
- Stack an eyebrow above every title — most slides don't need one.
- Use more than one coral element per slide.

---

## Chart patterns to reach for (before inventing new ones)

The charts that do the most work in a research deck are usually the simplest. Master these five before designing anything custom:

| Pattern | Best for | Key move |
|---|---|---|
| **Paired bars, before/after** | Change over two time points | Gray bars for context, coral bar for the single "after" that moved. One delta annotation. |
| **Ranked bar** | Who's biggest, who's smallest | Sort by value, not alphabet. Coral the one you're making a claim about. |
| **Line + benchmark** | Trend vs. a target | Flat dashed line at the benchmark; coral the segment of the trend line that crosses it. |
| **Small multiples** | Same chart, many subgroups | Identical axes, identical scale, tiny. The comparison is *across* the grid, not inside any one cell. |
| **Dot plot** | Ranking with magnitude + gap | One dot per row, aligned on a common axis. Beats 20 skinny bars. |

### Likert-scale specifics

- **Never report the mean alone.** A 3.0 can mean everyone's neutral or half love it and half hate it. Show the full distribution.
- **Diverging stacked bar**, anchored at neutral. Disagree grows left, agree grows right. Length = intensity, direction = valence.
- **Top-2-box / bottom-2-box**, stated explicitly. "78% agree or strongly agree (n = 2,840)."

### Annotations that earn their place

- **Delta:** `+33%` written on the chart, not calculated by the audience.
- **Benchmark:** a single dashed line at the target, labeled inline.
- **Callout box:** one sentence, attached to one element, only on the one thing worth noting.

More annotations than that and the chart becomes the note. Cut until one is left.
