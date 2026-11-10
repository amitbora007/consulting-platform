import { useState, useEffect } from "react";
import { ArrowRight, Clock, BookOpen, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const BlogPreviews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeArticle, setActiveArticle] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/articles`);
      setArticles(response.data.slice(0, 3));
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <section id="insights" className="min-h-screen flex flex-col justify-center py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze-400"></span>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
                Institutional Research // Chapter 05
              </p>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
              Executive Perspectives & Briefings.
            </h2>
          </div>

          <p className="font-sans font-light text-white/60 max-w-sm text-sm md:text-base leading-relaxed">
            Proprietary research and analysis on capital efficiency, board dynamics, and industry disruptions.
          </p>
        </motion.div>

        {loading ? (
          <div className="py-20 text-center font-mono text-xs uppercase tracking-widest text-white/40">
            Accessing Research Archives...
          </div>
        ) : articles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#0C1017]/85 backdrop-blur-2xl border border-white/10 p-16 text-center rounded-2xl shadow-xl max-w-2xl mx-auto"
          >
            <BookOpen className="w-10 h-10 text-white/20 mx-auto mb-4" strokeWidth={1} />
            <p className="text-white/50 font-sans font-light">
              No executive briefings currently published.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 perspective-1000">
            {articles.map((article, idx) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                onClick={() => setActiveArticle(article)}
                className="group bg-[#0C1017]/85 backdrop-blur-2xl border border-white/10 overflow-hidden hover:border-bronze-500/40 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_50px_-15px_rgba(192,160,98,0.25)] transition-all duration-500 flex flex-col cursor-pointer relative"
                data-testid="blog-preview-card"
              >
                {/* Top specular rim */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-10" />

                {/* Media Viewport */}
                <div className="aspect-video bg-[#141824] relative overflow-hidden border-b border-white/10">
                  {article.image_url ? (
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#181D2A] to-[#0A0D15]">
                      <span className="font-serif text-6xl text-white/10 font-bold">C</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-black font-semibold bg-gradient-to-r from-bronze-500 to-bronze-400 px-3 py-1 rounded-md shadow-md">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Article Copy */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4 font-mono text-[10px] uppercase tracking-widest text-white/40">
                      <span>{formatDate(article.created_at)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-bronze-400">
                        <Clock className="w-3 h-3" strokeWidth={1.5} />
                        {article.read_time}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl md:text-2xl font-semibold text-white mb-3 tracking-tight group-hover:text-bronze-300 transition-colors duration-300">
                      {article.title}
                    </h3>

                    <p className="text-white/60 font-sans font-light leading-relaxed mb-6 text-sm line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-white/50 group-hover:text-white transition-colors duration-300">
                    <span>Read Executive Briefing</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300 text-bronze-400 font-bold" strokeWidth={1.75} />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      {/* Article Detail Modal */}
      <Dialog open={!!activeArticle} onOpenChange={() => setActiveArticle(null)}>
        <DialogContent className="max-w-3xl bg-[#0C1017]/95 border border-white/20 p-8 md:p-12 overflow-y-auto max-h-[85vh] rounded-2xl shadow-2xl backdrop-blur-2xl">
          <DialogTitle className="sr-only">{activeArticle?.title}</DialogTitle>
          <DialogDescription className="sr-only">Executive perspective article</DialogDescription>
          {activeArticle && (
            <div>
              <div className="flex items-center gap-3 mb-4 font-mono text-xs uppercase tracking-widest">
                <span className="text-black bg-bronze-500 px-2.5 py-0.5 font-bold">
                  {activeArticle.category}
                </span>
                <span className="text-white/40">•</span>
                <span className="text-white/40">{formatDate(activeArticle.created_at)}</span>
                <span className="text-white/40">•</span>
                <span className="text-bronze-500">{activeArticle.read_time}</span>
              </div>

              <h2 className="font-serif text-2xl md:text-4xl font-bold text-white mb-6 tracking-tight leading-tight">
                {activeArticle.title}
              </h2>

              <p className="text-lg text-white/80 font-sans font-light leading-relaxed mb-8 border-l-2 border-bronze-500 pl-4 py-1 italic">
                {activeArticle.excerpt}
              </p>

              <div className="prose prose-invert max-w-none text-white/70 font-sans font-light leading-relaxed text-base space-y-4 whitespace-pre-wrap">
                {activeArticle.content}
              </div>

              <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-white/40">
                  Consult Inc. Research & Insight Group
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default BlogPreviews;
