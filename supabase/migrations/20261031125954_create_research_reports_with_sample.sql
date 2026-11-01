/*
# Create research reports table and sample scholarship scenario

Plain-English summary: stores each research analysis run (its question, the sources reviewed, and the generated report). A clearly labeled sample scholarship report is seeded so the demo works without any AI key.

1. New Tables
- `research_reports`
  - `id` (uuid, primary key)
  - `topic` (text): research topic entered by the user
  - `research_question` (text): question the research answers
  - `source_urls` (jsonb): URLs submitted by the user
  - `sources` (jsonb): per-source extraction results (title, domain, publication date, extraction status, extracted text)
  - `report` (jsonb): structured analysis output
  - `status` (text): pending, running, completed or failed
  - `error_message` (text): human-readable failure reason
  - `is_sample` (boolean): true only for the built-in demonstration data
  - `created_at` / `updated_at` (timestamptz)

2. Seeded data
- One sample report (fixed id) using clearly fictional sample domains. Marked `is_sample = true`.

3. Security
- Row level security enabled.
- No policies for `anon` or `authenticated`: the browser never reads or writes this table directly.
- Only the backend function (service role) is granted access, and it is the only path to the data.

4. Notes
- Idempotent: safe to re-run. The sample insert uses ON CONFLICT DO NOTHING.
*/

CREATE TABLE IF NOT EXISTS research_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic text NOT NULL,
  research_question text NOT NULL,
  source_urls jsonb NOT NULL DEFAULT '[]'::jsonb,
  sources jsonb NOT NULL DEFAULT '[]'::jsonb,
  report jsonb,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  error_message text,
  is_sample boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS research_reports_created_at_idx ON research_reports (created_at DESC);

ALTER TABLE research_reports ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON research_reports TO service_role;

INSERT INTO research_reports (id, topic, research_question, source_urls, sources, report, status, is_sample, created_at, updated_at)
VALUES (
  '00000000-0000-4000-8000-000000000001',
  'Scholarship Application Research (SAMPLE DATA)',
  'What should a student verify before applying for a scholarship?',
  $json$[
    "https://scholarships.sample-university.example/merit-2026",
    "https://funding-guide.sample-foundation.example/2023-apply",
    "https://forum.sample-students.example/thread/918"
  ]$json$::jsonb,
  $json$[
    {
      "id": "S1",
      "url": "https://scholarships.sample-university.example/merit-2026",
      "domain": "scholarships.sample-university.example",
      "title": "Horizon Merit Scholarship 2026: Eligibility and Documents",
      "published_at": "2026-08-15",
      "extraction_status": "extracted",
      "error": null,
      "text": "The Horizon Merit Scholarship 2026 is open to undergraduate students who have a cumulative grade point average of 3.5 or higher. Applicants must be enrolled full time at an accredited institution. Required documents: a completed application form, an official academic transcript, and two letters of recommendation. Applications close on 30 November 2026. Awards cover tuition for one academic year. Renewal conditions will be announced later."
    },
    {
      "id": "S2",
      "url": "https://funding-guide.sample-foundation.example/2023-apply",
      "domain": "funding-guide.sample-foundation.example",
      "title": "Student Funding Guide: How to Apply (2023 Cycle)",
      "published_at": "2023-02-10",
      "extraction_status": "extracted",
      "error": null,
      "text": "Applicants to the Horizon Merit Scholarship must submit a passport-sized photograph, a government-issued ID, an academic transcript, and a personal statement of up to 500 words. The minimum GPA for the 2023 cycle was 3.0. Applications closed on 15 March 2023. Recommendation letters are optional."
    },
    {
      "id": "S3",
      "url": "https://forum.sample-students.example/thread/918",
      "domain": "forum.sample-students.example",
      "title": "Forum thread: Horizon scholarship GPA and renewal?",
      "published_at": null,
      "extraction_status": "extracted",
      "error": null,
      "text": "Does anyone know if the Horizon scholarship needs a 3.5 GPA? A classmate told me 3.0 is enough now. Is the award renewed automatically each year?"
    }
  ]$json$::jsonb,
  $json${
    "executive_summary": "SAMPLE DATA. The three reviewed sample sources agree that the Horizon Merit Scholarship is for full-time undergraduates, but they disagree on the minimum GPA and on the required documents. No reviewed source explains the renewal conditions. The 2026 official page should be treated as the primary reference, while the 2023 guide and the undated forum post need verification before anyone relies on them.",
    "key_findings": [
      {
        "finding": "Eligibility requires a cumulative GPA of 3.5 or higher and full-time enrollment at an accredited institution (2026 page).",
        "category": "Eligibility",
        "basis": "sourced",
        "source_ids": ["S1"],
        "evidence": [
          { "source_id": "S1", "quote": "cumulative grade point average of 3.5 or higher" },
          { "source_id": "S1", "quote": "Applicants must be enrolled full time at an accredited institution." }
        ]
      },
      {
        "finding": "Applications close on 30 November 2026 according to the 2026 page.",
        "category": "Deadline",
        "basis": "sourced",
        "source_ids": ["S1"],
        "evidence": [
          { "source_id": "S1", "quote": "Applications close on 30 November 2026" }
        ]
      },
      {
        "finding": "The award covers tuition for one academic year.",
        "category": "Award",
        "basis": "sourced",
        "source_ids": ["S1"],
        "evidence": [
          { "source_id": "S1", "quote": "Awards cover tuition for one academic year." }
        ]
      },
      {
        "finding": "Students should prepare for a document checklist, but the lists differ between sources and should be compared with the official 2026 checklist.",
        "category": "Documents",
        "basis": "ai_suggestion",
        "source_ids": ["S1", "S2"],
        "evidence": []
      }
    ],
    "information_gaps": [
      {
        "title": "Renewal conditions",
        "description": "Not found in reviewed sources. The 2026 page states that renewal conditions will be announced later, and no other reviewed source covers renewal rules. A student cannot tell whether the award continues into later years.",
        "importance": "High",
        "status_label": "Not found in reviewed sources",
        "evidence": [
          { "source_id": "S1", "quote": "Renewal conditions will be announced later." }
        ]
      },
      {
        "title": "Award amount",
        "description": "Not found in reviewed sources. The sources say the award covers tuition for one academic year but do not state a monetary value or whether it covers living costs.",
        "importance": "Medium",
        "status_label": "Not found in reviewed sources",
        "evidence": []
      },
      {
        "title": "Current-cycle document list",
        "description": "Not found in reviewed sources for the 2026 cycle beyond the 2026 page. The only other document list comes from a 2023 guide.",
        "importance": "Medium",
        "status_label": "Not found in reviewed sources",
        "evidence": []
      }
    ],
    "conflicts": [
      {
        "claim_one": "Applicants need a cumulative GPA of 3.5 or higher.",
        "source_one": "S1",
        "claim_two": "The minimum GPA for the 2023 cycle was 3.0.",
        "source_two": "S2",
        "explanation": "Potential conflict. The two sources describe different cycles (2026 and 2023), so the difference may reflect a real change in requirements rather than an error. The forum post (S3) also mentions 3.0 but is undated and unofficial."
      },
      {
        "claim_one": "Applicants must submit an application form, an official academic transcript, and two letters of recommendation.",
        "source_one": "S1",
        "claim_two": "Recommendation letters are optional. Applicants must submit a passport-sized photograph, a government-issued ID, and a personal statement of up to 500 words.",
        "source_two": "S2",
        "explanation": "Potential conflict in document requirements. Each source lists different items, and the 2023 guide may be outdated. The lists may both be partly correct, so the official 2026 checklist should be checked."
      },
      {
        "claim_one": "Applicants need a cumulative GPA of 3.5 or higher.",
        "source_one": "S1",
        "claim_two": "A classmate told me 3.0 is enough now.",
        "source_two": "S3",
        "explanation": "Potential conflict with an informal, undated, second-hand claim. It should not be treated as a reliable requirement until an official source confirms it."
      }
    ],
    "outdated_warnings": [
      {
        "source_id": "S2",
        "reason": "Published 2023-02-10 and describes the 2023 cycle, including a deadline of 15 March 2023 that has already passed."
      },
      {
        "source_id": "S3",
        "reason": "No publication date was found, so it is not possible to tell whether this post matches the current cycle. Treat it as undated."
      }
    ],
    "unanswered_questions": [
      "Does the scholarship renew automatically, and under which GPA or enrollment conditions?",
      "What is the exact monetary value of the award?",
      "Are the 2026 document requirements the same as those in the 2023 guide?"
    ],
    "verification_checklist": [
      {
        "task": "Confirm the current minimum GPA on the official scholarship page",
        "priority": "High",
        "reason": "The sources give 3.5 (2026 page) and 3.0 (2023 guide and forum post). The official page should decide."
      },
      {
        "task": "Find the renewal conditions before applying",
        "priority": "High",
        "reason": "Renewal conditions are not found in reviewed sources and the 2026 page says they will be announced later."
      },
      {
        "task": "Confirm the application deadline of 30 November 2026",
        "priority": "High",
        "reason": "The deadline comes from the 2026 page, but deadlines should be confirmed on the official site before submitting."
      },
      {
        "task": "Compare the document list with the official checklist",
        "priority": "Medium",
        "reason": "The 2026 page and the 2023 guide list different documents, and the 2023 guide is outdated."
      },
      {
        "task": "Confirm whether letters of recommendation are required",
        "priority": "Medium",
        "reason": "One source requires two letters and another says they are optional."
      },
      {
        "task": "Check forum claims against an official source before relying on them",
        "priority": "Low",
        "reason": "The forum post is undated, informal and not an official source."
      }
    ],
    "source_references": [
      {
        "source_id": "S1",
        "key_claims": [
          "Eligibility: cumulative GPA of 3.5 or higher; full-time enrollment at an accredited institution.",
          "Documents: application form, official transcript, two letters of recommendation.",
          "Deadline: 30 November 2026."
        ],
        "evidence_snippets": [
          "cumulative grade point average of 3.5 or higher",
          "Applications close on 30 November 2026",
          "Renewal conditions will be announced later."
        ]
      },
      {
        "source_id": "S2",
        "key_claims": [
          "Documents: passport-sized photograph, government-issued ID, academic transcript, personal statement up to 500 words.",
          "The minimum GPA for the 2023 cycle was 3.0.",
          "Recommendation letters are optional."
        ],
        "evidence_snippets": [
          "The minimum GPA for the 2023 cycle was 3.0",
          "Recommendation letters are optional."
        ]
      },
      {
        "source_id": "S3",
        "key_claims": [
          "Informal claim that 3.0 GPA is enough.",
          "Question about automatic annual renewal (not answered)."
        ],
        "evidence_snippets": [
          "A classmate told me 3.0 is enough now."
        ]
      }
    ],
    "limitations": [
      "SAMPLE DATA: this demonstration uses fictional sample sources and is not live research.",
      "Findings only reflect the three sample sources reviewed. Other official pages may contain different information.",
      "Dates were taken from the sample metadata. The 2026 page is the most recent of the reviewed sources."
    ],
    "meta": {
      "provider": "sample",
      "model": "none",
      "generated_at": "2026-10-31T00:00:00Z",
      "dropped_evidence_count": 0
    }
  }$json$::jsonb,
  'completed',
  true,
  '2026-10-31T00:00:00Z',
  '2026-10-31T00:00:00Z'
)
ON CONFLICT (id) DO NOTHING;
