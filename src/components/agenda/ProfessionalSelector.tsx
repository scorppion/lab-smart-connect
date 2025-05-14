
import React from "react";
import { User, Users } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Updated to accept string or number IDs
export interface Professional {
  id: string | number;
  name: string;
  specialty: string;
}

interface ProfessionalSelectorProps {
  professionals: Professional[];
  selectedProfessional: string;
  setSelectedProfessional: (value: string) => void;
  isCardView?: boolean;
  className?: string;
}

export const ProfessionalSelector = ({
  professionals,
  selectedProfessional,
  setSelectedProfessional,
  isCardView = false,
  className,
}: ProfessionalSelectorProps) => {
  // Filter out duplicate "Todos os profissionais" entries
  const filteredProfessionals = professionals.filter(
    (professional, index, self) =>
      index === self.findIndex((p) => p.id === professional.id)
  );

  if (isCardView) {
    return (
      <Card className={cn("min-w-[280px]", className)}>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Profissionais</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-2 max-h-[260px] overflow-y-auto">
          <div
            key="all"
            className={cn(
              "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm cursor-pointer",
              selectedProfessional === "all"
                ? "bg-primary/10 text-primary font-medium"
                : "hover:bg-secondary"
            )}
            onClick={() => setSelectedProfessional("all")}
          >
            <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Users size={14} className="text-primary" />
            </div>
            <div>
              <p className="font-medium text-xs leading-tight">Todos os profissionais</p>
              <p className="text-xs text-muted-foreground">Ver todos</p>
            </div>
          </div>
          
          {filteredProfessionals
            .filter(professional => professional.id !== "all")
            .map((professional) => (
              <div
                key={professional.id}
                className={cn(
                  "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm cursor-pointer",
                  selectedProfessional === professional.id.toString()
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-secondary"
                )}
                onClick={() => setSelectedProfessional(professional.id.toString())}
              >
                <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User size={14} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-xs leading-tight">{professional.name}</p>
                  <p className="text-xs text-muted-foreground">{professional.specialty}</p>
                </div>
              </div>
            )
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={className}>
      <Select value={selectedProfessional} onValueChange={setSelectedProfessional}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione um profissional" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os profissionais</SelectItem>
          {filteredProfessionals
            .filter(professional => professional.id !== "all")
            .map((professional) => (
              <SelectItem key={professional.id} value={professional.id.toString()}>
                {professional.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
};
