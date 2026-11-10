import { useState, useEffect } from "react";
import { Calendar, Clock, Mail, Phone, User, MessageSquare, Search, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AppointmentsList = ({ onUpdate }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/appointments`);
      setAppointments(response.data);
      onUpdate?.();
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = appointments.filter((item) => {
    const q = searchTerm.toLowerCase();
    return (
      item.name?.toLowerCase().includes(q) ||
      item.email?.toLowerCase().includes(q) ||
      item.phone?.toLowerCase().includes(q) ||
      item.date?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-[#0C1017]/85 backdrop-blur-2xl border border-white/10 p-6 md:p-10 rounded-xl shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      {/* Header and Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <Calendar className="w-5 h-5 text-bronze-500" strokeWidth={1.5} />
            <h2 className="font-serif text-2xl font-bold text-white tracking-tight">
              Inbound Consultation Inquiries
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-white/40">
            Chronological register of executive appointments
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-none pl-9 pr-3 py-2 text-xs text-white placeholder:text-white/30 h-10 w-full focus-visible:border-white focus-visible:ring-0"
            />
          </div>
          <Button
            onClick={fetchAppointments}
            className="bg-transparent border border-white/20 text-white hover:bg-white/10 rounded-none h-10 px-4 uppercase tracking-widest text-[10px] font-mono flex items-center gap-1.5"
            title="Refresh list"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 font-mono text-xs uppercase tracking-widest text-white/40">
          Loading appointment registers...
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="text-center py-20 bg-white/[0.02] border border-white/5 p-8">
          <Calendar className="w-10 h-10 text-white/20 mx-auto mb-3" strokeWidth={1} />
          <p className="text-white/50 font-sans font-light">
            {searchTerm ? "No matching appointments found." : "No appointments scheduled in the database yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-[#0F0F0F] border border-white/10 p-6 md:p-8 hover:border-white/25 hover:bg-[#141414] transition-colors duration-200 rounded-none"
              data-testid="appointment-card"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                {/* Client Profile */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-bronze-500" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="font-serif text-xl md:text-2xl font-semibold text-white">
                        {appointment.name}
                      </h3>
                      <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        CONFIRMED
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-sans text-white/60 mb-4">
                      <a
                        href={`mailto:${appointment.email}`}
                        className="flex items-center gap-1.5 hover:text-white transition-colors duration-200"
                      >
                        <Mail className="w-3.5 h-3.5 text-bronze-500" strokeWidth={1.5} />
                        {appointment.email}
                      </a>
                      <a
                        href={`tel:${appointment.phone}`}
                        className="flex items-center gap-1.5 hover:text-white transition-colors duration-200"
                      >
                        <Phone className="w-3.5 h-3.5 text-bronze-500" strokeWidth={1.5} />
                        {appointment.phone}
                      </a>
                    </div>

                    {appointment.message && (
                      <div className="bg-black/40 border border-white/5 p-4 rounded-none">
                        <div className="flex items-center gap-1.5 text-white/40 font-mono text-[10px] uppercase tracking-wider mb-1.5">
                          <MessageSquare className="w-3 h-3 text-bronze-500" />
                          <span>Mandate Scope Note</span>
                        </div>
                        <p className="text-xs md:text-sm text-white/70 font-sans font-light leading-relaxed">
                          {appointment.message}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Session Date & Time Badge */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/5 flex-shrink-0">
                  <div className="flex items-center gap-2 bg-[#1A1A1A] border border-white/10 px-3.5 py-2">
                    <Calendar className="w-4 h-4 text-bronze-500" strokeWidth={1.5} />
                    <span className="font-mono text-xs uppercase tracking-wider text-white">
                      {appointment.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-bronze-500/15 border border-bronze-500/30 px-3.5 py-2">
                    <Clock className="w-4 h-4 text-bronze-500" strokeWidth={1.5} />
                    <span className="font-mono text-xs uppercase tracking-wider text-bronze-400 font-bold">
                      {appointment.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentsList;
