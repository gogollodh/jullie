## 2026-10-11 - Context Value Memoization & Component Re-render Prevention
**Learning:** React Context providers that pass inline objects cause all consumer components to re-render whenever any state changes. Memoizing context provider values with `useMemo` alongside `useCallback` for handler functions significantly reduces cascade re-renders across the app.
**Action:** Always memoize context values and export pure memoized components (`React.memo`) for list item renders in high-volume views.
