# Security Policy

This repository is a public build-only control plane. It must never contain MoreFunOS product source, Business Soul, customer data, menu/pricing/order/cash/print/reporting logic, private APKs, or private credentials.

## Mandatory controls

- `workflow_dispatch` is the only allowed workflow trigger.
- Builds must target the hard-coded private source repository `Pantonyeung/morefunos-vnext`.
- Build input must be an exact immutable 40-character source SHA.
- `VNEXT_SOURCE_READ_TOKEN` is read-only and repository-scoped to the private source repository.
- `VNEXT_DELIVERY_WRITE_TOKEN` is separate and used only to publish private build output to the private source repository.
- Public Actions artifacts and public Releases for MoreFunOS APKs are forbidden.
- Secrets must never be echoed, added to metadata, or written to artifacts.
- A successful build is Source/Host Build evidence only; it is never Device, Hardware, Operational, or Production PASS.

Any proposed workflow change that adds automatic triggers or broadens credentials must be rejected.
