![promptlang](docs/assets/header.svg)

# promptlang v2 alpha

PromptLang turns a typed JSON specification and user data into a reproducible model request. It checks input and output contracts without executing content or calling a model.

## Capabilities

| Capability | Implemented behavior |
| :--- | :--- |
| Typed compiler | Exact fields, finite numbers, int64 bounds |
| Provenance | Deterministic SHA256 of compiled messages |
| Safety boundary | User content stays in user message, no eval |
| Output validation | Exact primitive field types |
| CLI and MCP | Local official SDK stdio server, fixed bounded actions |
| Evaluation | Tests, reproducible benchmark and unsigned hash receipts |
| Governance | MetaHarness profiles, Autogenous gate, explicit human promotion |

## Install and use

Python 3.11 or newer and Node 22.16 or newer are required.

```sh
python -m venv .venv
. .venv/bin/activate
python -m pip install .
echo '{"spec":{"instruction":"Summarize","inputs":{"text":"string"},"outputs":{"summary":"string"}},"values":{"text":"Hello"}}' | python -m promptlang compile
python -m unittest discover -s tests -v
python -m promptlang benchmark
npm ci --prefix .harness/runtime
node .harness/runtime/cli.mjs status
node .harness/runtime/cli.mjs benchmark
RUV_ALLOW_VALIDATION=1 node .harness/runtime/cli.mjs test
node .harness/runtime/cli.mjs mcp
```

For a separate Python environment set `RUV_PYTHON` to its absolute executable path. MCP clients launch `node` with the absolute repository path to `.harness/runtime/cli.mjs` and argument `mcp`. The caller cannot supply commands, paths, keys or environment variables. Tools expose status, tests, benchmarks and domain operations. Read policy at `ruv://promptlang/policy`.

## MetaHarness and operations

See [generated harness](.harness/generated/README.md), [security and architecture](docs/ADR-001.md), [validation](docs/validation.md), and [benchmark evidence](docs/benchmark.json). Validation is opt in through the operator environment. Each process has a 30 second deadline, 32 KiB input and 64 KiB output limit; only one operation runs at a time. Receipts are local hashes, not signed attestations. CI builds a wheel and uploads it after passing tests. Publishing to a package registry remains an explicit release action.

## Limits

Separating message roles is not proof of model prompt injection resistance. This release implements a typed compiler, not the speculative language in the historical README. No learned model benchmark or SOTA claim is made.

## Related projects

[RuFlo](https://github.com/ruvnet/ruflo) coordinates work. [MetaHarness](https://github.com/ruvnet/metaharness) supplies host profiles and evaluation. [Autogenous](https://github.com/ruvnet/autogenous) supplies promotion gates. [RuVector](https://github.com/ruvnet/ruvector) supplies retrieval primitives. [Federation](https://x.ruv.io/mcp) carries observations, never implicit execution authority. [Revival tracking](https://github.com/ruvnet/promptlang/issues/1).
