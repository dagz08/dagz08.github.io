import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  command?: string;
  output: React.ReactNode;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      output: (
        <div className="text-slate-400 space-y-1">
          <p className="text-teal-400 font-bold">Karl Mendoza Interactive Architecture CLI [Version 2026.1]</p>
          <p>Type <span className="text-white font-mono font-semibold">help</span> to list available commands, or <span className="text-white font-mono font-semibold">exit</span> to close.</p>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!isOpen) return null;

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    setHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    let output: React.ReactNode;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-teal-300 font-semibold">Available Commands:</p>
            <p><span className="text-cyan-400 w-24 inline-block font-mono">about</span> - Brief engineering overview</p>
            <p><span className="text-cyan-400 w-24 inline-block font-mono">skills</span> - Core .NET, Azure & Frontend capabilities</p>
            <p><span className="text-cyan-400 w-24 inline-block font-mono">arch</span> - System architecture principles</p>
            <p><span className="text-cyan-400 w-24 inline-block font-mono">stats</span> - Production experience metrics</p>
            <p><span className="text-cyan-400 w-24 inline-block font-mono">contact</span> - Direct contact information</p>
            <p><span className="text-cyan-400 w-24 inline-block font-mono">clear</span> - Clear terminal screen</p>
            <p><span className="text-cyan-400 w-24 inline-block font-mono">exit</span> - Close terminal window</p>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="text-slate-300 space-y-1 leading-relaxed">
            <p className="text-white font-semibold">{PORTFOLIO_DATA.personal.name} — {PORTFOLIO_DATA.personal.role}</p>
            <p className="text-slate-400">{PORTFOLIO_DATA.personal.bio}</p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-2 text-slate-300">
            <p className="text-purple-300 font-bold">.NET & Backend:</p>
            <p className="text-slate-400">C# (.NET 6-9), ASP.NET Core, Minimal APIs, EF Core, Dapper, Microservices, CQRS, MediatR</p>
            <p className="text-cyan-300 font-bold">Cloud & DevOps:</p>
            <p className="text-slate-400">Microsoft Azure, AKS, Docker, Service Bus, Event Grid, ARM/Terraform, CI/CD Pipelines</p>
            <p className="text-teal-300 font-bold">Frontend & Data:</p>
            <p className="text-slate-400">React 18+, TypeScript, Tailwind CSS, SQL Server (Advanced T-SQL, Index Tuning, Query Store)</p>
          </div>
        );
        break;

      case 'arch':
      case 'architecture':
        output = (
          <div className="text-slate-300 space-y-1">
            <p className="text-teal-300 font-bold">Architectural Principles:</p>
            <p>• Clean Architecture & Onion Architecture for domain decoupling</p>
            <p>• CQRS & MediatR pipeline behaviors for segregated read/write paths</p>
            <p>• Event-driven asynchronous messaging via Azure Service Bus to eliminate cascading failures</p>
            <p>• Strict token verification, sliding rate limiting, and zero-trust API Gateways</p>
          </div>
        );
        break;

      case 'stats':
        output = (
          <div className="grid grid-cols-2 gap-2 text-slate-300">
            <div><span className="text-teal-300 font-mono">Experience:</span> 10+ Years</div>
            <div><span className="text-teal-300 font-mono">Projects:</span> 30+ Enterprise Solutions</div>
            <div><span className="text-teal-300 font-mono">Coffee:</span> 1,432+ Cups</div>
            <div><span className="text-teal-300 font-mono">Gaming:</span> Dota 2 & CS:GO</div>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="text-slate-300 space-y-1">
            <p><span className="text-teal-300">Email:</span> {PORTFOLIO_DATA.personal.email}</p>
            <p><span className="text-teal-300">Phone:</span> {PORTFOLIO_DATA.personal.phone}</p>
            <p><span className="text-teal-300">Location:</span> {PORTFOLIO_DATA.personal.location}</p>
            <p><span className="text-teal-300">LinkedIn:</span> {PORTFOLIO_DATA.personal.social.linkedin}</p>
          </div>
        );
        break;

      case 'clear':
        setLogs([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        setInputVal('');
        return;

      default:
        output = (
          <p className="text-rose-400">
            Command not recognized: "{rawCmd}". Type <span className="underline">help</span> for a list of commands.
          </p>
        );
        break;
    }

    setLogs((prev) => [...prev, { command: rawCmd, output }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(history[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 animate-in fade-in duration-200">
      <div className="w-full max-w-3xl rounded-2xl bg-[#080c14] border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[520px]">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0d1320] border-b border-slate-800 select-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose} />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="flex items-center gap-2 ml-3 text-xs font-mono text-slate-300">
              <Terminal className="w-3.5 h-3.5 text-teal-400" />
              <span>karl@enterprise-arch:~ (zsh)</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Logs Content */}
        <div className="flex-1 p-5 overflow-y-auto font-mono text-xs space-y-4">
          {logs.map((log, idx) => (
            <div key={idx} className="space-y-1">
              {log.command && (
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-teal-400">karl@dev:~$</span>
                  <span className="text-white font-bold">{log.command}</span>
                </div>
              )}
              <div className="pl-4">{log.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Line */}
        <div className="px-5 py-3.5 bg-[#0a0f19] border-t border-white/10 flex items-center gap-2 font-mono text-xs">
          <span className="text-teal-400 font-bold shrink-0">karl@dev:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' and press Enter..."
            className="flex-1 bg-transparent text-white focus:outline-none placeholder-slate-600 caret-teal-400"
          />
        </div>
      </div>
    </div>
  );
};
