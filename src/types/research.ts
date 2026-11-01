export type ResearchStatus = 'pending' | 'running' | 'completed' | 'failed';

export type ExtractionStatus =
  | 'extracted'
  | 'insufficient_text'
  | 'inaccessible'
  | 'blocked'
  | 'unsupported_type';

export type Priority = 'High' | 'Medium' | 'Low';

export interface EvidenceItem {
  source_id: string;
  quote: string;
}

export interface SourceRecord {
  id: string;
  url: string;
  final_url?: string | null;
  domain: string;
  title: string | null;
  published_at: string | null;
  extraction_status: ExtractionStatus;
  error: string | null;
  text: string;
  char_count?: number;
}

export interface KeyFinding {
  finding: string;
  category: string;
  basis: 'sourced' | 'ai_suggestion';
  source_ids: string[];
  evidence: EvidenceItem[];
}

export interface InformationGap {
  title: string;
  description: string;
  importance: Priority;
  status_label: string;
  evidence: EvidenceItem[];
}

export interface ConflictItem {
  claim_one: string;
  source_one: string;
  claim_two: string;
  source_two: string;
  explanation: string;
}

export interface OutdatedWarning {
  source_id: string;
  reason: string;
}

export interface ChecklistItem {
  task: string;
  priority: Priority;
  reason: string;
}

export interface SourceReference {
  source_id: string;
  key_claims: string[];
  evidence_snippets: string[];
}

export interface ReportContent {
  executive_summary: string;
  key_findings: KeyFinding[];
  information_gaps: InformationGap[];
  conflicts: ConflictItem[];
  outdated_warnings: OutdatedWarning[];
  unanswered_questions: string[];
  verification_checklist: ChecklistItem[];
  source_references: SourceReference[];
  limitations: string[];
  meta: {
    provider: string;
    model: string;
    generated_at: string;
    dropped_evidence_count: number;
    dropped_conflict_count?: number;
  };
}

export interface ResearchRecord {
  id: string;
  topic: string;
  research_question: string;
  source_urls: string[];
  sources: SourceRecord[];
  report: ReportContent | null;
  status: ResearchStatus;
  error_message: string | null;
  is_sample: boolean;
  created_at: string;
  updated_at: string;
}

export interface HistoryItem {
  id: string;
  topic: string;
  research_question: string;
  status: ResearchStatus;
  error_message: string | null;
  is_sample: boolean;
  created_at: string;
  source_urls: string[];
}

export interface AiStatus {
  status: 'ok';
  ai: { configured: boolean; provider: 'gemini' | 'groq' | null };
}
