import { HelpCircle } from 'lucide-react';
import { EmptyNote, ReportSection } from '@/components/report/ReportSection';

interface QuestionsSectionProps {
  questions: string[];
}

export function QuestionsSection({ questions }: QuestionsSectionProps) {
  return (
    <ReportSection
      id="unanswered"
      icon={HelpCircle}
      title="Unanswered questions"
      description="Questions the reviewed sources leave open. Each one is a candidate for further research."
    >
      {questions.length === 0 ? (
        <EmptyNote>Every part of the research question was addressed by the reviewed sources.</EmptyNote>
      ) : (
        <ol className="grid gap-3 md:grid-cols-2">
          {questions.map((question, index) => (
            <li key={question} className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-xs font-semibold text-cyan-200">
                {index + 1}
              </span>
              <p className="text-sm leading-relaxed text-slate-200">{question}</p>
            </li>
          ))}
        </ol>
      )}
    </ReportSection>
  );
}
