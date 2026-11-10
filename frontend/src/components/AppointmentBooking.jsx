import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Clock, X, Shield, CalendarCheck, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
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
  const [mobileStep, setMobileStep] = useState(1); // 1: Date & Time, 2: Credentials (for mobile/tablet)
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
      setMobileStep(1);
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

  const formattedDate = date
    ? date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })
    : null;

  if (submitted) {
    return (
      <div className="bg-[#0C1017]/95 backdrop-blur-2xl border border-white/15 p-8 md:p-14 text-center rounded-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
        <div className="w-16 h-16 rounded-xl bg-bronze-500/15 border border-bronze-500/40 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(192,160,98,0.3)]">
          <CheckCircle className="w-8 h-8 text-bronze-400" strokeWidth={1.75} />
        </div>
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
          Consultation Request Confirmed
        </h3>
        <p className="font-sans font-light text-white/70 max-w-md mx-auto mb-8 leading-relaxed text-sm md:text-base">
          Your briefing request for <span className="text-white font-medium">{formattedDate}</span> at <span className="text-bronze-400 font-medium">{selectedTime}</span> has been routed to managing partners. A confidential calendar confirmation will arrive via email.
        </p>
        <Button
          onClick={onClose}
          className="bg-white text-black hover:bg-gray-100 rounded-xl h-11 px-8 uppercase tracking-widest text-xs font-bold transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          Return to Platform
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#0C1017]/95 backdrop-blur-2xl relative rounded-2xl text-white overflow-hidden border border-white/15 shadow-2xl max-w-full">
      {/* Top Specular Rim */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-20" />

      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 md:px-8 py-4 border-b border-white/10 bg-[#090D14]/90 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-bronze-500/20 border border-bronze-500/30 flex items-center justify-center">
            <Shield className="w-3.5 h-3.5 text-bronze-400" strokeWidth={1.75} />
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/90 font-semibold block leading-tight">
              Executive Consultation Intake
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/40 hidden sm:block">
              Confidential & Protected by NDA
            </span>
          </div>
        </div>

        {/* Mobile/Tablet Step Pills */}
        <div className="flex lg:hidden items-center gap-1.5 bg-white/5 border border-white/10 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setMobileStep(1)}
            className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-md transition-all ${
              mobileStep === 1
                ? "bg-bronze-400 text-black font-bold shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            01 Date
          </button>
          <button
            type="button"
            onClick={() => setMobileStep(2)}
            className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-md transition-all ${
              mobileStep === 2
                ? "bg-bronze-400 text-black font-bold shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            02 Details
          </button>
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

      {/* Main Grid: Adaptive Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
        
        {/* Left Column: Calendar & Time Selection (always visible on desktop, step 1 on mobile) */}
        <div className={`lg:col-span-6 p-5 sm:p-6 md:p-8 bg-[#070A10]/90 ${mobileStep === 1 ? "block" : "hidden lg:block"}`}>
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze-400" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-bronze-400">
                Phase 01 // Availability
              </span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
              Select Session Date
            </h2>
            <p className="text-white/50 font-sans font-light text-xs mt-1">
              All appointments are conducted via secure encrypted teleconference or boardroom briefing.
            </p>
          </div>

          {/* Calendar Picker */}
          <div className="mb-6 flex justify-center" data-testid="appointment-calendar">
            <div className="bg-[#090D14]/90 border border-white/10 rounded-xl w-full max-w-sm shadow-inner flex justify-center overflow-hidden">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => {
                  setDate(d);
                }}
                disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                className="w-full"
              />
            </div>
          </div>

          {/* Available Windows */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-bronze-400" strokeWidth={1.75} />
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/70">
                  Available Windows (EST)
                </span>
              </div>
              {selectedTime && (
                <span className="font-mono text-[10px] text-bronze-400 font-semibold uppercase tracking-wider">
                  Selected: {selectedTime}
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-1 text-[11px] font-mono uppercase tracking-wider border rounded-lg transition-all duration-200 text-center ${
                      isSelected
                        ? "bg-gradient-to-r from-[#DFC285] via-[#D4B26F] to-[#C0A062] text-[#06080E] border-transparent font-bold shadow-[0_0_15px_rgba(192,160,98,0.4)] scale-[1.02]"
                        : "bg-white/[0.03] text-white/70 border-white/10 hover:border-bronze-500/40 hover:text-white hover:bg-white/[0.07]"
                    }`}
                    data-testid={`time-slot-${time.replace(/\s/g, "-")}`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile-only Continue Button */}
          <div className="lg:hidden mt-6 pt-4 border-t border-white/10">
            <Button
              type="button"
              disabled={!date || !selectedTime}
              onClick={() => setMobileStep(2)}
              className="w-full bg-white text-black hover:bg-gray-100 rounded-xl h-11 uppercase tracking-widest text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-40"
            >
              <span>Continue to Credentials</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Right Column: Executive Credentials Form (always visible on desktop, step 2 on mobile) */}
        <div className={`lg:col-span-6 p-5 sm:p-6 md:p-8 flex flex-col justify-between bg-[#0C1017]/90 ${mobileStep === 2 ? "block" : "hidden lg:flex"}`}>
          <div>
            <div className="mb-5">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-bronze-400" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-bronze-400">
                    Phase 02 // Identity Clearance
                  </span>
                </div>
                {/* Mobile Back Button */}
                <button
                  type="button"
                  onClick={() => setMobileStep(1)}
                  className="lg:hidden text-xs text-white/50 hover:text-white font-mono flex items-center gap-1"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>Change Date</span>
                </button>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                Executive Credentials
              </h2>

              {/* Selected Session Summary Badge */}
              <div className="mt-3 p-3 bg-white/[0.03] border border-white/10 rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-bronze-500/15 border border-bronze-500/30 flex items-center justify-center flex-shrink-0">
                  <CalendarCheck className="w-4 h-4 text-bronze-400" />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] text-white font-semibold truncate">
                    {formattedDate ? `${formattedDate} • ${selectedTime || "Select Window"}` : "Select date & time in Step 01"}
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-white/40">
                    Confidential Partner Briefing
                  </p>
                </div>
              </div>
            </div>

            <form id="appointment-form" onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-white/60 mb-1.5">
                  Full Name & Corporate Title *
                </label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/[0.03] border border-white/15 rounded-lg px-3.5 py-2.5 text-white placeholder:text-white/25 focus-visible:border-bronze-400 focus-visible:ring-1 focus-visible:ring-bronze-400 text-sm font-sans"
                  placeholder="e.g. Marcus Vance, Chief Operating Officer"
                  data-testid="appointment-name-input"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-white/60 mb-1.5">
                  Corporate Email *
                </label>
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/[0.03] border border-white/15 rounded-lg px-3.5 py-2.5 text-white placeholder:text-white/25 focus-visible:border-bronze-400 focus-visible:ring-1 focus-visible:ring-bronze-400 text-sm font-sans"
                  placeholder="m.vance@enterprise.com"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-white/60 mb-1.5">
                  Direct Phone *
                </label>
                <Input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-white/[0.03] border border-white/15 rounded-lg px-3.5 py-2.5 text-white placeholder:text-white/25 focus-visible:border-bronze-400 focus-visible:ring-1 focus-visible:ring-bronze-400 text-sm font-sans"
                  placeholder="+1 (212) 555-0199"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-white/60 mb-1.5">
                  Mandate Context / Key Objective
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-white/[0.03] border border-white/15 rounded-lg px-3.5 py-2 text-white placeholder:text-white/25 focus-visible:border-bronze-400 focus-visible:ring-1 focus-visible:ring-bronze-400 text-xs font-sans resize-none h-16"
                  placeholder="Brief summary of challenges, capital allocation scope, or timeline..."
                />
              </div>
            </form>
          </div>

          <div className="pt-5 border-t border-white/10 mt-6">
            <Button
              type="submit"
              form="appointment-form"
              disabled={loading || !date || !selectedTime}
              className="w-full bg-white text-black hover:bg-gray-100 rounded-xl h-12 uppercase tracking-widest text-xs font-bold transition-all duration-300 shadow-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] disabled:opacity-40"
            >
              {loading ? "Securing Session..." : "Confirm Consultation Booking"}
            </Button>
            <p className="font-mono text-[9px] uppercase tracking-wider text-white/40 text-center mt-2.5">
              Protected by non-disclosure agreements prior to preliminary discussion.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AppointmentBooking;
