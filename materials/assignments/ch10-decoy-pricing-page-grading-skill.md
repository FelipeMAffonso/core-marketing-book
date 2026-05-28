# Grading Skill: Design a Pricing Page That Uses the Decoy

*Chapter 10 group assignment (free account, group of three to four, high difficulty). This file lets you grade a group's submission with the help of a free AI account, even if you have never used one. You paste a block of instructions into Claude, paste the group's work under it, and read back a score for each part of the rubric with a sentence of feedback. The grader block already knows why the starting draft's decoy fails, so it can tell whether the group caught it. You stay in charge: the AI gives you a first-pass score, you decide the grade. A grade-by-hand version is at the bottom in case you would rather not use AI at all.*

---

## Part 1: If you have never used AI before, start here

You do not need to install anything or pay anything. This takes about five minutes the first time and under three minutes per group after that.

1. **Open a web browser** (Chrome, Safari, Edge, whatever you use) and go to **claude.ai**. (ChatGPT at **chatgpt.com** works the same way if you prefer it.)
2. **Make a free account.** Click **Sign up**, enter your email, and follow the steps. A free account is enough for this. You will not be charged.
3. **Start a new chat.** After you log in you will see a box that says something like *"How can I help you today?"* That box is where you type. A "chat" is just a conversation with the AI, like texting.
4. **Copy the grader instructions.** In Part 2 below, everything inside the gray box is one block. Select it all, copy it, and paste it into the chat box. Do not press send yet.
5. **Add the group's work underneath.** Press Enter twice to make space, then paste the group's full submission, including their diagnosis of the draft, the rebuilt three-tier page (prices, features, the labeled decoy), the predicted buyer split with and without the decoy and the reasoning, the dominance-breaks boundary, the verified competitor benchmarks, the judgment pass (the figure corrected and the leading-versus-neutral prompt difference), and each member's own page and split prediction, right below the instructions, in the same message.
6. **Send it.** Press Enter (or click the arrow). The AI will read both and reply with a score for each of the five rubric rows, a total out of 100, and a short note for each row.
7. **Read the score and decide.** The AI's score is a **first draft for you to approve, change, or override.** You are the grader of record. If a score looks off, trust your own read; the grading guide (`ch10-decoy-pricing-page-grading-guide.md`) tells you what each row is really worth.
8. **Grade the next group.** Click **New chat** and repeat from step 4 for each submission. A fresh chat each time keeps one group's work from bleeding into the next.

That is the whole process. The block in Part 2 does the work; you paste, read, and sign off.

> **One quick sanity check you can always run yourself, no AI needed.** A real decoy means one other tier beats it on *every* attribute, so the target is the obvious win. Take the group's decoy tier and the target tier and compare them line by line: price, features, limits, support. If the decoy wins or ties on even one attribute (often it is cheaper), the dominance is not real and it is not a true decoy. That one check settles the design row in under a minute. The starting draft they fixed had exactly this flaw: its Pro plan was cheaper than the target Plus plan and carried priority support the target lacked, so it was not dominated.

---

## Part 2: The grader block (copy everything in the gray box)

> You are helping an instructor grade a second-year marketing student group's assignment. The group of three to four students was handed a starting draft pricing page for a study app called Lumen Notes whose intended decoy did not actually work, and their job was to diagnose why, rebuild the lineup into a genuine decoy, predict the buyer split with and without the decoy, and judge an AI's help. They used a free AI assistant to draft tier names, features, and candidate prices and to estimate the split, and were then asked to verify the competitor benchmarks the AI invented and resist its flattery on a leading question. Your job is to score their submission against the rubric below and give short, kind, specific feedback. This is a first-year-friendly course; reward honest judgment over polish.
>
> **The starting draft and why its decoy fails (you need this to grade the design row).** The draft had three plans: Basic at four dollars a month, Plus at ten dollars a month (the target the team wanted buyers to pick), and Pro at eight dollars a month (the plan meant to be the decoy). For Pro to be a real decoy, the target Plus would have to beat Pro on every attribute. It does not. Pro is cheaper than Plus (eight dollars versus ten dollars), and Pro carries priority support that Plus does not have. So Pro wins on price and on priority support, which means Pro is not dominated, and a rational buyer could reasonably pick it. That is the fuzzy-decoy mistake. A correct diagnosis names at least one of those broken attributes (price or priority support); the strongest names both. A correct rebuild redesigns the third plan so the target beats it on every attribute, for example by raising the decoy's price to match or exceed the target and removing the priority support, so at the same or higher price the decoy gives strictly less than the target and no buyer would pick it.
>
> **More background you need (the chapter's framework):**
> - The **decoy effect** works through **asymmetric dominance**: the decoy must be beaten by the target on **every** attribute, so the target reads as the obvious win. A fuzzy decoy that wins on even one attribute (for instance, it is cheaper) is not a real decoy and does not count. The clearest signal of a genuine structure is that no rational buyer would pick the decoy over the target.
> - The buyer-split anchor is the **Economist subscription replication**, which the assignment gives the group: a useless print-only middle option moved the split from 68 percent versus 32 percent (two options) to 16 percent / 0 percent / 84 percent (three options). A strong prediction ties to that result and predicts the split both with and without the decoy.
> - The design must survive the **dominance-breaks boundary**: the decoy stops working if the target is priced too cheap to need a push, or if real differentiation between tiers breaks the dominance. A strong submission names this boundary.
> - **The judgment pass is the heart of the assignment.** A current AI assistant invents competitor tier prices and presents them as real market benchmarks, and on a leading prompt ("this decoy works, right?") it gives a flattering yes instead of a critique. The group should have verified each benchmark against a real pricing page (marking each confirmed or made up), caught at least one invented price, and re-asked the model to argue the decoy will fail, reporting the stronger critique. Catching one invented benchmark and breaking the flattery is the skill being tested.
> - This is group work with an **individual artifact**: each member designs their own three-tier page for the same product (their own prices, features, and decoy placement) plus a one-paragraph split prediction. No two members' pages should be the same.
>
> **What good looks like.** A strong submission names the draft Pro plan's broken attribute (cheaper than Plus, and priority support Plus lacks), rebuilds a genuine asymmetric-dominance structure (the decoy beaten on every attribute), predicts the buyer split with and without the decoy tied to the Economist replication with the boundary named, includes every member's own distinct page, writes clearly, and shows a real judgment pass: at least one competitor benchmark verified or caught as invented against a real page, plus the model flipping under a neutral "argue this fails" prompt.
>
> **The misfire to check for.** The tested Chapter 10 misfire here is an AI that invents competitor prices and states them as real market benchmarks, and that flatters a leading question. The group's job was to catch it. If they kept the AI's prices as fact with no verification, or ran only the leading prompt and stopped at the flattering yes, score the judgment row down and say so kindly.
>
> **How to score.** Give a number for each of the five criteria below, then add them for a total out of 100. For each, write one sentence saying why, and one sentence the group could act on. Be specific and encouraging. If something required is missing, say so plainly and score it low; do not invent credit.
>
> 1. **Judgment pass: verified the AI and resisted its flattery (38 points).** Did the group verify the AI's competitor benchmarks against real pages (each marked confirmed or made up), catch one invented price, AND show the AI flipping under a neutral "argue this fails" prompt? Full marks: a named, corrected benchmark with its real page, plus the model reversing between the leading and neutral prompts. Low marks: trusted the AI's prices and its flattering yes.
> 2. **Decoy design, diagnosis and rebuild (26 points).** Did the group name the attribute where the draft Pro plan's dominance breaks (price or priority support), AND rebuild a genuine asymmetric-dominance structure where the target beats the decoy on every attribute so the target reads as the obvious win? Cap this in the middle if they caught the broken draft or built a clean decoy but not both, or if the rebuilt decoy still wins on any one attribute. Cap it low if they repeat the draft's fuzzy structure or show no real decoy logic. Check attribute by attribute.
> 3. **Buyer-split prediction (18 points).** Does the group predict the split with and without the decoy, tie it to the Economist replication, and name the dominance-breaks boundary? Deduct for a shift predicted with thin reasoning or a missing boundary, more for a split with no reasoning.
> 4. **Individual artifact, each member (12 points).** Is every member's own page and split prediction present and distinct (their own prices, features, decoy placement)? Deduct for thin, shared, or near-duplicate pages, or missing members.
> 5. **Writing (6 points).** Plain, clear, correct terms? Deduct for disconnected points or muddy terms.
>
> **Watch for these failure patterns and score them down (with a kind note):** accepting the draft's Pro plan as a working decoy without catching that it is cheaper and carries extra support; a rebuilt decoy whose dominance still does not hold on every attribute; a polished page built on unverified AI benchmarks; an invented competitor price carried in as a real benchmark; running only the leading prompt and stopping at the flattering yes; a split asserted with no tie to the Economist replication; a missing dominance-breaks boundary; near-duplicate individual pages.
>
> **On disclosure.** AI use is expected and welcome on this assignment; the task is to judge the AI, not to avoid it, so do not lower a score for disclosed AI use. If there is no transcript or disclosure at all and the page looks like an unedited AI dump, do not score that as a rubric deduction. Flag it for the instructor as a possible academic-integrity matter to handle through the institution's own policy, which is a human decision and separate from the grade.
>
> **Output format:**
> - **Criterion 1, Judgment pass: __/38** (why) (one tip)
> - **Criterion 2, Decoy design: __/26** (why, and say whether the draft diagnosis and the rebuild were both done) (one tip)
> - **Criterion 3, Buyer-split prediction: __/18** (why) (one tip)
> - **Criterion 4, Individual artifact: __/12** (why) (one tip)
> - **Criterion 5, Writing: __/6** (why) (one tip)
> - **Total: __/100**
> - **One-line summary for the group:** (warm, specific, what to do next time)
>
> The group's submission follows below this line.

---

## Part 3: Reading and trusting the result

- The AI returns five scores, a total, and short notes. **Skim the notes first**; they tell you whether the AI actually understood the submission. If the notes match what you saw when you read the work, the total is trustworthy.
- **You can push back.** Type a follow-up in the same chat, for example *"Check the rebuilt decoy against the target attribute by attribute; the decoy is cheaper, so the dominance may not hold"* or *"The group did verify the rival's price against its real page; look again at Criterion 1."* The AI will re-score. You are calibrating it, not obeying it.
- **The judgment-pass row is the one to double-check yourself.** It is worth the most (38 points) and it is where the AI's own read can be too generous. If the group named and corrected a real benchmark against a real page, and showed the model flipping under the neutral prompt, that is a strong submission even if the writing is plain. The grading guide says so too.
- **The decoy-design row is the second to check yourself.** Confirm the group caught why the draft Pro plan was not a real decoy (it is cheaper than Plus and carries priority support Plus lacks), then compare their rebuilt decoy and target line by line. If the rebuilt decoy wins or ties on any attribute, the dominance is fuzzy and the row caps at Developing, no matter how the AI scored it.
- **Keep a fresh chat per group** so submissions do not blur together.
- Remember the framing for any feedback you pass on: *the instructor grades; the AI assists.* The score is yours.

---

## Part 4: Grade by hand instead (no AI at all)

If you would rather not use AI, grade straight from the rubric. Read each submission once, then score the five rows. The full answer key (why the draft decoy fails and what a correct rebuild looks like) is in `ch10-decoy-pricing-page-grading-guide.md`.

| Criterion | Points | What earns full marks |
|---|---|---|
| **Judgment pass: verified the AI and resisted its flattery** | 38 | Verifies the AI's competitor benchmarks against real pages (each marked confirmed or made up), catches one invented price, and shows the AI flipping under a neutral "argue this fails" prompt |
| **Decoy design: diagnosis and rebuild** | 26 | Names the attribute where the draft Pro plan's dominance breaks (price or priority support), then rebuilds a genuine asymmetric-dominance structure where the target beats the decoy on every attribute |
| **Buyer-split prediction** | 18 | Predicts the split with and without the decoy, tied to the Economist replication, and names the dominance-breaks boundary |
| **Individual artifact (each member)** | 12 | Every member's own page and split prediction are present and distinct |
| **Writing** | 6 | Plain, clear, correct terms |
| **Total** | **100** | |

**Fast bands:** 90 to 100, the draft's broken attribute named and a genuine asymmetric-dominance rebuild (decoy beaten on every attribute), a split prediction with and without the decoy tied to the Economist replication with the boundary named, every member's own distinct page, clear writing, and a real judgment pass (a benchmark verified or caught against a real page plus the model flipping under the neutral prompt); 80 to 89, solid work with one thin row; 70 to 79, present but mostly trusted the AI (fuzzy decoy, missed diagnosis, thin split reasoning, or prices kept with little checking); 60 to 69, AI prices and the flattering yes handed in as fact, or no real decoy logic; below 60 or integrity concern for a missing deliverable or an undisclosed AI dump (handle any academic-integrity matter through your institution's policy, not the rubric).

The single fastest signal of a strong submission: **a named competitor benchmark, verified or caught as invented against a real page, plus the model flipping when re-asked to argue the decoy will fail.** And the design check that takes one minute: confirm the group caught that the draft Pro plan was cheaper than Plus and carried priority support Plus lacked, then compare their rebuilt decoy and target attribute by attribute; if the decoy wins or ties on any one, the dominance is not real. Full details and failure modes are in `ch10-decoy-pricing-page-grading-guide.md`.
