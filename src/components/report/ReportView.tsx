import { CalendarClock, CheckSquare, CircleDashed, FileText, GitCompare, HelpCircle, Layers, Library } from 'lucide-react';
import { ConflictsSection } from '@/components/report/ConflictsSection';
import { ChecklistSection } from '@/components/report/ChecklistSection';
import { AnalysisOverview } from '@/components/report/AnalysisOverview';
import { ExecutiveSummarySection } from '@/components/report/ExecutiveSummarySection';
import { InformationGapsSection } from '@/components/report/InformationGapsSection';
import { KeyFindingsSection } from '@/components/report/KeyFindingsSection';
import { OutdatedSection } from '@/components/report/OutdatedSection';
import { QuestionsSection } from '@/components/report/QuestionsSection';
import { ReportNav, type ReportNavItem } from '@/components/report/ReportNav';
import { SourceExplorerSection } from '@/components/report/SourceExplorerSection';
import type { ReportContent, ResearchRecord, SourceRecord } from '@/types/research';
import type { SourceLookup } from '@/components/report/EvidenceQuote';

interface ReportViewProps {
  record: ResearchRecord;
  report: ReportContent;
}

export function ReportView({ record, report }: ReportViewProps) {
  const sources: SourceLookup = Object.fromEntries(
    record.sources.map((source: SourceRecord) => [source.id, source]),
  );

  const navItems: ReportNavItem[] = [
    { id: 'executive-summary', label: 'Executive summary', icon: FileText },
    { id: 'key-findings', label: 'Key information', icon: Layers, count: report.key_findings.length },
    { id: 'information-gaps', label: 'Information gaps', icon: CircleDashed, count: report.information_gaps.length },
    { id: 'conflicts', label: 'Conflicting claims', icon: GitCompare, count: report.conflicts.length },
    { id: 'outdated', label: 'Outdated info', icon: CalendarClock, count: report.outdated_warnings.length },
    { id: 'unanswered', label: 'Open questions', icon: HelpCircle, count: report.unanswered_questions.length },
    { id: 'checklist', label: 'Verification checklist', icon: CheckSquare, count: report.verification_checklist.length },
    { id: 'sources', label: 'Source explorer', icon: Library, count: record.sources.length },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
      <ReportNav items={navItems} />

      <div className="min-w-0 space-y-8">
        <ExecutiveSummarySection report={report} isSample={record.is_sample} />
        <AnalysisOverview report={report} />
        <KeyFindingsSection findings={report.key_findings} sources={sources} />
        <InformationGapsSection gaps={report.information_gaps} sources={sources} />
        <ConflictsSection conflicts={report.conflicts} sources={sources} />
        <OutdatedSection warnings={report.outdated_warnings} sources={sources} />
        <QuestionsSection questions={report.unanswered_questions} />
        <ChecklistSection items={report.verification_checklist} />
        <SourceExplorerSection sources={record.sources} references={report.source_references} />
      </div>
    </div>
  );
}
