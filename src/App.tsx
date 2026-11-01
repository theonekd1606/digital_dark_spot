import { SiteHeader } from '@/components/layout/SiteHeader';
import { useHashRoute } from '@/hooks/useHashRoute';
import { HistoryPage } from '@/pages/HistoryPage';
import { LandingPage } from '@/pages/LandingPage';
import { ReportPage } from '@/pages/ReportPage';
import { ResearchPage } from '@/pages/ResearchPage';

function App() {
  const [route, navigate] = useHashRoute();

  return (
    <div className="flex min-h-screen flex-col bg-[#060b17] text-slate-100">
      <SiteHeader route={route} navigate={navigate} />
      <main key={route.name === 'report' ? `report-${route.id}` : route.name} className="flex-1 animate-fade-up">
        {route.name === 'landing' && <LandingPage navigate={navigate} />}
        {route.name === 'research' && <ResearchPage navigate={navigate} />}
        {route.name === 'history' && <HistoryPage navigate={navigate} />}
        {route.name === 'report' && <ReportPage id={route.id} navigate={navigate} />}
      </main>
    </div>
  );
}

export default App;
