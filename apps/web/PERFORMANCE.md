# PageCraft — Performance Notes

_Sprint 1.16 | QA Review | 2026-03-03_

---

## API Latency Expectations

### Stitch Design Generation
| Stage | Expected Latency | Notes |
|---|---|---|
| `POST /api/projects/:id/generate` (kick-off) | < 500 ms | Just creates DB record + triggers Stitch job |
| Stitch `generateScreen` (actual AI gen) | **2–3 minutes** | Acceptable. Poll `GET /api/projects/:id` for status |
| Stitch `getScreen` polling interval | 5–10 s recommended | Avoid hammering; use exponential back-off |

**Action:** The frontend should use optimistic UI (show "Generating…" skeleton) and poll every 10 s with back-off up to 60 s interval.

### Code Generation (Next.js template conversion)
| Stage | Budget | Status |
|---|---|---|
| `generateNextJsCode(stitchDesign)` | **< 5 s** | ⚠️ Not implemented yet — measure once live |
| File assembly + ZIP creation | < 1 s | Should be trivial in-process |

### Monaco Editor
| Metric | Budget | Notes |
|---|---|---|
| Initial JS bundle load | **< 2 s** (3G fast) | Load Monaco via dynamic import / code-split |
| File open / syntax highlight | < 200 ms | Handled by Monaco worker threads |
| Save debounce (PATCH) | 1–2 s after last keystroke | Avoid saving on every keystroke |

---

## API Routes to Watch

| Route | Concern | Recommendation |
|---|---|---|
| `POST /api/projects/:id/generate` | Blocking Stitch call if not async | Always async — return 202 Accepted immediately |
| `GET /api/projects` (list) | N+1 subscription join | JOIN or separate query; add pagination (`?limit=20&cursor=`) |
| `GET /api/exports/:id/download` | Large ZIP streaming | Stream response, don't buffer full ZIP in memory |
| `POST /api/billing/webhook` | Stripe signature verify | Must be < 30 s (Stripe timeout) — keep handler fast |

---

## Optimization Recommendations

1. **Monaco dynamic import**: `const Monaco = dynamic(() => import('@monaco-editor/react'), { ssr: false })` — prevents SSR crash + reduces initial bundle.
2. **Stitch polling**: Implement server-sent events (SSE) or WebSocket upgrade for real-time status push rather than client polling.
3. **DB indexes**: Add index on `projects.userId` and `exports.projectId` for fast lookups.
4. **ZIP streaming**: Use `archiver` or `jszip` with Node.js `stream.PassThrough` to pipe directly to HTTP response.
5. **Rate limiting**: `/api/projects/:id/generate` should be rate-limited per user (e.g., 5 generations/min on free tier).
