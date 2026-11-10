import { useState } from "react";
import { Upload, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const VideoUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    client_name: "",
    client_title: "",
    thumbnail_url: "",
  });
  const [videoFile, setVideoFile] = useState(null);

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

      toast.success("Video testimonial uploaded successfully!");
      setFormData({ client_name: "", client_title: "", thumbnail_url: "" });
      setVideoFile(null);
      e.target.reset();
    } catch (error) {
      toast.error("Failed to upload video. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-none">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <Video className="w-5 h-5 text-bronze-500" strokeWidth={1.5} />
        <h2 className="font-serif text-2xl font-semibold text-white tracking-tight">
          Upload Video Testimonial
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
              Client Name *
            </label>
            <Input
              required
              value={formData.client_name}
              onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
              className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white placeholder:text-white/25 focus-visible:border-white focus-visible:ring-0 text-sm font-sans"
              placeholder="e.g. Marcus Vance"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
              Client Title *
            </label>
            <Input
              required
              value={formData.client_title}
              onChange={(e) => setFormData({ ...formData, client_title: e.target.value })}
              className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white placeholder:text-white/25 focus-visible:border-white focus-visible:ring-0 text-sm font-sans"
              placeholder="e.g. Chief Executive Officer, Enterprise Corp"
            />
          </div>
        </div>

        <div>
          <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
            Thumbnail URL (Optional)
          </label>
          <Input
            type="url"
            value={formData.thumbnail_url}
            onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
            className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white placeholder:text-white/25 focus-visible:border-white focus-visible:ring-0 text-sm font-sans"
            placeholder="https://example.com/thumbnail.jpg"
          />
        </div>

        <div>
          <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
            Video File *
          </label>
          <div className="border border-dashed border-white/20 hover:border-bronze-500/60 transition-colors duration-300 p-8 text-center bg-black/40">
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              className="hidden"
              id="video-upload-standalone"
              required
            />
            <label htmlFor="video-upload-standalone" className="cursor-pointer block">
              <Upload className="w-10 h-10 text-bronze-500 mx-auto mb-3" strokeWidth={1.5} />
              <p className="text-white font-sans text-sm font-medium mb-1">
                {videoFile ? videoFile.name : "Click to select video"}
              </p>
              <p className="text-white/40 font-mono text-[10px] uppercase tracking-wider">
                MP4, MOV, AVI up to 100MB
              </p>
            </label>
          </div>
        </div>

        <Button
          type="submit"
          disabled={uploading}
          className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 rounded-none h-12 px-8 uppercase tracking-widest text-xs font-bold transition-colors duration-300"
        >
          {uploading ? "Uploading Video..." : "Upload Video Testimonial"}
        </Button>
      </form>
    </div>
  );
};

export default VideoUpload;
