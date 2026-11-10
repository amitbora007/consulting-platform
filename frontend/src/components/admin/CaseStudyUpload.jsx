import { useState } from "react";
import { Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CaseStudyUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    industry: "",
  });
  const [pdfFile, setPdfFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pdfFile) {
      toast.error("Please select a PDF file");
      return;
    }

    setUploading(true);
    const uploadData = new FormData();
    uploadData.append("title", formData.title);
    uploadData.append("description", formData.description);
    uploadData.append("industry", formData.industry);
    uploadData.append("pdf", pdfFile);

    try {
      await axios.post(`${BACKEND_URL}/api/case-studies/upload`, uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Case study uploaded successfully!");
      setFormData({ title: "", description: "", industry: "" });
      setPdfFile(null);
      e.target.reset();
    } catch (error) {
      toast.error("Failed to upload case study. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-none">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <FileText className="w-5 h-5 text-bronze-500" strokeWidth={1.5} />
        <h2 className="font-serif text-2xl font-semibold text-white tracking-tight">
          Upload Case Study Dossier
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
              Mandate Title *
            </label>
            <Input
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white placeholder:text-white/25 focus-visible:border-white focus-visible:ring-0 text-sm font-sans"
              placeholder="e.g. Turnaround Strategy for Global Logistics Provider"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
              Industry Sector *
            </label>
            <Input
              required
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white placeholder:text-white/25 focus-visible:border-white focus-visible:ring-0 text-sm font-sans"
              placeholder="e.g. Technology, Supply Chain, Energy"
            />
          </div>
        </div>

        <div>
          <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
            Executive Summary *
          </label>
          <Textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-2.5 text-white placeholder:text-white/25 focus-visible:border-white focus-visible:ring-0 text-sm font-sans resize-none h-24"
            placeholder="Brief overview of challenges, interventions, and financial metrics..."
          />
        </div>

        <div>
          <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
            PDF File *
          </label>
          <div className="border border-dashed border-white/20 hover:border-bronze-500/60 transition-colors duration-300 p-8 text-center bg-black/40">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}
              className="hidden"
              id="pdf-upload-standalone"
              required
            />
            <label htmlFor="pdf-upload-standalone" className="cursor-pointer block">
              <Upload className="w-10 h-10 text-bronze-500 mx-auto mb-3" strokeWidth={1.5} />
              <p className="text-white font-sans text-sm font-medium mb-1">
                {pdfFile ? pdfFile.name : "Click to select PDF"}
              </p>
              <p className="text-white/40 font-mono text-[10px] uppercase tracking-wider">
                PDF documents up to 50MB
              </p>
            </label>
          </div>
        </div>

        <Button
          type="submit"
          disabled={uploading}
          className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 rounded-none h-12 px-8 uppercase tracking-widest text-xs font-bold transition-colors duration-300"
        >
          {uploading ? "Uploading Dossier..." : "Upload Case Study"}
        </Button>
      </form>
    </div>
  );
};

export default CaseStudyUpload;
