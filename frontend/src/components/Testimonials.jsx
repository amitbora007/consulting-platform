import { useState, useEffect } from "react";
import { Play, Quote, X, Building, UserCheck, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/testimonials`);
      setTestimonials(response.data);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    }
  };

  return (
    <section id="testimonials" className="min-h-screen flex flex-col justify-center py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze-400"></span>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
                Boardroom Transcripts // Chapter 03
              </p>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
              Client Perspectives on Value Created.
            </h2>
          </div>
          <p className="font-sans font-light text-white/60 max-w-md text-sm md:text-base leading-relaxed">
            Direct briefings and verified testimonials from chief executives, board chairs, and investment partners.
          </p>
        </motion.div>

        {testimonials.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#0C1017]/85 backdrop-blur-2xl border border-white/10 p-16 text-center rounded-2xl shadow-xl max-w-2xl mx-auto"
          >
            <Quote className="w-10 h-10 text-white/20 mx-auto mb-4" strokeWidth={1} />
            <p className="text-white/50 font-sans font-light">
              Executive video recordings are currently undergoing compliance verification and will be published shortly.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 perspective-1000">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedVideo(testimonial)}
                className="group relative bg-[#0C1017]/85 backdrop-blur-2xl border border-white/10 hover:border-bronze-500/40 rounded-2xl overflow-hidden cursor-pointer shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_50px_-15px_rgba(192,160,98,0.25)] transition-all duration-500 flex flex-col"
                data-testid="testimonial-video-card"
              >
                {/* Top specular rim */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-10" />

                {/* Video Thumbnail Viewport */}
                <div className="aspect-video relative bg-black/60 overflow-hidden border-b border-white/10">
                  {testimonial.thumbnail_url ? (
                    <img
                      src={testimonial.thumbnail_url}
                      alt={testimonial.client_name}
                      className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#121620] to-[#0A0D14]">
                      <Quote className="w-12 h-12 text-white/20 group-hover:text-bronze-400 transition-colors duration-300" strokeWidth={1} />
                    </div>
                  )}

                  {/* Geometric Play Indicator with 3D Glass Pedestal */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 bg-black/80 border border-white/30 backdrop-blur-md flex items-center justify-center group-hover:border-bronze-400 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(192,160,98,0.4)] transition-all duration-300 rounded-lg shadow-2xl">
                      <Play className="w-5 h-5 text-white ml-0.5" fill="white" strokeWidth={0} />
                    </div>
                  </div>

                  <div className="absolute top-3 left-3">
                    <span className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 bg-black/80 border border-white/15 text-white/80 rounded-md backdrop-blur-md">
                      CONFIDENTIAL RECORDING
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-semibold text-white mb-1.5 group-hover:text-bronze-300 transition-colors duration-300">
                      {testimonial.client_name}
                    </h3>
                    <p className="font-mono text-xs uppercase tracking-widest text-bronze-400/90 mb-4">
                      {testimonial.client_title}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-white/40 font-mono text-[10px] uppercase tracking-wider">
                    <span className="group-hover:text-white/70 transition-colors duration-300">Watch Briefing</span>
                    <span className="group-hover:translate-x-1.5 transition-transform duration-300 text-bronze-400 font-bold">
                      &rarr;
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal Dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl bg-[#0C1017]/95 border border-white/20 p-0 overflow-hidden rounded-2xl shadow-2xl backdrop-blur-2xl">
          <DialogTitle className="sr-only">Executive Video Testimonial</DialogTitle>
          <DialogDescription className="sr-only">
            Watch briefing from {selectedVideo?.client_name}
          </DialogDescription>
          {selectedVideo && (
            <div>
              <div className="relative">
                <video
                  src={`${BACKEND_URL}${selectedVideo.video_url}`}
                  controls
                  autoPlay
                  className="w-full aspect-video bg-black"
                  data-testid="video-player"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="p-6 md:p-8 bg-[#0F0F0F] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <UserCheck className="w-4 h-4 text-bronze-500" strokeWidth={1.5} />
                    <h3 className="font-serif text-2xl font-semibold text-white">
                      {selectedVideo.client_name}
                    </h3>
                  </div>
                  <p className="font-mono text-xs uppercase tracking-widest text-bronze-500">
                    {selectedVideo.client_title}
                  </p>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 border border-white/10 px-3 py-1.5">
                  Verified Executive Mandate
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Testimonials;
