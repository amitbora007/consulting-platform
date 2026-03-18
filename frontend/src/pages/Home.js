import { useState } from "react";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import CaseStudies from "@/components/CaseStudies";
import BlogPreviews from "@/components/BlogPreviews";
import AppointmentBooking from "@/components/AppointmentBooking";
import Footer from "@/components/Footer";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Home = () => {
  const [showAppointment, setShowAppointment] = useState(false);

  return (
    <div className="min-h-screen">
      <Hero onBookAppointment={() => setShowAppointment(true)} />
      <Services />
      <Testimonials />
      <CaseStudies />
      <BlogPreviews />
      <Footer onBookAppointment={() => setShowAppointment(true)} />
      
      <Dialog open={showAppointment} onOpenChange={setShowAppointment}>
        <DialogContent className="max-w-4xl glass border-white/10 p-0 max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">Book Your Appointment</DialogTitle>
          <DialogDescription className="sr-only">Select a date, time, and fill in your details to schedule a consultation.</DialogDescription>
          <AppointmentBooking onClose={() => setShowAppointment(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
