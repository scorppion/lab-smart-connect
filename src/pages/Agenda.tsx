
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useAgenda } from "@/hooks/useAgenda";
import { AgendaHeader } from "@/components/agenda/AgendaHeader";
import { DateSelector } from "@/components/agenda/DateSelector";
import { ProfessionalSelector } from "@/components/agenda/ProfessionalSelector";
import { AgendaViewSelector } from "@/components/agenda/AgendaViewSelector";
import { DayView } from "@/components/agenda/DayView";
import { WeekView } from "@/components/agenda/WeekView";
import { CalendarIcon, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Agenda = () => {
  const [currentView, setCurrentView] = useState("day");
  const [showMobileCalendar, setShowMobileCalendar] = useState(false);
  
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

  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  return (
    <div className="space-y-4 animate-fadeIn w-full max-w-[1920px] mx-auto">
      <AgendaHeader onNewAppointment={handleNewAppointment} />

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Sidebar - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:block w-64 max-w-[280px] space-y-4 flex-shrink-0">
          <DateSelector 
            date={date} 
            setDate={setDate} 
            isCardView={true} 
          />
          <ProfessionalSelector 
            professionals={professionals}
            selectedProfessional={selectedProfessional}
            setSelectedProfessional={setSelectedProfessional}
            isCardView={true}
          />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <Card className="h-full">
            <CardHeader className="space-y-4">
              {/* Mobile Controls */}
              <div className="flex items-center justify-between lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <CalendarIcon className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full sm:max-w-md">
                    <div className="px-1 py-6">
                      <h3 className="text-lg font-medium mb-4">Calendário</h3>
                      <DateSelector 
                        date={date} 
                        setDate={setDate} 
                        isCardView={true} 
                      />
                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-4">Profissionais</h3>
                        <ProfessionalSelector 
                          professionals={professionals}
                          selectedProfessional={selectedProfessional}
                          setSelectedProfessional={setSelectedProfessional}
                          isCardView={true}
                        />
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                <AgendaViewSelector 
                  defaultValue={currentView} 
                  onChangeView={handleViewChange}
                  className="flex-1 mx-2"
                />

                <Button variant="outline" onClick={handleNewAppointment} size="icon">
                  <Users className="h-5 w-5" />
                </Button>
              </div>

              {/* Tablet/Desktop Controls */}
              <div className="hidden lg:flex lg:justify-between lg:items-center gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <DateSelector 
                    date={date} 
                    setDate={setDate} 
                    className="w-auto"
                  />
                  <ProfessionalSelector 
                    professionals={professionals}
                    selectedProfessional={selectedProfessional}
                    setSelectedProfessional={setSelectedProfessional}
                    className="w-auto min-w-[200px]"
                  />
                </div>
                
                <AgendaViewSelector 
                  defaultValue={currentView} 
                  onChangeView={handleViewChange}
                />
              </div>

              {/* Mobile date display and professional selector */}
              <div className="lg:hidden space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <DateSelector 
                    date={date} 
                    setDate={setDate} 
                    className="w-full sm:w-auto"
                  />
                </div>
                
                <ProfessionalSelector 
                  professionals={professionals}
                  selectedProfessional={selectedProfessional}
                  setSelectedProfessional={setSelectedProfessional}
                  className="w-full"
                />
              </div>
            </CardHeader>

            <CardContent className="p-0 sm:p-6">
              <Tabs value={currentView} onValueChange={handleViewChange} className="w-full">
                <TabsContent value="day" className="m-0">
                  <DayView 
                    selectedProfessional={selectedProfessional}
                    timeSlots={timeSlots}
                    appointments={appointments}
                  />
                </TabsContent>

                <TabsContent value="week" className="m-0">
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
