
import { useState } from "react";
import { startOfWeek, addDays, parse, addMinutes } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Appointment } from "@/types/appointment";
import { Professional } from "@/components/agenda/ProfessionalSelector";

// Dados de exemplo
const professionals: Professional[] = [
  { id: "1", name: "Dr. Carlos Silva", specialty: "Cabelo" },
  { id: "2", name: "Dra. Ana Souza", specialty: "Pele" },
  { id: "3", name: "Dr. Roberto Martins", specialty: "Massagem" },
  { id: "all", name: "Todos os profissionais", specialty: "" },
];

// Convert the old appointment format to the new Appointment type
const rawAppointments = [
  { id: 1, clientName: "João Pedro", service: "Corte de Cabelo", professionalId: 1, date: new Date(2025, 4, 10, 10, 0), duration: 30 },
  { id: 2, clientName: "Maria Silva", service: "Limpeza de Pele", professionalId: 2, date: new Date(2025, 4, 10, 11, 0), duration: 60 },
  { id: 3, clientName: "Ricardo Almeida", service: "Massagem", professionalId: 3, date: new Date(2025, 4, 10, 14, 0), duration: 50 },
  { id: 4, clientName: "Paula Costa", service: "Corte de Cabelo", professionalId: 1, date: new Date(2025, 4, 11, 9, 30), duration: 30 },
  { id: 5, clientName: "João Oliveira", service: "Barba", professionalId: 1, date: new Date(2025, 4, 12, 13, 0), duration: 20 },
  { id: 6, clientName: "Lúcia Ferreira", service: "Limpeza Facial", professionalId: 2, date: new Date(2025, 4, 13, 15, 30), duration: 45 },
  { id: 7, clientName: "Marcelo Santos", service: "Massagem Relaxante", professionalId: 3, date: new Date(2025, 4, 14, 10, 0), duration: 60 },
];

// Convert to the Appointment type
const appointments: Appointment[] = rawAppointments.map(appt => {
  const startTime = new Date(appt.date);
  const endTime = addMinutes(startTime, appt.duration);
  
  return {
    id: appt.id,
    clientName: appt.clientName,
    serviceName: appt.service,
    professionalId: appt.professionalId,
    startTime,
    endTime,
    status: Math.random() > 0.3 ? "confirmed" : "pending",
  };
});

// Gerar time slots
const generateTimeSlots = () => {
  const slots = [];
  for (let i = 8; i < 19; i++) {
    slots.push({ hour: i, minute: 0 });
    slots.push({ hour: i, minute: 30 });
  }
  return slots;
};

export const useAgenda = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedProfessional, setSelectedProfessional] = useState<string>("all");
  
  const timeSlots = generateTimeSlots();
  
  // Gerar dias da semana a partir do dia atual
  const startOfCurrentWeek = date ? startOfWeek(date, { weekStartsOn: 0 }) : startOfWeek(new Date(), { weekStartsOn: 0 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i));

  const handleNewAppointment = () => {
    console.log("Criar novo agendamento");
    // Aqui você implementaria a lógica para abrir um modal ou navegar para uma página de criação
  };

  return {
    date,
    setDate,
    selectedProfessional,
    setSelectedProfessional,
    professionals,
    appointments,
    timeSlots,
    weekDays,
    handleNewAppointment,
  };
};
