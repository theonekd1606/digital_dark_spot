import { ArrowRight, BookOpen, Library, Sparkles } from 'lucide-react';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { HeroSection } from '@/components/landing/HeroSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { UseCasesSection } from '@/components/landing/UseCasesSection';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SAMPLE_REPORT_ID } from '@/services/researchApi';

interface LandingPageProps {
  navigate: (path: string) => void;
}

export function LandingPage({ navigate }: LandingPageProps) {
  return (
    <>
      <HeroSection
        onStart={() => navigate('/research')}
        onViewSample={() => navigate(`/reports/${SAMPLE_REPORT_ID}`)}
      />
      <FeaturesSection />
      <HowItWorksSection />
      <UseCasesSection />
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="glass-panel relative overflow-hidden p-8 sm:p-12">
          <div className="pointer-events-none absolute -left-16 -bottom-24 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" aria-hidden="true" />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Start with the sample</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                See a complete analysis before you add your own sources
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                The sample scholarship report shows eligibility, missing renewal rules, conflicting document lists and an outdated guide, with a verification checklist.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => navigate(`/reports/${SAMPLE_REPORT_ID}`)} className="btn-secondary">
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                Open sample report
              </button>
              <button type="button" onClick={() => navigate('/research')} className="btn-primary">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Start Research
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
          <Library className="absolute -right-6 -top-6 h-32 w-32 text-white/[0.03]" aria-hidden="true" />
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
