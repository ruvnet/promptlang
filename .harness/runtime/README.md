# Repository agent runtime

Launch `node .harness/runtime/cli.mjs mcp` from any working directory. CLI actions: status, test, benchmark; PromptLang also compile and validate; Ultrasonic also fixture. CLI JSON arguments are a single JSON string. `RUV_PYTHON` is an operator configured executable; tool callers cannot change it. Tests need `RUV_ALLOW_VALIDATION=1`. The runtime strips provider credentials and other environment values before starting Python. No network tools, publication, production keys or autonomous promotion exist in this surface.
