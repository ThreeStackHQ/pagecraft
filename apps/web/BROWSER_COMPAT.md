# PageCraft — Browser Compatibility Notes

_Sprint 1.16 | QA Review | 2026-03-03_

---

## Supported Browsers

PageCraft targets **evergreen desktop browsers**. The following matrix applies:

| Browser | Minimum Version | Status | Notes |
|---|---|---|---|
| Google Chrome | 109+ | ✅ Full support | Primary development target |
| Mozilla Firefox | 115+ | ✅ Full support | ESR 115 minimum |
| Safari | 16.4+ | ✅ Full support | Requires WebCrypto for auth tokens |
| Microsoft Edge | 109+ (Chromium) | ✅ Full support | Shares Chromium engine with Chrome |
| Mobile Safari (iOS) | 16.4+ | ⚠️ Partial | Monaco editor may be degraded on mobile |
| Chrome for Android | 109+ | ⚠️ Partial | Monaco not optimised for touch |
| IE / Legacy Edge | Any | ❌ Not supported | No polyfills planned |

---

## Feature Matrix

### Monaco Editor (`@monaco-editor/react ^4.6.0`)
- **Requires**: Chrome/Edge/FF/Safari latest — uses Web Workers and `SharedArrayBuffer`
- **SSR**: Must be loaded with `ssr: false` via Next.js `dynamic()`. Will throw on server render.
- **Touch**: Monaco is keyboard-driven; mobile/tablet touch experience is limited.
- **`SharedArrayBuffer`**: Requires COOP/COEP headers (`Cross-Origin-Opener-Policy: same-origin` + `Cross-Origin-Embedder-Policy: require-corp`) if using multi-threaded mode.

```js
// next.config.js — add security headers for Monaco multi-thread mode
headers: async () => [{
  source: '/editor/:path*',
  headers: [
    { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
    { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
  ],
}]
```

### Next.js App Router
- Requires modern JS (ES2017+). No IE support by design.
- `next/font` (Google Fonts): requires network access at build time.

### Crypto / Auth (`bcryptjs`, `next-auth`)
- `next-auth` uses `jose` for JWT — requires `SubtleCrypto` (Web Crypto API), available in all supported browsers.
- `bcryptjs` runs server-side only — no browser polyfill needed.

### File Download (ZIP export)
- Uses `<a download>` trick or `Response` streaming — works in all supported browsers.
- Safari: `<a download>` with blob URL works but has a small delay.

---

## Required Polyfills

| Feature | Polyfill | When Needed |
|---|---|---|
| `fetch` | Built-in (Next.js 14) | Not needed — Next.js polyfills on old Node |
| `crypto.randomUUID()` | `uuid` package fallback | Node < 14.17 (build env only) |
| `ReadableStream` | None needed | Supported in all target browsers |
| `ResizeObserver` | `resize-observer-polyfill` | Only if supporting Chrome < 64 (not in scope) |

---

## Testing Recommendations

- Run Playwright E2E tests across Chrome, Firefox, and WebKit (Safari) using `playwright.config.ts` projects.
- Test Monaco editor load specifically in Firefox (workers behave slightly differently).
- Test ZIP download in Safari to verify `Content-Disposition` header is respected.
