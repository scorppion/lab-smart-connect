
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Plus, Search, User, Calendar, MessageSquare } from "lucide-react";

// Dados de exemplo
const initialClients = [
  { 
    id: 1, 
    name: "Maria Silva", 
    phone: "+5511987654321", 
    email: "maria.silva@email.com", 
    appointments: [
      { id: 101, service: "Corte de Cabelo", date: "10/05/2025 10:00", professional: "Dr. Carlos Silva", status: "Concluído" },
    ],
    chats: [
      { id: 201, date: "10/05/2025", snippet: "Olá, tudo bem? Gostaria de agendar um..." }
    ]
  },
  { 
    id: 2, 
    name: "João Oliveira", 
    phone: "+5511976543210", 
    email: "joao.oliveira@email.com", 
    appointments: [
      { id: 102, service: "Barba", date: "12/05/2025 14:30", professional: "Dr. Carlos Silva", status: "Agendado" },
      { id: 103, service: "Corte de Cabelo", date: "01/05/2025 11:00", professional: "Dr. Carlos Silva", status: "Concluído" },
    ],
    chats: [
      { id: 202, date: "12/05/2025", snippet: "Quero marcar um horário para barba..." }
    ]
  },
  { 
    id: 3, 
    name: "Ana Costa", 
    phone: "+5511965432109", 
    email: "ana.costa@email.com", 
    appointments: [
      { id: 104, service: "Limpeza de Pele", date: "15/05/2025 15:00", professional: "Dra. Ana Souza", status: "Agendado" },
    ],
    chats: [
      { id: 203, date: "09/05/2025", snippet: "Qual o valor do serviço de limpeza..." }
    ]
  },
  { 
    id: 4, 
    name: "Carlos Santos", 
    phone: "+5511954321098", 
    email: "carlos.santos@email.com", 
    appointments: [
      { id: 105, service: "Massagem", date: "08/05/2025 16:00", professional: "Dr. Roberto Martins", status: "Concluído" },
    ],
    chats: [
      { id: 204, date: "08/05/2025", snippet: "Obrigado pelo atendimento, foi exc..." }
    ]
  },
  { 
    id: 5, 
    name: "Fernanda Lima", 
    phone: "+5511943210987", 
    email: "fernanda.lima@email.com", 
    appointments: [
      { id: 106, service: "Manicure", date: "11/05/2025 09:00", professional: "Dra. Ana Souza", status: "Cancelado" },
    ],
    chats: [
      { id: 205, date: "10/05/2025", snippet: "Preciso cancelar meu horário de..." }
    ]
  },
];

interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  appointments: {
    id: number;
    service: string;
    date: string;
    professional: string;
    status: string;
  }[];
  chats: {
    id: number;
    date: string;
    snippet: string;
  }[];
}

const Clients = () => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isClientDetailsOpen, setIsClientDetailsOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    phone: "",
    email: "",
  });

  // Filtrar clientes pelo termo de busca
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = () => {
    if (!newClient.name || !newClient.phone) return;

    const newId = clients.length > 0 ? Math.max(...clients.map(client => client.id)) + 1 : 1;
    
    const client: Client = {
      id: newId,
      name: newClient.name,
      phone: newClient.phone,
      email: newClient.email,
      appointments: [],
      chats: []
    };
    
    setClients([...clients, client]);
    setNewClient({ name: "", phone: "", email: "" });
    setIsAddDialogOpen(false);
  };

  const openClientDetails = (client: Client) => {
    setSelectedClient(client);
    setIsClientDetailsOpen(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Clientes</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Novo Cliente
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Lista de Clientes</CardTitle>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar clientes..."
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
                <TableHead>Telefone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Agendamentos</TableHead>
                <TableHead>Último Contato</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id} className="cursor-pointer" onClick={() => openClientDetails(client)}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.appointments.length}</TableCell>
                  <TableCell>
                    {client.chats.length > 0 
                      ? client.chats[client.chats.length - 1].date 
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredClients.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    Nenhum cliente encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog para adicionar cliente */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Novo Cliente</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={newClient.name}
                onChange={(e) => setNewClient({...newClient, name: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={newClient.phone}
                onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={newClient.email}
                onChange={(e) => setNewClient({...newClient, email: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleAddClient}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para detalhes do cliente */}
      <Dialog open={isClientDetailsOpen} onOpenChange={setIsClientDetailsOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedClient && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User size={24} />
                  </div>
                  <DialogTitle>
                    {selectedClient.name}
                  </DialogTitle>
                </div>
                <div className="flex items-center gap-6 mt-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Telefone:</p>
                    <p>{selectedClient.phone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email:</p>
                    <p>{selectedClient.email}</p>
                  </div>
                </div>
              </DialogHeader>
              
              <Tabs defaultValue="appointments">
                <TabsList className="w-full">
                  <TabsTrigger value="appointments" className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" /> 
                    Agendamentos
                  </TabsTrigger>
                  <TabsTrigger value="chats" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-2" /> 
                    Conversas
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="appointments" className="max-h-[400px] overflow-y-auto">
                  {selectedClient.appointments.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Serviço</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Profissional</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedClient.appointments.map((appointment) => (
                          <TableRow key={appointment.id}>
                            <TableCell>{appointment.service}</TableCell>
                            <TableCell>{appointment.date}</TableCell>
                            <TableCell>{appointment.professional}</TableCell>
                            <TableCell>
                              <span
                                className={cn(
                                  "px-2 py-1 rounded-full text-xs",
                                  appointment.status === "Agendado" && "bg-primary/10 text-primary",
                                  appointment.status === "Concluído" && "bg-success/10 text-success",
                                  appointment.status === "Cancelado" && "bg-destructive/10 text-destructive"
                                )}
                              >
                                {appointment.status}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-10 text-muted-foreground">
                      Nenhum agendamento encontrado
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="chats" className="max-h-[400px] overflow-y-auto">
                  {selectedClient.chats.length > 0 ? (
                    <div className="space-y-3">
                      {selectedClient.chats.map((chat) => (
                        <Card key={chat.id} className="cursor-pointer hover:bg-accent/50">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-1">
                              <p className="font-medium">{selectedClient.name}</p>
                              <p className="text-xs text-muted-foreground">{chat.date}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">{chat.snippet}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 text-muted-foreground">
                      Nenhuma conversa encontrada
                    </div>
                  )}
                </TabsContent>
              </Tabs>
              
              <DialogFooter>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsClientDetailsOpen(false)}>
                    Fechar
                  </Button>
                  <Button>
                    <MessageSquare className="mr-2 h-4 w-4" /> Enviar Mensagem
                  </Button>
                  <Button>
                    <Calendar className="mr-2 h-4 w-4" /> Agendar
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Clients;
