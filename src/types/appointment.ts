
export interface Appointment {
  id: string | number;
  clientName: string;
  serviceName: string;
  professionalId: string | number;
  startTime: Date;
  endTime: Date;
  status?: "confirmed" | "pending" | "cancelled";
}
