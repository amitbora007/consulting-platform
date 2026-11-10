import { useState, useEffect } from "react";
import { BookOpen, Trash2, Edit, Plus, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import axios from "axios";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ArticlesManager = ({ onUpdate }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editingArticle, setEditingArticle] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    read_time: "",
    image_url: "",
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/articles`);
      setArticles(response.data);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axios.post(`${BACKEND_URL}/api/articles`, formData);
      toast.success("Executive briefing published successfully!");
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        read_time: "",
        image_url: "",
      });
      setShowCreateForm(false);
      fetchArticles();
      onUpdate?.();
    } catch (error) {
      toast.error("Failed to publish briefing. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BACKEND_URL}/api/articles/${editingArticle.id}`, editingArticle);
      toast.success("Briefing updated successfully.");
      setEditingArticle(null);
      fetchArticles();
      onUpdate?.();
    } catch (error) {
      toast.error("Failed to update briefing.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/api/articles/${deleteId}`);
      toast.success("Briefing removed from publication registry.");
      fetchArticles();
      onUpdate?.();
    } catch (error) {
      toast.error("Failed to delete briefing.");
    } finally {
      setDeleteId(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0C1017]/85 backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <BookOpen className="w-5 h-5 text-bronze-500" strokeWidth={1.5} />
            <h2 className="font-serif text-2xl font-bold text-white tracking-tight">
              Executive Research & Perspectives
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-white/40">
            Publish thought leadership articles and industry commentaries
          </p>
        </div>

        <Button
          onClick={() => setShowCreateForm(true)}
          className="bg-white text-black hover:bg-gray-200 rounded-none h-11 px-6 uppercase tracking-widest text-xs font-bold transition-colors duration-200 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
          <span>New Briefing</span>
        </Button>
      </div>

      {/* Library Grid */}
      <div className="bg-[#0A0A0A] border border-white/10 p-6 md:p-10 rounded-none">
        <h3 className="font-serif text-xl md:text-2xl font-bold text-white mb-6 pb-4 border-b border-white/10 flex items-center justify-between">
          <span>Published Articles ({articles.length})</span>
          <span className="font-mono text-xs uppercase tracking-widest text-white/40">Editorial Catalog</span>
        </h3>

        {loading ? (
          <p className="text-white/40 font-mono text-xs uppercase tracking-widest text-center py-12">
            Loading articles...
          </p>
        ) : articles.length === 0 ? (
          <p className="text-white/40 font-sans font-light text-center py-12">
            No research briefings published yet. Click &quot;New Briefing&quot; to author one.
          </p>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-[#0F0F0F] border border-white/10 p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-white/25 hover:bg-[#141414] transition-colors duration-200 rounded-none"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2.5 mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-black font-semibold bg-bronze-500 px-2.5 py-0.5">
                      {article.category}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                      {formatDate(article.created_at)}
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-bronze-500">
                      {article.read_time}
                    </span>
                  </div>

                  <h4 className="font-serif text-xl font-semibold text-white mb-2">
                    {article.title}
                  </h4>
                  <p className="text-white/60 font-sans font-light text-sm line-clamp-2 max-w-3xl">
                    {article.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/5 flex-shrink-0">
                  <Button
                    onClick={() => setEditingArticle(article)}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-none h-10 px-5 uppercase tracking-widest text-[10px] font-mono"
                  >
                    <Edit className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />
                    <span>Edit</span>
                  </Button>
                  <Button
                    onClick={() => setDeleteId(article.id)}
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

      {/* Create Article Dialog */}
      <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
        <DialogContent className="max-w-3xl bg-[#0A0A0A] border border-white/10 p-8 md:p-10 max-h-[90vh] overflow-y-auto rounded-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-white font-serif text-2xl font-bold tracking-tight">
              Author New Research Briefing
            </DialogTitle>
            <DialogDescription className="text-white/50 text-xs font-mono uppercase tracking-widest mt-1">
              Publish executive perspectives and analysis to the public platform
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
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
                  placeholder="e.g. Navigating Sovereign Debt in M&A"
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
                  placeholder="e.g. Strategic Finance, Leadership, Governance"
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
                  placeholder="e.g. 5 min read"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
                  Header Image URL (Optional)
                </label>
                <Input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white placeholder:text-white/25 focus-visible:border-white focus-visible:ring-0 text-sm font-sans"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
                Executive Excerpt (Lead Summary) *
              </label>
              <Textarea
                required
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-2.5 text-white placeholder:text-white/25 focus-visible:border-white focus-visible:ring-0 text-sm font-sans resize-none h-20"
                placeholder="2-3 sentence executive synopsis..."
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
                Full Article Content *
              </label>
              <Textarea
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-2.5 text-white placeholder:text-white/25 focus-visible:border-white focus-visible:ring-0 text-sm font-sans resize-none h-44"
                placeholder="Full briefing analysis and operational takeaways..."
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <Button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="bg-transparent border border-white/20 text-white hover:bg-white/10 rounded-none h-11 px-6 uppercase tracking-widest text-xs font-mono"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-white text-black hover:bg-gray-200 rounded-none h-11 px-6 uppercase tracking-widest text-xs font-bold font-mono"
              >
                {submitting ? "Publishing..." : "Publish Briefing"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Article Dialog */}
      <Dialog open={!!editingArticle} onOpenChange={() => setEditingArticle(null)}>
        <DialogContent className="max-w-3xl bg-[#0A0A0A] border border-white/10 p-8 md:p-10 max-h-[90vh] overflow-y-auto rounded-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-white font-serif text-2xl font-bold tracking-tight">
              Edit Research Briefing
            </DialogTitle>
            <DialogDescription className="text-white/50 text-xs font-mono uppercase tracking-widest mt-1">
              Modify article title, category metadata, or editorial content
            </DialogDescription>
          </DialogHeader>

          {editingArticle && (
            <form onSubmit={handleUpdate} className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
                    Title *
                  </label>
                  <Input
                    required
                    value={editingArticle.title}
                    onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                    className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white focus-visible:border-white focus-visible:ring-0 text-sm font-sans"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
                    Category *
                  </label>
                  <Input
                    required
                    value={editingArticle.category}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                    className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white focus-visible:border-white focus-visible:ring-0 text-sm font-sans"
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
                    value={editingArticle.read_time}
                    onChange={(e) => setEditingArticle({ ...editingArticle, read_time: e.target.value })}
                    className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white focus-visible:border-white focus-visible:ring-0 text-sm font-sans"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
                    Header Image URL
                  </label>
                  <Input
                    type="url"
                    value={editingArticle.image_url || ""}
                    onChange={(e) => setEditingArticle({ ...editingArticle, image_url: e.target.value })}
                    className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white focus-visible:border-white focus-visible:ring-0 text-sm font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
                  Executive Excerpt *
                </label>
                <Textarea
                  required
                  value={editingArticle.excerpt}
                  onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                  className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-2.5 text-white focus-visible:border-white focus-visible:ring-0 text-sm font-sans resize-none h-20"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
                  Full Content *
                </label>
                <Textarea
                  required
                  value={editingArticle.content}
                  onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                  className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-2.5 text-white focus-visible:border-white focus-visible:ring-0 text-sm font-sans resize-none h-44"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <Button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className="bg-transparent border border-white/20 text-white hover:bg-white/10 rounded-none h-11 px-6 uppercase tracking-widest text-xs font-mono"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-white text-black hover:bg-gray-200 rounded-none h-11 px-6 uppercase tracking-widest text-xs font-bold font-mono"
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
              Permanently Remove Briefing?
            </DialogTitle>
            <DialogDescription className="text-white/60 text-sm leading-relaxed mt-2 font-sans font-light">
              This action cannot be undone. The article and all metadata will be purged from the research archive.
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

export default ArticlesManager;
