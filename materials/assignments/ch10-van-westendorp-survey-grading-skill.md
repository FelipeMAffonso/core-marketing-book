# Grading Skill: Run a Van Westendorp Price Survey with AI

*Chapter 10 group assignment (groups of three or four), free AI account. This file lets you grade a group's submission with the help of a free AI account, even if you have never used one. You paste a block of instructions into Claude, paste the group's work under it, and read back a score for each part of the rubric with a sentence of feedback. You stay in charge: the AI gives you a first-pass score, you decide the grade. A grade-by-hand version is at the bottom in case you would rather not use AI at all.*

---

## Part 1: If you have never used AI before, start here

You do not need to install anything or pay anything. This takes about five minutes the first time and under two minutes per group after that.

1. **Open a web browser** (Chrome, Safari, Edge, whatever you use) and go to **claude.ai**. (ChatGPT at **chatgpt.com** works the same way if you prefer it.)
2. **Make a free account.** Click **Sign up**, enter your email, and follow the steps. A free account is enough for this. You will not be charged.
3. **Start a new chat.** After you log in you will see a box that says something like *"How can I help you today?"* That box is where you type. A "chat" is just a conversation with the AI, like texting.
4. **Copy the grader instructions.** In Part 2 below, everything inside the gray box is one block. Select it all, copy it, and paste it into the chat box. Do not press send yet.
5. **Add the group's work underneath.** Press Enter twice to make space, then paste the group's full submission, including the group PDF (the four questions, the pooled response table, the band with its four crossings, the rival-price comparison, the recommended price, and the judgment pass), the AI transcript, and every member's five-response slice and band note, right below the instructions, in the same message.
6. **Send it.** Press Enter (or click the arrow). The AI will read it all and reply with a score for each of the five rubric rows, a total out of 100, and a short note for each row.
7. **Read the score and decide.** The AI's score is a **first draft for you to approve, change, or override.** You are the grader of record. If a score looks off, trust your own read. The grading guide (`ch10-van-westendorp-survey-grading-guide.md`) tells you what each row is really worth.
8. **Grade the next group.** Click **New chat** and repeat from step 4 for each submission. A fresh chat each time keeps one group's work from bleeding into the next.

That is the whole process. The block in Part 2 does the work; you paste, read, and sign off.

> **One thing to check yourself, no AI needed.** The heaviest row turns on the transcript. Open it and confirm two things. Did the AI actually **write and run code** to compute the four crossings (not just type numbers off a chart)? And is every rival price it quoted **marked confirmed or made up against a real page** (with a link)? Code-run crossings plus verified prices is a real judgment pass. Typed numbers and unchecked prices are not, no matter how clean the band looks.

---

## Part 2: The grader block (copy everything in the gray box)

> You are helping an instructor grade a group submission for a second-year marketing course. The group (three or four students) ran a Van Westendorp price-sensitivity survey: they wrote the four questions, each member surveyed five real people so the group pooled 15 to 20 responses, and they used a free AI account to write and run code that builds the four cumulative curves and solves for the crossings. They also compared the band to real rival prices and recommended a price inside it. Each member separately turns in their own five real responses and a one-paragraph band note. Your job is to score the submission against the rubric below and give short, kind, specific feedback. Reward running the math as code and verifying the AI's quoted prices over polished writing.
>
> **Background you need (the chapter's framework):**
> - **Van Westendorp's four questions** are indirect: the price at which the product is too expensive, the price at which it is too cheap (so cheap you doubt the quality), the price at which it is getting expensive, and the price that would be a bargain. A direct "what would you pay?" question is the wrong method.
> - The four cumulative curves cross at four points: the **OPP** (too cheap crosses too expensive), the **IPP** (getting expensive crosses bargain), the **PMC** (too cheap crosses getting expensive, the lower bound), and the **PME** (too expensive crosses bargain, the upper bound). The **acceptable band** runs between the PMC and the PME. A good answer reads the band off these four named crossings of the pooled data, not off a glance at a chart.
> - **The 2026 pricing skill is to run the band math as CODE, not to eyeball the chart.** A strong group has the AI write and run code that computes the crossings, so the band rests on the data rather than a typed estimate.
> - **The AI invents current competitor prices** and states them as fact. A strong group verifies each rival price against a real page and marks it confirmed or made up.
> - **The AI can report a markup as a margin.** Markup is over cost (cost times 1.40 for a 40% markup); margin is over price (a 40% margin on a $40 cost needs a price of $40 divided by (1 minus 0.40), which is $66.67). They are never equal. A strong group runs the markup-versus-margin check as code so the two numbers come back distinct, and catches the slip if the AI made it.
> - The heart of this assignment is the **judgment pass**: run the math as code, verify every quoted price, and catch at least one invented price or markup-as-margin slip. A group that handed in the AI's typed numbers as fact has missed the point.
>
> **How to score.** Give a number for each of the five criteria below, then add them for a total out of 100. For each, write one sentence saying why, and one sentence the group could act on. Be specific and encouraging. If something required is missing, say so plainly and score it low; do not invent credit.
>
> 1. **Judgment pass: verified the AI and ran the math as code (40 points).** Did the group have the AI run the band math as code (not typed numbers), verify every rival price against a real page (marking each confirmed or made up), and catch at least one invented price or a markup-as-margin slip? Full marks: code-run crossings, every rival price marked, and a named catch. Proficient: one figure verified and the math run as code with some checking. Low marks: trusted the AI's typed numbers with little checking, or handed the output in as fact.
> 2. **Van Westendorp band (25 points).** Are the four questions correct (the four indirect framings, not a direct "what would you pay"), are there 15 or more pooled real responses, and is the band read off the four crossings (OPP, PMC, PME, IPP)? Deduct for a band read loosely or fewer than 15 responses.
> 3. **Recommended price (15 points).** Is a price set inside the band with a reason tied to the rival comparison? Deduct for a price with no reason or a price set outside the band with no acknowledgment.
> 4. **Individual artifact, each member (12 points).** Are every member's five real responses and band note present and their own? The five-response slices should add up to the pooled dataset and the notes should be real individual readings, not a copy of the group band. Deduct for slices that are thin or shared (the same five responses reused, or notes that restate the group band).
> 5. **Writing (8 points).** Is the prose plain and clear, with the four crossings and the band used correctly? Deduct for disconnected writing.
>
> **Watch for these failure patterns and score them down (with a kind note):** a band the AI typed off a chart instead of computing as code; rival prices kept with no link and no confirmed-or-made-up mark; a markup the AI reported as a margin that the group kept; the same five survey responses reused across members; a direct "what would you pay" question instead of the four indirect ones; a missing AI transcript.
>
> **Do not deduct for using AI:** the AI step is a required part of this assignment, so the use of a free Claude or ChatGPT account is expected, not a problem. Penalize only the absence of a real judgment pass (no code, no verification), never the AI use itself. If there is no AI transcript at all, the judgment pass cannot be verified; flag that for the instructor rather than awarding the row on faith. Any academic-integrity question is for the instructor to handle through their institution's policy, not for this grader block to decide.
>
> **Output format:**
> - **Criterion 1, Judgment pass: __/40** (why, and say whether the math was run as code and prices verified) (one tip)
> - **Criterion 2, Van Westendorp band: __/25** (why) (one tip)
> - **Criterion 3, Recommended price: __/15** (why) (one tip)
> - **Criterion 4, Individual artifact: __/12** (why, and note any shared slices) (one tip)
> - **Criterion 5, Writing: __/8** (why) (one tip)
> - **Total: __/100**
> - **One-line summary for the group:** (warm, specific, what to do next time)
>
> The group's submission follows below this line.

---

## Part 3: Reading and trusting the result

- The AI returns five scores, a total, and short notes. **Skim the notes first.** They tell you whether the AI actually understood the submission. Check that its note on Criterion 1 says whether the band math was run as code and whether the rival prices were verified; that is the heart of the grade.
- **You can push back.** Type a follow-up in the same chat, for example *"The transcript does show the AI ran Python to find the crossings; look again at Criterion 1"* or *"All four members show the same five responses; should Criterion 4 be lower?"* The AI will re-score. You are calibrating it, not obeying it.
- **The judgment-pass row is the one to double-check yourself.** It is worth the most, and it is where the AI's read can be too generous. Open the transcript: code-run crossings plus rival prices marked confirmed or made up is a real judgment pass; typed numbers and unchecked prices are not. The grading guide says so too.
- **Read the member slices yourself.** The five-response slices should add up to the pooled dataset. If they overlap or do not sum, the slices were shared and the individual-artifact row caps low.
- **The markup-versus-margin check needs no AI.** If the group reported a margin on its recommended price, confirm markup is over cost and margin is over price, and that the two are not the same number. A 40 percent margin on a $40 cost is $66.67, not $56.
- **Keep a fresh chat per group** so submissions do not blur together.
- Remember the framing for any feedback you pass on: *the instructor grades; the AI assists.* The score is yours.

---

## Part 4: Grade by hand instead (no AI at all)

If you would rather not use AI, grade straight from the rubric. Read the group PDF, the transcript, and the member slices once, then score the five rows.

| Criterion | Points | What earns full marks |
|---|---|---|
| **Judgment pass: verified the AI and ran the math as code** | 40 | Has the AI run the band math as code, verifies every rival price against a real page (each marked confirmed or made up), and catches at least one invented price or a markup-as-margin slip |
| **Van Westendorp band** | 25 | Four indirect questions correct, 15 or more pooled real responses, band read off the four crossings (OPP, PMC, PME, IPP) |
| **Recommended price** | 15 | A price set inside the band with a reason tied to the rival comparison |
| **Individual artifact (each member)** | 12 | Every member's five real responses and band note present and their own; slices add up to the pooled data |
| **Writing** | 8 | Plain, clear, correct terms |
| **Total** | **100** | |

**Fast bands:** 90 to 100, four correct questions, 15 or more pooled responses, a band read off code-run crossings, a price inside the band tied to verified rival prices, distinct member slices and notes, and a real judgment pass that caught at least one invented price or markup-margin slip; 80 to 89, solid work with the math run as code and one figure verified, but one thin row; 70 to 79, present but mostly trusted the AI (a band with no code-run crossings, rival prices unchecked, or overlapping slices); 60 to 69, the AI's typed numbers handed in as fact with no code and no verification, or shared survey slices throughout; below 60 or integrity flag for a missing transcript, a missing deliverable, or no real survey data (handle any academic-integrity question through your institution's policy, not the rubric).

The single fastest signal of a strong submission on this card: **code-run crossings plus a named, verified catch.** If the group had the AI compute the four crossings as code and caught one rival price it invented (or a markup it reported as a margin), the 2026 pricing skill worked, which is the whole point of the card. Full details and failure modes are in `ch10-van-westendorp-survey-grading-guide.md`.
