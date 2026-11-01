# Digital Dark Spot

AI-assisted information gap detection. Give it a research question and the public web pages that should answer it. It reads those pages, quotes what they say, and reports what is missing, what conflicts, what is outdated, and what to verify next.

## Pages

- **Home**: product overview and entry points.
- **Research**: topic, question, and up to 8 source URLs. Live analysis appears here once an AI key is configured.
- **History**: saved analyses. Sample data cannot be deleted.
- **Report**: executive summary, key information, gaps, conflicts, outdated material, open questions, verification checklist, and a source explorer. Every claim links to a verified quote.

## Sample scenario

The sample report ("Scholarship Application Research (SAMPLE DATA)") works without any key. It is clearly labeled as sample data and is not live research. It compares a 2026 official page, a 2023 guide, and an undated forum post.

## Setup

1. Copy `.env.example` to `.env` and fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
2. Run the app. The sample report works immediately.
3. For live analysis, add one secret to the Supabase project's function secrets:
   - Gemini (default): `GEMINI_API_KEY`. Optional `GEMINI_MODEL`, default `gemini-2.5-flash`.
   - Groq (alternative): `GROQ_API_KEY`, and set `AI_PROVIDER=groq`. Optional `GROQ_MODEL`, default `llama-3.3-70b-versatile`.

Keys are never sent to the browser.

## Architecture

- **Frontend**: React, Vite, TypeScript, Tailwind CSS, Lucide icons, and Recharts.
- **Backend**: a Supabase Edge Function (`research-api`) with a Supabase Postgres table. This replaces the FastAPI and SQLite stack from the original spec, because the environment provides Supabase for persistence. The REST endpoints and validation follow the same design.
- **Database**: `research_reports` has row-level security enabled and no browser policies. Only the edge function can read or write it, using the service role.

## Security measures

- Server-side fetching with SSRF defenses: private, loopback, and link-local addresses are blocked, and every redirect hop is re-checked.
- Request, page, and timeout limits on fetching and AI calls.
- Every evidence quote must appear in the extracted source text. Unmatched quotes are dropped and counted.
- AI output is validated strictly. Invalid output is reported with a retry option.
- Undated sources are labeled "Undated" rather than treated as outdated.
