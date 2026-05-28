# Grading Skill: Analyzing Cost and Price Structures with Claude in Excel

*Chapter 10 advanced (paid plan) individual assignment. This file lets you grade a student's submission with the help of a free AI account, even if you have never used one. You paste a block of instructions into Claude, paste the student's work under it, and read back a score for each part of the rubric with a sentence of feedback. You stay in charge: the AI gives you a first-pass score, you decide the grade. A grade-by-hand version is at the bottom in case you would rather not use AI at all. You do not need Excel or a paid plan to grade; the grader block carries the answer key. The companion `ch10-cost-price-structures-claude-excel-grading-guide.md` has the full key and failure modes; this skill mirrors it.*

---

## Part 1: If you have never used AI before, start here

You do not need to install anything or pay anything to grade this. (The student needed a paid Claude plan and Excel to build the analysis; you only need a free account to score it.) This takes about five minutes the first time and under three minutes per student after that.

1. **Open a web browser** (Chrome, Safari, Edge, whatever you use) and go to **claude.ai**. (ChatGPT at **chatgpt.com** works the same way if you prefer it.)
2. **Make a free account.** Click **Sign up**, enter your email, and follow the steps. A free account is enough for grading. You will not be charged.
3. **Start a new chat.** After you log in you will see a box that says something like *"How can I help you today?"* That box is where you type. A "chat" is just a conversation with the AI, like texting.
4. **Copy the grader instructions.** In Part 2 below, everything inside the gray box is one block. Select it all, copy it, and paste it into the chat box. Do not press send yet.
5. **Add the student's work underneath.** Press Enter twice to make space, then paste the student's full submission, including the analysis sheet or screenshots with formulas visible, the one-page memo to the founder, the two price scenarios, and the AI transcript with the errors or blind spots they caught and corrected, right below the instructions, in the same message.
6. **Send it.** Press Enter (or click the arrow). The AI will read both and reply with a score for each of the five rubric rows, a total out of 100, and a short note for each row.
7. **Read the score and decide.** The AI's score is a **first draft for you to approve, change, or override.** You are the grader of record. If a score looks off, trust your own read; the grading guide (`ch10-cost-price-structures-claude-excel-grading-guide.md`) has the full answer key and tells you what each row is really worth.
8. **Grade the next student.** Click **New chat** and repeat from step 4 for each submission. A fresh chat each time keeps one student's work from bleeding into the next.

That is the whole process. The block in Part 2 does the work; you paste, read, and sign off.

> **One quick sanity check you can always run yourself, no AI needed.** This dataset has one product that loses money on every unit: **TS-150 Trail Snack Box 12pk**, priced at $21.00 against a $22.40 variable cost, so its contribution margin is minus $1.40 per unit and it has no breakeven. It also sold the most units of any SKU (6,100), so the loss is large, about $8,540 of contribution drained last quarter. If the student never names TS-150, they missed the single most important thing in the file, and that is the heart of what to catch here.

---

## Part 2: The grader block (copy everything in the gray box)

> You are helping an instructor grade a second-year marketing student's advanced individual assignment. The student used the Claude for Excel add-in on a 12-SKU direct-to-consumer product line (Trailhead Supply Co.) to compute contribution margin, breakeven, and markup versus margin, model two price changes, and was then asked to judge the tool's output: spot the SKU that loses money on every unit, flag the item that does not belong in a product breakeven, catch a formula or framing error, and make the call the tool will not make. Your job is to score their submission against the rubric below and give short, kind, specific feedback. This is a first-year-friendly course; reward honest judgment over polish.
>
> **Background you need (the chapter's framework and the answer key for this dataset):**
> - The fixed cost is **$128,000 per quarter**. Contribution margin per unit is unit price minus unit variable cost; breakeven volume is $128,000 divided by that contribution margin per unit.
> - **The two things every strong submission finds:**
>   1. **TS-150 Trail Snack Box 12pk loses money on every unit.** Its $21.00 price is below its $22.40 variable cost, so its contribution margin is **minus $1.40 per unit** and it has no breakeven. It sold the most units of any SKU (6,100), so it drained about $8,540 of contribution last quarter. The fix is to raise the price above $22.40, cut the cost, or discontinue it. A student who never names TS-150 has missed the heart of the assignment.
>   2. **TS-160 Gift Card $50 does not belong in a product breakeven.** A gift card is deferred revenue, not a product with a real variable cost or shelf inventory (it has $0 returns and no units in stock). Treating its near-zero cost as a 97% margin inflates the line's apparent health and distorts any "most profitable SKU" ranking. It should be set aside before the product analysis, not ranked among the packs and sleeves.
> - **A subtler point worth credit:** the contribution margins ignore **returns**, and two SKUs have heavy ones (TS-120 Merino Sock at 140 returns, TS-121 Base Layer Top at 88). A student who notes that a returns-adjusted contribution margin would pull those two down is doing real analysis the add-in skipped.
> - **The line overall is healthy:** total contribution last quarter was about $507,630 against the $128,000 fixed cost, clearing roughly $379,630 above fixed cost. The problems are inside the line, not the line as a whole.
> - **Markup versus margin:** markup is on cost and can pass 100%; margin is on price and never can. The classic slip the add-in can make: a 40% margin on a $40 cost gives a price of 40 divided by (1 minus 0.40) = $66.67, not 40 times 1.40 = $56 (that is the markup). If a markup is reported as a margin anywhere in the sheet and the student never caught it, flag it.
> - **The judgment pass is the heart of the assignment.** Working a cost analysis, the add-in produces it confidently and some of it is wrong or beside the point: it can fold a negative-contribution SKU into a line total and never flag it, rank a gift card as a star on its 97% margin, report a markup as a margin, or spread the fixed cost the wrong way. The student's job is to catch what it got wrong and own the decision.
>
> **What good looks like.** A strong submission catches TS-150 with the arithmetic, flags TS-160 as not belonging, fixes a real formula or framing error, models two price changes with the new contribution margin and new breakeven for each, names the single price to change first with a target number, and gives a one-page memo a founder could act on, with disclosure. Contribution margin and breakeven are written as live cell formulas against the $128,000 fixed cost, not typed-in constants.
>
> **The misfire to check for.** The tested Chapter 10 misfire here is a confident analysis that hides a loss-maker, ranks a gift card as a star, or reports a markup as a margin. The student's job was to catch it. If they repeated the tool's output with little checking and missed TS-150, score the judgment row down and say so kindly.
>
> **How to score.** Give a number for each of the five criteria below, then add them for a total out of 100. For each, write one sentence saying why, and one sentence the student could act on. Be specific and encouraging. If something required is missing, say so plainly and score it low; do not invent credit.
>
> 1. **Judgment pass (30 points).** Did the student catch the negative-contribution SKU (TS-150) with the arithmetic, flag the item that does not belong (TS-160), fix a real formula or framing error, AND name the price to change with a number? Full marks: all of these. Proficient: catches the loss-making SKU and one other issue, with some correction. Low marks: repeated the output with little checking and missed TS-150.
> 2. **Contribution margin and breakeven (24 points).** Are both correct for every SKU and for the line, written as cell formulas against the $128,000 fixed cost, with above-versus-below-breakeven read correctly? Deduct for one formula or breakeven figure off; cap low for a clear arithmetic error, breakeven not computed against fixed cost, or numbers pasted as values.
> 3. **Markup versus margin (14 points).** Are both shown per SKU and clearly distinguished, with markup never reported as margin? Deduct if the distinction is shaky on an edge case; cap low if only one is shown or the two are conflated.
> 4. **Pricing scenarios (14 points).** Did the student model two price changes on different SKUs, show the new margin and breakeven for each, and judge which does more for the line's overall breakeven? Deduct for a thin comparison or only one change modeled well; cap low for a number changed with no breakeven effect shown.
> 5. **Memo and disclosure (18 points).** Does a one-page memo give three defensible calls a founder could act on (the loss-maker and the fix, the highest-priority price change with its new breakeven, and the gift-card or returns point), with the prompts and corrections disclosed? Deduct for a memo that restates numbers without a recommendation, or a thin disclosure.
>
> **Watch for these failure patterns and score them down (with a kind note):** a clean-formulas workbook that never noticed TS-150 is underwater; treating TS-150 as healthy because it sold the most units (high volume on a negative contribution makes the loss bigger, not smaller); ranking the TS-160 gift card as the most profitable product; a markup reported as a margin and uncaught; formulas pasted as values with nothing tracing to a cell; a memo that restates numbers without a call.
>
> **Do not penalize** disclosed AI use; the whole assignment runs on the add-in. Only the *absence* of a judgment pass is penalized, not the use of AI. If there is no transcript or disclosure at all and the memo looks like an unedited tool dump, flag it for the instructor as a possible disclosure issue rather than scoring it; that is a human decision.
>
> **Output format:**
> - **Criterion 1, Judgment pass: __/30** (why) (one tip)
> - **Criterion 2, Contribution margin and breakeven: __/24** (why) (one tip)
> - **Criterion 3, Markup versus margin: __/14** (why) (one tip)
> - **Criterion 4, Pricing scenarios: __/14** (why) (one tip)
> - **Criterion 5, Memo and disclosure: __/18** (why) (one tip)
> - **Total: __/100**
> - **One-line summary for the student:** (warm, specific, what to do next time)
>
> The student's submission follows below this line.

---

## Part 3: Reading and trusting the result

- The AI returns five scores, a total, and short notes. **Skim the notes first**; they tell you whether the AI actually understood the submission. If the notes match what you saw when you read the work, the total is trustworthy.
- **You can push back.** Type a follow-up in the same chat, for example *"The student did catch TS-150 with the minus $1.40 contribution; look again at Criterion 1"* or *"Check whether the breakeven is computed against the $128,000 fixed cost or just typed in."* The AI will re-score. You are calibrating it, not obeying it.
- **The judgment-pass row is the one to double-check yourself.** It is worth the most (30 points) and it is where the AI's own read can be too generous. If the student caught TS-150 with the arithmetic and flagged TS-160, that is a strong submission even if a chart is rough. The grading guide says so too.
- **The fastest verification needs no Excel.** Scan the submission for TS-150: did the student notice its $21 price is below its $22.40 cost, so it loses $1.40 per unit and has no breakeven? Did they flag the TS-160 gift card as not a product? Those two catches are the signal of a student who out-judged the tool.
- **Keep a fresh chat per student** so submissions do not blur together.
- Remember the framing for any feedback you pass on: *the instructor grades; the AI assists.* The score is yours.

---

## Part 4: Grade by hand instead (no AI at all)

If you would rather not use AI, grade straight from the rubric. Read each submission once, checking figures against the answer key in `ch10-cost-price-structures-claude-excel-grading-guide.md`, then score the five rows:

| Criterion | Points | What earns full marks |
|---|---|---|
| **Judgment pass** | 30 | Catches the negative-contribution SKU (TS-150) with arithmetic; flags the item that does not belong (TS-160); fixes a real formula or framing error; names the price to change and the number |
| **Contribution margin and breakeven** | 24 | Both correct for every SKU and the line, as cell formulas against the $128,000 fixed cost; above and below breakeven read correctly |
| **Markup versus margin** | 14 | Both shown per SKU and clearly distinguished; markup never reported as margin |
| **Pricing scenarios** | 14 | Models two price changes on different SKUs, shows the new margin and breakeven for each, and judges which does more for the line's breakeven |
| **Memo and disclosure** | 18 | One-page memo gives three defensible calls a founder could act on; discloses prompts and what was corrected |
| **Total** | **100** | |

**Fast bands:** 90 to 100, correct contribution and breakeven for every SKU and the line as live formulas, markup and margin distinct, two real price scenarios with their new breakevens, and a judgment pass that caught TS-150 with the arithmetic, flagged TS-160, and named the price to change; 80 to 89, solid formulas and a genuine judgment pass that caught the loss-maker, with one thin row; 70 to 79, present but mostly trusted the add-in (tidy formulas, no real catch of TS-150, or a breakeven not run against fixed cost); 60 to 69, output repeated with little checking, the loss-maker missed, or a markup reported as a margin and never noticed; below 60 or integrity flag for a missing memo or workbook or an undisclosed AI dump (handle disclosure through your integrity process, not the rubric).

The single fastest signal of a strong submission: **TS-150 named as the loss-maker with its minus $1.40 contribution, plus TS-160 flagged as not a product.** A student who caught the loss-making SKU and owned the price call has done more pricing thinking than one whose formulas were all correct and who flagged nothing. The full answer key for all twelve SKUs and the failure modes are in `ch10-cost-price-structures-claude-excel-grading-guide.md`.
