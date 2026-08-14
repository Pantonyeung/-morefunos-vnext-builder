# MoreFunOS VNext Manual Builder

Public build-only repository for MoreFunOS VNext.

## Current two-repository boundary

Only these two repositories are current:
- `Pantonyeung/morefunos-vnext` — sole Source / Runtime / Business / Development Authority.
- `Pantonyeung/-morefunos-vnext-builder` — current paired manual build/execution relay only.

Every other MoreFunOS repository/document/note is historical/reference-only unless behavior is explicitly transplanted into current VNext source/contracts/tests.

## Builder authority boundary

- This repository is **not** a MoreFunOS source authority.
- It contains no Business Soul, menu, pricing, order, cash, print, reporting, customer, operational or UI authority source.
- Builds are **Owner manual only** through `workflow_dispatch`.
- Automatic `push`, `pull_request`, `schedule`, `workflow_run`, or repository-dispatch build triggers are forbidden.
- Private source is read from the exact immutable SHA supplied by the Owner.
- Compatibility APKs are delivered directly to the private source repository; no public APK artifact or public release is created here.

Private source authority: `Pantonyeung/morefunos-vnext`
