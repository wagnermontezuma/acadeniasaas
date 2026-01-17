
import React, { useState } from 'react';
import Layout from '../components/Layout.tsx';
import { UserRole } from '../types.ts';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
  time: string;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  role: string;
  category: 'Coordenação' | 'Pais' | 'Alunos' | 'Colegas';
  messages: Message[];
}

const professorConversations: Conversation[] = [
  {
    id: '1',
    name: 'Coordenação Pedagógica',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    lastMessage: 'Ricardo, os lançamentos do 2º bimestre foram aprovados.',
    time: '10:45',
    unread: 1,
    online: true,
    role: 'Coordenadora',
    category: 'Coordenação',
    messages: [
      { id: 'm1', text: 'Bom dia, gostaria de saber o status da revisão das notas da Turma 9º A.', sender: 'me', time: '09:15' },
      { id: 'm2', text: 'Estamos finalizando a verificação dos diários.', sender: 'them', time: '09:30' },
      { id: 'm3', text: 'Ricardo, os lançamentos do 2º bimestre foram aprovados.', sender: 'them', time: '10:45' },
    ]
  },
  {
    id: '2',
    name: 'Sr. Marcos (Pai de Alexandre)',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    lastMessage: 'Agradeço o feedback sobre o desempenho dele.',
    time: 'Ontem',
    unread: 0,
    online: false,
    role: 'Responsável',
    category: 'Pais',
    messages: [
      { id: 'm4', text: 'Gostaria de falar sobre o progresso do Alexandre em Algoritmos.', sender: 'them', time: '16:00' },
      { id: 'm5', text: 'Ele tem mostrado uma melhora significativa nas últimas semanas.', sender: 'me', time: '16:20' },
      { id: 'm6', text: 'Agradeço o feedback sobre o desempenho dele.', sender: 'them', time: '16:30' },
    ]
  },
  {
    id: '3',
    name: 'Beatriz Helena Santos',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    lastMessage: 'Professor, o material da aula 5 não está no portal.',
    time: '08:20',
    unread: 3,
    online: true,
    role: 'Aluna (Turma 3º B)',
    category: 'Alunos',
    messages: [
      { id: 'm7', text: 'Professor, o material da aula 5 não está no portal.', sender: 'them', time: '08:20' },
    ]
  },
  {
    id: '4',
    name: 'Prof. Ana Clara',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    lastMessage: 'Podemos trocar o horário de laboratório amanhã?',
    time: '2 dias',
    unread: 0,
    online: true,
    role: 'Professora de Física',
    category: 'Colegas',
    messages: []
  },
];

const MessagesPage: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Conversation>(professorConversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [filter, setFilter] = useState<string>('Tudo');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // In a real app, logic to push to messages would go here
    setNewMessage('');
  };

  const categories = ['Tudo', 'Coordenação', 'Pais', 'Alunos', 'Colegas'];
  const filteredConversations = filter === 'Tudo' 
    ? professorConversations 
    : professorConversations.filter(c => c.category === filter);

  return (
    <Layout role={UserRole.PROFESSOR}>
      <div className="flex h-[calc(100vh-160px)] bg-white dark:bg-[#1a2b2b] rounded-3xl border border-[#dce5e5] dark:border-white/10 shadow-sm overflow-hidden">
        
        {/* Contacts Sidebar */}
        <aside className="w-85 border-r border-[#f0f4f4] dark:border-white/5 flex flex-col shrink-0">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-[#111718] dark:text-white">Mensagens</h2>
              <button className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-all">
                <span className="material-symbols-outlined text-[20px]">edit_square</span>
              </button>
            </div>
            
            <div className="relative mb-6">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#638788] text-[20px]">search</span>
              <input 
                type="text" 
                placeholder="Buscar contatos ou mensagens..." 
                className="w-full pl-10 pr-4 py-2.5 bg-[#f0f4f4] dark:bg-white/5 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-[#638788]"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                    filter === cat 
                      ? 'bg-primary text-white' 
                      : 'bg-[#f0f4f4] dark:bg-white/5 text-[#638788] hover:bg-[#e2e8e8]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-1 px-3 pb-6">
            {filteredConversations.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`w-full flex items-center gap-4 p-3.5 rounded-2xl transition-all text-left group ${
                  selectedChat.id === chat.id 
                    ? 'bg-primary/10 text-primary shadow-sm' 
                    : 'hover:bg-[#f0f4f4] dark:hover:bg-white/5 text-[#638788]'
                }`}
              >
                <div className="relative shrink-0">
                  <img src={chat.avatar} alt={chat.name} className="size-12 rounded-full object-cover border-2 border-transparent group-hover:border-primary/20" />
                  {chat.online && (
                    <div className="absolute bottom-0.5 right-0.5 size-3 bg-green-500 border-2 border-white dark:border-[#1a2b2b] rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <h4 className={`text-sm font-bold truncate ${selectedChat.id === chat.id ? 'text-primary' : 'text-[#111718] dark:text-white'}`}>
                      {chat.name}
                    </h4>
                    <span className="text-[10px] text-[#638788] font-bold">{chat.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs truncate font-medium opacity-80">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <span className="size-4.5 flex items-center justify-center bg-primary text-white text-[9px] font-black rounded-full shadow-lg shadow-primary/20">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Chat Window */}
        <main className="flex-1 flex flex-col bg-background-light/30 dark:bg-white/1 overflow-hidden">
          {/* Chat Header */}
          <header className="h-20 bg-white dark:bg-[#1a2b2b] border-b border-[#f0f4f4] dark:border-white/5 flex items-center justify-between px-8 shrink-0">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img src={selectedChat.avatar} alt={selectedChat.name} className="size-11 rounded-full object-cover border border-[#f0f4f4] dark:border-white/10" />
                {selectedChat.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 size-3.5 bg-green-500 border-2 border-white dark:border-[#1a2b2b] rounded-full"></div>
                )}
              </div>
              <div>
                <h3 className="text-base font-black text-[#111718] dark:text-white leading-none mb-1.5">{selectedChat.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{selectedChat.role}</span>
                  <span className="size-1 bg-[#638788]/30 rounded-full"></span>
                  <span className="text-[10px] font-bold text-[#638788] uppercase tracking-tighter">
                    {selectedChat.online ? 'Disponível' : 'Ausente'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="size-10 flex items-center justify-center rounded-xl bg-[#f0f4f4] dark:bg-white/5 text-[#638788] hover:text-primary transition-all">
                <span className="material-symbols-outlined text-[22px]">videocam</span>
              </button>
              <button className="size-10 flex items-center justify-center rounded-xl bg-[#f0f4f4] dark:bg-white/5 text-[#638788] hover:text-primary transition-all">
                <span className="material-symbols-outlined text-[22px]">call</span>
              </button>
              <div className="w-px h-6 bg-[#f0f4f4] dark:bg-white/10 mx-1"></div>
              <button className="size-10 flex items-center justify-center rounded-xl bg-[#f0f4f4] dark:bg-white/5 text-[#638788] hover:text-primary transition-all">
                <span className="material-symbols-outlined text-[22px]">more_horiz</span>
              </button>
            </div>
          </header>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            <div className="flex justify-center">
              <span className="px-3 py-1 bg-[#f0f4f4] dark:bg-white/5 rounded-full text-[10px] font-black text-[#638788] uppercase tracking-widest">
                Segunda-feira, 12 de Outubro
              </span>
            </div>
            
            {selectedChat.messages.length > 0 ? (
              selectedChat.messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[65%] flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                    <div className={`px-5 py-3.5 rounded-2xl text-sm font-semibold shadow-sm leading-relaxed ${
                      msg.sender === 'me' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-white dark:bg-[#253939] text-[#111718] dark:text-white rounded-tl-none border border-[#f0f4f4] dark:border-white/5'
                    }`}>
                      {msg.text}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1.5 px-1">
                      <p className="text-[10px] font-bold text-[#638788] uppercase">{msg.time}</p>
                      {msg.sender === 'me' && (
                        <span className="material-symbols-outlined text-primary text-[14px]">done_all</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 space-y-4">
                <div className="size-20 bg-primary/5 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-primary/40">forum</span>
                </div>
                <div>
                  <p className="text-lg font-black text-[#111718] dark:text-white">Inicie a conversa</p>
                  <p className="text-sm text-[#638788] font-medium">As mensagens enviadas aqui são registradas para fins de auditoria institucional.</p>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <footer className="p-8 bg-white dark:bg-[#1a2b2b] border-t border-[#f0f4f4] dark:border-white/5 shrink-0">
            <div className="flex items-center gap-4 max-w-5xl mx-auto">
              <button className="size-12 flex items-center justify-center rounded-2xl bg-[#f0f4f4] dark:bg-white/5 text-[#638788] hover:text-primary transition-all">
                <span className="material-symbols-outlined text-[24px]">attach_file</span>
              </button>
              <div className="relative flex-1">
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Escreva uma mensagem..." 
                  className="w-full pl-6 pr-14 py-4 bg-[#f0f4f4] dark:bg-white/5 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-[#638788]"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <button className="size-9 flex items-center justify-center text-[#638788] hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[22px]">mood</span>
                  </button>
                </div>
              </div>
              <button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="size-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25 hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:shadow-none"
              >
                <span className="material-symbols-outlined text-[24px]">send</span>
              </button>
            </div>
          </footer>
        </main>
      </div>
    </Layout>
  );
};

export default MessagesPage;
