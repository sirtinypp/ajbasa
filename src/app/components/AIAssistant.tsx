'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Minimize2, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { supabase } from '../lib/supabase';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [assistantName, setAssistantName] = useState('Portfolio Assistant');
  const { messages, sendMessage, status } = useChat();
  const isLoading = status === 'submitted' || status === 'streaming';
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchAIConfig() {
      const { data } = await supabase.from('site_configs').select('data').eq('key', 'ai_config').single();
      if (data?.data?.name) setAssistantName(data.data.name);
    }
    fetchAIConfig();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput('');
    await sendMessage({ text: userMessage });
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent text-white shadow-lg shadow-accent/20 flex items-center justify-center group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="relative"
            >
              <MessageSquare size={24} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-accent animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] sm:w-[400px] h-[600px] max-h-[70vh] bg-surface/95 backdrop-blur-xl rounded-3xl border border-surface-border shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-surface-border bg-accent/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text-primary flex items-center gap-1.5">
                    {assistantName} <Sparkles size={12} className="text-accent" />
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-surface-light rounded-lg text-text-muted transition-colors"
              >
                <Minimize2 size={18} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-5 space-y-4 scrollbar-hide"
            >
              {messages.length === 0 && (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto text-accent">
                    <Sparkles size={32} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-text-primary">How can I help you today?</p>
                    <p className="text-xs text-text-muted">Ask me about Aaron&apos;s projects, skills, or experience.</p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 pt-4">
                    {['Who is Aaron?', 'Latest AI Projects', 'Work Experience', 'How to hire him?'].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={async () => {
                          setInput('');
                          await sendMessage({ text: suggestion });
                        }}
                        className="px-3 py-1.5 rounded-full border border-surface-border text-[10px] font-bold text-text-secondary hover:border-accent hover:text-accent transition-all"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {messages.map((m) => (
                <div 
                  key={m.id} 
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 ${
                      m.role === 'user' ? 'bg-text-secondary' : 'bg-accent'
                    }`}>
                      {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div className={`p-4 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      m.role === 'user' 
                        ? 'bg-accent text-white rounded-tr-none' 
                        : 'bg-surface-light border border-surface-border text-text-secondary rounded-tl-none'
                    }`}>
                      {m.parts?.map((part, i) => {
                        if (part.type === 'text') {
                          return (
                            <div key={i} className="markdown-container">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {part.text}
                              </ReactMarkdown>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white shrink-0">
                      <Bot size={14} />
                    </div>
                    <div className="p-4 rounded-2xl bg-surface-light border border-surface-border flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form 
              onSubmit={handleSubmit}
              className="p-5 border-t border-surface-border bg-surface-light"
            >
              <div className="relative">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type a message..."
                  className="w-full bg-surface border border-surface-border rounded-xl py-3 pl-4 pr-12 text-xs focus:ring-2 focus:ring-accent/50 outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-accent disabled:text-text-muted transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[9px] text-center text-text-muted mt-3 uppercase tracking-tighter font-medium">
                Powered by Gemini 1.5 Flash
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
