import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

// Dados de exemplo
const initialServices = [
  { id: 1, name: "Corte de Cabelo", description: "Corte tradicional", duration: 30, price: 50 },
  { id: 2, name: "Barba", description: "Barba completa com toalha quente", duration: 20, price: 35 },
  { id: 3, name: "Limpeza de Pele", description: "Limpeza facial profunda", duration: 60, price: 120 },
  { id: 4, name: "Massagem", description: "Massagem relaxante", duration: 50, price: 100 },
  { id: 5, name: "Manicure", description: "Corte e pintura das unhas", duration: 40, price: 45 },
];

interface Service {
  id: number;
  name: string;
  description: string;
  duration: number;
  price: number;
}

// Mock API (simulação)
const servicesApi = {
  create: async (service: Omit<Service, 'id'>) => {
    // Simula um atraso na API
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...service, id: Math.random() }; // Simula um ID gerado pelo servidor
  },
  update: async (id: number, service: Service) => {
    // Simula um atraso na API
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...service, id };
  },
  delete: async (id: number) => {
    // Simula um atraso na API
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  }
};

const Services = () => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);

  // Filtrar serviços pelo termo de busca
  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

    const loadServices = async () => {
        // Aqui você faria uma chamada à API para obter os serviços
        // e atualizar o estado `services`
        // Exemplo:
        // const data = await api.getServices();
        // setServices(data);
    };

  const handleAddOrEditService = async () => {
    try {
      if (!currentService) return;

      if (currentService.id) {
        //await servicesApi.update(currentService.id, currentService);
        setServices(services.map(service => 
          service.id === currentService.id ? currentService : service
        ));
        toast("Serviço atualizado", {
          description: "O serviço foi atualizado com sucesso!"
        });
      } else {
        //await servicesApi.create(currentService);
          const newId = services.length > 0 
            ? Math.max(...services.map(service => service.id)) + 1 
            : 1;
          setServices([...services, { ...currentService, id: newId }]);
        toast("Serviço criado", {
          description: "O serviço foi criado com sucesso!"
        });
      }

      //await loadServices();
      setIsDialogOpen(false);
      setCurrentService(null);
    } catch (error) {
      toast("Erro ao salvar", {
        description: "Verifique os dados e tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteService = async (id: number) => {
    try {
      //await servicesApi.delete(id);
      setServices(services.filter(service => service.id !== id));
      toast("Serviço excluído", {
        description: "O serviço foi excluído com sucesso!"
      });
      //await loadServices();
    } catch (error) {
      toast("Erro ao excluir", {
        description: "Não foi possível excluir o serviço.",
        variant: "destructive"
      });
    }
  };

  const openAddDialog = () => {
    setCurrentService({ id: 0, name: "", description: "", duration: 30, price: 0 });
    setIsDialogOpen(true);
  };

  const openEditDialog = (service: Service) => {
    setCurrentService({ ...service });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Serviços</h1>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 h-4 w-4" /> Novo Serviço
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Lista de Serviços</CardTitle>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar serviços..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Duração (min)</TableHead>
                <TableHead>Preço (R$)</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>{service.description}</TableCell>
                  <TableCell>{service.duration}</TableCell>
                  <TableCell>{service.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(service)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteService(service.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredServices.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    Nenhum serviço encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{currentService?.id ? "Editar Serviço" : "Novo Serviço"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={currentService?.name || ""}
                onChange={(e) => 
                  setCurrentService(prev => prev ? { ...prev, name: e.target.value } : null)
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={currentService?.description || ""}
                onChange={(e) => 
                  setCurrentService(prev => prev ? { ...prev, description: e.target.value } : null)
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="duration">Duração (min)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={currentService?.duration || 0}
                  onChange={(e) => 
                    setCurrentService(prev => prev ? { ...prev, duration: Number(e.target.value) } : null)
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Preço (R$)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={currentService?.price || 0}
                  onChange={(e) => 
                    setCurrentService(prev => prev ? { ...prev, price: Number(e.target.value) } : null)
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleAddOrEditService}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Services;