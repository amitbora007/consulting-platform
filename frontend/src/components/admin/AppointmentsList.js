import { useState, useEffect } from "react";
import { Calendar, Clock, Mail, Phone, User } from "lucide-react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/appointments`);
      setAppointments(response.data);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-16">
        <p className="text-white/40 font-sans">Loading appointments...</p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-md p-8">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-6 h-6 text-bronze-500" strokeWidth={1.5} />
        <h2 className="font-serif text-2xl font-semibold text-white">
          Scheduled Appointments
        </h2>
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-white/40 font-sans">No appointments scheduled yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white/5 border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              data-testid="appointment-card"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-bronze-500 mt-1 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-white mb-1">
                      {appointment.name}
                    </h3>
                    <div className="space-y-1">
                      <p className="text-white/60 font-sans text-sm flex items-center gap-2">
                        <Mail className="w-3 h-3" strokeWidth={1.5} />
                        {appointment.email}
                      </p>
                      <p className="text-white/60 font-sans text-sm flex items-center gap-2">
                        <Phone className="w-3 h-3" strokeWidth={1.5} />
                        {appointment.phone}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-white/60 font-mono text-xs uppercase tracking-widest">
                    <Calendar className="w-4 h-4 text-bronze-500" strokeWidth={1.5} />
                    {appointment.date}
                  </div>
                  <div className="flex items-center gap-2 text-white/60 font-mono text-xs uppercase tracking-widest">
                    <Clock className="w-4 h-4 text-bronze-500" strokeWidth={1.5} />
                    {appointment.time}
                  </div>
                </div>
              </div>
              
              {appointment.message && (
                <div className="pl-8 mt-3 pt-3 border-t border-white/10">
                  <p className="text-white/60 font-sans text-sm leading-relaxed">
                    {appointment.message}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentsList;
