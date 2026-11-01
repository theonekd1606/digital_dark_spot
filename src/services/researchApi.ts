import type { AiStatus, HistoryItem, ResearchRecord, SourceRecord } from '@/types/research';

export const SAMPLE_REPORT_ID = '00000000-0000-4000-8000-000000000001';

const BASE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/research-api`;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export class ResearchApiError extends Error {
  code: string;
  status: number;
  retryable: boolean;

  constructor(message: string, code: string, status: number, retryable: boolean) {
    super(message);
    this.name = 'ResearchApiError';
    this.code = code;
    this.status = status;
    this.retryable = retryable;
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        apikey: ANON_KEY,
        Authorization: `Bearer ${ANON_KEY}`,
        ...init.headers,
      },
    });
  } catch {
    throw new ResearchApiError(
      'The research service could not be reached. Check your connection and try again.',
      'NETWORK_ERROR',
      0,
      true,
    );
  }

  const body: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const errorBody = (body ?? {}) as { error?: string; code?: string; retryable?: boolean };
    throw new ResearchApiError(
      errorBody.error ?? `The request failed with status ${response.status}.`,
      errorBody.code ?? 'HTTP_ERROR',
      response.status,
      Boolean(errorBody.retryable),
    );
  }

  if (body === null || typeof body !== 'object') {
    throw new ResearchApiError('The service returned an unexpected response.', 'INVALID_RESPONSE', response.status, true);
  }
  return body as T;
}

export function getAiStatus() {
  return request<AiStatus>('/health');
}

export function createResearch(input: { topic: string; research_question: string; source_urls: string[] }) {
  return request<ResearchRecord>('/research', { method: 'POST', body: JSON.stringify(input) });
}

export function runAnalysis(researchId: string) {
  return request<ResearchRecord>('/analyze', {
    method: 'POST',
    body: JSON.stringify({ research_id: researchId }),
  });
}

export function checkSourceUrl(url: string) {
  return request<SourceRecord>('/sources/extract', { method: 'POST', body: JSON.stringify({ url }) });
}

export function listHistory() {
  return request<HistoryItem[]>('/history');
}

export function getResearch(id: string) {
  return request<ResearchRecord>(`/history/${id}`);
}

export async function deleteResearch(id: string) {
  await request<{ deleted: boolean }>(`/history/${id}`, { method: 'DELETE' });
}
