import React, { useState, useMemo } from "react";
import {
  HashRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useSearchParams,
} from "react-router-dom";
// Icons removed to avoid lucide-react dependency
// import { LayoutDashboard, TableProperties } from "lucide-react";

const NavLink = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={
        "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium " +
        (isActive
          ? "bg-[#1A2B49] text-white"
          : "text-slate-500 hover:text-[#1A2B49] hover:bg-slate-100")
      }
    >
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-200 text-[10px] font-bold text-slate-700">
        {label[0]}
      </span>
      {label}
    </Link>
  );
};

const MainContent = () => {
  const { Dashboard, OpportunityManager, DetailPanel, DateFilter, INITIAL_DATA } =
    window;

  const [opportunities, setOpportunities] = useState(INITIAL_DATA);
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const [searchParams] = useSearchParams();

  const handleUpdateOpportunity = (updatedOpp) => {
    setOpportunities((prev) =>
      prev.map((o) => (o.id === updatedOpp.id ? updatedOpp : o))
    );
    setIsPanelOpen(false);
    setSelectedOpp(null);
  };

  const handleSelectOpp = (opp) => {
    setSelectedOpp(opp);
    setIsPanelOpen(true);
  };

  const dateFilteredOpportunities = useMemo(() => {
    return opportunities.filter((opp) => {
      if (!dateRange.start || !dateRange.end) return true;
      const closeDate = new Date(opp.close_date);
      return (
        closeDate >= dateRange.start &&
        closeDate <= dateRange.end
      );
    });
  }, [opportunities, dateRange]);

  const drillDownOpportunities = useMemo(() => {
    let filtered = [...dateFilteredOpportunities];

    const stageParam = searchParams.get("stage");
    const minStageParam = searchParams.get("minStage");
    const modeParam = searchParams.get("mode");
    const idParam = searchParams.get("id");

    if (idParam) {
      filtered = filtered.filter((o) => o.id === idParam);
    } else {
      if (stageParam) {
        filtered = filtered.filter(
          (o) => o.pipeline_stage === parseInt(stageParam)
        );
      }
      if (minStageParam) {
        filtered = filtered.filter(
          (o) => o.pipeline_stage >= parseInt(minStageParam)
        );
      }
      if (modeParam) {
        filtered = filtered.filter((o) => o.modes.includes(modeParam));
      }
    }
    return filtered;
  }, [dateFilteredOpportunities, searchParams]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#1A2B49]">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-12 h-6 bg-[#7C3AED] rounded-sm shadow-sm"></div>
              <span className="font-bold text-lg tracking-tight hidden md:inline">
                FuZ <span className="font-light opacity-70">Logistics</span>
              </span>
            </div>

            <div className="hidden md:block">
              <DateFilter
                onFilterChange={(start, end) => setDateRange({ start, end })}
              />
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <NavLink to="/" label="Command Center" />
            <NavLink to="/manager" label="Opportunity Manager" />
          </nav>
        </div>

        <div className="md:hidden p-2 border-t border-slate-100 flex justify-center bg-slate-50">
          <DateFilter
            onFilterChange={(start, end) => setDateRange({ start, end })}
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8">
        <Routes>
          <Route
            path="/"
            element={<Dashboard opportunities={dateFilteredOpportunities} />}
          />
          <Route
            path="/manager"
            element={
              <OpportunityManager
                opportunities={drillDownOpportunities}
                onSelect={handleSelectOpp}
              />
            }
          />
        </Routes>
      </main>

      <DetailPanel
        opportunity={selectedOpp}
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        onSave={handleUpdateOpportunity}
      />
    </div>
  );
};

const App = () => (
  <HashRouter>
    <MainContent />
  </HashRouter>
);

// Critical: expose App on window so index.js can render it
window.App = App;
