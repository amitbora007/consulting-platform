import { useState, useEffect } from "react";
import { ArrowRight, Clock } from "lucide-react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const BlogPreviews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/articles`);
      setArticles(response.data.slice(0, 3)); // Show only latest 3
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <p className="text-white/40 font-sans">Loading articles...</p>
          </div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="font-mono text-xs uppercase tracking-widest text-white/60 mb-4">
              Insights & Perspectives
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Latest Thinking
            </h2>
          </div>
          <div className="text-center py-16">
            <p className="text-white/40 font-sans">No articles published yet.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-white/60 mb-4">
              Insights & Perspectives
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Latest Thinking
            </h2>
          </div>
          
          <button className="text-white/60 hover:text-white uppercase tracking-widest text-[10px] flex items-center gap-2 transition-colors duration-300 self-start md:self-auto">
            View All Articles
            <ArrowRight className="w-3 h-3" strokeWidth={2} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-500 flex flex-col"
              data-testid="blog-preview-card"
            >
              <div className="aspect-video bg-gradient-to-br from-white/10 to-white/5 relative overflow-hidden">
                {article.image_url ? (
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-white/20 font-serif text-6xl">A</div>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white bg-bronze-500 px-3 py-1">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4 font-mono text-[10px] uppercase tracking-widest text-white/40">
                  <span>{formatDate(article.created_at)}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" strokeWidth={2} />
                    {article.read_time}
                  </span>
                </div>
                
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-white mb-3 tracking-tight group-hover:text-bronze-500 transition-colors duration-300">
                  {article.title}
                </h3>
                
                <p className="text-white/60 font-sans font-light leading-relaxed mb-6 flex-1 text-sm md:text-base">
                  {article.excerpt}
                </p>
                
                <button className="text-white/60 hover:text-white uppercase tracking-widest text-[10px] flex items-center gap-2 transition-colors duration-300 self-start">
                  Read More
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreviews;
