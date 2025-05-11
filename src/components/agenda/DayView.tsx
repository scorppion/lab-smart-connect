
import React from "react";
import { Card } from "@/components/ui/card";

interface TimeSlot {
  hour: number;
  minute: number;
}

interface Appointment {
  id: number;
  clientName: string;
  service: string;
  professionalId: number;
  date: Date;
  duration: number;
}

interface DayViewProps {
  selectedProfessional: string;
  timeSlots: TimeSlot[];
  appointments: Appointment[];
}

export const DayView = ({ selectedProfessional, timeSlots, appointments }: DayViewProps) => {
  return (
    <div className="relative min-h-[600px] mt-4 w-full min-w-[500px]">
      {timeSlots.map((slot, index) => {
        const timeLabel = `${slot.hour.toString().padStart(2, '0')}:${slot.minute.toString().padStart(2, '0')}`;
        
        // Filtrar agendamentos para este horário e profissional
        const slotAppointments = appointments.filter((apt) => {
          if (apt.professionalId.toString() !== selectedProfessional) return false;
          
          const aptHour = apt.date.getHours();
          const aptMinute = apt.date.getMinutes();
          return aptHour === slot.hour && aptMinute === slot.minute;
        });
        
        return (
          <div key={index} className="flex">
            <div className="w-14 py-2 text-xs text-muted-foreground text-right pr-2">
              {timeLabel}
            </div>
            <div className="flex-1 border-t border-border relative">
              {slotAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className={`absolute left-0 right-0 ml-1 mr-1 rounded-md px-2 py-1 text-sm bg-primary/10 border-l-4 border-primary cursor-pointer`}
                  style={{
                    top: "0",
                    height: `${appointment.duration}px`,
                  }}
                >
                  <p className="font-medium truncate">{appointment.clientName}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {appointment.service}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
