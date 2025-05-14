import React, { useState, useEffect } from "react";
import { format, addHours, startOfDay, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Appointment } from "@/types/appointment";

interface DayViewProps {
  date?: Date;
  appointments: Appointment[];
  selectedProfessional: string;
  onAppointmentClick?: (appointment: Appointment) => void;
  timeSlots?: { hour: number, minute: number }[];
}

const BUSINESS_HOURS_START = 8; // 8 AM
const BUSINESS_HOURS_END = 18; // 6 PM

export const DayView: React.FC<DayViewProps> = ({
  date = new Date(),
  appointments,
  selectedProfessional,
  onAppointmentClick = () => {},
  timeSlots: externalTimeSlots,
}) => {
  const [timeSlots, setTimeSlots] = useState<Date[]>([]);

  useEffect(() => {
    // If external timeSlots are provided, convert them to Date objects
    if (externalTimeSlots) {
      const currentDate = date ? startOfDay(date) : startOfDay(new Date());
      const slots = externalTimeSlots.map(slot => {
        const slotDate = new Date(currentDate);
        slotDate.setHours(slot.hour, slot.minute);
        return slotDate;
      });
      setTimeSlots(slots);
    } else {
      // Otherwise generate timeSlots internally
      const slots: Date[] = [];
      const dayStart = startOfDay(date);
      
      for (let hour = BUSINESS_HOURS_START; hour <= BUSINESS_HOURS_END; hour++) {
        slots.push(addHours(dayStart, hour));
      }
      
      setTimeSlots(slots);
    }
  }, [date, externalTimeSlots]);

  const getAppointmentsForTimeSlot = (time: Date) => {
    return appointments.filter(appointment => 
      isSameDay(appointment.startTime, time) && 
      appointment.startTime.getHours() === time.getHours() &&
      (selectedProfessional === "all" || selectedProfessional === appointment.professionalId.toString())
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">
        {format(date, "EEEE, d 'de' MMMM", { locale: ptBR })}
      </h3>
      
      <div className="space-y-2">
        {timeSlots.map((time) => {
          const timeSlotAppointments = getAppointmentsForTimeSlot(time);
          
          return (
            <div key={time.toISOString()} className="flex items-start gap-2">
              <div className="w-16 text-sm font-medium pt-2">
                {format(time, "HH:mm")}
              </div>
              
              <div className="flex-1 min-h-[60px] border-l pl-2">
                {timeSlotAppointments.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {timeSlotAppointments.map((appointment) => (
                      <Card 
                        key={appointment.id}
                        className={cn(
                          "w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.33%-8px)] cursor-pointer transition-all hover:shadow-md",
                          appointment.status === "confirmed" ? "border-green-500 border-l-4" :
                          appointment.status === "pending" ? "border-yellow-500 border-l-4" :
                          "border-gray-300 border-l-4"
                        )}
                        onClick={() => onAppointmentClick(appointment)}
                      >
                        <CardContent className="p-3">
                          <div className="font-medium">{appointment.clientName}</div>
                          <div className="text-sm text-muted-foreground">{appointment.serviceName}</div>
                          <div className="text-xs mt-1">
                            {format(appointment.startTime, "HH:mm")} - 
                            {format(appointment.endTime, "HH:mm")}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Button 
                    variant="ghost" 
                    className="h-12 w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  >
                    + Adicionar agendamento
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
