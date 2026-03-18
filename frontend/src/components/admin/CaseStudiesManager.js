import { useState, useEffect } from "react";
import { FileText, Trash2, Edit, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import axios from "axios";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CaseStudiesManager = () => {
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
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      toast.success("Case study uploaded successfully!");
      setFormData({ title: "", description: "", industry: "" });
      setPdfFile(null);
      e.target.reset();
      fetchCaseStudies();
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
      toast.success("Case study updated successfully!");
      setEditingCase(null);
      fetchCaseStudies();
    } catch (error) {
      toast.error("Failed to update case study.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/api/case-studies/${deleteId}`);
      toast.success("Case study deleted successfully!");
      fetchCaseStudies();
    } catch (error) {
      toast.error("Failed to delete case study.");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Upload Form */}
      <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-6 h-6 text-bronze-500" strokeWidth={1.5} />
          <h2 className="font-serif text-xl md:text-2xl font-semibold text-white">
            Upload Case Study
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
              Title *
            </label>
            <Input
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-transparent border-b border-white/20 rounded-none px-0 py-3 focus:border-white focus:ring-0 text-white placeholder:text-white/30 h-auto text-sm md:text-base"
              placeholder="Digital Transformation for Fortune 500 Company"
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
              className="bg-transparent border-b border-white/20 rounded-none px-0 py-3 focus:border-white focus:ring-0 text-white placeholder:text-white/30 h-auto text-sm md:text-base"
              placeholder="Technology"
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
              className="bg-transparent border border-white/20 rounded-none px-4 py-3 focus:border-white focus:ring-0 text-white placeholder:text-white/30 min-h-[80px] resize-none text-sm md:text-base"
              placeholder="Brief overview of the case study..."
            />
          </div>

          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
              PDF File *
            </label>
            <div className="border border-dashed border-white/20 hover:border-white/40 transition-colors duration-300 p-6 md:p-8 text-center">
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setPdfFile(e.target.files[0])}
                className="hidden"
                id="pdf-upload"
                required
              />
              <label htmlFor="pdf-upload" className="cursor-pointer">
                <Upload className="w-10 h-10 md:w-12 md:h-12 text-white/40 mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-white/60 font-sans mb-2 text-sm md:text-base">
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
            className="w-full md:w-auto bg-white text-black hover:bg-gray-200 rounded-none h-12 px-8 uppercase tracking-widest text-xs font-bold transition-colors duration-300"
          >
            {uploading ? "Uploading..." : "Upload Case Study"}
          </Button>
        </form>
      </div>

      {/* Existing Case Studies */}
      <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 md:p-8">
        <h3 className="font-serif text-xl md:text-2xl font-semibold text-white mb-6">
          Existing Case Studies ({caseStudies.length})
        </h3>

        {loading ? (
          <p className="text-white/40 text-center py-8">Loading...</p>
        ) : caseStudies.length === 0 ? (
          <p className="text-white/40 text-center py-8">No case studies yet.</p>
        ) : (
          <div className="space-y-4">
            {caseStudies.map((cs) => (
              <div
                key={cs.id}
                className="bg-white/5 border border-white/10 p-4 md:p-6 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h4 className="font-serif text-lg md:text-xl font-semibold text-white">
                        {cs.title}
                      </h4>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-bronze-500 px-2 py-1 bg-bronze-500/10 border border-bronze-500/20">
                        {cs.industry}
                      </span>
                    </div>
                    <p className="text-white/60 text-sm">{cs.description}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setEditingCase(cs)}
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-none h-10 px-4 md:px-6 uppercase tracking-widest text-xs"
                    >
                      <Edit className="w-4 h-4 md:mr-2" strokeWidth={1.5} />
                      <span className="hidden md:inline">Edit</span>
                    </Button>
                    <Button
                      onClick={() => setDeleteId(cs.id)}
                      variant="destructive"
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 rounded-none h-10 px-4 md:px-6 uppercase tracking-widest text-xs"
                    >
                      <Trash2 className="w-4 h-4 md:mr-2" strokeWidth={1.5} />
                      <span className="hidden md:inline">Delete</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingCase} onOpenChange={() => setEditingCase(null)}>
        <DialogContent className="max-w-2xl glass border-white/10 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white font-serif text-2xl">Edit Case Study</DialogTitle>
            <DialogDescription className="sr-only">Update the case study title, industry, and description.</DialogDescription>
          </DialogHeader>
          {editingCase && (
            <form onSubmit={handleUpdate} className="space-y-5 mt-4">
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
                  Title *
                </label>
                <Input
                  required
                  value={editingCase.title}
                  onChange={(e) => setEditingCase({ ...editingCase, title: e.target.value })}
                  className="bg-transparent border-b border-white/20 rounded-none px-0 py-3 focus:border-white focus:ring-0 text-white h-auto"
                />
              </div>
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
                  Industry *
                </label>
                <Input
                  required
                  value={editingCase.industry}
                  onChange={(e) => setEditingCase({ ...editingCase, industry: e.target.value })}
                  className="bg-transparent border-b border-white/20 rounded-none px-0 py-3 focus:border-white focus:ring-0 text-white h-auto"
                />
              </div>
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
                  Description *
                </label>
                <Textarea
                  required
                  value={editingCase.description}
                  onChange={(e) => setEditingCase({ ...editingCase, description: e.target.value })}
                  className="bg-transparent border border-white/20 rounded-none px-4 py-3 focus:border-white focus:ring-0 text-white min-h-[100px] resize-none"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={() => setEditingCase(null)}
                  className="flex-1 bg-transparent border border-white/20 text-white hover:bg-white/10 rounded-none h-12 uppercase tracking-widest text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-white text-black hover:bg-gray-200 rounded-none h-12 uppercase tracking-widest text-xs font-bold"
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
        <DialogContent className="bg-[#0A0A0A] border border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white font-serif text-2xl">Delete Case Study?</DialogTitle>
            <DialogDescription className="text-white/60 text-sm">
              This action cannot be undone. The PDF file will be permanently deleted from the server.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button 
              onClick={() => setDeleteId(null)}
              className="bg-transparent border border-white/20 text-white hover:bg-white/10 rounded-none"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white rounded-none"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CaseStudiesManager;
