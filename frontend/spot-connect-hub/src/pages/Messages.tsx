import { AppLayout } from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, MoreVertical, Phone, Video, ArrowLeft, Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const mockConversations = [
  {
    id: "1",
    name: "Flamengo FC",
    avatar: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=100&h=100&fit=crop",
    lastMessage: "Parabéns! Você foi selecionado para a próxima fase.",
    time: "2m",
    unread: 2,
    isOnline: true,
    isVerified: true,
  },
  {
    id: "2",
    name: "Coach Roberto",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    lastMessage: "Ótimo treino hoje! Continue assim.",
    time: "1h",
    unread: 0,
    isOnline: true,
    isVerified: false,
  },
  {
    id: "3",
    name: "Olheiro São Paulo",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    lastMessage: "Podemos marcar uma avaliação?",
    time: "3h",
    unread: 1,
    isOnline: false,
    isVerified: true,
  },
  {
    id: "4",
    name: "Ana Santos",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    lastMessage: "Vi seu perfil, muito bom! 👏",
    time: "1d",
    unread: 0,
    isOnline: false,
    isVerified: false,
  },
];

const mockMessages = [
  {
    id: "1",
    sender: "other",
    message: "Olá! Vi seu perfil na SportLink e fiquei impressionado com seu desempenho.",
    time: "10:30",
  },
  {
    id: "2",
    sender: "other",
    message: "Gostaríamos de te convidar para uma avaliação no nosso CT.",
    time: "10:31",
  },
  {
    id: "3",
    sender: "me",
    message: "Muito obrigado pelo contato! Fico muito feliz com o interesse.",
    time: "10:45",
  },
  {
    id: "4",
    sender: "me",
    message: "Quando seria a avaliação? Estou disponível na próxima semana.",
    time: "10:46",
  },
  {
    id: "5",
    sender: "other",
    message: "Parabéns! Você foi selecionado para a próxima fase.",
    time: "14:20",
  },
];

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const selectedConversation = mockConversations.find((c) => c.id === selectedChat);

  const filteredConversations = mockConversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-3.5rem)] md:h-screen animate-fade-in">
        {/* Conversations List */}
        <div
          className={cn(
            "w-full border-r border-border bg-card md:w-80 lg:w-96",
            selectedChat && "hidden md:block"
          )}
        >
          {/* Header */}
          <div className="border-b border-border p-4">
            <h1 className="text-xl font-bold mb-4">Mensagens</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar conversas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 rounded-xl"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="overflow-y-auto h-[calc(100%-120px)]">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedChat(conversation.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-4 transition-colors hover:bg-muted",
                  selectedChat === conversation.id && "bg-muted"
                )}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={conversation.avatar} alt={conversation.name} />
                    <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                  </Avatar>
                  {conversation.isOnline && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success ring-2 ring-card" />
                  )}
                </div>

                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold truncate">{conversation.name}</span>
                    {conversation.isVerified && (
                      <Star className="h-4 w-4 text-premium shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.lastMessage}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-muted-foreground">{conversation.time}</span>
                  {conversation.unread > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full gradient-primary text-xs font-medium text-primary-foreground">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div
          className={cn(
            "flex-1 flex flex-col bg-background",
            !selectedChat && "hidden md:flex"
          )}
        >
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center gap-4 border-b border-border p-4">
                <button
                  onClick={() => setSelectedChat(null)}
                  className="md:hidden p-2 -ml-2 hover:bg-muted rounded-lg"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>

                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={selectedConversation.avatar}
                    alt={selectedConversation.name}
                  />
                  <AvatarFallback>{selectedConversation.name[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold">{selectedConversation.name}</h2>
                    {selectedConversation.isVerified && (
                      <Star className="h-4 w-4 text-premium" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {selectedConversation.isOnline ? "Online" : "Offline"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {mockMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex",
                      msg.sender === "me" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[75%] rounded-2xl px-4 py-2",
                        msg.sender === "me"
                          ? "gradient-primary text-primary-foreground rounded-br-md"
                          : "bg-muted rounded-bl-md"
                      )}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p
                        className={cn(
                          "text-[10px] mt-1",
                          msg.sender === "me"
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        )}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="border-t border-border p-4">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="flex-1 h-12 rounded-xl"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && messageInput.trim()) {
                        setMessageInput("");
                      }
                    }}
                  />
                  <Button variant="gradient" size="icon" className="h-12 w-12">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div>
                <div className="h-24 w-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Send className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Suas mensagens</h2>
                <p className="text-muted-foreground">
                  Selecione uma conversa para começar
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Messages;
