
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AgendaHeaderProps {
  onNewAppointment: () => void;
}

export const AgendaHeader = ({ onNewAppointment }: AgendaHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Agenda</h1>
      <Button onClick={onNewAppointment}>
        <Plus className="mr-2 h-4 w-4" /> Novo Agendamento
      </Button>
    </div>
  );
};
