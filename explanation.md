# feat/websocket-live-dashboard-and-theme-integration

feat(Dashboard): introduce real-time Socket.io state synchronization, theme configuration toggles, and reorganized dashboard layouts under nested routing structures.

## Summary of Changes

### 1. Real-Time Socket.io Integration
- **WebSocket Hook & Context**: Created [use-dashboard-data.tsx](file:///home/igor/Documents/Projects/dashboard-front/src/hooks/use-dashboard-data.tsx) to manage active Socket.io client connections and handle data streams for sales, category sales, telemetry, and log severity.
- **Connectivity Loading State**: Built [websocket-loading-screen.tsx](file:///home/igor/Documents/Projects/dashboard-front/src/components/ui/websocket-loading-screen.tsx) and [use-websocket-loader.ts](file:///home/igor/Documents/Projects/dashboard-front/src/hooks/use-websocket-loader.ts) to display a smooth loading animation during connection establishment, handle graceful fade-outs upon connection success, and trigger offline alert cards.
- **Provider System**: Set up a global WebSocket communication interface in [websocket-provider.tsx](file:///home/igor/Documents/Projects/dashboard-front/src/components/websocket-provider.tsx).

### 2. Nested Dashboard Layout & Routing Reorganization
- **Route Group Configuration**: Migrated the main dashboard overview page from the top-level `/overview` directory to a new `(dashboard)` route group at [src/app/(dashboard)/overview/page.tsx](file:///home/igor/Documents/Projects/dashboard-front/src/app/(dashboard)/overview/page.tsx).
- **Dashboard Sub-Pages**: Added modularized sub-pages for settings ([billing](file:///home/igor/Documents/Projects/dashboard-front/src/app/(dashboard)/settings/billing/page.tsx), [general](file:///home/igor/Documents/Projects/dashboard-front/src/app/(dashboard)/settings/general/page.tsx), [limits](file:///home/igor/Documents/Projects/dashboard-front/src/app/(dashboard)/settings/limits/page.tsx), [team](file:///home/igor/Documents/Projects/dashboard-front/src/app/(dashboard)/settings/team/page.tsx)), [analytics](file:///home/igor/Documents/Projects/dashboard-front/src/app/(dashboard)/analytics/page.tsx), and [system-log](file:///home/igor/Documents/Projects/dashboard-front/src/app/(dashboard)/system-log/page.tsx).
- **Navigation Layout**: Designed [src/app/(dashboard)/layout.tsx](file:///home/igor/Documents/Projects/dashboard-front/src/app/(dashboard)/layout.tsx) with a responsive breadcrumb generator, sidebar support, and a real-time status indicator showing `LIVE` vs `OFFLINE` server status.

### 3. Application Theme Customization
- **Theme Provider**: Added a wrapped NextJS theme injection context in [theme-provider.tsx](file:///home/igor/Documents/Projects/dashboard-front/src/components/theme-provider.tsx) that filters hydration warnings during development.
- **Toggle Controls**: Created [theme-toggle.tsx](file:///home/igor/Documents/Projects/dashboard-front/src/components/theme-toggle.tsx) containing a dropdown to switch between light, dark, and system themes with system preference detection indicators.
