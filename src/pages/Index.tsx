
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MessageSquare, Users, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const recentActivitiesData = [
  { name: "Agendamento", message: "João agendou corte de cabelo para 14:30", time: "Há 5 min" },
  { name: "Chat", message: "Nova mensagem de Maria Silva", time: "Há 10 min" },
  { name: "Serviço", message: "Serviço 'Limpeza Facial' foi atualizado", time: "Há 30 min" },
  { name: "Agendamento", message: "Carlos cancelou agendamento", time: "Há 1 hora" },
];

const chartData = [
  { name: "Seg", agendamentos: 4 },
  { name: "Ter", agendamentos: 7 },
  { name: "Qua", agendamentos: 5 },
  { name: "Qui", agendamentos: 8 },
  { name: "Sex", agendamentos: 12 },
  { name: "Sáb", agendamentos: 9 },
  { name: "Dom", agendamentos: 3 },
];

// Dados para as métricas
const appointmentsByPeriod = [
  { name: "Jan", Agendamentos: 65 },
  { name: "Fev", Agendamentos: 80 },
  { name: "Mar", Agendamentos: 70 },
  { name: "Abr", Agendamentos: 85 },
  { name: "Mai", Agendamentos: 105 }
];

const appointmentsByService = [
  { name: "Corte de Cabelo", value: 45 },
  { name: "Barba", value: 30 },
  { name: "Limpeza de Pele", value: 15 },
  { name: "Massagem", value: 20 },
  { name: "Manicure", value: 10 }
];

const appointmentsByProfessional = [
  { name: "Dr. Carlos Silva", Agendamentos: 48 },
  { name: "Dra. Ana Souza", Agendamentos: 32 },
  { name: "Dr. Roberto Martins", Agendamentos: 25 }
];

const weeklyAppointments = [
  { name: "Seg", Atual: 12, Semana_Anterior: 10 },
  { name: "Ter", Atual: 15, Semana_Anterior: 12 },
  { name: "Qua", Atual: 8, Semana_Anterior: 9 },
  { name: "Qui", Atual: 14, Semana_Anterior: 11 },
  { name: "Sex", Atual: 20, Semana_Anterior: 16 },
  { name: "Sáb", Atual: 18, Semana_Anterior: 15 },
  { name: "Dom", Atual: 5, Semana_Anterior: 4 }
];

const COLORS = ["#1a73e8", "#34a853", "#fbbc04", "#ea4335", "#9c27b0"];

const Index = () => {
  const [period, setPeriod] = useState("month");
  const [metricsTab, setMetricsTab] = useState("overview");

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <p className="text-sm mr-2 hidden sm:block">Período:</p>
          <Select defaultValue={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Selecione um período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Última Semana</SelectItem>
              <SelectItem value="month">Último Mês</SelectItem>
              <SelectItem value="quarter">Último Trimestre</SelectItem>
              <SelectItem value="year">Último Ano</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agendamentos Hoje</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 comparado a ontem</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chats Ativos</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 não respondidos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">+5 novos hoje</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <p className="text-xs text-success">+10% vs período anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Resumo Semanal */}
      <div className="grid gap-6 md:grid-cols-6">
        <Card className="col-span-6 md:col-span-4">
          <CardHeader>
            <CardTitle>Agendamentos da Semana</CardTitle>
            <CardDescription>
              Visão geral de agendamentos dos últimos 7 dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="agendamentos" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-6 md:col-span-2">
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivitiesData.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="rounded-full p-1.5 bg-secondary">
                    {activity.name === "Agendamento" && <Calendar size={14} />}
                    {activity.name === "Chat" && <MessageSquare size={14} />}
                    {activity.name === "Serviço" && <FileText size={14} />}
                  </div>
                  <div>
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Métricas detalhadas */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight mt-8">Métricas</h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total de Agendamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92</div>
              <p className="text-xs text-success">+15% vs período anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 85,50</div>
              <p className="text-xs text-success">+5% vs período anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Cancelamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8%</div>
              <p className="text-xs text-destructive">+2% vs período anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Serviços por Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.7</div>
              <p className="text-xs text-success">+0.2 vs período anterior</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={metricsTab} onValueChange={setMetricsTab} className="w-full">
          <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:grid-cols-4 mb-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="services">Por Serviço</TabsTrigger>
            <TabsTrigger value="professionals">Por Profissional</TabsTrigger>
            <TabsTrigger value="comparison">Comparativo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Agendamentos por Período</CardTitle>
                <CardDescription>
                  Total de agendamentos mensais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={appointmentsByPeriod}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Agendamentos" fill="#1a73e8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="services">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Agendamentos por Tipo de Serviço</CardTitle>
                  <CardDescription>
                    Distribuição de serviços mais agendados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={appointmentsByService}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {appointmentsByService.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Receita por Serviço</CardTitle>
                  <CardDescription>
                    Serviços que geram mais faturamento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: "Corte de Cabelo", receita: 2250 },
                          { name: "Barba", receita: 1050 },
                          { name: "Limpeza de Pele", receita: 1800 },
                          { name: "Massagem", receita: 2000 },
                          { name: "Manicure", receita: 450 }
                        ]}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip formatter={(value) => [`R$ ${value}`, 'Receita']} />
                        <Legend />
                        <Bar dataKey="receita" fill="#34a853" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="professionals">
            <Card>
              <CardHeader>
                <CardTitle>Agendamentos por Profissional</CardTitle>
                <CardDescription>
                  Quantidade de atendimentos por profissional
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={appointmentsByProfessional}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Agendamentos" fill="#9c27b0" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="comparison">
            <Card>
              <CardHeader>
                <CardTitle>Comparativo Semanal</CardTitle>
                <CardDescription>
                  Comparação com a semana anterior
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyAppointments}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="Atual" 
                        stroke="#1a73e8" 
                        activeDot={{ r: 8 }} 
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="Semana_Anterior" 
                        stroke="#9e9e9e" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
