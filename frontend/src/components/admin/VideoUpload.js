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
    uploadData.append('client_name', formData.client_name);
    uploadData.append('client_title', formData.client_title);
    uploadData.append('thumbnail_url', formData.thumbnail_url);
    uploadData.append('video', videoFile);

    try {
      await axios.post(`${BACKEND_URL}/api/testimonials/upload`, uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
    <div className="bg-white/5 border border-white/10 backdrop-blur-md p-8">
      <div className="flex items-center gap-3 mb-6">
        <Video className="w-6 h-6 text-bronze-500" strokeWidth={1.5} />
        <h2 className="font-serif text-2xl font-semibold text-white">
          Upload Video Testimonial
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
            Client Name *
          </label>
          <Input
            required
            value={formData.client_name}
            onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
            className="bg-transparent border-b border-white/20 rounded-none px-0 py-4 focus:border-white focus:ring-0 text-white placeholder:text-white/30 h-auto"
            placeholder="John Smith"
            data-testid="video-client-name-input"
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
            className="bg-transparent border-b border-white/20 rounded-none px-0 py-4 focus:border-white focus:ring-0 text-white placeholder:text-white/30 h-auto"
            placeholder="CEO, Tech Corp"
            data-testid="video-client-title-input"
          />
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
            Thumbnail URL (Optional)
          </label>
          <Input
            type="url"
            value={formData.thumbnail_url}
            onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
            className="bg-transparent border-b border-white/20 rounded-none px-0 py-4 focus:border-white focus:ring-0 text-white placeholder:text-white/30 h-auto"
            placeholder="https://example.com/thumbnail.jpg"
            data-testid="video-thumbnail-input"
          />
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
            Video File *
          </label>
          <div className="border border-dashed border-white/20 hover:border-white/40 transition-colors duration-300 p-8 text-center">
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              className="hidden"
              id="video-upload"
              required
            />
            <label htmlFor="video-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 text-white/40 mx-auto mb-4" strokeWidth={1.5} />
              <p className="text-white/60 font-sans mb-2">
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
          className="bg-white text-black hover:bg-gray-200 rounded-none h-12 px-8 uppercase tracking-widest text-xs font-bold transition-colors duration-300"
          data-testid="submit-video-btn"
        >
          {uploading ? "Uploading..." : "Upload Video"}
        </Button>
      </form>
    </div>
  );
};

export default VideoUpload;
