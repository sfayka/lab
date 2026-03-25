---
title: '"Build Me a $1M ARR Product" — Why AI Agents Fail (and What Actually Works)'
date: 2026-03-25
tags: [ai, agents, systems, reliability, control-plane, harness, linear, github, codex]
published: true
---

There is a moment in every agentic AI demo where something quietly goes wrong and nobody notices. The agent announces completion. The issue is marked done. The PR appears. Everyone claps. And somewhere, in a state machine nobody bothered to build, a task that was never actually finished just got filed away as finished.

This article is about that moment — why it keeps happening, what it would actually take to prevent it, and what a real control plane for AI-driven work looks like from the inside.

---

## Start With A Prompt

Let's begin with the most optimistic possible scenario. You open a chat interface, or a terminal, or whatever your favorite agentic surface is, and you type:

> Build me a $1M ARR product.

Maybe you're half-joking. Maybe you're completely serious. It doesn't matter. What matters is what happens next, because this is where most agentic systems either get quietly embarrassing or genuinely interesting.

A bad system will start generating. Immediately. It will produce a twelve-slide deck structure, suggest a SaaS pricing model, and probably offer to scaffold a Next.js app before you've had time to blink. If you're unlucky, it will also start creating Linear issues, push a branch, and send you a Slack message saying the project is underway. This is what automation theater looks like: high confidence, low grounding, zero verification.

A well-designed system will stop and ask questions. Not as a politeness gesture, but because the actual work of understanding what you want has to happen before any execution can be justified. And that distinction — between *asking because you want to seem thorough* and *asking because you genuinely cannot safely proceed without the answer* — is one of the deeper dividing lines in how agentic systems are built.

So the agent asks. It might ask:

- What problem does this product solve, and for whom specifically?
- What does the market look like? Existing competitors, underserved niches, distribution assumptions?
- What constraints are we working within? Team size, technical stack, timeline, budget?
- What does success look like in 6 months? In 18 months?
- What have you already tried, or already ruled out?

This is the interview phase, and it matters a lot more than people give it credit for. Not because AI needs to "understand your vision" in some spiritual sense, but because the output of this phase — a structured set of answers — is what eventually gets turned into a document the execution layer can actually reason over. Garbage in, garbage out, and vague product ideas are a specific flavor of garbage.

---

## From Conversation to Document

After the interview, the agent does something specific: it writes a PRD. Not a marketing document. Not a vision deck. A *Product Requirements Document* — a structured artifact that captures the product goal, the target user, the problem being solved, the proposed scope, the constraints, and the measurable success criteria.

Here is what a minimal PRD-like artifact might look like in a system that takes it seriously:

```json
{
  "id": "build-ops-dashboard",
  "title": "Ops Dashboard for Infrastructure Teams",
  "product_goal": "Give small ops teams a unified view of deployment health, incident status, and alert triage — without requiring a dedicated observability engineer.",
  "target_user": "Senior engineers at 20-100 person software companies who own their own infrastructure and are tired of context-switching between five different dashboards.",
  "problem_statement": "Current observability tools are either too expensive, too complex to configure, or designed for teams with dedicated SRE staff. Small ops teams end up with gaps or with dashboards nobody actually looks at.",
  "scope": [
    {
      "workstream": "Core Dashboard",
      "description": "Real-time deployment status view, incident timeline, and alert feed with severity tagging."
    },
    {
      "workstream": "Integration Layer",
      "description": "Connectors for GitHub Actions, PagerDuty, Datadog, and Grafana."
    },
    {
      "workstream": "Auth and Tenancy",
      "description": "SSO via SAML, multi-team workspace isolation, audit log."
    }
  ],
  "constraints": [
    "Must be deployable as a self-hosted Docker container.",
    "Initial release must work with GitHub Actions as the sole CI system.",
    "No proprietary data storage — use customer-provided databases."
  ],
  "success_criteria": [
    "A team of three engineers can go from signup to a populated dashboard in under 30 minutes.",
    "Supports at least 50 concurrent users per deployment without observable latency degradation.",
    "First paid customer within 90 days of initial release."
  ]
}
```

This is not a scratchpad. This is a contract. The rest of the execution flow — the work breakdown, the task creation, the routing to agents, the verification — all of it hangs off this artifact. If the PRD is vague or internally inconsistent, everything downstream inherits that vagueness and inconsistency. The interview phase exists to prevent exactly that.

---

## Breaking Down the Work

With a PRD in hand, the system moves into decomposition. This is where the product goal gets turned into a hierarchy of executable work items: epics broken into features, features broken into tasks, tasks parameterized enough that an executor can pick one up and run without needing to ask three follow-up questions first.

This step is frequently underestimated. People treat it as "generating a list of tickets," which technically it is, but the quality difference between a good breakdown and a bad one is enormous. A good breakdown gives each task a clear acceptance criterion, a deliverable type, a set of constraints, and a stated success signal. A bad breakdown produces a list of vague nouns — "authentication," "database," "frontend" — that an executor will interpret differently every time.

After decomposition, the work items get surfaced for human review before they go anywhere near execution. This is intentional. The review-and-approve step is a circuit breaker: if the breakdown is wrong, the moment to catch that is before a coding agent has spent three hours implementing the wrong thing. A `WorkItemReviewDecision` is explicit in the data model — approve it, reject it, or modify it. Nothing proceeds until that gate has been cleared.

Once approved, the work items are ingested into the system as canonical `TaskEnvelope` records. Linear issues get created. The control plane now owns these tasks, and the execution phase can begin.

![The Harness task overview showing multiple tasks across different lifecycle and reconciliation states]({{ "/assets/images/harness/01-task-overview.png" | relative_url }})
*Each row is a task. Each tag is a fact, not an opinion — verified against the systems that actually know.*

---

## Execution: Where the Wheels Usually Come Off

Here is where we have to stop being charitable about the current state of agentic systems.

The typical pattern today looks like this: a task gets routed to a coding agent — Codex, Claude, Cursor, pick your favorite — the agent runs, produces some output, marks the task complete, and moves on. Maybe a PR gets opened. Maybe not. Maybe the PR is in the right repo. Maybe not. Maybe the code actually solves the problem. Probably not entirely. But the task is marked done, the Linear issue is closed, and the next item begins.

This is not a failure of model capability. The models are often genuinely impressive at execution. The failure is structural: there is no system around the agent that validates what it actually did. There is no enforcement layer. There is no reconciliation between what the agent claimed and what actually happened in GitHub, in Linear, in the codebase. The agent's self-report is treated as ground truth, and self-reports have a well-known tendency to be optimistic.

Ask yourself: if an agent marks a task complete with no PR, no commit, no changed files, no verifiable artifact of any kind — how does your system detect that? In most systems built today, the answer is: it doesn't. The task is just done. It goes into the completed pile. Someone reviews it weeks later during a sprint retrospective and discovers it was never actually finished. Congratulations, you've automated your way to exactly the same failure mode you had before, just faster and with more confidence.

This is the core problem that motivated building Harness, and it is worth being precise about what the problem actually is.

---

## The Missing Layer

The problem is not intelligence. Models are smart enough to do a lot of the work. The problem is that **there is no control plane**.

What is a control plane, in this context? It is the system that sits between the agents doing work and the systems of record tracking work. It is responsible for:

- Normalizing raw requests into structured, executable task contracts
- Routing work to appropriate executors
- Tracking lifecycle state with explicit, enforced transitions
- Collecting completion evidence and evaluating it against policy
- Reconciling internal state with external systems of record
- Deciding — not merely observing — whether work is actually complete

This is a distinct concern from agent capability, from LLM reasoning, from multi-agent coordination, and from task planning. Those are all real concerns, but they are upstream. The control plane is the layer that decides what to do with the output of all of those things. Without it, you end up with agents that are individually capable but collectively unreliable, because there is nothing enforcing correctness at the system level.

The best analogy is probably distributed systems more broadly. You can have individually correct services and still end up with a distributed system that produces incorrect results, because correctness at the component level does not automatically give you correctness at the system level. You need consistency models, conflict resolution, explicit state management, and recovery protocols. The same logic applies to AI-driven work.

Harness is that layer. Not an agent. Not a planner. Not a UI. A system that enforces correctness around execution.

---

## The TaskEnvelope: Work as a Contract

The fundamental unit of work in Harness is the `TaskEnvelope`. This is not a lightweight todo item. It is a structured contract that contains everything needed to execute, track, verify, and audit one unit of work.

Here is a concrete example of a TaskEnvelope for a specific feature task, abbreviated for clarity:

```python
task_envelope = {
    "id": "task-auth-sso-001",
    "title": "Implement SAML SSO for workspace login",
    "description": "Add SAML 2.0 SSO support to the workspace authentication flow. Users should be able to log in via their identity provider instead of email/password.",
    "origin": {
        "source_system": "harness",
        "source_type": "decomposition",
        "source_id": "prd-build-ops-dashboard",
        "ingress_name": "GoalToWork",
        "requested_by": "sean.fay@knoxanalytics.com",
    },
    "status": "dispatch_ready",
    "objective": {
        "summary": "Add SAML 2.0 SSO support to workspace authentication.",
        "deliverable_type": "code_change",
        "success_signal": "A pull request exists with passing tests, the SAML SP metadata endpoint responds correctly, and an identity provider can complete an authentication round-trip in the staging environment.",
    },
    "acceptance_criteria": [
        {
            "id": "ac-saml-1",
            "description": "SAML SP metadata endpoint is reachable and returns valid XML.",
            "required": True,
        },
        {
            "id": "ac-saml-2",
            "description": "A pull request exists in the expected repository with the SAML integration changes.",
            "required": True,
        },
        {
            "id": "ac-saml-3",
            "description": "All existing auth tests pass. No regressions.",
            "required": True,
        },
    ],
    "constraints": [
        {"type": "technical", "description": "Use python3-saml, not custom XML parsing.", "required": True},
        {"type": "scope", "description": "SAML only. OAuth/OIDC is out of scope for this task.", "required": True},
    ],
    "assigned_executor": {
        "executor_type": "codex",
        "executor_id": None,
        "assignment_reason": "Task requires code editing and testing capabilities.",
    },
    "required_capabilities": ["code_editing", "testing"],
    "priority": "high",
    "artifacts": {
        "items": [],
        "completion_evidence": {
            "policy": "required",
            "status": "pending",
            "required_artifact_types": ["pull_request", "commit"],
            "validated_artifact_ids": [],
        },
    },
}
```

A few things worth noting here. The `acceptance_criteria` are specific enough to be mechanically evaluated. The `constraints` are explicit enough to detect violations. The `completion_evidence.policy` is `required`, which means the system will refuse to accept this task as complete unless it can verify a pull request and a commit actually exist in the expected context. The `status` is `dispatch_ready`, not `executing`, because state transitions are enforced — you cannot skip directly from dispatch_ready to completed, and the system will enforce that.

The lifecycle states in Harness are not informal labels. They represent precise positions in a policy-enforced state machine:

- `intake_ready` → the task has entered the system and is waiting for normalization or clarification
- `planned` → the task has been decomposed and structured enough to route
- `dispatch_ready` → the task is ready for executor assignment
- `assigned` → an executor has been chosen but execution has not yet started
- `executing` → the executor is actively working
- `blocked` → the task cannot currently proceed and a reason must be stated
- `completed` → the task has satisfied its acceptance criteria and evidence policy *and* reconciliation has not contradicted that
- `failed` → terminal failure
- `canceled` → intentionally stopped

The transitions between these states are not free. An executor cannot move a task from `executing` to `completed` by fiat. The control plane makes that call, based on what the evidence actually shows. This distinction matters enormously in practice.

---

## Completion Evidence: The Thing Everyone Skips

When an agent finishes work, it produces one or more outputs. Maybe a PR. Maybe a commit. Maybe a set of changed files. Harness calls these *artifacts*, and it tracks them with provenance — where did this artifact come from, how was it captured, what is its verification status?

Here is what a completion evidence bundle looks like after a successful execution:

```python
completion_evidence = {
    "policy": "required",
    "status": "satisfied",
    "required_artifact_types": ["pull_request", "commit"],
    "validated_artifact_ids": ["artifact-pr-saml-001", "artifact-commit-saml-001"],
    "validation_method": "external_reconciliation",
    "validated_at": "2026-03-25T14:22:00Z",
    "validator": {
        "source_system": "harness",
        "source_type": "verification",
        "source_id": "verification-run-saml-001",
        "captured_by": "github-sync",
    },
    "notes": "PR #47 verified in expected repository. Commit sha matches branch head. Linear issue HAR-47 found and in correct state.",
}
```

The `status: "satisfied"` does not come from the agent. The agent does not set this field. The agent submits artifacts and reports that it believes the work is done. Harness then independently verifies those artifacts against the evidence policy, cross-references them against GitHub and Linear, and only then does it update the evidence status. If no artifacts are attached, `status` remains `pending`. If artifacts exist but cannot be verified against the expected repository or branch, `status` becomes `insufficient`. If artifacts are present but external systems contradict them, that is an `external_mismatch`, which is a different problem entirely.

This distinction between *insufficient evidence* and *external mismatch* is not pedantry. They are genuinely different failure modes that require different responses:

- Insufficient evidence means the support is missing or not yet validated. The fix is to attach or validate more evidence, then re-run verification.
- External mismatch means contradictory facts already exist. The fix is to understand why the systems disagree, resolve the contradiction, and then re-run reconciliation.

Collapsing these into a single "something went wrong" category is exactly how you end up with debugging sessions where nobody can figure out whether the agent failed to produce output or whether the output it produced ended up in the wrong place.

![The Harness detail view for an accepted completion, showing verification outcome, reconciliation across Linear and GitHub, and evidence proof]({{ "/assets/images/harness/02-accepted-completion-detail.png" | relative_url }})
*"All systems aligned" isn't a marketing phrase here — it's a reconciliation result. Linear passed, GitHub has artifacts, Harness accepted. That's what done looks like.*

---

## The Verification Engine

Verification in Harness is a policy decision, not a pass/fail flag. The verification engine consumes multiple classes of input — runtime facts from the executor, artifact records, completion evidence state, and reconciliation results from GitHub and Linear — and produces a structured decision bundle.

The possible outcomes are:

- `accepted_completion` — all policy conditions satisfied, task remains or becomes completed
- `insufficient_evidence` — required artifacts missing or not validated, task moves to blocked
- `external_mismatch` — evidence or state contradicted by external systems, task moves to blocked or requires review
- `review_required` — verification cannot safely decide automatically, task escalated to manual review
- `completion_rejected` — terminal policy failure, task moves to failed

Here is what a verification result looks like in the data:

```python
verification_result = {
    "verification_id": "vr-saml-001-run-2",
    "task_id": "task-auth-sso-001",
    "verification_result": "accepted_completion",
    "decision_summary": (
        "All required acceptance criteria satisfied. Evidence policy is 'required' and status "
        "is 'satisfied'. GitHub artifact facts match expected repository and branch. "
        "Linear issue HAR-47 is in 'in_progress' state, which is non-blocking for this verification pass. "
        "No mismatch categories triggered. Task may remain completed."
    ),
    "decision_reasons": [
        "pull_request artifact verified in sfayka/ops-dashboard, branch feature/saml-sso",
        "commit sha abc1234 present and matches branch head",
        "acceptance criteria ac-saml-1, ac-saml-2, ac-saml-3 all evaluated as satisfied",
        "no blocking reconciliation mismatch detected",
    ],
    "evidence_evaluated": ["artifact-pr-saml-001", "artifact-commit-saml-001"],
    "task_update": {
        "status": "completed",
        "reason": "Verification accepted. Evidence policy satisfied and reconciliation non-blocking.",
    },
}
```

This is a decision that can be reviewed, audited, and explained. You can look at it later and understand exactly why the system accepted completion. You can look at a blocked task and understand exactly what was missing or contradicted. This is the operational property that most agent systems are missing entirely: you cannot currently tell, in most agent frameworks, *why* a task ended up in the state it is in. You can tell what state it is in. That is not the same thing.

---

## Reconciliation: Comparing Stories

Even if evidence is present and verified, there is a third check: do the external systems agree with what Harness believes?

Reconciliation compares Harness's internal task state against GitHub facts and Linear facts and looks for contradictions. The possible mismatch categories include:

- `missing_required_artifact` — the expected artifact type has no record
- `github_artifact_not_found` — the PR or commit referenced in Harness cannot be found in GitHub
- `linear_state_conflict` — Linear says the issue is in a state that contradicts the claimed completion
- `wrong_repository` — evidence exists, but in a different repo than expected
- `wrong_branch` — commit or PR is on the wrong branch
- `completion_without_reconciliation` — the task reached `completed` without ever being reconciled

The `wrong_repository` case deserves special attention. This is how you catch an agent that ran in the wrong codebase context — a scenario that sounds unlikely but happens regularly when agents are given ambiguous execution environments, when credentials are misconfigured, or when a task's context window doesn't include enough information about where the work is supposed to land. Without reconciliation, this failure is invisible: the agent reports success, the artifacts exist, everything looks fine, except the code is in the wrong repo and will never be merged into the product you were trying to build.

When reconciliation fails, the consequence depends on what kind of failure it is. A potentially-resolvable mismatch (evidence not yet propagated, Linear not yet synced) moves the task to `blocked`. A terminal mismatch (wrong repo, contradictory facts that cannot be recovered from) moves the task to `failed`. A mismatch that requires human judgment moves it to `review_required`. None of these outcomes are "something went wrong, good luck figuring out what" — they are specific, classified, and auditable.

![The Harness detail view for a blocked task with contradictory facts — verification not accepted, Linear and Harness in conflict, systems-disagree state surfaced explicitly]({{ "/assets/images/harness/04-contradictory-blocked-detail.png" | relative_url }})
*Evidence exists. The PR is there. The commit is there. But Linear still shows the work as active, and Harness won't pretend otherwise.*

---

## A Simulated Run

Let's walk through what a real execution trace looks like in Harness, from goal to completion — including the failure cases.

**Step 1: Goal ingestion.** The user's request is captured and normalized into a `GoalToWorkRequest`. The system runs the interview phase, produces a PRD artifact, decomposes it into work items, and surfaces those for review.

**Step 2: Review and approval.** The work breakdown is reviewed. Some tasks are modified (the scope on the SAML task was too broad initially — OAuth was excluded), all are approved. Tasks are ingested as `TaskEnvelope` records with status `intake_ready`.

**Step 3: Planning and dispatch.** Tasks transition through `planned` → `dispatch_ready`. The dispatcher matches each task to an executor based on `required_capabilities`. The SAML task is routed to Codex.

**Step 4: Execution.** Codex begins work. The task moves to `executing`. After some time, Codex reports success and submits the following artifacts: a PR number, a commit SHA, and a log of the test run.

**Step 5: First verification pass — blocked.** Harness evaluates the submitted evidence. The PR number is present, but the commit SHA references a branch that does not exist in the expected repository. GitHub fact check: `branch_not_found`. Verification result: `external_mismatch`. Task moves from `executing` back to `blocked`. The mismatch is logged with category `wrong_branch`. Nobody has to go hunting through logs to figure out what happened — the system tells you.

**Step 6: Agent retry.** Codex is notified of the blocking condition and the specific mismatch. It re-runs, this time creating the branch correctly. New artifacts are submitted: PR #47 in `sfayka/ops-dashboard`, branch `feature/saml-sso`, commit `abc1234`.

**Step 7: Second verification pass — review_required.** Evidence is now present and the branch is correct. But reconciliation finds that the PR has two approvals and one "request changes" review outstanding. Automatic verification cannot decide whether this should count as complete. Verification result: `review_required`. A review request is created with trigger `VERIFICATION_UNCERTAINTY` and sent to the task owner.

**Step 8: Manual review and resolution.** The reviewer looks at the PR, determines the "request changes" is on a style nit that does not affect correctness, and approves the review request in Harness. The review record is attached to the task. Verification re-runs with the review decision as an additional input.

**Step 9: Accepted completion.** Third verification pass. Evidence policy: satisfied. GitHub facts: non-contradictory. Linear issue HAR-47: in-progress (non-blocking for this pass). Review decision: accepted. Verification result: `accepted_completion`. Task moves to `completed`. The completed state is now durable.

This is not a demo scenario with hand-picked happy paths. These are the actual failure modes — wrong branch, outstanding PR review, missing artifacts — that come up in real execution. The system does not hide them. It classifies them, routes them to the right resolution path, and keeps the audit trail intact.

![The Harness timeline for an accepted completion task, showing artifact capture events, status transition from executing to completed, and the evaluation record]({{ "/assets/images/harness/03-accepted-completion-timeline.png" | relative_url }})
*Every state change has a source, a timestamp, and a reason. This is the audit trail that makes post-mortems useful instead of a blame game.*

---

## The Integration Layer

Harness connects to three external systems, each with a distinct role:

**Linear** is the work surface and system of record for intended work. Humans and agents coordinate issues, projects, and workflow state there. When a task enters Harness from Linear, a thin adapter normalizes the Linear issue shape into a canonical `TaskEnvelope`. When a task completes or fails in Harness, the outcome is written back to Linear so the work surface reflects reality. Linear is not where completion is *decided* — it is where it is *recorded*.

**GitHub** is the source of truth for executed artifacts. When Harness needs to verify a completion claim, it checks GitHub for the artifacts the executor said it produced. The GitHub fact bundle includes repository identity, branch identity, PR presence and state, commit presence, review state, and changed file evidence. Harness does not trust the agent's report of what is in GitHub. It checks.

**Agents** (Codex, Claude, others) are workers. They are assigned tasks through the executor contract, they produce artifacts, and they report execution facts back to Harness. They do not own lifecycle transitions. They do not decide when a task is complete. They supply the raw material that the verification layer evaluates. This is an intentional architectural boundary — if you want to swap out Codex for Claude, or add a new executor type, you do that by implementing the executor contract, not by changing the control plane.

The API surface for this integration is minimal and intentional:

- `POST /tasks` — submit a new task for control-plane evaluation
- `POST /ingress/linear` — normalize a Linear issue into a canonical task and submit
- `POST /tasks/<id>/reevaluate` — submit new artifacts or facts and re-run verification
- `GET /tasks/<id>/read-model` — get the current inspection snapshot for a task
- `GET /tasks/<id>/timeline` — get the flattened event timeline for a task

The timeline endpoint is particularly important from an operational standpoint. It gives you a complete, ordered trace of everything that happened to a task: when it was created, when it transitioned states, what artifacts were submitted, what verification passes ran, what they found, and why each lifecycle transition happened. This is the audit trail that makes post-mortems possible.

---

## What This Is Actually Solving

Let's step back and be direct about the claims being made here.

Agents do not fail because they are not smart enough. The models are often more capable than the tasks they are given. They fail because there is no reliable system around them. When you give a capable model a vague task with no verification loop, no evidence requirements, and no reconciliation check, you are not using AI to build software — you are using AI to *generate the appearance of building software*. The distinction matters if you are trying to ship something.

The phrase "completion without evidence is just lying with confidence" is deliberately provocative, but it is also just accurate. A task that is marked done with no PR, no commit, no changed files, and no verifiable artifact is not a completed task — it is an agent's opinion about a completed task. Treating those two things as equivalent is the source of most of the reliability problems people complain about in production agent systems today.

The control plane pattern is not novel. It is the same idea that makes distributed systems reliable: you cannot trust component-level assertions, so you build a layer that independently verifies system-level properties. You compare states, classify mismatches, enforce consistency, and make recovery paths explicit. The reason this pattern is not ubiquitous in AI systems yet is not that it is hard to understand — it is that most of the conversation about agentic AI is still focused on capability rather than reliability. That will change, because it has to.

Harness is an implementation of this pattern for a specific problem domain: AI-driven software development work. The specific choices — `TaskEnvelope` as the canonical contract, Linear as the work surface, GitHub as the artifact source of truth, the verification engine with its explicit outcome classes — are informed by real building experience. Not by theoretical concerns about what could go wrong. By what actually goes wrong, repeatedly, when you try to run software development work through AI agents without a control plane underneath them.

---

## What Is Not Here Yet

A note on scope, because honesty is more useful than marketing.

Harness is architecture-first right now. The control-plane model is implemented and testable. The `TaskEnvelope` contract is defined and schema-validated. The verification engine runs canonical cases. The demo pack produces readable timelines and Mermaid traces. The local API and dashboard work.

What is not production-ready: live GitHub and Linear connectors that handle the full breadth of real-world state, a dispatcher with sophisticated routing logic, a full planner that handles arbitrary work decomposition at scale, and the operational surface you would need to run this in a production environment with real users.

This is deliberate. Getting the model right matters more than shipping something that appears complete but has the same problems under the hood that it is supposed to solve. The architecture was designed to be buildable in layers, so each piece can be validated before the next one goes in.

The goal is not to out-reason model-native task runners. The goal is to ensure that when agents do work, that work is artifact-backed, verifiable, and aligned with system-of-record workflows. That is a narrower and more achievable goal than "making agents smarter," and it is the goal that actually matters for reliability in production.

---

## A Final Thought on Agent Frameworks

There are a lot of agent frameworks. LangChain, AutoGen, CrewAI, Swarm, the framework that was released last week, the one that will be released next week. Most of them are primarily about *orchestration* — how do you chain prompts together, how do you route between models, how do you manage context windows across a multi-agent workflow.

None of that is wrong. Orchestration is a real problem. But orchestration is not the same problem as *reliability*. You can have a perfectly orchestrated multi-agent workflow that is completely unreliable from a completion and auditability standpoint, because the agents talk to each other in structured ways but nothing verifies that the output of the workflow is actually correct.

The layer that is missing from most agent systems is not a smarter router. It is not a better prompt template. It is not a new model. It is the thing that sits after execution and asks: *did this actually happen, and can you prove it?*

That question turns out to be the whole game.
