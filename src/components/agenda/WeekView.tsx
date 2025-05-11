
import React from "react";
import { format, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  // Mobile view for appointments as cards grouped by day
  const renderMobileView = () => {
    return (
      <div className="space-y-6">
        {weekDays.map((day, dayIndex) => {
          const dayAppointments = appointments.filter((apt) => {
            if (apt.professionalId.toString() !== selectedProfessional) return false;
            
            const aptDay = apt.date.getDate();
            const aptMonth = apt.date.getMonth();
            const aptYear = apt.date.getFullYear();
            
            const cellDay = day.getDate();
            const cellMonth = day.getMonth();
            const cellYear = day.getFullYear();
            
            return (
              aptDay === cellDay &&
              aptMonth === cellMonth &&
              aptYear === cellYear
            );
          });

          return (
            <div key={dayIndex}>
              <h3 className={cn(
                "text-sm font-medium mb-2 p-2 rounded-md",
                isToday(day) && "bg-primary/10 text-primary"
              )}>
                {format(day, "EEEE, d 'de' MMMM", { locale: ptBR })}
              </h3>
              
              {dayAppointments.length > 0 ? (
                <div className="space-y-3">
                  {dayAppointments.map((appointment) => (
                    <Card key={appointment.id} className="p-3 cursor-pointer hover:bg-accent/50">
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
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Nenhum agendamento
                </p>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Desktop/Tablet view with time slots and days
  const renderDesktopView = () => {
    return (
      <ScrollArea className="h-[600px]">
        <div className="grid grid-cols-8 gap-1 min-w-[800px]">
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
