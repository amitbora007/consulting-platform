import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-white/60 mb-4">
            Client Success Stories
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            What Our Clients Say
          </h2>
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/40 font-sans">No testimonials available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                onClick={() => setSelectedVideo(testimonial)}
                className="group relative bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-500"
                data-testid="testimonial-video-card"
              >
                <div className="aspect-video relative bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                  {testimonial.thumbnail_url ? (
                    <img
                      src={testimonial.thumbnail_url}
                      alt={testimonial.client_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Play className="w-16 h-16 text-white/40 group-hover:text-bronze-500 transition-colors duration-300" strokeWidth={1.5} />
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-6 h-6 text-white ml-1" fill="white" strokeWidth={0} />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold text-white mb-1">
                    {testimonial.client_name}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                    {testimonial.client_title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl glass border-white/10 p-0 overflow-hidden">
          <DialogTitle className="sr-only">Video Testimonial</DialogTitle>
          <DialogDescription className="sr-only">Watch video testimonial from {selectedVideo?.client_name}</DialogDescription>
          {selectedVideo && (
            <div>
              <video
                src={`${BACKEND_URL}${selectedVideo.video_url}`}
                controls
                autoPlay
                className="w-full aspect-video bg-black"
                data-testid="video-player"
              >
                Your browser does not support the video tag.
              </video>
              <div className="p-6 bg-black/60 backdrop-blur-md">
                <h3 className="font-serif text-2xl font-semibold text-white mb-1">
                  {selectedVideo.client_name}
                </h3>
                <p className="font-mono text-xs uppercase tracking-widest text-white/60">
                  {selectedVideo.client_title}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Testimonials;
