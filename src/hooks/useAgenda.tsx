
import { useState } from "react";
import { startOfWeek, addDays, parse, addMinutes, setHours, setMinutes } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Appointment } from "@/types/appointment";
import { Professional } from "@/components/agenda/ProfessionalSelector";
import { toast } from "sonner";
import { AppointmentFormValues } from "@/components/agenda/AppointmentDialog";

// Sample data - Removed the duplicate "Todos os profissionais" entry
const professionals: Professional[] = [
  { id: "1", name: "Dr. Carlos Silva", specialty: "Cabelo" },
  { id: "2", name: "Dra. Ana Souza", specialty: "Pele" },
  { id: "3", name: "Dr. Roberto Martins", specialty: "Massagem" },
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
let appointments: Appointment[] = rawAppointments.map(appt => {
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

// Services mapping - would come from backend in real app
const servicesDurations: Record<string, number> = {
  "1": 30, // Corte de Cabelo - 30 min
  "2": 60, // Limpeza de Pele - 60 min
  "3": 50, // Massagem - 50 min
  "4": 20, // Barba - 20 min
};

// Generate time slots
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
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(undefined);
  
  const timeSlots = generateTimeSlots();
  
  // Generate weekdays from the current day
  const startOfCurrentWeek = date ? startOfWeek(date, { weekStartsOn: 0 }) : startOfWeek(new Date(), { weekStartsOn: 0 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i));

  const handleNewAppointment = (initialDate?: Date) => {
    setAppointmentDate(initialDate || date);
    setIsAppointmentDialogOpen(true);
  };
  
  const handleCloseAppointmentDialog = () => {
    setIsAppointmentDialogOpen(false);
    setAppointmentDate(undefined);
  };
  
  const handleSaveAppointment = (data: AppointmentFormValues) => {
    // Parse time string to hours and minutes
    const [hours, minutes] = data.time.split(':').map(Number);
    
    // Set the hours and minutes to the selected date
    const startTime = setMinutes(setHours(data.date, hours), minutes);
    
    // Calculate end time based on service duration
    const duration = servicesDurations[data.service] || 30; // Default to 30 minutes
    const endTime = addMinutes(startTime, duration);
    
    // Create new appointment
    const newAppointment: Appointment = {
      id: (appointments.length + 1).toString(),
      clientName: data.clientName,
      serviceName: data.service, // This should be the service name, not ID
      professionalId: data.professionalId,
      startTime,
      endTime,
      status: "confirmed",
    };
    
    // Add to appointments array
    appointments = [...appointments, newAppointment];
    
    // Show success toast
    toast.success("Agendamento criado com sucesso!", {
      description: `${data.clientName} - ${format(startTime, 'dd/MM/yyyy HH:mm')}`,
    });
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
    isAppointmentDialogOpen,
    handleCloseAppointmentDialog,
    handleSaveAppointment,
    appointmentDate,
  };
};
