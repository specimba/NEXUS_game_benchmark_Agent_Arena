/** Negative test fixture: a probe that honestly reports a failed check (harness must exit 1). */
console.log(JSON.stringify({
  check: 'failing-probe',
  results: [
    { name: 'win reachable', ok: true },
    { name: 'greed fails into the loss state', ok: false, detail: 'never lost: policy survived 900 steps' },
  ],
  fails: 1,
}));
