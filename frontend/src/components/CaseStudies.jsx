import { useState, useEffect } from "react";
import { Download, FileText, ArrowRight, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState([]);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/case-studies`);
      setCaseStudies(response.data);
    } catch (error) {
      console.error("Failed to fetch case studies:", error);
    }
  };

  const handleDownload = async (pdfUrl, title) => {
    try {
      const response = await fetch(`${BACKEND_URL}${pdfUrl}`);
      if (!response.ok) {
        throw new Error("Failed to download PDF");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      window.open(`${BACKEND_URL}${pdfUrl}`, "_blank");
    }
  };

  return (
    <section id="case-studies" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t border-white/10 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 bg-bronze-500"></span>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
                Audited Outcomes
              </p>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
              Case Studies & Proof Points.
            </h2>
          </div>
          <p className="font-sans font-light text-white/60 max-w-md text-sm md:text-base leading-relaxed">
            Detailed operational debriefs documenting quantifiable EBITDA expansion, turnarounds, and cross-border restructuring mandates.
          </p>
        </div>

        {caseStudies.length === 0 ? (
          <div className="bg-[#0C1017]/85 backdrop-blur-2xl border border-white/10 p-16 text-center rounded-xl shadow-xl">
            <FileText className="w-10 h-10 text-white/20 mx-auto mb-4" strokeWidth={1} />
            <p className="text-white/50 font-sans font-light">
              Executive dossiers are currently being anonymized for client confidentiality.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {caseStudies.map((study) => (
              <div
                key={study.id}
                className="group bg-[#0C1017]/85 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-xl shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative overflow-hidden transition-all duration-500 hover:border-bronze-500/40 hover:-translate-y-1 hover:shadow-[0_25px_50px_-15px_rgba(192,160,98,0.2)]"
                data-testid="case-study-item"
              >
                {/* Top specular rim */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

                <div className="flex items-start gap-6 flex-1 relative z-10">
                  {/* 3D Elevated Icon Pedestal */}
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/15 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:border-bronze-500/50 group-hover:shadow-[0_0_20px_rgba(192,160,98,0.3)] transition-all duration-300">
                    <FileText className="w-6 h-6 text-bronze-400 group-hover:text-bronze-300 transition-colors duration-200" strokeWidth={1.75} />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-bronze-400 px-3 py-1 bg-bronze-500/10 border border-bronze-500/30 rounded-md">
                        {study.industry}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                        CONFIDENTIAL EXECUTIVE DOSSIER
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl md:text-3xl font-semibold text-white mb-3 tracking-tight group-hover:text-white transition-colors duration-300">
                      {study.title}
                    </h3>

                    <p className="text-white/60 font-sans font-light leading-relaxed text-sm md:text-base max-w-3xl">
                      {study.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10 relative z-10">
                  <Button
                    onClick={() => handleDownload(study.pdf_url, study.title)}
                    className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 rounded-lg h-12 px-8 uppercase tracking-widest text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    data-testid="case-study-download-btn"
                  >
                    <Download className="w-4 h-4" strokeWidth={2} />
                    <span>Download Dossier</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseStudies;
