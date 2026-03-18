import { useState, useEffect } from "react";
import { Download, FileText } from "lucide-react";
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
      // Fetch the PDF file
      const response = await fetch(`${BACKEND_URL}${pdfUrl}`);
      
      if (!response.ok) {
        throw new Error('Failed to download PDF');
      }
      
      // Get the blob
      const blob = await response.blob();
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title}.pdf`;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open in new tab
      window.open(`${BACKEND_URL}${pdfUrl}`, '_blank');
    }
  };

  return (
    <section id="case-studies" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-white/60 mb-4">
            Proven Track Record
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Case Studies
          </h2>
        </div>

        {caseStudies.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/40 font-sans">No case studies available yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {caseStudies.map((study) => (
              <div
                key={study.id}
                className="group bg-white/5 border border-white/10 backdrop-blur-md p-6 md:p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-6"
                data-testid="case-study-item"
              >
                <div className="flex items-start gap-6 flex-1">
                  <div className="w-12 h-12 bg-bronze-500/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-bronze-500" strokeWidth={1.5} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="font-serif text-2xl font-semibold text-white">
                        {study.title}
                      </h3>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-bronze-500 px-3 py-1 bg-bronze-500/10 border border-bronze-500/20">
                        {study.industry}
                      </span>
                    </div>
                    <p className="text-white/60 font-sans font-light leading-relaxed">
                      {study.description}
                    </p>
                  </div>
                </div>
                
                <Button
                  onClick={() => handleDownload(study.pdf_url, study.title)}
                  className="bg-white text-black hover:bg-gray-200 rounded-none h-12 px-8 uppercase tracking-widest text-xs font-bold transition-colors duration-300 flex-shrink-0"
                  data-testid="case-study-download-btn"
                >
                  <Download className="w-4 h-4 mr-2" strokeWidth={2} />
                  Download
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseStudies;
