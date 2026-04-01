---
title: "Overnight, Unsupervised, and Still Telling the Truth"
date: 2026-04-01
tags: [ai, agents, systems, automation, harness, verification, reliability]
categories: [essays]
layout: post
published: true
---

A lot of systems can be made to work once. You set up the environment, run the demo, watch the right outputs appear, and close your laptop feeling satisfied. That's not a meaningless threshold — something working at all is better than nothing working — but it's also not a particularly high bar, and anyone who has taken a demo-grade system into production has learned why.

The harder question, the one that actually determines whether a system is useful or just interesting, is what it does when you're not there. What happens after an hour of unattended operation? After six? After the entire overnight window, with nobody correcting, refreshing, or manually interpreting what came back? That's when the gap between systems that look reliable and systems that are reliable tends to become visible. A watched pot produces better outcomes than an unwatched one, not because the water heats differently, but because someone is there to notice when something goes wrong and course-correct.

The question I wanted to answer with Harness wasn't whether the control plane could handle a scenario correctly once. It was whether it could keep handling scenarios correctly across an extended unattended run, without accumulating errors, drifting into ambiguous state, or quietly misclassifying what was happening while nobody checked.

---

The setup for the overnight run is straightforward. The unattended runner executes against the hosted Harness backend on a fixed interval. Every cycle, it runs the same three canonical scenarios: `happy_path`, `mismatch`, and `review_required`. These are not random experiments or fuzz inputs. They are deliberately chosen to cover the three outcome categories the control plane needs to classify correctly: successful evidence-backed completion, expected semantic failure due to reconciliation mismatch, and expected semantic failure due to evidence that requires human review before the system can accept or reject it.

For each scenario, the runner constructs a task envelope with the appropriate artifacts, submits it to the backend, evaluates it against the verification and reconciliation policies, and fetches the final state. Every HTTP exchange is preserved as a raw artifact — create request, create response, evaluate request, evaluate response, initial fetch, final fetch — and a structured JSONL entry is written to the run log. Then the runner sleeps and repeats.

The three expected outcomes are fixed: `happy_path` should resolve to `completed`, `mismatch` should resolve to `failed`, and `review_required` should resolve to `in_review`. The runner knows this in advance. Its job is to compare what actually happened against what should have happened and report the result honestly. If they match, the outcome is classified as `expected_success` or `expected_semantic_failure` depending on the scenario. If they don't match — if the backend returned something that contradicts the predicted outcome — the runner classifies it as `unexpected_failure` and triggers diagnostic analysis.

The important distinction is already visible in that structure. `mismatch` and `review_required` are not error conditions. They are correct outcomes. A runner sophisticated enough to treat `failed` as success when `failed` was the right answer, and `in_review` as success when human escalation was required, is making a fundamentally different claim about the system than one that only marks green runs as passing. The former is telling you something true about how the control plane behaves. The latter is just counting times the happy path ran without crashing.

---

After running overnight, the log contained no `unexpected_failure` entries. Every `happy_path` run was classified `expected_success`. Every `mismatch` run was classified `expected_semantic_failure`. Every `review_required` run was classified `expected_semantic_failure`. The diagnostic report directory, where failure analysis gets written when something genuinely breaks, contained nothing from the overnight session. The runner had nothing to escalate.

What the log did contain, repeated consistently across every entry, was a pattern in the structured fields that is worth reading carefully rather than skimming past. The fields present in each entry include `expected_outcome`, `actual_outcome`, `expected_outcome_matched`, `outcome_class`, `classification`, `retry_count`, `retry_result`, `reconciliation_status`, `verification_passed`, `requires_review`, `final_status`, and `raw_files`. The values of those fields across the entire run were stable.

`expected_outcome_matched` stayed `true`. `classification` stayed `none`. `retry_count` stayed `0`. `retry_result` stayed `not_needed`.

Those four fields together tell a specific story. `expected_outcome_matched: true` means the backend's actual outcome agreed with the predicted outcome on every run, not just the green ones. `classification: none` means the runner's failure classifier — the component that determines why something went wrong and whether it's retryable — never had a case to work with. The failures it was trained to identify simply didn't appear. `retry_count: 0` and `retry_result: not_needed` mean the self-healing mechanism, which exists for transient backend issues like cold start timeouts and temporary unavailability, never activated. The system didn't need to compensate for instability. It ran without interruption.

A representative entry from the `mismatch` scenario looks like this:

```json
{
  "scenario": "mismatch",
  "expected_outcome": { "final_status": "failed" },
  "actual_outcome": { "final_status": "failed" },
  "expected_outcome_matched": true,
  "outcome_class": "expected_semantic_failure",
  "retry_count": 0,
  "retry_result": "not_needed"
}
```

Not "it failed," but "it failed exactly the way it was supposed to." That's the whole distinction this system is built around.

The significance is not just that the system avoided crashing. It is that the system consistently matched the expected semantics of each scenario, across all three outcome categories, without requiring any self-correction. That's a more specific claim than "it stayed up." It means the classification model is stable, the state transitions are stable, and the control loop is not drifting.

---

Most agents will happily tell you everything is fine, right up until you check. Most systems can tell you whether something happened. Very few can tell you whether what happened matched what should have happened.

The distinction sounds pedantic until you try to build a pipeline that depends on it. An agent that reports "task complete" tells you something happened. A control plane that says `expected_outcome_matched: true` tells you the outcome was evaluated against a prediction derived from the scenario's semantics, and the prediction was correct. Those are different levels of accountability. The first is narration. The second is verification.

The `outcome_class` field carries this further. There are three possible values: `expected_success`, `expected_semantic_failure`, and `unexpected_failure`. An unattended runner that only ever produces `expected_success` entries is telling you it ran the happy path and the backend agreed. An unattended runner that consistently produces both `expected_success` and `expected_semantic_failure` entries, with no `unexpected_failure` entries, is telling you something more interesting: the system correctly differentiated between three qualitatively different outcomes, did not conflate them, and did not misclassify a valid failure state as an error that needs investigation.

The overnight log is full of `expected_semantic_failure` entries. That is the correct reading of those entries. The `mismatch` scenario is designed to surface reconciliation failures — specifically, a task where the PR artifact is linked against the wrong repository. The backend is supposed to reject that. It rejected it correctly, on every run, all night. The `review_required` scenario is designed to surface unresolvable external evidence — a task where the Linear record can't be confirmed, which requires human review before the system can accept or deny completion. The backend escalated that to `in_review` correctly, on every run, all night. Two scenarios that produce non-green outcomes were treated as expected, not flagged as problems, because they weren't problems.

A system that pathologizes its own correct behavior — that raises an alert when `failed` is the right answer — is not just noisy. It's wrong about what success looks like.

---

A single green run demonstrates that a scenario is possible. It's evidence that the system could handle this input at this moment, under these conditions, while you were watching. It says nothing about stability.

What the overnight run demonstrates is different and, for production purposes, more relevant. An unattended runner that survives eight hours without generating unexpected failures tells you the classification model is stable under repeated execution — the logic that distinguishes `expected_semantic_failure` from `unexpected_failure` didn't flip. It tells you the state transitions are stable — the backend didn't start returning inconsistent lifecycle states after run forty or run ninety. It tells you the control loop is honest — the runner was not silently misclassifying outcomes and recording them as matches, which is the failure mode that would be most dangerous and least visible.

That last one deserves a longer look. A crash is visible. A system that quietly starts classifying wrong outcomes as correct is not. A classification drift — outcomes that should be `unexpected_failure` getting quietly reclassified as `expected_semantic_failure` to keep the numbers clean — would look like a healthy run from the outside. The log would show consistent entries, `expected_outcome_matched: true` everywhere, nothing alarming. The system would be wrong, and nothing would signal that it was wrong. This is the same failure mode as the agents the prior article described — systems reporting on themselves, confidence laundered as ground truth, no external check on whether the self-report is accurate.

The overnight log is evidence that this didn't happen. The `unexpected_failure` query returned nothing because there were no unexpected failures, not because they were being suppressed. The diagnostic reports directory was empty because the diagnostics were never triggered. The fields are consistent because the outcomes were consistent, not because somebody cleaned up the log before inspection.

---

Harness is a control plane. The previous article laid out the core argument: a task isn't done because an executor says so, it's done when external evidence confirms it. The reconciliation layer checks what the executor claimed against what the external systems actually show. The verification policy decides whether the evidence is sufficient to accept, reject, or escalate.

That architecture depends on the control plane being trustworthy about its own conclusions. If the evaluation logic drifts, if the state machine produces inconsistent transitions over time, if the outcome classification starts breaking down under accumulated load — the control plane becomes exactly as unreliable as the agents it's supposed to govern, just with better-looking log fields.

Without a control layer, you do not have automation. You have optimistic execution plus whatever stories the executor tells afterward. But a control layer that can't be trusted to run unattended isn't much of an improvement. It just moves the supervision requirement one level up. Instead of watching the agent, you're watching the watchdog.

The overnight run matters because it's evidence that the system keeps classifying reality correctly when nobody is there to interpret it manually. The verification pipeline — evidence validation, reconciliation against external systems, verification decision, lifecycle transition — ran the same way on the hundredth iteration as it did on the first. The outcomes were legible, consistent, and correct. The loop closed without intervention.

That's the threshold that actually matters for production use: not whether the system can be made to work in a controlled demonstration, but whether it remains honest about what it's seeing when the demonstration ends and the workload continues.

---

To be direct about what this is and what it isn't: the overnight run was a dry run. All three scenarios are synthetic. The `happy_path` doesn't represent real work that completed — it represents a payload carefully constructed to satisfy the verification policy. The `mismatch` doesn't represent a real reconciliation failure in a real repository — it represents a constructed mismatch designed to test that the rejection logic fires correctly. The `review_required` scenario doesn't involve a real Linear record that genuinely needs review — it represents a deliberately unresolvable reference that should trigger escalation.

This is not a critique of the approach. Dry runs against canonical scenarios are the right way to validate that a verification pipeline behaves correctly across its expected input space before exposing it to real work. But it means the next step is real work, not more synthetic validation. The scenarios need to run against actual tasks, actual external records, actual artifact chains that weren't constructed to pass or fail in a particular way.

What the overnight run establishes is that the control plane has earned the right to be tried on real work. The classification logic is stable. The state machine is consistent. The system does not lie about what it's seeing when nobody is supervising it.

This wasn't proof the system works in production. It was proof the system doesn't lie when left alone. That's the bar you have to clear before anything else matters.

The bar for "trustworthy unattended operation" is not passed once and assumed forever. It has to keep being passed. Last night it was. That's a start.
