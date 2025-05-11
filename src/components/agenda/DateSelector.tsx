
import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DateSelectorProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  isCardView?: boolean;
  className?: string;
}

export const DateSelector = ({ date, setDate, isCardView = false, className }: DateSelectorProps) => {
  if (isCardView) {
    return (
      <Card className={className}>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Calendário</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="w-full pointer-events-auto"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={className}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full sm:w-auto justify-start">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className="pointer-events-auto" />
        </PopoverContent>
      </Popover>
    </div>
  );
};
