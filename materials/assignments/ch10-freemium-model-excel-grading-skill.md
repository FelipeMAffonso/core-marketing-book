# Grading Skill: Build a Freemium Model in Excel and Stress-Test It

*Chapter 10 advanced (paid plan) group assignment, group of three to four. This file lets you grade a group's submission with the help of a free AI account, even if you have never used one. You paste a block of instructions into Claude, paste the group's work under it, and read back a score for each part of the rubric with a sentence of feedback. You stay in charge: the AI gives you a first-pass score, you decide the grade. A grade-by-hand version is at the bottom in case you would rather not use AI at all. You do not need Excel or a paid plan to grade; the grader block carries the formulas and the answer key.*

---

## Part 1: If you have never used AI before, start here

You do not need to install anything or pay anything to grade this. (Students needed a paid Claude plan and Excel to build the model; you only need a free account to score it.) This takes about five minutes the first time and under three minutes per group after that.

1. **Open a web browser** (Chrome, Safari, Edge, whatever you use) and go to **claude.ai**. (ChatGPT at **chatgpt.com** works the same way if you prefer it.)
2. **Make a free account.** Click **Sign up**, enter your email, and follow the steps. A free account is enough for grading. You will not be charged.
3. **Start a new chat.** After you log in you will see a box that says something like *"How can I help you today?"* That box is where you type. A "chat" is just a conversation with the AI, like texting.
4. **Copy the grader instructions.** In Part 2 below, everything inside the gray box is one block. Select it all, copy it, and paste it into the chat box. Do not press send yet.
5. **Add the group's work underneath.** Press Enter twice to make space, then paste the group's full submission, including the finished model with formulas visible (or screenshots of the cells), the chart of the paid base over 24 months, the four-scenario comparison, the conversion-versus-churn trap demonstration, the one-page recommendation, the AI transcript with the formula error caught and corrected, and each member's scenario tab and note, right below the instructions, in the same message.
6. **Send it.** Press Enter (or click the arrow). The AI will read both and reply with a score for each of the five rubric rows, a total out of 100, and a short note for each row.
7. **Read the score and decide.** The AI's score is a **first draft for you to approve, change, or override.** You are the grader of record. If a score looks off, trust your own read; the grading guide (`ch10-freemium-model-excel-grading-guide.md`) has the full answer key and tells you what each row is really worth.
8. **Grade the next group.** Click **New chat** and repeat from step 4 for each submission. A fresh chat each time keeps one group's work from bleeding into the next.

That is the whole process. The block in Part 2 does the work; you paste, read, and sign off.

> **One quick sanity check you can always run yourself, no AI needed.** This model has one trap that catches everyone: LTV per paid user is **price divided by monthly churn** (churn as a decimal). At month 24 that is 32 divided by 0.068, about $471. If the group's LTV cell is price times some rate, or a flat number of months with no churn in it, the formula is wrong, and catching that was the point. The second trap: a conversion lift looks like a pure win until you pair it with churn. If conversion and churn both rise and LTV per user does **not** fall, the group has not shown the trap.

---

## Part 2: The grader block (copy everything in the gray box)

> You are helping an instructor grade a second-year marketing student group's advanced assignment. The group of three to four students used the Claude for Excel add-in to build a 24-month freemium cohort model that writes real formulas into cells, stress-tested it (each member ran one lever: conversion, price, churn, or CAC), demonstrated the chapter's conversion-versus-churn trap, and was then asked to judge the tool's output: catch a formula or framing error in the cells, fix it, and own the recommendation. Your job is to score their submission against the rubric below and give short, kind, specific feedback. This is a first-year-friendly course; reward honest judgment over polish.
>
> **Background you need (the chapter's framework and the correct formulas):**
> - The dataset is 24 months of cohort inputs: free signups, free-to-trial rate, trial-to-paid rate, monthly churn (a percent), price, and CAC. Price steps from $29 (months 1 to 11) to $32 (months 12 to 24); monthly churn climbs from 4.5% to 6.8%; CAC rises from $38 to $74.
> - **The correct formulas:** new paid users in a month = free signups times free-to-trial rate times trial-to-paid rate. Paid base = last month's paid base times (1 minus this month's churn), plus this month's new paid users. **LTV per paid user = price divided by monthly churn (as a decimal).** LTV/CAC = LTV divided by CAC. CAC payback in months = CAC divided by price. MRR = paid base times price.
> - **Checkpoints to verify a few cells:** month 12 should show a paid base near 1,041, LTV per user near $571, LTV/CAC near 11.0, MRR near $33,320. Month 24 should show a paid base near 3,532, LTV per user near $471, LTV/CAC near 6.4, MRR near $113,028. The paid base grows the whole way while LTV per user falls (churn keeps rising), which is the tension at the heart of the model.
> - **The conversion-versus-churn trap (the demonstration the group must show with numbers):** at month-24 inputs (price $32, churn 6.8%), LTV per user is 32 divided by 0.068, about $470.59. A 10-point conversion lift with churn unchanged leaves LTV per user the same (LTV per user does not depend on conversion); the cohort is just bigger, so it looks like a pure win. But a 10-point conversion lift paired with one extra point of churn (6.8% to 7.8%) drops LTV per user to 32 divided by 0.078, about $410.26, a fall of about $60 per user (down about 13%), and LTV/CAC falls from about 6.4 to about 5.5. The bigger paying cohort is now worth less per user. That is the trap.
> - **Markup versus margin on the price line:** markup is on cost and can pass 100%; margin is on price and never can. The classic slip: a 40% margin on a $40 cost gives a price of 40 divided by (1 minus 0.40) = $66.67, not 40 times 1.40 = $56 (that is the markup). If the price or contribution line reports a markup as a margin and the group never caught it, flag it.
> - **The judgment pass is the heart of the assignment.** Working a multi-step model, the add-in produces it confidently and some of it is wrong: it can report a markup as a margin, compute LTV without dividing by churn correctly, or treat a conversion lift as a pure win while ignoring the churn that came with it. The group should have caught at least one such error in the cells, fixed the formula, shown the corrected cell, and owned the recommendation. Catching one real error is the skill being tested.
> - This is group work with an **individual artifact**: each member ran one lever (conversion, price, churn, or CAC) in their own copy and submitted a one-paragraph reading of what their single change did to the LTV/CAC ratio and the month-24 paid base, plus the one error they personally caught. No two members run the same lever.
>
> **What good looks like.** A strong submission has the paid base, LTV, LTV/CAC, CAC payback, and MRR all correct as live cell formulas over 24 months (matching the checkpoints above), the conversion-versus-churn trap shown with numbers, every member's own distinct scenario tab, a founder-ready recommendation with disclosure, and a real judgment pass: a formula or framing error caught and fixed in the cells with the corrected cell shown.
>
> **The misfire to check for.** The tested Chapter 10 misfire here is a confidently built model with a wrong cell: an LTV that ignores churn, a markup reported as a margin, or a conversion lift treated as a pure win. The group's job was to catch it. If they repeated the tool's model with little checking, or showed a conversion scenario as a pure win without ever pairing it with churn, score the judgment and trap rows down and say so kindly.
>
> **How to score.** Give a number for each of the five criteria below, then add them for a total out of 100. For each, write one sentence saying why, and one sentence the group could act on. Be specific and encouraging. If something required is missing, say so plainly and score it low; do not invent credit.
>
> 1. **Judgment pass: caught what the model got wrong (38 points).** Did the group catch and fix a real formula or framing error in the cells (an LTV that ignores churn, a markup reported as a margin, a conversion lift treated as a pure win), show the corrected cell, AND own the recommendation? Full marks: a named, corrected cell plus an owned call. Low marks: repeated the model with little checking, or handed unchecked output in as the group's own.
> 2. **Funnel economics built (24 points).** Are the paid base, LTV, LTV/CAC, CAC payback, and MRR all correct as cell formulas over 24 months (matching the checkpoints)? Deduct for one metric or formula off, a metric not computed, or numbers pasted as values with no live formula.
> 3. **Conversion-versus-churn trap shown (16 points).** Does the group demonstrate that a conversion lift plus one point of churn lowers LTV per user, with the numbers? Deduct for a thin comparison; cap low for the trap mentioned but not shown with numbers.
> 4. **Individual artifact, each member (14 points).** Is every member's own scenario tab and reading present and distinct, with no two members running the same lever, each naming the error they caught? Deduct for thin, shared, or duplicate scenarios, or missing members.
> 5. **Recommendation and disclosure (8 points).** Is there a one-page recommendation a founder could act on, plus a disclosure of the prompts and what was corrected? Deduct for a memo that restates numbers without a call, or a thin disclosure.
>
> **Watch for these failure patterns and score them down (with a kind note):** a clean workbook with no error caught; an LTV that does not divide by churn, kept uncorrected; a markup reported as a margin on the price line, uncaught; a conversion lift shown as a pure win with no churn paired to it; the trap asserted but never shown with numbers; formulas pasted as values with nothing tracing to a cell; two members running the same lever.
>
> **Do not penalize** disclosed AI use; the whole assignment runs on the add-in. Only the *absence* of a judgment pass is penalized, not the use of AI. If there is no transcript or disclosure at all and the workbook looks like an unedited tool dump, flag it for the instructor as a possible disclosure issue rather than scoring it; that is a human decision.
>
> **Output format:**
> - **Criterion 1, Judgment pass: __/38** (why) (one tip)
> - **Criterion 2, Funnel economics built: __/24** (why) (one tip)
> - **Criterion 3, Conversion-versus-churn trap shown: __/16** (why) (one tip)
> - **Criterion 4, Individual artifact: __/14** (why) (one tip)
> - **Criterion 5, Recommendation and disclosure: __/8** (why) (one tip)
> - **Total: __/100**
> - **One-line summary for the group:** (warm, specific, what to do next time)
>
> The group's submission follows below this line.

---

## Part 3: Reading and trusting the result

- The AI returns five scores, a total, and short notes. **Skim the notes first**; they tell you whether the AI actually understood the submission. If the notes match what you saw when you read the work, the total is trustworthy.
- **You can push back.** Type a follow-up in the same chat, for example *"Check the group's LTV cell against price divided by monthly churn; at month 24 it should be about $471"* or *"They showed the trap with real numbers; look again at Criterion 3."* The AI will re-score. You are calibrating it, not obeying it.
- **The judgment-pass row is the one to double-check yourself.** It is worth the most (38 points) and it is where the AI's own read can be too generous. If the group named and fixed a real error in the cells and showed the corrected cell, that is a strong submission even if the chart is rough. The grading guide says so too.
- **The fastest verification needs no Excel.** Check the LTV cell: it should be price divided by monthly churn (about $471 at month 24, about $571 at month 12). Then check the trap: when conversion and churn both rise, LTV per user must fall (about $471 to about $410). If either is missing, the group leaned on the tool, which is what this assignment trains them to catch.
- **Keep a fresh chat per group** so submissions do not blur together.
- Remember the framing for any feedback you pass on: *the instructor grades; the AI assists.* The score is yours.

---

## Part 4: Grade by hand instead (no AI at all)

If you would rather not use AI, grade straight from the rubric. Read each submission once, checking a few cells against the answer key in `ch10-freemium-model-excel-grading-guide.md`, then score the five rows:

| Criterion | Points | What earns full marks |
|---|---|---|
| **Judgment pass: caught what the model got wrong** | 38 | Catches and fixes a real formula or framing error in the cells (an LTV that ignores churn, a markup reported as a margin, a conversion lift treated as a pure win), shows the corrected cell, and owns the recommendation |
| **Funnel economics built** | 24 | Paid base, LTV, LTV/CAC, CAC payback, and MRR all correct as cell formulas over 24 months |
| **Conversion-versus-churn trap shown** | 16 | Demonstrates that a conversion lift plus one point of churn lowers LTV per user, with the numbers |
| **Individual artifact (each member)** | 14 | Every member's own scenario tab and reading present and distinct; no two run the same lever |
| **Recommendation and disclosure** | 8 | One-page recommendation a founder could act on; discloses prompts and what was corrected |
| **Total** | **100** | |

**Fast bands:** 90 to 100, all five metrics correct as live formulas over 24 months, the trap shown with numbers, every member's own distinct scenario, a founder-ready memo with disclosure, and a judgment pass that caught and fixed a real error with the corrected cell shown; 80 to 89, solid formulas and a genuine catch with one thin row; 70 to 79, present but mostly trusted the add-in (tidy formulas, no real catch, an LTV that still ignores churn, or the trap only mentioned); 60 to 69, output repeated with little checking, no error caught, the trap not shown, or a markup reported as a margin and never noticed; below 60 or integrity flag for a missing workbook or memo or an undisclosed AI dump (handle disclosure through your integrity process, not the rubric).

The two fastest signals of a strong submission: **a named, corrected cell** (most often an LTV fixed to price divided by monthly churn), and **the trap shown with numbers** (LTV per user falling when conversion and churn both rise, about $471 to about $410 at the month-24 inputs). The full answer key, every checkpoint, and the failure modes are in `ch10-freemium-model-excel-grading-guide.md`.
