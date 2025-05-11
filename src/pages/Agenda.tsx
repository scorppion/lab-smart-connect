
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAgenda } from "@/hooks/useAgenda";
import { AgendaHeader } from "@/components/agenda/AgendaHeader";
import { DateSelector } from "@/components/agenda/DateSelector";
import { ProfessionalSelector } from "@/components/agenda/ProfessionalSelector";
import { AgendaViewSelector } from "@/components/agenda/AgendaViewSelector";
import { DayView } from "@/components/agenda/DayView";
import { WeekView } from "@/components/agenda/WeekView";

const Agenda = () => {
  const isMobile = useIsMobile();
  const {
    date,
    setDate,
    selectedProfessional,
    setSelectedProfessional,
    professionals,
    appointments,
    timeSlots,
    weekDays,
    handleNewAppointment,
  } = useAgenda();

  return (
    <div className="space-y-6 animate-fadeIn">
      <AgendaHeader onNewAppointment={handleNewAppointment} />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar - renderizado como um bloco superior em mobile */}
        <div className="w-full lg:w-64 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <DateSelector date={date} setDate={setDate} isCardView={true} />
            <ProfessionalSelector 
              professionals={professionals}
              selectedProfessional={selectedProfessional}
              setSelectedProfessional={setSelectedProfessional}
              isCardView={true}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <Card className="h-full">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <DateSelector date={date} setDate={setDate} />
                  <ProfessionalSelector 
                    professionals={professionals}
                    selectedProfessional={selectedProfessional}
                    setSelectedProfessional={setSelectedProfessional}
                  />
                </div>

                <AgendaViewSelector defaultValue="day" className="w-full sm:w-auto" />
              </div>
            </CardHeader>

            <CardContent className="p-0 sm:p-6">
              <Tabs defaultValue="day" className="w-full">
                <TabsContent value="day" className="mt-0 overflow-x-auto">
                  <DayView 
                    selectedProfessional={selectedProfessional}
                    timeSlots={timeSlots}
                    appointments={appointments}
                  />
                </TabsContent>

                <TabsContent value="week" className="mt-0 overflow-x-auto">
                  <WeekView 
                    weekDays={weekDays}
                    timeSlots={timeSlots}
                    appointments={appointments}
                    selectedProfessional={selectedProfessional}
                  />
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
