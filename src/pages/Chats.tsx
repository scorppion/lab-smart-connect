import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, Send, Paperclip, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useUser } from "@clerk/nextjs";
import io from 'socket.io-client';

// Dados de exemplo
const initialContacts = [
  { id: 1, name: "Maria Silva", phone: "+5511987654321", lastMessage: "Ok, até logo!", time: "10:30", unread: 0, online: true },
  { id: 2, name: "João Oliveira", phone: "+5511976543210", lastMessage: "Quero marcar um horário", time: "09:15", unread: 3, online: false },
  { id: 3, name: "Ana Costa", phone: "+5511965432109", lastMessage: "Qual o valor do serviço?", time: "Ontem", unread: 1, online: false },
  { id: 4, name: "Carlos Santos", phone: "+5511954321098", lastMessage: "Obrigado pelo atendimento", time: "Ontem", unread: 0, online: true },
  { id: 5, name: "Fernanda Lima", phone: "+5511943210987", lastMessage: "Preciso cancelar meu horário", time: "10/05", unread: 0, online: false },
];

const initialMessages = [
  { id: 1, contactId: 1, text: "Olá, tudo bem?", incoming: true, time: "10:00" },
  { id: 2, contactId: 1, text: "Sim, estou bem! E você?", incoming: false, time: "10:05" },
  { id: 3, contactId: 1, text: "Também estou bem. Gostaria de agendar um horário para corte de cabelo.", incoming: true, time: "10:10" },
  { id: 4, contactId: 1, text: "Claro! Temos horário disponível amanhã às 14h. Serve para você?", incoming: false, time: "10:15" },
  { id: 5, contactId: 1, text: "Perfeito! Vou confirmar então.", incoming: true, time: "10:20" },
  { id: 6, contactId: 1, text: "Ótimo! Seu agendamento foi confirmado para amanhã às 14h.", incoming: false, time: "10:25" },
  { id: 7, contactId: 1, text: "Ok, até logo!", incoming: true, time: "10:30" },
];

interface Contact {
  id: number;
  name: string;
  phone: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: number;
  contactId: number;
  text: string;
  incoming: boolean;
  time: string;
}

const Chats = () => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selectedContactId, setSelectedContactId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const { user } = useUser();

  // Removed WebSocket implementation

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

  const selectedContact = contacts.find(contact => contact.id === selectedContactId);

  const contactMessages = messages.filter(
    message => message.contactId === selectedContactId
  );

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !selectedContactId || !user?.id) return;

    const messageData = {
      content: newMessage,
      senderId: user.id,
      receiverId: String(selectedContactId)
    };

    socket.emit('message', messageData);

    setNewMessage("");
  };

  const selectContact = (contactId: number) => {
    setSelectedContactId(contactId);

    // Marcar mensagens como lidas
    setContacts(contacts.map(contact => {
      if (contact.id === contactId) {
        return {
          ...contact,
          unread: 0
        };
      }
      return contact;
    }));
  };

  return (
    <div className="h-[calc(100vh-8rem)] animate-fadeIn">
      <div className="flex h-full rounded-lg overflow-hidden border">
        {/* Lista de contatos */}
        <div className="w-full md:w-80 border-r flex flex-col">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar contato..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={cn(
                    "flex items-center gap-3 p-3 cursor-pointer hover:bg-accent",
                    selectedContactId === contact.id && "bg-accent"
                  )}
                  onClick={() => selectContact(contact.id)}
                >
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      {contact.name.split(" ").map(part => part[0]).join("").slice(0, 2)}
                    </div>
                    {contact.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 bg-success rounded-full border-2 border-background"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <p className="font-medium truncate">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">{contact.time}</p>
                    </div>
                    <div className="flex justify-between items-baseline mt-1">
                      <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                      {contact.unread > 0 && (
                        <div className="ml-1.5 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-[10px] text-primary-foreground font-medium">
                          {contact.unread}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Nenhum contato encontrado</p>
              </div>
            )}
          </div>
        </div>

        {/* Área de conversa */}
        <div className="hidden md:flex flex-1 flex-col">
          {selectedContact ? (
            <>
              <div className="p-3 border-b flex items-center gap-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    {selectedContact.name.split(" ").map(part => part[0]).join("").slice(0, 2)}
                  </div>
                  {selectedContact.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-success rounded-full border-2 border-background"></div>
                  )}
                </div>
                <div>
                  <p className="font-medium">{selectedContact.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedContact.phone}</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {contactMessages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "chat-bubble",
                      message.incoming ? "chat-bubble-incoming" : "chat-bubble-outgoing"
                    )}
                  >
                    <p>{message.text}</p>
                    <p className="text-xs opacity-70 text-right mt-1">{message.time}</p>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <div className="flex-1">
                    <Input
                      placeholder="Digite uma mensagem..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  <Button size="icon" onClick={handleSendMessage}>
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-xl font-medium mb-2">Smart Bot Chat</p>
              <p className="text-muted-foreground text-center max-w-md">
                Selecione um contato para iniciar uma conversa ou responder mensagens.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chats;