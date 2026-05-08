# Issue #44 Draft Article

## Plan

- [x] Confirm the current open issue details for #44.
- [x] Review adjacent Lab posts for voice, overlap, and article shape.
- [x] Check current external signals on MCP governance and secure agent access.
- [x] Draft an unpublished article for issue #44.
- [x] Run the smallest relevant verification for the site.
- [ ] Commit, push, and open a PR for review.

## Brief Spec

Draft a Lab article arguing that MCP's durable product surface is not connector count, but governed action. The article should avoid a protocol explainer shape and instead focus on production trust boundaries: permissions, approval inheritance, agent-vs-human authority, audit trails, and what happens when low-trust data influences high-trust actions.

## Review

- `npm run build` initially failed because local dependencies were missing.
- `npm install` installed dependencies but created local generated metadata that was not needed for the PR.
- `npm run build` then failed inside the sandbox because Next could not fetch Google font assets.
- `npm run build` passed with escalated network access for the font fetch.
- Generated build/dependency files were removed and `tsconfig.json` was restored so the PR stays focused on the article draft and task notes.