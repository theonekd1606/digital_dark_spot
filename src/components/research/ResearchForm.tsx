import { useRef, useState, type FormEvent } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { SourceUrlField, MAX_SOURCE_FIELDS } from '@/components/research/SourceUrlField';
import type { ResearchRunInput } from '@/hooks/useResearchRun';

interface ResearchFormProps {
  busy: boolean;
  onSubmit: (input: ResearchRunInput) => void;
}

interface UrlRow {
  key: number;
  value: string;
}

interface FormErrors {
  topic?: string;
  question?: string;
  sources?: string;
}

function validate(topic: string, question: string, urls: string[]): FormErrors {
  const errors: FormErrors = {};
  if (topic.trim().length < 3) errors.topic = 'Enter a research topic with at least 3 characters.';
  if (question.trim().length < 5) errors.question = 'Enter the question you want the research to answer.';
  if (urls.filter((url) => url.trim()).length === 0) errors.sources = 'Add at least one source web address.';
  return errors;
}

const FIELD_LABEL = 'text-sm font-medium text-slate-200';

export function ResearchForm({ busy, onSubmit }: ResearchFormProps) {
  const nextKey = useRef(2);
  const [topic, setTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [rows, setRows] = useState<UrlRow[]>([
    { key: 0, value: '' },
    { key: 1, value: '' },
  ]);
  const [errors, setErrors] = useState<FormErrors>({});

  const updateRow = (key: number, value: string) =>
    setRows((current) => current.map((row) => (row.key === key ? { ...row, value } : row)));

  const removeRow = (key: number) => setRows((current) => current.filter((row) => row.key !== key));

  const addRow = () => {
    nextKey.current += 1;
    const key = nextKey.current;
    setRows((current) => [...current, { key, value: '' }]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const urls = rows.map((row) => row.value.trim()).filter(Boolean);
    const found = validate(topic, question, urls);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    onSubmit({
      topic: topic.trim(),
      research_question: question.trim(),
      source_urls: urls,
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="glass-panel space-y-8 p-6 sm:p-8">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="space-y-2">
          <span className={FIELD_LABEL}>Research topic</span>
          <input
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            placeholder="e.g. Horizon Merit Scholarship 2026"
            maxLength={200}
            className="input-field"
            aria-invalid={Boolean(errors.topic)}
          />
          {errors.topic ? <p className="text-xs text-rose-300">{errors.topic}</p> : null}
        </label>

        <label className="space-y-2">
          <span className={FIELD_LABEL}>Research question</span>
          <input
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="What should a student verify before applying?"
            maxLength={500}
            className="input-field"
            aria-invalid={Boolean(errors.question)}
          />
          {errors.question ? <p className="text-xs text-rose-300">{errors.question}</p> : null}
        </label>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className={FIELD_LABEL}>Source web addresses</p>
            <p className="mt-1 text-xs text-slate-400">
              Public pages only. Up to {MAX_SOURCE_FIELDS} sources. Use Check to see whether a page can be read before analyzing.
            </p>
          </div>
          <button
            type="button"
            onClick={addRow}
            disabled={rows.length >= MAX_SOURCE_FIELDS}
            className="btn-secondary px-3 py-2 text-xs"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            Add source
          </button>
        </div>

        <div className="space-y-3">
          {rows.map((row, index) => (
            <SourceUrlField
              key={row.key}
              index={index}
              value={row.value}
              canRemove={rows.length > 1}
              onChange={(value) => updateRow(row.key, value)}
              onRemove={() => removeRow(row.key)}
            />
          ))}
        </div>
        {errors.sources ? <p className="text-xs text-rose-300">{errors.sources}</p> : null}
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-slate-400">
          Analysis reads the pages you list and quotes only text found on them. Results may take up to a minute.
        </p>
        <button type="submit" disabled={busy} className="btn-primary sm:min-w-[200px]">
          {busy ? 'Analyzing...' : 'Analyze Research'}
          {busy ? null : <ArrowRight className="h-4 w-4" aria-hidden="true" />}
        </button>
      </div>
    </form>
  );
}
