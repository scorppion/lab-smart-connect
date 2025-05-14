
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
      <Card className={cn("min-w-[280px]", className)}>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Calendário</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="w-full pointer-events-auto"
            classNames={{
              months: "flex flex-col space-y-4",
              month: "space-y-2 w-full",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              table: "w-full border-collapse space-y-1",
              head_row: "flex w-full justify-between",
              head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.7rem] text-center",
              row: "flex w-full mt-1 justify-between",
              cell: "h-7 w-9 text-center text-xs p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-7 w-7 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
              day_outside: "text-muted-foreground opacity-50",
              day_disabled: "text-muted-foreground opacity-50",
              day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
              day_hidden: "invisible",
            }}
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
          <Calendar 
            mode="single" 
            selected={date} 
            onSelect={setDate} 
            initialFocus 
            className="pointer-events-auto" 
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

// Fix - import the cn utility
import { cn } from "@/lib/utils";

