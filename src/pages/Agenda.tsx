
import React, { useState } from "react";
import { format, startOfWeek, addDays, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Dados de exemplo
const professionals = [
  { id: 1, name: "Dr. Carlos Silva", specialty: "Cabelo" },
  { id: 2, name: "Dra. Ana Souza", specialty: "Pele" },
  { id: 3, name: "Dr. Roberto Martins", specialty: "Massagem" },
];

const appointments = [
  { id: 1, clientName: "João Pedro", service: "Corte de Cabelo", professionalId: 1, date: new Date(2025, 4, 10, 10, 0), duration: 30 },
  { id: 2, clientName: "Maria Silva", service: "Limpeza de Pele", professionalId: 2, date: new Date(2025, 4, 10, 11, 0), duration: 60 },
  { id: 3, clientName: "Ricardo Almeida", service: "Massagem", professionalId: 3, date: new Date(2025, 4, 10, 14, 0), duration: 50 },
  { id: 4, clientName: "Paula Costa", service: "Corte de Cabelo", professionalId: 1, date: new Date(2025, 4, 11, 9, 30), duration: 30 },
];

const timeSlots = [];
for (let i = 8; i < 19; i++) {
  timeSlots.push({ hour: i, minute: 0 });
  timeSlots.push({ hour: i, minute: 30 });
}

const Agenda = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedProfessional, setSelectedProfessional] = useState<string>("1");

  // Gerar dias da semana a partir do dia atual
  const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 0 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i));

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Agenda</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Novo Agendamento
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Calendário</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Profissionais</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {professionals.map((professional) => (
                <div
                  key={professional.id}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer",
                    selectedProfessional === professional.id.toString()
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-secondary"
                  )}
                  onClick={() => setSelectedProfessional(professional.id.toString())}
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{professional.name}</p>
                    <p className="text-xs text-muted-foreground">{professional.specialty}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <Card className="h-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <Select value={selectedProfessional} onValueChange={setSelectedProfessional}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione um profissional" />
                    </SelectTrigger>
                    <SelectContent>
                      {professionals.map((professional) => (
                        <SelectItem key={professional.id} value={professional.id.toString()}>
                          {professional.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Tabs defaultValue="day">
                  <TabsList>
                    <TabsTrigger value="day">Dia</TabsTrigger>
                    <TabsTrigger value="week">Semana</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="day" className="w-full">
                <TabsContent value="day" className="mt-0">
                  <div className="relative min-h-[600px] mt-4">
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
                </TabsContent>

                <TabsContent value="week" className="mt-0">
                  <div className="grid grid-cols-8 gap-1 mt-4">
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
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Agenda;
