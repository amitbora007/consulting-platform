import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Clock, X, Shield, CalendarCheck, CheckCircle } from "lucide-react";
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
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !selectedTime) {
      toast.error("Please select both a date and an available time slot");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${BACKEND_URL}/api/appointments`, {
        ...formData,
        date: date.toISOString().split("T")[0],
        time: selectedTime,
      });

      setSubmitted(true);
      toast.success("Consultation confirmed. An executive partner will contact you shortly.");
    } catch (error) {
      toast.error("Failed to book appointment. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#0C1017]/95 backdrop-blur-2xl border border-white/15 p-8 md:p-16 text-center rounded-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
        <div className="w-16 h-16 rounded-xl bg-bronze-500/15 border border-bronze-500/40 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(192,160,98,0.3)]">
          <CheckCircle className="w-8 h-8 text-bronze-400" strokeWidth={1.75} />
        </div>
        <h3 className="font-serif text-3xl font-bold text-white mb-3 tracking-tight">
          Consultation Request Confirmed
        </h3>
        <p className="font-sans font-light text-white/70 max-w-md mx-auto mb-8 leading-relaxed text-sm md:text-base">
          Your briefing request for <span className="text-white font-medium">{date?.toLocaleDateString()}</span> at <span className="text-bronze-400 font-medium">{selectedTime}</span> has been routed to managing partners. A confidential calendar confirmation will arrive via email.
        </p>
        <Button
          onClick={onClose}
          className="bg-white text-black hover:bg-gray-200 rounded-lg h-12 px-8 uppercase tracking-widest text-xs font-bold transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          Return to Platform
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#0C1017]/95 backdrop-blur-2xl relative rounded-2xl text-white overflow-hidden border border-white/15 shadow-2xl">
      {/* Top Specular Rim */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-20" />

      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-white/10 bg-[#090D14]/90 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-bronze-500/20 border border-bronze-500/30 flex items-center justify-center">
            <Shield className="w-3.5 h-3.5 text-bronze-400" strokeWidth={1.75} />
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/80">
            Confidential Client Intake
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all duration-200"
          data-testid="close-appointment-dialog"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" strokeWidth={1.75} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10">
        {/* Left Column: Calendar & Time Selection */}
        <div className="lg:col-span-6 p-6 md:p-10 lg:border-r border-white/10 bg-[#070A10]/90">
          <div className="mb-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-bronze-400 block mb-1">
              Step 01
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
              Select Session Date
            </h2>
            <p className="text-white/50 font-sans font-light text-xs md:text-sm">
              All appointments are conducted via secure video conference or at our Executive Plaza offices.
            </p>
          </div>

          <div className="mb-8" data-testid="appointment-calendar">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
              className="bg-[#090D14]/80 border border-white/10 rounded-xl p-4 w-full shadow-inner"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-3.5 h-3.5 text-bronze-400" strokeWidth={1.75} />
              <span className="font-mono text-[11px] uppercase tracking-widest text-white/70">
                Available Windows (EST)
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-2.5 px-2 text-[11px] font-mono uppercase tracking-wider border rounded-lg transition-all duration-200 ${
                      isSelected
                        ? "bg-gradient-to-r from-bronze-500 to-bronze-400 text-black border-bronze-400 font-bold shadow-[0_0_15px_rgba(192,160,98,0.4)] scale-102"
                        : "bg-white/[0.04] text-white/70 border-white/10 hover:border-bronze-500/40 hover:text-white hover:bg-white/[0.07]"
                    }`}
                    data-testid={`time-slot-${time.replace(/\s/g, "-")}`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Executive Credentials Form */}
        <div className="lg:col-span-6 p-6 md:p-10 flex flex-col justify-between bg-[#0C1017]/90">
          <div>
            <div className="mb-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-bronze-500 block mb-1">
                Step 02
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                Executive Credentials
              </h2>
              <p className="text-white/50 font-sans font-light text-xs md:text-sm">
                Provide your corporate credentials for conflict-check clearance.
              </p>
            </div>

            <form id="appointment-form" onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
                  Full Name & Title *
                </label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3.5 text-white placeholder:text-white/25 focus-visible:border-white focus-visible:ring-0 text-sm md:text-base font-sans"
                  placeholder="e.g. Marcus Vance, Chief Operating Officer"
                  data-testid="appointment-name-input"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
                  Corporate Email *
                </label>
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3.5 text-white placeholder:text-white/25 focus-visible:border-white focus-visible:ring-0 text-sm md:text-base font-sans"
                  placeholder="m.vance@enterprise.com"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
                  Direct Phone *
                </label>
                <Input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3.5 text-white placeholder:text-white/25 focus-visible:border-white focus-visible:ring-0 text-sm md:text-base font-sans"
                  placeholder="+1 (212) 555-0199"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
                  Mandate Context / Key Objective
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-2.5 text-white placeholder:text-white/25 focus-visible:border-white focus-visible:ring-0 text-sm font-sans resize-none h-20"
                  placeholder="Brief summary of challenges, capital allocation scope, or timeline..."
                />
              </div>
            </form>
          </div>

          <div className="pt-8 border-t border-white/10 mt-8">
            <Button
              type="submit"
              form="appointment-form"
              disabled={loading}
              className="w-full bg-white text-black hover:bg-gray-200 rounded-none h-13 uppercase tracking-widest text-xs font-bold transition-colors duration-300 shadow-xl"
            >
              {loading ? "Verifying Availability..." : "Confirm Consultation Booking"}
            </Button>
            <p className="font-mono text-[9px] uppercase tracking-wider text-white/40 text-center mt-3">
              Protected by non-disclosure agreements prior to preliminary discussion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
