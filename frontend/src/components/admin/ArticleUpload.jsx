import { useState } from "react";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ArticleUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    read_time: "",
    image_url: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      await axios.post(`${BACKEND_URL}/api/articles`, formData);

      toast.success("Executive article published successfully!");
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        read_time: "",
        image_url: "",
      });
    } catch (error) {
      toast.error("Failed to publish article. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-none">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <FileText className="w-5 h-5 text-bronze-500" strokeWidth={1.5} />
        <h2 className="font-serif text-2xl font-semibold text-white tracking-tight">
          Publish New Research Article
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
              Title *
            </label>
            <Input
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white placeholder:text-white/25 focus-visible:border-white focus-visible:ring-0 text-sm font-sans"
              placeholder="e.g. Corporate Architecture in Capital Constrained Markets"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
              Category *
            </label>
            <Input
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white placeholder:text-white/25 focus-visible:border-white focus-visible:ring-0 text-sm font-sans"
              placeholder="e.g. Strategy, Turnaround, Private Equity"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
              Estimated Read Time *
            </label>
            <Input
              required
              value={formData.read_time}
              onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
              className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white placeholder:text-white/25 focus-visible:border-white focus-visible:ring-0 text-sm font-sans"
              placeholder="e.g. 6 min read"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
              Featured Image URL (Optional)
            </label>
            <Input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white placeholder:text-white/25 focus-visible:border-white focus-visible:ring-0 text-sm font-sans"
              placeholder="https://images.unsplash.com/photo-..."
            />
          </div>
        </div>

        <div>
          <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
            Executive Summary / Excerpt *
          </label>
          <Textarea
            required
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-2.5 text-white placeholder:text-white/25 focus-visible:border-white focus-visible:ring-0 text-sm font-sans resize-none h-20"
            placeholder="Key takeaways and thesis..."
          />
        </div>

        <div>
          <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
            Full Content *
          </label>
          <Textarea
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-2.5 text-white placeholder:text-white/25 focus-visible:border-white focus-visible:ring-0 text-sm font-sans resize-none h-44"
            placeholder="Full briefing narrative..."
          />
        </div>

        <Button
          type="submit"
          disabled={uploading}
          className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 rounded-none h-12 px-8 uppercase tracking-widest text-xs font-bold transition-colors duration-300"
        >
          {uploading ? "Publishing..." : "Publish Research Article"}
        </Button>
      </form>
    </div>
  );
};

export default ArticleUpload;
