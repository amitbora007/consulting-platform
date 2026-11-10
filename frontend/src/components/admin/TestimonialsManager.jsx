import { useState, useEffect } from "react";
import { Video, Trash2, Edit, Upload, Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import axios from "axios";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const TestimonialsManager = ({ onUpdate }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [formData, setFormData] = useState({
    client_name: "",
    client_title: "",
    thumbnail_url: "",
  });
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/testimonials`);
      setTestimonials(response.data);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      toast.error("Please select a video file");
      return;
    }

    setUploading(true);
    const uploadData = new FormData();
    uploadData.append("client_name", formData.client_name);
    uploadData.append("client_title", formData.client_title);
    uploadData.append("thumbnail_url", formData.thumbnail_url);
    uploadData.append("video", videoFile);

    try {
      await axios.post(`${BACKEND_URL}/api/testimonials/upload`, uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Video testimonial published successfully!");
      setFormData({ client_name: "", client_title: "", thumbnail_url: "" });
      setVideoFile(null);
      e.target.reset();
      fetchTestimonials();
      onUpdate?.();
    } catch (error) {
      toast.error("Failed to upload video asset. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/api/testimonials/${deleteId}`);
      toast.success("Testimonial removed from registry.");
      fetchTestimonials();
      onUpdate?.();
    } catch (error) {
      toast.error("Failed to delete testimonial.");
    } finally {
      setDeleteId(null);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BACKEND_URL}/api/testimonials/${editingTestimonial.id}`, {
        client_name: editingTestimonial.client_name,
        client_title: editingTestimonial.client_title,
        thumbnail_url: editingTestimonial.thumbnail_url,
      });
      toast.success("Testimonial metadata updated.");
      setEditingTestimonial(null);
      fetchTestimonials();
      onUpdate?.();
    } catch (error) {
      toast.error("Failed to update testimonial.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Station */}
      <div className="bg-[#0C1017]/85 backdrop-blur-2xl border border-white/10 p-6 md:p-10 rounded-xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          <Video className="w-5 h-5 text-bronze-500" strokeWidth={1.5} />
          <div>
            <h2 className="font-serif text-xl md:text-2xl font-bold text-white tracking-tight">
              Register New Video Testimonial
            </h2>
            <p className="font-mono text-xs uppercase tracking-widest text-white/40">
              Upload authenticated executive client recordings
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
                Executive Name *
              </label>
              <Input
                required
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white placeholder:text-white/25 focus-visible:border-white focus-visible:ring-0 text-sm md:text-base font-sans"
                placeholder="e.g. Elena Rostova"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
                Executive Title & Enterprise *
              </label>
              <Input
                required
                value={formData.client_title}
                onChange={(e) => setFormData({ ...formData, client_title: e.target.value })}
                className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white placeholder:text-white/25 focus-visible:border-white focus-visible:ring-0 text-sm md:text-base font-sans"
                placeholder="e.g. Managing Partner, Apex Capital Partners"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
              Thumbnail Asset URL (Optional)
            </label>
            <Input
              type="url"
              value={formData.thumbnail_url}
              onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
              className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white placeholder:text-white/25 focus-visible:border-white focus-visible:ring-0 text-sm md:text-base font-sans"
              placeholder="https://images.unsplash.com/photo-..."
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
              Video Media File * (MP4, MOV, AVI)
            </label>
            <div className="border border-dashed border-white/20 hover:border-bronze-500/60 transition-colors duration-300 p-8 text-center bg-black/40">
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files[0])}
                className="hidden"
                id="video-upload"
                required
              />
              <label htmlFor="video-upload" className="cursor-pointer block">
                <Upload className="w-10 h-10 text-bronze-500 mx-auto mb-3" strokeWidth={1.5} />
                <p className="text-white font-sans text-sm font-medium mb-1">
                  {videoFile ? videoFile.name : "Select or drag video recording"}
                </p>
                <p className="text-white/40 font-mono text-[10px] uppercase tracking-wider">
                  Supported: MP4, MOV, AVI up to 100MB
                </p>
              </label>
            </div>
          </div>

          <Button
            type="submit"
            disabled={uploading}
            className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 rounded-none h-12 px-8 uppercase tracking-widest text-xs font-bold transition-colors duration-300"
          >
            {uploading ? "Uploading Video Asset..." : "Commit Video Testimonial"}
          </Button>
        </form>
      </div>

      {/* Library List */}
      <div className="bg-[#0A0A0A] border border-white/10 p-6 md:p-10 rounded-none">
        <h3 className="font-serif text-xl md:text-2xl font-bold text-white mb-6 pb-4 border-b border-white/10 flex items-center justify-between">
          <span>Active Testimonial Archives ({testimonials.length})</span>
          <span className="font-mono text-xs uppercase tracking-widest text-white/40">Verified Registry</span>
        </h3>

        {loading ? (
          <p className="text-white/40 font-mono text-xs uppercase tracking-widest text-center py-12">
            Loading archives...
          </p>
        ) : testimonials.length === 0 ? (
          <p className="text-white/40 font-sans font-light text-center py-12">
            No video recordings logged in the database yet.
          </p>
        ) : (
          <div className="space-y-4">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-[#0F0F0F] border border-white/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-white/25 hover:bg-[#141414] transition-colors duration-200 rounded-none"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Play className="w-5 h-5 text-bronze-500" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-semibold text-white mb-1">
                      {testimonial.client_name}
                    </h4>
                    <p className="font-mono text-xs uppercase tracking-widest text-bronze-500">
                      {testimonial.client_title}
                    </p>
                    <p className="text-white/40 font-mono text-[10px] uppercase tracking-wider mt-2">
                      Asset: {testimonial.video_url.split("/").pop()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-white/5 flex-shrink-0">
                  <Button
                    onClick={() => setEditingTestimonial(testimonial)}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-none h-10 px-5 uppercase tracking-widest text-[10px] font-mono"
                  >
                    <Edit className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />
                    <span>Edit Metadata</span>
                  </Button>
                  <Button
                    onClick={() => setDeleteId(testimonial.id)}
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

      {/* Edit Testimonial Dialog */}
      <Dialog open={!!editingTestimonial} onOpenChange={() => setEditingTestimonial(null)}>
        <DialogContent className="max-w-2xl bg-[#0A0A0A] border border-white/10 p-8 max-h-[90vh] overflow-y-auto rounded-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-white font-serif text-2xl font-bold tracking-tight">
              Edit Testimonial Metadata
            </DialogTitle>
            <DialogDescription className="text-white/50 text-xs font-mono uppercase tracking-widest mt-1">
              Update credentials and thumbnail source for this asset
            </DialogDescription>
          </DialogHeader>

          {editingTestimonial && (
            <form onSubmit={handleUpdate} className="space-y-6 mt-6">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
                  Client Name *
                </label>
                <Input
                  required
                  value={editingTestimonial.client_name}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, client_name: e.target.value })}
                  className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white focus-visible:border-white focus-visible:ring-0 text-sm font-sans"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
                  Client Title *
                </label>
                <Input
                  required
                  value={editingTestimonial.client_title}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, client_title: e.target.value })}
                  className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white focus-visible:border-white focus-visible:ring-0 text-sm font-sans"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
                  Thumbnail URL (Optional)
                </label>
                <Input
                  type="url"
                  value={editingTestimonial.thumbnail_url || ""}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, thumbnail_url: e.target.value })}
                  className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white focus-visible:border-white focus-visible:ring-0 text-sm font-sans"
                />
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-none">
                <p className="text-white/60 font-mono text-xs uppercase tracking-wider mb-1">Video Stream Target</p>
                <p className="text-white text-xs font-mono">{editingTestimonial.video_url.split("/").pop()}</p>
                <p className="text-white/40 text-[10px] font-mono mt-1">Note: Video binary cannot be edited in place. Delete and re-upload to swap file.</p>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <Button
                  type="button"
                  onClick={() => setEditingTestimonial(null)}
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
              Permanently Remove Testimonial?
            </DialogTitle>
            <DialogDescription className="text-white/60 text-sm leading-relaxed mt-2 font-sans font-light">
              This action cannot be reversed. The associated video file will be purged from server storage.
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

export default TestimonialsManager;
