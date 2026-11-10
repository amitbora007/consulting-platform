import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import CaseStudies from "@/components/CaseStudies";
import BlogPreviews from "@/components/BlogPreviews";
import AppointmentBooking from "@/components/AppointmentBooking";
import Footer from "@/components/Footer";
import InteractiveConstellation from "@/components/ui/InteractiveConstellation";
import FloatingNavDock from "@/components/ui/FloatingNavDock";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Home = () => {
  const [showAppointment, setShowAppointment] = useState(false);

  return (
    <div className="min-h-screen cinematic-bg text-[#EDEDED] font-sans selection:bg-[#C0A062] selection:text-black relative">
      {/* 3D Interactive Constellation Particle Canvas */}
      <InteractiveConstellation />

      {/* Cinematic Volumetric Light Ambient Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/3 w-[800px] h-[800px] bg-bronze-500/10 rounded-full blur-[160px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10">
        <Navbar onBookAppointment={() => setShowAppointment(true)} />
        <main>
          <Hero onBookAppointment={() => setShowAppointment(true)} />
          <Services />
          <Testimonials />
          <CaseStudies />
          <BlogPreviews />
        </main>
        <Footer onBookAppointment={() => setShowAppointment(true)} />
      </div>

      {/* Floating 3D Navigation Dock with Scroll-Spy & Quick Booking */}
      <FloatingNavDock onBookAppointment={() => setShowAppointment(true)} />

      <Dialog open={showAppointment} onOpenChange={setShowAppointment}>
        <DialogContent className="max-w-5xl bg-transparent border-0 p-0 max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl">
          <DialogTitle className="sr-only">Book Executive Consultation</DialogTitle>
          <DialogDescription className="sr-only">
            Select a session date, preferred time window, and provide corporate credentials to schedule a consultation.
          </DialogDescription>
          <AppointmentBooking onClose={() => setShowAppointment(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
