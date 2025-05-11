
import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

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
  // Mobile view for appointments as cards
  const renderMobileView = () => {
    const filteredAppointments = appointments.filter(
      (apt) => apt.professionalId.toString() === selectedProfessional
    );

    if (filteredAppointments.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          Nenhum agendamento para este profissional hoje.
        </div>
      );
    }

    return (
      <div className="space-y-4 py-4">
        {filteredAppointments.map((appointment) => (
          <Card key={appointment.id} className="p-4 cursor-pointer hover:bg-accent/50">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{appointment.clientName}</p>
                <p className="text-sm text-muted-foreground">{appointment.service}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  {format(appointment.date, "HH:mm")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {appointment.duration}min
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  // Desktop/Tablet view with time slots
  const renderDesktopView = () => {
    return (
      <ScrollArea className="h-[600px] max-h-[calc(100vh-300px)]">
        <div className="relative min-h-[600px] w-full">
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
                <div className="w-16 flex-shrink-0 py-2 text-xs text-muted-foreground text-right pr-2">
                  {timeLabel}
                </div>
                <div className="flex-1 border-t border-border relative">
                  {slotAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="absolute left-0 right-4 ml-1 rounded-md px-2 py-1 text-sm bg-primary/10 border-l-4 border-primary cursor-pointer"
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
      </ScrollArea>
    );
  };

  return (
    <>
      <div className="md:hidden">
        {renderMobileView()}
      </div>
      <div className="hidden md:block">
        {renderDesktopView()}
      </div>
    </>
  );
};
