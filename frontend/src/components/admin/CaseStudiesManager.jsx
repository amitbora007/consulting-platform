import { useState, useEffect } from "react";
import { FileText, Trash2, Edit, Upload, FileDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import axios from "axios";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CaseStudiesManager = ({ onUpdate }) => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editingCase, setEditingCase] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    industry: "",
  });
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/case-studies`);
      setCaseStudies(response.data);
    } catch (error) {
      console.error("Failed to fetch case studies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pdfFile) {
      toast.error("Please select a PDF document to upload");
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

      toast.success("Case study dossier uploaded successfully!");
      setFormData({ title: "", description: "", industry: "" });
      setPdfFile(null);
      e.target.reset();
      fetchCaseStudies();
      onUpdate?.();
    } catch (error) {
      toast.error("Failed to upload case study. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BACKEND_URL}/api/case-studies/${editingCase.id}`, editingCase);
      toast.success("Case study dossier updated.");
      setEditingCase(null);
      fetchCaseStudies();
      onUpdate?.();
    } catch (error) {
      toast.error("Failed to update case study.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/api/case-studies/${deleteId}`);
      toast.success("Case study deleted from registry.");
      fetchCaseStudies();
      onUpdate?.();
    } catch (error) {
      toast.error("Failed to delete case study.");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Station */}
      <div className="bg-[#0C1017]/85 backdrop-blur-2xl border border-white/10 p-6 md:p-10 rounded-xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          <FileText className="w-5 h-5 text-bronze-500" strokeWidth={1.5} />
          <div>
            <h2 className="font-serif text-xl md:text-2xl font-bold text-white tracking-tight">
              Publish New Case Study Dossier
            </h2>
            <p className="font-mono text-xs uppercase tracking-widest text-white/40">
              Upload authenticated PDF outcome reports and client debriefs
            </p>
          </div>
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
                className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white placeholder:text-white/25 focus-visible:border-white focus-visible:ring-0 text-sm md:text-base font-sans"
                placeholder="e.g. Cross-Border Restructuring for Global Logistics Firm"
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
                className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white placeholder:text-white/25 focus-visible:border-white focus-visible:ring-0 text-sm md:text-base font-sans"
                placeholder="e.g. Private Equity, Industrial, Life Sciences"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
              Executive Summary & Quantifiable Outcomes *
            </label>
            <Textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-2.5 text-white placeholder:text-white/25 focus-visible:border-white focus-visible:ring-0 text-sm font-sans resize-none h-24"
              placeholder="Provide a quantitative overview (e.g. +38% EBITDA uplift, 14-week turnaround timetable)..."
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
              Dossier Document File * (PDF only)
            </label>
            <div className="border border-dashed border-white/20 hover:border-bronze-500/60 transition-colors duration-300 p-8 text-center bg-black/40">
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setPdfFile(e.target.files[0])}
                className="hidden"
                id="pdf-upload"
                required
              />
              <label htmlFor="pdf-upload" className="cursor-pointer block">
                <Upload className="w-10 h-10 text-bronze-500 mx-auto mb-3" strokeWidth={1.5} />
                <p className="text-white font-sans text-sm font-medium mb-1">
                  {pdfFile ? pdfFile.name : "Select or drag PDF report"}
                </p>
                <p className="text-white/40 font-mono text-[10px] uppercase tracking-wider">
                  PDF format up to 50MB
                </p>
              </label>
            </div>
          </div>

          <Button
            type="submit"
            disabled={uploading}
            className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 rounded-none h-12 px-8 uppercase tracking-widest text-xs font-bold transition-colors duration-300"
          >
            {uploading ? "Publishing Dossier..." : "Commit Case Study Dossier"}
          </Button>
        </form>
      </div>

      {/* Library List */}
      <div className="bg-[#0A0A0A] border border-white/10 p-6 md:p-10 rounded-none">
        <h3 className="font-serif text-xl md:text-2xl font-bold text-white mb-6 pb-4 border-b border-white/10 flex items-center justify-between">
          <span>Active Case Studies ({caseStudies.length})</span>
          <span className="font-mono text-xs uppercase tracking-widest text-white/40">Audit Archive</span>
        </h3>

        {loading ? (
          <p className="text-white/40 font-mono text-xs uppercase tracking-widest text-center py-12">
            Loading case archives...
          </p>
        ) : caseStudies.length === 0 ? (
          <p className="text-white/40 font-sans font-light text-center py-12">
            No case studies registered in database yet.
          </p>
        ) : (
          <div className="space-y-4">
            {caseStudies.map((cs) => (
              <div
                key={cs.id}
                className="bg-[#0F0F0F] border border-white/10 p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-white/25 hover:bg-[#141414] transition-colors duration-200 rounded-none"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2.5 mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-bronze-500 px-2.5 py-0.5 bg-bronze-500/10 border border-bronze-500/20">
                      {cs.industry}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                      {cs.pdf_url?.split("/").pop()}
                    </span>
                  </div>

                  <h4 className="font-serif text-xl font-semibold text-white mb-2">
                    {cs.title}
                  </h4>
                  <p className="text-white/60 font-sans font-light text-sm line-clamp-2 max-w-3xl">
                    {cs.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/5 flex-shrink-0">
                  <Button
                    onClick={() => setEditingCase(cs)}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-none h-10 px-5 uppercase tracking-widest text-[10px] font-mono"
                  >
                    <Edit className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />
                    <span>Edit</span>
                  </Button>
                  <Button
                    onClick={() => setDeleteId(cs.id)}
                    variant="destructive"
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 rounded-none h-10 px-5 uppercase tracking-widest text-[10px] font-mono"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />
                    <span>Delete</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Case Dialog */}
      <Dialog open={!!editingCase} onOpenChange={() => setEditingCase(null)}>
        <DialogContent className="max-w-2xl bg-[#0A0A0A] border border-white/10 p-8 max-h-[90vh] overflow-y-auto rounded-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-white font-serif text-2xl font-bold tracking-tight">
              Edit Case Study Details
            </DialogTitle>
            <DialogDescription className="text-white/50 text-xs font-mono uppercase tracking-widest mt-1">
              Update title, industry tag, and executive debrief summary
            </DialogDescription>
          </DialogHeader>

          {editingCase && (
            <form onSubmit={handleUpdate} className="space-y-6 mt-6">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
                  Mandate Title *
                </label>
                <Input
                  required
                  value={editingCase.title}
                  onChange={(e) => setEditingCase({ ...editingCase, title: e.target.value })}
                  className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white focus-visible:border-white focus-visible:ring-0 text-sm font-sans"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
                  Industry Sector *
                </label>
                <Input
                  required
                  value={editingCase.industry}
                  onChange={(e) => setEditingCase({ ...editingCase, industry: e.target.value })}
                  className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white focus-visible:border-white focus-visible:ring-0 text-sm font-sans"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
                  Executive Summary *
                </label>
                <Textarea
                  required
                  value={editingCase.description}
                  onChange={(e) => setEditingCase({ ...editingCase, description: e.target.value })}
                  className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-2.5 text-white focus-visible:border-white focus-visible:ring-0 text-sm font-sans resize-none h-28"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <Button
                  type="button"
                  onClick={() => setEditingCase(null)}
                  className="bg-transparent border border-white/20 text-white hover:bg-white/10 rounded-none h-11 px-6 uppercase tracking-widest text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-white text-black hover:bg-gray-200 rounded-none h-11 px-6 uppercase tracking-widest text-xs font-bold"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="max-w-md bg-[#0A0A0A] border border-white/10 p-8 rounded-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-white font-serif text-2xl font-bold">
              Permanently Remove Case Study?
            </DialogTitle>
            <DialogDescription className="text-white/60 text-sm leading-relaxed mt-2 font-sans font-light">
              This action cannot be reversed. The associated PDF document will be purged from server storage.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-6">
            <Button
              onClick={() => setDeleteId(null)}
              className="bg-transparent border border-white/20 text-white hover:bg-white/10 rounded-none h-11 px-5 uppercase tracking-widest text-xs"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white rounded-none h-11 px-5 uppercase tracking-widest text-xs font-bold"
            >
              Confirm Deletion
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CaseStudiesManager;
