# Prompting Is Not the Moat. Queue Design Is.

Model quality matters, but queue design is the operational moat for SMBs. Two teams can run the same model and get very different outcomes because their routing, retry, and escalation logic differ. This outline focuses on orchestration patterns that make AI systems reliable and repeatable under real workload and failure conditions.

## Why this matters now
- SMBs increasingly compete on execution speed and reliability, not just access to a strong LLM.
- Same foundation model + same prompts can produce wildly different business results depending on task decomposition and failure handling.
- Poorly designed queues create avoidable costs: duplicate work, missed SLAs, and unresolved escalations.

## Sections
### 1) The orchestration layer is the real product
- Treat prompt design as a component, not the system.
- Define workflow graph nodes: parser, enricher, reasoner, tool action, reviewer, emitter.
- Decide whether each node is parallelizable, sequential, or conditional.

### 2) Routing rules before model cleverness
- Route by channel, domain, urgency, data confidence, customer tier, and risk score.
- Keep explicit fallback routes: secondary model, deterministic policy, or queue-to-human.
- Prevent dead loops by enforcing max hops and route guards.

### 3) Retries and fallback as safety infrastructure
- Use bounded retries with jitter and idempotency keys for mutable operations.
- Classify retry outcomes: transient infra error vs irrecoverable data gap.
- Ensure retries never duplicate side effects in billing/support/crm updates.

### 4) Approval gates and escalation paths
- Use escalation as design-first, not patch-last: explicit gate nodes with policy metadata.
- Separate “blocking approvals” (must happen before action) from “audit approvals” (after action).
- Route to specialist queues based on failure cause, not generic “triage.”

### 5) Why two companies diverge with the same model
- Same model performance can diverge because of schema validation, tool reliability, timeout settings, and handoff quality.
- Queue discipline changes error compounding rate (not just first-pass quality).
- Governance logs and policy overrides shape trust—and adoption—faster than prompt tweaks.

### 6) Operationalizing queue design
- Implement contract tests for queue nodes: expected inputs/outputs, timeout budgets, and dead-lettering.
- Alert on queue depth, retry ratio, fallback rate, and unresolved approvals.
- Review queue design in monthly architecture cadence, not only after incidents.

## Failure modes to avoid
- Treating retries as “more of the same” without changing behavior/state handling.
- Lacking idempotency on mutating actions during retries.
- No dead-letter queue for irrecoverable failures.
- Human escalations mixed with normal flow, causing priority inversion.
- Dynamic routing based on unstable heuristics without observability.

## Operating decision or implementation lesson
**Build queues with explicit routes, bounded retries, and enforced escalation criteria first—then tune prompts, because orchestration reliability—not wording—drives the business outcome.**

## References
- https://aws.amazon.com/step-functions/  
- https://www.temporal.io/
- https://docs.camunda.com/
- https://www.svix.com/resources/queues-for-event-driven-systems/
- https://www.pydantic.dev/
