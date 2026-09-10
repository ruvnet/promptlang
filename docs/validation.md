# Validation

Run `python -m unittest discover -s tests -v`, then `npm ci --prefix .harness/runtime` and `npm test --prefix .harness/runtime`. The latter starts an actual official SDK client and child stdio server, discovers tools/resources, calls a real Python benchmark, rejects unsupported operations, and checks unsigned receipt semantics.

The benchmark JSON was generated locally by `python -m promptlang benchmark`. Repeat locally; compiler timings depend on hardware. Acoustic measurements use a fixed seed and explicitly simulated aligned channel. No production keys, federation writes, model requests or audio devices are used.

CI runs tests on Python 3.11, 3.12 and 3.13 with Node 24, audits the supported dependency closure, builds wheels, and uploads release candidates. Old sources are not evidence of supported v2 behavior.
