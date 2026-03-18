import { useState, useEffect } from "react";
import { FileText, Trash2, Edit, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import axios from "axios";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ArticlesManager = () => {
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
      toast.success("Article published successfully!");
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
    } catch (error) {
      toast.error("Failed to publish article. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BACKEND_URL}/api/articles/${editingArticle.id}`, editingArticle);
      toast.success("Article updated successfully!");
      setEditingArticle(null);
      fetchArticles();
    } catch (error) {
      toast.error("Failed to update article.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/api/articles/${deleteId}`);
      toast.success("Article deleted successfully!");
      fetchArticles();
    } catch (error) {
      toast.error("Failed to delete article.");
    } finally {
      setDeleteId(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Create Button */}
      <div className="flex justify-between items-center">
        <h2 className="font-serif text-xl md:text-2xl font-semibold text-white">
          Articles ({articles.length})
        </h2>
        <Button
          onClick={() => setShowCreateForm(true)}
          className="bg-white text-black hover:bg-gray-200 rounded-none h-10 md:h-12 px-4 md:px-8 uppercase tracking-widest text-xs font-bold"
        >
          <Plus className="w-4 h-4 mr-2" strokeWidth={2} />
          New Article
        </Button>
      </div>

      {/* Existing Articles */}
      <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 md:p-8">
        {loading ? (
          <p className="text-white/40 text-center py-8">Loading...</p>
        ) : articles.length === 0 ? (
          <p className="text-white/40 text-center py-8">No articles yet.</p>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white/5 border border-white/10 p-4 md:p-6 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h4 className="font-serif text-lg md:text-xl font-semibold text-white">
                        {article.title}
                      </h4>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-bronze-500 px-2 py-1 bg-bronze-500/10 border border-bronze-500/20">
                        {article.category}
                      </span>
                    </div>
                    <p className="text-white/60 text-sm mb-2">{article.excerpt}</p>
                    <div className="flex items-center gap-3 text-white/40 font-mono text-xs">
                      <span>{formatDate(article.created_at)}</span>
                      <span>•</span>
                      <span>{article.read_time}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setEditingArticle(article)}
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-none h-10 px-4 md:px-6 uppercase tracking-widest text-xs"
                    >
                      <Edit className="w-4 h-4 md:mr-2" strokeWidth={1.5} />
                      <span className="hidden md:inline">Edit</span>
                    </Button>
                    <Button
                      onClick={() => setDeleteId(article.id)}
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

      {/* Create Article Dialog */}
      <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
        <DialogContent className="max-w-2xl glass border-white/10 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white font-serif text-2xl">Publish New Article</DialogTitle>
            <DialogDescription className="sr-only">Create a new article with title, category, excerpt, and content.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-5 mt-4">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
                  Title *
                </label>
                <Input
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-transparent border-b border-white/20 rounded-none px-0 py-3 focus:border-white focus:ring-0 text-white placeholder:text-white/30 h-auto text-sm"
                  placeholder="Article title"
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
                  className="bg-transparent border-b border-white/20 rounded-none px-0 py-3 focus:border-white focus:ring-0 text-white placeholder:text-white/30 h-auto text-sm"
                  placeholder="Industry Insights"
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
                  className="bg-transparent border-b border-white/20 rounded-none px-0 py-3 focus:border-white focus:ring-0 text-white placeholder:text-white/30 h-auto text-sm"
                  placeholder="8 min read"
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
                  className="bg-transparent border-b border-white/20 rounded-none px-0 py-3 focus:border-white focus:ring-0 text-white placeholder:text-white/30 h-auto text-sm"
                  placeholder="https://example.com/image.jpg"
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
                className="bg-transparent border border-white/20 rounded-none px-4 py-3 focus:border-white focus:ring-0 text-white placeholder:text-white/30 min-h-[80px] resize-none text-sm"
                placeholder="Brief summary..."
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
                className="bg-transparent border border-white/20 rounded-none px-4 py-3 focus:border-white focus:ring-0 text-white placeholder:text-white/30 min-h-[200px] resize-y text-sm"
                placeholder="Full article content..."
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="flex-1 bg-transparent border border-white/20 text-white hover:bg-white/10 rounded-none h-12 uppercase tracking-widest text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-white text-black hover:bg-gray-200 rounded-none h-12 uppercase tracking-widest text-xs font-bold"
              >
                {submitting ? "Publishing..." : "Publish Article"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Article Dialog */}
      <Dialog open={!!editingArticle} onOpenChange={() => setEditingArticle(null)}>
        <DialogContent className="max-w-2xl glass border-white/10 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white font-serif text-2xl">Edit Article</DialogTitle>
            <DialogDescription className="sr-only">Update article details and save changes.</DialogDescription>
          </DialogHeader>
          {editingArticle && (
            <form onSubmit={handleUpdate} className="space-y-5 mt-4">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
                    Title *
                  </label>
                  <Input
                    required
                    value={editingArticle.title}
                    onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                    className="bg-transparent border-b border-white/20 rounded-none px-0 py-3 focus:border-white focus:ring-0 text-white h-auto text-sm"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
                    Category *
                  </label>
                  <Input
                    required
                    value={editingArticle.category}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                    className="bg-transparent border-b border-white/20 rounded-none px-0 py-3 focus:border-white focus:ring-0 text-white h-auto text-sm"
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
                    value={editingArticle.read_time}
                    onChange={(e) => setEditingArticle({ ...editingArticle, read_time: e.target.value })}
                    className="bg-transparent border-b border-white/20 rounded-none px-0 py-3 focus:border-white focus:ring-0 text-white h-auto text-sm"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
                    Image URL
                  </label>
                  <Input
                    type="url"
                    value={editingArticle.image_url}
                    onChange={(e) => setEditingArticle({ ...editingArticle, image_url: e.target.value })}
                    className="bg-transparent border-b border-white/20 rounded-none px-0 py-3 focus:border-white focus:ring-0 text-white h-auto text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
                  Excerpt *
                </label>
                <Textarea
                  required
                  value={editingArticle.excerpt}
                  onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                  className="bg-transparent border border-white/20 rounded-none px-4 py-3 focus:border-white focus:ring-0 text-white min-h-[80px] resize-none text-sm"
                />
              </div>
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
                  Content *
                </label>
                <Textarea
                  required
                  value={editingArticle.content}
                  onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                  className="bg-transparent border border-white/20 rounded-none px-4 py-3 focus:border-white focus:ring-0 text-white min-h-[200px] resize-y text-sm"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={() => setEditingArticle(null)}
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
            <DialogTitle className="text-white font-serif text-2xl">Delete Article?</DialogTitle>
            <DialogDescription className="text-white/60 text-sm">
              This action cannot be undone. The article will be permanently deleted from the database.
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

export default ArticlesManager;
