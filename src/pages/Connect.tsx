
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, QrCode, Plus, Smartphone, RefreshCw, X } from "lucide-react";

// Dados de exemplo
const connectedNumbers = [
  { id: 1, number: "+5511999999999", name: "Smart Bot Principal", status: "Conectado", lastSync: "Há 5 minutos" },
  { id: 2, number: "+5511888888888", name: "Smart Bot Suporte", status: "Conectado", lastSync: "Há 15 minutos" },
];

const Connect = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [newConnectionName, setNewConnectionName] = useState("");
  
  const handleScan = () => {
    setIsScanning(true);
    
    // Simulação de processamento
    setTimeout(() => {
      setIsScanning(false);
    }, 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Conectar WhatsApp</h1>
      </div>
      
      <Tabs defaultValue="new" className="w-full">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="new">Nova Conexão</TabsTrigger>
          <TabsTrigger value="existing">Conexões Existentes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="new">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Conectar Novo Número</CardTitle>
                <CardDescription>
                  Conecte um novo número ao Smart Bot para receber e enviar mensagens
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Conexão</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Smart Bot Atendimento"
                    value={newConnectionName}
                    onChange={(e) => setNewConnectionName(e.target.value)}
                  />
                </div>
                
                <div className="text-center pt-6 pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <QrCode size={32} className="text-primary" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Use o WhatsApp no seu celular para escanear o QR Code
                  </p>
                  
                  <Button
                    onClick={handleScan} 
                    disabled={isScanning || !newConnectionName}
                    className="w-full"
                  >
                    {isScanning ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Gerando QR Code...
                      </>
                    ) : (
                      <>
                        <QrCode className="mr-2 h-4 w-4" /> Gerar QR Code
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                  Recomendamos usar um número exclusivo para o Smart Bot para melhor desempenho e disponibilidade.
                </p>
              </CardFooter>
            </Card>

            {isScanning && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>QR Code</CardTitle>
                  <CardDescription>
                    Escaneie este QR Code com o WhatsApp no seu celular
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-6">
                  <div className="h-64 w-64 border-2 border-dashed border-border flex items-center justify-center">
                    <QrCode size={180} />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <ol className="text-sm text-muted-foreground mb-4 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">1</span>
                      <span>Abra o WhatsApp no seu telefone</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">2</span>
                      <span>Toque em Menu ou Configurações e selecione WhatsApp Web</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">3</span>
                      <span>Aponte seu telefone para esta tela para capturar o QR code</span>
                    </li>
                  </ol>
                  <div className="w-full flex justify-between items-center">
                    <Button variant="outline" onClick={() => setIsScanning(false)}>
                      <X className="mr-2 h-4 w-4" /> Cancelar
                    </Button>
                    <Button onClick={() => setIsScanning(false)}>
                      <RefreshCw className="mr-2 h-4 w-4" /> Recarregar QR Code
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="existing">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {connectedNumbers.map((connection) => (
              <Card key={connection.id} className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center">
                      <Smartphone size={16} className="text-success" />
                    </div>
                    <span>{connection.name}</span>
                  </CardTitle>
                  <CardDescription>
                    {connection.number}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-success"></span>
                    <span className="text-sm">{connection.status}</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      Sincronizado: {connection.lastSync}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-center text-sm">
                    <div className="rounded-md bg-secondary p-2">
                      <p className="font-medium">128</p>
                      <p className="text-xs text-muted-foreground">Mensagens Hoje</p>
                    </div>
                    <div className="rounded-md bg-secondary p-2">
                      <p className="font-medium">15</p>
                      <p className="text-xs text-muted-foreground">Agendamentos</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2 w-full">
                    <Button variant="outline" className="flex-1">
                      <RefreshCw className="mr-2 h-4 w-4" /> Sincronizar
                    </Button>
                    <Button variant="secondary" className="flex-1">
                      Configurações
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}

            <Card className="mt-6 border-dashed">
              <CardContent className="flex flex-col items-center justify-center h-full min-h-[220px]">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Plus size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-1">Adicionar Conexão</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Conecte um novo número ao Smart Bot
                </p>
                <Button onClick={() => document.querySelector('[value="new"]')?.click()}>
                  Nova Conexão
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Connect;
