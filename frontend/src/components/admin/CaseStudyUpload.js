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
    uploadData.append('title', formData.title);
    uploadData.append('description', formData.description);
    uploadData.append('industry', formData.industry);
    uploadData.append('pdf', pdfFile);

    try {
      await axios.post(`${BACKEND_URL}/api/case-studies/upload`, uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
    <div className="bg-white/5 border border-white/10 backdrop-blur-md p-8">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-6 h-6 text-bronze-500" strokeWidth={1.5} />
        <h2 className="font-serif text-2xl font-semibold text-white">
          Upload Case Study
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
            Title *
          </label>
          <Input
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="bg-transparent border-b border-white/20 rounded-none px-0 py-4 focus:border-white focus:ring-0 text-white placeholder:text-white/30 h-auto"
            placeholder="Digital Transformation for Fortune 500 Company"
            data-testid="case-title-input"
          />
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
            Industry *
          </label>
          <Input
            required
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            className="bg-transparent border-b border-white/20 rounded-none px-0 py-4 focus:border-white focus:ring-0 text-white placeholder:text-white/30 h-auto"
            placeholder="Technology"
            data-testid="case-industry-input"
          />
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
            Description *
          </label>
          <Textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="bg-transparent border border-white/20 rounded-none px-4 py-4 focus:border-white focus:ring-0 text-white placeholder:text-white/30 min-h-[100px] resize-none"
            placeholder="Brief overview of the case study and key outcomes achieved..."
            data-testid="case-description-input"
          />
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
            PDF File *
          </label>
          <div className="border border-dashed border-white/20 hover:border-white/40 transition-colors duration-300 p-8 text-center">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}
              className="hidden"
              id="pdf-upload"
              required
            />
            <label htmlFor="pdf-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 text-white/40 mx-auto mb-4" strokeWidth={1.5} />
              <p className="text-white/60 font-sans mb-2">
                {pdfFile ? pdfFile.name : "Click to upload PDF"}
              </p>
              <p className="text-white/40 font-mono text-xs">
                PDF files up to 50MB
              </p>
            </label>
          </div>
        </div>

        <Button
          type="submit"
          disabled={uploading}
          className="bg-white text-black hover:bg-gray-200 rounded-none h-12 px-8 uppercase tracking-widest text-xs font-bold transition-colors duration-300"
          data-testid="submit-case-btn"
        >
          {uploading ? "Uploading..." : "Upload Case Study"}
        </Button>
      </form>
    </div>
  );
};

export default CaseStudyUpload;
