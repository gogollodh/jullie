## 2026-09-27 - Context Object & Component Re-render Optimization
**Learning:** React Context value creation creates a new object reference on every render unless wrapped in `useMemo`. When combined with large component grids like `ProductCard`, re-rendering the entire catalog grid on unrelated state updates can cause unnecessary DOM reconciliations.
**Action:** Always memoize Context value objects and wrap heavily repeated grid items with `React.memo`.
