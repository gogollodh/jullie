# Bolt's Journal - Critical Learnings

## 2026-10-01 - Below-the-Fold Image Lazy Loading and Static Array Memoization in React Home Page
**Learning:** Content-rich landing pages with multiple media sections (category grids, brand story illustrations, terrarium showcases, article thumbnails, social media feeds) can trigger heavy image loading waterfalls on initial paint. Applying `loading="lazy"` to offscreen native `<img>` elements defers image fetching until scrolled into view, reducing network contention on initial load. Combining this with `useMemo` for derived static array slices/filters prevents redundant array operations on page re-renders.
**Action:** Always add `loading="lazy"` to non-hero below-the-fold images and wrap static data filtering/slicing in `useMemo` in React landing page views.

## 2026-09-30 - Dynamic Route Code Splitting and Card Component Memoization
**Learning:** In Single Page Applications with multiple content-heavy view pages (e.g., HomePage, ShopPage, Builder, Care Hub), eager loading all page modules into a monolithic main bundle increases initial load latency. Utilizing `React.lazy` and `Suspense` for page routes splits the application into lightweight page chunks, reducing the initial JavaScript bundle by ~16-17%. In addition, memoizing repeating presentational components like `ProductCard` with `React.memo` prevents unnecessary list re-renders when parent page states or filter inputs update.
**Action:** Always lazy-load top-level route views with `React.lazy` and wrap list item presentation components in `React.memo` for React e-commerce architectures.

## 2026-09-29 - Context Provider Memoization in React E-Commerce Apps
**Learning:** When a top-level React Context Provider holds multiple state atoms (cart, filters, toasts, modals), creating inline value objects and unmemoized callback references on every render causes all consuming components to re-render unnecessarily on every minor state change (e.g. toast notifications or slider movements). Memoizing callbacks with `useCallback`, derived totals with `useMemo`, and provider values with `useMemo` significantly reduces unnecessary sub-tree re-renders.
**Action:** Always wrap Context Provider `value` objects in `useMemo` and handler functions in `useCallback` when designing or optimizing React context state.
