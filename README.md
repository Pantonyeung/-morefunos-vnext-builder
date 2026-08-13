# MoreFunOS VNext Manual Builder

Public build-only repository for MoreFunOS VNext.

## Authority boundary

- This repository is **not** a MoreFunOS source authority.
- It contains no Business Soul, menu, pricing, order, cash, print, reporting, customer, or operational source.
- Builds are **Owner manual only** through `workflow_dispatch`.
- Automatic `push`, `pull_request`, `schedule`, `workflow_run`, or repository-dispatch build triggers are forbidden.
- Private source is read from the exact immutable SHA supplied by the Owner.
- Compatibility APKs are delivered directly to the private source repository; no public APK artifact or public release is created here.

Private source authority: `Pantonyeung/morefunos-vnext`
