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
      
      toast.success("Article published successfully!");
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
    <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-6 h-6 text-bronze-500" strokeWidth={1.5} />
        <h2 className="font-serif text-xl md:text-2xl font-semibold text-white">
          Publish New Article
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
              Title *
            </label>
            <Input
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-transparent border-b border-white/20 rounded-none px-0 py-3 focus:border-white focus:ring-0 text-white placeholder:text-white/30 h-auto text-sm md:text-base"
              placeholder="Article title"
              data-testid="article-title-input"
            />
          </div>

          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
              Category *
            </label>
            <Input
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="bg-transparent border-b border-white/20 rounded-none px-0 py-3 focus:border-white focus:ring-0 text-white placeholder:text-white/30 h-auto text-sm md:text-base"
              placeholder="Industry Insights"
              data-testid="article-category-input"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
              Read Time *
            </label>
            <Input
              required
              value={formData.read_time}
              onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
              className="bg-transparent border-b border-white/20 rounded-none px-0 py-3 focus:border-white focus:ring-0 text-white placeholder:text-white/30 h-auto text-sm md:text-base"
              placeholder="8 min read"
              data-testid="article-read-time-input"
            />
          </div>

          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
              Image URL (Optional)
            </label>
            <Input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="bg-transparent border-b border-white/20 rounded-none px-0 py-3 focus:border-white focus:ring-0 text-white placeholder:text-white/30 h-auto text-sm md:text-base"
              placeholder="https://example.com/image.jpg"
              data-testid="article-image-input"
            />
          </div>
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
            Excerpt *
          </label>
          <Textarea
            required
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="bg-transparent border border-white/20 rounded-none px-4 py-3 focus:border-white focus:ring-0 text-white placeholder:text-white/30 min-h-[80px] resize-none text-sm md:text-base"
            placeholder="Brief summary of the article (appears on card)"
            data-testid="article-excerpt-input"
          />
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
            Article Content *
          </label>
          <Textarea
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="bg-transparent border border-white/20 rounded-none px-4 py-3 focus:border-white focus:ring-0 text-white placeholder:text-white/30 min-h-[200px] resize-y text-sm md:text-base"
            placeholder="Full article content..."
            data-testid="article-content-input"
          />
        </div>

        <Button
          type="submit"
          disabled={uploading}
          className="w-full md:w-auto bg-white text-black hover:bg-gray-200 rounded-none h-12 px-8 uppercase tracking-widest text-xs font-bold transition-colors duration-300"
          data-testid="submit-article-btn"
        >
          <Plus className="w-4 h-4 mr-2" strokeWidth={2} />
          {uploading ? "Publishing..." : "Publish Article"}
        </Button>
      </form>
    </div>
  );
};

export default ArticleUpload;
