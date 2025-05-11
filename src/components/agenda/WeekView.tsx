
import React from "react";
import { format, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

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

interface WeekViewProps {
  weekDays: Date[];
  timeSlots: TimeSlot[];
  appointments: Appointment[];
  selectedProfessional: string;
}

export const WeekView = ({ weekDays, timeSlots, appointments, selectedProfessional }: WeekViewProps) => {
  return (
    <div className="grid grid-cols-8 gap-1 mt-4 min-w-[800px]">
      <div className="h-10"></div>
      {weekDays.map((day, i) => (
        <div
          key={i}
          className={cn(
            "h-10 flex flex-col items-center justify-center rounded-md",
            isToday(day) && "bg-primary/10 text-primary font-medium"
          )}
        >
          <div className="text-xs font-medium">
            {format(day, "EEE", { locale: ptBR })}
          </div>
          <div className={cn("text-sm", isToday(day) && "font-medium")}>
            {format(day, "d")}
          </div>
        </div>
      ))}

      {timeSlots.map((slot, slotIndex) => (
        <React.Fragment key={slotIndex}>
          <div className="border-t border-border text-xs text-muted-foreground p-2 text-right">
            {`${slot.hour.toString().padStart(2, '0')}:${slot.minute.toString().padStart(2, '0')}`}
          </div>
          
          {weekDays.map((day, dayIndex) => {
            const cellAppointments = appointments.filter((apt) => {
              if (apt.professionalId.toString() !== selectedProfessional) return false;
              
              const aptDay = apt.date.getDate();
              const aptMonth = apt.date.getMonth();
              const aptYear = apt.date.getFullYear();
              const aptHour = apt.date.getHours();
              const aptMinute = apt.date.getMinutes();
              
              const cellDay = day.getDate();
              const cellMonth = day.getMonth();
              const cellYear = day.getFullYear();
              
              return (
                aptDay === cellDay &&
                aptMonth === cellMonth &&
                aptYear === cellYear &&
                aptHour === slot.hour &&
                aptMinute === slot.minute
              );
            });

            return (
              <div
                key={dayIndex}
                className="border-t border-border h-10 relative"
              >
                {cellAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="absolute inset-0.5 bg-primary/10 rounded text-xs p-1 truncate border-l-2 border-primary"
                  >
                    {appointment.clientName} - {appointment.service}
                  </div>
                ))}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};
