import { useState, useEffect } from "react";
import { Video, Trash2, Edit, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import axios from "axios";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const TestimonialsManager = () => {
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
    uploadData.append('client_name', formData.client_name);
    uploadData.append('client_title', formData.client_title);
    uploadData.append('thumbnail_url', formData.thumbnail_url);
    uploadData.append('video', videoFile);

    try {
      await axios.post(`${BACKEND_URL}/api/testimonials/upload`, uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      toast.success("Video testimonial uploaded successfully!");
      setFormData({ client_name: "", client_title: "", thumbnail_url: "" });
      setVideoFile(null);
      e.target.reset();
      fetchTestimonials();
    } catch (error) {
      toast.error("Failed to upload video. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/api/testimonials/${deleteId}`);
      toast.success("Testimonial deleted successfully!");
      fetchTestimonials();
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
      toast.success("Testimonial updated successfully!");
      setEditingTestimonial(null);
      fetchTestimonials();
    } catch (error) {
      toast.error("Failed to update testimonial.");
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Upload Form */}
      <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Video className="w-6 h-6 text-bronze-500" strokeWidth={1.5} />
          <h2 className="font-serif text-xl md:text-2xl font-semibold text-white">
            Upload Video Testimonial
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
                Client Name *
              </label>
              <Input
                required
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                className="bg-transparent border-b border-white/20 rounded-none px-0 py-3 focus:border-white focus:ring-0 text-white placeholder:text-white/30 h-auto text-sm md:text-base"
                placeholder="John Smith"
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
                Client Title *
              </label>
              <Input
                required
                value={formData.client_title}
                onChange={(e) => setFormData({ ...formData, client_title: e.target.value })}
                className="bg-transparent border-b border-white/20 rounded-none px-0 py-3 focus:border-white focus:ring-0 text-white placeholder:text-white/30 h-auto text-sm md:text-base"
                placeholder="CEO, Tech Corp"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
              Thumbnail URL (Optional)
            </label>
            <Input
              type="url"
              value={formData.thumbnail_url}
              onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
              className="bg-transparent border-b border-white/20 rounded-none px-0 py-3 focus:border-white focus:ring-0 text-white placeholder:text-white/30 h-auto text-sm md:text-base"
              placeholder="https://example.com/thumbnail.jpg"
            />
          </div>

          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
              Video File *
            </label>
            <div className="border border-dashed border-white/20 hover:border-white/40 transition-colors duration-300 p-6 md:p-8 text-center">
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files[0])}
                className="hidden"
                id="video-upload"
                required
              />
              <label htmlFor="video-upload" className="cursor-pointer">
                <Upload className="w-10 h-10 md:w-12 md:h-12 text-white/40 mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-white/60 font-sans mb-2 text-sm md:text-base">
                  {videoFile ? videoFile.name : "Click to upload video"}
                </p>
                <p className="text-white/40 font-mono text-xs">
                  MP4, MOV, AVI up to 100MB
                </p>
              </label>
            </div>
          </div>

          <Button
            type="submit"
            disabled={uploading}
            className="w-full md:w-auto bg-white text-black hover:bg-gray-200 rounded-none h-12 px-8 uppercase tracking-widest text-xs font-bold transition-colors duration-300"
          >
            {uploading ? "Uploading..." : "Upload Video"}
          </Button>
        </form>
      </div>

      {/* Existing Testimonials */}
      <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 md:p-8">
        <h3 className="font-serif text-xl md:text-2xl font-semibold text-white mb-6">
          Existing Testimonials ({testimonials.length})
        </h3>

        {loading ? (
          <p className="text-white/40 text-center py-8">Loading...</p>
        ) : testimonials.length === 0 ? (
          <p className="text-white/40 text-center py-8">No testimonials yet.</p>
        ) : (
          <div className="space-y-4">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white/5 border border-white/10 p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="flex-1">
                  <h4 className="font-serif text-lg md:text-xl font-semibold text-white mb-1">
                    {testimonial.client_name}
                  </h4>
                  <p className="font-mono text-xs uppercase tracking-widest text-white/40">
                    {testimonial.client_title}
                  </p>
                  <p className="text-white/60 text-xs mt-2">
                    Video: {testimonial.video_url.split('/').pop()}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => setEditingTestimonial(testimonial)}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-none h-10 px-4 md:px-6 uppercase tracking-widest text-xs"
                  >
                    <Edit className="w-4 h-4 md:mr-2" strokeWidth={1.5} />
                    <span className="hidden md:inline">Edit</span>
                  </Button>
                  <Button
                    onClick={() => setDeleteId(testimonial.id)}
                    variant="destructive"
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 rounded-none h-10 px-4 md:px-6 uppercase tracking-widest text-xs"
                  >
                    <Trash2 className="w-4 h-4 md:mr-2" strokeWidth={1.5} />
                    <span className="hidden md:inline">Delete</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Testimonial Dialog */}
      <Dialog open={!!editingTestimonial} onOpenChange={() => setEditingTestimonial(null)}>
        <DialogContent className="max-w-2xl glass border-white/10 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white font-serif text-2xl">Edit Testimonial</DialogTitle>
            <DialogDescription className="sr-only">Update testimonial client details and thumbnail URL.</DialogDescription>
          </DialogHeader>
          {editingTestimonial && (
            <form onSubmit={handleUpdate} className="space-y-5 mt-4">
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
                  Client Name *
                </label>
                <Input
                  required
                  value={editingTestimonial.client_name}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, client_name: e.target.value })}
                  className="bg-transparent border-b border-white/20 rounded-none px-0 py-3 focus:border-white focus:ring-0 text-white h-auto"
                />
              </div>
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
                  Client Title *
                </label>
                <Input
                  required
                  value={editingTestimonial.client_title}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, client_title: e.target.value })}
                  className="bg-transparent border-b border-white/20 rounded-none px-0 py-3 focus:border-white focus:ring-0 text-white h-auto"
                />
              </div>
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
                  Thumbnail URL (Optional)
                </label>
                <Input
                  type="url"
                  value={editingTestimonial.thumbnail_url}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, thumbnail_url: e.target.value })}
                  className="bg-transparent border-b border-white/20 rounded-none px-0 py-3 focus:border-white focus:ring-0 text-white h-auto"
                />
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded">
                <p className="text-white/60 text-sm mb-1">Current Video:</p>
                <p className="text-white text-xs font-mono">{editingTestimonial.video_url.split('/').pop()}</p>
                <p className="text-white/40 text-xs mt-2">Note: Video file cannot be changed. Delete and re-upload to replace.</p>
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={() => setEditingTestimonial(null)}
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
            <DialogTitle className="text-white font-serif text-2xl">Delete Testimonial?</DialogTitle>
            <DialogDescription className="text-white/60 text-sm">
              This action cannot be undone. The video file will be permanently deleted from the server.
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

export default TestimonialsManager;
