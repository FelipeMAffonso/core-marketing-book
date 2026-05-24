# MKTG 4333 · Chart Principles

The thinking layer. Before reaching for a chart type, decide **what you want the audience to see**. Five purposes cover almost every research finding. Master these before inventing anything custom.

> "Purpose determines chart. Not the other way around."

---

## The five purposes

| Purpose | The question | Reach for | Don't use for |
|---|---|---|---|
| **Comparison** | How do values compare? | Ranked bar, paired bar | More than ~10 categories; time series |
| **Trend** | How does it change over time? | Line, small-multiple lines | Discrete unrelated points |
| **Part-to-whole** | What makes up the total? | Stacked bar (preferred); pie only if ≤5 slices | When you really want comparison — use bars |
| **Relationship** | How do variables relate? | Scatter plot | Implying causation |
| **Distribution** | How is data spread? | Histogram; diverging bar (for Likert) | Categorical data without order |

---

## 1. Comparison

**The question:** Which is biggest? Which is smallest? How far apart are they?

**Default chart:** ranked horizontal bar.

- **Sort by value.** Never alphabetical unless the category names have their own logic (months, Likert scale).
- **Coral the one you're making a claim about.** Every other bar is gray — context, not competition for attention.
- **Direct-label the values** at the end of each bar. No axis needed if all values are labeled.
- **Horizontal** lets long category names breathe. Use vertical columns only when categories are short and the comparison is over time (then you're really in Trend territory).

**Common mistake:** 12 bars all in different colors. One claim, one color.

---

## 2. Trend

**The question:** What's the direction? Where did it inflect? Is it still moving?

**Default chart:** line chart with a benchmark.

- **Time on the X-axis.** Always.
- **One line is the hero.** Others, if any, are gray context.
- **A dashed horizontal rule** at the target or baseline is one of the most useful persuasion moves. "We crossed it in Q2."
- **Annotate the inflection point**, not every data point. Callouts are for the one thing that matters.
- **Don't start the Y-axis at zero** if the range is narrow and the real story is the delta. Disclose the base.

**Common mistake:** overlapping multicolor spaghetti. If three lines matter equally, use small multiples instead.

---

## 3. Part-to-whole

**The question:** What's the mix?

**Default chart:** stacked bar (100%), not a pie.

**Why stacked bar beats pie:**
- Humans read length more accurately than angle.
- Stacked bars compose naturally for multiple groups ("men vs. women", "2023 vs. 2024").
- You can read the dominant segment in one second.

**If you must use a pie:**
- ≤ 5 slices.
- No slice < 5%.
- Largest slice starts at 12 o'clock, clockwise.
- One coral slice (the claim), the rest grayscale.

**Stacked bar rules:**
- Order segments by size, largest on the left.
- Direct-label anything >10%; suppress labels below that.
- Totals on the right so readers don't do arithmetic.

---

## 4. Relationship

**The question:** Are these two variables related? How strongly?

**Default chart:** scatter plot.

- **X and Y axes do real work** — label them with units.
- **Dashed trend line** only if it's justified by the data (r > ~0.3). Don't force a line on noise.
- **Highlight outliers** or the specific observations you're arguing about. Everything else is gray.
- **Bubble / size encoding** when a third variable matters (revenue, population). Not for decoration.

**Correlation is not causation.** Say so in the source line if there's any risk of misreading.

**Common mistake:** scatter plot for fewer than ~15 data points. Below that, a dot plot reads better.

---

## 5. Distribution

**The question:** How are the values spread out? What's typical, what's the tail?

**Default chart:** histogram for continuous data; **diverging stacked bar** for Likert.

### Likert scales — always show distribution

A mean of 3.2 can mean everyone is neutral, or half love it and half hate it. These look identical on a bar chart of means. They're completely different findings.

**Recommended: diverging stacked bar.**

- Anchored on neutral. Disagree grows left, agree grows right.
- Length = intensity. Direction = valence.
- Red-gray-green palette, or single-hue (coral for the claim, gray for everything else).
- Sort by net-positive (% agree − % disagree), not by mean.
- Call out top-2-box in the source line as the summary statistic: "78% agree or strongly agree (n = 2,840)".

**Other Likert options** (use only when the purpose calls for it):
- **Stacked 100% bar** — when you want to show the full distribution and comparison is within each row.
- **Top-2-box only** — when you need a compact summary across many items and direction (positive) is obvious.
- **Mean score with CI** — when you're ranking and the ordering itself is the finding. Always accompanied by the distribution somewhere, even in an appendix.

**Never report the mean alone.** It hides bimodality. It hides the thing that's actually interesting.

---

## Decision sequence (use this when stuck)

1. **Write the finding as a sentence.** "Segment B dropped 42%."
2. **What purpose is that sentence about?** Comparison (between segments) and trend (over time).
3. **Which dominates?** The comparison does — "B vs. everyone else" is the claim.
4. **Open the matching template.** 10-comparison-bars.
5. **Coral the subject of the sentence.** In this case, Segment B.
6. **Source line confirms the base.** `n = 2,840`.

If step 1 produces a sentence that needs two purposes equally, you have two slides, not one.

---

## Cross-references

- **Template gallery** → `index.html`
- **Aesthetics, type, color, voice** → `DESIGN-SYSTEM.md`
- **Interactive chart selector** (for exploration) → `../uploads/session-24-exhibit-24-13-chart-selection-v2.html`
- **Likert visualization demo** → `../uploads/session-24-exhibit-24-17-likert-visualizations-v2.html`
