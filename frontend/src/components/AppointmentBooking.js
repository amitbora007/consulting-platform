import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Clock, X } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

const AppointmentBooking = ({ onClose }) => {
  const [date, setDate] = useState();
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!date || !selectedTime) {
      toast.error("Please select both date and time");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${BACKEND_URL}/api/appointments`, {
        ...formData,
        date: date.toISOString().split('T')[0],
        time: selectedTime,
      });
      
      toast.success("Appointment booked successfully! We'll contact you soon.");
      onClose();
    } catch (error) {
      toast.error("Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0A0A0A] relative">
      <button
        onClick={onClose}
        className="sticky top-0 right-4 ml-auto z-10 text-white/60 hover:text-white transition-colors block mb-4 mr-4 mt-4"
        data-testid="close-appointment-dialog"
      >
        <X className="w-5 h-5" strokeWidth={1.5} />
      </button>

      <div className="grid md:grid-cols-2">
        <div className="p-6 md:p-12 md:border-r border-white/10">
          <div className="mb-6">
            <p className="font-mono text-xs uppercase tracking-widest text-white/60 mb-4">
              Schedule Consultation
            </p>
            <h2 className="font-serif text-2xl md:text-4xl font-bold text-white tracking-tight mb-4">
              Book Your Appointment
            </h2>
            <p className="text-white/60 font-sans font-light text-sm md:text-base">
              Select your preferred date and time for a strategic consultation.
            </p>
          </div>

          <div className="mb-6" data-testid="appointment-calendar">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              className="bg-transparent border border-white/10 rounded-none p-3 w-full"
            />
          </div>

          {date && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-bronze-500" strokeWidth={1.5} />
                <p className="font-mono text-xs uppercase tracking-widest text-white/60">
                  Available Times
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-3 text-xs font-mono uppercase tracking-wider border transition-colors duration-300 ${
                      selectedTime === time
                        ? "bg-bronze-500 text-black border-bronze-500"
                        : "bg-transparent text-white/60 border-white/10 hover:border-white/30 hover:text-white"
                    }`}
                    data-testid={`time-slot-${time.replace(/\s/g, '-')}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 md:p-12 border-t md:border-t-0 border-white/10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
                Full Name *
              </label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-transparent border-b border-white/20 rounded-none px-0 py-4 focus:border-white focus:ring-0 text-white placeholder:text-white/30 h-auto"
                placeholder="John Doe"
                data-testid="appointment-name-input"
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
                Email Address *
              </label>
              <Input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-transparent border-b border-white/20 rounded-none px-0 py-4 focus:border-white focus:ring-0 text-white placeholder:text-white/30 h-auto"
                placeholder="john@company.com"
                data-testid="appointment-email-input"
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
                Phone Number *
              </label>
              <Input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-transparent border-b border-white/20 rounded-none px-0 py-4 focus:border-white focus:ring-0 text-white placeholder:text-white/30 h-auto"
                placeholder="+1 (555) 000-0000"
                data-testid="appointment-phone-input"
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
                Message (Optional)
              </label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-transparent border border-white/20 rounded-none px-4 py-4 focus:border-white focus:ring-0 text-white placeholder:text-white/30 min-h-[100px] resize-none"
                placeholder="Tell us about your business needs..."
                data-testid="appointment-message-input"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black hover:bg-gray-200 rounded-none h-12 px-8 uppercase tracking-widest text-xs font-bold transition-colors duration-300"
              data-testid="submit-appointment-btn"
            >
              {loading ? "Booking..." : "Confirm Appointment"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
