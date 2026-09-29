# Bolt's Journal - Critical Learnings

## 2026-09-29 - Context Provider Memoization in React E-Commerce Apps
**Learning:** When a top-level React Context Provider holds multiple state atoms (cart, filters, toasts, modals), creating inline value objects and unmemoized callback references on every render causes all consuming components to re-render unnecessarily on every minor state change (e.g. toast notifications or slider movements). Memoizing callbacks with `useCallback`, derived totals with `useMemo`, and provider values with `useMemo` significantly reduces unnecessary sub-tree re-renders.
**Action:** Always wrap Context Provider `value` objects in `useMemo` and handler functions in `useCallback` when designing or optimizing React context state.
