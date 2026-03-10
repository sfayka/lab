---
layout: post
title: "The AI Shift Has Shifted: From Models to Operating Systems"
date: 2026-03-10
categories: [essays]
---

The AI story used to be easy: build a bigger model, publish bigger benchmarks, declare a winner. That era is fading fast.

What’s taking over is less glamorous and more important: **execution economics**. The winners now are the teams that understand three things deeply: how much compute actually costs over time, how much AI can harden core workflows instead of just generating text, and how quickly security and reliability can be encoded into every autonomous process.  

At business scale, tokens are not a rounding error — unit economics compound fast when usage becomes real. The actual promise isn’t clever chat; it’s orchestration: intelligence pushing mundane 1s and 0s around your infrastructure while your real costs (people) do real value-add work.


In other words, AI is no longer a research project. It’s becoming an operating model.

The headlines from the last week all point the same direction. The biggest investors and acquirers are no longer chasing another “model announcement” first. They’re buying infrastructure, workflow control, testing and security layers. If that sounds less dramatic, it’s because we’re finally leaving hype and entering boring-but-vital territory: **operating systems for work**.

---

## Build Infrastructure, Not Just Models

The Nscale + Broadcom deal is a clean signal of where serious enterprise AI is heading. On paper it looks like another piece of vendor news; in practice it’s a blueprint. Companies are no longer satisfied with a model endpoint and a chatbot wrapper. They want the plumbing that makes model use durable: model orchestration, infra orchestration, distribution, governance, and cost controls.

A lot of leadership teams still ask, “Should we buy or build?” The smarter follow-up is, “Where do we need to **own the stack** versus where do we need **resilience**?”

Nscale’s move into Broadcom’s ecosystem does two things:

1. **It validates AI as capex heavy**. Model compute is no longer an OPEX curiosity for experimentation. It is a strategic balance-sheet discussion.
2. **It turns vendor concentration into a board-level risk decision**. If your AI stack depends on one narrow set of providers, one outage, price move, or vendor policy decision you don’t agree with can crater margins and reputation overnight.
3. **It pushes demand planning up from IT to finance**. Compute burn rates are now forecast variables with strategic consequences, not just engineering trivia.

### What this means for business leaders: capex strategy, vendor concentration, and demand forecasting

If you still treat AI spend as “innovation budget,” you’ll miss the current cycle. You need a three-bucket model:

- **Strategic capex:** investments in internal orchestration, platform tooling, vector and feature stores, eval infrastructure, and internal policy guardrails.
- **Tactical OPEX:** model calls, third-party APIs, and managed platform usage.
- **Contingency capex:** migration readiness, portability layers, and fallback compute in case your primary stack shifts.

Executions that fail usually fail at one of two points: either overcommitting to a single provider or underinvesting in the tools that make switching and scaling practical. The new AI CFO mindset is simple: a model tie-up may look cheap today, but if it increases switching friction tomorrow, it gets expensive fast.

Demand forecasting also changes. Procurement and finance teams should model AI workloads like supply chain infrastructure, not project spend: peak windows, retry rates, multi-region routing, latency budgets, and quality targets all affect utilization. A team that can forecast demand at the workload level can justify AI investments with a level of rigor that used to be reserved for manufacturing and cloud capacity planning.

---

## Enterprise AI Is Becoming a Process Engine

The stories around Lio in procurement and Luma in creative production illustrate the same pattern from opposite ends of the enterprise. One is back-office process-heavy. The other is a creative workflow domain traditionally viewed as “human + talent + software.” Both are increasingly being rebuilt as AI-first systems.

What changed? AI has moved from “assistant layer” to “execution layer.” In Lio’s case, procurement isn’t getting smarter because someone typed better prompts. It gets better because repetitive and policy-heavy workflows can be encoded and continuously improved. In Luma’s case, creative production isn’t being replaced by bots; it’s becoming a loop where AI handles iterative generation, style matching, and revision routing while humans stay in charge of judgment, taste, and final composition.

The pattern is clear:
- **Inputs become structured**
- **Decisions become versioned**
- **Human review becomes conditional, not constant**
- **Speed comes from loop design, not model magic**

### What this means: back-office and creative pipelines become AI-operationalized first, not just chat assistants

The next generation of enterprise AI deployments will not start at customer support or sales. They will start where the pain is repetitive, rule-bound, and expensive: procurement, finance ops, logistics planning, content ops, localization, QA, and compliance prep.

You should think in terms of **agent-first process design**:
- Identify a workflow with high volume and clear checkpoints.
- Map each step into explicit state transitions.
- Add AI assistance at the highest-friction or highest-variance steps.
- Keep humans in the loop at exception points where policy, ethics, or ambiguity are highest.
- Measure completion quality, cycle time, and rework.

Executives should stop asking “Can we add ChatGPT here?” and start asking “Which process can become an autonomous flow by Friday, and what would break if it does?”

If you’re not treating process data as a first-class AI input—latency, exception reasons, handoff loops—you’re leaving most of the upside on the table. AI gets powerful when it operates inside a defined process contract. Outside that contract it produces output; inside it produces throughput.

---

## Security Is Becoming a Growth Constraint

The Promptfoo acquisition is less about headline M&A optics and more about a maturing market truth: **if AI agents fail, they fail loudly and repeatedly.**

As businesses scale AI pilots, “security” stops being just IAM, MFA, and endpoint policy. It becomes a product requirement spanning reliability, robustness, and observability. Prompt injection, data leakage, policy drift, chain-of-thought misuse, and silent model failure modes are now ordinary operational risks that compound with scale. Prompt-injection will only grow as an attack vector — and we’ll see new companies become enterprise heroes by catching and containing it.

The Promptfoo move reinforces that the market values tooling that can test, score, and harden AI systems continuously. It’s not about putting a gate at the front door; it’s about creating a control system around each milepost in the workflow.

### What this means: agent testing, governance, and observability are now default requirements

Three disciplines become non-negotiable in enterprise AI ops:

1. **Agent testing**  
   Just as no engineering team ships code without unit and integration tests, teams must now run regression-like suites for agent outputs: prompt changes, tool-call behavior, and decision quality under perturbation. If output confidence drops at scale, your growth system doesn’t “gracefully degrade”; it accumulates error.

2. **Governance by design**  
   Policies are now executable artifacts—policy packs tied to workloads, not PDF policies attached to systems. If a procurement agent has approval limits, jurisdiction rules, and escalation logic, those are testable controls, not tribal knowledge.

3. **Observability**  
   Every critical AI path needs tracing: prompt versions, context source, tool action, tool response, confidence metrics, operator interventions, and post-decision audit logs. If you cannot explain why an agent took an action, you don’t own the system. You’re renting risk.

The strategic implication is uncomfortable but simple: security cannot be a phase gate at the end of deployment. It must be embedded at architecture time, just like access control, monitoring, and incident response. In mature AI programs, security is now a **growth constraint** and a **trust dividend**. You don’t move from pilot to enterprise until both are in place.

---

## Valuation Reset for AI-Exposed Companies

The FactSet/Morningstar/Gartner storyline is the market’s attempt to price this transition. The old hierarchy—“best software brand, beautiful UX, healthy churn”—is no longer enough for AI-exposed firms. Investors are asking a harder question: *how much of your current value can survive when AI makes parts of your product stack table stakes?*

For many legacy software vendors, the current reset is painful but clarifying. AI is no longer a future upside line item; it is a cross-functional requirement that changes:

- **Product defensibility**: Can the company show AI-native features that competitors cannot easily replicate?
- **Go-to-market readiness**: Can it ship AI-enabled improvements quickly across multiple segments?
- **Operating leverage**: Can it automate internally and externally enough to grow margins, not just spend on compute?
- **Data moats**: Can it convert usage into proprietary, legal, reusable signals?
- **Execution maturity**: Does it have the infra, process, and governance stack to deploy at enterprise velocity?

### What this means: legacy software firms must prove AI defensibility and AI-enabled growth, not just existing quality

For buyers and executives in older product organizations, the new due diligence checklist changes in practical ways:

- Ask for evidence that AI features are tied to measurable workflow outcomes, not PowerPoint concepts.
- Stress-test product reliability and security assumptions through simulated attacks and abnormal traffic.
- Track unit economics at the AI feature level: does each feature reduce labor or improve conversion, retention, or cycle time enough to justify incremental spend?
- Confirm that leadership can make AI deployment repeatable—not dependent on a few heroic teams.

A company with excellent fundamentals but weak AI execution now looks like a company with good customers but fragile future. A company with solid execution mechanics—even if less famous—can command respect because it can out-run the race by compounding. Markets are voting for velocity and control, not just history.

---
