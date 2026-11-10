import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TestimonialsManager from "@/components/admin/TestimonialsManager";
import CaseStudiesManager from "@/components/admin/CaseStudiesManager";
import AppointmentsList from "@/components/admin/AppointmentsList";
import ArticlesManager from "@/components/admin/ArticlesManager";
import MetricCard3D from "@/components/admin/MetricCard3D";
import { Building2, ArrowLeft, Calendar, Video, FileText, BookOpen, ShieldCheck, RefreshCw } from "lucide-react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Admin = () => {
  const [stats, setStats] = useState({
    appointments: 0,
    testimonials: 0,
    caseStudies: 0,
    articles: 0,
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState(null);

  const fetchMetrics = useCallback(async () => {
    setIsSyncing(true);
    try {
      const [appRes, testRes, caseRes, artRes] = await Promise.allSettled([
        axios.get(`${BACKEND_URL}/api/appointments`),
        axios.get(`${BACKEND_URL}/api/testimonials`),
        axios.get(`${BACKEND_URL}/api/case-studies`),
        axios.get(`${BACKEND_URL}/api/articles`),
      ]);

      setStats({
        appointments: appRes.status === "fulfilled" ? appRes.value.data.length : 0,
        testimonials: testRes.status === "fulfilled" ? testRes.value.data.length : 0,
        caseStudies: caseRes.status === "fulfilled" ? caseRes.value.data.length : 0,
        articles: artRes.status === "fulfilled" ? artRes.value.data.length : 0,
      });
      setLastSynced(new Date());
    } catch (err) {
      console.error("Failed to load admin metrics", err);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();

    // Revalidate when user focuses or returns to the browser tab
    const handleFocus = () => {
      fetchMetrics();
    };
    window.addEventListener("focus", handleFocus);
    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        fetchMetrics();
      }
    });

    // Gentle 10-second polling interval to capture real-time bookings from public site
    const interval = setInterval(fetchMetrics, 10000);

    return () => {
      window.removeEventListener("focus", handleFocus);
      clearInterval(interval);
    };
  }, [fetchMetrics]);

  return (
    <div className="min-h-screen cinematic-bg text-[#EDEDED] font-sans relative selection:bg-bronze-500/30 selection:text-white">
      {/* Cinematic Ambient Light Beams */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-bronze-500/10 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] bg-bronze-600/5 rounded-full blur-[120px]" />
      </div>

      {/* Top Navigation Bar with Glass 3D Specular Rim */}
      <header className="border-b border-white/10 bg-[#090D14]/85 backdrop-blur-2xl sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-bronze-500/50 hover:shadow-[0_0_15px_rgba(192,160,98,0.25)] transition-all duration-300 group"
              title="Return to Public Site"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
            </Link>
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-bronze-500/20 border border-bronze-500/30 flex items-center justify-center">
                  <Building2 className="w-3.5 h-3.5 text-bronze-400" strokeWidth={1.75} />
                </div>
                <h1 className="font-serif text-lg md:text-xl font-bold tracking-tight text-white drop-shadow-sm">
                  Executive Command Center
                </h1>
              </div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/40 mt-0.5">
                Consult Inc. Firm Operations & Content Governance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchMetrics}
              disabled={isSyncing}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 font-mono text-[10px] uppercase tracking-wider text-white/70 transition-all duration-200"
              title="Manually sync live metrics"
            >
              <RefreshCw className={`w-3 h-3 text-bronze-400 ${isSyncing ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Sync</span>
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 font-mono text-[10px] uppercase tracking-wider text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Live Engine Connected</span>
            </div>
            <Link
              to="/"
              className="font-mono text-[11px] uppercase tracking-widest text-bronze-400 hover:text-bronze-300 transition-colors duration-200 hidden md:flex items-center gap-1 group"
            >
              <span>Live Portal</span>
              <span className="group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12 relative z-10">
        {/* Executive Overview 3D Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <MetricCard3D
            index={0}
            title="Appointments"
            value={stats.appointments}
            subtitle="Inbound Client Briefings"
            icon={Calendar}
          />
          <MetricCard3D
            index={1}
            title="Testimonials"
            value={stats.testimonials}
            subtitle="Executive Video Assets"
            icon={Video}
          />
          <MetricCard3D
            index={2}
            title="Case Studies"
            value={stats.caseStudies}
            subtitle="Audited Outcome Dossiers"
            icon={FileText}
          />
          <MetricCard3D
            index={3}
            title="Research Insights"
            value={stats.articles}
            subtitle="Published Briefings"
            icon={BookOpen}
          />
        </div>

        {/* Management Tabs with 3D Smoked Glass Container */}
        <Tabs defaultValue="appointments" className="w-full">
          <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0 mb-8 pb-2">
            <TabsList className="bg-[#0C1017]/80 backdrop-blur-2xl border border-white/10 p-1.5 inline-flex min-w-full md:min-w-0 rounded-xl h-auto gap-2 shadow-2xl">
              <TabsTrigger
                value="appointments"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-white data-[state=active]:to-white/95 data-[state=active]:text-black data-[state=active]:shadow-lg uppercase tracking-widest text-[11px] font-mono py-2.5 px-5 whitespace-nowrap rounded-lg transition-all duration-200"
                data-testid="admin-tab-appointments"
              >
                Appointments ({stats.appointments})
              </TabsTrigger>
              <TabsTrigger
                value="videos"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-white data-[state=active]:to-white/95 data-[state=active]:text-black data-[state=active]:shadow-lg uppercase tracking-widest text-[11px] font-mono py-2.5 px-5 whitespace-nowrap rounded-lg transition-all duration-200"
                data-testid="admin-tab-videos"
              >
                Video Briefings ({stats.testimonials})
              </TabsTrigger>
              <TabsTrigger
                value="cases"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-white data-[state=active]:to-white/95 data-[state=active]:text-black data-[state=active]:shadow-lg uppercase tracking-widest text-[11px] font-mono py-2.5 px-5 whitespace-nowrap rounded-lg transition-all duration-200"
                data-testid="admin-tab-cases"
              >
                Case Studies ({stats.caseStudies})
              </TabsTrigger>
              <TabsTrigger
                value="articles"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-white data-[state=active]:to-white/95 data-[state=active]:text-black data-[state=active]:shadow-lg uppercase tracking-widest text-[11px] font-mono py-2.5 px-5 whitespace-nowrap rounded-lg transition-all duration-200"
                data-testid="admin-tab-articles"
              >
                Research & Articles ({stats.articles})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="appointments">
            <AppointmentsList onUpdate={fetchMetrics} />
          </TabsContent>

          <TabsContent value="videos">
            <TestimonialsManager onUpdate={fetchMetrics} />
          </TabsContent>

          <TabsContent value="cases">
            <CaseStudiesManager onUpdate={fetchMetrics} />
          </TabsContent>

          <TabsContent value="articles">
            <ArticlesManager onUpdate={fetchMetrics} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
