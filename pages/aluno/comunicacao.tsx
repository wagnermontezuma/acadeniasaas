
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';
import { messageMocks, Thread, Message, Participant, CURRENT_STUDENT_ID } from '../../data/student/messages.ts';

const AlunoComunicacao: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'avisos';
  const threadIdParam = searchParams.get('thread');

  // Local state for demo purposes (persistent only in session)
  const [threads, setThreads] = useState<Thread[]>(messageMocks.threads);
  const [messages, setMessages] = useState<Message[]>(messageMocks.messages);
  const [newMessageBody, setNewMessageBody] = useState('');
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [searchThreadTerm, setSearchThreadTerm] = useState('');
  
  // New Chat Modal States
  const [selectedRecipientId, setSelectedRecipientId] = useState('');
  const [newChatBody, setNewChatBody] = useState('');

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Computed data
  const filteredThreads = useMemo(() => {
    return threads.filter(t => 
      t.participants.some(p => p.name.toLowerCase().includes(searchThreadTerm.toLowerCase())) ||
      t.preview.toLowerCase().includes(searchThreadTerm.toLowerCase())
    );
  }, [threads, searchThreadTerm]);

  const activeThread = useMemo(() => {
    const thread = threads.find(t => t.id === threadIdParam) || threads[0];
    return thread;
  }, [threads, threadIdParam]);

  const activeMessages = useMemo(() => {
    if (!activeThread) return [];
    return messages.filter(m => m.threadId === activeThread.id);
  }, [messages, activeThread]);

  // Effects
  useEffect(() => {
    if (activeTab === 'mensagens' && activeThread && activeThread.unreadCount > 0) {
      // Simulate reading messages
      setThreads(prev => prev.map(t => t.id === activeThread.id ? { ...t, unreadCount: 0 } : t));
    }
  }, [activeThread?.id, activeTab]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMessages]);

  const handleSendMessage = () => {
    if (!newMessageBody.trim() || !activeThread) return;

    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      threadId: activeThread.id,
      senderId: CURRENT_STUDENT_ID,
      body: newMessageBody,
      sentAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sent"
    };

    setMessages(prev => [...prev, newMsg]);
    setThreads(prev => prev.map(t => t.id === activeThread.id ? { 
      ...t, 
      preview: newMessageBody, 
      lastMessageAt: newMsg.sentAt 
    } : t));
    setNewMessageBody('');
  };

  const handleStartNewChat = () => {
    if (!selectedRecipientId || !newChatBody.trim()) return;

    const recipient = messageMocks.contacts.find(c => c.id === selectedRecipientId);
    if (!recipient) return;

    const newThreadId = `thr_new_${Date.now()}`;
    const newThread: Thread = {
      id: newThreadId,
      participants: [recipient],
      unreadCount: 0,
      preview: newChatBody,
      lastMessageAt: "Agora"
    };

    const firstMsg: Message = {
      id: `msg_${Date.now()}`,
      threadId: newThreadId,
      senderId: CURRENT_STUDENT_ID,
      body: newChatBody,
      sentAt: "Agora",
      status: "sent"
    };

    setThreads(prev => [newThread, ...prev]);
    setMessages(prev => [...prev, firstMsg]);
    setIsNewChatModalOpen(false);
    setSelectedRecipientId('');
    setNewChatBody('');
    setSearchParams({ tab: 'mensagens', thread: newThreadId });
  };

  const getRecipientLabel = (role: string) => {
    switch (role) {
      case "COORD": return "Coordenação";
      case "TEACHER": return "Professor(a)";
      case "SECRETARY": return "Secretaria";
      default: return "Academia";
    }
  };

  return (
    <Layout role={UserRole.STUDENT}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Comunicação Central</h1>
          <p className="text-slate-500 font-medium mt-1">Fique por dentro de todos os avisos e converse com a coordenação.</p>
        </div>
        {activeTab === 'mensagens' && (
          <button 
            onClick={() => setIsNewChatModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
          >
            <span className="material-symbols-outlined">add_comment</span>
            Nova Mensagem
          </button>
        )}
      </div>

      <div className="flex border-b border-slate-100 dark:border-white/5 mb-8 overflow-x-auto gap-10">
        <button
          onClick={() => setSearchParams({ tab: 'avisos' })}
          className={`flex items-center gap-2 pb-4 text-xs font-black uppercase tracking-widest transition-all border-b-2 ${
            activeTab === 'avisos' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <span className="material-symbols-outlined text-xl">campaign</span>
          Avisos Gerais
        </button>
        <button
          onClick={() => setSearchParams({ tab: 'mensagens' })}
          className={`flex items-center gap-2 pb-4 text-xs font-black uppercase tracking-widest transition-all border-b-2 ${
            activeTab === 'mensagens' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <span className="material-symbols-outlined text-xl">forum</span>
          Mensagens Diretas
        </button>
      </div>

      <div className="h-[600px]">
        {activeTab === 'avisos' ? (
           <div className="grid gap-6 animate-in fade-in duration-300">
             {[
                { id: '1', title: 'Rematrícula 2024 - Aberta', date: 'Hoje', importance: 'Alta', content: 'Prezado aluno, informamos que o período de rematrícula para o próximo semestre letivo já está aberto via portal.' },
                { id: '2', title: 'Manutenção no Sistema Financeiro', date: 'Ontem', importance: 'Média', content: 'A área financeira do portal passará por manutenção entre 02:00 e 05:00 de amanhã.' },
             ].map(aviso => (
               <div key={aviso.id} className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm hover:border-primary/20 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                     <span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                       aviso.importance === 'Alta' ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'
                     }`}>
                       Importância {aviso.importance}
                     </span>
                     <span className="text-[10px] font-black text-slate-400 uppercase">{aviso.date}</span>
                  </div>
                  <h4 className="text-xl font-black mb-3 group-hover:text-primary transition-colors">{aviso.title}</h4>
                  <p className="text-sm font-medium text-slate-500 leading-relaxed mb-6">{aviso.content}</p>
                  <button className="text-xs font-black text-primary uppercase tracking-widest hover:underline">Marcar como lido</button>
               </div>
             ))}
           </div>
        ) : (
          /* MENSAGENS / CHAT */
          <div className="flex bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden h-full animate-in fade-in duration-300">
            {/* Thread List Sidebar */}
            <aside className="w-80 border-r border-slate-100 dark:border-white/5 flex flex-col shrink-0">
               <div className="p-6">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                    <input 
                      type="text" 
                      placeholder="Buscar conversas..." 
                      value={searchThreadTerm}
                      onChange={(e) => setSearchThreadTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-white/5 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
               </div>
               <div className="flex-1 overflow-y-auto custom-scrollbar px-3 pb-6">
                  {filteredThreads.map((thread) => {
                    const other = thread.participants[0];
                    const isActive = activeThread?.id === thread.id;
                    return (
                      <button 
                        key={thread.id} 
                        onClick={() => setSearchParams({ tab: 'mensagens', thread: thread.id })}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all mb-1 group ${
                          isActive ? 'bg-primary/10 text-primary' : 'hover:bg-slate-50 dark:hover:bg-white/5'
                        }`}
                      >
                         <img src={other.avatarUrl} className={`size-12 rounded-full object-cover border-2 ${isActive ? 'border-primary' : 'border-transparent'}`} alt="" />
                         <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-0.5">
                               <h4 className={`text-xs font-black truncate ${isActive ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>{other.name}</h4>
                               <span className="text-[9px] font-bold text-slate-400">{thread.lastMessageAt}</span>
                            </div>
                            <div className="flex justify-between items-center">
                               <p className="text-[11px] text-slate-500 truncate">{thread.preview}</p>
                               {thread.unreadCount > 0 && (
                                  <span className="size-4 bg-primary text-white text-[9px] font-black rounded-full flex items-center justify-center">{thread.unreadCount}</span>
                               )}
                            </div>
                         </div>
                      </button>
                    );
                  })}
               </div>
            </aside>

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col bg-slate-50/30 dark:bg-white/1">
               {activeThread ? (
                 <>
                  <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-white/5 px-8 flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-4">
                        <img src={activeThread.participants[0].avatarUrl} className="size-11 rounded-full object-cover border border-slate-100" alt="" />
                        <div>
                          <h3 className="text-sm font-black leading-none mb-1.5">{activeThread.participants[0].name}</h3>
                          <p className="text-[10px] font-black text-primary uppercase tracking-widest">{getRecipientLabel(activeThread.participants[0].role)}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="size-10 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 flex items-center justify-center text-slate-400">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </div>
                  </header>

                  <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                     {activeMessages.map((msg) => {
                       const isMe = msg.senderId === CURRENT_STUDENT_ID;
                       return (
                         <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-1.5`}>
                               <div className={`px-5 py-3 rounded-2xl text-sm font-medium shadow-sm leading-relaxed ${
                                 isMe 
                                   ? 'bg-primary text-white rounded-tr-none' 
                                   : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-tl-none border border-slate-100 dark:border-white/5'
                               }`}>
                                 {msg.body}
                               </div>
                               <div className="flex items-center gap-2 px-1">
                                  <span className="text-[9px] font-black text-slate-400 uppercase">{msg.sentAt}</span>
                                  {isMe && (
                                    <span className={`material-symbols-outlined text-[14px] ${msg.status === 'read' ? 'text-primary' : 'text-slate-300'}`}>done_all</span>
                                  )}
                               </div>
                            </div>
                         </div>
                       );
                     })}
                     <div ref={chatEndRef} />
                  </div>

                  <footer className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/5">
                     <div className="flex items-center gap-4">
                        <button className="size-11 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-primary transition-all flex items-center justify-center">
                           <span className="material-symbols-outlined">attach_file</span>
                        </button>
                        <div className="relative flex-1">
                          <input 
                            type="text" 
                            value={newMessageBody}
                            onChange={(e) => setNewMessageBody(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Escreva sua mensagem aqui..." 
                            className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl py-3.5 px-5 text-sm font-bold focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                        <button 
                          onClick={handleSendMessage}
                          disabled={!newMessageBody.trim()}
                          className="size-11 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/25 hover:scale-[1.05] active:scale-95 transition-all disabled:opacity-50"
                        >
                           <span className="material-symbols-outlined">send</span>
                        </button>
                     </div>
                  </footer>
                 </>
               ) : (
                 <div className="flex-1 flex flex-col items-center justify-center p-12 text-center opacity-40">
                    <span className="material-symbols-outlined text-6xl mb-4">forum</span>
                    <p className="font-black uppercase tracking-widest">Selecione uma conversa para iniciar</p>
                 </div>
               )}
            </main>
          </div>
        )}
      </div>

      {/* New Chat Modal */}
      {isNewChatModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
           <div className="bg-white dark:bg-slate-900 rounded-[40px] p-10 max-w-xl w-full shadow-2xl animate-in zoom-in-95 duration-200 border border-white/5">
              <div className="flex justify-between items-start mb-8">
                 <div>
                    <h3 className="text-2xl font-black">Iniciar Nova Conversa</h3>
                    <p className="text-sm font-medium text-slate-500">Selecione o destinatário e envie o primeiro aviso.</p>
                 </div>
                 <button onClick={() => setIsNewChatModalOpen(false)} className="size-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400">
                   <span className="material-symbols-outlined">close</span>
                 </button>
              </div>
              
              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Para:</label>
                    <select 
                      value={selectedRecipientId}
                      onChange={(e) => setSelectedRecipientId(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-3.5 px-4 text-sm font-bold focus:ring-2 focus:ring-primary/20"
                    >
                       <option value="">Selecione um contato...</option>
                       {messageMocks.contacts.map(contact => (
                         <option key={contact.id} value={contact.id}>{contact.name} ({getRecipientLabel(contact.role)})</option>
                       ))}
                    </select>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Mensagem:</label>
                    <textarea 
                      rows={4}
                      value={newChatBody}
                      onChange={(e) => setNewChatBody(e.target.value)}
                      placeholder="Descreva o motivo do seu contato..."
                      className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-4 px-5 text-sm focus:ring-2 focus:ring-primary/20 resize-none"
                    ></textarea>
                 </div>

                 <div className="mt-8 flex gap-4">
                    <button 
                      onClick={() => setIsNewChatModalOpen(false)}
                      className="flex-1 py-4 text-xs font-black uppercase text-slate-400 hover:text-slate-600"
                    >
                      Cancelar
                    </button>
                    <button 
                      onClick={handleStartNewChat}
                      disabled={!selectedRecipientId || !newChatBody.trim()}
                      className="flex-1 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-50"
                    >
                      Enviar Mensagem
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </Layout>
  );
};

export default AlunoComunicacao;
