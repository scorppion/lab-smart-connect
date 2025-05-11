
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AgendaViewSelectorProps {
  defaultValue: string;
  className?: string;
  onChangeView?: (view: string) => void;
}

export const AgendaViewSelector = ({ 
  defaultValue,
  className,
  onChangeView
}: AgendaViewSelectorProps) => {
  return (
    <Tabs 
      defaultValue={defaultValue} 
      className={className}
      onValueChange={onChangeView}
    >
      <TabsList className="w-full sm:w-auto grid grid-cols-2">
        <TabsTrigger value="day">Dia</TabsTrigger>
        <TabsTrigger value="week">Semana</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
