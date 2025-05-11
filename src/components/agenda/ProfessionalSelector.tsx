
import React from "react";
import { User } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Professional {
  id: number;
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
  if (isCardView) {
    return (
      <Card className={className}>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Profissionais</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {professionals.map((professional) => (
            <div
              key={professional.id}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer",
                selectedProfessional === professional.id.toString()
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-secondary"
              )}
              onClick={() => setSelectedProfessional(professional.id.toString())}
            >
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User size={16} className="text-primary" />
              </div>
              <div>
                <p className="font-medium">{professional.name}</p>
                <p className="text-xs text-muted-foreground">{professional.specialty}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn("w-full sm:w-[180px]", className)}>
      <Select value={selectedProfessional} onValueChange={setSelectedProfessional}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione um profissional" />
        </SelectTrigger>
        <SelectContent>
          {professionals.map((professional) => (
            <SelectItem key={professional.id} value={professional.id.toString()}>
              {professional.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
